<template>
  <div class="back">
    <el-scrollbar style="height: 100%">
      <el-container>
        <el-header>
          <div class="top">
            <h1>烟草专卖后台管理系统</h1>
            <img :src="showImg(head)" class="head" />
            <el-dropdown class="dropdown" placement="top-start">
              <span>
                {{ userName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a @click="loginOut">
                    <i class="el-icon-switch-button"></i>
                    退出登录
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a @click="set"
                    ><i class="el-icon-setting"></i>个人设置</a
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <div class="content">
              <el-menu
                :default-active="active"
                background-color="#3a3e51"
                text-color="#b5b6bd"
                @select="selectMenu"
              >
                <el-menu-item index="/manage/work">
                  <i class="iconfont icon-danzi"></i>
                  <span slot="title">工作台</span>
                </el-menu-item>
                <el-menu-item index="/manage/order">
                  <i class="iconfont icon-icon-test"></i>
                  <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item index="/manage/return">
                  <i class="el-icon-truck"></i>
                  <span slot="title">退货管理</span>
                </el-menu-item>
                <el-menu-item index="/manage/goods">
                  <i class="iconfont icon-shangpinguanli"></i>
                  <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/manage/message">
                  <i class="iconfont icon-liuyan"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <!-- <el-menu-item index="5">
                  <i class="iconfont icon-gonggao"></i>
                  <span slot="title">公告管理</span>
                </el-menu-item> -->
                <el-menu-item index="/manage/log">
                  <i class="el-icon-s-management"></i>
                  <span slot="title">日志中心</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userName: '',
      active: '',
      head: ''
    }
  },
  watch: {
    $route(to) {
      this.active = to.path
    }
  },
  methods: {
    selectMenu(key) {
      this.$router.push(key)
      this.active = key
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    loginOut() {
      this.$router.replace('/')
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    },
    set() {
      let newpage = this.$router.resolve({
        name: 'set'
      })
      window.open(newpage.href, '_blank')
    }
  },
  mounted() {
    this.active = this.$route.path
    let name = sessionStorage.getItem('username')
    axios
      .post('/api/user/selectUser', {
        name
      })
      .then(res => {
        this.userName = res.data[0].name
        this.head = res.data[0].img
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
.back {
  background: #f4f3f8;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .top {
    background: #02a8f3;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 68px;
    display: flex;
    z-index: 100;
    .head {
      position: relative;
      top: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }
    h1 {
      width: 88%;
      line-height: 68px;
      padding-left: 10px;
      color: #fff;
      margin: 0;
    }
    .dropdown {
      cursor: pointer;
      position: relative;
      top: 24px;
      left: 20px;
      height: 32px;
      color: #fff;
    }
  }
  .content {
    position: absolute;
    top: 68px;
    left: 0;
    width: 13%;
    height: 100%;
    background: #3a3e51;
    i {
      margin-right: 5px;
    }
    .el-menu {
      border-color: #3a3e51;
    }
  }
}
</style>
