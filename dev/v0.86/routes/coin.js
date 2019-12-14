const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const   router = express.Router();
//const db=require('./records');

router.use(bodyParser.urlencoded({ extended: false }));

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

const getCoin=(req, res)=>{
    if(req.session.auth==99){
        let htmlstream='';
        htmlstream=fs.readFileSync(__dirname+'/../views/header.ejs', 'utf8');    //Header
        htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/user_nav.ejs', 'utf8'); //user_nav
        htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/charge.ejs', 'utf8');  //Body
        htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

        const sql='SELECT coin FROM t1_member where mem_id=\''+req.session.who+'\';';   //보유 코인 조회
        client.query(sql, (error, results)=>{
            if(error){
                res.status(562).end("DB query is failed");
            }
            else {
                req.session.coin=results[0].coin;
                
                res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
                res.end(ejs.render(htmlstream, {nowCoin:results[0].coin,
                    auth:req.session.auth ,
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
}

router.get('/getCoin', getCoin);

const chargeCoin=(req, res)=>{
    const sql=`update t1_member set coin=coin+${req.body.how} where mem_id=\'${req.session.who}\';` //코인 충전
    client.query(sql, (error, result)=>{
        if(error){
            res.status(562).end("DB query is failed");
        }
        else{
            console.log(result);

            res.send('<script type="text/javascript">alert("충전이 완료되었습니다."); location.href="/coin/getCoin"; </script>');
        }
    });
}

router.post('/chargeCoin', chargeCoin);

module.exports = router;
