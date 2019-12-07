const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const   router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

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

const getApply=(req, res)=>{
   let htmlstream='';
   htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/applylist.ejs', 'utf8');  //Body
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

   const sql='SELECT * FROM t1_deal where buyer_id=1 ORDER BY invest_day ASC limit 8'; //로그인 기능이 완성 되면 buyer_id값 수정
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
         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {applylist:results}));  // 조회된 상품정보
      }
   });
}

router.get('/applylist', getApply);

const getWinning=(req, res)=>{
   let htmlstream='';
   htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/winninglist.ejs', 'utf8');  //Body
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

   const sql='SELECT * FROM t1_deal where buyer_id=2 and status=\'win\' ORDER BY invest_day ASC limit 8'; //로그인 기능이 완성 되면 buyer_id값 수정
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
         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {winninglist:results}));  // 조회된 상품정보
      }
   });
}

router.get('/winninglist', getWinning);

module.exports = router;
