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
        status: 'select * from statusList',
        // 订单查询 一个
        select_one: 'select * from orderList where status = ? or number = ? or time between ? and ?',
        // 订单查询 订单号、状态
        select_NS: 'select * from orderList where number = ? and status = ?',
        // 订单查询 订单号、时间
        select_NT: 'select * from orderList where number = ? and time between ? and ?',
        // 订单查询 状态、时间
        select_ST: 'select * from orderList where status = ? and time between ? and ?',
        // 订单查询 订单号、状态、时间
        select_NST: 'select * from orderList where number = ? and status = ? and time between ? and ?',
        // 订单修改
        update: 'update orderList set phone = ?, address = ?, status = ?, label = ? where id = ?',
        // 分页
        page: 'select * from orderList limit ?,7',
        page_one: 'select * from orderList where status = ? or number = ? or time between ? and ? limit ?,7',
        page_NS: 'select * from orderList where number = ? and status = ? limit ?,7',
        page_NT: 'select * from orderList where number = ? and time between ? and ? limit ?,7',
        page_ST: 'select * from orderList where status = ? and time between ? and ? limit ?,7',
        page_NST: 'select * from orderList where number = ? and status = ? and time between ? and ? limit ?,7'
    },
    returnGoods: {
        select: 'select * from returnList',
        // 处理
        update: 'update returnList set deal = "同意" where number = ?',
        // 退回
        updateReturn: 'update returnList set deal = "未处理" where number = ?',
        // 订单编号查询
        select_number: 'select * from returnList where number = ?'
    },
    goods: {
        select: 'select * from goods',
        search_one: 'select * from goods where name = ? or time between ? and ?',
        search: 'select * from goods where name = ? and time between ? and ?',
        delete_one : 'delete from goods where id = ?',
        edit: 'update goods set name = ?, money = ?, discount = ?, new = ? where id = ?'
    }
}

module.exports = sqlMap;