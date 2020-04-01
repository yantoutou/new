<template>
  <div class="back">
    <el-scrollbar style="height: 80%">
      <div class="main">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="所有订单" name="order">
            <router-view></router-view>
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
export default {
  data() {
    return {
      activeName: 'order'
    }
  },
  methods: {
    tabClick(tab) {
      let name = tab.name
      this.$router.push({ path: `/myOrder/homePage/${name}` })
    },
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
