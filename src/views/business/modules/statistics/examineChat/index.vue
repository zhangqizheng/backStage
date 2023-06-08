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
        <div class="itemTitle">时间选择</div>
        <div class="item">
          <el-date-picker
            v-model="timeVal"
            type="year"
            value-format="yyyy"
            placeholder="请选择日期"
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
          <img src="@/assets/images/sp/exa1.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>1988</span>条</div>
          <div class="text">审批事项总数</div>
        </div>
      </div>
      <div class="item greenFont">
        <div class="pic">
          <img src="@/assets/images/sp/exa2.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>2068</span>条</div>
          <div class="text">已审核</div>
        </div>
      </div>
      <div class="item yello">
        <div class="pic">
          <img src="@/assets/images/sp/exa3.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>68</span>%</div>
          <div class="text">审核率</div>
        </div>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chartBox">
      <!-- 机构统计 -->
      <div class="orgNum">
        <div class="headerBox">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">审批时间统计</div>
          </div>
        </div>
        <div class="orgChart">
          <div class="chartItem">
            <div class="itemChart">
              <div>
                <span>24小时以内</span>
                <el-progress
                  :percentage="10"
                  color="#0057bc"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>100家</span>
              </div>
              <div>
                <span>1-3天内</span>
                <el-progress
                  :percentage="60"
                  color="#00d0b9"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>600家</span>
              </div>
              <div>
                <span>3-7天</span>
                <el-progress
                  :percentage="30"
                  color="#00d466"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>300家</span>
              </div>
              <div>
                <span>7天以上
                </span>
                <el-progress
                  :percentage="30"
                  color="#00d466"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>300家</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 培训次数统计 -->
      <!-- <div class="numBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">培训次数统计</div>
        </div>
        <div id="numChart" style="width: 100%; height: 250px" />
      </div> -->
      <!-- 培训类型统计 -->
      <div class="typeBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">审批类型统计</div>
        </div>
        <div id="typeChart" style="width: 100%; height: 250px" />
      </div>
    </div>
    <!-- 地区审批事项统计 -->
    <div class="tableBox">
      <div class="headerStyle">
        <div class="line" />
        <div class="title">地区审批事项统计</div>
      </div>
      <div class="tableData">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column
            prop="site"
            label="地区名称"
            width="200"
            align="center"
          />
          <el-table-column label="已审核" align="center">
            <el-table-column label="通过" prop="num1" align="center" />
            <el-table-column label="不通过" prop="num2" align="center" />
            <el-table-column label="审核通过率" prop="num3" align="center" />
          </el-table-column>
          <el-table-column
            prop="num4"
            label="待审核"
            width="200"
            align="center"
          />
          <el-table-column
            prop="num5"
            label="审核率"
            width="200"
            align="center"
          />
          <el-table-column
            prop="time"
            label="审核通过时间"
            width="200"
            align="center"
          />
        </el-table>
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
      curIndex: 0,
      tableData: [
        {
          site: '北京市',
          num1: '1231',
          num2: '621',
          num3: '278',
          num4: '638',
          num5: '458',
          num6: '135',
          time: '2023-03-09 10:00'
        },
        {
          site: '上海市',
          num1: '952',
          num2: '682',
          num3: '862',
          num4: '395',
          num5: '185',
          num6: '675',
          time: '2023-03-09 10:00'
        },
        {
          site: '天津市',
          num1: '285',
          num2: '687',
          num3: '458',
          num4: '368',
          num5: '458',
          num6: '742',
          time: '2023-03-09 10:00'
        },
        {
          site: '河北省',
          num1: '247',
          num2: '765',
          num3: '573',
          num4: '148',
          num5: '697',
          num6: '358',
          time: '2023-03-09 10:00'
        },
        {
          site: '山西省',
          num1: '753',
          num2: '451',
          num3: '854',
          num4: '681',
          num5: '195',
          num6: '267',
          time: '2023-03-09 10:00'
        }
      ],
      tableData2: [
        {
          name: '得以培训机构',
          num1: '294',
          num2: '286',
          num3: '90%',
          num4: '98%',
          num5: '95%',
          num6: '4.9'
        },
        {
          name: '蓝天教育',
          num1: '395',
          num2: '381',
          num3: '92%',
          num4: '97%',
          num5: '96%',
          num6: '4.9'
        },
        {
          name: '得以培训机构',
          num1: '294',
          num2: '286',
          num3: '90%',
          num4: '98%',
          num5: '95%',
          num6: '4.9'
        },
        {
          name: '蓝天教育',
          num1: '395',
          num2: '381',
          num3: '92%',
          num4: '97%',
          num5: '96%',
          num6: '4.9'
        },
        {
          name: '得以培训机构',
          num1: '294',
          num2: '286',
          num3: '90%',
          num4: '98%',
          num5: '95%',
          num6: '4.9'
        },
        {
          name: '蓝天教育',
          num1: '395',
          num2: '381',
          num3: '92%',
          num4: '97%',
          num5: '96%',
          num6: '4.9'
        },
        {
          name: '得以培训机构',
          num1: '294',
          num2: '286',
          num3: '90%',
          num4: '98%',
          num5: '95%',
          num6: '4.9'
        },
        {
          name: '蓝天教育',
          num1: '395',
          num2: '381',
          num3: '92%',
          num4: '97%',
          num5: '96%',
          num6: '4.9'
        },
        {
          name: '得以培训机构',
          num1: '294',
          num2: '286',
          num3: '90%',
          num4: '98%',
          num5: '95%',
          num6: '4.9'
        },
        {
          name: '蓝天教育',
          num1: '395',
          num2: '381',
          num3: '92%',
          num4: '97%',
          num5: '96%',
          num6: '4.9'
        },
        {
          name: '得以培训机构',
          num1: '294',
          num2: '286',
          num3: '90%',
          num4: '98%',
          num5: '95%',
          num6: '4.9'
        },
        {
          name: '蓝天教育',
          num1: '395',
          num2: '381',
          num3: '92%',
          num4: '97%',
          num5: '96%',
          num6: '4.9'
        }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {
    // this.getNatureChart()
    // this.getNumChart()
    this.getTypeChart()
  },
  methods: {
    // 机构性质图表
    getNatureChart() {
      const chart = echarts.init(document.getElementById('natureChart'))
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 10
        },
        series: [
          {
            name: '',
            type: 'pie',
            center: ['30%', '50%'],
            radius: ['40%', '70%'],
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
              { value: 1048, name: '职业院校' },
              { value: 735, name: '技工院校' },
              { value: 580, name: '企业实训基地' },
              { value: 484, name: '普通高等院校' },
              { value: 300, name: '公办培训机构' }
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
        color: [
          '#3ca170',
          '#5470c6',
          '#91cd77',
          '#ef6567',
          '#f9c956',
          '#75bedc'
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
              { value: 843, name: '1次以下' },
              { value: 427, name: '1-4次' },
              { value: 138, name: '4-8次' },
              { value: 681, name: '8次以上' }
            ]
          }
        ]
      })
    },
    // 培训类型图表
    getTypeChart() {
      const chart = echarts.init(document.getElementById('typeChart'))
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
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
              { value: 951, name: '适应性培训' },
              { value: 168, name: '职业技能培训' },
              { value: 482, name: '创业培训' },
              { value: 357, name: '其他' }
            ]
          }
        ]
      })
    },
    // 选中机构
    changeSelect(index) {
      this.curIndex = index
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
    justify-content: center;
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
      margin-right: 100px;
    }
    .greenFont {
      color: #68cb21;
      margin-right: 100px;
    }
    .yello{
      color: #E78711;
    }
  }
  .chartBox {
    width: 100%;
    display: flex;
    .orgNum {
      flex: 1;
      margin-right: 20px;
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
        margin-top: 40px;
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
  .tableBox {
    margin: 30px 0;
    padding: 15px;
    border: 1px solid #ececec;
    border-radius: 10px;
    box-sizing: border-box;
    .tableData {
      margin-top: 20px;
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
