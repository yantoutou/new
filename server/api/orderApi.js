const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

// 订单列表
router.post('/orderList', (req, res) => {
  let sqlStr = sql.order.select_list
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      result.forEach((item) => {
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      })
      res.json(result)
    }
  })
  conn.end()
})

// 状态下拉列表
router.post('/statusList', (req, res) => {
  let sqlStr = sql.order.status
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

// 订单查询
router.post('/orderSelect', (req, res) => {
  let params = req.body
  let number = params.number
  let status = params.status
  let startTime = params.startTime
  let endTime = params.endTime
  let page = params.page
  let sqlStr = ''
  let sqlStr_page = ''
  let index = (page - 1) * 7
  let conn = new DBHelper().getConn()
  let arr = []
  let pageArr = []
  let count = ''
  let ex = []
  if (number.length == 0 && status.length == 0 && startTime == '' && endTime == '') {
    sqlStr = sql.order.select_list
    sqlStr_page = sql.order.page
    pageArr = [index]
  } else if (
    number.length != 0 &&
    status.length == 0 &&
    startTime == '' &&
    endTime == ''
  ) {
    sqlStr = sql.order.select_one
    sqlStr_page = sql.order.page_one
    arr = [status, number, startTime, endTime]
    pageArr = [status, number, startTime, endTime, index]
  } else if (
    number.length == 0 &&
    status.length != 0 &&
    startTime == '' &&
    endTime == ''
  ) {
    sqlStr = sql.order.select_one
    sqlStr_page = sql.order.page_one
    arr = [status, number, startTime, endTime]
    pageArr = [status, number, startTime, endTime, index]
  } else if (
    number.length == 0 &&
    status.length == 0 &&
    startTime != '' &&
    endTime != ''
  ) {
    sqlStr = sql.order.select_one
    sqlStr_page = sql.order.page_one
    arr = [status, number, startTime, endTime]
    pageArr = [status, number, startTime, endTime, index]
  } else if (
    number.length != 0 &&
    status.length != 0 &&
    startTime == '' &&
    endTime == ''
  ) {
    sqlStr = sql.order.select_NS
    sqlStr_page = sql.order.page_NS
    arr = [number, status]
    pageArr = [number, status, index]
  } else if (
    number.length != 0 &&
    status.length == 0 &&
    startTime != '' &&
    endTime != ''
  ) {
    sqlStr = sql.order.select_NT
    sqlStr_page = sql.order.page_NT
    arr = [number, startTime, endTime]
    pageArr = [number, startTime, endTime, index]
  } else if (
    number.length == 0 &&
    status.length != 0 &&
    startTime != '' &&
    endTime != ''
  ) {
    sqlStr = sql.order.select_ST
    sqlStr_page = sql.order.page_ST
    arr = [status, startTime, endTime]
    pageArr = [status, startTime, endTime, index]
  } else if (
    number.length != 0 &&
    status.length != 0 &&
    startTime != '' &&
    endTime != ''
  ) {
    sqlStr = sql.order.select_NST
    sqlStr_page = sql.order.page_NST
    arr = [number, status, startTime, endTime]
    pageArr = [number, status, startTime, endTime, index]
  }
  conn.query(sqlStr, arr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      ex = result
      count = result.length
    }
  })
  conn.query(sqlStr_page, pageArr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      result.forEach((item) => {
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      })
      ex.forEach((item) => {
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      })
      res.json({ data: result, count: count, ex: ex })
    }
  })
  conn.end()
})

// 订单修改
router.post('/update', (req, res) => {
  let sqlStr = sql.order.update
  let params = req.body
  let conn = new DBHelper().getConn()
  let label = ''
  if (params.status == 1) {
    label = '已完成'
  } else if (params.status == 2) {
    label = '进行中'
  } else if (params.status == 3) {
    label = '已取消'
  } else {
    label = '未审核'
  }
  conn.query(
    sqlStr,
    [params.phone, params.address, params.status, label, params.id],
    (err, result) => {
      if (err) {
        res.json(err)
      } else {
        res.json(result)
      }
    }
  )
  conn.end()
})

// 分页
router.post('/page', (req, res) => {
  let sqlStr = sql.order.page
  let page = req.body.page
  let conn = new DBHelper().getConn()
  let index = (page - 1) * 7
  conn.query(sqlStr, [index], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      result.forEach((item) => {
        item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      })
      res.json(result)
    }
  })
  conn.end()
})

// 我的订单
router.post('/selectOrder', (req, res) => {
  let conn = new DBHelper().getConn()
  let total
  let page = req.body.page
  let index = (page - 1) * 10
  conn.query(sql.order.selectById, [req.body.id], (err, result) => {
    total = result.length
  })
  conn.query(sql.order.selectByIdPage, [req.body.id, index], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })
    res.json({ res: result, total: total })
  })
})

// 用户订单查询
router.post('/userOrder', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  let sqlStr
  let sqlStr_page
  let arrPage = []
  let arr = []
  let total
  if (
    params.number == '' &&
    params.name == '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr = sql.order.selectById
    sqlStr_page = sql.order.selectByIdPage
    arr = [params.id]
    arrPage = [params.id, 0]
  } else if (
    params.number != '' &&
    params.name == '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr = sql.order.selectByNumber
    sqlStr_page = sql.order.selectByNumberP
    arr = [params.id, params.number]
    arrPage = [params.id, params.number, 0]
  } else if (
    params.number == '' &&
    params.name != '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr = sql.order.selectByName
    sqlStr_page = sql.order.selectByNameP
    arr = [params.id, params.name]
    arrPage = [params.id, params.name, 0]
  } else if (
    params.number == '' &&
    params.name == '' &&
    params.startTime != '' &&
    params.endTime != ''
  ) {
    sqlStr = sql.order.selectByTime
    sqlStr_page = sql.order.selectByTimeP
    arr = [params.id, params.startTime, params.endTime]
    arrPage = [params.id, params.startTime, params.endTime, 0]
  } else if (
    params.number != '' &&
    params.name != '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr = sql.order.selectByNN
    sqlStr_page = sql.order.selectByNNP
    arr = [params.id, params.number, params.name]
    arrPage = [params.id, params.number, params.name, 0]
  } else if (
    params.number != '' &&
    params.name == '' &&
    params.startTime != '' &&
    params.endTime != ''
  ) {
    sqlStr = sql.order.selectByNumT
    sqlStr_page = sql.order.selectByNumTP
    arr = [params.id, params.number, params.startTime, params.endTime]
    arrPage = [params.id, params.number, params.startTime, params.endTime, 0]
  } else if (
    params.number == '' &&
    params.name != '' &&
    params.startTime != '' &&
    params.endTime != ''
  ) {
    sqlStr = sql.order.selectByNameT
    sqlStr_page = sql.order.selectByNameTP
    arr = [params.id, params.name, params.startTime, params.endTime]
    arrPage = [params.id, params.name, params.startTime, params.endTime, 0]
  } else {
    sqlStr = sql.order.selectByAll
    sqlStr_page = sql.order.selectByAllP
    arr = [params.id, params.number, params.name, params.startTime, params.endTime]
    arrPage = [params.id, params.number, params.name, params.startTime, params.endTime, 0]
  }
  conn.query(sqlStr, arr, (err, result) => {
    total = result.length
  })
  conn.query(sqlStr_page, arrPage, (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })
    res.json({ res: result, total: total })
  })
})

router.post('/userPage', (req, res) => {
  let conn = new DBHelper().getConn()
  let params = req.body
  let sqlStr_page
  let arrPage = []
  let page = params.page
  let index = (page - 1) * 10
  if (
    params.number == '' &&
    params.name == '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr_page = sql.order.selectByIdPage
    arrPage = [params.id, index]
  } else if (
    params.number != '' &&
    params.name == '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr_page = sql.order.selectByNumberP
    arrPage = [params.id, params.number, index]
  } else if (
    params.number == '' &&
    params.name != '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr_page = sql.order.selectByNameP
    arrPage = [params.id, params.name, index]
  } else if (
    params.number == '' &&
    params.name == '' &&
    params.startTime != '' &&
    params.endTime != ''
  ) {
    sqlStr_page = sql.order.selectByTimeP
    arrPage = [params.id, params.startTime, params.endTime, index]
  } else if (
    params.number != '' &&
    params.name != '' &&
    params.startTime == '' &&
    params.endTime == ''
  ) {
    sqlStr_page = sql.order.selectByNNP
    arrPage = [params.id, params.number, params.name, index]
  } else if (
    params.number != '' &&
    params.name == '' &&
    params.startTime != '' &&
    params.endTime != ''
  ) {
    sqlStr_page = sql.order.selectByNumTP
    arrPage = [params.id, params.number, params.startTime, params.endTime, index]
  } else if (
    params.number == '' &&
    params.name != '' &&
    params.startTime != '' &&
    params.endTime != ''
  ) {
    sqlStr_page = sql.order.selectByNameTP
    arrPage = [params.id, params.name, params.startTime, params.endTime, index]
  } else {
    sqlStr_page = sql.order.selectByAllP
    arrPage = [
      params.id,
      params.number,
      params.name,
      params.startTime,
      params.endTime,
      index,
    ]
  }
  conn.query(sqlStr_page, arrPage, (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })
    res.json(result)
  })
})

router.post('/complete', (req, res) => {
  let conn = new DBHelper().getConn()
  let total
  let page = req.body.page
  let index = (page - 1) * 10
  conn.query(sql.order.complete, [req.body.userId], (err, result) => {
    total = result.length
  })
  conn.query(sql.order.completeP, [req.body.userId, index], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })
    res.json({ res: result, total: total })
  })
})

router.post('/ongoing', (req, res) => {
  let conn = new DBHelper().getConn()
  let total
  let page = req.body.page
  let index = (page - 1) * 10
  conn.query(sql.order.ongoing, [req.body.userId], (err, result) => {
    total = result.length
  })
  conn.query(sql.order.ongoingP, [req.body.userId, index], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })
    res.json({ res: result, total: total })
  })
})

router.post('/return', (req, res) => {
  let conn = new DBHelper().getConn()
  let total
  let page = req.body.page
  let index = (page - 1) * 10
  conn.query(sql.order.return, [req.body.userId], (err, result) => {
    total = result.length
  })
  conn.query(sql.order.returnP, [req.body.userId, index], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })
    res.json({ res: result, total: total })
  })
})

router.post('/send', (req, res) => {
  let conn = new DBHelper().getConn()
  let total
  let page = req.body.page
  let index = (page - 1) * 10
  conn.query(sql.order.send, [req.body.userId], (err, result) => {
    total = result.length
  })
  conn.query(sql.order.sendP, [req.body.userId, index], (err, result) => {
    result.forEach((item) => {
      item.time = moment(item.time).format('YYYY-MM-DD')
    })
    res.json({ res: result, total: total })
  })
})

router.post('/refund', (req, res) => {
    let conn = new DBHelper().getConn()
    let total
    let page = req.body.page
    let index = (page - 1) * 10
    conn.query(sql.order.refund, [req.body.userId], (err, result) => {
      total = result.length
    })
    conn.query(sql.order.refundP, [req.body.userId, index], (err, result) => {
      result.forEach((item) => {
        item.time = moment(item.time).format('YYYY-MM-DD')
      })
      res.json({ res: result, total: total })
    })
  })

  router.post('/confirmGoods', (req, res) => {
    let conn = new DBHelper().getConn()
    conn.query(sql.order.confirmGoods, req.body.id, (err, result) => {
      res.json(result)
    })
  })

  router.post('/remindelivery', (req, res) => {
    let conn = new DBHelper().getConn()
    let params = req.body
    conn.query(sql.order.remindelivery, [params.type, params.time, params.username, params.number], (err, result) => {
      res.json(result)
    })
  })

  router.post('/returnGoods', (req, res) => {
    let conn = new DBHelper().getConn()
    let params = req.body
    conn.query(sql.order.returnGoods, [params.number, params.money, params.user, params.time, params.id], (err, result) => {
      res.json(result)
    })
    conn.query(sql.order.change, [params.goodsId])
  })

  router.post('/addOrder', (req, res) => {
    let conn = new DBHelper().getConn()
    let params = req.body
    conn.query(sql.order.addOrder, [params.time, params.address, params.phone, params.money, params.status, params.number, params.label, params.userId, params.name, params.img], (err, result) => {
      conn.query(sql.order.deleteCar, [params.id], (err, result) => {
        res.json(result)
      })
    })
  })

module.exports = router
