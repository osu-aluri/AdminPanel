const express = require('express');
const mysql2 = require('mysql2/promise');
const config = require('./config.js');
const redis = require('./functions/redis')
const mysql = require('./functions/mysql');
const fs = require('fs');
(async () => {

    //Create application
    const http = new express();
    global.http = http;
    http.set('view engine', 'ejs');
    http.use((req, res, next) => {
        console.log(`[${req.method.toUpperCase()}]`, req.url, 'from', req.ip);
        next();
    });
    fs.readdir('./routes', (err, files) => {
        if(err) console.error(err);
        console.log(`${files.length} endpoints loaded!`);
        let jsFile = files.filter(f => f.split('.').pop() === 'js');
        if(jsFile.length <= 0){
            return console.log('No EndPoints!')
        }

        jsFile.forEach((f, i) => {
            let endPoint = require(`./routes/${f}`);
            console.log(`${f} endPoint loaded!`);
            http.use(endPoint);
        })
    })
    //Connect to mysql
    let connection = await mysql.Init(config.mysql.host, config.mysql.user, config.mysql.password,config.mysql.database, () => {
        console.log('[I] Mysql connected!');
    }).then(async connection => {
        try {
            await connection.ping();
            console.log('[I] Database connected')
        } catch (error) {
            console.log(`Connection error: ${error}`)
        }
        
    });
        
    
    /** 
    @description OLD code
    const connection = await mysql2.createPool({
        host:config.mysql.host, user: config.mysql.user, password: config.mysql.password, database: config.mysql.database,
    }, () => {
        console.log('[I] Database connected')
    });*/
    global.mysql = connection;
    /**
     * @description OLD CODE
     *     const redis = await redisclient.createClient(config.redis.port, config.redis.host, {}, () => {
     *    console.log('[I] Redis connected')
    *  })
     */
    let rediscnt = redis.init({host: config.redis.host, port: config.redis.port, db: config.redis.database}).then(
        console.log('[I] redis connected!')
    );
    global.redis = rediscnt;

    http.listen(config.web.port, config.web.hostname, () => {
        console.log(`[I] Listening for clients on http://${config.web.hostname}:${config.web.port}`)
    });
})()