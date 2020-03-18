const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

// 更新列表
router.post('/updateList', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.returnGoods.update
  let params = req.body
  conn.query(sqlStr, [params.number], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.query(sql.returnGoods.updateCount, [params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
    }
  })
})

// 退回
router.post('/updateReturn', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.returnGoods.updateReturn
  let params = req.body
  conn.query(sqlStr, [params.number], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.query(sql.returnGoods.updateReturnCount, [params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
    }
  })
})

// 订单编号查询
router.post('/selectNumber', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr
  let sqlStrLimit
  let params = req.body
  let arr
  let arrLimit
  let count
  if (params.number == '') {
    sqlStr = sql.returnGoods.select
    arr = []
    sqlStrLimit = sql.returnGoods.select_limit
    arrLimit = [params.limit]
  } else {
    sqlStr = sql.returnGoods.select_number
    arr = [params.number]
    sqlStrLimit = sql.returnGoods.select_number_limit
    arrLimit = [params.number, params.limit]
  }
  conn.query(sqlStr, arr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      count = result.length
    }
  })
  conn.query(sqlStrLimit, arrLimit, (err, result) => {
    result.forEach(item => {
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
    })
    res.json({data: result, count: count})
  })
})

module.exports = router
