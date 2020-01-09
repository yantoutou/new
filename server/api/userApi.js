const express = require('express');
const router = express.Router();

const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

// 用户登录
router.post('/login', (req, res) => {
    let userName = req.body.name;
    let pwd = req.body.password;
    let sqlStr_user = sql.user.select_user
    let sqlStr_admin = sql.admin.select_admin
    let conn = new DBHelper().getConn();
    if (req.body.identity == 'user') {
        conn.query(sqlStr_user, [userName, pwd], (err, result) => {
            if (err) {
                res.json(err);
            } else {
                if (result.length == 0) {
                    res.json({
                        code: 0,
                        msg: '用户名或密码错误'
                    })
                } else {
                    res.json({
                        code: 1,
                        msg: result
                    })
                }
            }
        });
    } else {
        conn.query(sqlStr_admin, [userName, pwd], (err, result) => {
            if (err) {
                res.json(err);
            } else {
                if (result.length == 0) {
                    res.json({
                        code: 0,
                        msg: '用户名或密码错误'
                    })
                } else {
                    res.json({
                        code: 1,
                        msg: result
                    })
                }
            }
        });
    }
    conn.end();
});

// 增加用户
router.post('/addUser', (req, res) => {
    let sqlStr = sql.user.add;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.name, params.age], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

// 查询用户
router.post('/selectUser', (req, res) => {
    let sqlStr = sql.user.select;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.name], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});

module.exports = router;