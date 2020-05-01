<template>
  <div>
    <el-card class="search-card" shadow="never">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input placeholder="请输入商品名称" v-model="searchInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" class="button">
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="add"
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
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="button"
              @click="deleteSome"
              >批量删除</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        height="490"
        v-loading="loading"
        ref="table"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100" fixed> </el-table-column>
        <el-table-column prop="name" label="商品名称" width="120"> </el-table-column>
        <el-table-column prop="img" label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="showImg(scope.row.img)" class="goods-img" />
          </template>
        </el-table-column>
        <el-table-column prop="time" label="录入日期" width="170"> </el-table-column>
        <el-table-column prop="money" label="商品价格" width="150"> </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣"
          width="150"
          :filters="[{ text: '有折扣', value: '1' }, { text: '无折扣', value: '0' }]"
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
          :filters="[{ text: '新品', value: '1' }, { text: '非新品', value: '0' }]"
          :filter-method="filterNew"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <i class="el-icon-check" v-if="scope.row.new == 1"></i>
            <i class="el-icon-close" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="销量" width="140"> </el-table-column>
        <el-table-column prop="inventory" label="库存" width="150"> </el-table-column>
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
        <div slot="append" style="text-align: center">
          <p v-if="showMore">加载中...</p>
          <p v-if="nomore">没有更多了</p>
        </div>
      </el-table>
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
                  只能上传一张jpg/png文件，且不超过500kb
                </div>
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
      <el-dialog
        title="添加商品"
        :visible.sync="addFormVisible"
        :modal-append-to-body="false"
        v-if="addFormVisible"
      >
        <el-form label-width="100px" :model="addForm" ref="addForm" :rules="addRules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品价格" prop="money">
                <el-input v-model="addForm.money" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="库存" prop="inventory">
                <el-input v-model="addForm.inventory" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品类型" prop="value">
                <el-select v-model="addForm.value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
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
              <el-form-item>
                <el-checkbox v-model="addForm.checked1">折扣</el-checkbox>
                <el-checkbox v-model="addForm.checked2">新品</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="商品描述" prop="textarea">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入商品描述"
                v-model="addForm.textarea"
              >
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="上传图片" :required="true">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                ref="addUpload"
                :on-exceed="onExceed"
                :on-change="addFileChange"
              >
                <div slot="tip" class="el-upload__tip">
                  只能上传一张jpg/png文件, 且不超过500kb
                </div>
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="addFile.url" alt="" />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="addHandlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="addHandleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="addDialogVisible" :modal="false">
                <img width="100%" :src="addDialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-row>
        </el-form>
        <div slot="footer">
          <el-button @click="addCancel">取 消</el-button>
          <el-button type="primary" @click="addConfirm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  inject: ['reload'],
  data() {
    var inventory = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入库存数量'))
        } else {
          if (value < 0) {
            callback(new Error('库存数量不能小于0'))
          } else if (value % 1 != 0) {
            callback(new Error('库存数量不能为小数'))
          } else {
            callback()
          }
        }
      },
      money = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入商品价格'))
        } else {
          if (value < 0) {
            callback(new Error('商品价格不能小于0'))
          } else {
            callback()
          }
        }
      }
    return {
      tableData: [],
      searchInput: '',
      searchTime: '',
      dialogFormVisible: false,
      dialogImageUrl: '',
      addDialogImageUrl: '',
      dialogVisible: false,
      addDialogVisible: false,
      disabled: false,
      loading: true,
      addFormVisible: false,
      deleteArr: [],
      showMore: true,
      nomore: false,
      len: '',
      dom: '',
      limit: 10,
      flag: 0,
      options: [
        {
          value: '1',
          label: '烤烟型',
        },
        {
          value: '2',
          label: '混合型',
        },
        {
          value: '3',
          label: '雪茄型',
        },
        {
          value: '4',
          label: '外香型',
        },
      ],
      form: {
        id: '',
        name: '',
        time: '',
        money: '',
        count: '',
        inventory: '',
        checked1: '',
        checked2: '',
        img: '',
      },
      addForm: {
        name: '',
        money: '',
        inventory: '',
        checked1: '',
        checked2: '',
        textarea: '',
        value: ''
      },
      file: '',
      addFile: '',
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'change' }],
        money: [{ required: true, validator: money, trigger: 'change' }],
      },
      addRules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'change' }],
        money: [{ required: true, validator: money, trigger: 'change' }],
        inventory: [{ required: true, validator: inventory, trigger: 'change' }],
        value: [{required: true, message: '请选择商品类型', trigger: 'change'}],
        textarea: [{required: true, message: '请为商品添加描述', trigger: 'change'}]
      },
    }
  },
  methods: {
    showImg(icon) {
      return require('../../../../server/uploads/' + icon)
    },
    upload() {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      const headerConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      formData.append('file', file.raw)
      axios.post('/api/goods/upload', formData, headerConfig).then((res) => {
        console.log(res)
      })
    },
    fileChange(file) {
      this.file = file
    },
    addFileChange(file) {
      this.addFile = file
    },
    searchGoods() {
      let startTime
      let endTime
      if (this.searchTime == '' || !this.searchTime) {
        startTime = ''
        endTime = ''
      } else {
        startTime = moment(this.searchTime[0]).format('YYYY-MM-DD HH:mm:ss')
        endTime = moment(this.searchTime[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      setTimeout(() => {
        axios
          .post('/api/goods/search', {
            name: this.searchInput,
            startTime,
            endTime,
            limit: this.limit,
          })
          .then((res) => {
            this.tableData = res.data.data
            this.loading = false
            this.len = res.data.len
            if (this.tableData.length == this.len && this.len != 0) {
              this.showMore = false
              this.nomore = true
            } else if (this.len == 0) {
              this.showMore = false
              this.nomore = false
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }, 1000)
    },
    search() {
      let logName = sessionStorage.getItem('username')
      axios
        .post('/api/log/addLog', {
          name: logName,
          operation: '商品管理',
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
          content: '搜索',
        })
        .then((res) => {
          console.log(res)
        })
      this.loading = true
      this.$refs.table.bodyWrapper.scrollTop = 0
      this.limit = 10
      this.searchGoods()
      this.dom = this.$refs.table.bodyWrapper
      this.dom.addEventListener('scroll', () => {
        // 滚动距离
        let scrollTop = this.dom.scrollTop
        // 变量windowHeight是可视区的高度
        let windowHeight = this.dom.clientHeight || this.dom.clientHeight
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
        if (scrollTop + windowHeight === scrollHeight) {
          if (this.tableData.length == this.len && this.len != 0) {
            this.showMore = false
            this.nomore = true
          } else if (this.len == 0) {
            this.showMore = false
            this.nomore = false
          } else {
            this.showMore = true
            this.nomore = false
            this.limit = this.tableData.length + 10
            this.searchGoods()
          }
        }
      })
    },
    filterDiscount(value, row) {
      return row.discount === value
    },
    filterNew(value, row) {
      return row.new === value
    },
    deleteOne(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          axios
            .post('/api/goods/deleteOne', {
              id: row.id,
            })
            .then((res) => {
              this.tableData = res.data
              this.reload()
              let logName = sessionStorage.getItem('username')
              axios
                .post('/api/log/addLog', {
                  name: logName,
                  operation: '商品管理',
                  time: moment().format('YYYY-MM-DD HH:mm:ss'),
                  content: '单条删除商品',
                })
                .then((res) => {
                  console.log(res)
                })
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    edit(row) {
      this.dialogFormVisible = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.time = row.time
      this.form.money = row.money
      this.form.count = row.count
      this.form.inventory = row.inventory
      if (row.discount == 1) {
        this.form.checked1 = true
      } else {
        this.form.checked1 = false
      }
      if (row.new == 1) {
        this.form.checked2 = true
      } else {
        this.form.checked2 = false
      }
      this.form.img = row.img
    },
    handleRemove() {
      this.$refs.upload.clearFiles()
    },
    addHandleRemove() {
      this.$refs.addUpload.clearFiles()
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    addHandlePictureCardPreview(file) {
      this.addDialogImageUrl = file.url
      this.addDialogVisible = true
    },
    onExceed() {
      this.$message.warning('当前限制选择1个文件')
    },
    cancel() {
      this.dialogFormVisible = false
      this.$message('操作已取消')
    },
    confirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.$refs.upload.uploadFiles.length == 0) {
            this.success()
          } else {
            if (this.file.raw.type == 'image/jpeg' || this.file.raw.type == 'image/png') {
              let size = this.$refs.upload.uploadFiles[0].size / 1024
              if (size > 500) {
                this.$message.error('请选择500kb以内的图片')
              } else {
                this.upload()
                this.success()
              }
            } else {
              this.$message.warning('只能上传jpg/png格式的图片')
            }
          }
        } else {
          return false
        }
      })
    },
    success() {
      let checked1
      let checked2
      if (this.form.checked1 == true) {
        checked1 = 1
      } else {
        checked1 = 0
      }
      if (this.form.checked2 == true) {
        checked2 = 1
      } else {
        checked2 = 0
      }
      axios
        .post('/api/goods/edit', {
          id: this.form.id,
          name: this.form.name,
          money: this.form.money,
          checked1,
          checked2,
        })
        .then(() => {
          let logName = sessionStorage.getItem('username')
          axios
            .post('/api/log/addLog', {
              name: logName,
              operation: '商品管理',
              time: moment().format('YYYY-MM-DD HH:mm:ss'),
              content: '商品信息修改',
            })
            .then((res) => {
              console.log(res)
            })
          this.$message.success('修改成功')
          this.reload()
        })
        .catch((err) => {
          console.log(err)
        })
      this.dialogFormVisible = false
    },
    add() {
      this.addFormVisible = true
    },
    addCancel() {
      this.addFormVisible = false
      this.$message('操作已取消')
    },
    addConfirm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if (this.$refs.addUpload.uploadFiles.length == 0) {
            this.$message.error('请选择上传图片')
          } else {
            if (
              this.addFile.raw.type == 'image/jpeg' ||
              this.addFile.raw.type == 'image/png'
            ) {
              let size = this.$refs.addUpload.uploadFiles[0].size / 1024
              if (size > 500) {
                this.$message.error('请选择500kb以内的图片')
              } else {
                const formData = new FormData()
                const file = this.$refs.addUpload.uploadFiles[0]
                const headerConfig = {
                  headers: { 'Content-Type': 'multipart/form-data' },
                }
                formData.append('file', file.raw)
                axios
                  .post('/api/goods/addGoods', {
                    name: this.addForm.name,
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    money: this.addForm.money,
                    checked1: this.addForm.checked1,
                    checked2: this.addForm.checked2,
                    count: 0,
                    inventory: this.addForm.inventory,
                    type: this.addForm.value,
                    describe: this.addForm.textarea
                  })
                  .then((res) => console.log(res.data))
                axios
                  .post('/api/goods/addGoodsUpload', formData, headerConfig)
                  .then(() => {
                    this.addFormVisible = false
                    this.$message.success('添加成功')
                    let logName = sessionStorage.getItem('username')
                    axios
                      .post('/api/log/addLog', {
                        name: logName,
                        operation: '商品管理',
                        time: moment().format('YYYY-MM-DD HH:mm:ss'),
                        content: '添加商品',
                      })
                      .then((res) => {
                        console.log(res)
                      })
                  })
              }
            } else {
              this.$message.error('只能上传jpg/png格式的图片')
            }
          }
        } else {
          return false
        }
      })
    },
    handleSelectionChange(val) {
      let arr = []
      val.forEach((item) => {
        arr.push(item.id)
      })
      this.deleteArr = arr
    },
    deleteSome() {
      if (this.deleteArr.length == 0) {
        this.$message.warning('请选择删除文件')
      } else {
        this.$confirm('此操作将永久删除所选文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            axios
              .post('/api/goods/deleteSome', {
                deleteArr: this.deleteArr,
              })
              .then(() => {
                this.reload()
                let logName = sessionStorage.getItem('username')
                axios
                  .post('/api/log/addLog', {
                    name: logName,
                    operation: '商品管理',
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    content: '批量删除',
                  })
                  .then((res) => {
                    console.log(res)
                  })
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      }
    },
  },
  mounted() {
    this.loading = true
    this.search()
  },
}
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
.font {
  color: #f56c6c;
  margin: 20px 0 0 0;
}
</style>
