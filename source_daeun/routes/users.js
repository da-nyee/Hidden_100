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

    let mem_pass1, mem_pass2;

    if(body.pass1 != body.pass2){
        console.log("비밀번호가 서로 다릅니다. 다시 확인해주세요!");
        res.send('<script type="text/javascript">alert("비밀번호가 서로 다릅니다. 다시 확인해주세요!"); location.href="/users/reg"; </script>');
    }
    else{
        var temp = body.addr1+body.addr2+' '+body.addr3;
        temp = temp.replace("undefined","");

        db.query('INSERT INTO t1_member(mem_name, mem_id, mem_pass, mem_email, mem_phone, mem_bday, mem_addr) VALUES(?,?,?,?,?,?,?)',
        [body.name, body.id, body.pass1, body.email, body.phone, body.bday, temp], (error, results, fields) => {
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
                res.send('<script type="text/javascript">alert("회원가입에 성공하셨습니다! 신규회원으로 등록되었습니다."); location.href="/users/auth"; </script>');
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
    let mem_id, mem_pass, mem_name;
    let sql_str;
    let htmlstream = '';

    console.log(body.id);
    console.log(body.pass);

    sql_str = "SELECT * from t1_member where mem_id='"+body.id+"' and mem_pass='"+body.pass+"';";
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

/* 정보수정 */
const PrintProfile = (req, res) => {
   if(req.session.auth==99){
    let htmlstream = '';

    let body = req.body;
    let user;

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_settings.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
      if(req.session.auth==undefined){req.session.auth=0;}
      if(req.session.who==undefined){req.session.who='0';}

            res.end(ejs.render(htmlstream, {
                   auth:req.session.auth ,
                   mem_id:req.session.who,
      }));
   }else{
              htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'로그인이 필요한 서비스입니다.',
                        'return_url':'/users/auth'
                    }));

   }


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
                db.query("UPDATE t1_member SET mem_pass=?, mem_email=?, mem_phone=?, mem_addr=? where mem_id=?", [body.pass1, body.email, body.phone, body.addr, body.id], (error, results, fields) => {
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
                        res.send('<script type="text/javascript">alert("정보수정이 성공적으로 완료되었습니다!"); location.href="/users/profile"; </script>');
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
   if(req.session.auth==99){

    let htmlstream = '';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_deletion.ejs','utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');
    
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

    if(req.session.auth){ // true: 로그인 상태, false: 비로그인 상태
        res.end(ejs.render(htmlstream, {
 
       auth:req.session.auth ,
       mem_id:req.session.who,

        }));
    }
    else{
        res.end(ejs.render(htmlstream, {
 
       auth:req.session.auth ,
       mem_id:req.session.who,

        }));
    }
   }else{
              htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'로그인이 필요한 서비스입니다.',
                        'return_url':'/users/auth'
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
                            req.session.destroy();

                            console.log("회원탈퇴 되었습니다.");
                            res.send('<script type="text/javascript">alert("회원탈퇴 되었습니다."); location.href="/"; </script>');
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