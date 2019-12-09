console.log('스크립트');

let leftTime=new Array();

const calcTime=()=>{
    console.log('반복');
    let xhr=new XMLHttpRequest();

    xhr.onload=()=>{
        if(xhr.status==200){
            leftTime=JSON.parse(xhr.response);
            console.log('브라우저 : ', leftTime);
            
            leftTime.forEach((item)=>{
                let temp=new Array();
                temp=item.split(':');

                document.getElementById(temp[0]).innerHTML='남은시간 : '+(temp[1]-1)+'일'+temp[2]+'시간'+temp[3]+'분';
            })
        }
        else
            console.error(xhr.response);
    }
    xhr.open('GET', '/product/calcTime');
    xhr.send();
}

//setImmediate(calcTime);    setImmediate는 안 되더라...
setTimeout(calcTime, 0);
setInterval(calcTime, 30000);


