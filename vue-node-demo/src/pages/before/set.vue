<template>
  <div class="back">
    <el-page-header @back="goBack" content="个人设置" class="pageHeader">
    </el-page-header>
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <div class="button">
          <el-link icon="el-icon-edit" type="primary" @click="edit">编辑</el-link>
        </div>
      </div>
      <el-form :model="form" ref="form" label-width="100px" :rules="rules" :hide-required-asterisk="true">
        <el-row>
          <el-col :span="5">
            <el-form-item label="昵称：" prop="nickname">
              <el-input v-model="form.nickname" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="性别：" prop="value">
              <el-select v-model="form.value" placeholder="请选择" :disabled="isShow" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="密码：" prop="password">
              <el-input
                v-model="form.password"
                :disabled="isShow"
                show-password
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="savebtn">
        <el-col :offset="10" :span="2">
          <el-button type="success" round @click="save">保存</el-button>
        </el-col>
        <el-col :span="1">
          <el-button type="warning" round @click='reset'>重置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        nickname: '',
        value: '',
        password: ''
      },
      forwardForm: {
        nickname: '',
        sex: '',
        password: ''
      },
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      isShow: true,
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'change' }],
        value: [{ required: true, message: '请选择性别', trigger: 'change' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    edit() {
      this.isShow = false
    },
    save() {
      let name = sessionStorage.getItem('username')
      if (this.isShow == true) {
        this.$message.error('当前信息未编辑')
      } else {
        if (
          this.forwardForm.nickname == this.form.nickname &&
          this.forwardForm.sex == this.form.value &&
          this.forwardForm.password == this.form.password
        ) {
          this.$message.warning('信息未修改！')
        } else {
          this.$refs.form.validate(valid => {
            if (valid) {
              axios
                .post('/api/set/editMessage', {
                  nickname: this.form.nickname,
                  sex: this.form.value,
                  password: this.form.password,
                  name
                })
                .then(() => {
                  this.$message.success('修改成功！')
                  this.isShow = true
                  this.reload()
                })
            } else {
              return false
            }
          })
        }
      }
    },
    reset() {
      if (this.isShow == true) {
        this.$message.error('当前信息未编辑')
      } else {
        this.$refs.form.resetFields();
      }
    }
  },
  mounted() {
    let name = sessionStorage.getItem('username')
    axios
      .post('/api/set/getMessage', {
        name
      })
      .then(res => {
        this.form.nickname = res.data[0].nickname
        this.forwardForm.nickname = res.data[0].nickname
        if (res.data[0].gender == '男') {
          this.form.value = '1'
          this.forwardForm.sex = '1'
        } else {
          this.form.value = '2'
          this.forwardForm.sex = '2'
        }
        this.form.password = res.data[0].password
        this.forwardForm.password = res.data[0].password
      })
  }
}
</script>

<style lang="less" scoped>
.back {
  background: #fafafa;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .pageHeader {
    margin-top: 15px;
  }
  .card {
    margin: 80px 80px 0;
    .button {
      float: right;
      margin-right: 20px;
    }
    .savebtn {
      margin-top: 70px;
    }
  }
}
</style>
