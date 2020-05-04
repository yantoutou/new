<template>
  <div class="back">
    <div class="top">
      <div class="left">
        <span>欢迎您，{{ userName }}{{ sex }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="shou" @click="out">退出</span>
        <el-divider direction="vertical"></el-divider>
        <span class="shou" @click="home">首页</span>
      </div>
    </div>
    <div class="nav">
      <el-row class="navRow">
        <el-col :span="4" :offset="2">
          <span class="order" @click="myorder">我的订单</span>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  data() {
    return {
      userName: '',
      sex: ''
    }
  },
  methods: {
    home() {
      let newpage = this.$router.resolve({
        name: 'sale'
      })
      window.open(newpage.href, '_self')
      document.title = 'yantoutou'
    },
    out() {
      this.$router.replace('/')
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    },
    myorder() {
      this.reload()
    },
    orderhome() {
      this.$router.push({ path: '/myOrder/homePage' })
    },
    set() {
      this.$router.push('/userSet')
    }
  },
  mounted() {
    this.$router.push({ path: '/myOrder/homePage/order' })
    let name = sessionStorage.getItem('username')
    axios
      .post('/api/set/getMessage', {
        name
      })
      .then(res => {
        this.userName = res.data[0].nickname
        if (res.data[0].gender == '女') {
          this.sex = '女士'
        } else {
          this.sex = '先生'
        }
      })
    document.title = '我的订单'
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
    .left {
      float: left;
      font-size: 12px;
      color: #999;
      margin-left: 35px;
      .shou {
        cursor: pointer;
      }
    }
  }
  .nav {
    width: 100%;
    height: 80px;
    background: #03b262;
    line-height: 80px;
    .order {
      font-size: 40px;
      color: #fff;
      line-height: 80px;
      font-family: Georgia, serif;
      cursor: pointer;
    }
    .menu {
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      .icon {
        margin-top: 75px;
        float: right;
        font-size: 10px;
        margin-right: 33px;
      }
    }
    i {
      position: relative;
      bottom: 40px;
      font-size: 30px;
      color: #fff;
    }
  }
  .main {
    width: 90%;
    height: 100%;
    margin-left: 5%;
    .right {
      width: 90%;
      height: 100%;
      margin-left: 10%;
    }
  }
}
.content {
  margin-top: 15px;
  cursor: pointer;
}
.content:hover {
  color: #03b262;
}
.last {
  margin-bottom: 10px;
}
</style>
