const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

// 订单列表
router.post('/orderList', (req, res) => {
    let sqlStr = sql.order.select_list;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});

// 状态下拉列表
router.post('/statusList', (req, res) => {
    let sqlStr = sql.order.select_status
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
})

// 订单查询
router.post('/orderSelect', (req,res) => {
    let params = req.body;
    let number = params.number;
    let sqlStr = ''
    let conn = new DBHelper().getConn();
    if (number.length == 0) {
        sqlStr = sql.order.select_list
    } else {
        sqlStr = sql.order.select_order
    }
    conn.query(sqlStr, [number], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = router;