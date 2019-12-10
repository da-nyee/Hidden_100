const url=require('url');
const querystring=require('querystring');
const express=require('express');
const fs=require('fs');
const ejs=require('ejs');
const mysql=require('mysql');

const calcTime=require('./calcTime');

const router=express.Router();

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
        htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/apply.ejs', 'utf8');  //Body
        htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

        const parseUrl=url.parse(req.url);
        //console.log('parseUrl', parseUrl);
        const query=querystring.parse(parseUrl.query);
        //console.log('query', query);

        const sql='SELECT * FROM t1_goods where goo_id=\''+query.item+'\';';
        const sql2=`select coin from t1_member where mem_id=\'${req.session.who}\';`
        client.query(sql+sql2, (error, results)=>{
            if(error){
                res.status(562).end("DB query is failed");
            }
            else {
                req.session.item=results[0];
                //console.log('req.session.time', req.session.time);
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream, {item:results[0], member:results[1],
                    auth:req.session.auth,
                    mem_id:req.session.who,
                })); 
            }
        })
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
};

router.get('/getApply', getApply);

router.get('/calcTime', calcTime);

const postApply=(req, res)=>{
    const sql=`update t1_member set coin=coin-${req.body.how} where mem_id=\'${req.session.who}\';`
    const sql2=`insert into t1_deal values(default, ${req.session.item[0].goo_id}, \'${req.session.item[0].goo_name}\', \'${req.session.item[0].goo_type}\', ${req.session.item[0].goal_price}, \'${req.session.item[0].mem_id}\', \'${req.session.who}\', ${req.body.how}, default, \'${req.session.item[0].status}\')`
    client.query(sql+sql2, (error, result)=>{
        if(error){
            console.log(error);
            res.status(562).end("DB query is failed");
        }
        else{
            //console.log(result);

            res.send(`<script type="text/javascript">alert("응모를 했습니다."); location.href="/apply/getApply?item=${req.session.item[0].goo_id}"; </script>`);
        }
    });
}

router.post('/postApply', postApply);

module.exports=router;
