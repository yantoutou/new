<template>
  <div>
    <div class="back">
      <el-scrollbar style="height: 100%">
        <div class="top">
          <div class="left">您好，{{ userName }}{{ sex }}</div>
          <div class="right">
            <span class="home" @click="goHome()"><i class="el-icon-house"></i>首页</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="car"><i class="el-icon-shopping-cart-2"></i>购物车</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="order"><i class="el-icon-s-order"></i>我的订单</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="loginOut()">退出登录</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="personSet">个人设置</span>
          </div>
        </div>
        <div class="wrap">
          <el-row>
            <el-col :span="5">
              <img src="../../assets/salelogo.jpg" alt="" />
            </el-col>
            <el-col :span="8">
              <el-input placeholder="搜索" v-model="input" class="input">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  class="button"
                  @click="search"
                ></el-button>
              </el-input>
            </el-col>
          </el-row>
        </div>
        <div class="carouselContainer">
          <div class="carousel">
            <el-carousel :interval="2000" height="500px">
              <el-carousel-item v-for="item in imgList" :key="item.id">
                <el-row>
                  <el-col :span="24">
                    <img :src="item.idView" class="carouselImg" />
                  </el-col>
                </el-row>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="hot">
            <el-row class="title">
              销量排行
            </el-row>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="position" label="排名" width="180">
              </el-table-column>
              <el-table-column prop="name" label="名称" width="180"> </el-table-column>
            </el-table>
          </div>
        </div>
        <el-row class="box1">
          <el-col :span="10" :offset="1">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span>烤烟型</span>
              </div>
              <div v-for="item in FlueTobacco" :key="item.id">
                <div class="box">
                  <img :src="showImg(item.img)" @click="detail(item.name)" />
                  <div class="text">{{ item.name }}</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card class="box-card1" shadow="never">
              <div slot="header">
                <span>混合型</span>
              </div>
              <div v-for="item in hybridTobacco" :key="item.id">
                <div class="box">
                  <img :src="showImg(item.img)" @click="detail(item.name)" />
                  <div class="text">{{ item.name }}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="box2">
          <el-col :span="10" :offset="1">
            <el-card class="box-card" shadow="never">
              <div slot="header">
                <span style="color: #ffdd07;">雪茄型</span>
              </div>
              <div v-for="item in cigarList" :key="item.id">
                <div class="box">
                  <img :src="showImg(item.img)" @click="detail(item.name)" />
                  <div class="text">{{ item.name }}</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card class="box-card1" shadow="never">
              <div slot="header">
                <span style="color: #ac45df;">外香型</span>
              </div>
              <div v-for="item in sweetList" :key="item.id">
                <div class="box">
                  <img :src="showImg(item.img)" @click="detail(item.name)" />
                  <div class="text">{{ item.name }}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-scrollbar>
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
      input: '',
      FlueTobacco: [],
      hybridTobacco: [],
      cigarList: [],
      sweetList: [],
      imgList: [
        { id: 0, idView: require('../../assets/add1.jpg') },
        {
          id: 1,
          idView: require('../../assets/add2.jpg'),
        },
        {
          id: 2,
          idView: require('../../assets/add3.jpg'),
        },
        {
          id: 3,
          idView: require('../../assets/add4.jpg'),
        },
        {
          id: 4,
          idView: require('../../assets/add5.jpg'),
        },
      ],
      tableData: [],
    }
  },
  methods: {
    goHome() {
      let newpage = this.$router.resolve({
        name: 'sale',
      })
      window.open(newpage.href, '_blank')
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    order() {
      sessionStorage.setItem('active', 'order')
      let newpage = this.$router.resolve({
        name: 'myOrder',
      })
      window.open(newpage.href, '_blank')
    },
    loginOut() {
      this.$router.replace('/')
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    },
    hotList() {
      axios.post('/api/sale/hotList').then((res) => {
        this.tableData = res.data
      })
    },
    car() {
      let newpage = this.$router.resolve({
        name: 'car',
      })
      window.open(newpage.href, '_blank')
    },
    personSet() {
      this.$router.push('/userSet')
    },
    typeList() {
      axios
        .post('/api/goods/typeList', {
          type: '1',
        })
        .then((res) => {
          this.FlueTobacco = res.data
        })
      axios
        .post('/api/goods/typeList', {
          type: '2',
        })
        .then((res) => {
          this.hybridTobacco = res.data
        })
      axios
        .post('/api/goods/typeList', {
          type: '3',
        })
        .then((res) => {
          this.cigarList = res.data
        })
      axios
        .post('/api/goods/typeList', {
          type: '4',
        })
        .then((res) => {
          this.sweetList = res.data
        })
    },
    search() {
      if (this.input == '') {
        this.$message.error('请输入商品')
      } else {
        this.$router.push({ path: '/search' })
        sessionStorage.setItem('searchName', this.input)
      }
    },
    detail(name) {
      this.$router.push({ path: '/search' })
      sessionStorage.setItem('searchName', name)
    },
  },
  mounted() {
    this.hotList()
    this.typeList()
    let name = sessionStorage.getItem('username')
    axios
      .post('/api/sale/user', {
        name,
      })
      .then((res) => {
        this.userName = res.data[0].nickname
        sessionStorage.setItem('nickname', this.userName)
        if (res.data[0].gender == '女') {
          this.sex = '女士'
        } else {
          this.sex = '先生'
        }
        sessionStorage.setItem('sex', this.sex)
      })
  },
}
</script>

<style lang="less" scoped>
.back {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #f4f4f4;
  .top {
    height: 33px;
    border-bottom: 1px #f0f0f0 solid;
    line-height: 33px;
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
  .wrap {
    background: #fff;
    img {
      width: 100px;
      margin-left: 160px;
    }
    .input {
      margin-top: 30px;
    }
    .icon-mulu1 {
      cursor: pointer;
      font-size: 20px;
      line-height: 100px;
    }
  }
  .carouselContainer {
    width: 87%;
    height: 500px;
    margin-left: 7%;
    .carousel {
      width: 70%;
      float: left;
      .carouselImg {
        height: 500px;
        width: 100%;
      }
    }
    .hot {
      width: 25%;
      height: 480px;
      float: left;
      border: #e1a53c 10px solid;
      .title {
        text-align: center;
        height: 50px;
        line-height: 50px;
        background: #e1a53c;
      }
    }
  }
  .box1,
  .box2 {
    .more {
      float: right;
      padding: 3px 0;
      color: #acacac;
      font-size: 12px;
    }
    .box {
      float: left;
      position: relative;
      left: 10px;
      padding-right: 10px;
      padding-bottom: 30px;
      img {
        width: 170px;
        height: 170px;
        cursor: pointer;
      }
      .text {
        text-align: center;
      }
    }
    .box-card {
      width: 100%;
      margin-top: 10px;
      margin-left: 40px;
      span {
        color: #35b2fb;
      }
    }
    .box-card1 {
      width: 100%;
      margin-left: 50px;
      margin-top: 10px;
      span {
        color: #ff4568;
      }
    }
  }
  .box3 {
    width: 84%;
    margin-left: 7%;
    margin-top: 10px;
    .card {
      height: 150px;
      text-align: center;
      line-height: 110px;
      font-family: Georgia, serif;
      font-size: 23px;
    }
    .card:hover {
      cursor: pointer;
      border: #03b262 1px solid;
    }
  }
}
.row {
  margin-bottom: 20px;
}
</style>
