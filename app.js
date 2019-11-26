const express = require('express');
const mysql2 = require('mysql2/promise');
const config = require('./config.js');
const redisclient = require('redis');
(async () => {

    //Create application
    const http = new express();
    global.http = http;
    http.set('view engine', 'ejs');
    http.use((req, res, next) => {
        console.log(`[${req.method.toUpperCase()}]`, req.url, 'from', req.ip);
        next();
    });

    //Connect to mysql
    const connection = await mysql2.createPool({
        host:config.mysql.host, user: config.mysql.user, password: config.mysql.password, database: config.mysql.database,
    }, () => {
        console.log('[I] Database connected')
    });
    global.mysql = connection;
    //Connect to redis
    const redis = await redisclient.createClient(config.redis.port, config.redis.host, {}, () => {
        console.log('[I] Redis connected')
    })
    global.redis = redis;

    http.listen(config.web.port, config.web.hostname, () => {
        console.log(`[I] Listening for clients on http://${config.web.hostname}:${config.web.port}`)
    })
})()