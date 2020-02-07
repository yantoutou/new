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
      <el-table :data="tableData" stripe style="width: 100%" height="490" v-loading='loading'>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100" fixed>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="120">
        </el-table-column>
        <el-table-column prop="img" label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="showImg(scope.row.img)" class="goods-img" />
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit(scope.row)"
            ></el-button>
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
      <el-dialog
        title="编辑商品"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        v-if="dialogFormVisible"
      >
        <el-form label-width="100px" :model="form" :rules="rules" ref="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品编号">
                <el-input v-model="form.id" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="下单时间">
                <el-date-picker
                  v-model="form.time"
                  type="datetime"
                  placeholder="选择日期时间"
                  disabled
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品价格" prop="money">
                <el-input v-model="form.money" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="销量">
                <el-input v-model="form.count" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="库存">
                <el-input v-model="form.inventory" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item>
                <el-checkbox v-model="form.checked1">折扣</el-checkbox>
                <el-checkbox v-model="form.checked2">新品</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="商品图片">
                <img :src="showImg(form.img)" class="goods-img" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="上传图片">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                ref="upload"
                :on-exceed="onExceed"
                :on-change="fileChange"
              >
                <div slot="tip" class="el-upload__tip">
                  只能上传一张jpg/png文件，且上传之后会替代原图片
                </div>
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :modal="false">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
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
      searchTime: "",
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      loading: true,
      form: {
        id: "",
        name: "",
        time: "",
        money: "",
        count: "",
        inventory: "",
        checked1: "",
        checked2: "",
        img: ""
      },
      file: "",
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "change" }
        ],
        money: [
          { required: true, message: "请输入商品价格", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    showImg(icon) {
      return require("../../../../server/uploads/"+icon);
    },
    upload() {
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
        formData.append('file', file.raw);
        axios.post('/api/goods/upload', formData, headerConfig).then(res => {
          console.log(res)
        })
      },
    fileChange(file) {
      this.file = file;
    },
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
          axios
            .post("/api/goods/deleteOne", {
              id: row.id
            })
            .then(res => {
              this.tableData = res.data;
              this.reload();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.time = row.time;
      this.form.money = row.money;
      this.form.count = row.count;
      this.form.inventory = row.inventory;
      if (row.discount == 1) {
        this.form.checked1 = true;
      } else {
        this.form.checked1 = false;
      }
      if (row.new == 1) {
        this.form.checked2 = true;
      } else {
        this.form.checked2 = false;
      }
      this.form.img = row.img;
    },
    handleRemove() {
      this.$refs.upload.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed() {
      this.$message.warning("当前限制选择1个文件");
    },
    cancel() {
      this.dialogFormVisible = false;
      this.$message("操作已取消");
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$refs.upload.uploadFiles.length == 0) {
            this.success();
          } else {
            if (
              this.file.raw.type == "image/jpeg" ||
              this.file.raw.type == "image/png"
            ) {
              this.upload();
              this.success();
            } else {
              this.$message.warning("只能上传jpg/png格式的图片");
            }
          }
        } else {
          return false;
        }
      });
    },
    success() {
      let checked1;
      let checked2;
      if (this.form.checked1 == true) {
        checked1 = 1;
      } else {
        checked1 = 0;
      }
      if (this.form.checked2 == true) {
        checked2 = 1;
      } else {
        checked2 = 0;
      }
      axios
        .post("/api/goods/edit", {
          id: this.form.id,
          name: this.form.name,
          money: this.form.money,
          checked1,
          checked2
        })
        .then(() => {
          this.$message.success("修改成功");
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
      this.dialogFormVisible = false;
    }
  },
  mounted() {
    setTimeout(() => {
      axios.post("/api/goods/showGoods").then(res => {
      this.tableData = res.data;
      this.loading = false
    });
    }, 1000)
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
