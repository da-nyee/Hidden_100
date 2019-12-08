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

const getAdmin=(req, res)=>{
    let htmlstream='';
    htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    const sql='SELECT * FROM t1_goods ORDER BY regist_day deSC limit 8';
    client.query(sql, (error, results, fields) => {  // 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다.
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');

            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav                
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream));
        }            
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            db.records=results; //db객체의 records변수에 저장.
            //console.log(records);
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {goodslist:results}));  // 조회된 상품정보
        }
    });
}

router.get('/', getAdmin);

module.exports=router;
