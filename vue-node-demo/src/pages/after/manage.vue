<template>
  <div class="back">
    <div class="top">
      <h1>烟草专卖后台管理系统</h1>
      <el-dropdown class="dropdown">
        <span>
          {{userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item>个人设置-修改头像</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="content">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      userName: ''
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    let name = sessionStorage.getItem("username")
    axios.post('/api/user/selectUser', {
      name
    }).then(res => {
      this.userName = res.data[0].name
    }).catch(err => {
      console.log(err)
    })
  }
};
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
    width: 10%;
  }
}
</style>