<template>
  <div>
    <goBack />
    <!-- 机构 -->
    <div class="contentBox">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="calc(100vh - 400px)"
      >
        <el-table-column type="index" width="50" align="center" />
        <el-table-column
          prop="trainTitle"
          label="培训计划标题"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="orgName"
          label="承训机构名称"
          align="center"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="price"
          label="培训预算（人/元）"
          width="150"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="maxNum"
          label="报名人数上限"
          width="130"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="num"
          label="实际报名人数"
          align="center"
          width="130"
          show-overflow-tooltip
        />
        <el-table-column
          prop="fund"
          label="拨款金额（元）"
          align="center"
          width="130"
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
      pageTotal: 5,
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
          trainTitle: '2023年退役军人职业技能培训',
          price: '3000',
          maxNum: '400',
          num: '368',
          fund: '200000'
        },
        {
          orgName: '哈尔滨实用技术职业技术学校',
          trainTitle: '退役军人职业技能提升行动计划',
          price: '2000',
          maxNum: '200',
          num: '167',
          fund: '100000'
        },
        {
          orgName: '哈尔滨市万通汽车职业培训学校有限公司',
          trainTitle: '电子商务直播创业培训班',
          price: '6000',
          maxNum: '300',
          num: '284',
          fund: '400000'
        },
        {
          orgName: '哈尔滨实用技术职业技术学校',
          trainTitle: '观光农业（民宿）创业培训班',
          price: '2000',
          maxNum: '200',
          num: '153',
          fund: '100000'
        },
        {
          orgName: '哈尔滨实用技术职业技术学校',
          trainTitle: '新媒体人才及创客能力提升培训',
          price: '4000',
          maxNum: '300',
          num: '203',
          fund: '150000'
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
      this.$bus.$emit('detailVal', 2, val)
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
