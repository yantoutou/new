<template>
  <div>
    <div>留言管理</div>
    <el-divider></el-divider>
    <el-form>
      <el-row gutter="20">
        <el-col :span="4">
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-select v-model="form.value" placeholder="请选择状态" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round>搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
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
          <el-link
            type="warning"
            :disabled="scope.row.status == '2' || scope.row.status == '3'"
            @click="apply(scope.row)"
            >回复</el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="info"
            :disabled="scope.row.status == '2' || scope.row.status == '3'"
            @click="ignore(scope.row)"
            >忽略</el-link
          >
        </template>
      </el-table-column>
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
    <el-dialog :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="success" @click="send">发送</el-button>
      </div>
    </el-dialog>
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
      dialogTableVisible: false,
      textarea: '',
      content: '',
      userId: '',
      id: '',
      currentPage: 1,
      total: 0,
      form: {
        name: '',
        phone: '',
        value: ''
      },
      options: [
        {
          value: '1',
          label: '已回复'
        },
        {
          value: '1',
          label: '未回复'
        },
        {
          value: '1',
          label: '忽略'
        }
      ]
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
      axios
        .post('/api/message/ignore', {
          operation: 'ignore',
          id: row.id
        })
        .then(() => {
          this.$message.success('已忽略')
          this.reload()
        })
    },
    cancel() {
      this.dialogTableVisible = false
      this.$message('操作已取消')
    },
    apply(row) {
      this.dialogTableVisible = true
      this.content = row.content
      this.userId = row.userId
      this.id = row.id
    },
    send() {
      if (this.textarea == '') {
        this.$message.error('请输入内容')
      } else {
        axios
          .post('/api/message/apply', {
            userId: this.userId,
            content: this.content,
            apply: this.textarea,
            time: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: this.id
          })
          .then(() => {
            this.$message.success('回复成功')
            this.reload()
          })
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    getList() {
      axios
        .post('/api/message/showList', {
          currentPage: this.currentPage
        })
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.count
        })
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
