<template>
  <div class="product_edit">
    <goBack />
    <div class="headTitle">培训计划</div>
    <el-form
      ref="formData"
      label-width="150px"
      :model="formData"
    >
      <el-form-item label="培训计划标题">
        <span>{{ formData.trainTitle }}</span>
      </el-form-item>
      <el-form-item label="培训目的">
        <span>{{ formData.trainGoal }}</span>
      </el-form-item>
      <el-form-item label="培训预算">
        <span>{{ formData.trainBudget }}</span>
      </el-form-item>
      <el-form-item label="培训内容">
        <span>{{ formData.trainDetail }}</span>
      </el-form-item>
      <el-form-item label="考核方式">
        <span>{{ formData.checkWay === '1' ? '试卷考核' : '取证考核' }}</span>
      </el-form-item>
      <el-form-item label="考核标准">
        <span>{{ formData.checkStandard }}</span>
      </el-form-item>
      <el-form-item label="培训类型">
        <span>{{ $getNewType(formData.trainType) }}</span>
      </el-form-item>
      <el-form-item label="承训机构">
        <span>{{ formData.orgName }}</span>
      </el-form-item>
      <el-form-item label="发起方">
        <span>{{ formData.deptName }}</span>
      </el-form-item>
      <el-form-item label="培训时间">
        <span>{{ formData.trainStartTime }} 至 {{ formData.trainEndTime }}</span>
      </el-form-item>
      <el-form-item label="附件">
        <span>{{ formData.fileUrl }}</span>
      </el-form-item>
      <div class="headTitle">报名信息</div>
      <el-form-item label="报名人数上限">
        <span>{{ formData.applyMaxNum }}</span>
      </el-form-item>
      <el-form-item label="报名时间">
        <span>{{ formData.applyStartTime }} 至 {{ formData.appkyEndTime }}</span>
      </el-form-item>
      <el-form-item label="实际报名人数">
        <span>{{ formData.applyRealityNum }}</span>
      </el-form-item>
    </el-form>

    <div class="headTitle">拨款信息</div>
    <el-form
      ref="resultForm"
      label-width="130px"
      :model="form"
      :rules="rules"
    >
      <el-row>
        <el-form-item label="拨款金额" prop="grantMoney">
          <el-input
            v-model="form.grantMoney"
            placeholder="请输入拨款金额"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="拨款时间" prop="grantTime">
          <el-date-picker
            v-model="form.grantTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择拨款时间"
          />
        </el-form-item>
      </el-row>
    </el-form>

    <!-- 底部按钮 -->
    <div slot="footer" class="dialog-footer" style="text-align: right">
      <el-button size="small" @click="cancel()">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm">提 交</el-button>
    </div>
  </div>
</template>

<script>
import { getDetailData, saveFunding } from '../api/index'
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
    rowDetail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {},
      // 机构信息校验
      rules: {
        grantMoney: [
          { required: true, message: '请输入拨款金额', trigger: 'change' }
        ],
        grantTime: [
          {
            required: true,
            message: '请选择拨款时间',
            trigger: 'change'
          }
        ]
      },
      form: {
        grantMoney: 0
      }
    }
  },
  watch: {
    visible() {
      this.$nextTick(() => {
        this.$refs['formData'].resetFields()
      })
    }
  },
  created() {
    this.getDetailData()
  },
  methods: {
    // 新增提交
    submitForm() {
      this.$refs.resultForm.validate((valid) => {
        if (valid) {
          console.log(this.form)
          const params = {
            ...this.form,
            orgId: this.rowDetail.orgId,
            trainPlanId: this.rowDetail.trainPlanId
          }
          saveFunding(params).then(res => {
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
    },
    getDetailData() {
      getDetailData({ trainPlanId: this.rowDetail.trainPlanId }).then(res => {
        if (res.status === 0) {
          this.formData = res.data
          this.form.grantMoney = Number(this.formData.trainBudget) * Number(this.formData.applyRealityNum)
        }
      })
    },
    cancel() {
      this.$bus.$emit('goBack')
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
  .fileBox{
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
