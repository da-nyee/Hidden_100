const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('express-session');
const bodyParser = require('body-parser');

const app = express();

const mainui = require('./routes/mainui');
const users = require('./routes/users');
const adminprod = require('./routes/adminprod');
const PORT1 = 65001;
const PORT2 = 65002;

/* 실행환경(초기화) 설정 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    key:'sid',
    secret:'secret key',
    resave:false,
    saveUninitialized:true
}));

/* URI와 handler 매핑 */
app.use('/', mainui);
app.use('/users', users);
app.use('/adminprod', adminprod);

/* 쇼핑몰 웹서버 실행 */
app.listen(PORT, function(){
    console.log("서버실행: http://203.249.127.60:" + PORT1);
    console.log("서버실행: http://203.249.127.60:" + PORT2);
    console.log("서버실행: http://192.9.80.96:" + PORT1);
    console.log("서버실행: http://192.9.80.96:" + PORT2); 
});