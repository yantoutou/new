<template>
  <div>
    <el-card>
      <div slot="header">
        <span>退货管理</span>
      </div>
      <div>
        <el-table :data="tableData" :cell-style="cellStyle" border>
          <el-table-column prop="number" label="退货单号" width="180">
          </el-table-column>
          <el-table-column prop="money" label="退款金额" width="180">
          </el-table-column>
          <el-table-column prop="time" label="申请时间" width="210" :formatter="formatterTime"> </el-table-column>
          <el-table-column prop="user" label="申请人" width="180"> </el-table-column>
          <el-table-column prop="deal" label="商家处理" width="180"> </el-table-column>
          <el-table-column label="管理操作">
            <template slot-scope="scope">
              <el-button type="primary" :disabled='scope.row.deal == "同意"'>处理</el-button>
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
      tableData: []
    };
  },
  methods: {
    cellStyle(row) {
      if (row.row.deal == '未处理') {
        return 'background: oldlace'
      }
    },
    formatterTime(row) {
      return this.$moment(row.time).format("YYYY-MM-DD HH:mm:ss");
    },
    getList() {
      axios.post('/api/return/selectList').then(res => {
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
</style>
