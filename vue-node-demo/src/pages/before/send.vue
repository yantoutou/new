<template>
  <div>
    <el-table :data="tableData" border style="width: 80%;">
      <el-table-column prop="goods" label="商品" width="150">
        <template slot-scope="scope">
          <img :src="showImg(scope.row.goodsImg)" class="goodsImg" />
          <div>{{ scope.row.goodsName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="订单号" width="150"> </el-table-column>
      <el-table-column prop="money" label="价格" width="150"> </el-table-column>
      <el-table-column prop="time" label="日期" width="150"> </el-table-column>
      <el-table-column prop="evaluation" label="提醒发货">
        <template slot-scope="scope">
          <el-button @click="remindelivery(scope.row)">提醒发货</el-button>
          <el-button @click="returnGoods(scope.row)">退货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        :page-size="10"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
    }
  },
  methods: {
    getList() {
      let name = sessionStorage.getItem('username')
      axios
        .post('/api/user/selectUser', {
          name,
          identity: 'user',
        })
        .then((res) => {
          axios
            .post('/api/order/send', {
              userId: res.data[0].id,
              page: this.currentPage
            })
            .then((res) => {
              this.tableData = res.data.res
              this.total = res.data.total
            })
        })
    },
    remindelivery(row) {
      let username = sessionStorage.getItem('username')
      axios
        .post('/api/order/remindelivery', {
          type: '发货提醒',
          username,
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          number: row.number,
        })
        .then(() => {
          this.$message.success('提醒发货成功')
        })
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    returnGoods(row) {
      let username = sessionStorage.getItem('username')
      axios
        .post('/api/user/selectId', {
          username,
        })
        .then((res) => {
          axios.post('/api/order/returnGoods', {
            number: row.number,
            money: row.money,
            user: username,
            time: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: res.data[0].id,
            goodsId: row.id
          }).then(() => {
            this.$message.success('退货申请已提交')
            this.reload()
          })
        })
    },
    handleCurrentChange(val) {
        this.currentPage = val
        this.getList()
    }
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.goodsImg {
  width: 100px;
  cursor: pointer;
}
.page {
  float: right;
}
</style>
