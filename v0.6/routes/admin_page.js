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

const getMainadd=(req, res)=>{
    var htmlstream='';

    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product_mainadd.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
	var add_get = require('../public/add.json');
    const sql='SELECT * FROM t1_goods where status=\'active\' and goo_type=\'digital\' ORDER BY regist_day DESC limit 8;';
    const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;';
    const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;'
    const sql4='select goo_id, goo_img from t1_goods where goo_id in('+add_get.goods.join()+');';
    client.query(sql+sql2+sql3+sql4, (error, results, fields) => {  // 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다.        
        if (error)
            res.status(562).end("DB query is failed");          
        else {  // 조회된 상품이 있다면, 상품리스트를 출력
            db.records=results[0];
            let deal={
                id:0,
                buyers:[],
            }
            let deals=new Array();

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
            
            res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
            res.end(ejs.render(htmlstream, {goodslist:results[0], main_add: results[3], attend:deals, total:results[2], auth:0, mem_id:'t'}));  // 조회된 상품정보
        }
    });
}

const postMainadd=(req, res)=>{
req.body.goo_num=req.body.goo_num*1;
console.log(req.body.goo_num+' 번에 '+req.body.goo_id+'를 저장했습니다.');

var add_set = require('../public/add.json');
add_set.goods[req.body.goo_num]=req.body.goo_id*1;
var json = JSON.stringify(add_set);
fs.writeFileSync("/home/1team/han/v0.5/public/add.json", json, 'utf8');
res.redirect("/admin_page/mainadd");


}

router.get('/mainadd', getMainadd);
router.post('/mainadd/put', postMainadd);

module.exports=router;
