const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   url = require('url');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const multer = require('multer'); 



const path = require('path');
 


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


const getProfitChange=(req, res)=>{
    var htmlstream='';


	if(req.session.auth==91){

    let htmlstream='';

var profit_data = fs.readFileSync('./public/profit.json');
profit_data=JSON.parse(profit_data);
//console.log(profit_data.fee);

    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/profit_form.ejs', 'utf8'); //admin_nav
 
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    try{
var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {data : profit_data,
					 auth:req.session.auth ,
					admin_id:req.session.admin_name,
profit:profit,

				}));
	}catch(err){console.log(err)}
	}else{
	           htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                   res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'로그인이 필요한 서비스입니다.',
                        'return_url':'/admin/admins/auth'
                    }));

	}

}
const postProfitChange=(req, res)=>{
	var json ={};
	json.charge_fee_silver=req.body.charge_fee_silver
	json.charge_fee_gold=req.body.charge_fee_gold

	json.fee=req.body.fee
	json.great_success=req.body.great_success
	console.log(json);
	json = JSON.stringify(json);
	//console.log(json);

fs.writeFileSync("./public/profit.json", json, 'utf8');
 

res.send('<script type="text/javascript">alert("수수료 변경에 성공했습니다."); location.href="/admin/profit/change"; </script>');

}

router.get('/change', getProfitChange);
router.post('/change/post', postProfitChange);


const getProfitChart=(req, res)=>{
    var htmlstream='';


    if(req.session.auth==91){

    let htmlstream='';
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yyyy = today.getFullYear();
	var mmm = mm +1;
 
    const sql1='select sum(commission) as profit from t1_profit_goods where date(regist_day) BETWEEN \''+yyyy +'-'+mm+'\' AND \''+yyyy +'-'+mm+'-31\';';  
    const sql2='select sum(commission) as profit from t1_profit_coin where date(charge_day) BETWEEN \''+yyyy +'-'+mm+'\' AND \''+yyyy +'-'+mm+'-31\';';  



    const sql5='select sum(commission) as profit from t1_profit_goods where date(regist_day) BETWEEN \''+yyyy +'-'+mmm+'-1\' AND \''+yyyy +'-'+mmm+'-7\';';  
    const sql6='select sum(commission) as profit from t1_profit_coin where date(charge_day) BETWEEN \''+yyyy +'-'+mmm+'-1\' AND \''+yyyy +'-'+mmm+'-7\';';  

    const sql7='select sum(commission) as profit from t1_profit_goods where date(regist_day) BETWEEN \''+yyyy +'-'+mmm+'-8\' AND \''+yyyy +'-'+mmm+'-14\';';  
    const sql8='select sum(commission) as profit from t1_profit_coin where date(charge_day) BETWEEN \''+yyyy +'-'+mmm+'-8\' AND \''+yyyy +'-'+mmm+'-14\';';  

    const sql9='select sum(commission) as profit from t1_profit_goods where date(regist_day) BETWEEN \''+yyyy +'-'+mmm+'-15\' AND \''+yyyy +'-'+mmm+'-21\';';  
    const sql10='select sum(commission) as profit from t1_profit_coin where date(charge_day) BETWEEN \''+yyyy +'-'+mmm+'-15\' AND \''+yyyy +'-'+mmm+'-21\';';  

    const sql11='select sum(commission) as profit from t1_profit_goods where date(regist_day) BETWEEN \''+yyyy +'-'+mmm+'-22\' AND \''+yyyy +'-'+mmm+'-28\';';  
    const sql12='select sum(commission) as profit from t1_profit_coin where date(charge_day) BETWEEN \''+yyyy +'-'+mmm+'-22\' AND \''+yyyy +'-'+mmm+'-28\';';  

    const sql13='select sum(commission) as profit from t1_profit_goods where date(regist_day) BETWEEN \''+yyyy +'-'+mmm+'-29\' AND \''+yyyy +'-'+mmm+'-31\';';  
    const sql14='select sum(commission) as profit from t1_profit_coin where date(charge_day) BETWEEN \''+yyyy +'-'+mmm+'-29\' AND \''+yyyy +'-'+mmm+'-31\';';  

 
    const sql3='select sum(commission) as profit from t1_profit_goods where date(regist_day) BETWEEN \''+yyyy +'-'+mmm+'\' AND \''+yyyy +'-'+mmm+'-31\';';  
    const sql4='select sum(commission) as profit from t1_profit_coin where date(charge_day) BETWEEN \''+yyyy +'-'+mmm+'\' AND \''+yyyy +'-'+mmm+'-31\';';  

	if(dd<8){
		var day_1=1;
		var day_7=7;
	}else if(dd<15){
		var day_1=8;
		var day_7=14;
	}else if(dd<22){
		var day_1=15;
		var day_7=21;
	}else if(dd<29){
		var day_1=22;
		var day_7=28;
	}else {
		var day_1=29;
		var day_7=31;
	}

	

    const sql_week1='SELECT * FROM t1_goods where status!=\'active\' and time_year='+yyyy+' and time_month='+ mmm +' and time_day BETWEEN '+day_1+' and '+day_7+' ORDER BY regist_day ASC;';   //시간 계산
    const sql_week2='select goo_id, buyer_id from t1_deal where status!=\'active\' order by goo_id;'; //상품에 투자한 인원 계산
    const sql_week3='select goo_id, sum(invest_coin)total from t1_deal where status!=\'active\' group by goo_id;' //상품에 투자 된 금액 계산
    const sql_week4=' select goo_id, buyer_id, sum(invest_coin)invest from t1_deal where status=\'win\' group by goo_id;';//판매자와 당첨자 
    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/profit_chart.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
	client.query(sql_week1+sql_week2+sql_week3+sql1+sql2+sql3+sql4+sql5+sql6+sql7+sql8+sql9+sql10+sql11+sql12+sql13+sql14+sql_week4, (error, results, fields) => {  
	//console.log(sql_week1+sql_week2+sql_week3);
     console.log(results);
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');

            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav                
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream), {auth:0, admin_id:req.session.admin_name,
profit:profit,
});
        }            
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            db.records=results[0];
            let deal={
                id:0,
                buyers:[],
            }
            let deals=new Array();
            
            //상품마다 투자한 인원이 몇 명인지 구하는 알고리즘
            results[1].forEach((data, index)=>{
                if(deal.buyers.length==0){
                    deal.id=data.goo_id;
                    deal.buyers.push(data.buyer_id);
                }

                if(deal.id!=data.goo_id){
                    deals.push(Object.assign({}, deal));
                    deal.id=data.goo_id;
                    deal.buyers=[];
                    deal.buyers.push(data.buyer_id);
                }

                for(let i=0;i<deal.buyers.length;i++){
                    if(deal.buyers[i]==data.buyer_id){
                        break;
                    }

                    if(i==(deal.buyers.length-1)){
                        deal.buyers.push(data.buyer_id);
                    }
                }

                if(index==(results[1].length-1))
                    deals.push(Object.assign({}, deal));
            });
            //console.log(results[0]);
            // console.log(deals);
            //console.log(results[2]);
            //console.log(results[17]);
            var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

           		//console.log(results);
		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {goodslist:results[0], attend:deals, total:results[2], userdeal:results[17], 
					preMonth_goods:results[3], preMonth_coin:results[4], Month_goods:results[5], Month_coin:results[6], 
					week1_goods:results[7], week1_coin:results[8], week2_goods:results[9], week2_coin:results[10], 
					week3_goods:results[11], week3_coin:results[12], week4_goods:results[13], week4_coin:results[14], 
					week5_goods:results[15], week5_coin:results[16], 

					 auth:req.session.auth ,
admin_id:req.session.admin_name,
profit:profit,

				}));
 // 조회된 상품정보
        }
    });

    }else{
	           htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                   res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'관리자 로그인이 필요한 서비스입니다.',
                        'return_url':'/'
                    }));

	}

}


router.get('/chart', getProfitChart);


const getSearchChart=(req, res)=>{
 


	if(req.session.auth==91){

    let htmlstream='';

var profit_data = fs.readFileSync('./public/profit.json');
profit_data=JSON.parse(profit_data);
//console.log(profit_data.fee);

    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/search_chart.ejs', 'utf8');  

    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');   
	const sql_max='select max(id)max from t1_search;';
 
	client.query(sql_max, (error, max, fields) => { 
	console.log(max);
	var min=max[0].max-100;
	const sql_search1='select str, avg(search_time) as time, count(str) as num from t1_search group by str order by num desc limit 10;';
	const sql_search2='select str, avg(search_time) as time, count(str) as num from t1_search where id between '+min+' and ' +max[0].max +' group by str order by num desc limit 10;';
var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);
 
	client.query(sql_search1+sql_search2, (error, results, fields) => { 
		console.log(results);
		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {
					 all_data:results[0],
					now_data:results[1],
					 auth:req.session.auth ,
admin_id:req.session.admin_name,
profit:profit,

				}));

	})

	})
 
	}else{
	          htmlstream = fs.readFileSync(__dirname + '/../views/alert.ejs','utf8');
                   res.status(562).end(ejs.render(htmlstream, {
                        'title':'Hidden 100',
                        'warn_title':'로그인 오류',
                        'warn_message':'로그인이 필요한 서비스입니다.',
                        'return_url':'/admin/admins/auth'
                   }));

	}

}

router.get('/search', getSearchChart);


module.exports = router;