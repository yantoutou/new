const express = require('express')
const router = express.Router()

const DBHelper = require('../utils/DBHelper')
const sql = require('../sqlMap')
const moment = require('moment')

router.post('/userMsg', (req, res) => {
    let conn = new DBHelper().getConn();
    let sqlStr = sql.set.selectUser
    conn.query(sqlStr, [req.body.userName], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
            
    })
})

module.exports = router