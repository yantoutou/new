<template>
  <div>
    <el-tabs v-model="card">
      <el-tab-pane label="订单管理" name="first">
        <el-card>
          <div slot="header">
            <span>订单管理</span>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input placeholder="请输入订单号" v-model="number" clearable></el-input>
              </el-col>
              <el-col :span="5">
                <el-select v-model="status" placeholder="请选择订单状态">
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              </el-col>
            </el-row>
            <el-table style="width: 100%" :data="tableData">
              <el-table-column prop="time" label="下单时间" width="180" :formatter="formatter"></el-table-column>
              <el-table-column prop="address" label="收货地址" width="180"></el-table-column>
              <el-table-column prop="phone" label="联系电话" width="180"></el-table-column>
              <el-table-column prop="money" label="订单金额" width="180"></el-table-column>
              <el-table-column prop="status" label="订单状态" width="180"></el-table-column>
              <el-table-column prop="number" label="订单号"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="物流管理" name="second">物流管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      card: "first",
      number: "",
      statusList: [],
      status: ""
    };
  },
  methods: {
    formatter(row) {
      return this.$moment(row.time).format("YYYY-MM-DD HH:mm:ss");
    },
    search() {
        axios.post('/api/order/orderSelect', {
            number: this.number
        }).then(res => {
            this.tableData = res.data
        }).catch(err => {
            console.log(err)
        })
    },
    getList() {
      axios
        .post("/api/order/orderList")
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      axios
        .post("/api/order/statusList")
        .then(res => {
          this.statusList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
</style>