<template>
  <div>
    <div v-if="!showOrgDialog && !showFieldDialog" class="g-box">
      <el-tabs v-model="tabVal">
        <el-tab-pane label="承训机构" name="1">
          <div class="g-filter">
            <el-form ref="formInline" :model="pageParam" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="机构名称">
                    <el-input
                      v-model="pageParam.orgName"
                      placeholder="请输入机构名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="统一机构代码/社会信用代码"
                    label-width="200px"
                  >
                    <el-input
                      v-model="pageParam.uscc"
                      placeholder="请输入统一机构代码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="机构状态" prop="orgStatus">
                    <el-select
                      v-model="pageParam.orgStatus"
                      clearable
                      placeholder="请选择机构状态"
                    >
                      <el-option
                        v-for="item in shamData.statusOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所在地">
                    <el-cascader
                      v-model="cityVal"
                      :options="siteData"
                      :props="siteProps"
                      @change="handleChange"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="培训类型">
                    <el-select
                      v-model="pageParam.trainType"
                      clearable
                      placeholder="请选择培训类型"
                    >
                      <el-option
                        v-for="item in dictMap.YXPXLX"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="公示状态">
                    <el-select
                      v-model="pageParam.publicStatus"
                      clearable
                      placeholder="请选择公示状态"
                    >
                      <el-option
                        v-for="item in shamData.publicityOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="认定等级">
                    <el-select
                      v-model="pageParam.authLevel"
                      clearable
                      placeholder="请选择认定等级"
                    >
                      <el-option
                        v-for="item in dictMap.ORG_LEVEL"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                  <div style="float: right">
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      size="small"
                      :loading="loading"
                      @click="queryListByCriteria"
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
          <div style="float: right; margin-bottom: 20px">
            <el-button
              type="primary"
              size="small"
              :loading="loading"
              @click="goDetail({}, 1)"
            >新增</el-button>
            <el-button
              size="small"
              :loading="loading"
              @click="importOrg"
            >导入</el-button>
            <el-button
              size="small"
              :loading="loading"
              @click="exportOrg"
            >导出/公示</el-button>
          </div>
          <!-- 机构 -->
          <div class="contentBox">
            <el-table
              ref="showTable"
              :data="tableData"
              stripe
              border
              style="width: 100%"
              height="calc(100vh - 520px)"
              @selection-change="handleSelectionOrg"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                type="index"
                label="序号"
                width="50"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="所在地"
                prop="area"
                width="100"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="认定等级"
                width="120"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ dictKeyMap.ORG_LEVEL?dictKeyMap.ORG_LEVEL[scope.row.authLevel]:scope.row.authLevel }}</span>
                </template>
              </el-table-column>
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
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="单位性质"
                width="120"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ dictKeyMap.UNIT_PROPERTIES?dictKeyMap.UNIT_PROPERTIES[scope.row.unitNature]:scope.row.unitNature }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="培训类型"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ shamData.trainMap[scope.row.trainType] }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="独立法人"
                prop="legalName"
                width="80"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="到期时间"
                prop="expTime"
                show-overflow-tooltip
                width="120"
                align="center"
              />
              <el-table-column
                label="机构状态"
                prop="orgStatus"
                show-overflow-tooltip
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ shamData.statusMap[scope.row.orgStatus] }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="公示状态"
                prop="publicStatus"
                show-overflow-tooltip
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{
                    shamData.publicityMap[scope.row.publicStatus]
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="370"
                align="center"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button-group class="tab-button-group">
                    <el-link
                      type="primary"
                      @click="goDetail(scope.row, 3)"
                    >查看</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.orgStatus === '3'"
                      @click="goDetail(scope.row, 2)"
                    >编辑</el-link>
                    <el-link
                      type="primary"
                      :disabled="
                        scope.row.orgStatus === '4' ||
                          scope.row.orgStatus === '3'
                      "
                      @click="delItem(scope.row)"
                    >删除</el-link>
                    <el-link
                      type="primary"
                      :disabled="
                        scope.row.orgStatus === '4' ||
                          scope.row.orgStatus === '3'
                      "
                      @click="openHandle(scope.row, 1)"
                    >解约</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.orgStatus === '3'"
                      @click="openHandle(scope.row, 2)"
                    >续约</el-link>
                    <el-link
                      type="primary"
                      @click="publicity(scope.row)"
                    >公示</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.orgStatus === '3'"
                      @click="openHandle(scope.row, 3)"
                    >注销</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.orgStatus === '3'"
                      @click="resetPass(scope.row)"
                    >重置密码</el-link>
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
        </el-tab-pane>
        <el-tab-pane label="就业创业园地" name="2">
          <div class="g-filter">
            <el-form
              ref="formInline"
              :model="pageParamField"
              label-width="100px"
            >
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="园地名称">
                    <el-input
                      v-model="pageParamField.gradenPlotName"
                      placeholder="请输入园地名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="统一机构代码/社会信用代码"
                    label-width="200px"
                  >
                    <el-input
                      v-model="pageParamField.uscc"
                      placeholder="请输入统一机构代码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="园地状态" prop="gradenPlotStatus">
                    <el-select
                      v-model="pageParamField.gradenPlotStatus"
                      clearable
                      placeholder="请选择园地状态"
                    >
                      <el-option
                        v-for="item in shamData.statusOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所在地">
                    <el-cascader
                      v-model="cityValField"
                      :options="siteData"
                      :props="siteProps"
                      @change="handleChangeField"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="公示状态">
                    <el-select
                      v-model="pageParamField.publicStatus"
                      clearable
                      placeholder="请选择公示状态"
                    >
                      <el-option
                        v-for="item in shamData.publicityOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="认定等级">
                    <el-select
                      v-model="pageParamField.authLevel"
                      clearable
                      placeholder="请选择认定等级"
                    >
                      <el-option
                        v-for="item in dictMap.ORG_LEVEL"
                        :key="item.dictValue"
                        :label="item.dictLabel"
                        :value="item.dictValue"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5" :offset="7">
                  <div style="float: right">
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      size="small"
                      :loading="loading"
                      @click="queryListByCriteriaField"
                    >查询</el-button>
                    <el-button
                      type="info"
                      icon="el-icon-refresh"
                      size="small"
                      :loading="loading"
                      @click="resetQueryField"
                    >重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div style="float: right; margin-bottom: 20px">
            <el-button
              type="primary"
              size="small"
              :loading="loading"
              @click="goDetailField({}, 1)"
            >新增</el-button>
            <el-button
              size="small"
              :loading="loading"
              @click="importField"
            >导入</el-button>
            <el-button
              size="small"
              :loading="loading"
              @click="exportField"
            >导出/公示</el-button>
          </div>
          <!-- 园地 -->
          <div class="contentBox">
            <el-table
              ref="showTable"
              :data="fieldData"
              stripe
              border
              style="width: 100%"
              height="calc(100vh - 470px)"
            >
              <el-table-column
                type="index"
                label="序号"
                width="50"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="所在地"
                prop="area"
                width="100"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="认定等级"
                width="120"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ dictKeyMap.ORG_LEVEL?dictKeyMap.ORG_LEVEL[scope.row.authLevel]:scope.row.authLevel }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="园地名称"
                prop="gradenPlotName"
                width="240"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="统一机构代码/社会信用代码"
                prop="uscc"
                width="200"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="园地资产性质"
                width="140"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{ dictKeyMap.NATURE_OF_ASSETS?dictKeyMap.NATURE_OF_ASSETS[scope.row.assetsNature]:scope.row.assetsNature }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="园地运营方式"
                width="120"
                show-overflow-tooltip
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ dictKeyMap.OPERATION_MODE?dictKeyMap.OPERATION_MODE[scope.row.operateMode]:scope.row.operateMode }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="园地负责人"
                prop="gradenPlotFzr"
                width="100"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="运营负责人"
                prop="operateFzr"
                width="100"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="联系电话"
                prop="gradenPlotTel"
                width="80"
                show-overflow-tooltip
                align="center"
              />
              <el-table-column
                label="到期时间"
                prop="expTime"
                show-overflow-tooltip
                width="120"
                align="center"
              />
              <el-table-column
                label="园地状态"
                show-overflow-tooltip
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{
                    shamData.statusMap[scope.row.gradenPlotStatus]
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="公示状态"
                show-overflow-tooltip
                width="100"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{
                    shamData.publicityMap[scope.row.publicStatus]
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="370"
                align="center"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button-group class="tab-button-group">
                    <el-link
                      type="primary"
                      @click="goDetailField(scope.row, 3)"
                    >查看</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.gradenPlotStatus === '3'"
                      @click="goDetailField(scope.row, 2)"
                    >编辑</el-link>
                    <el-link
                      type="primary"
                      :disabled="
                        scope.row.gradenPlotStatus === '4' ||
                          scope.row.gradenPlotStatus === '3'
                      "
                      @click="delItemField(scope.row)"
                    >删除</el-link>
                    <el-link
                      type="primary"
                      :disabled="
                        scope.row.gradenPlotStatus === '4' ||
                          scope.row.gradenPlotStatus === '3'
                      "
                      @click="openHandleField(scope.row, 1)"
                    >解约</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.gradenPlotStatus === '3'"
                      @click="openHandleField(scope.row, 2)"
                    >续约</el-link>
                    <el-link
                      type="primary"
                      @click="publicityField(scope.row)"
                    >公示</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.gradenPlotStatus === '3'"
                      @click="openHandleField(scope.row, 3)"
                    >注销</el-link>
                    <el-link
                      type="primary"
                      :disabled="scope.row.gradenPlotStatus === '3'"
                      @click="resetPassField(scope.row)"
                    >重置密码</el-link>
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 机构详情 -->
    <orgForm
      v-if="showOrgDialog"
      :visible="showOrgDialog"
      :detail-val="detailVal"
      :detail-id="detailId"
    />

    <!-- 园地详情 -->
    <fieldForm
      v-if="showFieldDialog"
      :visible="showFieldDialog"
      :detail-val="detailVal"
      :detail-id="detailId"
    />
    <!-- 解约、续约、注销弹窗 -->
    <el-dialog :title="handleTitle" :visible.sync="handleFlag" width="50%">
      <el-form
        ref="handleForm"
        label-width="150px"
        :model="handleForm"
        :rules="handleRules"
      >
        <!-- 解约 -->
        <div v-if="handleVal === 1">
          <el-form-item label="解约原因" prop="cancelCause">
            <el-input
              v-model="handleForm.cancelCause"
              type="textarea"
              :rows="4"
              placeholder="请输入解约原因"
              clearable
            />
          </el-form-item>
        </div>
        <!-- 续约 -->
        <div v-if="handleVal === 2">
          <el-form-item label="到期时间" prop="expTime">
            <el-date-picker
              v-model="handleForm.expTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择到期时间"
            />
          </el-form-item>
        </div>
        <!-- 注销 -->
        <div v-if="handleVal === 3">
          <el-form-item label="注销原因" prop="offCause">
            <el-input
              v-model="handleForm.offCause"
              type="textarea"
              :rows="4"
              placeholder="请输入注销原因"
              clearable
            />
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel()">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="handleConfig()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 导入 -->
    <el-dialog
      title="导入"
      :visible.sync="importFlag"
      width="40%"
    >
      <div class="uploadBox">
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          action=""
          accept=".xls,.xlsx"
          :http-request="UploadImage"
          :on-change="onChange"
          :auto-upload="false"
          :limit="1"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">
            <el-checkbox v-model="updateSupport" />
            <span>是否更新已经存在的用户数据</span>
          </div>
          <div slot="tip" class="el-upload__tip">
            <span>仅允许导入xls、xlsx格式文件。</span>
            <span class="importTemplate" @click="importTemplate()">下载模板</span>
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="UploadImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// const that = this
import {
  getOrgListData,
  delOrgData,
  resetOrgPassWord,
  renewalOrgData,
  cancelOrgData,
  offOrgData,
  publicOrgData,
  getListData,
  delData,
  resetPassWord,
  renewalData,
  cancelData,
  offData,
  publicData,
  importOrg
} from './api/index.js'
import orgForm from './details/orgForm'
import fieldForm from './details/fieldForm'
import cityData from '@/utils/cant.json'
import { download, downloadLeading } from '@/utils/downLoad'
export default {
  components: { orgForm, fieldForm },
  data() {
    return {
      // 详情状态
      showOrgDialog: false,
      showFieldDialog: false,
      // 标签值
      tabVal: '1',
      // 所在地
      cityVal: [],
      cityValField: [],
      // 正在查询
      loading: false,
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      pageParamField: {
        page: 0,
        pageSize: 10
      },
      // 所在地数据
      siteData: [],
      siteProps: {
        label: 'cantName',
        value: 'cantId',
        children: 'children'
      },
      // 机构查询结果
      tableData: [],
      // 园地查询结果
      fieldData: [],
      // 总条数
      pageTotal: 0,
      pageFieldTotal: 0,
      // 解约、续约、注销值
      handleVal: 0,
      // 解约、续约、注销数据
      handleForm: {},
      // 解约、续约、注销弹窗状态
      handleFlag: false,
      // 解约、续约、注销校验
      handleTitle: null,
      handleRules: {
        cancelTime: [
          { required: true, message: '请选择解约时间', trigger: 'change' }
        ],
        cancelCause: [
          { required: true, message: '请输入解约原因', trigger: 'blur' }
        ],
        expTime: [
          { required: true, message: '请选择续约时间', trigger: 'change' }
        ],
        offCause: [
          { required: true, message: '请输入注销原因', trigger: 'blur' }
        ]
      },
      importFlag: false,
      updateSupport: false,
      fileData: {},
      detailVal: 0,
      detailId: ''
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
    },
    tabVal(newVal) {
      if (newVal === '1') {
        this.queryList()
      } else {
        this.queryListField()
      }
    }
  },
  created() {
    this.$bus.$on('goBack', () => {
      this.showOrgDialog = false
      this.showFieldDialog = false
      this.tabVal = '1'
      // this.queryList()
    })
    // this.queryList()
    this.siteData = cityData
    // findBy({ page: 0, pageSize: 10 }).then((res) => {
    //   console.log(res)
    // })
  },
  methods: {
    // 选中导出
    handleSelectionOrg(e) {
      console.log(e)
    },
    // 续约、解约、注销确定
    handleConfig() {
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
          const idObj = {
            id: this.detailId
          }
          const params = { ...idObj, ...this.handleForm }
          console.log(params)
          if (this.tabVal === '1') {
            console.log('机构')
            if (this.handleVal === 1) {
              this.handleTitle = '解约'
              cancelOrgData(this.$qs.stringify(params)).then((res) => {
                if (res.status === 0) {
                  this.$message({
                    type: 'success',
                    message: '解约成功'
                  })
                  this.handleFlag = false
                  this.queryList()
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else if (this.handleVal === 2) {
              this.handleTitle = '续约'
              renewalOrgData(this.$qs.stringify(params)).then((res) => {
                if (res.status === 0) {
                  this.$message({
                    type: 'success',
                    message: '续约成功'
                  })
                  this.handleFlag = false
                  this.queryList()
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else if (this.handleVal === 3) {
              this.handleTitle = '注销'
              offOrgData(this.$qs.stringify(params)).then((res) => {
                if (res.status === 0) {
                  this.$message({
                    type: 'success',
                    message: '注销成功'
                  })
                  this.handleFlag = false
                  this.queryList()
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          } else {
            console.log('园地')
            if (this.handleVal === 1) {
              this.handleTitle = '解约'
              cancelData(this.$qs.stringify(params)).then((res) => {
                if (res.status === 0) {
                  this.$message({
                    type: 'success',
                    message: '解约成功'
                  })
                  this.handleFlag = false
                  this.queryListField()
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else if (this.handleVal === 2) {
              this.handleTitle = '续约'
              renewalData(this.$qs.stringify(params)).then((res) => {
                if (res.status === 0) {
                  this.$message({
                    type: 'success',
                    message: '续约成功'
                  })
                  this.handleFlag = false
                  this.queryListField()
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else if (this.handleVal === 3) {
              this.handleTitle = '注销'
              offData(this.$qs.stringify(params)).then((res) => {
                if (res.status === 0) {
                  this.$message({
                    type: 'success',
                    message: '注销成功'
                  })
                  this.handleFlag = false
                  this.queryListField()
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          }
        } else {
          return false
        }
      })
    },
    // 续约、解约、注销取消
    handleCancel() {
      this.handleForm = {}
      this.handleFlag = false
    },
    // 打开续约、解约、注销
    openHandle(row, val) {
      this.handleVal = val
      this.detailId = row.id

      this.handleForm = {}
      if (val === 1) {
        this.handleTitle = '解约'
      } else if (val === 2) {
        this.handleTitle = '续约'
      } else if (val === 3) {
        this.handleTitle = '注销'
      }
      this.handleFlag = true
    },
    // 获取列表数据
    queryList() {
      getOrgListData(this.pageParam)
        .then((res) => {
          console.log(res, '测试接口')
          if (res.status === 0) {
            this.tableData = res.data.rows
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
    // 获取选中城市
    handleChange(val) {
      console.log(val)
      this.pageParam.provinceCantId = val[0]
      this.pageParam.cityCantId = val[1]
      this.pageParam.countryCantId = val[2]
    },
    // 打开机构审批
    goDetail(row, val) {
      this.detailVal = val
      if (val !== 1) {
        this.detailId = row.id
      } else {
        this.detailId = ''
      }
      this.showOrgDialog = true
    },
    // 删除
    delItem(row) {
      delOrgData({ id: row.id }).then((res) => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.queryList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 重置密码
    resetPass(row) {
      this.$confirm('重置密码后，密码将恢复至初始状态, 是否继续?', '重置密码', {
        confirmButtonText: '确定重置',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resetOrgPassWord(this.$qs.stringify({ id: row.id })).then((res) => {
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '重置成功!'
              })
              this.queryList()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    // 公示
    publicity(row) {
      publicOrgData({ id: row.id }).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '公示成功'
          })
          this.queryList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 下载模板
    importTemplate() {
      if (this.tabVal === '1') {
        download('insitute/importTemplate', {}, '承训机构模板')
      } else {
        download('gradenplot/importTemplate', {}, '就业创业园地模板')
      }
    },
    UploadImage() {
      const fileObj = this.fileData
      // 创建文件流
      const formData = new FormData()
      formData.append('file', fileObj.raw)
      formData.append('updateSupport', this.updateSupport)
      console.log(formData, this.fileData)
      importOrg(formData).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '导入成功'
          })
          this.importFlag = false
          if (this.tabVal === '1') {
            this.queryList()
          } else {
            this.queryListField()
          }
        }
      })
    },
    onChange(file) {
      console.log(1, file)
      const str = file.name.substring(file.name.lastIndexOf('.') + 1)
      const isJPG = str === 'xls' || str === 'xlsx'
      console.log(isJPG)
      if (!isJPG) {
        this.$refs.upload.clearFiles()
        return this.$message.error('请上传xls、xlsx类型文件')
      } else {
        this.fileData = file
      }
    },
    // 机构导入
    importOrg() {
      this.updateSupport = false
      this.fileData = {}
      this.importFlag = true
    },
    // 机构导出
    exportOrg() {
      downloadLeading('insitute/export', this.pageParam, '承训机构')
    },
    // 园地导入
    importField() {
      this.updateSupport = false
      this.fileData = {}
      this.importFlag = true
    },
    // 园地导出
    exportField() {
      downloadLeading('gradenplot/export', this.pageParam, '就业创业园地')
    },
    cancel() {
      this.importFlag = false
      this.updateSupport = false
      this.$nextTick(() => {
        this.$refs.upload.clearFiles()
      })
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
      this.$refs.formInline.resetFields()
      this.pageParam.page = 0
      this.pageParam.pageSize = 10
      this.cityVal = ''
      this.queryList()
    },
    // 查询按钮
    queryListByCriteria() {
      this.pageParam.page = 0
      this.queryList()
    },

    // 续约、解约、注销确定
    handleConfigField() {
      this.$refs.handleForm.validate((valid) => {
        if (valid) {
          const idObj = {
            id: this.detailId
          }
          const params = { ...idObj, ...this.handleForm }
          console.log(params)
          if (this.handleVal === 1) {
            this.handleTitle = '解约'
            cancelData(this.$qs.stringify(params)).then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '解约成功'
                })
                this.handleFlag = false
                this.queryListField()
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if (this.handleVal === 2) {
            this.handleTitle = '续约'
            renewalData(this.$qs.stringify(params)).then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '续约成功'
                })
                this.handleFlag = false
                this.queryListField()
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if (this.handleVal === 3) {
            this.handleTitle = '注销'
            offData(this.$qs.stringify(params)).then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '注销成功'
                })
                this.handleFlag = false
                this.queryListField()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 续约、解约、注销取消
    handleCancelField() {
      this.handleForm = {}
      this.handleFlag = false
    },
    // 打开续约、解约、注销
    openHandleField(row, val) {
      this.handleVal = val
      this.detailId = row.id

      this.handleForm = {}
      if (val === 1) {
        this.handleTitle = '解约'
      } else if (val === 2) {
        this.handleTitle = '续约'
      } else if (val === 3) {
        this.handleTitle = '注销'
      }
      this.handleFlag = true
    },
    // 获取列表数据
    queryListField() {
      getListData(this.pageParamField)
        .then((res) => {
          console.log(res, '测试接口')
          if (res.status === 0) {
            this.fieldData = res.data.rows
            this.pageParamField.pageSize
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
    goDetailField(row, val) {
      this.detailVal = val
      if (val !== 1) {
        this.detailId = row.id
      } else {
        this.detailId = ''
      }
      this.showFieldDialog = true
    },
    // 获取选中城市
    handleChangeField(val) {
      console.log(val)
      this.pageParamField.provinceCantId = val[0]
      this.pageParamField.cityCantId = val[1]
      this.pageParamField.countryCantId = val[2]
    },
    // 删除
    delItemField(row) {
      delData({ id: row.id }).then((res) => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.queryListField()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 重置密码
    resetPassField(row) {
      this.$confirm('重置密码后，密码将恢复至初始状态, 是否继续?', '重置密码', {
        confirmButtonText: '确定重置',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resetPassWord(this.$qs.stringify({ id: row.id })).then((res) => {
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '重置成功!'
              })
              this.queryListField()
            } else {
              this.$message.error(res.msg)
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    // 公示
    publicityField(row) {
      publicData({ id: row.id }).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '公示成功'
          })
          this.queryList()
        } else {
          this.$message.error(res.msg)
        }
      })
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
    // 重置查询
    resetQueryField() {
      this.pageParamField.name = ''
      this.pageParamField.page = 0
      this.pageParamField.pageSize = 10
      this.queryListField()
    },
    // 查询按钮
    queryListByCriteriaField() {
      this.pageParamField.page = 0
      this.queryListField()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep{
  .importTemplate{
    color: #1B65B9;
    cursor: pointer;
  }
  .el-upload__tip{
    text-align: center;
    .el-checkbox{
      margin-right: 4px;
    }
  }
}
</style>
