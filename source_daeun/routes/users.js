const fs = require('fs');
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'2019pprj',
    password:'pprj2019',
    database:'db2019s'
});

/* 회원가입 기능 */
const PrintRegistrationForm = (req, res) => {
    let htmlstream = '';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/views/user_nav.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_reg_form.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){
        res.end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'regurl':'/users/profile',
            'logurl':'/users/logout',
            'loglabel':'로그아웃'
        }));
    }
    else{
        res.end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'regurl':'/users/reg',
            'reglabel':'회원가입',
            'logurl':'/users/auth',
            'loglabel':'로그인'
        }));
    }
};

const HandleRegistration = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    console.log(body.mem_id);
    console.log(body.mem_pass1);
    console.log(body.mem_name);
    
    if(body.mem_id == '' || body.mem_pass1 == ''){
        console.log("데이터가 입력되지 않아 DB에 저장할 수 없습니다.");
        res.status(561).end('<meta charset="utf-8">데이터가 입력되지 않아 회원가입을 할 수 없습니다.');
    }
    else{
        db.query('INSERT INTO member (mem_id, mem_pass, mem_name) VALUES (?,?,?)', [body.mem_id, body.mem_pass1, body.mem_name], (error, results, fields) => {
            if(error){
                htmlstream = fs.readFileSync(__dirname + '/views/alert.ejs', 'utf8');
                res.status(562).end(ejs.render(htmlstream, {
                    'title':'Hidden 100',
                    'warn_title':'회원가입 오류',
                    'warn_message':'이미 회원으로 등록되어 있습니다.',
                    'return_url':'/'
                }));
            }
            else{
                console.log("회원가입에 성공하셨습니다!");
                res.redirect('/');
            }
        });
    }
};

router.get('/reg', PrintRegistrationForm); // 회원가입 화면 출력처리
router.post('/reg', HandleRegistration); // 회원가입 내용 DB 등록처리
router.get('/', function(req, res) {res.send('respond with a resource 111');});

/* 로그인 기능 */
const PrintLoginForm = (req, res) => {
    let htmlstream = '';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_login_form.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){
        res.end(ejs.render(htmlstream,{
            'title':'Hidden 100',
            'regurl':'/users/profile',
            'reglabel':req.session.who
        }));
    }
    else{
        res.end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'regurl':'/users/reg',
            'reglabel':'회원가입',
            'logurl':'/users/auth',
            'loglabel':'로그인'
        }));
    }
};

/* 로그인 수행 (사용자 인증처리) */
const HandleLogin = (req, res) => {
    let body = req.body;
    let mem_id, mem_pass, mem_name;
    let sql_str;
    let htmlstream = '';

    console.log(body.mem_id);
    console.log(body.mem_pass);

    if(body.mem_id == '' || body.mem_pass == ''){
        console.log("아이디 혹은 비밀번호가 입력되지 않아 로그인 할 수 없습니다.");
        res.status(562).end('<meta charset="utf-8">아이디 혹은 비밀번호가 입력되지 않아 로그인 할 수 없습니다.');
    }
    else{
        sql_str = "SELECT mem_id, mem_pass, mem_name from member where mem_id = '''+ body.mem_id +''' and pass = '''+ body.mem_pass ''';";
        console.log("SQL: " + sql_str);

        db.query(sql_str, (error, results, fields) => {
            if(error){
                res.status(562).end("Login fails as there is no ID in DB!");
            }
            else{
                if(results.length <= 0){ // 등록된 계정이 없는 경우
                    htmlstream = fs.readFileSync(__dirname, +'/../views/alert.ejs', 'utf8');

                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'등록된 계정이 아닙니다.',
                        'return_url':'/'
                    }));
                }
                else{ // 등록된 계정이 있는 경우
                    results.forEach((item, index) => {
                        mem_id = item.mem_id;
                        mem_pass = item.mem_pass;
                        mem_name = item.mem_name;
                        console.log("DB에서 로그인 성공한 id / pass: %s / %s", mem_id, mem_pass);

                        if(body.mem_id == mem_id && body.mem_pass == mem_pass){
                            req.session.auth = 99; // 임의의 수(99)로 로그인 성공함을 설정
                            req.session.who = mem_name; // 인증된 사용자명 확보 for 로그인 후 이름 출력

                            if(body.mem_id == 'admin'){ // 만약 인증된 사용자가 관리자면 이를 표시
                                req.session.admin = true;
                            }
                            
                            res.redirect('/');
                        }
                    });
                }
            }
        });
    }
}

/* REST API의 URI와 handler mapping */
/* URI: http://xxxx//users/auth */
router.get('/auth', PrintLoginForm);
router.post('/auth', HandleLogin);

/* 로그아웃 기능 */
const HandleLogout = (req, res) => {
    req.session.destroy(); // 세션 제거, 인증 오작동 문제 해결
    res.redirect('/'); // 로그아웃 후 메인화면으로 redirect
}

/* REST API의 URI와 handler mapping */
router.get('/logout', HandleLogout);

/* 회원 정보수정 기능 */
const PrintProfile = (req, res) => {
    let htmlstream = '';

    htmlstream = fs.readFileSync(__dirname + '/../views/user_alert_form.ejs', 'utf8');

    res.status(562).end(ejs.render(htmlstream, {
        'title':'Hidden 100',
        'warn_title':'회원정보 준비중',
        'warn_message':'회원 정보수정 기능은 추후 개발할 예정입니다.',
        'return_url':'/'
    }));
}

/* REST API의 URI와 mapping */
router.get('/profile', PrintProfile);

module.exports = router;