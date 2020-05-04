<template>
  <div class="back">
    <div class="top">
      <div class="left">
        <span>欢迎您，{{ userName }}{{ sex }}</span>
        <el-divider direction="vertical"></el-divider>
        <span class="shou" @click="out">退出</span>
        <el-divider direction="vertical"></el-divider>
        <span class="shou" @click="home">首页</span>
      </div>
    </div>
    <div class="nav">
      <el-row class="navRow">
        <el-col :span="4" :offset="2">
          <span class="order">购物车</span>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <div class="right">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="img" label="商品图片" width="180">
            <template slot-scope="scope">
              <img :src="showImg(scope.row.img)" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="180"> </el-table-column>
          <el-table-column prop="describe1" label="商品信息" width="180">
          </el-table-column>
          <el-table-column prop="money" label="价格" width="180"> </el-table-column>
          <el-table-column prop="count" label="数量">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.count"
                :min="1"
                :max="10"
                label="请选择数量"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="结算">
            <template slot-scope="scope">
              <el-button type="danger" @click="settlement(scope.row)">结算</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="填写信息"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="填写地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  inject: ['reload'],
  data() {
    var phone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号'))
      } else {
        var reg = /^1[3456789]\d{9}$/
        if (!reg.test(this.form.phone)) {
          callback(new Error('请输入有效的手机号码'))
        } else {
          callback()
        }
      }
    }
    return {
      userName: '',
      sex: '',
      tableData: [],
      dialogVisible: false,
      money: '',
      img: '',
      userId: '',
      id: '',
      name: '',
      form: {
        address: '',
        phone: '',
      },
      rules: {
        address: [{ required: true, message: '请填写地址', trigger: 'change' }],
        phone: [{ required: true, validator: phone, trigger: 'change' }],
      },
    }
  },
  methods: {
    out() {
      this.$router.replace('/')
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function() {
        history.pushState(null, null, document.URL)
      })
    },
    home() {
      let newpage = this.$router.resolve({
        name: 'sale',
      })
      window.open(newpage.href, '_self')
      document.title = 'yantoutou'
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    settlement(row) {
      this.dialogVisible = true
      this.money = row.count * row.money
      this.img = row.img
      this.name = row.name
      this.id = row.id
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios
                .post('/api/order/addOrder', {
                  img: this.img,
                  name: this.name,
                  number: moment().valueOf(),
                  money: this.money,
                  time: moment().format('YYYY-MM-DD HH:mm:ss'),
                  status: 5,
                  label: '未审核',
                  userId: this.userId,
                  address: this.form.address,
                  phone: this.form.phone,
                  id: this.id
                })
                .then(() => {
                  this.dialogVisible = false
                  this.reload()
                  this.$message.success('购买成功')
                })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.dialogVisible = false
    },
    getList() {
      let name = sessionStorage.getItem('username')
      axios
        .post('/api/goods/carList', {
          username: name,
        })
        .then((res) => {
          this.tableData = res.data
        })
    },
  },
  mounted() {
    this.getList()
    let name = sessionStorage.getItem('username')
    axios
      .post('/api/set/getMessage', {
        name,
      })
      .then((res) => {
        this.userId = res.data[0].id
        this.userName = res.data[0].nickname
        if (res.data[0].gender == '女') {
          this.sex = '女士'
        } else {
          this.sex = '先生'
        }
      })
    document.title = '购物车'
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
  .top {
    height: 33px;
    border-bottom: 1px #f0f0f0 solid;
    line-height: 33px;
    .left {
      float: left;
      font-size: 12px;
      color: #999;
      margin-left: 35px;
      .shou {
        cursor: pointer;
      }
    }
  }
  .nav {
    width: 100%;
    height: 80px;
    background: #03b262;
    line-height: 80px;
    .order {
      font-size: 40px;
      color: #fff;
      line-height: 80px;
      font-family: Georgia, serif;
      cursor: pointer;
    }
    .menu {
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      .icon {
        margin-top: 75px;
        float: right;
        font-size: 10px;
        margin-right: 33px;
      }
    }
    i {
      position: relative;
      bottom: 40px;
      font-size: 30px;
      color: #fff;
    }
  }
  .main {
    width: 90%;
    height: 100%;
    margin-left: 5%;
    .right {
      width: 90%;
      height: 100%;
      margin-left: 10%;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
