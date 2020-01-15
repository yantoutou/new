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
    let sqlStr = sql.order.status
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
    let status = params.status
    let sqlStr = ''
    let conn = new DBHelper().getConn();
    let arr = []
    if (number.length == 0) {
        if (status.length == 0) {
            sqlStr = sql.order.select_list
        } else {
            sqlStr = sql.order.select_status
            arr = [status]
        }
    } else {
        if (status.length == 0) {
            sqlStr = sql.order.select_number
            arr = [number]
        } else {
            sqlStr = sql.order.select_order
            arr = [number, status]
        }
    }
    conn.query(sqlStr, arr, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

// 订单修改
router.post('/update', (req,res) => {
    let sqlStr = sql.order.update
    let params = req.body
    let conn = new DBHelper().getConn();
    let label = ''
    if (params.status == 1) {
        label = '已完成'
    } else if (params.status == 2) {
        label = '进行中'
    } else {
        label = '已取消'
    }
    conn.query(sqlStr, [params.phone, params.address, params.status, label, params.id], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = router;