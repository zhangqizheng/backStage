<template>
  <div class="homeBox">
    <!-- 查询 -->
    <div class="searchBox">
      <div class="itemBox">
        <div class="itemTitle">地区选择</div>
        <div class="item">
          <el-select v-model="queryForm.provinceCantId" clearable placeholder="请选择地区">
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
            v-model="queryForm.yearDate"
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
          <img src="@/assets/images/sp/index1.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>{{ formData.insitute }}</span>家</div>
          <div class="text">承办机构</div>
        </div>
      </div>
      <div class="item greenFont">
        <div class="pic">
          <img src="@/assets/images/sp/index2.png" alt="">
        </div>
        <div class="data">
          <div class="num"><span>{{ formData.gradenPlot }}</span>家</div>
          <div class="text">就业园地</div>
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
            <div class="title">机构统计</div>
          </div>
          <div class="select">
            <div
              v-for="(item, index) in selectList"
              :key="index"
              :class="curIndex === index ? 'active' : ''"
              @click="changeSelect(index)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
        <div class="orgChart">
          <div class="chartItem">
            <div class="chartTitle">机构级别统计</div>
            <div class="itemChart">
              <div>
                <span>省级</span>
                <el-progress
                  :percentage="getPercent(formData.provinceCount)"
                  color="#0057bc"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>{{ formData.provinceCount }}家</span>
              </div>
              <div>
                <span>市级</span>
                <el-progress
                  :percentage="getPercent(formData.cityCount)"
                  color="#00d0b9"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>{{ formData.cityCount }}家</span>
              </div>
              <div>
                <span>县级</span>
                <el-progress
                  :percentage="getPercent(formData.countryCount)"
                  color="#00d466"
                  style="flex: 1"
                  :show-text="false"
                  :stroke-width="20"
                />
                <span>{{ formData.countryCount }}家</span>
              </div>
            </div>
          </div>
          <div class="chartItem">
            <div class="chartTitle">机构性质统计</div>
            <div id="natureChart" style="width: 100%; height: 250px" />
          </div>
        </div>
      </div>
      <!-- 培训次数统计 -->
      <div class="numBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">培训次数统计</div>
        </div>
        <div id="numChart" style="width: 100%; height: 300px" />
      </div>
      <!-- 培训类型统计 -->
      <div class="typeBox">
        <div class="headerStyle">
          <div class="line" />
          <div class="title">培训类型统计</div>
        </div>
        <div id="typeChart" style="width: 100%; height: 300px" />
      </div>
    </div>
    <!-- 各地区机构情况统计 -->
    <div class="tableBox">
      <div class="headerStyle">
        <div class="line" />
        <div class="title">各地区机构情况统计</div>
      </div>
      <div class="tableData">
        <el-table :data="siteList" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          />
          <el-table-column
            prop="site"
            label="地区名称"
            width="200"
            align="center"
          />
          <el-table-column label="承训机构数" align="center">
            <el-table-column label="省级" prop="insituteProvinceCount" align="center" />
            <el-table-column label="市级" prop="insituteCityCount" align="center" />
            <el-table-column label="区级" prop="insituteCountryCount" align="center" />
          </el-table-column>
          <el-table-column label="就业园地数" align="center">
            <el-table-column label="省级" prop="gradenPlotProvinceCount" align="center" />
            <el-table-column label="市级" prop="gradenPlotCityCount" align="center" />
            <el-table-column label="区级" prop="gradenPlotCountryCount" align="center" />
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 机构整体情况统计 -->
    <div class="tableBox">
      <div class="headerStyle">
        <div class="line" />
        <div class="title">机构整体情况统计</div>
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
            prop="name"
            label="机构名称"
            align="center"
            width="220"
          />
          <el-table-column prop="num1" label="学员数" align="center" />
          <el-table-column
            prop="num2"
            align="center"
            width="120"
            label="培训完成人数"
          />
          <el-table-column prop="num3" sortable align="center" label="取证率" />
          <el-table-column prop="num4" sortable align="center" label="就业率" />
          <el-table-column prop="num5" sortable align="center" label="合格率" />
          <el-table-column prop="num6" align="center" label="评价分" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getCount, getAuthLevel, getNature, getTrain, getTrainType, getProvince } from './api/index'
export default {
  data() {
    return {
      siteVal: '',
      timeVal: '',
      queryForm: {},
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
          title: '承训机构',
          value: 'insitute'
        },
        {
          title: '就业园地',
          value: 'gradenPlot'
        }
      ],
      curIndex: 0,
      siteList: [],
      tableData: [
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
      ],
      formData: {},
      natureList: [],
      trainList: [],
      trainTypeList: []
    }
  },
  watch: {},
  created() {
    this.initData()
  },
  mounted() {
    setTimeout(() => {
      this.getNatureChart()
      this.getNumChart()
      this.getTypeChart()
    }, 500)
  },
  methods: {
    initData() {
      this.formData = {}
      const params = {
        ...this.queryForm,
        type: this.selectList[this.curIndex].value
      }
      // 机构数量统计
      getCount(this.queryForm).then(res => {
        this.formData = { ...res.data, ...this.formData }
      })
      // 机构级别统计
      getAuthLevel(params).then(res => {
        this.formData = { ...res.data, ...this.formData }
      })
      // 机构单位性质统计
      getNature(params).then(res => {
        this.natureList = res.data
      })
      // 机构培训次数统计
      getTrain(this.queryForm).then(res => {
        this.trainList = res.data
      })
      // 机构培训类型统计
      getTrainType(this.queryForm).then(res => {
        this.trainTypeList = res.data
      })
      getProvince(this.queryForm).then(res => {
        this.siteList = res.data
      })
      setTimeout(() => {
      })
    },
    // 机构性质图表
    getNatureChart() {
      const chart = echarts.init(document.getElementById('natureChart'))
      chart.setOption({
        tooltip: {
          trigger: 'item'
        },
        color: this.color,
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
            data: this.natureList
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
            data: this.trainList
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
        color: this.color,
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
            data: this.trainTypeList
          }
        ]
      })
    },
    // 获取百分比
    getPercent(val) {
      if (this.curIndex === 0) {
        const allNum = Number(this.formData.insitute)
        if (allNum) {
          const num = Math.round((Number(val) / allNum) * 100)
          return num
        }
      } else {
        const allNum = Number(this.formData.gradenPlot)
        if (allNum) {
          const num = Math.round((Number(val) / allNum) * 100)
          return num
        }
      }
    },
    // 选中机构
    changeSelect(index) {
      this.curIndex = index
      const params = {
        ...this.queryForm,
        type: this.selectList[this.curIndex].value
      }
      // 机构级别统计
      getAuthLevel(params).then(res => {
        this.formData.cityCount = res.data.cityCount
        this.formData.countryCount = res.data.countryCount
        this.formData.provinceCount = res.data.provinceCount
      })
      // 机构单位性质统计
      getNature(params).then(res => {
        this.natureList = res.data
        this.getNatureChart()
      })
    },
    // 查询
    searchData() {
      this.initData()
    },
    // 重置
    resetData() {
      this.queryForm = {}
      this.initData()
    }
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
        flex-direction: column;
        align-items: center;
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
    }
  }
  .chartBox {
    width: 100%;
    display: flex;
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
        .chartItem {
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
          width: 40%;
          margin-right: 20px;
          border-right: 1px solid #ececec;
          padding-right: 15px;
          box-sizing: border-box;
        }
        .chartItem:last-child {
          width: 60%;
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
