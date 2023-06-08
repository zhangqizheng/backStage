<template>
  <div class="product_edit">
    <goBack />
    <!-- 步骤条 -->
    <div class="tabBox">
      <el-tabs v-model="tabVal" @tab-click="tabClick">
        <el-tab-pane label="基本信息" name="1">
          <el-form ref="resultForm" label-width="100px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名">
                  <span>{{ formData.userName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别">
                  <span>{{ formData.userSex === '1' ? '男' : '女' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="身份证号">
                  <span>{{ formData.userCard }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号">
                  <span>{{ formData.userPhonenumber }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="户籍地">
                  <span>{{ formData.userRegion }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="就业情况">
                  <span>{{ formData.userEmployment === '1' ? '已就业' : '未就业' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="培训计划" name="2">
          <el-form ref="resultForm" label-width="100px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="培训计划标题">
                  <span>{{ formData.trainTitle }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培训目的">
                  <span>{{ formData.trainGoal }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="培训预算">
                  <span>{{ formData.trainBudget }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培训内容">
                  <span>{{ formData.trainDetail }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="培训类型">
                  <span>{{ $getNewType(formData.trainType) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="考核方式">
                  <span>{{ formData.checkWay === '1' ? '试卷考核' : '取证考核' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="考核标准">
                  <span>{{ formData.checkStandard }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培训机构">
                  <span>{{ formData.orgName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="发起方">
                  <span>{{ formData.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培训时间">
                  <span>{{
                    formData.trainStartTime + "-" + formData.trainEndTime
                  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="附件">
                <span>{{ formData.fileUrl || "--" }}</span>
              </el-form-item>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="培训进度" name="3">
          <div class="statusBox">
            <div
              v-for="(item, index) in statusList"
              :key="index"
              :class="curIndex === index ? 'statusActive' : ''"
              @click="changeStatus(item, index)"
            >
              {{ item.label }}
            </div>
          </div>
          <div class="listBox">
            <div
              v-for="(item, index) in dataList"
              :key="index"
              class="listItem"
            >
              <div class="pic">
                <img :src="item.pictureUrl">
              </div>
              <!-- <div class="status">{{ item.status }}</div> -->
              <div class="data">
                <div>
                  <div>
                    <div class="title">课程名称:</div>
                    <div class="val">{{ item.courseName }}</div>
                  </div>
                  <div class="line">{{ item.trainWay === '1' ? '线上' : '线下' }}</div>
                </div>
                <div>
                  <div class="title">培训时间:</div>
                  <div class="val">
                    {{ item.trainStartTime + "-" + item.trainEndTime }}
                  </div>
                </div>
                <div>
                  <div class="title">机构讲师:</div>
                  <div class="val">{{ item.teacherName }}</div>
                </div>
                <div>
                  <div class="title">课程总时长:</div>
                  <div class="val">{{ item.courseTotalTime }}</div>
                </div>
                <div>
                  <!-- <div class="plan">
                    <div class="title">培训进度:</div>
                    <div class="val">{{ item.plan }}%</div>
                  </div> -->
                  <div>
                    <div class="title">培训完成时间:</div>
                    <div class="val">{{ item.trainEndTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="成果登记" name="4">
          <el-form ref="resultForm" label-width="100px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="就业状态">
                  <span>{{ formData.jobStatus === '1' ? '已就业' : '未就业' }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="就业单位">
                  <span>{{ formData.jobUnit }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="就业薪酬">
                  <span>{{ formData.emolument }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="考试成绩">
                  <span>{{ formData.examResults }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="是否及格">
                  <span>{{ formData.passStatus ? "是" : "否" }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="考试试卷">
                  <span><img
                    :src="formData.examinationPaper"
                    width="200"
                  ></span>
                  <el-button
                    size="small"
                    type="danger"
                    @click="downLoad($event, formData)"
                  >下载</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="证书名称">
                  <span>{{ formData.certificateName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="培训证书">
                  <span><img
                    :src="formData.certificateUrl"
                    width="200"
                  ></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部按钮 -->
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: right; margin-top: 20px"
    >
      <el-button size="small" @click="goBack()">关 闭</el-button>
    </div>
  </div>
</template>

<script>
// import { queryUserInfo } from '../api/index'
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
    // formData: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data() {
    return {
      tabVal: '1',
      formData: {
        userId: '344',
        userName: '小张',
        userSex: '1',
        userCard: '110105000000',
        userPhonenumber: '16601134917',
        userRegion: '110105000000',
        cantName: null,
        userEmployment: '1',
        trainTitle: '线上退役军人“全媒体运营师培训及岗前实训”特色培训班开课了',
        trainGoal: '互联网技能培训',
        trainBudget: 3000,
        trainDetail: '抖音短视频教学',
        trainType: '1',
        checkWay: '2',
        checkStandard: '试卷考核为100分。',
        orgId: 'asbwbb31c358b3648b3a5c8da2f5901',
        orgName: '测试承建机构01',
        deptType: '1',
        initiator: '测试承建机构01',
        deptId: '130000000000002110',
        deptName: '河北省退役军人事务厅',
        trainStartTime: '2023-02-24',
        trainEndTime: '2025-01-23',
        fileUrl: null,
        incompleteList: [
          {
            trainPlanDetailId: '24',
            courseId: '6',
            trainWay: '1',
            courseName: '短视频拍摄及剪辑与制作',
            teacherName: '王尚',
            trainStartTime: '2023-01-10 00:00:00',
            trainEndTime: '2023-01-11 00:00:00',
            courseTotalTime: '1800',
            trainSite: '',
            pictureUrl:
              'https://fwpt.mva.gov.cn:9433/tyjr-oss/tyjrfs/view/5eead1aa0ce54f00017a1af1.jpeg',
            crterTime: null,
            videosNumber: 4,
            studyVideosNumber: 0
          },
          {
            trainPlanDetailId: '26',
            courseId: '8',
            trainWay: '1',
            courseName: '直播带货技巧',
            teacherName: '王佐',
            trainStartTime: '2023-01-10 00:00:00',
            trainEndTime: '2023-01-11 00:00:00',
            courseTotalTime: '1800',
            trainSite: '',
            pictureUrl:
              'https://fwpt.mva.gov.cn:9433/tyjr-oss/tyjrfs/view/5eead1aa0ce54f00017a1af1.jpeg',
            crterTime: null,
            videosNumber: 10,
            studyVideosNumber: 0
          },
          {
            trainPlanDetailId: '27',
            courseId: null,
            trainWay: '2',
            courseName: '实操线下课',
            teacherName: '王佑',
            trainStartTime: '2023-02-24 14:30:00',
            trainEndTime: '2024-01-11 00:00:00',
            courseTotalTime: '',
            trainSite: '北京市海淀区西土城',
            pictureUrl:
              'https://fwpt.mva.gov.cn:9433/tyjr-oss/tyjrfs/view/5eead1aa0ce54f00017a1af1.jpeg',
            crterTime: null,
            videosNumber: 1,
            studyVideosNumber: 0
          }
        ],
        finishList: [
          {
            trainPlanDetailId: '25',
            courseId: '7',
            trainWay: '2',
            courseName: '抖音本地生活运营',
            teacherName: '王霞',
            trainStartTime: '2023-01-10 00:00:00',
            trainEndTime: '2023-01-11 00:00:00',
            courseTotalTime: '1800',
            trainSite: '',
            pictureUrl:
              'https://fwpt.mva.gov.cn:9433/tyjr-oss/tyjrfs/view/5eead1aa0ce54f00017a1af1.jpeg',
            crterTime: 1677743495000,
            videosNumber: 1,
            studyVideosNumber: 1
          }
        ],
        trainPlanId: 31,
        studentId: 344,
        studentName: '安卫东',
        jobStatus: '1',
        jobUnit: '就业单位',
        emolument: '3500',
        examResults: '考试成绩',
        passStatus: '1',
        certificateName: '证书名字',
        examinationPaper:
          'https://fwpt.mva.gov.cn:9433/tyjr-oss/tyjrfs/view/635402ed4367eb6e5fc3c794.jpg',
        certificateUrl: '培训证书',
        starLevel: 4.5,
        starLevelTime: '2023-03-04 11:51:35'
      },
      tableList: [],
      statusList: [
        {
          label: '已完成',
          value: 1
        },
        {
          label: '未完成',
          value: 2
        }
      ],
      dataList: [],
      curIndex: 0
    }
  },
  watch: {
    visible() {
      this.tabVal = '1'
    }
  },
  created() {
    this.dataList = this.formData.incompleteList
  },
  methods: {
    // 详情切换
    tabClick(e) {
      // console.log(e);
      // this.$emit("tabClick", e);
    },
    // 下载试卷
    downLoad(e) {
      const link = document.createElement('a')
      // 这里是将链接地址url转成blob地址，
      fetch(this.formData.examinationPaper)
        .then((res) => res.blob())
        .then((blob) => {
          link.href = URL.createObjectURL(blob)
          // 下载文件的名称及文件类型后缀
          link.download = ''
          document.body.appendChild(link)
          link.click()
          // 在资源下载完成后 清除 占用的缓存资源
          window.URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        })
    },
    // 选择培训进度 状态
    changeStatus(item, index) {
      this.curIndex = index
      this.$nextTick(() => {
        if (this.curIndex === 0) {
          this.dataList = this.formData.incompleteList
        } else {
          this.dataList = this.formData.finishList
        }
      })
    },
    goBack() {
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
  .fileBox {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
  ::v-deep {
    .el-form-item__content {
      > div {
        width: 100%;
      }
    }
    .el-rate {
      height: 100%;
      line-height: 2.5;
      .el-rate__icon {
        font-size: 30px;
      }
    }
    .el-tab-pane {
      width: 100%;
      max-height: calc(100vh - 200px);
    }
    .listBox {
      width: 100%;
      height: calc(100vh - 370px);
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      overflow: auto;
      .listItem {
        width: calc(50% - 40px);
        max-height:auto;
        display: flex;
        border: 1px solid #ccc;
        padding: 10px;
        position: relative;
        margin-bottom: 20px;
        margin-right: 20px;
        .pic {
          width: 130px;
          height: 135px;
          border: 1px solid #ddd;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .data {
          flex: 1;
          > div {
            width: 100%;
            display: flex;
            padding: 6px 0;
            > div {
              display: flex;
              align-items: center;
            }
            .plan {
              margin-right: 50px;
            }
            .title {
              margin-right: 10px;
            }
            .line {
              padding: 2px 6px;
              background: #169bd5;
              color: #fff;
              font-size: 12px;
              margin-left: 50px;
            }
          }
        }
        .status {
          padding: 4px 10px;
          background: #295fbc;
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          font-size: 12px;
        }
      }
      .listItem:nth-child(even) {
        margin-right: 0;
      }
    }
    .statusBox {
      width: 100%;
      display: flex;
      padding-bottom: 10px;
      > div {
        padding: 4px 10px;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;
      }
      .statusActive {
        background: #295fbc;
        color: #fff;
      }
    }
  }
}
</style>
