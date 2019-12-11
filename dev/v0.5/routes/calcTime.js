const calcTime=(req, res)=>{
    const leftTime=new Array();
    const currentTime=new Date();   //UTC현재 시간
    
    //*UTC시간을 그냥 문자열로 바꾸면 KST시간으로 자동으로 바뀐다. 주의가 필요!!!
    req.session.item.forEach((time)=>{
        let endTime=new Date(time.time_year, time.time_month-1, time.time_day,
            time.time_hour, time.time_minute); //UTC끝나는 시간-1일

        const temp=new Date(endTime-currentTime).toUTCString().split(' ');

        leftTime.push(time.goo_id+':'+temp[1]+':'+temp[4]);
    });
    
    res.end(JSON.stringify(leftTime));
}

module.exports=calcTime;