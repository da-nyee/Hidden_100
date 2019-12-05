const  express = require('express');
const   fs = require('fs');
const  ejs = require('ejs');
const  router = express.Router();


//ejs에 추가하기 위한 임시 데이터
var test_goods={
	
	goo:[{
	name:"2017년 멋진 노트북",
	link:"/img/sample_1.jpg",
	goal_coin:"200000",
	limit_time:"7일 11시 30분",
	participation:"150"
	},{
	name:"2017년 멋진 노트북",
	link:"/img/sample_1.jpg",
	goal_coin:"200000",
	limit_time:"7일 11시 30분",
	participation:"150"
	},{
	name:"2017년 멋진 노트북",
	link:"/img/sample_1.jpg",
	goal_coin:"200000",
	limit_time:"7일 11시 30분",
	participation:"150"
	},{
	name:"2017년 멋진 노트북",
	link:"/img/sample_1.jpg",
	goal_coin:"200000",
	limit_time:"7일 11시 30분",
	participation:"150"
	}
	]
}

const getMain=(req, res)=>{
    let htmlstream='';

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/user_nav.ejs','utf8');
    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/product.ejs','utf8');

    htmlstream = htmlstream+fs.readFileSync(__dirname + '/../views/footer.ejs','utf8');

    try{
		res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
		res.end(ejs.render(htmlstream, {
			nav_goods:test_goods,
			main_good1:test_goods,
			main_good2:test_goods
		}));
	}catch(err){console.log(err)}
}

router.get('/', getMain)

module.exports=router;