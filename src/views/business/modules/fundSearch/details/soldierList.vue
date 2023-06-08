<template>
  <div>
    <div class="g-filter">
      <el-form ref="formInline" :model="pageParam" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="地区">
              <el-cascader
                v-model="pageParam.area"
                :options="siteData"
                :props="siteProps"
                placeholder="请选择所在地"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input
                v-model="pageParam.name"
                placeholder="请输入姓名"
                clear
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="pageParam.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div style="float: right; margin-bottom: 20px">
              <el-button
                type="primary"
                icon="el-icon-search"
                size="small"
                @click="queryListByCriteria"
              >查询</el-button>
              <el-button
                type="info"
                icon="el-icon-refresh"
                size="small"
                @click="resetQuery"
              >重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 机构 -->
    <div class="contentBox">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="calc(100vh - 450px)"
      >
        <el-table-column type="index" width="50" align="center" />
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="code"
          label="身份证号"
          align="center"
          width="220"
          show-overflow-tooltip
        />
        <el-table-column
          prop="phone"
          label="手机号"
          width="170"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="price"
          label="资助金额（元）"
          width="150"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="trainName"
          label="培训计划名称"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="60" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button-group class="tab-button-group">
              <el-link
                type="primary"
                @click="openOrgDialog(scope.row)"
              >查看</el-link>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        class="g-pagination"
        layout="total, sizes, prev, pager, next"
        :total="pageTotal"
        :current-page="pageParam.page + 1"
        :page-size="pageParam.pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import { getOrgList } from '../api/index'
import cityData from '@/utils/cant.json'
export default {
  // 传值
  props: {},
  data() {
    return {
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      pageTotal: 7,
      // 所在地数据
      siteData: [],
      siteProps: {
        label: 'cantName',
        value: 'cantId',
        children: 'children'
      },
      // 机构查询结果
      tableData: [
        {
          name: '王正',
          code: '140*************2823',
          phone: '13938283849',
          price: '600',
          trainName: '2023年退役军人职业技能培训'
        },
        {
          name: '李磊',
          code: '142*************0918',
          phone: '13827374913',
          price: '200',
          trainName: '退役军人特色培训班'
        },
        {
          name: '李时芳',
          code: '140*************4837',
          phone: '13967542381',
          price: '500',
          trainName: '退役军人无人机驾驶员培训'
        },
        {
          name: '史弘',
          code: '142*************2684',
          phone: '13261655523',
          price: '200',
          trainName: '退役军人特色培训班'
        },
        {
          name: '张丽',
          code: '140*************9157',
          phone: '13567829034',
          price: '500',
          trainName: '2023年退役军人职业技能培训'
        },
        {
          name: '袁时',
          code: '142*************2674',
          phone: '13872637182',
          price: '400',
          trainName: '退役军人职业技能提升行动计划'
        },
        {
          name: '李青青',
          code: '140*************0357',
          phone: '13976522831',
          price: '300',
          trainName: '专业教育培训'
        }
      ]
    }
  },
  created() {
    this.queryList()
    this.siteData = cityData
  },
  methods: {
    openOrgDialog(val) {
      this.$bus.$emit('detailVal', 3, val)
    },
    // 获取列表数据
    queryList() {

    },
    // 每页数变化
    handleSizeChange(pageSize) {
      this.pageParam.page = 0
      this.pageParam.pageSize = pageSize
      this.queryList()
    },
    // 页码变化
    handleCurrentChange(currentPage) {
      this.pageParam.page = currentPage - 1
      this.queryList()
    },
    // 重置查询
    resetQuery() {
      this.pageParam = {}
      this.pageParam.page = 0
      this.pageParam.pageSize = 10
      this.queryList()
    },
    // 查询按钮
    queryListByCriteria() {
      this.pageParam.page = 0
      this.queryList()
    }
  }
}
</script>
<style lang="scss">
</style>
