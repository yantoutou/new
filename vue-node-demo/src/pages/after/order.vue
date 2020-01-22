<template>
  <div>
    <el-tabs v-model="card">
      <el-tab-pane label="订单查询" name="first">
        <el-card>
          <div slot="header">
            <span>订单查询</span>
            <span>
              <el-button type="primary" class="export" @click="exportTable">导出</el-button>
            </span>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-input
                  placeholder="请输入订单编号"
                  v-model="number"
                  clearable
                ></el-input>
              </el-col>
              <el-col :span="5">
                <el-select
                  v-model="status"
                  placeholder="请选择订单状态"
                  clearable
                >
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="10">
                <el-date-picker
                  v-model="time"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" @click="search"
                  >搜索</el-button
                >
              </el-col>
            </el-row>
            <el-table
              style="width: 100%"
              :data="tableData"
              :cell-style="cellStyle"
              v-loading="loading"
            >
              <el-table-column
                prop="time"
                label="下单时间"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="收货地址"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="phone"
                label="联系电话"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="money"
                label="订单金额"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="label"
                label="订单状态"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="number"
                label="订单编号"
                width="180"
              ></el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row)"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="total, prev, pager, next, jumper"
              :total="total"
              :page-size="7"
              class="page"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="退货管理" name="second"
        ><Return></Return
      ></el-tab-pane>
    </el-tabs>
    <el-dialog
      title="订单修改"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-row>
          <el-col :span="15">
            <el-form-item label="下单时间" prop="timeEdit">
              <el-date-picker
                v-model="form.timeEdit"
                type="datetime"
                placeholder="选择日期时间"
                disabled
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item
              label="收货地址"
              prop="addEdit"
              :hide-required-asterisk="true"
            >
              <el-input
                v-model="form.addEdit"
                placeholder="请输入地址"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="联系电话" prop="phoneEdit">
              <el-input
                v-model="form.phoneEdit"
                placeholder="请输入电话"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="订单金额" prop="moneyEdit">
              <el-input
                v-model="form.money"
                placeholder="请输入金额"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="订单状态" prop="statusEdit">
              <el-select
                v-model="form.statusEdit"
                placeholder="请选择状态"
                clearable
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="订单编号" prop="numEdit">
              <el-input
                v-model="form.num"
                placeholder="请输入订单编号"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Return from "./return";
export default {
  inject: ["reload"],
  data() {
    var phoneEdit = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电话号"));
      } else {
        var reg = /^1[3456789]\d{9}$/;
        if (!reg.test(this.form.phoneEdit)) {
          callback(new Error("请输入有效的手机号码"));
        } else {
          callback();
        }
      }
    };
    return {
      autoWidth: true,
      bookType: 'xlsx',
      filename: '',
      tableData: [],
      card: "first",
      number: "",
      statusList: [],
      status: "",
      time: "",
      dialogFormVisible: false,
      loading: true,
      total: 0,
      currentPage: 1,
      flag: 1,
      isPage: 0,
      ex: [],
      form: {
        addEdit: "",
        phoneEdit: "",
        statusEdit: "",
        timeEdit: "",
        money: "",
        num: "",
        id: ""
      },
      rules: {
        addEdit: [{ required: true, message: "请输入地址", trigger: "change" }],
        statusEdit: [
          { required: true, message: "请选择状态", trigger: "change" }
        ],
        phoneEdit: [{ required: true, validator: phoneEdit, trigger: "change" }]
      }
    };
  },
  components: { Return },
  methods: {
    cellStyle(row) {
      if (row.column.label == "订单状态") {
        if (row.row.status == 1) {
          return "color: #8dd16c";
        } else if (row.row.status == 2) {
          return "color: #e6a23d";
        } else if (row.row.status == 3) {
          return "color: #909399";
        } else {
          return "color: red";
        }
      }
    },
    // 搜索
    search() {
      this.flag = 2;
      let startTime;
      let endTime;
      if (this.time == "" || !this.time) {
        startTime = "";
        endTime = "";
      } else {
        startTime = this.time[0];
        endTime = this.time[1];
      }
      if (this.isPage == 0) {
        this.currentPage = 1;
      } else {
        console.log(this.currentPage);
      }
      axios
        .post("/api/order/orderSelect", {
          number: this.number,
          status: this.status,
          startTime,
          endTime,
          page: this.currentPage
        })
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
          this.loading = false;
          this.ex = res.data.ex
        })
        .catch(err => {
          console.log(err);
        });
      this.isPage = 0;
    },
    // 获取列表
    getList() {
      this.flag = 1;
      axios
        .post("/api/order/orderList")
        .then(res => {
          this.ex = res.data
          this.total = res.data.length;
        })
        .catch(err => {
          console.log(err);
        });
      axios
        .post("/api/order/page", {
          page: this.currentPage
        })
        .then(res => {
          this.tableData = res.data;
          this.loading = false;
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
    },
    // 编辑
    edit(row) {
      this.dialogFormVisible = true;
      this.form.addEdit = row.address;
      this.form.phoneEdit = row.phone;
      this.form.statusEdit = row.status;
      this.form.timeEdit = row.time;
      this.form.money = row.money;
      this.form.num = row.number;
      this.form.id = row.id;
    },
    Confirm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.dialogFormVisible = false;
          axios
            .post("/api/order/update", {
              id: this.form.id,
              address: this.form.addEdit,
              phone: this.form.phoneEdit,
              status: this.form.statusEdit
            })
            .then(() => {
              this.loading = false;
              this.$message.success("修改成功");
              this.reload();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.flag == 1) {
        this.getList();
      } else {
        this.isPage = 1;
        this.search();
      }
    },
    exportTable() {
      import('../../assets/js/Export2Excel.js').then(moudle => {
        const tHeader = ['下单时间', '收货地址', '联系电话', '订单金额', '订单状态', '订单编号']
        const filterVal = ['time', 'address', 'phone', 'money', 'label', 'number']
        const list = this.ex
        const data = this.formatJson(filterVal, list)
        moudle.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename === '' ? 'filename' : this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>
.page {
  float: right;
}
.export {
  float: right;
}
</style>
