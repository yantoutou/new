// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');

const userApi = require('./api/userApi');
const orderApi = require('./api/orderApi');
const returnGoods = require('./api/return');
const goods = require('./api/goodsApi')
const work = require('./api/work')
const log = require('./api/logApi')
const set = require('./api/setApi')
const message = require('./api/messageApi')
const sale = require('./api/saleUser')

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
app.use('/api/log', log)
app.use('/api/set', set)
app.use('/api/message', message)
app.use('/api/sale', sale)

// 启动监听
server.listen(8888, () => {
    console.log(' success!! port:8888')
})