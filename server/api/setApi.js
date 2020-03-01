const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

var multer = require('multer')
var name

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
var upload = multer({ storage: storage })
router.use(upload.single('file'))

// 获取用户信息
router.post('/userMsg', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.set.selectUser
  name = req.body.userName
  conn.query(sqlStr, [req.body.userName], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

// 修改头像
router.post('/upload', upload.single('file'), (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.set.upload
  conn.query(sqlStr, [req.file.filename, name], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json({ url: req.file.filename })
    }
  })
})

module.exports = router
