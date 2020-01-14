// sql语句
var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into user(name, password, nickname) values (?, ?, ?)',
        // 查询用户
        select_user: 'select * from user where name = ? and password = ?',
        select: 'select * from user where name = ?'
    },
    admin: {
        // 查询管理员
        select_admin: 'select * from admin where name = ? and password = ?',
        //添加管理员
        add: 'insert into admin(name, password) values (?, ?)',
        select: 'select * from admin where name = ?'
    },
    order: {
        // 订单列表
        select_list: 'select * from orderList',
        // 状态下拉列表
        select_status: 'select * from statusList',
        // 订单查询
        select_order: 'select * from orderList where number = ?'
    }
}

module.exports = sqlMap;