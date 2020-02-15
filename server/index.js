// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');

const userApi = require('./api/userApi');
const orderApi = require('./api/orderApi');
const returnGoods = require('./api/return');
const goods = require('./api/goodsApi')
const work = require('./api/work')

let app = express();
let server = http.createServer(app);

app.use(badyParser.json());
app.use(badyParser.urlencoded({
    extended: false
}));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/order', orderApi);
app.use('/api/return', returnGoods);
app.use('/api/goods', goods);
app.use('/api/work', work)

// 启动监听
server.listen(8888, () => {
    console.log(' success!! port:8888')
})