<template>
  <div>
    <span>待办项</span>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="6">
        <el-card shadow="hover" class="card" @click.native='returnClick'>
          <div class="left">
            <span class="number-return">{{returnNum}}</span>
            <p>Return of the order</p>
          </div>
          <div class="right">
            <i class="iconfont icon-tuihuo"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="left">
            <span class="number-msg">123</span>
            <p>Message processing</p>
          </div>
          <div class="right">
            <i class="iconfont icon-icon-test1"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card" @click.native='returnClick'>
          <div class="left">
            <span class="number-order">{{orderNum}}</span>
            <p>Unaudited order</p>
          </div>
          <div class="right">
            <i class="iconfont icon-order_icon"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="left">
            <span class="number-urged">80</span>
            <p>urged</p>
          </div>
          <div class="right">
            <i class="iconfont icon-cuiban"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      returnNum: '',
      orderNum: ''
    }
  },
  methods: {
    returnClick() {
      this.$router.push('/manage/order')
    }
  },
  mounted() {
    axios.post('/api/work/todoNumber').then(res => {
      this.returnNum = res.data.return
      this.orderNum = res.data.order
    })
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 265px;
  height: 108px;
  margin-top: 10px;
  .left {
    float: left;
    .number-return {
      color: #b6a2de;
      font-size: 20px;
      font-weight: 700;
    }
    .number-msg {
      color: #36a3f7;
      font-size: 20px;
      font-weight: 700;
    }
    .number-order {
      color: #40c9c6;
      font-size: 20px;
      font-weight: 700;
    }
    .number-urged {
      color: #f4516c;
      font-size: 20px;
      font-weight: 700;
    }
    p {
      color: #666;
    }
  }
  .right {
    float: right;
    .icon-tuihuo {
      font-size: 55px;
      color: #b6a2de;
    }
    .icon-icon-test1 {
      font-size: 55px;
      color: #36a3f7;
    }
    .icon-order_icon {
      font-size: 55px;
      color: #40c9c6;
    }
    .icon-cuiban {
      font-size: 55px;
      color: #f4516c;
    }
  }
}
</style>
