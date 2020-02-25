// sql语句
var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into user(name, password, nickname, gender, img) values (?, ?, ?, ?, "file-1581411637655.png")',
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
        updateCount: 'update goods set count = count - 1, inventory = inventory + 1 where id = ?',
        updateReturnCount: 'update goods set count = count + 1, inventory = inventory - 1 where id = ?',
        // 订单编号查询
        select_number: 'select * from returnList where number = ?'
    },
    goods: {
        select: 'select * from goods',
        select_section: 'select * from goods limit 0,?',
        search_one: 'select * from goods where name = ? or time between ? and ? limit 0,?',
        search_one_len: 'select * from goods where name = ? or time between ? and ?',
        search: 'select * from goods where name = ? and time between ? and ? limit 0,?',
        search_len: 'select * from goods where name = ? and time between ? and ?',
        delete_one : 'delete from goods where id = ?',
        edit: 'update goods set name = ?, money = ?, discount = ?, new = ? where id = ?',
        upload: 'update goods set img = ? where id = ?',
        addGoods: 'insert into goods(name, img, time, money, discount, new, count, inventory) values (?, ?, ?, ?, ?, ?, ?, ?)'
    },
    work: {
        returnNumber: 'select * from returnList where deal = "未处理"',
        orderNumber: 'select * from orderList where status = 5',
        sale: 'select * from orderList where time between ? and ? and status in(1,2,4,5)',
        goodsValue: 'select count as `value`, id as `name` from goods',
        table: 'select * from user where time between ? and ?',
        user_b: 'select * from user where gender = "男"',
        user_g: 'select * from user where gender = "女"'
    },
    log: {
        getList: 'select * from log limit ?,10',
        getAll: 'select * from log',
        add: 'insert into log(name, operation, time, content) values (?, ?, ?, ?)'
    }
}

module.exports = sqlMap;