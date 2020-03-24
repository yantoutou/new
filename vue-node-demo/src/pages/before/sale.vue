<template>
  <div>
    <div class="back">
      <el-scrollbar style="height: 100%">
        <div class="top">
          <div class="left">您好，{{ userName }}{{ sex }}</div>
          <div class="right">
            <span class="home" @click="goHome()"><i class="el-icon-house"></i>首页</span>
            <el-divider direction="vertical"></el-divider>
            <span><i class="el-icon-shopping-cart-2"></i>购物车</span>
            <el-divider direction="vertical"></el-divider>
            <span><i class="el-icon-s-order"></i>我的订单</span>
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
            <el-col :span="3">
              <el-tooltip effect="light" placement="bottom-start">
                <div slot="content">
                  <div class="content">
                    <div class="content1">
                      <el-row class="row">
                        原料分类
                      </el-row>
                      <el-row :gutter="20" class="row">
                        <el-col :span="12">
                          烤烟型
                        </el-col>
                        <el-col :span="12">
                          混合型
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          香料型
                        </el-col>
                        <el-col :span="12">
                          晒烟型
                        </el-col>
                      </el-row>
                    </div>
                    <div class="content2">
                      <el-row class="row">
                        香味分类
                      </el-row>
                      <el-row :gutter="20" class="row">
                        <el-col :span="12">
                          烤烟型
                        </el-col>
                        <el-col :span="12">
                          混合型
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          雪茄型
                        </el-col>
                        <el-col :span="12">
                          外香型
                        </el-col>
                      </el-row>
                    </div>
                    <div class="content3">
                      <el-row class="row">
                        品牌推荐
                      </el-row>
                      <el-row :gutter="20" class="row">
                        <el-col :span="8">
                          宝岛
                        </el-col>
                        <el-col :span="8">
                          牡丹
                        </el-col>
                        <el-col :span="8">
                          古田
                        </el-col>
                      </el-row>
                      <el-row :gutter="20" class="row">
                        <el-col :span="8">
                          红河
                        </el-col>
                        <el-col :span="8">
                          黄鹤楼
                        </el-col>
                        <el-col :span="8">
                          将军
                        </el-col>
                      </el-row>
                      <el-row :gutter="20" class="row">
                        <el-col :span="8">
                          苏烟
                        </el-col>
                        <el-col :span="8">
                          七匹狼
                        </el-col>
                        <el-col :span="8">
                          双喜
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="8">
                          东方红
                        </el-col>
                        <el-col :span="8">
                          灵芝
                        </el-col>
                        <el-col :span="8">
                          红豆
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
                <i class="iconfont icon-mulu1">目录</i>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="搜索" v-model="input" class="input">
                <el-button slot="append" icon="el-icon-search" class="button"></el-button>
              </el-input>
            </el-col>
            <el-col :span="1">
              <i class="el-icon-service server"></i>
            </el-col>
            <el-col :span="1" class="message">
              <el-badge :value="12">
                <i class="el-icon-message-solid"></i>
              </el-badge>
            </el-col>
          </el-row>
        </div>
        <div class="carouselContainer">
          <div class="carousel">
            <el-carousel :interval="5000" height="500px">
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
      imgList: [
        { id: 0, idView: require('../../assets/add1.jpg') },
        {
          id: 1,
          idView: require('../../assets/add2.jpg')
        },
        {
          id: 2,
          idView: require('../../assets/add3.jpg')
        },
        {
          id: 3,
          idView: require('../../assets/add4.jpg')
        },
        {
          id: 4,
          idView: require('../../assets/add5.jpg')
        }
      ],
      tableData: []
    }
  },
  methods: {
    goHome() {
      let newpage = this.$router.resolve({
        name: 'sale'
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
      axios.post('/api/sale/hotList').then(res => {
        this.tableData = res.data
      })
    },
    personSet() {
      this.$router.push('/userSet')
    }
  },
  mounted() {
    this.hotList()
    let name = sessionStorage.getItem('username')
    axios
      .post('/api/sale/user', {
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
    margin-top: 25px;
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
    .server {
      line-height: 100px;
      font-size: 30px;
      margin-left: 20px;
      cursor: pointer;
      color: #03b262;
    }
    .message {
      font-size: 30px;
      margin-top: 24px;
      color: #03b262;
      cursor: pointer;
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
}
.row {
  margin-bottom: 20px;
}
.content {
  display: flex;
  width: 700px;
  .content1,
  .content2 {
    flex: 1;
    margin-right: 50px;
    border-right: #000 1px solid;
    padding-right: 50px;
  }
  .content3 {
    flex: 1;
  }
}
</style>
