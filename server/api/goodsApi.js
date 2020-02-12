const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

var id = ''
var name = ''
var time = ''
var money = ''
var checked1 = ''
var checked2 = ''
var count = ''
var inventory = ''

var multer = require('multer')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '.' +
        fileFormat[fileFormat.length - 1]
    )
  }
})
var upload = multer({ storage: storage })
router.use(upload.single('file'))

// 搜索
router.post('/search', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = ''
  let sqlLen = ''
  let params = req.body
  let arr = []
  let arrLen = []
  let len
  if (params.name != '' && params.endTime == '' && params.startTime == '') {
    sqlStr = sql.goods.search_one
    sqlLen = sql.goods.search_one_len
    arr = [params.name, params.startTime, params.endTime, params.limit]
    arrLen = [params.name, params.startTime, params.endTime]
  } else if (
    params.name == '' &&
    params.endTime != '' &&
    params.startTime != ''
  ) {
    sqlStr = sql.goods.search_one
    sqlLen = sql.goods.search_one_len
    arr = [params.name, params.startTime, params.endTime, params.limit]
    arrLen = [params.name, params.startTime, params.endTime]
  } else if (
    params.name != '' &&
    params.endTime != '' &&
    params.startTime != ''
  ) {
    sqlStr = sql.goods.search
    sqlLen = sql.goods.search_len
    arr = [params.name, params.startTime, params.endTime, params.limit]
    arrLen = [params.name, params.startTime, params.endTime]
  } else {
    sqlStr = sql.goods.select_section
    sqlLen = sql.goods.select
    arr = [params.limit]
    arrLen = []
  }
  conn.query(sqlLen, arrLen, (err, result) => {
    len = result.length
  })
  conn.query(sqlStr, arr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      result.forEach(item => {
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      })
      res.json({data: result, len: len})
    }
  })
})

// 删除单行数据
router.post('/deleteOne', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.goods.delete_one
  let params = req.body
  conn.query(sqlStr, [params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})

// 修改数据
router.post('/edit', (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.goods.edit
  let params = req.body
  id = params.id
  conn.query(
    sqlStr,
    [params.name, params.money, params.checked1, params.checked2, params.id],
    (err, result) => {
      if (err) {
        res.json(err)
      } else {
        res.json(result)
      }
    }
  )
})

// 修改图片
router.post('/upload', upload.single('file'), (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.goods.upload
  conn.query(sqlStr, [req.file.filename, id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json({ url: req.file.filename })
    }
  })
})

// 增加商品
router.post('/addGoodsUpload', upload.single('file'), (req, res) => {
  let conn = new DBHelper().getConn()
  let sqlStr = sql.goods.addGoods
  if (checked1 == true) {
    checked1 = 1
  } else {
    checked1 = 0
  }
  if (checked2 == true) {
    checked2 = 1
  } else {
    checked2 = 0
  }
  conn.query(
    sqlStr,
    [
      name,
      req.file.filename,
      time,
      money,
      checked1,
      checked2,
      count,
      inventory
    ],
    (err, result) => {
      if (err) {
        res.json(err)
      } else {
        res.json(result)
      }
    }
  )
})

router.post('/addGoods', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  name = params.name
  time = params.time
  money = params.money
  checked1 = params.checked1
  checked2 = params.checked2
  count = params.count
  inventory = params.inventory
})

// 批量删除
router.post('/deleteSome', (req, res) => {
  let sql = `delete from goods where id in (`
  let conn = new DBHelper().getConn()
  let params = []
  for (let i = 0; i < req.body.deleteArr.length; i++) {
    params.push(req.body.deleteArr[i])
  }
  for (let i = 0; i < req.body.deleteArr.length - 1; i++) {
    sql = sql + req.body.deleteArr[i] + `,`
  }
  sql = sql+req.body.deleteArr[req.body.deleteArr.length-1]+`)`;
  conn.query(sql, [params], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
})


module.exports = router
