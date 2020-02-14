<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="left">
            <span>120</span>
            <p>Return of the order</p>
          </div>
          <div class="right">
            <i class="iconfont icon-tuihuo"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card"> </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card"> </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card"> </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.card {
  width: 265px;
  height: 108px;
  margin-top: 10px;
  .left {
    float: left;
    span {
      color: #40c9c6;
      font-size: 20px;
      font-weight: 700;
    }
    p {
      color: #666;
    }
  }
  .right {
      float: right;
      .icon-tuihuo {
          font-size: 55px;
          color: #f4516c;
      }
  }
}
</style>
