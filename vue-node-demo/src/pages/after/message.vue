<template>
  <div>
    <div>留言管理</div>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%" :cell-style="cellStyle">
      <el-table-column prop="id" label="ID" width="120"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column prop="time" label="时间" width="180"> </el-table-column>
      <el-table-column label="内容" prop="content" width="180">
        <template slot-scope="scope">
          <el-popover placement="top-start" width="250" trigger="hover">
            <div>{{ scope.row.content }}</div>
            <span slot="reference">{{ scope.row.content.substr(0, 10) + '...' }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="状态" width="180"> </el-table-column>
      <el-table-column prop="manage" label="管理">
        <template slot-scope="scope">
          <el-link type="warning" :disabled='scope.row.status == "2" || scope.row.status == "3"'>回复</el-link>
          <el-divider direction="vertical"></el-divider>
           <el-link type="info" :disabled='scope.row.status == "2" || scope.row.status == "3"' @click='ignore(scope.row)'>忽略</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    cellStyle(row) {
      if (row.column.label == '状态') {
        if (row.row.status == 1) {
          return 'color: red'
        } else if (row.row.status == 2) {
          return 'color: #8dd16c'
        } else if (row.row.status == 3) {
          return 'color: #e6a23d'
        }
      }
    },
    ignore(row) {
      axios.post('/api/message/ignore', {
        operation: 'ignore',
        id: row.id
      }).then(() => {
        this.$message.success('已忽略')
        this.reload();
      })
    }
  },
  mounted() {
    axios.post('/api/message/showList').then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style lang="less" scoped></style>
