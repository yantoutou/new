const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const moment = require('moment');


// 商品列表
router.post('/showGoods', (req, res) => {
    let conn = new DBHelper().getConn();
    conn.query(sql.goods.select, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            result.forEach(item => {
                item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
            })
            res.json(result)
        }
    })
})

// 搜索
router.post('/search', (req, res) => {
    let conn = new DBHelper().getConn();
    let sqlStr = ''
    let params = req.body
    let arr = []
    if (params.name != '' && params.endTime == '' && params.startTime == '') {
        sqlStr = sql.goods.search_one
        arr = [params.name, params.startTime, params.endTime]
    } else if (params.name == '' && params.endTime != '' && params.startTime != '') {
        sqlStr = sql.goods.search_one
        arr = [params.name, params.startTime, params.endTime]
    } else if (params.name != '' && params.endTime != '' && params.startTime != '') {
        sqlStr = sql.goods.search
        arr = [params.name, params.startTime, params.endTime]
    } else {
        sqlStr = sql.goods.select
    }
    conn.query(sqlStr, arr, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            result.forEach(item => {
                item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
            })
            res.json(result)
        }
    })
})

module.exports = router;