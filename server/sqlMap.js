// sql语句
var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into user(name, password, nickname, gender, img) values (?, ?, ?, ?, "file-1581411637655.png")',
        // 查询用户
        select_user: 'select * from user where name = ? and password = ?',
        select: 'select * from user where name = ?',
        ById: 'select id from user where name = ?'
    },
    admin: {
        // 查询管理员
        select_admin: 'select * from admin where name = ? and password = ?',
        //添加管理员
        add: 'insert into admin(name, password, img) values (?, ?, "file-1581411637655.png")',
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
        page_NST: 'select * from orderList where number = ? and status = ? and time between ? and ? limit ?,7',
        // 根据用户id查询
        selectById: 'select * from orderList where userId = ?',
        selectByIdPage: 'select * from orderList where userId = ? limit ?,10',
        selectByNumber: 'select * from orderList where userId = ? and number = ?',
        selectByNumberP: 'select * from orderList where userId = ? and number = ? limit ?,10',
        selectByName: 'select * from orderList where userId = ? and goodsName = ?',
        selectByNameP: 'select * from orderList where userId = ? and goodsName = ? limit ?,10',
        selectByTime: 'select * from orderList where userId = ? and time between ? and ?',
        selectByTimeP: 'select * from orderList where userId = ? and time between ? and ? limit ?,10',
        selectByNN: 'select * from orderList where userId = ? and number = ? and goodsName = ?',
        selectByNNP: 'select * from orderList where userId = ? and number = ? and goodsName = ? limit ?,10',
        selectByNumT: 'select * from orderList where userId = ? and number = ? and time between ? and ?',
        selectByNumTP: 'select * from orderList where userId = ? and number = ? and time between ? and ? limit ?,10',
        selectByNameT: 'select * from orderList where userId = ? and goodsName = ? and time between ? and ?',
        selectByNameTP: 'select * from orderList where userId = ? and goodsName = ? and time between ? and ? limit ?,10',
        selectByAll: 'select * from orderList where userId = ? and number = ? and goodsName = ? and time between ? and ?',
        selectByAllP: 'select * from orderList where userId = ? and number = ? and goodsName = ? and time between ? and ? limit ?,10',
        complete: 'select * from orderList where userId = ? and status = "1"',
        completeP: 'select * from orderList where userId = ? and status = "1" limit ?,10',
        ongoing: 'select * from orderList where userId = ? and status = "2"',
        ongoingP: 'select * from orderList where userId = ? and status = "2" limit ?,10',
        return: 'select * from orderList where userId = ? and status = "3"',
        returnP: 'select * from orderList where userId = ? and status = "3" limit ?,10',
        send: 'select * from orderList where userId = ? and status = "5"',
        sendP: 'select * from orderList where userId = ? and status = "5" limit ?,10',
        refund: 'select * from orderList where userId = ? and status = "4"',
        refundP: 'select * from orderList where userId = ? and status = "4" limit ?,10',
        confirmGoods: 'update orderList set status = "1", label = "已完成" where id = ?',
        remindelivery: 'insert into unMessage (type, time, username, number) values (?, ?, ?, ?)',
        returnGoods: 'insert into returnList (number, money, user, time, deal, id) values (?, ?, ?, ?, "未处理", ?)',
        change: 'update orderList set status = "4", label = "退货审核中" where id = ?'
    },
    returnGoods: {
        select: 'select * from returnList',
        select_limit: 'select * from returnList limit 0, ?',
        // 处理
        update: 'update returnList set deal = "同意" where number = ?',
        // 退回
        updateReturn: 'update returnList set deal = "未处理" where number = ?',
        updateCount: 'update goods set count = count - 1, inventory = inventory + 1 where id = ?',
        updateReturnCount: 'update goods set count = count + 1, inventory = inventory - 1 where id = ?',
        // 订单编号查询
        select_number: 'select * from returnList where number = ?',
        select_number_limit: 'select * from returnList where number = ? limit 0,?'
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
        addGoods: 'insert into goods(name, img, time, money, discount, new, count, inventory, type, describe1) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        type: 'select * from goods where type = ? limit 0,6',
        brandList: 'select * from brandList',
        saleSearch: 'select * from goods where name like concat("%",?,"%")',
        detail:'select * from goods where id = ?'
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
    },
    set: {
        selectUser: 'select * from admin where name = ?',
        upload: 'update admin set img = ? where name = ?',
        edit: 'select * from admin where name = ? and password = ?',
        setPassword: 'update admin set password = ? where name = ?',
        getUser: 'select * from user where name = ?',
        editMsg: 'update user set nickname = ?,password = ?,gender = ? where name = ?'
    },
    message: {
        selectAll: 'select * from message',
        selectPage: 'select * from message limit ?,10',
        selectName: 'select * from message where name = ?',
        selectNamePage: 'select * from message where name = ? limit ?,10',
        selectValue: 'select * from message where status = ?',
        selectValuePage: 'select * from message where status = ? limit ?,10',
        selectBoth: 'select * from message where name = ? and status = ?',
        selectBothPage: 'select * from message where name = ? and status = ? limit ?,10',
        ignore: 'update message set status = "3",value = "忽略" where id = ?',
        apply: 'insert into apply(id, apply, content, time) values (?, ?, ?, ?)',
        edit: 'update message set status = "2",value = "已回复" where id = ?'
    },
    sale: {
        user: 'select * from user where name = ?',
        hotList: 'select * from goods order by count desc limit 0,8'
    }
}

module.exports = sqlMap;