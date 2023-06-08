<template>
  <div class="homeBox">
    <!-- 查询 -->
    <div class="searchBox">
      <div class="itemBox">
        <div class="itemTitle">开始时间</div>
        <div class="item">
          <el-date-picker
            v-model="startTime"
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
            v-model="endTime"
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
    <!-- 图表 -->
    <div class="chartBox">
      <!-- 适应性培训统计 -->
      <div class="typeBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">适应性培训统计</div>
        </div>
        <div class="chartNum">
          <div class="blue1">参加总人数: 3000人</div>
        </div>
        <div id="typeChart" style="width: 100%; height: 200px" />
      </div>
      <!-- 职业技能培训统计 -->
      <div class="orgNum">
        <div class="headerBox">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">职业技能培训统计</div>
          </div>
        </div>
        <div class="chartNum">
          <div class="blue1">参加总人数: 3000人</div>
          <div class="blue2">培训后就业人数: 2000人</div>
          <div class="greenBg">培训后就业率: 80%</div>
        </div>
        <div class="orgChart">
          <div class="chartItem">
            <div id="numChart" style="width: 100%; height: 200px" />
          </div>
          <div class="chartItem">
            <div class="chartTitle">服务时间分布</div>
            <div class="itemChart">
              <div>
                <span>2年以下</span>
                <el-progress
                  :percentage="60"
                  color="#0057bc"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>6000</span>
              </div>
              <div>
                <span>2年-5年</span>
                <el-progress
                  :percentage="80"
                  color="#00d0b9"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>8000</span>
              </div>
              <div>
                <span>5年-8年</span>
                <el-progress
                  :percentage="50"
                  color="#00d466"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>5000</span>
              </div>
              <div>
                <span>8年-12年</span>
                <el-progress
                  :percentage="40"
                  color="#ffb93a"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>4000</span>
              </div>
              <div>
                <span>12年以上</span>
                <el-progress
                  :percentage="10"
                  color="#ff5050"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>1000</span>
              </div>
            </div>
          </div>
          <div class="chartItem">
            <div id="natureChart" style="width: 100%; height: 200px" />
          </div>
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
      startTime: '',
      endTime: '',
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
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getTypeChart()
    this.getNumChart()
    this.getNatureChart()
  },
  methods: {
    // 适应性培训统计
    getTypeChart() {
      const chart = echarts.init(document.getElementById('typeChart'))
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        color: this.color,
        legend: {
          x: 'center',
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
              { value: 843, name: '5天以下' },
              { value: 427, name: '5-10天' },
              { value: 138, name: '10天以上' }
            ]
          }
        ]
      })
    },
    // 培训次数图表
    getNumChart() {
      const chart = echarts.init(document.getElementById('numChart'))
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        color: this.color,
        legend: {
          x: 'center',
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
              { value: 843, name: '30岁及以下' },
              { value: 427, name: '31-40岁' },
              { value: 738, name: '41-50次' },
              { value: 281, name: '60岁以上' }
            ]
          }
        ]
      })
    },
    // 培训次数图表
    getNatureChart() {
      const chart = echarts.init(document.getElementById('natureChart'))
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        color: this.color,
        legend: {
          x: 'center',
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
              { value: 843, name: '12-24个月' },
              { value: 427, name: '9-12个月' },
              { value: 238, name: '9个月' },
              { value: 427, name: '3-6个月' },
              { value: 573, name: '1-3个月' },
              { value: 297, name: '1个月以下' }
            ]
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
  .chartBox {
    width: 100%;
    display: flex;
    margin-top: 50px;
    .orgNum {
      flex: 3;
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
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            > div {
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              > span:first-child {
                width: 70px;
              }
              > span:last-child {
                width: 50px;
                text-align: right;
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
            > div:nth-child(4) {
              color: #ffb93a;
            }
            > div:nth-child(5) {
              color: #ff5050;
            }
          }
        }
        .chartItem:nth-child(2){
          border-right: 1px solid #ececec;
          border-left: 1px solid #ececec;
          padding: 0 20px;
        }
      }
    }
    .chartNum {
      width: 100%;
      margin: 15px 0;
      display: flex;
      justify-content: space-around;
      > div {
        padding: 4px 20px;
        font-weight: 700;
      }
      .blue1 {
        background: rgba(0, 94, 214, 0.2);
        color: #005ed6;
      }
      .blue2 {
        background: rgba(0, 169, 167, 0.2);
        color: #00a9a7;
      }
      .greenBg {
        background: rgba(0, 183, 5, 0.2);
        color: #00b705;
      }
    }
    .numBox {
      flex: 1;
      margin: 0 20px;
    }
    .typeBox {
      flex: 1;
      margin-right: 15px;
    }
    > div {
      border: 1px solid #ececec;
      border-radius: 10px;
      padding: 15px;
      box-sizing: border-box;
    }
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
