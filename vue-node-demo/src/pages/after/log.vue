<template>
  <div>
    <div>操作日志</div>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="100"> </el-table-column>
      <el-table-column prop="name" label="操作人" width="250"> </el-table-column>
      <el-table-column prop="operation" label="操作" width="250"> </el-table-column>
      <el-table-column prop="time" label="操作时间" width="350"> </el-table-column>
      <el-table-column prop="content" label="操作内容"> </el-table-column>
      <div slot="append">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          :page-size="10"
          class="page"
        >
        </el-pagination>
      </div>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    getList() {
      axios.post('/api/log/getList', {
        currentPage: this.currentPage
      }).then(res => {
        this.tableData = res.data.data
        this.total = res.data.len
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.page {
  float: right;
}
</style>
