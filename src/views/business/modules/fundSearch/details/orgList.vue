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
            <el-form-item label="机构名称">
              <el-input
                v-model="pageParam.title"
                placeholder="请输入机构名称"
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
          prop="orgName"
          label="机构名称"
          align="center"

          show-overflow-tooltip
        />
        <el-table-column
          prop="site"
          label="所属地区"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="price"
          label="资助金额总计（元）"
          width="170"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="number"
          label="培训计划（次数）"
          width="150"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="num"
          label="实际培训人数（人）"
          align="center"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column label="操作" width="160" align="center" fixed="right">
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
    <orgDetailList v-if="detailFlag" />
  </div>
</template>

<script>
// import { getOrgList } from '../api/index'
import cityData from '@/utils/cant.json'
import orgDetailList from './orgDetailList.vue'
export default {
  comments: { orgDetailList },
  // 传值
  props: {},
  data() {
    return {
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      pageTotal: 10,
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
          orgName: '哈尔滨市万通汽车职业培训学校有限公司',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '300000',
          number: '10',
          num: '368'
        },
        {
          orgName: '哈尔滨新大陆职业培训学校',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '300000',
          number: '10',
          num: '300'
        },
        {
          orgName: '哈尔滨实用技术职业技术学校',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '200000',
          number: '5',
          num: '200'
        },
        {
          orgName: '哈尔滨新华电脑职业技能培训学校有限公司',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '150000',
          number: '14',
          num: '150'
        },
        {
          orgName: '哈尔滨市万通汽车职业培训学校有限公司',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '260000',
          number: '10',
          num: '200'
        },
        {
          orgName: '哈尔滨市万通汽车职业培训学校有限公司',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '300000',
          number: '10',
          num: '368'
        },
        {
          orgName: '哈尔滨新大陆职业培训学校',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '300000',
          number: '10',
          num: '300'
        },
        {
          orgName: '哈尔滨实用技术职业技术学校',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '200000',
          number: '5',
          num: '200'
        },
        {
          orgName: '哈尔滨新华电脑职业技能培训学校有限公司',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '150000',
          number: '14',
          num: '150'
        },
        {
          orgName: '哈尔滨市万通汽车职业培训学校有限公司',
          site: '黑龙江省-哈尔滨市-道里区',
          price: '260000',
          number: '10',
          num: '200'
        }
      ],
      detailFlag: false
    }
  },
  created() {
    this.queryList()
    this.siteData = cityData
  },
  methods: {
    openOrgDialog(val) {
      this.$bus.$emit('detailVal', 1, val)
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
