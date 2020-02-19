<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card shadow="hover" class="card" @click.native="returnClick">
          <div class="left">
            <span class="number-return">{{ returnNum }}</span>
            <p>Return of the order</p>
          </div>
          <div class="right">
            <i class="iconfont icon-tuihuo"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="left">
            <span class="number-msg">123</span>
            <p>Message processing</p>
          </div>
          <div class="right">
            <i class="iconfont icon-icon-test1"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card" @click.native="returnClick">
          <div class="left">
            <span class="number-order">{{ orderNum }}</span>
            <p>Unaudited order</p>
          </div>
          <div class="right">
            <i class="iconfont icon-order_icon"></i>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <div class="left">
            <span class="number-urged">80</span>
            <p>urged</p>
          </div>
          <div class="right">
            <i class="iconfont icon-cuiban"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="three-card" :gutter="0">
      <el-col :span="12">
        <el-card class="pie-card">
          <div id="pieChart"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="user-card">
          <div id="userChart"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="echarts-card">
      <div id="myChart"></div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  data() {
    return {
      returnNum: '',
      orderNum: '',
      sales: [],
      goodsId: [],
      sortArr: [],
      nameArr: [],
      showTable: false,
      showNull: false,
      b: '',
      g: ''
    }
  },
  methods: {
    returnClick() {
      this.$router.push('/manage/order')
    },
    UserChart() {
      let myChart = this.$echarts.init(document.getElementById('userChart'), 'macarons')
      myChart.setOption({
        title: {
          text: '用户画像',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['男', '女']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.b, name: '男' },
              { value: this.g, name: '女' }
            ]
          }
        ]
      })
    },
    pieDraw() {
      let myChart = this.$echarts.init(document.getElementById('pieChart'), 'macarons')
      myChart.setOption({
        title: {
          text: '商品销量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}: {b} <br> 销售数量: {c} <br> 所占比例: {d}%'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 'left',
          bottom: '10',
          data: this.nameArr
        },
        series: [
          {
            name: '商品编号',
            type: 'pie',
            radius: '55%',
            center: ['55%', '60%'],
            data: this.sortArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById('myChart'), 'macarons')
      myChart.setOption({
        title: {
          text: '本周销量',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          position: function(point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0 // x坐标位置
            var y = 0 // y坐标位置

            // 当前鼠标位置
            var pointX = point[0]
            var pointY = point[1]

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0]
            var boxHeight = size.contentSize[1]

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5
            } else {
              // 左边放的下
              x = pointX - boxWidth
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5
            } else {
              // 上边放得下
              y = pointY - boxHeight
            }

            return [x, y]
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '30%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '销量',
            type: 'line',
            stack: '总量',
            data: this.sales
          }
        ],
        color: '#d47070'
      })
    },
    getList() {
      axios.post('/api/work/goodsSale').then(res => {
        res.data.forEach(item => {
          this.nameArr.push(item.name)
          this.sortArr.push(item)
        })
        this.pieDraw()
      })
      axios.post('/api/work/user').then(res => {
        this.b = res.data.b
        this.g = res.data.g
        this.UserChart()
      })
      for (let i = 1; i < 8; i++) {
        let startTime = moment()
          .weekday(i)
          .format('YYYY-MM-DD 00:00:00')
        let endTime = moment()
          .weekday(i)
          .format('YYYY-MM-DD 23:59:59')
        axios
          .post('/api/work/sales', {
            startTime,
            endTime
          })
          .then(res => {
            this.sales.push(res.data)
          })
      }
      axios.post('/api/work/todoNumber').then(res => {
        this.returnNum = res.data.return
        this.orderNum = res.data.order
      })
    }
  },
  mounted() {
    this.getList()
    setTimeout(this.drawLine, 100)
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 265px;
  height: 108px;
  margin-top: 10px;
  .left {
    float: left;
    .number-return {
      color: #b6a2de;
      font-size: 20px;
      font-weight: 700;
    }
    .number-msg {
      color: #36a3f7;
      font-size: 20px;
      font-weight: 700;
    }
    .number-order {
      color: #40c9c6;
      font-size: 20px;
      font-weight: 700;
    }
    .number-urged {
      color: #f4516c;
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
      color: #b6a2de;
    }
    .icon-icon-test1 {
      font-size: 55px;
      color: #36a3f7;
    }
    .icon-order_icon {
      font-size: 55px;
      color: #40c9c6;
    }
    .icon-cuiban {
      font-size: 55px;
      color: #f4516c;
    }
  }
}
.echarts-card {
  width: 97%;
  height: 400px;
  margin-top: 36px;
  #myChart {
    width: 1100px;
    height: 500px;
  }
}
.three-card {
  margin-top: 36px;
  .pie-card {
    width: 94%;
    height: 450px;
  }
  #pieChart {
    width: 100%;
    height: 400px;
  }
  .user-card {
    width: 94%;
    height: 450px;
    text-align: center;
    color: #008acd;
    #userChart {
      width: 100%;
      height: 450px;
    }
  }
}
</style>
