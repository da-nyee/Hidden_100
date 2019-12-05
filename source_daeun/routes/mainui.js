const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();

var loglevel = 1;

const GetMainUI = (req, res) => {
    let htmlstream = '';

    logging(loglevel, 'router.get() invoked!');

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8'); // header

    if(req.session.auth && req.session.admin){
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_nav.ejs', 'utf8'); // 관리자 메뉴
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/admin_content.ejs', 'utf8');
    }
    else{
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_nav.ejs', 'utf8'); // 사용자 메뉴
        htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/user_content.ejs', 'utf8');
    }

    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8'); // footer

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    if(req.session.auth){
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

const logging = (level, logmsg) => {
    if(level != 0){
        console.log(level, logmsg);
        loglevel++;
    }
}

router.get('/', GetMainUI); // '/' get 메소드의 handler 정의

module.exports = router; // 외부로 return