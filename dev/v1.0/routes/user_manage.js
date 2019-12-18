const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const querystring = require('querystring');

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

        const sql_settings = "SELECT * from t1_member;";
        const sql_user_count = "SELECT count(*) as total from t1_member;";

        db.query(sql_settings+sql_user_count, (error, results, fields) => {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

            console.log(results[1]);

var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);
            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    mem_info:results[0],
                    mem_count:results[1],
                    auth:req.session.auth,

admin_id:req.session.admin_name,
profit:profit,

                }));
            }
            else{var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

                res.end(ejs.render(htmlstream, {
                    auth:req.session.auth,
admin_id:req.session.admin_name,
profit:profit,
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

            if(req.session.auth){var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

                res.end(ejs.render(htmlstream, {
                    mem_info:results,
                    auth:req.session.auth,
admin_id:req.session.admin_name,
profit:profit,

                }));
            }
            else{var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);
                res.end(ejs.render(htmlstream, {
                    auth:req.session.auth,
admin_id:req.session.admin_name,
profit:profit,

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
var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    mem_info:results,
                    auth:req.session.auth,
admin_id:req.session.admin_name,
profit:profit,

                }));
            }
            else{var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

                res.end(ejs.render(htmlstream, {
                    auth:req.session.auth,
admin_id:req.session.admin_name,
profit:profit,

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
var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    mem_info:results,
                    auth:req.session.auth,
admin_id:req.session.admin_name,
profit:profit,

                }));
            }
            else{var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

                res.end(ejs.render(htmlstream, {
                    auth:req.session.auth,
                    admin_id:req.session.admin_name,
profit:profit,

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

/* 신고회원 조회 */
const getReported = (req, res) => {
    if(req.session.auth==91){
 
        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_reported.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_settings = "SELECT * from t1_report order by num desc;";
        //const sql_report_count = "SELECT count(*) as total from t1_report;";

        db.query(sql_settings/*+sql_report_count*/, (error, results, fields) => {
            console.log(results);
            const datetime=[];

            results.forEach((result)=>{
                let obj={};

                const temp=result.regist_day.toString().split(' ');

                obj.year=temp[3]+'년 ';

                if(temp[1]=='Jan')
                    obj.month='1월 ';
                else if(temp[1]=='Feb')
                    obj.month='2월 ';
                else if(temp[1]=='Mar')
                    obj.month='3월 ';
                else if(temp[1]=='Apr')
                    obj.month='4월 ';
                else if(temp[1]=='May')
                    obj.month='5월 ';
                else if(temp[1]=='Jun')
                    obj.month='6월 ';
                else if(temp[1]=='Jul')
                    obj.month='7월 ';
                else if(temp[1]=='Aug')
                    obj.month='8월 ';
                else if(temp[1]=='Sep')
                    obj.month='9월 ';
                else if(temp[1]=='Oct')
                    obj.month='10월 ';
                else if(temp[1]=='Nov')
                    obj.month='11월 ';
                else if(temp[1]=='Dec')
                    obj.month='12월 ';

                obj.day=temp[2]+'일 ';

                const time=temp[4].split(':');
                obj.time=time[0]+'시 '+time[1]+'분';

                datetime.push(obj);
            })

            console.log(datetime);

            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            var profit= fs.readFileSync('./public/profit.json');
            profit=JSON.parse(profit);

            if(req.session.auth){
                res.end(ejs.render(htmlstream, {
                    reports:results,
                    datetime:datetime,
                    auth:req.session.auth,
                    admin_id:req.session.admin_name,
                    profit:profit,
                }));
            }
            else{var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

                res.end(ejs.render(htmlstream, {
                    auth:req.session.auth,
                    admin_id:req.session.admin_name,
profit:profit,

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
router.get('/getReported', getReported);

/* 신고내역 조회 */
const getContent = (req, res) => {
    const parsedUrl = url.parse(req.url);
    const query = querystring.parse(parsedUrl.query);

    if(req.session.auth==91){
        let htmlstream = '';

        htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/report_content.ejs','utf8');
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

        const sql_content = `SELECT t1_report.*, t1_goods.goo_name, t1_goods.goo_type, t1_goods.status from t1_report inner join t1_goods on t1_goods.goo_id=t1_report.goo_id where num=${query.num};`;

        db.query(sql_content, (error, result, fields) => {
            if(error){
                res.status(562).end("DB query is failed");
            }
            else if(result.length <= 0){
                console.log("조회된 내역이 없습니다.");

                htmlstream = '';

                htmlstream = fs.readFileSync(__dirname + '/../views/admin_header.ejs','utf8');
                htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs','utf8');
                htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/nothing.ejs','utf8');
                htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');
            
                res.writeHead(200, {'Content-Type':'text/htmll charset=utf8'});
var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

                res.end(ejs.render(htmlstream, {
                    auth:req.session.auth,
                    admin_id:req.session.admin_name,
                    profit:profit,
                }));
            }
            else{
                console.log(result);
var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

                res.end(ejs.render(htmlstream, {
                    info:result,
                    auth:req.session.auth,
                    admin_id:req.session.admin_name,
profit:profit,
                }));
            }
        });
    }
    else{
        htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
        
        res.status(562).end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'warn_title':'로그인 오류',
            'warn_message':'로그인이 필요한 서비스입니다.',
            'return_url':'/admin/admins/auth'
        }));
    }
}

/* REST API의 URI와 handler를 mapping */
router.get('/report/content', getContent);

module.exports = router;
