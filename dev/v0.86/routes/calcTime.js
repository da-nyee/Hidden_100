const eventEmitter=require('events');
const whenFinish=new eventEmitter();

const mysql=require('mysql');
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

whenFinish.on('finish', (item)=>{
    console.log('item', item);

    const sql=`update t1_goods set status=\'finish\' where goo_id=${item.goo_id};`;

    client.query(sql, (error, result)=>{
        if(error){
            console.log('error', error);
        }
        else{
            console.log('result', result);
        }
    });
});

const calcTime=(req, res)=>{
    const leftTime=new Array();
    const currentTime=new Date();   //UTC현재 시간
    //console.log('current', Math.floor(currentTime.getTime()/1000)*1000);

    //*UTC시간을 그냥 문자열로 바꾸면 KST시간으로 자동으로 바뀐다. 주의가 필요!!!
    req.session.item.forEach((time)=>{
        let endTime=new Date(time.time_year, time.time_month-1, time.time_day,
            time.time_hour, time.time_minute); //UTC끝나는 시간-1일
        
        if(Math.floor(currentTime.getTime()/1000)*1000==Math.floor(endTime/1000)*1000){
            //console.log(time);

            whenFinish.emit('finish', time);
        }
        else if(Math.floor(currentTime.getTime()/1000)*1000<Math.floor(endTime/1000)*1000){
            const temp=new Date(endTime-currentTime.getTime()).toUTCString().split(' ');

            leftTime.push(time.goo_id+':'+temp[1]+':'+temp[4]);
        }
        else if(Math.floor(currentTime.getTime()/1000)*1000>Math.floor(endTime/1000)*1000){
            leftTime.push(time.goo_id+':01:00:00:00');
        }
    });
    
    res.end(JSON.stringify(leftTime));
}

module.exports=calcTime;