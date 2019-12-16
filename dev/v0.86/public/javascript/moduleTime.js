//console.log('스크립트');
const calcTime2=()=>{
    //console.log('반복');
    let xhr=new XMLHttpRequest();

    xhr.open('GET', '/apply/calcTime');
    xhr.send();
}

//setImmediate(calcTime);    setImmediate는 안 되더라...
setTimeout(calcTime2, 0);
setInterval(calcTime2, 100);
