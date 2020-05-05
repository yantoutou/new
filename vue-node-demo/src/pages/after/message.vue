<template>
  <div>
    <div>未处理消息</div>
    <el-divider></el-divider>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item>
            <el-input v-model="form.number" placeholder="请输入订单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round @click="search">搜索</el-button>
          <el-button type="danger" round @click="deleteNum">删除</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="120"> </el-table-column>
      <el-table-column prop="type" label="提醒内容" width="150"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180"> </el-table-column>
      <el-table-column prop="time" label="时间" width="180"> </el-table-column>
      <el-table-column label="订单号" prop="number"></el-table-column>
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>确定此订单已处理吗？删除后将看不到此消息！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click='cancel'>取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  data() {
    return {
      tableData: [],
      id: '',
      currentPage: 1,
      dialogVisible: false,
      total: 0,
      form: {
        number: '',
      },
    }
  },
  methods: {
    getList() {
      axios.post('/api/message/showList').then((res) => {
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.form.number == '') {
        axios
          .post('/api/message/page', {
            page: this.currentPage,
          })
          .then((res) => {
            this.tableData = res.data
          })
      } else {
        axios
          .post('/api/message/searchPage', {
            page: this.currentPage,
            number: this.form.number,
          })
          .then((res) => {
            this.tableData = res.data.data
            this.total = res.data.total
          })
      }
    },
    search() {
      this.currentPage = 1
      if (this.form.number == '') {
        this.getList()
      } else {
        axios
          .post('/api/message/search', {
            number: this.form.number,
          })
          .then((res) => {
            this.tableData = res.data.data
            this.total = res.data.total
          })
      }
    },
    deleteNum() {
      if (this.form.number == '') {
        this.$message.error('你还没有选择订单')
      } else {
        this.dialogVisible = true
      }
    },
    cancel() {
      this.dialogVisible = false
    },
    confirm() {
      axios.post('/api/message/deleteNum', {
        number: this.form.number
      }).then(() => {
        this.$message.success('删除成功')
        this.reload();
        this.dialogVisible = false
      })
    }
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.page {
  float: right;
}
</style>
