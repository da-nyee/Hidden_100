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

/* 검색 기능 (사용자) */
const searchGoods = (req, res) => {
    let htmlstream='';
    htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    /* header */
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); /* user_nav */
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  /* body */
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */

    /* const sql_str = "SELECT * from t1_goods where status=\'active\' and goo_name like '%"+req.body.search+"%';"; */
    
    if(req.body.category == 'all'){
        const sql_str = "SELECT * from t1_goods where status=\'active\' and goo_name like '%"+req.body.search+"%';";

        const sql_str2 = "SELECT goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;"; /* 투자한 인원 수 계산 */

        console.log(sql_str);
        console.log(sql_str2);
    
        db.query(sql_str+sql_str2, (error, results, fields) => {
            console.log(results);
    
            if(error){
                res.status(562).end("Login fails as there is no name in DB!");
            }
            else if(results.length[0] <= 0){  /* select 결과가 없는 경우 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); /* user_nav */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                res.end(ejs.render(htmlstream, {
                       auth:req.session.auth,
                       mem_id:req.session.who
              }));
            }
            else{   /* select 결과가 있는 경우 */
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                req.session.item = results[0];
    
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
    
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
                res.end(ejs.render(htmlstream, {
                    goodslist:results[0],
                    attend:deals,
                    auth:req.session.auth,
                    mem_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'clothes'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'clothes\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        const sql_str2 = "SELECT goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;"; /* 투자한 인원 수 계산 */

        console.log(sql_str);
        console.log(sql_str2);
    
        db.query(sql_str+sql_str2, (error, results, fields) => {
            console.log(results);
    
            if(error){
                res.status(562).end("Login fails as there is no name in DB!");
            }
            else if(results.length[0] <= 0){  /* select 결과가 없는 경우 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); /* user_nav */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                res.end(ejs.render(htmlstream, {
                       auth:req.session.auth,
                       mem_id:req.session.who
              }));
            }
            else{   /* select 결과가 있는 경우 */
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                req.session.item = results[0];
    
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
    
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
                res.end(ejs.render(htmlstream, {
                    goodslist:results[0],
                    attend:deals,
                    auth:req.session.auth,
                    mem_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'makeup'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'makeup\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";
        
        const sql_str2 = "SELECT goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;"; /* 투자한 인원 수 계산 */

        console.log(sql_str);
        console.log(sql_str2);
    
        db.query(sql_str+sql_str2, (error, results, fields) => {
            console.log(results);
    
            if(error){
                res.status(562).end("Login fails as there is no name in DB!");
            }
            else if(results.length[0] <= 0){  /* select 결과가 없는 경우 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); /* user_nav */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                res.end(ejs.render(htmlstream, {
                       auth:req.session.auth,
                       mem_id:req.session.who
              }));
            }
            else{   /* select 결과가 있는 경우 */
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                req.session.item = results[0];
    
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
    
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
                res.end(ejs.render(htmlstream, {
                    goodslist:results[0],
                    attend:deals,
                    auth:req.session.auth,
                    mem_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'digital'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'digital\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        const sql_str2 = "SELECT goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;"; /* 투자한 인원 수 계산 */

        console.log(sql_str);
        console.log(sql_str2);
    
        db.query(sql_str+sql_str2, (error, results, fields) => {
            console.log(results);
    
            if(error){
                res.status(562).end("Login fails as there is no name in DB!");
            }
            else if(results.length[0] <= 0){  /* select 결과가 없는 경우 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); /* user_nav */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                res.end(ejs.render(htmlstream, {
                       auth:req.session.auth,
                       mem_id:req.session.who
              }));
            }
            else{   /* select 결과가 있는 경우 */
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                req.session.item = results[0];
    
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
    
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
                res.end(ejs.render(htmlstream, {
                    goodslist:results[0],
                    attend:deals,
                    auth:req.session.auth,
                    mem_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'furniture'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'furniture\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        const sql_str2 = "SELECT goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;"; /* 투자한 인원 수 계산 */

        console.log(sql_str);
        console.log(sql_str2);
    
        db.query(sql_str+sql_str2, (error, results, fields) => {
            console.log(results);
    
            if(error){
                res.status(562).end("Login fails as there is no name in DB!");
            }
            else if(results.length[0] <= 0){  /* select 결과가 없는 경우 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); /* user_nav */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                res.end(ejs.render(htmlstream, {
                       auth:req.session.auth,
                       mem_id:req.session.who
              }));
            }
            else{   /* select 결과가 있는 경우 */
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                req.session.item = results[0];
    
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
    
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
                res.end(ejs.render(htmlstream, {
                    goodslist:results[0],
                    attend:deals,
                    auth:req.session.auth,
                    mem_id:req.session.who
                }));
            }
        });
    }
    else if(req.body.category == 'others'){
        const sql_str = "SELECT * from t1_goods where goo_type=\'others\' and status=\'active\' and goo_name like '%"+req.body.search+"%';";

        const sql_str2 = "SELECT goo_id, buyer_id from t1_deal where status=\'active\' order by goo_id;"; /* 투자한 인원 수 계산 */

        console.log(sql_str);
        console.log(sql_str2);
    
        db.query(sql_str+sql_str2, (error, results, fields) => {
            console.log(results);
    
            if(error){
                res.status(562).end("Login fails as there is no name in DB!");
            }
            else if(results.length[0] <= 0){  /* select 결과가 없는 경우 */
                console.log('조회된 상품이 없습니다');
    
                htmlstream='';
                htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    /* header */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); /* user_nav */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/product.ejs', 'utf8');  /* body */
                htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  /* footer */
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                res.end(ejs.render(htmlstream, {
                       auth:req.session.auth,
                       mem_id:req.session.who
              }));
            }
            else{   /* select 결과가 있는 경우 */
                if(req.session.auth==undefined){req.session.auth=0;}
                if(req.session.who==undefined){req.session.who='0';}
    
                req.session.item = results[0];
    
                let deal={
                    id:0,
                    buyers:[],
                }
    
                let deals = new Array();
    
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
                res.end(ejs.render(htmlstream, {
                    goodslist:results[0],
                    attend:deals,
                    auth:req.session.auth,
                    mem_id:req.session.who
                }));
            }
        });
    }
}

/* REST API의 URI와 handler를 mapping */
router.post('/search', searchGoods);

module.exports = router;