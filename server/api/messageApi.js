const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

router.post('/showList', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.message.selectAll
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

module.exports = router
