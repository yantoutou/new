<template>
  <div>
    <el-card class="search-card" shadow="never">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input
                placeholder="请输入商品名称"
                v-model="searchInput"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" class="button">
            <el-button type="success" icon="el-icon-circle-plus-outline"
              >添加</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="录入日期">
              <el-date-picker
                v-model="searchTime"
                type="datetimerange"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-button type="primary" icon="el-icon-search" @click="search"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button type="danger" icon="el-icon-delete" class="button"
              >批量删除</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-table :data="tableData" stripe style="width: 100%" height="490">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100" fixed>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="img" label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="goods-img" />
          </template>
        </el-table-column>
        <el-table-column prop="time" label="录入日期" width="170">
        </el-table-column>
        <el-table-column prop="money" label="商品价格" width="150">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣"
          width="150"
          :filters="[
            { text: '有折扣', value: '1' },
            { text: '无折扣', value: '0' }
          ]"
          :filter-method="filterDiscount"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <i class="el-icon-check" v-if="scope.row.discount == 1"></i>
            <i class="el-icon-close" v-else></i>
          </template>
        </el-table-column>
        <el-table-column
          prop="new"
          label="新品"
          width="100"
          :filters="[
            { text: '新品', value: '1' },
            { text: '非新品', value: '0' }
          ]"
          :filter-method="filterNew"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <i class="el-icon-check" v-if="scope.row.new == 1"></i>
            <i class="el-icon-close" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="销量" width="140">
        </el-table-column>
        <el-table-column prop="inventory" label="库存" width="150">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteOne(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        :page-size="7"
        class="page"
      >
      </el-pagination> -->
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      searchInput: "",
      searchTime: ""
    };
  },
  methods: {
    search() {
      let startTime;
      let endTime;
      if (this.searchTime == "" || !this.searchTime) {
        startTime = "";
        endTime = "";
      } else {
        startTime = this.searchTime[0];
        endTime = this.searchTime[1];
      }
      axios
        .post("/api/goods/search", {
          name: this.searchInput,
          startTime,
          endTime
        })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterDiscount(value, row) {
      return row.discount === value;
    },
    filterNew(value, row) {
      return row.new === value;
    },
    deleteOne(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.post('/api/goods/deleteOne', {
            id: row.id
          }).then((res) => {
            this.tableData = res.data
            this.reload();
            this.$message({
            type: "success",
            message: "删除成功!"
          });
          }).catch((err) => {console.log(err)})
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    axios.post("/api/goods/showGoods").then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.goods-img {
  width: 70px;
  height: 70px;
}
.search-card {
  margin-bottom: 15px;
}
.page {
  float: right;
}
.button {
  float: right;
}
</style>
