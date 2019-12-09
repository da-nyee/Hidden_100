const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');

router.use(bodyParser.urlencoded({extended:false}));

const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'2019pprj',
    password:'pprj2019',
    database:'db2019'
});

/* 회원가입 */
const PrintSignup = (req, res) => {
    let htmlstream = '';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_signup.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.end(ejs.render(htmlstream));
};

const HandleSignup = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    if(body.id == '' || body.pass1 == '' || body.name == '' || body.addr == ''){
        console.log("데이터 입력이 되지 않아 DB에 저장할 수 없습니다.");
        res.status(561).end('<meta charset="utf-8">데이터가 입력되지 않아 관리자가입을 할 수 없습니다!');
    }
    else{
        db.query('INSERT INTO t1_admin(admin_id, admin_pass, admin_name) VALUES(?,?,?)',
        [body.id, body.pass1, body.name, body.addr], (error, results, fields) => {
            if(error){
                htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                res.status(562).end(ejs.render(htmlstream, {
                    'title':'Hidden 100',
                    'warn_title':'관리자가입 오류',
                    'warn_message':'이미 관리자로 등록되어 있습니다!',
                    'return_url':'/admins/auth'
                }));
            }
            else{
                console.log("관리자가입에 성공하셨습니다! 신규 관리자로 등록되었습니다.");
                res.redirect('/admins/auth');
            }
        });
    }
};

/* REST API의 URI와 handler를 mapping */
router.get('/reg', PrintSignup);
router.post('/reg', HandleSignup);

/* 로그인 */
const PrintSignin = (req, res) => {
    let htmlstream = '';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_signin.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');
    
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){ // true: 로그인 상태, false: 비로그인 상태
        res.end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'regurl':'/admins/profile',
            'reglabel':req.session.who,
            'logurl':'/admins/logout',
            'loglabel':'로그아웃'
        }));
    }
    else{
        res.end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'regurl':'/admins/reg',
            'reglabel':'회원가입',
            'logurl':'/admins/auth',
            'loglabel':'로그인'
        }));
    }
};

const HandleSignin = (req, res) => {
    let body = req.body;
    let admin_id, admin_pass, admin_name;
    let sql_str;
    let htmlstream = '';

    console.log(body.id);
    console.log(body.pass);

    if(body.id == '' || body.pass == ''){
        console.log("아이디 혹은 비밀번호가 입력되지 않아 로그인 할 수 없습니다!");
        res.status(562).end('<meta charset="utf-8">아이디 혹은 비밀번호가 입력되지 않아 로그인 할 수 없습니다!');
    }
    else{
        sql_str = "SELECT * from t1_admin where admin_id='"+body.id+"' and admin_pass='"+body.pass+"';";
        console.log("SQL: " + sql_str);

        db.query(sql_str, (error, results, fields) => {
            if(error){
                res.status(562).end("Login fails as there is no id in DB!");
            }
            else{
                if(results.length <= 0){ // select 조회 결과가 없는 경우
                    htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'등록된 계정이나 비밀번호가 틀립니다.',
                        'return_url':'/admins/profile'
                    }));
                }
                else{ // select 조회 결과가 있는 경우
                    results.forEach((item, index) => {
                        admin_id = item.admin_id;
                        admin_pass = item.admin_pass;
                        admin_name = item.admin_name;
                        console.log("DB에서 로그인 성공한 ID/비밀번호: %s/%s", admin_id, admin_pass);

                        if(body.id == admin_id && body.pass == admin_pass){
                            req.session.auth = 99; // 임의의 수로 로그인 성공 설정
                            req.session.who = admin_name;

                            if(body.id == 'admin'){ // 인증된 사용자가 관리자(admin)인 경우 이를 표시
                                req.session.admin = true;
                            }
                            res.redirect('/admins/profile');
                        }
                    });
                }
            }
        });
    }
}

/* REST API의 URI와 handler를 mapping */
router.get('/auth', PrintSignin);
router.post('/auth', HandleSignin);

/* 로그아웃 */
const HandleSignout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

/* REST API의 URI와 handler를 mapping */
router.get('/logout', HandleSignout);

module.exports = router;