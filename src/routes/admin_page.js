const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   url = require('url');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const multer = require('multer'); 



const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/');
    },
    filename: function (req, file, cb) {
	var temp=req.body.slide_num + path.extname(file.originalname);
      cb(null, temp);
	 console.log(temp);
    }
  }),
});


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

const getMainadd=(req, res)=>{
    var htmlstream='';


	if(req.session.auth==91){

    let htmlstream='';

var slide_data = fs.readFileSync('./public/add.json');
slide_data=JSON.parse(slide_data);
    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
     htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/slider_form.ejs', 'utf8'); //admin_nav
 var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    try{
		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {data : slide_data.text,
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
const postMainadd=(req, res)=>{
	var json ={};
	json.text= [];
	json.text.push(req.body.slider1)
	json.text.push(req.body.slider2)
	json.text.push(req.body.slider3)
	json.text.push(req.body.slider4)
	console.log(json);
	json = JSON.stringify(json);
	console.log(json);

fs.writeFileSync("./public/add.json", json, 'utf8');
 

res.send('<script type="text/javascript">alert("텍스트 변경에 성공했습니다."); location.href="/admin/admin_page/mainadd"; </script>');

}

router.get('/mainadd', getMainadd);
router.post('/mainadd/post', postMainadd);


const getMainimg=(req, res)=>{
    var htmlstream='';


	if(req.session.auth==91){

    let htmlstream='';

var slide_data = fs.readFileSync('./public/add.json');
slide_data=JSON.parse(slide_data);
    htmlstream=fs.readFileSync(__dirname+'/../views/admin_header.ejs', 'utf8');    //Header
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/admin_nav.ejs', 'utf8'); //admin_nav
     htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/slider_imgform.ejs', 'utf8'); //admin_nav
 
    htmlstream=htmlstream+fs.readFileSync(__dirname+'/../views/footer.ejs', 'utf8');  // Footer

    try{var profit= fs.readFileSync('./public/profit.json');
profit=JSON.parse(profit);

		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
           	res.end(ejs.render(htmlstream, {data : slide_data.text,
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
router.post('/mainimg/post', upload.single('slide_img'), (req, res)=>{
 
res.send('<script type="text/javascript">alert("이미지 변경에 성공했습니다."); location.href="/admin/admin_page/mainimg"; </script>');


})

router.get('/mainimg', getMainimg);
 


module.exports=router;

 