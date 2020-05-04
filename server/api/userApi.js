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
                        msg: result,
                        identity: 'user'
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
                        msg: result,
                        identity: 'admin'
                    })
                }
            }
        });
    }
    conn.end();
});

// 用户注册
router.post('/registered', (req, res) => {
    let params = req.body;
    let sqlStr_user = sql.user.add;
    let sqlStr_admin = sql.admin.add;
    let conn = new DBHelper().getConn();
    if (params.gender == 'b') {
        gender = '男'
    } else {
        gender = '女'
    }
    if (params.password1 != params.password2) {
        res.json({
            code: 1,
            msg: '两次密码输入不一致'
        })
    } else {
        if (params.identity == 'user') {
            conn.query(sqlStr_user, [params.name, params.password1, params.nickName, gender], (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({msg: result, identity: 'user'});
                }
            });
        } else {
            conn.query(sqlStr_admin, [params.name, params.password1], (err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json({msg: result, identity: 'admin'});
                }
            });
        }
    }
    conn.end();
});

// 查询用户
router.post('/selectUser', (req, res) => {
    let sqlStr_user = sql.user.select;
    let sqlStr_admin = sql.admin.select;
    let params = req.body;
    let conn = new DBHelper().getConn();
    if (params.identity == 'user') {
        conn.query(sqlStr_user, [params.name], (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result)
            }
        });
    } else {
        conn.query(sqlStr_admin, [params.name], (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result)
            }
        });
    }
    conn.end();
});

router.post('/selectId', (req, res) => {
    let conn = new DBHelper().getConn();
    conn.query(sql.user.ById, [req.body.username], (err, result) => {
        res.json(result)
    })
})

module.exports = router;