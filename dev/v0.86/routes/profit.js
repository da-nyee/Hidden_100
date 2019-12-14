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
		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {data : profit_data,
					 auth:req.session.auth ,
					 admin_id:req.session.who,
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

var profit_data = fs.readFileSync('./public/profit.json');
profit_data=JSON.parse(profit_data);
//console.log(profit_data.fee);

    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/profit_chart.ejs', 'utf8'); //admin_nav
 
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    try{
		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {data : profit_data,
					 auth:req.session.auth ,
					 admin_id:req.session.who,
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


router.get('/chart', getProfitChart);


module.exports = router;