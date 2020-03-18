<template>
  <div>
    <div>退货管理</div>
    <el-divider></el-divider>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="5">
            <el-input v-model="input" placeholder="请输入退货单号" clearable></el-input>
          </el-col>
          <el-col :span="2">
            <el-button
              icon="el-icon-search"
              circle
              type="primary"
              class="search"
              @click="search"
            ></el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-table
          :data="tableData"
          :cell-style="cellStyle"
          border
          height="550"
          ref="table"
        >
          <el-table-column prop="number" label="退货单号" width="170"> </el-table-column>
          <el-table-column prop="money" label="退款金额" width="150"> </el-table-column>
          <el-table-column prop="time" label="申请时间" width="210"> </el-table-column>
          <el-table-column prop="user" label="申请人" width="150"> </el-table-column>
          <el-table-column prop="deal" label="商家处理" width="180"> </el-table-column>
          <el-table-column label="管理操作">
            <template slot-scope="scope">
              <el-button
                type="success"
                @click="deal(scope.row)"
                v-if="scope.row.deal == '未处理'"
                >处理</el-button
              >
              <el-button type="warning" @click="returnDeal(scope.row)" v-else
                >退回</el-button
              >
            </template>
          </el-table-column>
          <div slot="append" style="text-align: center">
            <p v-if="showMore">加载中...</p>
            <p v-if="nomore">没有更多了</p>
          </div>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data() {
    return {
      tableData: [],
      input: '',
      showMore: true,
      nomore: false,
      dom: '',
      total: 0,
      limit: 10
    }
  },
  methods: {
    deal(row) {
      let logName = sessionStorage.getItem('username')
      axios
        .post('/api/log/addLog', {
          name: logName,
          operation: '退货管理',
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          content: '处理'
        })
        .then(res => {
          console.log(res)
        })
      axios
        .post('/api/return/updateList', {
          number: row.number,
          id: row.id
        })
        .then(() => {
          row.deal = '同意'
        })
        .catch(err => {
          console.log(err)
        })
    },
    returnDeal(row) {
      let logName = sessionStorage.getItem('username')
      axios
        .post('/api/log/addLog', {
          name: logName,
          operation: '退货管理',
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          content: '退回'
        })
        .then(res => {
          console.log(res)
        })
      axios
        .post('/api/return/updateReturn', {
          number: row.number,
          id: row.id
        })
        .then(() => {
          row.deal = '未处理'
        })
        .catch(err => {
          console.log(err)
        })
    },
    cellStyle(row) {
      if (row.row.deal == '未处理') {
        return 'background: oldlace'
      }
    },
    scrollEvent() {
      this.$refs.table.bodyWrapper.scrollTop = 0
      this.dom = this.$refs.table.bodyWrapper
      this.dom.addEventListener('scroll', () => {
        let scrollTop = this.dom.scrollTop
        let windowHeight = this.dom.clientHeight || this.dom.clientHeight
        let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
        if (scrollTop + windowHeight === scrollHeight) {
          if (this.total == this.limit || this.total < this.limit) {
            this.nomore = true
            this.showMore = false
          } else if (this.total == 0) {
            this.nomore = false
            this.showMore = false
          } else {
            this.showMore = true
            this.nomore = false
            this.limit = this.limit + 10
            setTimeout(() => {
              this.search()
            }, 1000)
          }
        }
      })
    },
    search() {
      let logName = sessionStorage.getItem('username')
      axios
        .post('/api/log/addLog', {
          name: logName,
          operation: '退货管理',
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          content: '搜索'
        })
        .then(res => {
          console.log(res)
        })
        axios
          .post('/api/return/selectNumber', {
            number: this.input,
            limit: this.limit
          })
          .then(res => {
            this.total = res.data.count
            this.tableData = res.data.data
          })
          .catch(err => {
            console.log(err)
      })
    }
  },
  mounted() {
    this.search()
    this.scrollEvent()
  }
}
</script>

<style lang="less" scoped>
span {
  line-height: 40px;
}
.search {
  margin-left: 30px;
}
</style>
