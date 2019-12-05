const  express = require('express');
const   fs = require('fs');
const  ejs = require('ejs');
const  router = express.Router();

const getTest=(req, res)=>{
    let htmlstream='';

    htmlstream = fs.readFileSync(__dirname + '/../views/test.ejs','utf8');

    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.end(ejs.render(htmlstream));
}

router.get('/test', getTest)

module.exports=router;