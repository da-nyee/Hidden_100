const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');
const url=require('url');
const querystring=require('querystring');

router.use(bodyParser.urlencoded({extended:false}));

const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'2019pprj',
    password:'pprj2019',
    database:'db2019',
    multipleStatements:true
});

/* 회원조회 */
const PrintGetuser = (req, res) => {
    if(req.session.auth==91){
 
        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_get_users.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_member";

        db.query(sql_settings, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    mem_info:results,
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

/* REST API의 URI와 handler를 mapping */
router.get('/getuser', PrintGetuser);

/* 회원등급 관리 */
const PrintControl_level = (req, res) => {
    if(req.session.auth==91){
 
        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_control_levels.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_member";

        db.query(sql_settings, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    mem_info:results,
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

const HandleControl_level = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    console.log(req.body);

    const sql_control_level = "SELECT * from t1_member";

    db.query(sql_control_level, (error, results, fields) => {
        if(!error){
            db.query("UPDATE t1_member SET level=? where mem_id=?", [body.level, body.id], (error, results, fields) => {
                if(error){
                    console.log(sql_control_level);

                    htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'회원등급 관리 오류',
                        'warn_message':'회원등급 관리에 실패하였습니다!',
                        'return_url':'/admin/user_manage/control_level'
                    }));
                }
                else{
                    console.log("회원등급 관리가 성공적으로 완료되었습니다!");
                    res.send('<script type="text/javascript">alert("회원등급 관리가 성공적으로 완료되었습니다!"); location.href="/admin/user_manage/control_level"; </script>');
                }
            });
        }
    });
};

/* REST API의 URI와 handler를 mapping */
router.get('/control_level', PrintControl_level);
router.post('/control_level', HandleControl_level);

/* 회원정지 관리 */
const PrintControl_status = (req, res) => {
    if(req.session.auth==91){
 
        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_control_status.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_member";

        db.query(sql_settings, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    mem_info:results,
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

const HandleControl_status = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    console.log(req.body);

    const sql_control_status = "SELECT * from t1_member";

    db.query(sql_control_status, (error, results, fields) => {
        if(!error){
            db.query("UPDATE t1_member SET status=? where mem_id=?", [body.status, body.id], (error, results, fields) => {
                if(error){
                    console.log(sql_control_status);

                    htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'회원정지 관리 오류',
                        'warn_message':'회원정지 관리에 실패하였습니다!',
                        'return_url':'/admin/user_manage/control_status'
                    }));
                }
                else{
                    console.log("회원정지 관리가 성공적으로 완료되었습니다!");
                    res.send('<script type="text/javascript">alert("회원정지 관리가 성공적으로 완료되었습니다!"); location.href="/admin/user_manage/control_status"; </script>');
                }
            });
        }
    });
};

/* REST API의 URI와 handler를 mapping */
router.get('/control_status', PrintControl_status);
router.post('/control_status', HandleControl_status);

/* 회원설정 관리 */
const PrintControl_setting = (req, res) => {
    if(req.session.auth==91){
 
        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_control_settings.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_member";

        db.query(sql_settings, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    mem_info:results,
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

const HandleControl_setting = (req, res) => {
    let body = req.body;
    let htmlstream = '';

    console.log(req.body);

    const sql_control_setting = "SELECT * from t1_member";

    db.query(sql_control_setting, (error, results, fields) => {
        if(!error){
            db.query("UPDATE t1_member SET mem_pass=?, mem_email=?, mem_phone=?, coin=? where mem_id=?", [body.pass, body.email, body.phone, body.coin, body.id], (error, results, fields) => {
                if(error){
                    console.log(sql_control_setting);

                    htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'회원설정 관리 오류',
                        'warn_message':'회원설정 관리에 실패하였습니다!',
                        'return_url':'/admin/user_manage/control_setting'
                    }));
                }
                else{
                    console.log("회원설정 관리가 성공적으로 완료되었습니다!");
                    res.send('<script type="text/javascript">alert("회원설정 관리가 성공적으로 완료되었습니다!"); location.href="/admin/user_manage/control_setting"; </script>');
                }
            });
        }
    });
};

/* REST API의 URI와 handler를 mapping */
router.get('/control_setting', PrintControl_setting);
router.post('/control_setting', HandleControl_setting);

/*신고회원 조회*/
const getRepoted=(req, res)=>{
    if(req.session.auth==91){
 
        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_reported.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_report";

        db.query(sql_settings, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            //console.log(results);

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    reports:results,
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

router.get('/getReported', getRepoted);

const getContent=(req, res)=>{
    const parsedUrl=url.parse(req.url);
    const query=querystring.parse(parsedUrl.query);
 
     if(req.session.auth==91){
       let htmlstream='';
       htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
       htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
       htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/report_content.ejs', 'utf8');  //Body
       htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
 
       const sql=`select t1_report.*, t1_goods.goo_name, t1_goods.goo_type from t1_report inner join t1_goods on t1_goods.goo_id=t1_report.goo_id where num=${query.num};`; //당첨 내역 정보
       db.query(sql, (error, result, fields) => {  
          if (error)
             res.status(562).end("DB query is failed");
 
          else if (result.length <= 0){  
             console.log('조회된 상품이 없습니다');
 
             htmlstream='';
             htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
             htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
             htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
             htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
         
             res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
             res.end(ejs.render(htmlstream, {
                         auth:req.session.auth ,
                         mem_id:req.session.who,
                 })); 
          }
          else {  
            console.log(result);

            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {info:result,
                         auth:req.session.auth ,
                         mem_id:req.session.who,
                })); 	  
          }
       });
     } else{
        htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
          res.status(562).end(ejs.render(htmlstream, {
             'title':'Hidden 100',
             'warn_title':'로그인 오류',
             'warn_message':'로그인이 필요한 서비스입니다.',
             'return_url':'/users/auth'
       }));
    }
 }
 
 router.get('/report/content', getContent);
module.exports = router;
