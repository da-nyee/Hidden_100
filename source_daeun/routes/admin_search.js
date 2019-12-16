const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs');
const ejs = require('ejs');

router.use(bodyParser.urlencoded({extended:false}));

const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'2019pprj',
    password:'pprj2019',
    database:'db2019',
    multipleStatements: true
});

/* 검색 기능 (관리자) */
const adminSearchGoods = (req, res) => {
    var htmlstream='';

    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    /* header */
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); /* admin_nav */
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro_search.ejs', 'utf8');  /* body */
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */

    /* const sql_str = "SELECT * from t1_goods where status=\'active\' and goo_name like '%"+req.body.search+"%';"; */

    if(req.body.category == 'all'){
        const sql_str = "SELECT * from t1_goods where status=\'active\' and goo_name like '%"+req.body.search+"%';";

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        
        const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; /* 상품에 투자한 인원 계산 */
        const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;' /* 상품에 투자 된 금액 계산 */
    
        db.query(sql_str+sql2+sql3, (error, results, fields) => {  /* 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다. */       
            if (error)
                res.status(562).end("DB query is failed");
    
            else if (results.length <= 0){  /* 조회된 상품이 없다면, 오류메시지 출력 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); /* admin_nav */              
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro_search.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
            
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream), {
                    auth:0,
                    mem_id:"0"
                });
            }            
            else {  /* 조회된 상품이 있다면, 상품리스트를 출력 */
                req.session.items=results[0];
                req.session.item=results[0];
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
                
                /* 상품마다 투자한 인원이 몇 명인지 구하는 알고리즘 */
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
                res.end(ejs.render(htmlstream, { /* 조회된 상품정보 */
                    goodslist:results[0],
                    attend:deals,
                    total:results[2],
                    auth:req.session.auth,
                    admin_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'clothes'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'clothes\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        
        const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; /* 상품에 투자한 인원 계산 */
        const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;' /* 상품에 투자 된 금액 계산 */
    
        db.query(sql_str+sql2+sql3, (error, results, fields) => {  /* 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다. */       
            if (error)
                res.status(562).end("DB query is failed");
    
            else if (results.length <= 0){  /* 조회된 상품이 없다면, 오류메시지 출력 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); /* admin_nav */              
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro_search.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
            
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream), {
                    auth:0,
                    mem_id:"0"
                });
            }            
            else {  /* 조회된 상품이 있다면, 상품리스트를 출력 */
                req.session.items=results[0];
                req.session.item=results[0];
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
                
                /* 상품마다 투자한 인원이 몇 명인지 구하는 알고리즘 */
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
                res.end(ejs.render(htmlstream, { /* 조회된 상품정보 */
                    goodslist:results[0],
                    attend:deals,
                    total:results[2],
                    auth:req.session.auth,
                    admin_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'makeup'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'makeup\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        
        const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; /* 상품에 투자한 인원 계산 */
        const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;' /* 상품에 투자 된 금액 계산 */
    
        db.query(sql_str+sql2+sql3, (error, results, fields) => {  /* 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다. */       
            if (error)
                res.status(562).end("DB query is failed");
    
            else if (results.length <= 0){  /* 조회된 상품이 없다면, 오류메시지 출력 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); /* admin_nav */              
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro_search.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
            
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream), {
                    auth:0,
                    mem_id:"0"
                });
            }            
            else {  /* 조회된 상품이 있다면, 상품리스트를 출력 */
                req.session.items=results[0];
                req.session.item=results[0];
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
                
                /* 상품마다 투자한 인원이 몇 명인지 구하는 알고리즘 */
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
                res.end(ejs.render(htmlstream, { /* 조회된 상품정보 */
                    goodslist:results[0],
                    attend:deals,
                    total:results[2],
                    auth:req.session.auth,
                    admin_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'digital'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'digital\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        
        const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; /* 상품에 투자한 인원 계산 */
        const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;' /* 상품에 투자 된 금액 계산 */
    
        db.query(sql_str+sql2+sql3, (error, results, fields) => {  /* 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다. */       
            if (error)
                res.status(562).end("DB query is failed");
    
            else if (results.length <= 0){  /* 조회된 상품이 없다면, 오류메시지 출력 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); /* admin_nav */              
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro_search.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
            
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream), {
                    auth:0,
                    mem_id:"0"
                });
            }            
            else {  /* 조회된 상품이 있다면, 상품리스트를 출력 */
                req.session.items=results[0];
                req.session.item=results[0];
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
                
                /* 상품마다 투자한 인원이 몇 명인지 구하는 알고리즘 */
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
                res.end(ejs.render(htmlstream, { /* 조회된 상품정보 */
                    goodslist:results[0],
                    attend:deals,
                    total:results[2],
                    auth:req.session.auth,
                    admin_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'furniture'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'furniture\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        
        const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; /* 상품에 투자한 인원 계산 */
        const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;' /* 상품에 투자 된 금액 계산 */
    
        db.query(sql_str+sql2+sql3, (error, results, fields) => {  /* 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다. */       
            if (error)
                res.status(562).end("DB query is failed");
    
            else if (results.length <= 0){  /* 조회된 상품이 없다면, 오류메시지 출력 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); /* admin_nav */              
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro_search.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
            
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream), {
                    auth:0,
                    mem_id:"0"
                });
            }            
            else {  /* 조회된 상품이 있다면, 상품리스트를 출력 */
                req.session.items=results[0];
                req.session.item=results[0];
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
                
                /* 상품마다 투자한 인원이 몇 명인지 구하는 알고리즘 */
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
                res.end(ejs.render(htmlstream, { /* 조회된 상품정보 */
                    goodslist:results[0],
                    attend:deals,
                    total:results[2],
                    auth:req.session.auth,
                    admin_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'others'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'others\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        
        const sql2='select goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;'; /* 상품에 투자한 인원 계산 */
        const sql3='select goo_id, sum(invest_coin)total from t1_deal where status=\'active\' group by goo_id;' /* 상품에 투자 된 금액 계산 */
    
        db.query(sql_str+sql2+sql3, (error, results, fields) => {  /* 상품조회 SQL실행. 레코드 전체는 배열으로, 레코드 각각은 json형식으로 가져온다. */       
            if (error)
                res.status(562).end("DB query is failed");
    
            else if (results.length <= 0){  /* 조회된 상품이 없다면, 오류메시지 출력 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); /* admin_nav */              
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/adminpro_search.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
            
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream), {
                    auth:0,
                    mem_id:"0"
                });
            }            
            else {  /* 조회된 상품이 있다면, 상품리스트를 출력 */
                req.session.items=results[0];
                req.session.item=results[0];
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
                
                /* 상품마다 투자한 인원이 몇 명인지 구하는 알고리즘 */
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
                res.end(ejs.render(htmlstream, { /* 조회된 상품정보 */
                    goodslist:results[0],
                    attend:deals,
                    total:results[2],
                    auth:req.session.auth,
                    admin_id:req.session.who
                }));
            }
        });
    }
}

router.post('/search', adminSearchGoods);

module.exports=router;