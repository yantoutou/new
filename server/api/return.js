const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const moment = require('moment');

// 退货列表
router.post('/selectList', (req, res) => {
    let conn = new DBHelper().getConn();
    let sqlStr = sql.returnGoods.select;
    conn.query(sqlStr, (err, result) => {
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

// 更新列表
router.post('/updateList', (req, res) => {
    let conn = new DBHelper().getConn();
    let sqlStr = sql.returnGoods.update
    let params = req.body
    conn.query(sqlStr, [params.number], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// 退回
router.post('/updateReturn', (req, res) => {
    let conn = new DBHelper().getConn();
    let sqlStr = sql.returnGoods.updateReturn
    let params = req.body
    conn.query(sqlStr, [params.number], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// 订单编号查询
router.post('/selectNumber', (req, res) => {
    let conn = new DBHelper().getConn();
    let sqlStr = sql.returnGoods.select_number
    let params = req.body
    let arr = [params.number]
    if (params.number == '') {
        sqlStr = sql.returnGoods.select
        arr = []
    }
    conn.query(sqlStr, arr, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = router;