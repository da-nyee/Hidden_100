const fs = require('fs');
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const url=require('url');
const querystring=require('querystring');
const multer = require('multer');
const path = require('path');

const upload = multer({
   storage: multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, 'public/img/goods');
      },
      filename: function (req, file, cb) {
         time_temp=new Date();
         cb(null, time_temp.getTime() + path.extname(file.originalname));
         img_url=time_temp.getTime() + path.extname(file.originalname);
      }
   }),
 });

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
	if(req.session.auth==99){
   let htmlstream='';
   htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/applylist.ejs', 'utf8');  //Body
   htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
   
   const sql='select t1_goods.goo_img, t1_deal.goo_id, t1_deal.goo_name, t1_deal.goal_price, t1_deal.buyer_id, t1_deal.status, sum(invest_coin)total from t1_deal inner join t1_goods on t1_deal.goo_id=t1_goods.goo_id where buyer_id=\''+req.session.who+'\' group by goo_id order by invest_day desc;';  //사용자가 투자한 금액 계산
   const sql2='select t1_deal.*, t1_goods.time_year, t1_goods.time_month, t1_goods.time_day, t1_goods.time_hour, t1_goods.time_minute from t1_deal inner join t1_goods on t1_deal.goo_id=t1_goods.goo_id where buyer_id=\''+req.session.who+'\' ORDER BY invest_day deSC;' //시간 계산
   client.query(sql+sql2, (error, results, fields) => {  // 상품조회 SQL실행
      if (error)
         res.status(562).end("DB query is failed");

      else if (results[1].length <= 0){
         console.log('조회된 상품이 없습니다');

         htmlstream='';
         htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
         htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
         htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
         htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        
         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {
					 auth:req.session.auth ,
					 mem_id:req.session.who,
					})); 
     }
      else {  // 조회된 상품이 있다면, 상품리스트를 출력
         db.records=results[1];

         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {applylist:results[0],
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

   const sql='select t1_deal.*, t1_goods.goo_img from t1_deal inner join t1_goods on t1_deal.goo_id=t1_goods.goo_id where buyer_id=\''+req.session.who+'\' and t1_deal.status=\'win\' ORDER BY invest_day deSC;'; //당첨 내역 정보
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
         res.end(ejs.render(htmlstream, {
					 auth:req.session.auth ,
					 mem_id:req.session.who,
					})); 
     }
      else {  // 조회된 상품이 있다면, 상품리스트를 출력
         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream, {winninglist:results,
					 auth:req.session.auth ,
					 mem_id:req.session.who,
			})); 	  // 조회된 상품정보
      }
   });

	} else{
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

const getReport=(req, res)=>{
   const parsedUrl=url.parse(req.url);
   const query=querystring.parse(parsedUrl.query);

	if(req.session.auth==99){
      let htmlstream='';
      htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
      htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
      htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/report.ejs', 'utf8');  //Body
      htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

      const sql=`select t1_deal.*, t1_goods.goo_img from t1_deal inner join t1_goods on t1_deal.goo_id=t1_goods.goo_id where buyer_id=\'${req.session.who}\' and t1_deal.status=\'win\' and t1_deal.goo_id=${query.item};`; //당첨 내역 정보
      client.query(sql, (error, result, fields) => {  
         if (error)
            res.status(562).end("DB query is failed");

         else if (result.length <= 0){  
            console.log('조회된 상품이 없습니다');

            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {
				   	 auth:req.session.auth ,
					    mem_id:req.session.who,
				})); 
         }
         else {  
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {info:result,
				   	 auth:req.session.auth ,
					    mem_id:req.session.who,
			   })); 	  
         }
      });
	} else{
	   htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
         res.status(562).end(ejs.render(htmlstream, {
            'title':'Hidden 100',
            'warn_title':'로그인 오류',
            'warn_message':'로그인이 필요한 서비스입니다.',
            'return_url':'/users/auth'
      }));
   }
}

router.get('/report', getReport);

function getInfo(formInfo, sqls){
   return new Promise((resolve, reject)=>{
      client.query(sqls, (error, results)=>{
         if(error)
            reject(error);

         else{
            const info=[results[0][0].buyer_name, results[1][0].seller_name, formInfo];

            resolve(info);  //resolve는 인자를 하나 밖에 전달 못 하더라......
         }
      });
   });     
};

const postReport=(req, res)=>{
   console.log('body', req.body);

   const sql=`select mem_name as buyer_name from t1_member where mem_id=${req.body.buyer_id};`;
   const sql2=`select mem_name as seller_name from t1_member where mem_id=${req.body.seller_id};`;
   const sqls=sql+sql2;

   getInfo(req.body, sqls)
      .then((info)=>{
         console.log(info);
         console.log(info[2].buyer_id);

         const sql=`insert into t1_report values(default, ${info[2].buyer_id}, \'${info[0]}\', \'${info[2].subject}\', \'${info[2].goo_info}\', default, \'${img_url}\', ${info[2].seller_id}, \'${info[1]}\', ${info[2].goo_id});`;
         client.query(sql, (error, result)=>{
            if(error)
               res.end(JSON.stringify(error));

            else
               res.send('<script type="text/javascript">alert("신고가 완료 되었습니다."); location.href="/"; </script>')
         });
      })
      .catch((error)=>{
         console.log('error', error);

         res.status(562).end(error);
      })
}

router.post('/report/post', upload.single('goo_img'), postReport);

module.exports = router;
