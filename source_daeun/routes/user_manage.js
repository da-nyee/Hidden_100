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

module.exports = router;