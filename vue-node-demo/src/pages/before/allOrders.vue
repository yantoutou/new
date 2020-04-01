<template>
  <div>
    <el-row>
      <el-col :span="14">
        <el-input class="input" placeholder="请输入订单号进行搜索" v-model="form.number">
          <template slot="append">
            <div @click="search">搜索订单</div>
          </template>
        </el-input>
      </el-col>
      <el-col :span="3" class="searchMore">
        <span @click="more">{{ text }}</span>
      </el-col>
    </el-row>
    <el-form label-width="80px" v-if="showMore">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="商品名称">
            <el-input placeholder="请输入商品名称" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交易时间">
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="form.time"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="goods" label="商品" width="200">
        <template slot-scope="scope">
          <img :src="showImg(scope.row.goodsImg)" class="goodsImg" />
          <div>{{ scope.row.goodsName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="订单号" width="150"> </el-table-column>
      <el-table-column prop="money" label="价格" width="150"> </el-table-column>
      <el-table-column prop="time" label="日期" width="150"> </el-table-column>
      <el-table-column prop="label" label="交易状态" width="150"> </el-table-column>
      <el-table-column prop="evaluation" label="评价">
        <template>
          <el-button type="success" plain>评价</el-button>
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
      statusList: [],
      showMore: false,
      showText: {
        more: '高级搜索',
        nomore: '收起'
      },
      text: '',
      total: 0,
      currentPage: 1,
      form: {
        number: '',
        name: '',
        time: ''
      },
      id: ''
    }
  },
  methods: {
    getList() {
      let name = sessionStorage.getItem('username')
      axios
        .post('/api/user/selectUser', {
          name,
          identity: 'user'
        })
        .then(res => {
          this.id = res.data[0].id
          axios
            .post('/api/order/selectOrder', {
              id: res.data[0].id,
              page: this.currentPage
            })
            .then(res => {
              this.tableData = res.data.res
              this.total = res.data.total
            })
        })
      axios.post('/api/order/statusList').then(res => {
        this.statusList = res.data
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      let startTime
      let endTime
      if (this.form.time == '' || !this.form.time) {
        startTime = ''
        endTime = ''
      } else {
        startTime = moment(this.form.time[0]).format('YYYY-MM-DD 00:00:00')
        endTime = moment(this.form.time[1]).format('YYYY-MM-DD 23:59:59')
      }
      axios
        .post('/api/order/userPage', {
          number: this.form.number,
          name: this.form.name,
          startTime,
          endTime,
          id: this.id,
          page: this.currentPage
        })
        .then(res => {
          this.tableData = res.data
        })
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    more() {
      if (this.showMore == true) {
        this.showMore = false
        this.text = this.showText.more
      } else {
        this.showMore = true
        this.text = this.showText.nomore
      }
    },
    search() {
      this.currentPage = 1
      let startTime
      let endTime
      if (this.form.time == '' || !this.form.time) {
        startTime = ''
        endTime = ''
      } else {
        startTime = moment(this.form.time[0]).format('YYYY-MM-DD 00:00:00')
        endTime = moment(this.form.time[1]).format('YYYY-MM-DD 23:59:59')
      }
      axios
        .post('/api/order/userOrder', {
          number: this.form.number,
          name: this.form.name,
          startTime,
          endTime,
          id: this.id
        })
        .then(res => {
          this.total = res.data.total
          this.tableData = res.data.res
        })
    }
  },
  mounted() {
    this.getList()
    this.text = this.showText.more
  }
}
</script>

<style lang="less" scoped>
    .searchMore {
      font-size: 12px;
      line-height: 50px;
      margin-left: 15px;
      color: #02a8f3;
      cursor: pointer;
    }
    .input {
      cursor: pointer;
    }
    .goodsImg {
      width: 100px;
      cursor: pointer;
    }
    .page {
      float: right;
    }
</style>
