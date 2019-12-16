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
//const db=require('./records');
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

const getAdmin=(req, res)=>{
    var htmlstream='';

    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_chart.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
    const sql='SELECT * FROM t1_goods where status=\'active\' and time_day='+dd+' and time_month='+ mm +' ORDER BY regist_day deSC;';   //시간 계산
    const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; //상품에 투자한 인원 계산
    const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;' //상품에 투자 된 금액 계산

    const sql4='select count(*) AS namesCount from t1_goods where goo_type=\'digital\';';   //타입별 갯수
    const sql5='select count(*) AS namesCount from t1_goods where goo_type=\'clothes\';'; 
    const sql6='select count(*) AS namesCount from t1_goods where goo_type=\'furniture\';';   //타입별 갯수
    const sql7='select count(*) AS namesCount from t1_goods where goo_type=\'makeup\';'; 
	var ddd=dd+1;
    const sql8='select count(*) AS namesCount from t1_goods where goo_type=\'digital\' and date(regist_day) BETWEEN \''+yyyy +'-'+mm+'-'+dd+'\' AND \''+yyyy +'-'+mm+'-'+ddd+'\';';   //오늘 등록된 상품의 타입별 갯수
    const sql9='select count(*) AS namesCount from t1_goods where goo_type=\'clothes\' and date(regist_day) BETWEEN \''+yyyy +'-'+mm+'-'+dd+'\' AND \''+yyyy +'-'+mm+'-'+ddd+'\';';  
    const sql10='select count(*) AS namesCount from t1_goods where goo_type=\'furniture\' and date(regist_day) BETWEEN \''+yyyy +'-'+mm+'-'+dd+'\' AND \''+yyyy +'-'+mm+'-'+ddd+'\';';    //타입별 갯수
    const sql11='select count(*) AS namesCount from t1_goods where goo_type=\'makeup\' and date(regist_day) BETWEEN \''+yyyy +'-'+mm+'-'+dd+'\' AND \''+yyyy +'-'+mm+'-'+ddd+'\';';  

    const sql12='select count(*) AS namesCount from t1_member where status =\'stop\';';    //회원의 수
    const sql13='select count(*) AS namesCount from t1_member where date(regist_day)=\''+yyyy +'-'+mm+'-'+dd+'\' and status!=\'stop\';'; 
    const sql14='select count(*) AS namesCount from t1_member where date(regist_day)!=\''+yyyy +'-'+mm+'-'+dd+'\' and status!=\'stop\' and level=\'gold\';';   //타입별 갯수
    const sql15='select count(*) AS namesCount from t1_member where date(regist_day)!=\''+yyyy +'-'+mm+'-'+dd+'\' and status!=\'stop\' and level=\'silver\';'; 



    client.query(sql+sql2+sql3+sql4+sql5+sql6+sql7+sql8+sql9+sql10+sql11+sql12+sql13+sql14+sql15, (error, results, fields) => {  // 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다.        
        if (error)
            res.status(562).end("DB query is failed");

        else if (results.length <= 0){  // 조회된 상품이 없다면, 오류메시지 출력
            console.log('조회된 상품이 없습니다');

            htmlstream='';
            htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav                
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/nothing.ejs', 'utf8');  //Body
            htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
        
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream), {auth:0, mem_id:"0"});
        }            
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            req.session.items=results[0];
            req.session.item=results[0];
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

            console.log(deals);
            
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {goodslist:results[0], attend:deals, total:results[2],  auth:req.session.auth, 
		all_digital:results[3], all_clothes:results[4], all_furniture:results[5], all_makeup:results[6],
		today_digital:results[7], today_clothes:results[8], today_furniture:results[9], today_makeup:results[10],
	 
		user_stop:results[11], user_new:results[12], user_gold:results[13], user_silver:results[14],
                admin_id:req.session.who}));  // 조회된 상품정보
        }
    });
}

router.get('/', getAdmin);

module.exports=router;
