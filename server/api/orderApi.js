const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const moment = require('moment');

// 订单列表
router.post('/orderList', (req, res) => {
    let sqlStr = sql.order.select_list;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            result.forEach(item => {
                item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
            })
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
    conn.end();
})

// 订单查询
router.post('/orderSelect', (req, res) => {
    let params = req.body;
    let number = params.number;
    let status = params.status;
    let startTime = params.startTime;
    let endTime = params.endTime;
    let page = params.page
    let sqlStr = ''
    let sqlStr_page = ''
    let index = (page - 1) * 7
    let conn = new DBHelper().getConn();
    let arr = []
    let pageArr = []
    let count = ''
    let ex = []
    if (number.length == 0 && status.length == 0 && startTime == '' && endTime == '') {
        sqlStr = sql.order.select_list
        sqlStr_page = sql.order.page
        pageArr = [index]
    } else if (number.length != 0 && status.length == 0 && startTime == '' && endTime == '') {
        sqlStr = sql.order.select_one
        sqlStr_page = sql.order.page_one
        arr = [status, number, startTime, endTime]
        pageArr = [status, number, startTime, endTime, index]
    } else if (number.length == 0 && status.length != 0 && startTime == '' && endTime == '') {
        sqlStr = sql.order.select_one
        sqlStr_page = sql.order.page_one
        arr = [status, number, startTime, endTime]
        pageArr = [status, number, startTime, endTime, index]
    } else if (number.length == 0 && status.length == 0 && startTime != '' && endTime != '') {
        sqlStr = sql.order.select_one
        sqlStr_page = sql.order.page_one
        arr = [status, number, startTime, endTime]
        pageArr = [status, number, startTime, endTime, index]
    } else if (number.length != 0 && status.length != 0 && startTime == '' && endTime == '') {
        sqlStr = sql.order.select_NS
        sqlStr_page = sql.order.page_NS
        arr = [number, status]
        pageArr = [number, status, index]
    } else if (number.length != 0 && status.length == 0 && startTime != '' && endTime != '') {
        sqlStr = sql.order.select_NT
        sqlStr_page = sql.order.page_NT
        arr = [number, startTime, endTime]
        pageArr = [number, startTime, endTime, index]
    } else if (number.length == 0 && status.length != 0 && startTime != '' && endTime != '') {
        sqlStr = sql.order.select_ST
        sqlStr_page = sql.order.page_ST
        arr = [status, startTime, endTime]
        pageArr = [status, startTime, endTime, index]
    } else if (number.length != 0 && status.length != 0 && startTime != '' && endTime != '') {
        sqlStr = sql.order.select_NST
        sqlStr_page = sql.order.page_NST
        arr = [number, status, startTime, endTime]
        pageArr = [number, status, startTime, endTime, index]
    }
    conn.query(sqlStr, arr, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            ex = result
            count = result.length
        }
    })
    conn.query(sqlStr_page, pageArr, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            result.forEach(item => {
                item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
            })
            ex.forEach(item => {
                item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
            })
            res.json({data: result, count: count, ex: ex})
        }
    })
    conn.end();
})

// 订单修改
router.post('/update', (req, res) => {
    let sqlStr = sql.order.update
    let params = req.body
    let conn = new DBHelper().getConn();
    let label = ''
    if (params.status == 1) {
        label = '已完成'
    } else if (params.status == 2) {
        label = '进行中'
    } else if(params.status == 3) {
        label = '已取消'
    } else {
        label = '未审核'
    }
    conn.query(sqlStr, [params.phone, params.address, params.status, label, params.id], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
    conn.end();
})

// 分页
router.post('/page', (req, res) => {
    let sqlStr = sql.order.page
    let page = req.body.page
    let conn = new DBHelper().getConn();
    let index = (page - 1) * 7
    conn.query(sqlStr, [index], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            result.forEach(item => {
                item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
            })
            res.json(result)
        }
    })
    conn.end();
})

module.exports = router;