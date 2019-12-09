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
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_signup.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.end(ejs.render(htmlstream));
};

const HandleSignup = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    if(body.id == '' || body.pass1 == '' || body.name == '' || body.addr == ''){
        console.log("데이터 입력이 되지 않아 DB에 저장할 수 없습니다.");
        res.status(561).end('<meta charset="utf-8">데이터가 입력되지 않아 회원가입을 할 수 없습니다!');
    }
    else{
        db.query('INSERT INTO t1_member(mem_id, mem_pass, mem_name, mem_phone, mem_addr) VALUES(?,?,?,?,?)',
        [body.id, body.pass1, body.name, body.phone, body.addr], (error, results, fields) => {
            if(error){
                htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                res.status(562).end(ejs.render(htmlstream, {
                    'title':'Hidden 100',
                    'warn_title':'회원가입 오류',
                    'warn_message':'이미 회원으로 등록되어 있습니다!',
                    'return_url':'/users/auth'
                }));
            }
            else{
                console.log("회원가입에 성공하셨습니다! 신규회원으로 등록되었습니다.");
                res.redirect('/users/auth');
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
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_signin.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');
    
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){ // true: 로그인 상태, false: 비로그인 상태
        res.end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'regurl':'/users/profile',
            'reglabel':req.session.who,
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

const HandleSignin = (req, res) => {
    let body = req.body;
    let mem_id, mem_pass, mem_name;
    let sql_str;
    let htmlstream = '';

    console.log(body.id);
    console.log(body.pass);

    if(body.id == '' || body.pass == ''){
        console.log("아이디 혹은 비밀번호가 입력되지 않아 로그인 할 수 없습니다!");
        res.status(562).end('<meta charset="utf-8">아이디 혹은 비밀번호가 입력되지 않아 로그인 할 수 없습니다!');
    }
    else{
        sql_str = "SELECT mem_id, mem_pass, mem_name from t1_member where mem_id='"+body.id+"' and mem_pass='"+body.pass+"';";
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
                        'return_url':'/users/profile'
                    }));
                }
                else{ // select 조회 결과가 있는 경우
                    results.forEach((item, index) => {
                        mem_id = item.mem_id;
                        mem_pass = item.mem_pass;
                        mem_name = item.mem_name;
                        console.log("DB에서 로그인 성공한 ID/비밀번호: %s/%s", mem_id, mem_pass);

                        if(body.id == mem_id && body.pass == mem_pass){
                            req.session.auth = 99; // 임의의 수로 로그인 성공 설정
                            req.session.who = mem_name;

                            if(body.id == 'admin'){ // 인증된 사용자가 관리자(admin)인 경우 이를 표시
                                req.session.admin = true;
                            }
                            res.redirect('/users/profile');
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

/* 정보수정 */
const PrintProfile = (req, res) => {
    let htmlstream = '';

    let body = req.body;
    let user;

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_settings.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.end(ejs.render(htmlstream));
};

const HandleProfile = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    if(body.pass1 == '' || body.addr == ''){
        console.log("데이터 입력이 되지 않아 DB에 저장할 수 없습니다.");
        res.status(561).end('<meta charset="utf-8">데이터가 입력되지 않아 정보수정을 할 수 없습니다!');
    }
    else{
        db.query("SELECT * from t1_member where mem_id=?", [body.id], (error, results, fields) => {
            if(!error){
                db.query("UPDATE t1_member SET mem_pass=?, mem_phone=?, mem_addr=? where mem_id=?", [body.pass1, body.phone, body.addr, body.id], (error, results, fields) => {
                    if(error){
                        htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                        res.status(562).end(ejs.render(htmlstream, {
                            'title':'Hidden 100',
                            'warn_title':'정보수정 오류',
                            'warn_message':'정보수정에 실패하였습니다!',
                            'return_url':'/users/profile'
                        }));
                    }
                    else{
                        console.log("정보수정이 성공적으로 완료되었습니다!");
                        res.redirect('/users/profile');
                    }
                });
            }
        });
    }
};

/* REST API의 URI와 handler를 mapping */
router.get('/profile', PrintProfile);
router.post('/profile', HandleProfile);

/* 회원탈퇴 */
const PrintDeletion = (req, res) => {
    let htmlstream = '';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_deletion.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');
    
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){ // true: 로그인 상태, false: 비로그인 상태
        res.end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'regurl':'/users/profile',
            'reglabel':req.session.who,
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

const HandleDeletion = (req, res) => {
    let body = req.body;
    let mem_id, mem_pass;
    let sql_str;
    let htmlstream = '';

    console.log(body.id);
    console.log(body.pass);

    if(body.id == '' || body.pass == ''){
        console.log("아이디 혹은 비밀번호가 입력되지 않아 회원탈퇴가 불가합니다!");
        res.status(562).end('<meta charset="utf-8">아이디 혹은 비밀번호가 입력되지 않아 회원탈퇴가 불가합니다!');
    }
    else{
        sql_str = "SELECT mem_id, mem_pass, mem_name from t1_member where mem_id='"+body.id+"' and mem_pass='"+body.pass+"';";
        console.log("SQL: " + sql_str);

        db.query(sql_str, (error, results, fields) => {
            if(error){
                res.status(562).end("Login fails as there is no id in DB!");
            }
            else{
                db.query("SELECT * from t1_member where mem_id=?", [body.id], (error, results, fields) => {
                    if(!error){
                        db.query("DELETE from t1_member where mem_id=? and mem_pass=?", [body.id, body.pass], (error, results, fields) => {
                            if(error){
                                htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                                res.status(562).end(ejs.render(htmlstream, {
                                    'title':'Hidden 100',
                                    'warn_title':'회원탈퇴 오류',
                                    'warn_message':'회원탈퇴에 실패하였습니다!',
                                    'return_url':'/users/reg'
                                }));
                            }
                            else{
                                console.log("회원탈퇴 되었습니다.");
                                res.redirect('/users/reg');
                            }
                        });
                    }
                });
            }
        });
    }
}

/* REST API의 URI와 handler를 mapping */
router.get('/deletion', PrintDeletion);
router.post('/deletion', HandleDeletion);

module.exports = router;