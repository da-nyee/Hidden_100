const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const   router = express.Router();
const db=require('./records');

router.use(bodyParser.urlencoded({ extended: false }));

const client = mysql.createConnection({
	host: 'localhost', // DB서버 IP주소
	port: 3306, // DB서버 Port주소
	user: '2019pprj', // DB접속 아이디
	password: 'pprj2019', // 암호
   database: 'db2019', //사용할 DB명
   multipleStatements: true
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

   const sql='select goo_id, goo_name, goal_price, buyer_id, status, sum(invest_coin)total from t1_deal where buyer_id=2 group by goo_id order by invest_day desc;'; //로그인 기능이 완성 되면 buyer_id값 수정
   const sql2='select t1_deal.*, t1_goods.time_year, t1_goods.time_month, t1_goods.time_day, t1_goods.time_hour, t1_goods.time_minute from t1_deal inner join t1_goods on t1_deal.goo_id=t1_goods.goo_id where buyer_id=2 ORDER BY invest_day deSC;'
   client.query(sql+sql2, (error, results, fields) => {  // 상품조회 SQL실행
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
         console.log(results[1]);
         db.records=results[1];
         
         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {applylist:results[0]}));  // 조회된 상품정보
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

   const sql='SELECT * FROM t1_deal where buyer_id=2 and status=\'win\' ORDER BY invest_day desc'; //로그인 기능이 완성 되면 buyer_id값 수정
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
