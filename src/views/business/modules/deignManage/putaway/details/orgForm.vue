<template>
  <div class="product_edit">
    <goBack />
    <div v-loading="loadingFlag">
      <!-- 步骤条 -->
      <div class="stepBox">
        <el-steps :active="stepVal" align-center>
          <el-step title="机构信息" />
          <el-step title="培训信息" />
        </el-steps>
      </div>
      <div class="levelBox">
        <div class="title">认定等级</div>
        <div>
          <el-radio-group v-model="formData.authLevel">
            <el-radio
              v-for="(item, index) in dictMap.ORG_LEVEL"
              :key="index"
              :label="item.dictValue"
              :disabled="detailVal === 3"
            >{{ item.dictLabel }}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!-- 机构信息 -->
      <div v-show="stepVal === 1" class="detailInfo">
        <div class="headTitle">机构信息</div>
        <el-form
          ref="formData"
          label-width="130px"
          :model="formData"
          :rules="formRules"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="承训机构名称" prop="orgName">
                <el-input
                  v-model="formData.orgName"
                  placeholder="请输入承训机构名称"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单位性质" prop="unitNature">
                <el-select
                  v-model="formData.unitNature"
                  placeholder="请选择单位性质"
                  :disabled="detailVal === 3"
                >
                  <el-option
                    v-for="item in dictMap.UNIT_PROPERTIES"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所在地" prop="areaArr">
                <el-cascader
                  v-model="formData.areaArr"
                  :options="siteData"
                  :props="siteProps"
                  placeholder="请选择所在地"
                  :disabled="detailVal === 3"
                  @change="handleChange"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训类型" prop="trainType">
                <el-select
                  v-model="formData.trainType"
                  placeholder="请选择培训类型"
                  :disabled="detailVal === 3"
                >
                  <el-option
                    v-for="item in shamData.trainOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="详细地址" prop="lxaddr">
                <el-input
                  v-model="formData.lxaddr"
                  placeholder="请输入详细地址"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统一机构代码/社会信用代码" prop="uscc">
                <el-input
                  v-model="formData.uscc"
                  placeholder="请输入统一机构代码/社会信用代码"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="独立法人" prop="legalName">
                <el-input
                  v-model="formData.legalName"
                  placeholder="请输入独立法人"
                  clearable
                  :disabled="detailVal === 3"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="legalIdcard">
                <el-input
                  v-model="formData.legalIdcard"
                  placeholder="请输入身份证号"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="邮政编码" prop="postCode">
                <el-input
                  v-model="formData.postCode"
                  placeholder="请输入邮政编码"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="到期时间" prop="expTime">
                <el-date-picker
                  v-model="formData.expTime"
                  :disabled="detailVal === 3"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择到期时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="headTitle">场地信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="可同时容纳最大培训人数" prop="holdMax">
                <el-input
                  v-model="formData.holdMax"
                  placeholder="请输入可同时容纳最大培训人数"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="占地面积" prop="floorArea">
                <el-input
                  v-model="formData.floorArea"
                  placeholder="请输入占地面积"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="建筑面积" prop="buildArea">
                <el-input
                  v-model="formData.buildArea"
                  placeholder="请输入建筑面积"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实训场地面积" prop="trainArea">
                <el-input
                  v-model="formData.trainArea"
                  placeholder="请输入实训场地面积"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="教室间数" prop="classRoom">
                <el-input
                  v-model="formData.classRoom"
                  placeholder="请输入教室间数"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="礼堂容纳人数" prop="hallHoldMax">
                <el-input
                  v-model="formData.hallHoldMax"
                  placeholder="请输入礼堂容纳人数"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="餐厅容纳人数" prop="diningHoldMax">
                <el-input
                  v-model="formData.diningHoldMax"
                  placeholder="请输入餐厅容纳人数"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="headTitle">师资信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="高级职称教师人数" prop="seniorNum">
                <el-input
                  v-model="formData.seniorNum"
                  placeholder="请输入高级职称教师人数"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教职工总数" prop="staffNum">
                <el-input
                  v-model="formData.staffNum"
                  placeholder="请输入教职工总数"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="中级职工教师人数" prop="mediumNum">
                <el-input
                  v-model="formData.mediumNum"
                  placeholder="请输入中级职工教师人数"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 培训信息 -->
      <div v-show="stepVal === 2">
        <div class="headTitle hasBtn">
          <div>承训项目</div>
          <div v-if="detailVal !== 3">
            <el-button
              type="primary"
              size="small"
              @click="changeProject({}, 1)"
            >新增承训项目</el-button>
          </div>
        </div>
        <el-table :data="formData.trains" border style="width: 100%">
          <el-table-column type="index" width="50" align="center" />
          <el-table-column
            prop="name"
            label="承训项目"
            width="180"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="price"
            label="培训价格/人"
            width="120"
            align="center"
          />
          <el-table-column
            prop="duration"
            label="培训时长/天"
            align="center"
            width="120"
          />
          <el-table-column
            prop="result"
            label="培训成果"
            align="center"
            show-overflow-tooltip
          />
          <el-table-column
            prop="jobDirection"
            label="就业创业方向"
            align="center"
            width="160"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="detailVal !== 3"
            label="操作"
            width="120"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button-group class="tab-button-group">
                <el-link
                  type="primary"
                  @click="changeProject(scope.row, 2, scope.$index)"
                >编辑</el-link>
                <el-link
                  type="primary"
                  @click="delProject(scope.$index)"
                >删除</el-link>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          class="g-pagination"
          layout="total, sizes, prev, pager, next"
          :total="formData.trains.length"
          :current-page="pageParam.page + 1"
          :page-size="pageParam.pageSize"
          :page-sizes="[5, 10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <!-- <div class="headTitle">证明材料</div> -->

        <div class="fileBox">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :disabled="detailVal === 3"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              支持word、excel、pdf格式文件以及png、jpg格式图片
            </div>
          </el-upload>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button
          v-if="stepVal === 1"
          type="primary"
          size="small"
          @click="goNext()"
        >下 一 步</el-button>
        <div v-else>
          <el-button size="small" @click="stepVal = 1">上 一 步</el-button>
          <el-button
            v-if="detailVal !== 3"
            type="primary"
            size="small"
            @click="submitForm"
          >完 成</el-button>
        </div>
      </div>
    </div>

    <!-- 新增承训项目弹窗 -->
    <el-dialog title="提示" :visible.sync="projectFlag" width="50%">
      <el-form
        ref="projectForm"
        label-width="150px"
        :model="projectForm"
        :rules="projectRules"
      >
        <el-form-item label="承训项目" prop="name">
          <el-input
            v-model="projectForm.name"
            placeholder="请输入承训项目"
            clearable
          />
        </el-form-item>
        <el-form-item label="培训价格（人/元）" prop="price">
          <el-input
            v-model="projectForm.price"
            placeholder="请输入培训价格（人/元）"
            clearable
          />
        </el-form-item>
        <el-form-item label="培训时长（天）" prop="duration">
          <el-input
            v-model="projectForm.duration"
            placeholder="请输入培训时长（天）"
            clearable
          />
        </el-form-item>
        <el-form-item label="培训成果" prop="result">
          <el-input
            v-model="projectForm.result"
            placeholder="请输入培训成果"
            clearable
          />
        </el-form-item>
        <el-form-item label="就业（创业）方向" prop="jobDirection">
          <el-input
            v-model="projectForm.jobDirection"
            placeholder="请输入就业（创业）方向"
            clearable
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel()">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="projectSave()"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrgInfo,
  addOrgData,
  updateOrgData
} from '../api/index'
import cityData from '@/utils/cant.json'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: true
    },
    detailVal: {
      type: Number,
      default: 0
    },
    detailId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 所在地数据
      siteData: [],
      siteProps: {
        label: 'cantName',
        value: 'cantId',
        children: 'children'
      },
      // 机构信息校验
      formRules: {
        orgName: [
          { required: true, message: '请输入承训机构名称', trigger: 'blur' }
        ],
        unitNature: [
          { required: true, message: '请选择单位性质', trigger: 'change' }
        ],
        trainType: [
          { required: true, message: '请选择培训类型', trigger: 'change' }
        ],
        areaArr: [{ required: true, message: '请选择所在地', trigger: 'change' }],
        lxaddr: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        uscc: [
          {
            required: true,
            message: '请输入统一机构代码/社会信用代码',
            trigger: 'blur'
          }
        ],
        legalName: [
          { required: true, message: '请输入独立法人', trigger: 'blur' }
        ],
        legalIdcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        expTime: [
          { required: true, message: '请选择到期时间', trigger: 'change' }
        ]
      },
      // 承训项目校验
      projectRules: {
        name: [
          { required: true, message: '请输入承训项目名称', trigger: 'blur' }
        ],
        duration: [
          { required: true, message: '请输入培训时长（天）', trigger: 'blur' }
        ],
        price: [
          {
            required: true,
            message: '请输入培训价格（人/元）',
            trigger: 'blur'
          }
        ],
        result: [
          { required: true, message: '请输入培训成果', trigger: 'blur' }
        ],
        jobDirection: [
          {
            required: true,
            message: '请输入就业（创业）方向',
            trigger: 'blur'
          }
        ]
      },
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      // 承训项目弹窗
      projectFlag: false,
      // 承训项目数据
      projectForm: {},
      // 步骤条数据
      stepVal: 1,
      // 详情数据
      formData: {
        trains: []
      },
      loadingFlag: true,
      projectVal: 0,
      projectIndex: 0
    }
  },
  created() {
    if (this.detailVal === 1) {
      this.formData = {
        trains: []
      }
      this.loadingFlag = false
    } else {
      getOrgInfo({ id: this.detailId }).then((res) => {
        console.log(res)
        if (res.status === 0) {
          this.formData = res.data
          this.formData.areaArr = [res.data.provinceCantId, res.data.cityCantId, res.data.countryCantId]
          this.loadingFlag = false
        }
      })
    }
    this.siteData = cityData
  },
  methods: {
    // 新增提交
    submitForm() {
      this.$refs.formData.validate((valid) => {
        console.log(valid)
        if (valid) {
          delete this.formData.areaArr
          if (this.detailVal === 1) {
            addOrgData(this.formData).then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                this.$bus.$emit('goBack')
              } else {
                this.$message.error(res.msg)
              }
            })
          } else if (this.detailVal === 2) {
            updateOrgData(this.formData).then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$bus.$emit('goBack')
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
    // 承训项目保存
    projectSave() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          if (
            this.projectVal === 1
          ) {
            this.formData.trains.push(this.projectForm)
          } else {
            this.$set(this.formData.trains, this.projectIndex, this.projectForm)
          }
          this.projectFlag = false
          this.projectForm = {}
        } else {
          return false
        }
      })
    },
    // 获取选中城市
    handleChange(val) {
      console.log(val)
      this.formData.provinceCantId = val[0]
      this.formData.cityCantId = val[1]
      this.formData.countryCantId = val[2]
      console.log(this.formData)
    },
    // 删除承训项目
    delProject(index) {
      this.formData.trains.splice(index, 1)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
    },
    // 下一步
    goNext() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.formData.authLevel) {
            console.log(this.formData)
            this.stepVal = 2
          } else {
            this.$message.error('请选择认定等级')
          }
        } else {
          return false
        }
      })
    },
    // 打开承训项目弹窗
    changeProject(row, val, index) {
      this.projectVal = val
      this.projectForm = JSON.parse(JSON.stringify(row))
      this.projectIndex = index
      this.projectFlag = true
    },
    // 关闭承训项目弹窗
    cancel() {
      this.projectFlag = false
      this.projectForm = {}
    },
    // 每页数变化
    handleSizeChange(pageSize) {
      this.pageParam.page = 0
      this.pageParam.pageSize = pageSize
      this.getProjectList()
    },
    // 页码变化
    handleCurrentChange(currentPage) {
      this.pageParam.page = currentPage - 1
      this.getProjectList()
    },
    // 重置查询
    resetQuery() {
      this.pageParam = {}
      this.pageParam.page = 0
      this.pageParam.pageSize = 10
      this.getProjectList()
    },
    // 查询按钮
    queryListByCriteria() {
      this.pageParam.page = 0
      this.getProjectList()
    }
  }
}
</script>

<style lang="scss" scoped>
.product_edit {
  padding: 20px;
  box-sizing: border-box;
  .hasBtn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .levelBox{
    display: flex;
    align-items: center;
    margin-top: 20px;
    .title{
      margin-right: 20px;
    }
  }
  .lint {
    width: 100%;
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    padding-left: 62px;
    box-sizing: border-box;
    .text {
      margin-right: 10px;
    }
    .val {
      flex: 1;
    }
  }
  .fileBox {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
  .stepBox {
    ::v-deep {
      .el-step__title {
        font-size: 12px;
      }
      .el-step__icon {
        width: 10px;
        height: 10px;
      }
      .el-step__icon-inner {
        display: none;
      }
      .el-step__line {
        top: 7px;
      }
    }
  }
  ::v-deep {
    .el-form-item__content {
      > div {
        width: 100%;
      }
    }
  }
}
</style>
