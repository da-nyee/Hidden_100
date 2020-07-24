const express=require('express');
const fs=require('fs');
const ejs=require('ejs');
const mysql=require('mysql');
const url=require('url');
const querystring=require('querystring');

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

const getExist=((req, res)=>{
    const parseUrl=url.parse(req.url);
    const query=querystring.parse(parseUrl.query);

    console.log('query.receiver', query.receiver);

    const sql=`select * from t1_message where receiver=\'${query.receiver}\' and if_read=0;`;
    client.query(sql, (error, result)=>{
        if(error){
            console.error(error);
        }
        else{
            console.log(result);
            res.end(JSON.stringify(result.length));
        }
    });
});

router.get('/getExist', getExist);

const getNotification=((req, res)=>{
    const parseUrl=url.parse(req.url);
    const query=querystring.parse(parseUrl.query);

    const temp=(query)=>{
        return new Promise((resolve, reject)=>{
            const sql=`select * from t1_message where receiver=\'${query.receiver}\' and if_read=0;`;
            client.query(sql, (error, results)=>{
                if(error){
                    console.error('sql error', error);
                    reject(error);
                }
                else{
                    console.log(results);
                    resolve(results);
                    res.end(JSON.stringify(results));
                }
            });
        })
    }
    temp(query)
        .then((results)=>{
            const funcs=[];

            results.forEach((result)=>{
                const func=(result)=>{
                    return new Promise((resolve2, reject2)=>{
                        const sql2=`update t1_message set if_read=1 where num=${result.num};`;
                        client.query(sql2, (error, result)=>{
                            if(error){
                                console.log('sql2 error', error);
                                reject2(error);
                            }
                            else{
                                console.log('sql2 success');
                                resolve2();
                            }
                        });
                    });
                };

                funcs.push(func(result));
            });

            Promise.all(funcs)
                .then(()=>{
                    console.log('다 읽음');
                })
                .catch((error)=>{
                    console.log(error);
                });
        })
    });

router.get('/getNotification', getNotification);

module.exports=router;