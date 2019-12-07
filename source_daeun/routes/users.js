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
        db.query('INSERT INTO t1_member(mem_id, mem_pass, mem_name, mem_addr) VALUES(?,?,?,?)',
        [body.id, body.pass1, body.name, body.addr], (error, results, fields) => {
            if(error){
                htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                res.status(562).end(ejs.render(htmlstream, {
                    'title':'Hidden 100',
                    'warn_title':'회원가입 오류',
                    'warn_message':'이미 회원으로 등록되어 있습니다!',
                    'return_url':'/'
                }));
            }
            else{
                console.log("회원가입에 성공하셨습니다! 신규회원으로 등록되었습니다.");
                res.redirect('/');
            }
        });
    }
};

/* REST API의 URI와 handler를 mapping */
router.get('/', PrintSignup);
router.post('/', HandleSignup);
router.get('/', function(req,res){res.send('respond with a resource 111');});

module.exports = router;