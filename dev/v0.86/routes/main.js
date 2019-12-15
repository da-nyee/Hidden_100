const express=require('express');
const fs=require('fs');
const ejs=require('ejs');
const mysql=require('mysql');
const router=express.Router();

//const db=require('./records');  //Object를 반환한다{key:value}.
                                //object는 첫 문자가 영문 소문자이고 빌트인 오브젝트로 생성한 오브젝트를 나타낸다(ex:Function, Object, Array, Number, String 등).
                                //첫 문자가 대문자인 Object는 {key:value}형태를 의미한다.
                                //new연산자로 생성한 오브젝트를 인스턴스라고 한다. 
                                //그냥 바로 변수에 저장하면 안 된다!!!???
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

const getMain=(req, res)=>{
    let htmlstream='';
    htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/slide.ejs', 'utf8'); //user_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  //Body
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer
var slide_data = fs.readFileSync('./public/add.json');
slide_data=JSON.parse(slide_data);

//var slide_data = require('./public/add.json');

    const sql='SELECT * FROM t1_goods where status=\'active\' ORDER BY regist_day deSC;';
    const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; //투자한 인원 수 계산
    client.query(sql+sql2, (error, results, fields) => {  // 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다.
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
	        req.session.items=results[0]; //db객체의 records변수에 저장.
            req.session.item=results[0];
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
		    if(req.session.auth==undefined){req.session.auth=0;}
		        if(req.session.who==undefined){req.session.who='0';}
                    res.end(ejs.render(htmlstream, {goodslist:results[0], 
                        attend:deals,text : slide_data.text,

					    auth:req.session.auth ,
                        mem_id:req.session.who,
		    }));  // 조회된 상품정보
        }
    });
}

router.get('/', getMain); 
module.exports=router;