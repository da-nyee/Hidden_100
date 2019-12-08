const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   url = require('url');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const   multer = require('multer');
// 업로드 디렉터리를 설정한다. 실제디렉터리: /home/bmlee/
// const  upload = multer({dest: __dirname + '/../uploads/products'});
const router = express.Router();
const db=require('./records');

// router.use(bodyParser.urlencoded({ extended: false }));
const client = mysql.createConnection({
	host: 'localhost', // DB서버 IP주소
	port: 3306, // DB서버 Port주소
	user: '2019pprj', // DB접속 아이디
	password: 'pprj2019', // 암호
	database: 'db2019' //사용할 DB명
});

client.connect((error)=>{
    if(error){
        console.log("connect error!!!", error);
    }
    else
        console.log("connect sucess!!!");
});

const getClothes=(req, res)=>{
    let htmlstream='';
    htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    const sql='SELECT * FROM t1_goods where goo_type=\'clothes\' and status=\'active\' ORDER BY regist_day DESC limit 8';
    client.query(sql, (error, results, fields) => {  // 상품조회 SQL실행
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');

            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body                
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
            
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream));
        }        
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            db.records=results;
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {goodslist:results}));  // 조회된 상품정보
        }
    });
}

router.get('/clothes', getClothes);

const getDigital=(req, res)=>{
    let htmlstream='';
    htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    const sql='SELECT * FROM t1_goods where goo_type=\'digital\' and status=\'active\' ORDER BY regist_day DESC limit 8';
    client.query(sql, (error, results, fields) => {  // 상품조회 SQL실행
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');

            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream));
        }
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            db.records=results;
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {goodslist:results}));  // 조회된 상품정보
        }
    });
}

router.get('/digital', getDigital);

const getMakeup=(req, res)=>{
    let htmlstream='';
    htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    const sql='SELECT * FROM t1_goods where goo_type=\'makeup\' and status=\'active\' ORDER BY regist_day DESC limit 8';
    client.query(sql, (error, results, fields) => {  // 상품조회 SQL실행
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');
    
            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
            
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream));
        }
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            db.records=results;
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {goodslist:results}));  // 조회된 상품정보
        }
    });
}

router.get('/makeup', getMakeup);

const getFurniture=(req, res)=>{
    let htmlstream='';
    htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    const sql='SELECT * FROM t1_goods where goo_type=\'furniture\' and status=\'active\' ORDER BY regist_day DESC limit 8';
    client.query(sql, (error, results, fields) => {  // 상품조회 SQL실행
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');
    
            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream));
        }            
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            db.records=results;
            //console.log('records : ', records);
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {goodslist:results}));  // 조회된 상품정보
        }
    });
}

router.get('/furniture', getFurniture);

const calcTime=(req, res)=>{
    const leftTime=new Array();
    const currentTime=new Date();   //UTC현재 시간

    //*UTC시간을 그냥 문자열로 바꾸면 KST시간으로 자동으로 바뀐다. 주의가 필요!!!
    db.records.forEach((item)=>{
        let endTime=new Date(item.time_year, item.time_month-1, item.time_day-1,
            item.time_hour, item.time_minute); //UTC끝나는 시간-1일

        //console.log(new Date(endTime-currentTime).toUTCString());   //UTC시간으로 문자열 변환
        const temp=new Date(endTime-currentTime).toUTCString().split(' ');

        leftTime.push(item.goo_id+':'+temp[1]+':'+temp[4].substring(0, 5));
    });
    
    //console.log('left : ', leftTime);
    //console.log('toJson : ', JSON.stringify(leftTime));
    res.end(JSON.stringify(leftTime));
}

router.get('/calcTime', calcTime);

module.exports = router;
