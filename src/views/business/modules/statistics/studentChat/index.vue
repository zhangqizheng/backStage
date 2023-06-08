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

    <!-- 图表 -->
    <el-row class="chartBox" :gutter="20">
      <el-col :span="4">
        <!-- 学员报名情况 -->
        <div class="orgNum">
          <div class="headerBox">
            <div class="headerStyle">
              <div class="line" />
              <div class="title">学员报名情况</div>
            </div>
          </div>
          <div class="orgChart">
            <div class="chartItem">
              <div class="itemChart">
                <div>
                  <span>跨省报名</span>
                  <el-progress
                    :percentage="10"
                    color="#0057bc"
                    style="flex: 1"
                    :show-text="false"
                    :stroke-width="20"
                  />
                  <span>100人</span>
                </div>
                <div>
                  <span>跨市报名</span>
                  <el-progress
                    :percentage="60"
                    color="#00d0b9"
                    style="flex: 1"
                    :show-text="false"
                    :stroke-width="20"
                  />
                  <span>600人</span>
                </div>
                <div>
                  <span>本地报名</span>
                  <el-progress
                    :percentage="30"
                    color="#00d466"
                    style="flex: 1"
                    :show-text="false"
                    :stroke-width="20"
                  />
                  <span>300人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <!-- 学员培训类型热度统计 -->
        <div class="numBox">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">学员培训类型热度统计</div>
          </div>
          <div id="numChart" style="width: 100%; height: 250px" />
        </div>
      </el-col>
      <el-col :span="4">
        <!-- 学员报名人数统计 -->
        <div class="numBox">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">学员报名人数统计</div>
          </div>
          <div id="natureChart" style="width: 100%; height: 250px" />
        </div>
      </el-col>
      <el-col :span="4">
        <!-- 报名学员学历统计
-->
        <div class="numBox">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">报名学员学历统计</div>
          </div>
          <div id="numChartTwo" style="width: 100%; height: 250px" />
        </div>
      </el-col>
    </el-row>

    <!-- 学员信息统计   -->
    <el-row class="chartBox" :gutter="20">
      <el-col :span="9">
        <div class="">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">学员信息统计  </div>
          </div>
          <div class="tableData">
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              :header-cell-style="{ background: '#F5F7FA' }"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column type="index" label="序号" width="60" align="center" />
              <el-table-column
                prop="site"
                label="地区名称"
                align="center"
              />
              <el-table-column prop="num1" label="男" align="center" />
              <el-table-column
                prop="num2"
                align="center"
                width="女"
                label="培训完成人数"
              />
              <el-table-column prop="num3" sortable align="center" label="总计" />
            </el-table></div>
        </div>
      </el-col>
      <el-col :span="9">
        <div>
          <div class="headerStyle">
            <div class="line" />
            <div class="title">学员培训项目热度统计</div>
          </div>
          <div class="tableData">
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              :header-cell-style="{ background: '#F5F7FA' }"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column type="index" label="序号" width="60" align="center" />
              <el-table-column
                prop="site"
                label="地区名称"
                align="center"
              />
              <el-table-column prop="num1" label="男" align="center" />
              <el-table-column
                prop="num2"
                align="center"
                width="女"
                label="培训完成人数"
              />
              <el-table-column prop="num3" sortable align="center" label="总计" />
            </el-table></div>
        </div>
      </el-col>
      <el-col :span="6" style="height:200px;padding: 0; border:none">
        <div class="tableBox" style=" margin-bottom: 20px;">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">学员培训时长统计</div>
          </div>
          <div class="tableData ">
            <el-table
              :data="tableData3"
              style="width: 100%; height: 160px; "
              max-height="180"
              :show-header="false"
              border
              :header-cell-style="{ background: '#F5F7FA' }"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column
                prop="site"
                style="height: 30px;"
                label="地区名称"
                align="center"
              />
              <el-table-column prop="num" height="20" label="男" style="height: 30px;" align="center" />
            </el-table>
          </div>
        </div>
        <div class="tableBox">
          <div class="headerStyle">
            <div class="line" />
            <div class="title">学员成果登记统计</div>
          </div>
          <div class="tableData ">
            <div class="list">
              <ul>
                <li>合格人数: 100</li>
                <li>合格率: 30%</li>
              </ul>
              <ul>
                <li>取证人数: 50</li>
                <li>取证率: 20%</li>
              </ul>
              <ul>
                <li>就业人数: 50</li>
                <li>就业率: 20%</li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

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
          num6: '135'
        },
        {
          site: '上海市',
          num1: '952',
          num2: '682',
          num3: '862',
          num4: '395',
          num5: '185',
          num6: '675'
        },
        {
          site: '上海市',
          num1: '952',
          num2: '682',
          num3: '862',
          num4: '395',
          num5: '185',
          num6: '675'
        },
        {
          site: '上海市',
          num1: '952',
          num2: '682',
          num3: '862',
          num4: '395',
          num5: '185',
          num6: '675'
        },
        {
          site: '天津市',
          num1: '285',
          num2: '687',
          num3: '458',
          num4: '368',
          num5: '458',
          num6: '742'
        },
        {
          site: '河北省',
          num1: '247',
          num2: '765',
          num3: '573',
          num4: '148',
          num5: '697',
          num6: '358'
        },
        {
          site: '山西省',
          num1: '753',
          num2: '451',
          num3: '854',
          num4: '681',
          num5: '195',
          num6: '267'
        }
      ],
      tableData3: [{
        site: '一个月以上',
        num: '30%'
      }, {
        site: '一个月以上',
        num: '30%'
      }, {
        site: '一个月以上',
        num: '30%'
      }, {
        site: '一个月以上',
        num: '30%'
      }],
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
    this.getNumChart('numChart')
    this.getNumChart('numChartTwo')
    this.getlintChart()
  },
  methods: {
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
          data: ['1', '2', '3', '4', '5', '6', '7'],
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
            data: [150, 230, 224, 218, 135, 147, 260],
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
    // 培训次数图表
    getNumChart(key) {
      const chart = echarts.init(document.getElementById(key))
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
      .pic img {
        width: 100px;
        height: 100px;
      }
      .data {
        height: 100%;
        padding: 16px 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
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
    }
  }
  .chartBox {
    width: 100%;
    display: flex;
    margin-top:20px ;
    .el-col-4{
      width: 25%;
      margin-left:10px ;
      margin-right:10px ;
    }
    .orgNum {
      flex: 2;
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
        margin-top:40px ;
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
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .list{
    ul{
      background: #c9d7eb;
      list-style-type:none;
      color: #1B65B9;
      font-weight: bold;
      line-height: 25px;
     li{
      width: 50%;
      display: inline-block;
     }
    }
    ul:nth-child(2){
      background: #e1eee9;
      color: #33B06E;
    }
    ul:nth-child(2){
      background: #fdf2ee ;
      color: #FA6D5B;
    }
  }
  .tableBox {
    padding: 15px;
    border: 1px solid #ececec;
    border-radius: 10px;
    box-sizing: border-box;
    .tableData {
      margin-top: 20px;
    }

  }
  .headerStyle {
    margin-bottom: 20px;
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
