<template>
  <div class="container">
    <div class="top">
      <div class="content">
        <span>后台管理</span>
        <el-divider direction="vertical"></el-divider>
        <span>设置</span>
      </div>
    </div>
    <div class="main">
      <el-row class="main-top">
        <el-col :span="2">
          <i class="el-icon-picture" style="font-size: 25px"></i>
        </el-col>
        <el-col :span="5">
          <span>头像管理</span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="7">
          <img :src="showImg(img)" v-if="img" class="img" />
        </el-col>
        <el-col :span="17">
          <el-upload
            action="#"
            :auto-upload="false"
            :limit="1"
            ref="upload"
            :on-exceed="onExceed"
          >
            <div slot="tip" class="el-upload__tip">
              只能上传一张jpg/png文件，且不超过500kb
            </div>
            <el-button type="text">点击更换头像</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row style="float: right">
        <el-button type="success" size="mini" @click="save">保存</el-button>
      </el-row>

      <el-row class="main-top">
        <el-col :span="2">
          <i class="el-icon-unlock" style="font-size: 25px"></i>
        </el-col>
        <el-col :span="5">
          <span>密码管理</span>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="旧密码" prop="prePassword">
          <el-input v-model="form.prePassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop='newPassword'>
          <el-input v-model="form.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop='confirmNew'>
          <el-input v-model="form.confirmNew" show-password></el-input>
        </el-form-item>
      </el-form>
      <div style="float: right">
        <el-button type="success" size="mini" @click="savePassword">保存</el-button>
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
      img: '',
      userName: '',
      form: {
        prePassword: '',
        newPassword: '',
        confirmNew: ''
      },
      rules: {
        prePassword: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'change' }],
        confirmNew: [{ required: true, message: '请确认新密码', trigger: 'change' }]
      }
    }
  },
  methods: {
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    onExceed() {
      this.$message.warning('当前限制选择1个文件')
    },
    save() {
      if (!this.$refs.upload.uploadFiles[0]) {
        this.$message.warning('请选择要上传的图片')
      } else {
        if (
          this.$refs.upload.uploadFiles[0].raw.type == 'image/jpeg' ||
          this.$refs.upload.uploadFiles[0].raw.type == 'image/png'
        ) {
          let size = this.$refs.upload.uploadFiles[0].size / 1024
          if (size > 500) {
            this.$message.error('请选择500kb以内的图片')
          } else {
            const formData = new FormData()
            const file = this.$refs.upload.uploadFiles[0]
            const headerConfig = {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
            formData.append('file', file.raw)
            axios.post('/api/set/upload', formData, headerConfig).then(() => {
              this.$message.success('修改成功')
            })
          }
        } else {
          this.$message.warning('只能上传jpg/png格式的图片')
        }
      }
    },
    savePassword() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let userName = sessionStorage.getItem('username')
          axios.post('/api/set/editPassword', {
            pre: this.form.prePassword,
            new: this.form.newPassword,
            confirm: this.form.confirmNew,
            userName
          }).then(res => {
            if (res.data.code != 0) {
              this.$message.error(res.data.msg)
            } else {
              this.$message.success(res.data.msg)
              this.reload()
            }
          })
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    document.title = '个人设置'
    let userName = sessionStorage.getItem('username')
    axios
      .post('/api/set/userMsg', {
        userName
      })
      .then(res => {
        this.img = res.data[0].img
        this.userName = res.data[0].name
      })
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #f4f3f8;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .top {
    background: #fff;
    width: 100%;
    height: 60px;
    line-height: 60px;
    .content {
      margin-left: 20%;
      span:first-child {
        font-size: 20px;
        color: #02a8f3;
      }
    }
  }
  .main {
    width: 30%;
    height: 100%;
    position: absolute;
    left: 35%;
    .main-top {
      margin-top: 50px;
    }
    .img {
      width: 100px;
      height: 100px;
    }
    .change-img {
      color: #02a8f3;
      cursor: pointer;
      margin-left: 4%;
    }
  }
}
</style>
