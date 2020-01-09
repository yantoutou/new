// sql语句
var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into user(name, age) values (?, ?)',
        // 查询用户
        select_user: 'select * from user where name = ? and password = ?'
    },
    admin: {
        // 查询管理员
        select_admin: 'select * from admin where name = ? and password = ?'
    }
}

module.exports = sqlMap;