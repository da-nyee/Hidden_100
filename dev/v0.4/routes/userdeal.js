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
	if(req.session.auth==99){
   let htmlstream='';
   htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/applylist.ejs', 'utf8');  //Body
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
   const sql='SELECT * FROM t1_deal, t1_goods where t1_deal.buyer_id=\''+req.session.who+'\'  and t1_deal.goo_id=t1_goods.goo_id ORDER BY invest_day ASC limit 8'; 
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
         res.end(ejs.render(htmlstream, {applylist:results,
					 auth:req.session.auth ,
					 mem_id:req.session.who,
					})); 
     }
      else {  // 조회된 상품이 있다면, 상품리스트를 출력
         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {applylist:results,
					 auth:req.session.auth ,
					 mem_id:req.session.who,
					}));  // 조회된 상품정보
      }
   });
	}else{
	           htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'로그인이 필요한 서비스입니다.',
                        'return_url':'/users/auth'
                    }));

	}

}

router.get('/applylist', getApply);

const getWinning=(req, res)=>{
	if(req.session.auth==99){
   let htmlstream='';
   htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/winninglist.ejs', 'utf8');  //Body
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

   const sql='SELECT * FROM t1_deal, t1_goods where t1_deal.buyer_id=\''+req.session.who+'\' and t1_deal.status=\'win\' and t1_deal.goo_id=t1_goods.goo_id ORDER BY invest_day ASC limit 8'; 
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
         res.end(ejs.render(htmlstream, {applylist:results,
					 auth:req.session.auth ,
					 mem_id:req.session.who,
					})); 
     }
      else {  // 조회된 상품이 있다면, 상품리스트를 출력
	const sql_goods=''
         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {winninglist:results,
					 auth:req.session.auth ,
					 mem_id:req.session.who,
					})); 	  // 조회된 상품정보
      }
   });

	}else{
	           htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                    res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'로그인이 필요한 서비스입니다.',
                        'return_url':'/users/auth'
                    }));

	}

}

router.get('/winninglist', getWinning);

module.exports = router;
