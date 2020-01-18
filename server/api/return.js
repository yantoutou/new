const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

router.post('/selectList', (req, res) => {
    let conn = new DBHelper().getConn();
    let sqlStr = sql.returnGoods.select;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

module.exports = router;