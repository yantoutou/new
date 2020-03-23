const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')

router.post('/user', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.user, [req.body.name], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

router.post('/hotList', (req, res) => {
  let conn = new DBHelper().getConn()
  conn.query(sql.sale.hotList, (err, result) => {
    if (err) {
      res.json(err)
    } else {
        var i = 1
      result.forEach(item => {
        item.position = i
        i++
      })
      res.json(result)
    }
  })
})

module.exports = router
