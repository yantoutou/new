<template>
  <div>
    <div>操作日志</div>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="100"> </el-table-column>
      <el-table-column prop="name" label="操作人" width="250"> </el-table-column>
      <el-table-column prop="operation" label="操作" width="250"> </el-table-column>
      <el-table-column prop="time" label="操作时间" width='350'> </el-table-column>
      <el-table-column prop="content" label="操作内容"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getList() {
      axios.post('/api/log/getList').then(res => {
        this.tableData = res.data
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="scss" scoped></style>
