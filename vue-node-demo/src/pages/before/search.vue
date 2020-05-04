<template>
  <div class="back">
    <div class="top">
      <div class="left">您好，{{ userName }}{{ sex }}</div>
      <div class="right">
        <span class="home" @click="goHome"><i class="el-icon-house"></i>首页</span>
        <el-divider direction="vertical"></el-divider>
        <span><i class="el-icon-shopping-cart-2"></i>购物车</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="order"><i class="el-icon-s-order"></i>我的订单</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="loginOut">退出登录</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="personSet">个人设置</span>
      </div>
    </div>
    <div>
      <el-row class="search">
        <el-col :span="2" :offset="3">
          <span @click="goHome">烟草专卖</span>
        </el-col>
        <el-col :span="9">
          <el-input class="input" v-model="input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="1">
          <el-button class="button" plain @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="goods">
      <el-row :gutter="20">
        <div v-for="item in goodsList" :key="item.id" @click="detail(item)">
          <el-col :span="6">
            <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
              <div class="img">
                <img :src="showImg(item.img)" />
              </div>
              <div class="content">
                <span>￥{{ item.money }}</span>
                <span class="count">{{ item.count }}人购买</span>
              </div>
              <div class="describe">{{ item.describe1 }}</div>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userName: '',
      sex: '',
      goodsList: [],
      input: ''
    }
  },
  methods: {
    goHome() {
      let newpage = this.$router.resolve({
        name: 'sale'
      })
      window.open(newpage.href, '_self')
    },
    search() {
      axios
        .post('/api/goods/goodsSearch', {
          name: this.input
        })
        .then(res => {
          this.goodsList = res.data
        })
    },
    order() {
      sessionStorage.setItem('active', 'order')
      let newpage = this.$router.resolve({
        name: 'myOrder'
      })
      window.open(newpage.href, '_blank')
    },
    detail(item) {
      let newpage = this.$router.resolve({
        name: 'detail'
      })
      window.open(newpage.href, '_blank')
      axios.post('/api/goods/detail', {
        id: item.id
      })
    },
    loginOut() {
      this.$router.replace('/')
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    },
    personSet() {
      this.$router.push('/userSet')
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    }
  },
  mounted() {
    this.userName = sessionStorage.getItem('nickname')
    this.sex = sessionStorage.getItem('sex')
    let name = sessionStorage.getItem('searchName')
    axios
      .post('/api/goods/goodsSearch', {
        name
      })
      .then(res => {
        this.goodsList = res.data
      })
  }
}
</script>

<style lang="less" scoped>
.back {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .top {
    height: 33px;
    border-bottom: 1px #f0f0f0 solid;
    line-height: 33px;
    background: #f4f4f4;
    .left {
      float: left;
      font-size: 12px;
      color: #999;
      margin-left: 35px;
    }
    .right {
      float: right;
      font-size: 12px;
      margin-right: 100px;
      color: #999;
      cursor: pointer;
      i {
        color: #03b262;
        margin-right: 2px;
      }
    }
  }
  .search {
    span {
      font-size: 42px;
      color: #108707;
      font-weight: bolder;
      position: relative;
      top: 6px;
      cursor: pointer;
      letter-spacing: 15px;
    }
    .input {
      margin-top: 44px;
      border: #108707 2px solid;
      border-radius: 5px;
      position: relative;
    }
    .button {
      margin-top: 43px;
      margin-left: 3px;
      background: #108707;
      color: #fff;
      height: 45px;
    }
  }
  .goods {
    margin-top: 50px;
    width: 80%;
    margin-left: 10%;
    .card {
      cursor: pointer;
      margin-bottom: 25px;
      .img {
        width: 100%;
        height: 270px;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .content {
        padding: 6px;
        .count {
          float: right;
        }
        span {
          color: #888;
          font-size: 12px;
        }
        span:first-child {
          color: #f40;
          font-weight: 700;
          font-family: arial;
          font-size: 18px;
        }
      }
      .describe {
        padding: 6px;
        color: #3d3d3d;
        font-size: 12px;
      }
    }
  }
}
</style>
