<template>
  <div class="back">
    <div class="top">
      <div class="left">您好，{{ userName }}{{ sex }}</div>
      <div class="right">
        <span class="home" @click="goHome"><i class="el-icon-house"></i>首页</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="car"><i class="el-icon-shopping-cart-2"></i>购物车</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="order"><i class="el-icon-s-order"></i>我的订单</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="loginOut">退出登录</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="personSet">个人设置</span>
      </div>
    </div>
    <div class="nav">
      <el-row class="navRow">
        <el-col :span="4" :offset="2">
          <span class="order">商品详情</span>
        </el-col>
      </el-row>
    </div>
    <div class="detail">
      <div class="navi">当前位置：香烟销售网 > 香烟详情 > {{ detail.name }}</div>
      <el-divider></el-divider>
    </div>
    <div class="goods">
      <div class="des">
        {{ detail.describe1 }}
      </div>
      <div>
        <img :src="showImg(detail.img)" alt="" />
        <div class="deta">
          <div>
            <span class="text">类型：</span>
            <span>{{ type }}</span>
          </div>
          <div>
            <span class="text">单盒价格：</span>
            <span style="color: red">￥{{ detail.money }}</span>
          </div>
          <div>
            <span class="text">折扣：</span>
            <span>{{ discount }}</span>
          </div>
          <div>
            <span class="text">新品：</span>
            <span>{{ new1 }}</span>
          </div>
          <div>
            <span class="text">已卖：</span>
            <span>{{ detail.count }}件</span>
          </div>
          <div>
            <span class="text">销售形式：</span>
            <span>国产内销</span>
          </div>
          <div>
            <span class="text">产品状态：</span>
            <span>已上市</span>
          </div>
          <div>
            <span class="text">数量：</span>
            <span
              ><el-input-number
                v-model="num"
                :min="1"
                :max="10"
                label="请选择数量"
              ></el-input-number
            ></span>
            <span class="inven">库存{{ detail.inventory }}件</span>
          </div>
          <div class="button">
            <el-row>
              <el-col :span="3">
                <el-button type="danger" plain @click="buy">立即购买</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="danger" @click="addCar">加入购物车</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
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
      detail: [],
      type: '',
      new1: '',
      discount: '',
      num: '',
      dialogVisible: false,
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
    goHome() {
      let newpage = this.$router.resolve({
        name: 'sale',
      })
      window.open(newpage.href, '_self')
    },
    car() {
      let newpage = this.$router.resolve({
        name: 'car',
      })
      window.open(newpage.href, '_blank')
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    order() {
      sessionStorage.setItem('active', 'order')
      let newpage = this.$router.resolve({
        name: 'myOrder',
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
    personSet() {
      this.$router.push('/userSet')
    },
    addCar() {
      let username = sessionStorage.getItem('username')
      axios
        .post('/api/goods/addCar', {
          img: this.detail.img,
          name: this.detail.name,
          describe1: this.detail.describe1,
          money: this.detail.money,
          count: this.num,
          username,
        })
        .then(() => {
          this.$message.success('购物车添加成功')
        })
    },
    buy() {
      this.dialogVisible = true
    },
    cancel() {
      this.dialogVisible = false
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let name = sessionStorage.getItem('username')
          axios
            .post('/api/set/getMessage', {
              name,
            })
            .then((res) => {
              axios
                .post('/api/order/addOrder', {
                  img: this.detail.img,
                  name: this.detail.name,
                  number: moment().valueOf(),
                  money: this.detail.money,
                  time: moment().format('YYYY-MM-DD HH:mm:ss'),
                  status: 5,
                  label: '未审核',
                  userId: res.data[0].id,
                  address: this.form.address,
                  phone: this.form.phone,
                  id: this.detail.id,
                })
                .then(() => {
                  this.dialogVisible = false
                  this.$message.success('购买成功')
                  this.$router.push('/myOrder')
                })
            })
        } else {
          return false
        }
      })
    },
  },
  mounted() {
    this.userName = sessionStorage.getItem('nickname')
    this.sex = sessionStorage.getItem('sex')
    axios.post('/api/goods/goodsDetail').then((res) => {
      this.detail = res.data[0]
      if (res.data[0].type == '1') {
        this.type = '烤烟型'
      } else if (res.data[0].type == '2') {
        this.type = '混合型'
      } else if (res.data[0].type == '3') {
        this.type = '雪茄型'
      } else {
        this.type = '外香型'
      }
      if (res.data[0].discount == '0') {
        this.discount = '无'
      } else {
        this.discount = '有'
      }
      if (res.data[0].new == '0') {
        this.new1 = '无'
      } else {
        this.new1 = '有'
      }
    })
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
    background: #f4f4f4;
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
  }
  .detail {
    width: 80%;
    height: 10%;
    margin: 0 auto;
    .navi {
      position: relative;
      right: 215px;
      top: 10px;
    }
  }
  .goods {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    .des {
      font-size: 20px;
      position: relative;
      left: 500px;
    }
    img {
      width: 462px;
      height: 315px;
      margin-top: 40px;
      border: 1px red solid;
      float: left;
    }
    .deta {
      line-height: 30px;
      position: relative;
      top: 40px;
      left: 37px;
      .text {
        color: #6b6666;
      }
      .inven {
        font-size: 10px;
        margin-left: 20px;
        color: #6b6666;
      }
    }
    .button {
      margin-top: 20px;
    }
  }
}
</style>
