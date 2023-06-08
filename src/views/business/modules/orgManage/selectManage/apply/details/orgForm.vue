<template>
  <div class="product_edit">
    <goBack />
    <!-- 步骤条 -->
    <div class="stepBox">
      <el-steps :active="stepVal" align-center>
        <el-step title="机构信息" />
        <el-step title="培训信息" />
      </el-steps>
    </div>
    <!-- 机构信息 -->
    <div v-if="stepVal === 1" class="detailInfo">
      <div class="headTitle">机构信息</div>
      <el-form ref="ruleForm" label-width="130px" :model="formData">
        <el-row>
          <el-col :span="12">
            <el-form-item label="承训机构名称">
              <span>{{ formData.orgName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位性质">
              <span>{{ dictKeyMap.UNIT_PROPERTIES[formData.unitNature] }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所在地">
              <span>{{ formData.area }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培训类型">
              <span>{{ $getNewType(formData.trainType) }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="详细地址">
              <span>{{ formData.lxaddr }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一机构代码/社会信用代码">
              <span>{{ formData.uscc }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="独立法人">
              <span>{{ formData.legalName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <span>{{ formData.legalIdcard }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="可同时容纳最大培训人数">
              <span>{{ formData.holdMax }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮政编码">
              <span>{{ formData.postCode }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="建筑面积">
              <span>{{ formData.buildArea }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地面积">
              <span>{{ formData.floorArea }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="教室间数">
              <span>{{ formData.classRoom }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实训场地面积">
              <span>{{ formData.trainArea }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="餐厅容纳人数">
              <span>{{ formData.diningHoldMax }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="礼堂容纳人数">
              <span>{{ formData.hallHoldMax }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="高级职称教师人数">
              <span>{{ formData.seniorNum }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="教职工总数">
              <span>{{ formData.staffNum }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中级职工教师人数">
              <span>{{ formData.mediumNum }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 培训信息 -->
    <div v-else>
      <div class="headTitle">承训项目</div>
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
        <el-table-column prop="duration" label="培训时长/天" align="center" width="120" />
        <el-table-column prop="result" label="培训成果" align="center" show-overflow-tooltip />
        <el-table-column prop="jobDirection" label="就业创业方向" align="center" width="160" show-overflow-tooltip />
      </el-table>
      <!-- <div class="headTitle">证明材料</div> -->

      <div v-if="formData.insitutelogs && formData.insitutelogs.length" class="headTitle">
        历史审核结果
      </div>
      <div v-if="formData.insitutelogs" class="auditBox">
        <div
          v-for="(item, index) in formData.insitutelogs"
          :key="index"
          class="resultBox"
        >
          <div class="resultNum">审核情况{{ index + 1 }}</div>
          <div class="auditResult">
            <div class="result">
              审核{{ item.status === 1 ? "通过" : "不通过" }}
            </div>
            <div>{{ item.auditer }}</div>
            <div v-if="item.status === 2">原因：{{ item.comment }}</div>
            <div>{{ item.auditTime }}</div>
          </div>
        </div>
      </div>

      <div class="headTitle">审核结果</div>
      <el-form ref="resultForm" label-width="130px" :model="form" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核结果" prop="auditStatus">
              <el-select v-model="form.auditStatus" placeholder="请选择">
                <el-option
                  v-for="item in resultOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到期时间" prop="time">
              <el-date-picker
                v-model="form.expTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.auditStatus === '3'">
          <el-form-item label="审核不通过原因" prop="cause">
            <el-input
              v-model="form.comment"
              type="textarea"
              :rows="4"
              placeholder="请输入审核不通过原因"
            />
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: right">
      <el-button
        v-if="stepVal === 1"
        type="primary"
        size="small"
        @click="stepVal = 2"
      >下 一 步</el-button>
      <div v-else>
        <el-button size="small" @click="stepVal = 1">上 一 步</el-button>
        <el-button type="primary" size="small" @click="submitForm">完 成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrgDetail, auditOrg } from '../api/index'
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
    ruleForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        auditStatus: [{ required: true, message: '请选择审核结果', trigger: 'change' }],
        expTime: [{ required: true, message: '请选择到期时间', trigger: 'blur' }],
        comment: [{ required: true, message: '请输入审核不通过原因', trigger: 'change' }]
      },
      formData: {},
      form: {},
      stepVal: 1,
      resultOption: [
        {
          label: '审核通过',
          value: '2'
        },
        {
          label: '审核不通过',
          value: '3'
        }
      ]
    }
  },
  watch: {
    visible() {
      this.stepVal = 1
      this.form = {}
    }
  },
  created() {
    getOrgDetail({ id: this.ruleForm.id }).then(res => {
      if (res.status === 0) {
        this.formData = res.data
      }
    })
  },
  methods: {
    handleClose() {
      this.$emit('closeFindDialog')
    },
    // 新增提交
    submitForm() {
      this.$refs.resultForm.validate((valid) => {
        if (valid) {
          const params = { ...this.form }
          params.orgId = this.ruleForm.orgId
          params.id = this.ruleForm.id
          params.instanceId = this.formData.instanceId
          console.log(params)
          auditOrg(params).then(res => {
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.handleClose()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product_edit{
  padding: 20px;
  box-sizing: border-box;
  .stepBox{
    ::v-deep{
      .el-step__title{
        font-size: 12px;
      }
      .el-step__icon{
        width: 10px;
        height: 10px;
      }
      .el-step__icon-inner{
        display: none;
      }
      .el-step__line{
        top: 7px;
      }
    }
  }
}
</style>
