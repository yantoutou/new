// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');

const userApi = require('./api/userApi');
const orderApi = require('./api/orderApi')

let app = express();
let server = http.createServer(app);

app.use(badyParser.json());
app.use(badyParser.urlencoded({
    extended: false
}));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/order', orderApi)

// 启动监听
server.listen(8888, () => {
    console.log(' success!! port:8888')
})