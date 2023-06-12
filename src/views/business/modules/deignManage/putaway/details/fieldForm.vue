<template>
  <div class="product_edit">
    <goBack />
    <div v-loading="loadingFlag">
      <!-- 步骤条 -->
      <div class="stepBox">
        <el-steps :active="stepVal" align-center>
          <el-step title="园地信息" />
          <el-step title="就业绩效情况" />
          <el-step title="教育培训绩效情况" />
          <el-step title="孵化绩效情况" />
        </el-steps>
      </div>
      <div class="headTitle">认定等级</div>
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
      <!-- 机构信息 -->
      <div v-if="stepVal === 1" class="detailInfo">
        <div class="headTitle">园地信息</div>
        <el-form ref="formData" label-width="200px" :model="formData" :rules="formRules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="园地名称" prop="gradenPlotName">
                <el-input
                  v-model="formData.gradenPlotName"
                  placeholder="请输入园地名称"
                  :disabled="detailVal === 3"
                  clearable
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
          <el-row>
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
              <el-form-item label="园地地址" prop="lxaddr">
                <el-input
                  v-model="formData.lxaddr"
                  placeholder="请输入园地地址"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
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
              <el-form-item label="园地统一社会信用代码" prop="uscc">
                <el-input
                  v-model="formData.uscc"
                  placeholder="请输入园地统一社会信用代码"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="园地启用时间" prop="startTime">
                <el-date-picker
                  v-model="formData.startTime"
                  :disabled="detailVal === 3"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择到期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="认定为省级示范园地时间" prop="affirmTime">
                <el-date-picker
                  v-model="formData.affirmTime"
                  :disabled="detailVal === 3"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择到期时间"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="对外公开电话" prop="publicTel">
                <el-input
                  v-model="formData.publicTel"
                  placeholder="请输入对外公开电话"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="园地资产性质" prop="assetsNature">
                <el-select
                  v-model="formData.assetsNature"
                  placeholder="请选择园地资产性质"
                  :disabled="detailVal === 3"
                >
                  <el-option
                    v-for="item in dictMap.NATURE_OF_ASSETS"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="园地运营方式" prop="operateMode">
                <el-select
                  v-model="formData.operateMode"
                  placeholder="请选择园地运营方式"
                  :disabled="detailVal === 3"
                >
                  <el-option
                    v-for="item in dictMap.OPERATION_MODE"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="园地运营机构">
                <el-input
                  v-model="formData.operateOrg"
                  placeholder="请输入园地运营机构"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="园地负责人">
                <el-input
                  v-model="formData.gradenPlotFzr"
                  placeholder="请输入园地负责人"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input
                  v-model="formData.gradenPlotTel"
                  placeholder="请输入联系电话"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="运营负责人">
                <el-input
                  v-model="formData.operateFzr"
                  placeholder="请输入运营负责人"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input
                  v-model="formData.operateTel"
                  placeholder="请输入联系电话"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="园地资产总值（万元）">
                <el-input
                  v-model="formData.assetsNum"
                  placeholder="请输入园地资产总值（万元）"
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
          <el-row>
            <el-col :span="12">
              <el-form-item label="园地占地面积（平方米）">
                <el-input
                  v-model="formData.floorArea"
                  placeholder="请输入园地占地面积（平方米）"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="园地建筑面积（平方米）">
                <el-input
                  v-model="formData.buildArea"
                  placeholder="请输入园地建筑面积（平方米）"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="培训场所面积（平方米）">
                <el-input
                  v-model="formData.trainArea"
                  placeholder="请输入培训场所面积（平方米）"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="就业场所面积（平方米）">
                <el-input
                  v-model="formData.jobArea"
                  placeholder="请输入就业场所面积（平方米）"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="孵化场所面积（平方米）">
                <el-input
                  v-model="formData.hatchArea"
                  placeholder="请输入园地名称"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="headTitle">其他信息</div>
          <el-row>
            <el-form-item label="具备资质情况">
              <el-input
                v-model="formData.qualifyState"
                placeholder="请输入具备资质情况"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="对退役军人特殊优惠情况">
              <el-input
                v-model="formData.discountState"
                placeholder="请输入对退役军人特殊优惠情况"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <div class="headTitle">账号信息</div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="账号" prop="account">
                <el-input
                  v-model="formData.account"
                  placeholder="请输入账号"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册手机号" prop="registerTel">
                <el-input
                  v-model="formData.registerTel"
                  placeholder="请输入注册手机号"
                  :disabled="detailVal === 3"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div class="headTitle">证明材料</div> -->

      </div>
      <!-- 就业绩效情况 -->
      <div v-else-if="stepVal === 2">
        <div class="headTitle">就业绩效情况（2018年7月-2022年12月）</div>
        <el-form ref="ruleForm" label-width="550px" :model="formData">
          <el-row>
            <el-form-item
              label="开展退役军人就业相关工作服务年限（包括2018年前）"
            >
              <el-input
                v-model="formData.jobServiceLife"
                placeholder="请输入开展退役军人就业相关工作服务年限（包括2018年前）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="机构与接收退役军人就业的央企或大型国有企业建立战略合作伙伴关系数（个）"
            >
              <el-input
                v-model="formData.eeexPartnership"
                placeholder="请输入机构与接收退役军人就业的央企或大型国有企业建立战略合作伙伴关系数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="机构与国家级行业协会建立长期合作关系数（个）">
              <el-input
                v-model="formData.cniaPartnership"
                placeholder="请输入机构与国家级行业协会建立长期合作关系数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="线上招聘平台">
              <el-input
                v-model="formData.orp"
                placeholder="请输入线上招聘平台"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="线上招聘平台发布职位数（个）">
              <el-input
                v-model="formData.orpPostJob"
                placeholder="请输入线上招聘平台发布职位数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="招聘服务合作企业数（个）">
              <el-input
                v-model="formData.rsp"
                placeholder="请输入招聘服务合作企业数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="提供就业岗位数量（个）">
              <el-input
                v-model="formData.provideJob"
                placeholder="请输入提供就业岗位数量（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="组织或参加招聘会数量（含地方和进军营）（次）">
              <el-input
                v-model="formData.joinJobs"
                placeholder="请输入组织或参加招聘会数量（含地方和进军营）（次）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="服务退役军人就业人数（人次/年）">
              <el-input
                v-model="formData.serviceEsJob"
                placeholder="请输入服务退役军人就业人数（人次/年）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="经退役军人事务部主管部门指定的第三方机构评估，退役军人就业满意度（%）"
            >
              <el-input
                v-model="formData.estimate"
                placeholder="请输入经退役军人事务部主管部门指定的第三方机构评估，退役军人就业满意度（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="服务区域范围（个/省市）">
              <el-input
                v-model="formData.serviceAreaScope"
                placeholder="请输入服务区域范围（个/省市）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="职业测评/就业指导人数（人）">
              <el-input
                v-model="formData.jobAssess"
                placeholder="请输入职业测评/就业指导人数（人）"
                :disabled="detailVal === 3"
                clearable
              />
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
              <el-input
                v-model="formData.taskTrain"
                placeholder="请输入已实际开展过退役军人相关教育培训任务的承训人数（人次/年）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="面向企业、学校和社会开展职业培训或技能培训的总人数"
            >
              <el-input
                v-model="formData.skllTrain"
                placeholder="请输入面向企业、学校和社会开展职业培训或技能培训的总人数"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="可提供教育培训类别数（学历培训、技能培训）（个）"
            >
              <el-input
                v-model="formData.proTrainType"
                placeholder="请输入可提供教育培训类别数（学历培训、技能培训）（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="课程承训专业数量（个）">
              <el-input
                v-model="formData.classSubject"
                placeholder="请输入课程承训专业数量（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="具备线上培训平台或网络远程教育（是/否）">
              <el-input
                v-model="formData.trainPlaform"
                placeholder="请输入具备线上培训平台或网络远程教育（是/否）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="有合作关系的培训机构数（个）">
              <el-input
                v-model="formData.trainOrg"
                placeholder="请输入有合作关系的培训机构数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="师生比">
              <el-input
                v-model="formData.fsRatio"
                placeholder="请输入师生比"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="高级职称教师比例（%）">
              <el-input
                v-model="formData.seniorTearchRatio"
                placeholder="请输入高级职称教师比例（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="具有行业一线工作经历8年以上的教师比例（%）">
              <el-input
                v-model="formData.hjobTeacher"
                placeholder="请输入具有行业一线工作经历8年以上的教师比例（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="退役军人培训班次（个）">
              <el-input
                v-model="formData.trainClass"
                placeholder="请输入退役军人培训班次（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="退役军人参加的课程数量（个）">
              <el-input
                v-model="formData.course"
                placeholder="请输入退役军人参加的课程数量（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="职业技能证书取证率（%）">
              <el-input
                v-model="formData.gainCertRatio"
                placeholder="请输入职业技能证书取证率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="培训结束后获得结业证书的比例（%）">
              <el-input
                v-model="formData.completeCertRatio"
                placeholder="请输入培训结束后获得结业证书的比例（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="学员培训后就业率（%）">
              <el-input
                v-model="formData.trainJobRatio"
                placeholder="请输入学员培训后就业率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="就业与培训专业相关率（%）">
              <el-input
                v-model="formData.trainPcrRatio"
                placeholder="请输入就业与培训专业相关率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="培训后平均起薪水平（元/月）">
              <el-input
                v-model="formData.trainPay"
                placeholder="请输入培训后平均起薪水平（元/月）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="培训学员满意度（%）">
              <el-input
                v-model="formData.trainEstimate"
                placeholder="请输入培训学员满意度（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="见习基地个数（个）">
              <el-input
                v-model="formData.traineesBase"
                placeholder="请输入见习基地个数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="见习人数（人次）">
              <el-input
                v-model="formData.traineesPeople"
                placeholder="请输入见习人数（人次）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <!-- 孵化绩效情况 -->
      <div v-else-if="stepVal === 4">
        <div class="headTitle">孵化绩效情况（2018年7月-2022年12月）</div>
        <el-form ref="ruleForm" label-width="550px" :model="formData">
          <el-row>
            <el-form-item label="已运营年限（包括2018年前）">
              <el-input
                v-model="formData.serviceLife"
                placeholder="请输入已运营年限（包括2018年前）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="功能区设置（是否有会议室、路演中心及其他功能区域）"
            >
              <el-input
                v-model="formData.ribbonSet"
                placeholder="请输入功能区设置（是否有会议室、路演中心及其他功能区域）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="具有创业苗圃（是/否）">
              <el-input
                v-model="formData.isCyNursery"
                placeholder="请输入具有创业苗圃（是/否）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="载体平台">
              <el-input
                v-model="formData.carrierPlatform"
                placeholder="请输入载体平台"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="服务平台">
              <el-input
                v-model="formData.servicePlatform"
                placeholder="请输入服务平台"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item
              label="金融平台（是否有对接金融服务的银行机构，是否有政府资金类政策对接等功能）"
            >
              <el-input
                v-model="formData.financePlatform"
                placeholder="请输入金融平台（是否有对接金融服务的银行机构，是否有政府资金类政策对接等功能）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="创业导师人数">
              <el-input
                v-model="formData.cyTutor"
                placeholder="请输入创业导师人数"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="孵化载体是否具备自有孵化基金">
              <el-input
                v-model="formData.isHaveHatchFund"
                placeholder="请输入孵化载体是否具备自有孵化基金"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="期末在孵实体数（户）">
              <el-input
                v-model="formData.finalEntities"
                placeholder="请输入期末在孵实体数（户）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="期末在孵实体提供就业岗位数（个）">
              <el-input
                v-model="formData.finalJobPost"
                placeholder="请输入期末在孵实体提供就业岗位数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="期末在孵退役军人创业实体数（个）">
              <el-input
                v-model="formData.finalCyEntities"
                placeholder="请输入期末在孵退役军人创业实体数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="期末在孵退役军人创业实体提供就业岗位数（个）">
              <el-input
                v-model="formData.finalCyJobPost"
                placeholder="请输入期末在孵退役军人创业实体提供就业岗位数（个）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="期末孵化场所利用率（%）">
              <el-input
                v-model="formData.finalSiteUsage"
                placeholder="请输入期末孵化场所利用率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="当期入孵实体孵化成功率（%）">
              <el-input
                v-model="formData.curEntitySuccess"
                placeholder="请输入当期入孵实体孵化成功率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="当期入孵实体到期出园率（%）">
              <el-input
                v-model="formData.curEntityRestOut"
                placeholder="请输入当期入孵实体到期出园率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="组织开展创业服务活动数量">
              <el-input
                v-model="formData.developCyService"
                placeholder="请输入组织开展创业服务活动数量"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="入孵实体获得区、市、国家荣誉数">
              <el-input
                v-model="formData.gainHonor"
                placeholder="请输入入孵实体获得区、市、国家荣誉数"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="在园退役军人创业实体满意率（%）">
              <el-input
                v-model="formData.inExEstimate"
                placeholder="请输入在园退役军人创业实体满意率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="出园退役军人创业实体满意率（%）">
              <el-input
                v-model="formData.outExEstimate"
                placeholder="请输入出园退役军人创业实体满意率（%）"
                :disabled="detailVal === 3"
                clearable
              />
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button
          v-if="stepVal !== 1"
          size="small"
          @click="--stepVal"
        >上 一 步</el-button>
        <el-button
          v-if="stepVal !== 4"
          type="primary"
          size="small"
          @click="goNext()"
        >下 一 步</el-button>
        <el-button
          v-if="stepVal === 4 && detailVal !== 3"
          type="primary"
          size="small"
          @click="submitForm"
        >完 成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo, addData, updateData } from '../api/index'
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
        gradenPlotName: [
          { required: true, message: '请输入园地名称', trigger: 'blur' }
        ],
        trainType: [
          { required: true, message: '请选择培训类型', trigger: 'change' }
        ],
        assetsNature: [
          { required: true, message: '请选择园地资产性质', trigger: 'change' }
        ],
        operateMode: [
          { required: true, message: '请选择园地运营方式', trigger: 'change' }
        ],
        areaArr: [{ required: true, message: '请选择所在地', trigger: 'change' }],
        lxaddr: [
          { required: true, message: '请输入园地地址', trigger: 'blur' }
        ],
        uscc: [
          {
            required: true,
            message: '请输入统一机构代码/社会信用代码',
            trigger: 'blur'
          }
        ],
        publicTel: [
          { required: true, message: '请输入对外公开电话', trigger: 'blur' }
        ],
        affirmTime: [
          { required: true, message: '请选择认定为省级示范园地时间', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择园地启用时间', trigger: 'change' }
        ],
        postCode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        expTime: [
          { required: true, message: '请选择到期时间', trigger: 'change' }
        ],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        registerTel: [
          { required: true, message: '请输入注册手机号', trigger: 'blur' }
        ]
      },
      // 步骤条数据
      stepVal: 1,
      // 详情数据
      formData: {},
      loadingFlag: true
    }
  },
  created() {
    if (this.detailVal === 1) {
      this.formData = {}
      this.loadingFlag = false
    } else {
      getInfo({ id: this.detailId }).then((res) => {
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
      delete this.formData.areaArr
      if (this.detailVal === 1) {
        addData(this.formData).then((res) => {
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
        updateData(this.formData).then((res) => {
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
    },
    // 获取选中城市
    handleChange(val) {
      console.log(val)
      this.formData.provinceCantId = val[0]
      this.formData.cityCantId = val[1]
      this.formData.countryCantId = val[2]
      console.log(this.formData)
    },
    // 下一步
    goNext() {
      if (this.stepVal === 1) {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            if (this.formData.authLevel) {
              console.log(this.formData)
              ++this.stepVal
            } else {
              this.$message.error('请选择认定等级')
            }
          } else {
            return false
          }
        })
      } else {
        ++this.stepVal
      }
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
