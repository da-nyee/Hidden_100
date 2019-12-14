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

    htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_signup.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    if(req.session.auth==undefined){req.session.auth=0;}
    if(req.session.who==undefined){req.session.who='0';}

    res.end(ejs.render(htmlstream, {
    auth:req.session.auth ,
    admin_id:req.session.who,
    }));
};

const HandleSignup = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    let admin_pass1, admin_pass2;

    if(body.pass1 != body.pass2){
        console.log("비밀번호가 서로 다릅니다. 다시 확인해주세요!");
        res.send('<script type="text/javascript">alert("비밀번호가 서로 다릅니다. 다시 확인해주세요!"); location.href="/admin/admins/reg"; </script>');
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
                    'return_url':'/admin/admins/auth'
                }));
            }
            else{
                console.log("관리자 가입에 성공하셨습니다! 신규 관리자로 등록되었습니다.");
                res.send('<script type="text/javascript">alert("관리자 가입에 성공하셨습니다! 신규 관리자로 등록되었습니다."); location.href="/admin/admins/auth"; </script>');
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

    htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_signin.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');
    
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){ // true: 로그인 상태, false: 비로그인 상태
        res.end(ejs.render(htmlstream, {
 
        auth:0 ,
        admin_id:0

        }));
    }
    else{
        res.end(ejs.render(htmlstream, {
 
        auth:0 ,
        admin_id:0

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
                    'return_url':'/admin/admins/reg'
                }));
            }
            else{ // select 조회 결과가 있는 경우
                results.forEach((item, index) => {
                    admin_id = item.admin_id;
                    admin_pass = item.admin_pass;
                    admin_name = item.admin_name;
                    console.log("DB에서 로그인 성공한 ID/비밀번호: %s/%s", admin_id, admin_pass);

                    if(body.id == admin_id && body.pass == admin_pass){
                        req.session.auth = 91; // 임의의 수로 로그인 성공 설정
                        req.session.who = admin_id;
                        
                        res.send('<script type="text/javascript">alert("로그인 되었습니다!"); location.href="/admin"; </script>');
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
    res.redirect('/admin');
}

/* REST API의 URI와 handler를 mapping */
router.get('/logout', HandleSignout);

/* 정보수정 */
const PrintProfile = (req, res) => {
    if(req.session.auth==91){
        let htmlstream = '';

        let body = req.body;
        let admin;

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_settings.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_admin where admin_id='"+req.session.who+"';";
        
        db.query(sql_settings, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

            if(req.session.auth==undefined){req.session.auth=0;}
            if(req.session.who==undefined){req.sezssion.who='0';}

            res.end(ejs.render(htmlstream, {
                admin_info:results[0],
                auth:req.session.auth,
                admin_id:req.session.who
            }));
        });}
    else{
        htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');

        res.status(562).end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'warn_title':'로그인 오류',
            'warn_message':'로그인이 필요한 서비스입니다.',
            'return_url':'/admin/admins/auth'
        }));
    }
};

const HandleProfile = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    if(body.pass1 != body.pass2){
        console.log("비밀번호가 서로 다릅니다. 다시 확인해주세요!");
        res.send('<script type="text/javascript">alert("비밀번호가 서로 다릅니다. 다시 확인해주세요!"); location.href="/admin/admins/reg"; </script>');
    }
    else{
        db.query("SELECT * from t1_admin where admin_id=?", [body.id], (error, results, fields) => {
            if(!error){
                db.query("UPDATE t1_admin SET admin_pass=?, admin_email=?, admin_phone=? where admin_id=?", [body.pass1, body.email, body.phone, body.id], (error, results, fields) => {
                    if(error){
                        htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                        res.status(562).end(ejs.render(htmlstream, {
                            'title':'Hidden 100',
                            'warn_title':'정보수정 오류',
                            'warn_message':'정보수정에 실패하였습니다!',
                            'return_url':'/admin/admins/profile'
                        }));
                    }
                    else{
                        console.log("정보수정이 성공적으로 완료되었습니다!");
                        res.send('<script type="text/javascript">alert("정보수정이 성공적으로 완료되었습니다!"); location.href="/admin"; </script>');
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
    if(req.session.auth==91){

        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_deletion.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_admin where admin_id='"+req.session.who+"';";

        db.query(sql_settings, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    admin_info:results[0],
                    auth:req.session.auth,
                    admin_id:req.session.who
                }));
            }
            else{
                res.end(ejs.render(htmlstream, {
                    auth:req.session.auth,
                    admin_id:req.session.who
                }))
            }
        });}
    else{
        htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');

        res.status(562).end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'warn_title':'로그인 오류',
            'warn_message':'로그인이 필요한 서비스입니다.',
            'return_url':'/admin/admins/auth'
        }));
    }
};
 
const HandleDeletion = (req, res) => {
    let body = req.body;
    let admin_id, admin_pass;
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
            db.query("SELECT * from t1_admin where admin_id=?", [body.id], (error, results, fields) => {
                if(!error){
                    db.query("DELETE from t1_admin where admin_id=? and admin_pass=?", [body.id, body.pass], (error, results, fields) => {
                        if(error){
                            htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                            res.status(562).end(ejs.render(htmlstream, {
                                'title':'Hidden 100',
                                'warn_title':'회원탈퇴 오류',
                                'warn_message':'회원탈퇴에 실패하였습니다!',
                                'return_url':'/admin/admins/deletion'
                            }));
                        }
                        else{
                            req.session.destroy();

                            console.log("회원탈퇴 되었습니다.");
                            res.send('<script type="text/javascript">location.href="/admin"; </script>');
                        }
                    });
                }
            });
        }
    });
}
 
/* REST API의 URI와 handler를 mapping */
router.get('/deletion', PrintDeletion);
router.post('/deletion', HandleDeletion);

module.exports = router;
