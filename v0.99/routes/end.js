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

 

const getEnd=(req, res)=>{
    var htmlstream='';

 
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yyyy = today.getFullYear();
	var mmm = mm +1;

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

	

    const sql_week1='SELECT * FROM t1_goods where status=\'finish\' and time_year='+yyyy+' and time_month='+ mmm +' and time_day BETWEEN '+day_1+' and '+day_7+' ORDER BY regist_day ASC;';   //시간 계산
    const sql_week2='select goo_id, buyer_id from t1_deal where status!=\'active\' order by goo_id;'; //상품에 투자한 인원 계산
    const sql_week3='select goo_id, sum(invest_coin)total from t1_deal where status!=\'active\' group by goo_id;' //상품에 투자 된 금액 계산
    const sql_week4=' select goo_id, buyer_id, sum(invest_coin)invest from t1_deal where status=\'win\' group by goo_id;';//판매자와 당첨자 
    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/end.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
	client.query(sql_week1+sql_week2+sql_week3+sql_week4, (error, results, fields) => {  
	//co/nsole.log(sql_week1+sql_week2+sql_week3);
 
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');

            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //admin_nav                
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream), {auth:0, mem_id:req.session.mem_name, 
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
           	res.end(ejs.render(htmlstream, {goodslist:results[0], attend:deals, total:results[2], userdeal:results[3], 

					 auth:req.session.auth ,
					mem_id:req.session.mem_name, 
profit:profit,

				}));
 // 조회된 상품정보
        }
    });


}


router.get('/end', getEnd);


module.exports = router;