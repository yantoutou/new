<template>
  <div class="back">
    <el-scrollbar style="height: 80%">
      <div class="main">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="所有订单" name="order">
            <Order></Order>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="complete">
            <Complete></Complete>
          </el-tab-pane>
          <el-tab-pane label="进行中" name="ongoing">
            <Ongoing></Ongoing>
          </el-tab-pane>
          <el-tab-pane label="已退货" name="returnGoods">
            <Return></Return>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="send">
            <Send></Send>
          </el-tab-pane>
          <el-tab-pane label="待退货" name="refund">
            <Refund></Refund>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import Order from './allOrders'
import Complete from './complete'
import Ongoing from './ongoing'
import Return from './returnGoods'
import Send from './send'
import Refund from './refund'
export default {
  data() {
    return {
      activeName: 'order'
    }
  },
  components: { Order, Complete, Ongoing, Return, Send, Refund },
  methods: {
    tabClick(tab) {
      let name = tab.name
      sessionStorage.setItem('active', name)
    }
  },
  mounted() {
    let active = sessionStorage.getItem('active')
    this.activeName = active
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
  }
}
</style>
