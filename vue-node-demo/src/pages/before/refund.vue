<template>
  <div>
    <el-table :data="tableData" border style="width: 85%;">
      <el-table-column prop="goods" label="商品" width="150">
        <template slot-scope="scope">
          <img :src="showImg(scope.row.goodsImg)" class="goodsImg" />
          <div>{{ scope.row.goodsName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="订单号" width="150"> </el-table-column>
      <el-table-column prop="money" label="价格" width="150"> </el-table-column>
      <el-table-column prop="time" label="日期" width="150"> </el-table-column>
      <el-table-column prop="evaluation" label="提醒" width='180'>
        <template slot-scope="scope">
          <el-button @click="remindReturn(scope.row)">提醒卖家退货</el-button>
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
            .post('/api/order/refund', {
              userId: res.data[0].id,
              page: this.currentPage
            })
            .then((res) => {
              this.tableData = res.data.res
              this.total = res.data.total
            })
        })
    },remindReturn(row) {
      let username = sessionStorage.getItem('username')
      axios
        .post('/api/order/remindelivery', {
          type: '退货提醒',
          username,
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          number: row.number,
        })
        .then(() => {
          this.$message.success('提醒退货成功')
        })
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
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
