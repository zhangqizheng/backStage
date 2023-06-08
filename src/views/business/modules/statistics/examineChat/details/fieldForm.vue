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
      <el-form ref="ruleForm" label-width="120px" :model="formData">
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地名称">
              <span>{{ formData.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="培训类型">
              <span>{{ formData.type }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮政编码">
              <span>{{ formData.zipCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地地址">
              <span>{{ formData.site }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地统一社会信用代码">
              <span>{{ formData.code }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地启用时间">
              <span>{{ formData.time }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="认定为省级示范园地时间">
              <span>{{ formData.time }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="对外公开电话">
              <span>{{ formData.phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地占地面积（平方米）">
              <span>{{ formData.areaTwo }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地建筑面积（平方米）">
              <span>{{ formData.areaOne }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="培训场所面积（平方米）">
              <span>{{ formData.areaThree }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="就业场所面积（平方米）">
              <span>{{ formData.areaTwo }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="孵化场所面积（平方米）">
              <span>{{ formData.areaOne }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地资产总值（万元）">
              <span>{{ formData.price }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地运营方式">
              <span>{{ formData.way }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="园地运营机构">
              <span>{{ formData.name }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地负责人">
              <span>{{ formData.person }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <span>{{ formData.phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="运营负责人">
              <span>{{ formData.person }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <span>{{ formData.phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="园地资产性质">
              <span>{{ formData.nature }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="具备资质情况">
              <span>{{ formData.case }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="对退役军人特殊优惠情况">
              <span>{{ formData.discounts }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- <div class="headTitle">证明材料</div> -->

      <div class="headTitle">申请原因</div>
      <div class="lint">
        <div class="text">解约原因</div>
        <div class="val">本机构受疫情影响，暂时无力承担培训工作任务，特解除与退役军人事务部的合作。</div>
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
            <span>{{ formData.a }}年</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="机构与接收退役军人就业的央企或大型国有企业建立战略合作伙伴关系数（个）"
          >
            <span>{{ formData.b }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="机构与国家级行业协会建立长期合作关系数（个）">
            <span>{{ formData.c }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="线上招聘平台">
            <span>{{ formData.d }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="线上招聘平台发布职位数（个）">
            <span>{{ formData.e }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="招聘服务合作企业数（个）">
            <span>{{ formData.f }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="提供就业岗位数量（个）">
            <span>{{ formData.g }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="组织或参加招聘会数量（含地方和进军营）（次）">
            <span>{{ formData.h }}次</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="服务退役军人就业人数（人次/年）">
            <span>{{ formData.i }}人次</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="经退役军人事务部主管部门指定的第三方机构评估，退役军人就业满意度（%）"
          >
            <span>{{ formData.j }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="服务区域范围（个/省市）">
            <span>{{ formData.k }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职业测评/就业指导人数（人）">
            <span>{{ formData.l }}人</span>
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
            <span>{{ formData.l }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="面向企业、学校和社会开展职业培训或技能培训的总人数"
          >
            <span>{{ formData.i }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="可提供教育培训类别数（学历培训、技能培训）（个）"
          >
            <span>{{ formData.d }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="课程承训专业数量（个）">
            <span>{{ formData.c }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="具备线上培训平台或网络远程教育（是/否）">
            <span>是</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="有合作关系的培训机构数（个）">
            <span>{{ formData.f }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="师生比">
            <span>1:8</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="高级职称教师比例（%）">
            <span>{{ formData.h }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="具有行业一线工作经历8年以上的教师比例（%）">
            <span>{{ formData.c }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="退役军人培训班次（个）">
            <span>{{ formData.j }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="退役军人参加的课程数量（个）">
            <span>{{ formData.k }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职业技能证书取证率（%）">
            <span>{{ formData.c }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="培训结束后获得结业证书的比例（%）">
            <span>{{ formData.f }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="学员培训后就业率（%）">
            <span>{{ formData.e }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="就业与培训专业相关率（%）">
            <span>{{ formData.c }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="培训后平均起薪水平（元/月）">
            <span>{{ formData.l }}元</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="培训学员满意度（%）">
            <span>{{ formData.j }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="见习基地个数（个）">
            <span>{{ formData.c }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="见习人数（人次）">
            <span>{{ formData.h }}人次</span>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 孵化绩效情况 -->
    <div v-else-if="stepVal === 4">
      <div class="headTitle">孵化绩效情况（2018年7月-2022年12月）</div>
      <el-form ref="ruleForm" label-width="400px" :model="formData">
        <el-row>
          <el-form-item
            label="已运营年限（包括2018年前）"
          >
            <span>{{ formData.a }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="功能区设置（是否有会议室、路演中心及其他功能区域）"
          >
            <span>是</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="具有创业苗圃（是/否）"
          >
            <span>是</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="载体平台"
          >
            <span>多媒体运营平台</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="服务平台"
          >
            <span>法律服务、创业培训服务、融资服务</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="金融平台（是否有对接金融服务的银行机构，是否有政府资金类政策对接等功能）"
          >
            <span>是</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="创业导师人数"
          >
            <span>{{ formData.c }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="孵化载体是否具备自有孵化基金"
          >
            <span>是</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵实体数（户）"
          >
            <span>{{ formData.f }}户</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵实体提供就业岗位数（个）"
          >
            <span>{{ formData.c }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵退役军人创业实体数（个）"
          >
            <span>{{ formData.g }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末在孵退役军人创业实体提供就业岗位数（个）"
          >
            <span>{{ formData.j }}人</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="期末孵化场所利用率（%）"
          >
            <span>{{ formData.l }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="当期入孵实体孵化成功率（%）"
          >
            <span>{{ formData.l }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="当期入孵实体到期出园率（%）"
          >
            <span>{{ formData.l }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="组织开展创业服务活动数量"
          >
            <span>{{ formData.c }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="入孵实体获得区、市、国家荣誉数"
          >
            <span>{{ formData.d }}个</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="在园退役军人创业实体满意率（%）"
          >
            <span>{{ formData.j }}%</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item
            label="出园退役军人创业实体满意率（%）"
          >
            <span>{{ formData.k }}%</span>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- 审核结果 -->
      <div class="headTitle">审核结果</div>
      <el-form ref="resultForm" label-width="130px" :model="form" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核结果" prop="result">
              <el-select v-model="form.result" placeholder="请选择">
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
                v-model="form.time"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.result === 2">
          <el-form-item label="审核不通过原因" prop="cause">
            <el-input
              v-model="form.cause"
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
        result: [
          { required: true, message: '请选择审核结果', trigger: 'change' }
        ],
        time: [{ required: true, message: '请选择到期时间', trigger: 'blur' }],
        cause: [
          {
            required: true,
            message: '请输入审核不通过原因',
            trigger: 'change'
          }
        ]
      },
      formData: {
        name: '北京华图教育科技有限公司',
        type: '职业技能培训、创业培训',
        site: '北京市海淀区坤讯大厦',
        code: '2394884024389203',
        person: '王桑',
        time: '2020-09-27',
        zipCode: '100000',
        areaOne: '3238²',
        areaTwo: '2256²',
        areaThree: '3618²',
        price: '9000',
        nature: '国有',
        way: '自营',
        phone: '132****5523',
        case: '无',
        discounts: '免费参加自适应培训',
        a: '3',
        b: '35',
        c: '31',
        d: '3',
        e: '41',
        f: '6',
        g: '13',
        h: '36',
        i: '95163',
        j: '99',
        k: '34',
        l: '84367'
      },
      form: {},
      stepVal: 1,
      tableData: [
        {
          name: '心理咨询',
          price: '5000',
          time: '12',
          result:
            '这次在培训中我在感受着每一个参加人的变化，友好，互助，真诚的气氛愈来愈浓。我有幸成为这次成功培训中的一员。我会将学习中的启发带到工作中，生活中，并以行动感染身边的同事。更不会有辱公司的使命。我由衷的感谢公司为我们安排这次有益的学习，挑选了一支优秀的讲师队伍，挑选了一处有海的地方为我们拓展。我真诚的感谢每一位讲师为我们准备了一堂知识丰富、生动的课，真诚的感谢在背后默默我们服务的同事。',
          direction: '医院、工作室、教师'
        },
        {
          name: '心理咨询',
          price: '5000',
          time: '12',
          result:
            '这次在培训中我在感受着每一个参加人的变化，友好，互助，真诚的气氛愈来愈浓。我有幸成为这次成功培训中的一员。我会将学习中的启发带到工作中，生活中，并以行动感染身边的同事。更不会有辱公司的使命。我由衷的感谢公司为我们安排这次有益的学习，挑选了一支优秀的讲师队伍，挑选了一处有海的地方为我们拓展。我真诚的感谢每一位讲师为我们准备了一堂知识丰富、生动的课，真诚的感谢在背后默默我们服务的同事。',
          direction: '医院、工作室、教师'
        },
        {
          name: '心理咨询',
          price: '5000',
          time: '12',
          result:
            '这次在培训中我在感受着每一个参加人的变化，友好，互助，真诚的气氛愈来愈浓。我有幸成为这次成功培训中的一员。我会将学习中的启发带到工作中，生活中，并以行动感染身边的同事。更不会有辱公司的使命。我由衷的感谢公司为我们安排这次有益的学习，挑选了一支优秀的讲师队伍，挑选了一处有海的地方为我们拓展。我真诚的感谢每一位讲师为我们准备了一堂知识丰富、生动的课，真诚的感谢在背后默默我们服务的同事。',
          direction: '医院、工作室、教师'
        },
        {
          name: '心理咨询',
          price: '5000',
          time: '12',
          result:
            '这次在培训中我在感受着每一个参加人的变化，友好，互助，真诚的气氛愈来愈浓。我有幸成为这次成功培训中的一员。我会将学习中的启发带到工作中，生活中，并以行动感染身边的同事。更不会有辱公司的使命。我由衷的感谢公司为我们安排这次有益的学习，挑选了一支优秀的讲师队伍，挑选了一处有海的地方为我们拓展。我真诚的感谢每一位讲师为我们准备了一堂知识丰富、生动的课，真诚的感谢在背后默默我们服务的同事。',
          direction: '医院、工作室、教师'
        },
        {
          name: '心理咨询',
          price: '5000',
          time: '12',
          result:
            '这次在培训中我在感受着每一个参加人的变化，友好，互助，真诚的气氛愈来愈浓。我有幸成为这次成功培训中的一员。我会将学习中的启发带到工作中，生活中，并以行动感染身边的同事。更不会有辱公司的使命。我由衷的感谢公司为我们安排这次有益的学习，挑选了一支优秀的讲师队伍，挑选了一处有海的地方为我们拓展。我真诚的感谢每一位讲师为我们准备了一堂知识丰富、生动的课，真诚的感谢在背后默默我们服务的同事。',
          direction: '医院、工作室、教师'
        }
      ],
      resultOption: [
        {
          label: '审核通过',
          value: 1
        },
        {
          label: '审核不通过',
          value: 2
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
  mounted() {},
  methods: {
    resetForm() {
      this.$nextTick(() => {
        this.$refs.resultForm.resetFields()
      })
    },
    handleClose() {
      this.$emit('closeFindDialog')
      this.resetForm()
    },
    // 新增提交
    submitForm() {
      this.$refs.resultForm.validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.handleClose()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.product_edit {
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
}
</style>
