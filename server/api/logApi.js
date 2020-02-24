const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

// 获取日志列表
router.post('/getList', (req, res) => {
    let conn = new DBHelper().getConn()
    let sqlStr = sql.log.getList
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

// 添加日志
router.post('/addLog', (req, res) => {
    let conn = new DBHelper().getConn()
    let sqlStr = sql.log.add
    let params = req.body
    conn.query(sqlStr, [params.name, params.operation, params.time, params.content], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = router