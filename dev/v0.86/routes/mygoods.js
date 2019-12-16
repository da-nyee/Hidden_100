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

router.post('/delete/:goo_id', (req,res)=>{	//판매 취소, 환불
	const confirm=`select * from t1_deal where goo_id=${req.params.goo_id};`;
	client.query(confirm, (error, result)=>{
		if(error){
			console.error(error);
		}
		else if(result.length<=0){
			const sql_delete='update t1_goods set status=\'canceled\' where goo_id='+req.params.goo_id+';';
			client.query(sql_delete, (error, results, fields) => {
				if (error) {
					console.log(error);
					} 
				else {
				   console.log("사용자가 상품을 삭제했습니다.");
				   res.send('<script type="text/javascript">alert("상품을 삭제했습니다."); location.href="/mygoods/goodslist"; </script>');
				}
			});
		}
		else{
			console.log('async start');

			(async function(){
				console.log('async in');

				const result=()=>{
					console.log('first await');
	
					return new Promise((resolve, reject)=>{		
						const sql=`select buyer_id, sum(invest_coin)total from t1_deal where goo_id=${req.params.goo_id} group by buyer_id;`
						client.query(sql, (error, result)=>{
							if(error){
								reject('sql error');
							}
							else{
								console.log('first await success');
								console.log(result);
								resolve(result);
							}
						});
					});
				};

				const records=await result();

				const second=(records)=>{
					console.log('2nd await');
					console.log(records);
	
					return new Promise((resolve, reject)=>{
						const funcs=[];
	
						records.forEach((record)=>{
							console.log(record);

							const func=(record)=>{
								return new Promise((resolve2, reject2)=>{
									const sqls=`update t1_member set coin=coin+${record.total} where mem_id=\'${record.buyer_id}\';`;
									client.query(sqls, (error, result)=>{
										if(error){
											reject2('func error');
										}
										else{
											console.log('func success');
											resolve2();
										}
									});
								})
							};
	
							funcs.push(func(record));
						});
	
						try{
							(async function(){
								for await (promise of funcs){
									console.log('promise success');
								}

								(await function(){
									resolve();
								}());
							}());
						}
						catch(error){
							console.error(error);
						}
					});
				};
				await second(records);
				
				(await function(){
					console.log('3rd await');
	
					return new Promise((resolve, reject)=>{
						const sql=`delete from t1_deal where goo_id=${req.params.goo_id};`;
						client.query(sql, (error, result)=>{
							if(error){
								console.log('sql2 error');
							}
							else{
								console.log('sql2 success');
								resolve();
							}
						});
					});
				}());
				(await function(){
					const sql=`update t1_goods set status='canceled' where goo_id=${req.params.goo_id};`;
					client.query(sql, (error, result)=>{
						if(error){
							console.error('sql3 error');
						}
						else{
							console.log('canceled!!!');
							res.send('<script type="text/javascript">alert("상품을 삭제했습니다."); location.href="history.go(-2)"; </script>');				
						}
					});
				}());
			}());
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
		if(results[0].status=='finish'||results[0].status=='fail'){
			res.send('<script type="text/javascript">alert("이미 종료된 거래입니다."); location.href="/mygoods/goodslist"; </script>')
		}
		else{
			res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
			res.end(ejs.render(htmlstream, {goods_info:results[0],
						 auth:req.session.auth ,
						 mem_id:req.session.who,
						goo_id:req.params.goo_id
			}));
		}
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

function getTotal(obj){
	return new Promise((resolve, reject)=>{
		if(obj.error){
			//console.log(obj.error);
			reject('error in getTotal');
		}
		else{	
			//console.log('sql success')
			resolve(obj);
		}
	});
};

const getGoodslist=(req, res)=>{
	if(req.session.auth==99){
		let htmlstream='';
		htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    	htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    	htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/mygoods_list.ejs','utf8');
		htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');
		
		const sql=`SELECT * FROM t1_goods where mem_id=\'${req.session.who}\' order by regist_day desc;`;
    	client.query(sql, (error, results) => {
			if(error)
				console.log('sql error', error);

			else{
				//console.log(results);
				req.session.item=results;

				const temp={
					results:results,
					error:error,
					req:req,
					res:res,
				};

				getTotal(temp)
					.then((obj)=>{
						//console.log('first then');

						return new Promise((resolve, reject)=>{
							obj.results.forEach((item, i)=>{
								item.gain_coin=0;

								if(i==obj.results.length-1)
									resolve(obj);
							});

							reject('first then error');
						});
					})
					.then((obj)=>{
						//console.log('second then');
						
						return new Promise((resolve, reject)=>{
							obj.results.forEach((item, index)=>{
								item.sql=`select * from t1_deal where goo_id=${item.goo_id};`;

								if(index==obj.results.length-1)
									resolve(obj);
							});

							reject('2nd then error');
						});
					})
					.then((obj)=>{
						//console.log('3rd then');

						return new Promise((resolve, reject)=>{
							const funcs=[];

							obj.results.forEach((item)=>{
								const func=(item)=>{
									return new Promise((resolve2, reject2)=>{
										client.query(item.sql, (error, records)=>{
											if(error)
												console.log('func query error');
											else{
												//console.log('func query success');
										
												delete item.sql

												resolve2(records);
											}

											reject2('func error');
										});
									});
								}
								
								funcs.push(func(item));
							});

							Promise.all(funcs)
								.then((datas)=>{
									//console.log('promise all');

									obj.results.forEach((item)=>{
										datas.forEach((data)=>{
											data.forEach((d)=>{
												if(item.goo_id==d.goo_id)
													item.gain_coin+=d.invest_coin;
											})
										});
									});

									resolve(obj);
								})
								.catch((error)=>{
									reject(error);
								});
						});
					})
					.then((obj)=>{
						//console.log('4rd then');

						res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           				res.end(ejs.render(htmlstream, {goodslist:obj.results,
					 		auth:obj.req.session.auth ,
					 		mem_id:obj.req.session.who,
						})); 
					})
					.catch((error)=>{
						//console.log(error);
						res.end(error);
					});
			}
		});
	}
	else{
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