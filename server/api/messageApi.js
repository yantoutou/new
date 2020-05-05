const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

router.post('/showList', (req, res) => {
  let conn = new DBHelper().getConn()
  let total
  conn.query(sql.message.total, (err, result) => {
    total = result.length
  })
  conn.query(sql.message.list, (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
    })
    res.json({ data: result, total: total })
  })
})

router.post('/page', (req, res) => {
  let conn = new DBHelper().getConn()
  let index = (req.body.page - 1) * 10
  conn.query(sql.message.page, [index], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
    })
    res.json(result)
  })
})

router.post('/search', (req, res) => {
  let conn = new DBHelper().getConn()
  let total
  conn.query(sql.message.search, [req.body.number], (err, result) => {
    total = result.length
  })
  conn.query(sql.message.search, [req.body.number], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
    })
    res.json({ data: result, total: total })
  })
})

router.post('/searchPage', (req, res) => {
  let conn = new DBHelper().getConn()
  let page = req.body.page
  let index = (page - 1) * 10
  let total
  conn.query(sql.message.search, [req.body.number], (err, result) => {
    total = result.length
  })
  conn.query(sql.message.searchPage, [req.body.number, index], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
    })
    res.json({ data: result, total: total })
  })
})

router.post('/deleteNum', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.message.deleteNum, [req.body.number], (err, result) => {
    res.json(result)
  })
})

module.exports = router
