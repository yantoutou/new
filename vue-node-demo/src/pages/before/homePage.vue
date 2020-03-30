<template>
  <div class="back">
    <el-scrollbar style="height: 80%">
      <div class="main">
        <el-tabs v-model="activeName">
          <el-tab-pane label="所有订单" name="order">
            <el-row>
              <el-col :span="14">
                <el-input class="input" placeholder="请输入订单号进行搜索">
                  <template slot="append">搜索订单</template>
                </el-input>
              </el-col>
              <el-col :span="3" class="searchMore">
                <span @click="more">{{text}}</span>
              </el-col>
            </el-row>
            <el-form label-width="80px" v-if="showMore">
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-form-item label="商品名称">
                    <el-input placeholder="请输入商品名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="订单状态">
                    <el-select placeholder="请选择">
                      <el-option
                        v-for="item in statusList"
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
                <el-col :span="12">
                  <el-form-item label="交易时间">
                    <el-date-picker
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="goods" label="商品" width="200">
                <template slot-scope="scope">
                  <img :src="showImg(scope.row.goodsImg)" class="goodsImg" />
                  <div>{{ scope.row.goodsName }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="订单号" width="150">
              </el-table-column>
              <el-table-column prop="money" label="价格" width="150"> </el-table-column>
              <el-table-column prop="time" label="日期" width="150"> </el-table-column>
              <el-table-column prop="label" label="交易状态" width="150">
              </el-table-column>
              <el-table-column prop="evaluation" label="评价">
                <template>
                  <el-button type="success" plain>评价</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="complete">配置管理</el-tab-pane>
          <el-tab-pane label="进行中" name="ongoing">角色管理</el-tab-pane>
          <el-tab-pane label="已退货" name="returnGoods">定时任务补偿</el-tab-pane>
          <el-tab-pane label="待发货" name="send">定时任务补偿</el-tab-pane>
          <el-tab-pane label="待退货" name="refund">定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeName: 'order',
      tableData: [],
      statusList: [],
      showMore: false,
      showText: {
        more: '高级搜索',
        nomore: '收起'
      },
      text: ''
    }
  },
  methods: {
    getList() {
      let name = sessionStorage.getItem('username')
      axios
        .post('/api/user/selectUser', {
          name,
          identity: 'user'
        })
        .then(res => {
          axios
            .post('/api/order/selectOrder', {
              id: res.data[0].id
            })
            .then(res => {
              this.tableData = res.data
            })
        })
      axios.post('/api/order/statusList').then(res => {
        this.statusList = res.data
      })
    },
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    more() {
      if (this.showMore == true) {
        this.showMore = false
        this.text = this.showText.more
      } else {
        this.showMore = true
        this.text = this.showText.nomore
      }
    }
  },
  mounted() {
    this.getList()
    this.text = this.showText.more
  }
}
</script>

<style lang="less" scoped>
.back {
  width: 73%;
  height: 100%;
  position: fixed;
  top: 138px;
  left: 18%;
  .main {
    width: 85%;
    height: 100%;
    .searchMore {
      font-size: 12px;
      line-height: 50px;
      margin-left: 15px;
      color: #02a8f3;
      cursor: pointer;
    }
    .input {
      cursor: pointer;
    }
    .goodsImg {
      width: 100px;
      cursor: pointer;
    }
  }
}
</style>
