<template>
  <div class="homeBox">
    <!-- 查询 -->
    <div class="searchBox">
      <div class="itemBox">
        <div class="itemTitle">地区选择</div>
        <div class="item">
          <el-select v-model="siteVal" clearable placeholder="请选择地区">
            <el-option
              v-for="item in siteOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="itemBox">
        <div class="itemTitle">开始时间</div>
        <div class="item">
          <el-date-picker
            v-model="timeVal"
            type="year"
            value-format="yyyy"
            placeholder="请选择开始时间"
          />
        </div>
      </div>
      <div class="itemBox">
        <div class="itemTitle">结束时间</div>
        <div class="item">
          <el-date-picker
            v-model="timeVal"
            type="year"
            value-format="yyyy"
            placeholder="请选择结束时间"
          />
        </div>
      </div>
      <div class="btnBox">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="searchData"
        >查询</el-button>
        <el-button
          type="info"
          icon="el-icon-refresh"
          size="small"
          @click="resetData"
        >重置</el-button>
      </div>
    </div>
    <!-- 机构、园地总数 -->
    <div class="allNum">
      <div class="item blueFont">
        <div class="pic">
          <img src="@/assets/images/sp/fund1.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>135</span>万元</div>
          <div class="text">资金资助总金额</div>
        </div>
      </div>
      <div class="item greenFont">
        <div class="pic">
          <img src="@/assets/images/sp/fund2.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>264</span>万元</div>
          <div class="text">资助承训机构金额</div>
        </div>
      </div>
      <div class="item orangeFont">
        <div class="pic">
          <img src="@/assets/images/sp/fund3.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>281</span>万元</div>
          <div class="text">资助就业园地金额</div>
        </div>
      </div>
      <div class="item redFont">
        <div class="pic">
          <img src="@/assets/images/sp/fund4.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>68</span>家</div>
          <div class="text">资金资助机构数</div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chartBox">
      <!-- 资金支付占比统计 -->
      <div class="orgNum">
        <div class="headerBox">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">资金支付占比统计</div>
          </div>
        </div>
        <div id="numChart" style="width: 100%; height: 300px" />
      </div>
      <!-- 支付时间统计 -->
      <div class="numBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">支付时间统计</div>
        </div>
        <div id="natureChart" style="width: 100%; height: 300px" />
      </div>
      <!-- 培训类型统计 -->
      <div class="typeBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">培训类型统计</div>
        </div>
        <div class="tableData">
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            :header-cell-style="{ background: '#F5F7FA' }"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
              align="center"
            />
            <el-table-column
              prop="site"
              label="地区名称"
              align="center"
              width="100"
              show-overflow-tooltip
            />
            <el-table-column prop="num1" label="支付金额(万元）" align="center" width="80" />
          </el-table>
        </div>
      </div>
      <!-- 培训类型统计 -->
      <div class="typeBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">培训类型统计</div>
        </div>
        <div class="tableData">
          <el-table
            :data="tableData2"
            style="width: 100%"
            border
            :header-cell-style="{ background: '#F5F7FA' }"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column
              type="index"
              label="序号"
              width="60"
              align="center"
            />
            <el-table-column
              prop="name"
              label="机构名称"
              align="center"
              width="100"
              show-overflow-tooltip
            />
            <el-table-column prop="num1" label="资金支付金额（万元）" align="center" width="120" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      siteVal: '',
      timeVal: '',
      siteOption: [
        {
          value: '全国',
          label: '全国'
        },
        {
          value: '北京市',
          label: '北京市'
        },
        {
          value: '天津市',
          label: '天津市'
        },
        {
          value: '河北省',
          label: '河北省'
        }
      ],
      selectList: [
        {
          title: '承训机构'
        },
        {
          title: '就业园地'
        }
      ],
      tableData: [
        {
          site: '北京市',
          num1: '1231'
        },
        {
          site: '上海市',
          num1: '952'
        },
        {
          site: '天津市',
          num1: '285'
        },
        {
          site: '河北省',
          num1: '247'
        },
        {
          site: '山西省',
          num1: '753'
        }
      ],
      tableData2: [
        {
          name: '得以培训机构',
          num1: '294'
        },
        {
          name: '蓝天教育',
          num1: '395'
        },
        {
          name: '得以培训机构',
          num1: '294'
        },
        {
          name: '蓝天教育',
          num1: '395'
        },
        {
          name: '得以培训机构',
          num1: '294'
        }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getNumChart()
    this.getlintChart()
  },
  methods: {
    // 培训次数图表
    getNumChart() {
      const chart = echarts.init(document.getElementById('numChart'))
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#63b2ee',
          '#76da91',
          '#f8cb7f',
          '#f89588',
          '#7cd6cf',
          '#9192ab',
          '#7898e1',
          '#efa666',
          '#eddd86',
          '#9987ce',
          '#63b2ee',
          '#76da91'
        ],
        legend: {
          x: 'right',
          y: 'bottom',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 843, name: '适应性培训' },
              { value: 427, name: '职业技能培训' },
              { value: 138, name: '创业培训' },
              { value: 681, name: '其他' }
            ]
          }
        ]
      })
    },
    // 线状图表
    getlintChart() {
      const chart = echarts.init(document.getElementById('natureChart'))
      chart.setOption({
        color: [
          '#3ca170',
          '#5470c6',
          '#91cd77',
          '#ef6567',
          '#f9c956',
          '#75bedc'
        ],
        textStyle: {
          color: '#888'
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: '#21cba2',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#ededed'
            }
          }
        },
        series: [
          {
            data: [10, 6, 8, 6, 10, 4, 8, 6, 10, 8, 12, 4],
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: '#006eec',
                borderColor: '#ffffff',
                borderWidth: 2
              }
            },
            lineStyle: {
              color: '#006eec'
            }
          }
        ]
      })
    },
    // 查询
    searchData() {},
    // 重置
    resetData() {}
  }
}
</script>
<style lang="scss" scoped>
.homeBox {
  width: 100%;
  padding: 15px;
  font-size: 14px;
  box-sizing: border-box;
  .searchBox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .itemBox {
      display: flex;
      align-items: center;
      padding-right: 30px;
      .itemTitle {
        padding-right: 30px;
      }
      .item {
        flex: 1;
      }
    }
  }
  .allNum {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 30px 0;
    .item {
      display: flex;
      align-items: center;
      border: 1px solid #ececec;
      border-radius: 10px;
      .pic{
        width: 100px;
        height: 110px;
        padding-top: 10px;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .data {
        height: 100%;
        padding: 20px 30px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        font-weight: 700;
        .num {
          font-size: 12px;
          span {
            font-size: 40px;
          }
        }
        .text {
          text-align: center;
        }
      }
    }
    .blueFont {
      color: #006eec;
    }
    .greenFont {
      color: #68cb21;
    }
    .orangeFont {
      color: #ffb93a;
    }
    .redFont {
      color: #ff5050;
    }
  }
  .chartBox {
    width: 100%;
    display: flex;
    .orgNum {
      flex: 1;
      .headerBox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .select {
          display: flex;
          > div {
            padding: 4px 10px;
            background: #fff;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
          .active {
            background: #00adff;
            color: #fff;
          }
        }
      }
      .orgChart {
        width: 100%;
        display: flex;
        .chartItem {
          flex: 1;
          .chartTitle {
            width: 100%;
            padding: 10px 0;
            font-weight: 700;
          }
          .itemChart {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            > div {
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              > span:first-child {
                margin-right: 10px;
              }
              > span:last-child {
                margin-left: 10px;
              }
            }
            > div:nth-child(1) {
              color: #0057bc;
            }
            > div:nth-child(2) {
              color: #009484;
            }
            > div:nth-child(3) {
              color: #00a951;
            }
          }
        }
        .chartItem:first-child {
          margin-right: 20px;
        }
      }
    }
    .numBox {
      flex: 1;
      margin: 0 20px;
    }
    .typeBox {
      flex: 1;
    }
    > div {
      border: 1px solid #ececec;
      border-radius: 10px;
      padding: 15px;
      box-sizing: border-box;
    }
  }
  .tableData {
    margin-top: 20px;
  }
  .headerStyle {
    display: flex;
    align-items: center;
    .line {
      width: 4px;
      height: 14px;
      background: #00adff;
      margin-right: 6px;
    }
    .title {
      color: #00adff;
    }
  }
  ::v-deep {
    .el-progress-bar__outer,
    .el-progress-bar__inner {
      border-radius: 0;
    }
  }
}
</style>
