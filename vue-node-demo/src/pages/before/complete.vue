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
      <el-table-column prop="evaluation" label="评价" width="150">
        <template>
          <el-button>评价</el-button>
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
            .post('/api/order/complete', {
              userId: res.data[0].id,
              page: this.currentPage
            })
            .then((res) => {
              this.tableData = res.data.res
              this.total = res.data.total
            })
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
