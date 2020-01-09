<template>
  <div class="background">
    <h1>烟草专卖管理系统</h1>
    <div class="login">
      <i class="el-icon-s-custom login-icon"></i>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-row>
          <el-col :offset="10">
            <el-form-item prop="identity">
              <el-select v-model="loginForm.identity" placeholder="身份" class="login-select" clearable>
                <el-option
                  v-for="item in userIdentity"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" :offset="10">
            <el-form-item prop="userName">
              <el-input
                placeholder="用户名"
                prefix-icon="el-icon-user"
                v-model="loginForm.userName"
                class="login-input"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5" :offset="10">
            <el-form-item prop="passWord">
              <el-input
                placeholder="密码"
                prefix-icon="el-icon-key"
                v-model="loginForm.passWord"
                class="login-input"
                show-password
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :offset="10">
          <el-button @click="login" type="success" class="login-button">登录</el-button>
        </el-col>
      </el-row>
      <div class="registered">
        <span>没有账号？</span>
        <span class="zhuce">点击注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginForm: {
        userName: "", // 用户名
        passWord: "", // 密码
        identity: "" // 身份
      },
      userIdentity: [
        {
          value: "user",
          label: "普通用户"
        },
        {
          value: "admin",
          label: "管理员"
        }
      ],
      rules: {
        identity: [
          { required: true, message: "请选择身份", trigger: "change" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let name = this.loginForm.userName;
          let password = this.loginForm.passWord;
          let identity = this.loginForm.identity;
          axios
            .post("/api/user/login", {
              name,
              password,
              identity
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$router.push({ path: "/about" });
              } else {
                this.$message.error("身份有误或用户名密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: url("../assets/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  h1 {
    color: #fff;
    text-align: center;
    letter-spacing: 10px;
    font-size: 38px;
  }
  .login {
    position: relative;
    bottom: -20%;
    .login-button {
      width: 17.2%;
    }
    .login-input {
      width: 82%;
    }
    .login-select {
      width: 17%;
    }
    .registered {
      font-size: 13px;
      top: 7px;
      position: relative;
      left: 52%;
    }
    .zhuce {
      color: #915224;
      cursor: pointer;
    }
    .login-icon {
      color: #fff;
      margin: 3% 48%;
      font-size: 30px;
    }
  }
}
</style>