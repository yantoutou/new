<template>
  <div class="background">
    <h1>烟草专卖管理系统</h1>
    <div class="login">
      <i class="el-icon-s-custom login-icon"></i>
      <el-form :model="form" :rules="rules" ref="form">
        <el-row>
          <el-col :offset="10">
            <el-form-item prop="identity">
              <el-select
                v-model="form.identity"
                placeholder="身份"
                class="login-select"
                clearable
                @change="change"
              >
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
        <el-row v-if="showN">
          <el-col :offset="10">
            <el-form-item prop="gender">
              <el-select
                v-model="form.gender"
                placeholder="性别"
                class="login-select"
                clearable
              >
                <el-option
                  v-for="item in genderSelect"
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
                v-model="form.userName"
                class="login-input"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="showN">
          <el-col :span="5" :offset="10">
            <el-form-item prop="nickName">
              <el-input
                placeholder="昵称"
                prefix-icon="el-icon-edit"
                v-model="form.nickName"
                class="login-input"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5" :offset="10">
            <el-form-item prop="passWord1">
              <el-input
                placeholder="密码"
                prefix-icon="el-icon-key"
                v-model="form.passWord1"
                class="login-input"
                show-password
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="showR">
          <el-col :span="5" :offset="10">
            <el-form-item prop="passWord2">
              <el-input
                placeholder="确认密码"
                prefix-icon="el-icon-unlock"
                v-model="form.passWord2"
                class="login-input"
                show-password
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row v-if="showL">
        <el-col :offset="10">
          <el-button @click="login" type="success" class="login-button">登录</el-button>
        </el-col>
      </el-row>
      <div v-if="showR">
        <el-button type="warning" class="registered-button" @click="registered"
          >注册</el-button
        >
        <el-button type="info" class="cancel-button" @click="cancel">取消</el-button>
      </div>
      <div class="registered" v-if="showL">
        <span>没有账号？</span>
        <span class="zhuce" @click="showRegistered">点击注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    // 用户名验证
    var userName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      }
      axios
        .post('/api/user/selectUser', {
          name: this.form.userName,
          identity: this.form.identity
        })
        .then(res => {
          if (this.showR == true) {
            if (res.data.length != 0) {
              callback(new Error('用户名重复'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    return {
      form: {
        userName: '', // 用户名
        passWord1: '', // 密码
        identity: '', // 身份
        nickName: '', // 昵称
        passWord2: '', // 确认密码
        gender: ''
      },
      showR: false, // 注册
      showL: true, // 登录
      showN: false, // 昵称
      userIdentity: [
        {
          value: 'user',
          label: '普通用户'
        },
        {
          value: 'admin',
          label: '管理员'
        }
      ],
      genderSelect: [
        {
          value: 'b',
          label: '男'
        },
        {
          value: 'g',
          label: '女'
        }
      ],
      rules: {
        identity: [{ required: true, message: '请选择身份', trigger: 'change' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        userName: [{ validator: userName, trigger: 'change' }],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'change' }],
        passWord1: [{ required: true, message: '请输入密码', trigger: 'change' }],
        passWord2: [{ required: true, message: '请再次输入密码', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let name = this.form.userName
          let password = this.form.passWord1
          let identity = this.form.identity
          axios
            .post('/api/user/login', {
              name,
              password,
              identity
            })
            .then(res => {
              if (res.data.code == 1) {
                if (res.data.identity == 'user') {
                  sessionStorage.setItem('token', 'true')
                  sessionStorage.setItem('username', name)
                  this.$router.replace({ path: '/sale' })
                } else {
                  sessionStorage.setItem('token', 'true')
                  sessionStorage.setItem('username', name)
                  this.$router.replace({ path: '/manage' })
                }
              } else {
                this.$message.error('身份有误或用户名密码错误')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    showRegistered() {
      this.showR = true
      this.showN = true
      this.showL = false
      this.$refs.form.resetFields()
      this.reset()
    },
    // 注册
    registered() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let identity = this.form.identity
          let name = this.form.userName
          let nickName = this.form.nickName
          let password1 = this.form.passWord1
          let password2 = this.form.passWord2
          let gender = this.form.gender
          axios
            .post('/api/user/registered', {
              identity,
              name,
              nickName,
              password1,
              password2,
              gender
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$message.error(res.data.msg)
              } else {
                if (res.data.identity == 'user') {
                  sessionStorage.setItem('token', 'true')
                  sessionStorage.setItem('username', name)
                  this.$router.replace({ path: '/sale' })
                } else {
                  sessionStorage.setItem('token', 'true')
                  this.$router.replace({ path: '/manage/order' })
                }
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          return false
        }
      })
    },
    // 取消按钮
    cancel() {
      this.showL = true
      this.showR = false
      this.showN = false
      this.$refs.form.resetFields()
      this.reset()
    },
    // 重置
    reset() {
      this.form.identity = ''
      this.form.userName = ''
      this.password1 = ''
      this.passWord2 = ''
      this.nickName = ''
    },
    // 下拉框更改时
    change() {
      if (this.showR == true && this.form.identity == 'admin') {
        this.showN = false
      } else if (this.showR == false) {
        this.showN = false
      } else {
        this.showN = true
      }
    }
  }
}
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
  background: url('../assets/background.png');
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
    bottom: -15%;
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
    .registered-button {
      margin: 0 10% 0 42%;
    }
    .cancel-button {
      margin: 0 1% 0 -4.5%;
    }
  }
}
</style>
