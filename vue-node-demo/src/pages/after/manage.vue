<template>
  <div class="back">
    <el-scrollbar style="height: 100%">
      <el-container>
        <el-header>
          <div class="top">
            <h1>烟草专卖后台管理系统</h1>
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
                <el-dropdown-item
                  ><i class="el-icon-setting"></i>个人设置</el-dropdown-item
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
                <el-menu-item index="/manage/goods">
                  <i class="iconfont icon-shangpinguanli"></i>
                  <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="iconfont icon-liuyan"></i>
                  <span slot="title">留言管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="iconfont icon-gonggao"></i>
                  <span slot="title">公告管理</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="iconfont icon-zhanghao"></i>
                  <span slot="title">账号管理</span>
                </el-menu-item>
                <el-menu-item index="/manage/manual">
                  <i class="el-icon-s-management"></i>
                  <span slot="title">使用手册</span>
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
      active: ''
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
    loginOut() {
      this.$router.replace('/')
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
