const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

router.post('/showList', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStrA = sql.message.selectAll
  let sqlStrP = sql.message.selectPage
  let page = req.body.currentPage
  let index = (page - 1) * 10
  let count
  conn.query(sqlStrA, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      count = result.length
    }
  })
  conn.query(sqlStrP, [index], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      result.forEach(item => {
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      })
      res.json({data: result, count: count})
    }
  })
})

router.post('/ignore', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStrI = sql.message.ignore
  let params = req.body
  if (params.operation == 'ignore') {
    conn.query(sqlStrI, [params.id], (err, result) => {
      if (err) {
        res.json(err)
      } else {
        res.json(result)
      }
    })
  }
})

router.post('/apply', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStrA = sql.message.apply
  let sqlStrE = sql.message.edit
  let params = req.body
  conn.query(sqlStrA, [params.userId, params.apply, params.content, params.time])
  conn.query(sqlStrE, [params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

module.exports = router
