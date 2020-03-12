const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

router.post('/showList', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStrA = sql.message.selectAll
  conn.query(sqlStrA, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result.length)
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

router.post('/search', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  let sqlStr
  let arr = []
  if (params.name == '' && params.value == '') {
    sqlStr = sql.message.selectAll
  } else if (params.name != '' && params.value == '') {
    sqlStr = sql.message.selectName
    arr = [params.name]
  } else if (params.name == '' && params.value != '') {
    sqlStr = sql.message.selectValue
    arr = [params.value]
  } else {
    sqlStr = sql.message.selectBoth
    arr = [params.name, params.value]
  }
  conn.query(sqlStr, arr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result.length)
    }
  })
})

router.post('/page', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  let sqlStr = sql.message.selectPage
  let page = params.currentPage
  let index = (page - 1) * 10
  let arr = []
  if (params.name == '' && params.value == '') {
    sqlStr = sql.message.selectPage
    arr = [index]
  } else if (params.name != '' && params.value == '') {
    sqlStr = sql.message.selectNamePage
    arr = [params.name, index]
  } else if (params.name == '' && params.value != '') {
    sqlStr = sql.message.selectValuePage
    arr = [params.value, index]
  } else {
    sqlStr = sql.message.selectBothPage
    arr = [params.name, params.value, index]
  }
  conn.query(sqlStr, arr, (err, result) => {
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

module.exports = router
