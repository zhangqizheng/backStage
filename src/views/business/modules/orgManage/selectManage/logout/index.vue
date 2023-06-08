<template>
  <div>
    <div v-if="!showOrgDialog && !showFieldDialog" class="g-box">
      <el-tabs v-model="tabVal">
        <el-tab-pane label="承训机构" name="1" />
        <el-tab-pane label="就业创业园地" name="2" />
      </el-tabs>
      <!-- 机构 -->
      <div v-show="tabVal === '1'" class="contentBox">
        <div class="g-filter">
          <!-- @keydown.enter.prevent @keyup.enter.native="queryList" -->
          <el-form ref="formInline" :model="pageParam" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="机构名称" prop="orgName">
                  <el-input
                    v-model="pageParam.orgName"
                    placeholder="请输入机构名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="统一机构代码/社会信用代码"
                  prop="uscc"
                  label-width="200px"
                >
                  <el-input
                    v-model="pageParam.uscc"
                    placeholder="请输入统一机构代码"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="5">
                <div style="float: right">
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="small"
                    :loading="loading"
                    @click="orgSearch"
                  >查询</el-button>
                  <el-button
                    type="info"
                    icon="el-icon-refresh"
                    size="small"
                    :loading="loading"
                    @click="resetQuery"
                  >重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-table
          ref="showTable"
          :data="orgData"
          stripe
          border
          style="width: 100%;"
          height="calc(100vh - 410px)"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            label="机构名称"
            prop="orgName"
            width="240"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="统一机构代码/社会信用代码"
            prop="uscc"
            width="200"
            align="center"
          />
          <el-table-column
            label="单位性质"
            prop="unitNature"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              {{ dictKeyMap.UNIT_PROPERTIES ? dictKeyMap.UNIT_PROPERTIES[scope.row.unitNature] : '' }}
            </template>
          </el-table-column>
          <el-table-column
            label="培训类型"
            prop="trainType"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              {{ dictKeyMap.YXPXLX ? dictKeyMap.YXPXLX[scope.row.trainType] : '' }}
            </template>
          </el-table-column>
          <el-table-column
            label="独立法人"
            prop="legalName"
            width="80"
            align="center"
          />
          <el-table-column
            label="机构账号"
            prop="orgId"
            show-overflow-tooltip
            width="110"
            align="center"
          />
          <el-table-column
            label="申请时间"
            prop="auditTime"
            show-overflow-tooltip
            width="180"
            align="center"
          />
          <el-table-column label="操作" width="60" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button-group class="tab-button-group">
                <el-link
                  type="primary"
                  @click="openOrgDialog(scope.row)"
                >审核</el-link>
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
      <!-- 园地 -->
      <div v-show="tabVal === '2'" class="contentBox">
        <div v-show="tabVal === '2'" class="g-filter">
          <!-- @keydown.enter.prevent @keyup.enter.native="queryList" -->
          <el-form ref="formInline" :model="pageParamField" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="园地名称" prop="gradenPlotName">
                  <el-input
                    v-model="pageParamField.gradenPlotName"
                    placeholder="请输入园地名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="统一机构代码/社会信用代码"
                  prop="uscc"
                  label-width="200px"
                >
                  <el-input
                    v-model="pageParamField.uscc"
                    placeholder="请输入统一机构代码"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="5" :offset="5">
                <div style="float: right">
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    size="small"
                    :loading="loading"
                    @click="fieldSearch"
                  >查询</el-button>
                  <el-button
                    type="info"
                    icon="el-icon-refresh"
                    size="small"
                    :loading="loading"
                    @click="resetQuery"
                  >重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-table
          ref="showTable"
          :data="fieldData"
          stripe
          border
          style="width: 100%;"
          height="calc(100vh - 410px)"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            label="园地名称"
            prop="gradenPlotName"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="园地统一社会信用代码"
            prop="uscc"
            width="200"
            align="center"
          />
          <el-table-column
            label="园地资产性质"
            prop="assetsNature"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              {{ dictKeyMap.UNIT_PROPERTIES ? dictKeyMap.UNIT_PROPERTIES[scope.row.assetsNature] : '' }}
            </template>
          </el-table-column>
          <el-table-column
            label="园地运营方式"
            prop="operateMode"
            width="120"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              {{ dictKeyMap.OPERATION_MODE ? dictKeyMap.OPERATION_MODE[scope.row.operateMode] : '' }}
            </template>
          </el-table-column>
          <el-table-column
            label="园地负责人"
            prop="gradenPlotFzr"
            width="100"
            align="center"
          />
          <el-table-column
            label="运营负责人"
            prop="operateFzr"
            width="100"
            align="center"
          />
          <el-table-column
            label="联系电话"
            prop="publicTel"
            show-overflow-tooltip
            width="110"
            align="center"
          />
          <el-table-column
            label="申请时间"
            prop="auditTime"
            show-overflow-tooltip
            width="180"
            align="center"
          />
          <el-table-column label="操作" width="60" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button-group class="tab-button-group">
                <el-link
                  type="primary"
                  @click="openFieldDialog(scope.row)"
                >审核</el-link>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          class="g-pagination"
          layout="total, sizes, prev, pager, next"
          :total="pageFieldTotal"
          :current-page="pageParamField.page + 1"
          :page-size="pageParamField.pageSize"
          :page-sizes="[5, 10, 20, 50, 100]"
          @size-change="handleSizeChangeField"
          @current-change="handleCurrentChangeField"
        />
      </div>
    </div>
    <!-- 机构审核 -->
    <orgForm
      v-if="showOrgDialog"
      :visible="showOrgDialog"
      :rule-form="ruleForm"
      @submitPopupData="submitPopupData"
      @closeFindDialog="closeOrgDialog"
    />

    <!-- 园地审核 -->
    <fieldForm
      v-if="showFieldDialog"
      :visible="showFieldDialog"
      :rule-form="ruleForm"
      @submitPopupData="submitPopupData"
      @closeFindDialog="closeFieldDialog"
    />
  </div>
</template>

<script>
import { getListData, getFieldListData } from './api/index.js'
import orgForm from './details/orgForm'
import fieldForm from './details/fieldForm'
export default {
  components: { orgForm, fieldForm },
  data() {
    return {
      tableItem: {},
      drawerTitle: '', // 详情title
      childVisible: false, // 详情状态
      dialogTitle: '',
      showOrgDialog: false, // 默认隐藏
      showFieldDialog: false, // 默认隐藏
      // 正在查询
      loading: false,
      // 按钮权限
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      pageParamField: {
        page: 0,
        pageSize: 10
      },
      pageTotal: 0,
      pageFieldTotal: 0,
      ruleForm: {},
      // 查询结果
      orgData: [],
      // 查询结果
      fieldData: [],
      tabVal: '1'
    }
  },
  computed: {},
  watch: {
    // 这里监听dialogShow对象的变化
    showOrgDialog: {
      deep: true,
      handler(val) {
        if (val) {
          this.showOrgDialog = val
        }
      }
    },
    showFieldDialog: {
      deep: true,
      handler(val) {
        if (val) {
          this.showFieldDialog = val
        }
      }
    }
  },
  created() {
    this.$bus.$on('goBack', () => {
      this.showFieldDialog = false
      this.showOrgDialog = false
    })
    // this.queryList()
    // this.queryListField()
  },
  mounted() {},
  methods: {
    // 机构数据
    queryList() {
      // 机构数据
      getListData(this.pageParam)
        .then((res) => {
          console.log(res, '测试接口')
          if (res.status === 0) {
            this.orgData = res.data.rows
            this.pageTotal = res.data.totalCount
          }
        })
        .catch(() => {
          this.$message.error('服务器错误')
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 园地数据
    queryListField() {
      // 园地数据
      getFieldListData(this.pageParamField)
        .then((res) => {
          console.log(res, '测试接口')
          if (res.status === 0) {
            this.fieldData = res.data.rows
            this.pageFieldTotal = res.data.totalCount
          }
        })
        .catch(() => {
          this.$message.error('服务器错误')
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 打开机构审批
    openOrgDialog(row) {
      this.dialogTitle = '机构申请审核'
      this.showOrgDialog = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },
    // 打开园地审批
    openFieldDialog(row) {
      this.dialogTitle = '园地申请审核'
      this.showFieldDialog = true
      this.ruleForm = JSON.parse(JSON.stringify(row))
    },
    // 保存新增
    submitPopupData() {
      // 刷新列表接口
      this.queryList()
    },
    // 关闭弹出层
    closeOrgDialog() {
      this.showOrgDialog = false
    },
    // 关闭弹出层
    closeFieldDialog() {
      this.showFieldDialog = false
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
    // 每页数变化
    handleSizeChangeField(pageSize) {
      this.pageParamField.page = 0
      this.pageParamField.pageSize = pageSize
      this.queryListField()
    },
    // 页码变化
    handleCurrentChangeField(currentPage) {
      this.pageParamField.page = currentPage - 1
      this.queryListField()
    },
    // 详情打开
    details() {
      this.drawerTitle = '查看详情'
      this.childVisible = true
    },
    // 重置查询
    resetQuery() {
      this.pageParam = {}
      this.pageParamField = {}
      if (this.tabVal === '1') {
        this.orgSearch()
      } else {
        this.fieldSearch()
      }
    },
    // 查询按钮
    orgSearch() {
      this.pageParam.page = 0
      this.pageParam.pageSize = 10
      this.queryList()
    },
    // 查询按钮
    fieldSearch() {
      this.pageParamField.page = 0
      this.pageParamField.pageSize = 10
      this.queryListField()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
