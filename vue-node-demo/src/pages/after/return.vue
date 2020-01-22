<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="17">
            <span>退货管理</span>
          </el-col>
          <el-col :span="5">
            <el-input v-model="input" placeholder="请输入退货单号" clearable></el-input>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-search" circle type="primary" class="search" @click="search"></el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table :data="tableData" :cell-style="cellStyle" border height="550">
          <el-table-column prop="number" label="退货单号" width="180">
          </el-table-column>
          <el-table-column prop="money" label="退款金额" width="180">
          </el-table-column>
          <el-table-column prop="time" label="申请时间" width="210"> </el-table-column>
          <el-table-column prop="user" label="申请人" width="180"> </el-table-column>
          <el-table-column prop="deal" label="商家处理" width="180"> </el-table-column>
          <el-table-column label="管理操作">
            <template slot-scope="scope">
              <el-button type="success" :disabled='scope.row.deal == "同意"' @click="deal(scope.row)">处理</el-button>
              <el-button type="warning" :disabled='scope.row.deal == "未处理"' @click="returnDeal(scope.row)">退回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      input: ''
    };
  },
  methods: {
    deal(row) {
      axios.post('/api/return/updateList', {
        number: row.number
      }).then(() => {
        row.deal = '同意'
      }).catch(err => {
        console.log(err)
      })
    },
    returnDeal(row) {
      axios.post('/api/return/updateReturn', {
        number: row.number
      }).then(() => {
        row.deal = '未处理'
      }).catch(err => {
        console.log(err)
      })
    },
    cellStyle(row) {
      if (row.row.deal == '未处理') {
        return 'background: oldlace'
      }
    },
    getList() {
      axios.post('/api/return/selectList').then(res => {
        this.tableData = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    search() {
      axios.post('/api/return/selectNumber', {
        number: this.input
      }).then(res => {
        this.tableData = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
span {
  line-height: 40px;
}
.search {
  margin-left: 30px;
}
</style>
