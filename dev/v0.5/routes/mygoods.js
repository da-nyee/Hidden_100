const  express = require('express');
const   fs = require('fs');
const  ejs = require('ejs');
const bodyParser = require('body-parser')
const  router = express.Router();
const mysql=require('mysql');
var time_temp;
var img_url;
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
function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
}


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

router.post('/post', upload.single('goo_img'), (req, res) => {
	input_goods=req.body;
	input_goods.goo_id=getRandomInt(1000,999999);
	input_goods.mem_id=req.session.who;
	input_goods.goal_price*=1;
	input_goods.time_year*=1;
	input_goods.time_month*=1;
	input_goods.time_day*=1;
	input_goods.time_hour*=1;
	input_goods.time_minute*=1;
	input_goods.regist_day=time_temp;
	input_goods.goo_img=img_url;

	input_goods.status='active'
	const sql_create='INSERT INTO t1_goods (goo_id, goo_name, goo_type, goal_price, mem_id, regist_day, time_year, time_month, time_day, time_hour, time_minute, status, goo_img, goo_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)';
	client.query(sql_create, [input_goods.goo_id, input_goods.goo_name, input_goods.goo_type, input_goods.goal_price, input_goods.mem_id, input_goods.regist_day, input_goods.time_year, input_goods.time_month, input_goods.time_day, input_goods.time_hour, input_goods.time_minute, input_goods.status, input_goods.goo_img,input_goods.goo_info], (error, results, fields) => {
	  if (error) {
	   	res.redirect('/');
		console.log(error)
	  } else {
	   console.log("사용자가 상품을 등록했습니다.");
	   res.redirect('goodslist');
	  }
   });
});

router.post('/delete/:goo_id', (req,res)=>{
	const sql_delete='DELETE FROM t1_goods where goo_id='+req.params.goo_id+';';
	client.query(sql_delete, (error, results, fields) => {
	  if (error) {
	   	res.redirect('/mygoods/goodslist');
		console.log(error)
	  } else {
	   console.log("사용자가 상품을 삭제했습니다.");
	   res.redirect('/mygoods/goodslist');
	  }
   });


});


router.post('/put/:goo_id', (req,res)=>{
    let htmlstream='';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/mygoods_put.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    const sql_put='SELECT * FROM t1_goods where goo_id='+req.params.goo_id+';';
	client.query(sql_put, (error, results, fields) => {
	//console.log(results);
	res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
	res.end(ejs.render(htmlstream, {goods_info:results[0],
					 auth:req.session.auth ,
					 mem_id:req.session.who,
					goo_id:req.params.goo_id
				}));
	});

});





router.post('/putt/up', upload.single('goo_img'), (req, res) => {
	input_goods=req.body;
	input_goods.goal_price*=1;
	input_goods.goo_id*=1;
	input_goods.time_year*=1;
	input_goods.time_month*=1;
	input_goods.time_day*=1;
	input_goods.time_hour*=1;
	input_goods.time_minute*=1;
	input_goods.goo_img=img_url;
	console.log(input_goods);
	const sql_putt='UPDATE t1_goods SET goo_name=?, goo_type=?, goal_price=?, time_year=?, time_month=?, time_day=?, time_hour=?, time_minute=?, goo_info=?, goo_img=? WHERE goo_id=?;';
	client.query(sql_putt, [input_goods.goo_name, input_goods.goo_type, input_goods.goal_price, input_goods.time_year, input_goods.time_month,  input_goods.time_day,  input_goods.time_hour, input_goods.time_minute, input_goods.goo_info, input_goods.goo_img,  input_goods.goo_id], (error, results, fields) => {
	  if (error) {
	   	res.redirect('/');
		console.log(error)
	  } else {
	   console.log("사용자가 상품을 수정했습니다..");
	   res.redirect('/mygoods/goodslist');
	  }
   });
		  

});

const getMygoods=(req, res)=>{

	if(req.session.auth==99){

    let htmlstream='';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/mygoods_form.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    try{
		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {
					 auth:req.session.auth ,
					 mem_id:req.session.who,
				}));
	}catch(err){console.log(err)}
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


var test=[];
const getGoodslist=(req, res)=>{
	if(req.session.auth==99){

    let htmlstream='';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/mygoods_list.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    const sql_mygoods='SELECT * FROM t1_goods where mem_id=\''+req.session.who+'\';';
    client.query(sql_mygoods, (error, results, fields) => {  // 상품조회 SQL실행
	results.forEach(function(item,i){
		item.gain_coin=0;
		var sql_mygood = 'SELECT * FROM t1_deal where goo_id='+item.goo_id+';';
		client.query(sql_mygood, (error, data, fields) => {
			//console.log(data);
			if(!error){ 
				data.forEach(function(d){
					item.gain_coin=item.gain_coin+d.invest_coin;
				})
			//console.log(item.gain_coin);
			}
		});
	
	});
	setTimeout(function(req,res){
        if (error){
            res.status(562).end("DB query is failed");
			console.log(error);
		}
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
		//console.log(results.length);
           	res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {goodslist:results ,
					 auth:req.session.auth ,
					 mem_id:req.session.who,
				})); 
       }},120,req, res);
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
router.post('/shipment', (req,res)=>{
	           htmlstream = fs.readFileSync(__dirname + '/../views/mygoods_shipform.ejs','utf8');
                   res.status(200).end(ejs.render(htmlstream, {goo_ship:req.body.goo_ship}));
});

router.post('/shipment/post', (req,res)=>{
	console.log(req.body.goo_ship);
	console.log(req.body.goo_shipment);
	
	const sql_ship='UPDATE t1_goods SET shipment=\''+req.body.goo_shipment+'\' where goo_id=\''+req.body.goo_ship+'\';';
	client.query(sql_ship, (error, results, fields) => {  // 상품조회 SQL실행
		        res.redirect('/mygoods/goodslist');
	});
});


router.get('/goodslist', getGoodslist)

router.get('/', getMygoods)

module.exports=router;