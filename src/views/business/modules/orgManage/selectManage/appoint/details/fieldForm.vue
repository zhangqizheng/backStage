<template>
  <div class="product_edit">
    <goBack />
    <!-- 步骤条 -->
    <div class="stepBox">
      <el-steps :active="stepVal" align-center>
        <el-step title="园地信息" />
        <el-step title="就业绩效情况" />
        <el-step title="教育培训绩效情况" />
        <el-step title="孵化绩效情况" />
      </el-steps>
    </div>
    <!-- 机构信息 -->
    <div v-if="stepVal === 1" class="detailInfo">
      <div class="headTitle">园地信息</div>
      <el-form ref="ruleForm" label-width="200px" :model="formData">
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地名称">
              <span>{{ formData.gradenPlotName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培训类型">
              <span>{{ dictKeyMap.YXPXLX ? dictKeyMap.YXPXLX[formData.trainType] : '' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮政编码">
              <span>{{ formData.postCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地地址">
              <span>{{ formData.lxaddr }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地统一社会信用代码">
              <span>{{ formData.uscc }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地启用时间">
              <span>{{ formData.startTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="认定为省级示范园地时间">
              <span>{{ formData.affirmTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对外公开电话">
              <span>{{ formData.publicTel }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地占地面积（平方米）">
              <span>{{ formData.floorArea }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地建筑面积（平方米）">
              <span>{{ formData.buildArea }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="培训场所面积（平方米）">
              <span>{{ formData.trainArea }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就业场所面积（平方米）">
              <span>{{ formData.jobArea }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="孵化场所面积（平方米）">
              <span>{{ formData.hatchArea }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地资产总值（万元）">
              <span>{{ formData.assetsNum }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地运营方式">
              <span>{{ dictKeyMap.OPERATION_MODE ? dictKeyMap.OPERATION_MODE[formData.operateMode] : '' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地运营机构">
              <span>{{ formData.operateOrg }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地负责人">
              <span>{{ formData.gradenPlotFzr }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <span>{{ formData.publicTel }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="运营负责人">
              <span>{{ formData.operateFzr }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <span>{{ formData.publicTel }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地资产性质">
              <span>{{ dictKeyMap.NATURE_OF_ASSETS ? dictKeyMap.NATURE_OF_ASSETS[formData.assetsNature] : '' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="具备资质情况">
              <span>{{ formData.qualifyState }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="对退役军人特殊优惠情况">
              <span>{{ formData.discountState }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div class="headTitle">证明材料</div> -->

      <!-- <div class="fileBox">无</div> -->
      <div v-if="ruleForm.gtype === 1" class="headTitle">申请原因</div>
      <div v-if="ruleForm.gtype === 1" class="lint">
        <div class="text">解约原因</div>
        <div class="val">{{ formData.cancelCause }}</div>
      </div>
    </div>
    <!-- 就业绩效情况 -->
    <div v-else-if="stepVal === 2">
      <div class="headTitle">就业绩效情况（2018年7月-2022年12月）</div>
      <el-form ref="ruleForm" label-width="550px" :model="formData">
        <el-row>
          <el-form-item
            label="开展退役军人就业相关工作服务年限（包括2018年前）"
          >
            <span>{{ formData.serviceLife }}年</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="机构与接收退役军人就业的央企或大型国有企业建立战略合作伙伴关系数（个）"
          >
            <span>{{ formData.eeexPartnership }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="机构与国家级行业协会建立长期合作关系数（个）">
            <span>{{ formData.cniaPartnership }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="线上招聘平台">
            <span>{{ formData.orp }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="线上招聘平台发布职位数（个）">
            <span>{{ formData.orpPostJob }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="招聘服务合作企业数（个）">
            <span>{{ formData.rsp }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="提供就业岗位数量（个）">
            <span>{{ formData.provideJob }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="组织或参加招聘会数量（含地方和进军营）（次）">
            <span>{{ formData.joinJobs }}次</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="服务退役军人就业人数（人次/年）">
            <span>{{ formData.serviceEsJob }}人次</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="经退役军人事务部主管部门指定的第三方机构评估，退役军人就业满意度（%）"
          >
            <span>{{ formData.estimate }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="服务区域范围（个/省市）">
            <span>{{ formData.serviceAreaScope }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职业测评/就业指导人数（人）">
            <span>{{ formData.jobAssess }}人</span>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 教育培训绩效情况 -->
    <div v-else-if="stepVal === 3">
      <div class="headTitle">教育培训绩效情况（2018年7月-2022年12月）</div>
      <el-form ref="ruleForm" label-width="450px" :model="formData">
        <el-row>
          <el-form-item
            label="已实际开展过退役军人相关教育培训任务的承训人数（人次/年）"
          >
            <span>{{ formData.taskTrain }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="面向企业、学校和社会开展职业培训或技能培训的总人数"
          >
            <span>{{ formData.skllTrain }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="可提供教育培训类别数（学历培训、技能培训）（个）"
          >
            <span>{{ formData.proTrainType }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="课程承训专业数量（个）">
            <span>{{ formData.classSubject }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="具备线上培训平台或网络远程教育（是/否）">
            <span>{{ formData.trainPlaform }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="有合作关系的培训机构数（个）">
            <span>{{ formData.trainOrg }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="师生比">
            <span>{{ formData.fsRatio }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="高级职称教师比例（%）">
            <span>{{ formData.seniorTearchRatio }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="具有行业一线工作经历8年以上的教师比例（%）">
            <span>{{ formData.hjobTeacher }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="退役军人培训班次（个）">
            <span>{{ formData.trainClass }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="退役军人参加的课程数量（个）">
            <span>{{ formData.course }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职业技能证书取证率（%）">
            <span>{{ formData.gainCertRatio }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="培训结束后获得结业证书的比例（%）">
            <span>{{ formData.completeCertRatio }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="学员培训后就业率（%）">
            <span>{{ formData.trainJobRatio }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="就业与培训专业相关率（%）">
            <span>{{ formData.trainPcrRatio }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="培训后平均起薪水平（元/月）">
            <span>{{ formData.trainPay }}元</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="培训学员满意度（%）">
            <span>{{ formData.trainEstimate }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="见习基地个数（个）">
            <span>{{ formData.traineesBase }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="见习人数（人次）">
            <span>{{ formData.traineesPeople }}人次</span>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 孵化绩效情况 -->
    <div v-else-if="stepVal === 4">
      <div class="headTitle">孵化绩效情况（2018年7月-2022年12月）</div>
      <el-form ref="ruleForm" label-width="550px" :model="formData">
        <el-row>
          <el-form-item
            label="已运营年限（包括2018年前）"
          >
            <span>{{ formData.serviceLife }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="功能区设置（是否有会议室、路演中心及其他功能区域）"
          >
            <span>{{ formData.ribbonSet }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="具有创业苗圃（是/否）"
          >
            <span>{{ formData.isCyNursery }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="载体平台"
          >
            <span>{{ formData.carrierPlatform }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="服务平台"
          >
            <span>{{ formData.servicePlatform }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="金融平台（是否有对接金融服务的银行机构，是否有政府资金类政策对接等功能）"
          >
            <span>{{ formData.financePlatform }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="创业导师人数"
          >
            <span>{{ formData.cyTutor }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="孵化载体是否具备自有孵化基金"
          >
            <span>{{ formData.isHaveHatchFund }}</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵实体数（户）"
          >
            <span>{{ formData.finalEntities }}户</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵实体提供就业岗位数（个）"
          >
            <span>{{ formData.finalJobPost }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵退役军人创业实体数（个）"
          >
            <span>{{ formData.finalCyEntities }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵退役军人创业实体提供就业岗位数（个）"
          >
            <span>{{ formData.finalCyJobPost }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末孵化场所利用率（%）"
          >
            <span>{{ formData.finalSiteUsage }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="当期入孵实体孵化成功率（%）"
          >
            <span>{{ formData.curEntitySuccess }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="当期入孵实体到期出园率（%）"
          >
            <span>{{ formData.curEntityRestOut }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="组织开展创业服务活动数量"
          >
            <span>{{ formData.developCyService }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="入孵实体获得区、市、国家荣誉数"
          >
            <span>{{ formData.gainHonor }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="在园退役军人创业实体满意率（%）"
          >
            <span>{{ formData.inExEstimate }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="出园退役军人创业实体满意率（%）"
          >
            <span>{{ formData.outExEstimate }}%</span>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- 审核结果 -->
      <div class="headTitle">审核结果</div>
      <el-form ref="resultForm" label-width="130px" :model="form" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核结果" prop="auditStatus">
              <el-select v-model="form.auditStatus" placeholder="请选择审核结果">
                <el-option
                  v-for="item in resultOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="ruleForm.gtype === 2" :span="12">
            <el-form-item label="到期时间" prop="expTime">
              <el-date-picker
                v-model="form.expTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择到期时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.auditStatus === 3">
          <el-form-item label="审核不通过原因" prop="comment">
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
      <el-button v-if="stepVal !== 1" size="small" @click="--stepVal">上 一 步</el-button>
      <el-button
        v-if="stepVal !== 4"
        type="primary"
        size="small"
        @click="++stepVal"
      >下 一 步</el-button>
      <el-button
        v-if="stepVal === 4"
        type="primary"
        size="small"
        @click="submitForm"
      >完 成</el-button>
    </div>
  </div>
</template>

<script>
import { getFieldInfo, saveFieldData } from '../api/index'
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
          value: 2
        },
        {
          label: '审核不通过',
          value: 3
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
    console.log(11111111111, this.ruleForm)
    getFieldInfo({ id: this.ruleForm.id }).then(res => {
      if (res.status === 0) {
        this.formData = res.data
      }
    })
  },
  methods: {
    // 新增提交
    submitForm() {
      this.$refs.resultForm.validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.form.id = this.ruleForm.id
          saveFieldData(this.form).then(res => {
            if (res.status === 0) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.$bus.$emit('goBack')
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
    .val{
      flex: 1;
    }
  }
  .auditBox {
    padding: 0 20px;
    box-sizing: border-box;
    .resultBox {
      .resultNum {
        font-size: 15px;
      }
      .auditResult {
        padding: 10px 20px 30px 30px;
        box-sizing: border-box;
        font-size: 14px;
        > div {
          line-height: 24px;
          color: #777;
        }
        .result {
          color: #333;
        }
      }
    }
  }
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
