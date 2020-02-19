const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

// 获取待办列表
router.post('/todoNumber', (req, res) => {
  let conn = new DBHelper().getConn()
  let sql_return = sql.work.returnNumber
  let sql_order = sql.work.orderNumber
  let returnLen
  let orderLen
  conn.query(sql_return, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      returnLen = result.length
    }
  })
  conn.query(sql_order, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      orderLen = result.length
      res.json({ return: returnLen, order: orderLen })
    }
  })
})

// 获取每周销量
router.post('/sales', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.work.sale
  let params = req.body
  conn.query(sqlStr, [params.startTime, params.endTime], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result.length)
    }
  })
})

// 获取商品销量
router.post('/goodsSale', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.work.goodsValue
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

module.exports = router
