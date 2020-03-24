<template>
  <div class="back">
    <el-page-header @back="goBack" content="个人设置" class="pageHeader">
    </el-page-header>
    <el-card class="card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
        <div class="button">
          <el-link icon="el-icon-edit" type="primary">编辑</el-link>
        </div>
      </div>
      <el-form :model="form" ref="form" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="昵称：" prop="nickname">
              <el-input v-model="form.nickname" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="性别：" prop="sex">
              <el-input v-model="form.sex" :disabled="isShow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="密码：" prop="password">
              <el-input v-model="form.password" :disabled="isShow" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        nickname: '',
        sex: '',
        password: ''
      },
      isShow: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
      let name = sessionStorage.getItem('username')
      axios.post('/api/set/getMessage', {
          name
      }).then(res => {
          this.form.nickname = res.data[0].nickname
          this.form.sex = res.data[0].gender
          this.form.password = res.data[0].password
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
  }
}
</style>
