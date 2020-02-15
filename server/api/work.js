const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

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
      res.json({return: returnLen, order: orderLen})
    }
  })
  conn.end()
})

module.exports = router
