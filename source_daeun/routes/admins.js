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
   if(req.session.auth==undefined){req.session.auth=0;}
   if(req.session.who==undefined){req.session.who='0';}

    res.end(ejs.render(htmlstream, {
    auth:req.session.auth ,
    mem_id:req.session.who,
    }));
};

const HandleSignup = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    let admin_pass1, admin_pass2;

    if(body.pass1 != body.pass2){
        console.log("비밀번호가 서로 다릅니다. 다시 확인해주세요!");
        res.send('<script type="text/javascript">alert("비밀번호가 서로 다릅니다. 다시 확인해주세요!"); location.href="/admins/reg"; </script>');
    }
    else{

        db.query('INSERT INTO t1_admin(admin_name, admin_id, admin_pass, admin_email, admin_phone, admin_bday) VALUES(?,?,?,?,?,?)',
        [body.name, body.id, body.pass1, body.email, body.phone, body.bday], (error, results, fields) => {
            if(error){
                htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                res.status(562).end(ejs.render(htmlstream, {
                    'title':'Hidden 100',
                    'warn_title':'관리자 가입 오류',
                    'warn_message':'이미 관리자로 등록되어 있습니다!',
                    'return_url':'/admins/auth'
                }));
            }
            else{
                console.log("관리자 가입에 성공하셨습니다! 신규 관리자로 등록되었습니다.");
                res.send('<script type="text/javascript">alert("관리자 가입에 성공하셨습니다! 신규 관리자로 등록되었습니다."); location.href="/admins/auth"; </script>');
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
 
        auth:0 ,
        mem_id:0

        }));
    }
    else{
        res.end(ejs.render(htmlstream, {
 
        auth:0 ,
        mem_id:0

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
                    'return_url':'/admins/reg'
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
                        req.session.who = mem_id;

                        if(body.id == 'admin'){ // 인증된 사용자가 관리자(admin)인 경우 이를 표시
                            req.session.admin = true;
                        }
                        res.send('<script type="text/javascript">alert("로그인 되었습니다!"); location.href="/"; </script>');
                    }
                });
            }
        }
    });
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