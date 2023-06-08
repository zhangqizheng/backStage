<template>
  <div class="product_edit">
    <goBack :previous-page="true" />
    <div class="headTitle">培训计划</div>
    <el-form ref="formData" label-width="150px" :model="formData">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="培训计划标题" prop="title">
            <el-input
              v-model="formData.title"
              placeholder="请输入培训计划标题"
              clearable
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="培训目的" prop="result">
            <el-input
              v-model="formData.result"
              placeholder="请输入培训目的"
              type="textarea"
              :rows="4"
              :disabled="true"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="培训预算" prop="price">
            <el-input
              v-model="formData.price"
              placeholder="请输入培训预算"
              :disabled="true"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="培训内容" prop="content">
            <el-input
              v-model="formData.content"
              placeholder="请输入培训内容"
              type="textarea"
              :rows="4"
              :disabled="true"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="培训类型" prop="type">
            <el-select
              v-model="formData.type"
              placeholder="请选择培训类型"
              :disabled="true"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="考核方式" prop="way">
            <el-select
              v-model="formData.way"
              placeholder="请选择考核方式"
              :disabled="true"
            >
              <el-option
                v-for="item in wayOptions"
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
          <el-form-item label="考核标准" prop="norm">
            <el-input
              v-model="formData.norm"
              placeholder="请输入考核标准"
              type="textarea"
              :rows="4"
              clearable
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="承训机构" prop="orgName">
            <el-select
              v-model="formData.orgName"
              multiple
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in orgOptions"
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
          <el-form-item label="发起方" prop="initiator">
            <el-input
              v-model="formData.initiator"
              placeholder="请输入发起方"
              :disabled="true"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="培训时间" prop="time">
            <el-date-picker
              v-model="formData.time"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="附件" prop="file">
          <el-upload
            :disabled="true"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-row>
      <div class="headTitle">报名信息</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="报名人数上限" prop="allNum">
            <el-input
              v-model="formData.allNum"
              placeholder="请输入报名人数上限"
              clearable
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报名时间" prop="time2">
            <el-date-picker
              v-model="formData.time2"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="headTitle">拨款金额</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="实际拨款金额" prop="allNum">
            <el-input
              v-model="formData.allNum"
              placeholder="请输入实际拨款金额"
              clearable
              :disabled="true"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="headTitle">培训内容</div>
    <div class="contentBox">
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
        <div v-for="(item, index) in dataList" :key="index" class="listItem">
          <div class="pic">
            <img :src="item.pic">
          </div>
          <div class="status">{{ item.status }}</div>
          <div class="data">
            <div>
              <div>
                <div class="title">课程名称:</div>
                <div class="val">{{ item.name }}</div>
              </div>
              <div class="line">
                <el-tag size="mini">{{ item.line }}</el-tag>
              </div>
            </div>
            <div>
              <div class="title">培训时间:</div>
              <div class="val">{{ item.time }}</div>
            </div>
            <div>
              <div class="title">机构讲师:</div>
              <div class="val">{{ item.teacher }}</div>
            </div>
            <div v-if="item.line === '线上'">
              <div class="title">课程总时长:</div>
              <div class="val">{{ item.duration }}</div>
            </div>
            <div v-if="item.line === '线上'" class="reach">
              <div>
                <div class="title">培训完成人数:</div>
                <div class="val">{{ item.isReach }}/{{ item.reach }}</div>
              </div>
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  @click="viewRecord(item)"
                >查看记录</el-button>
              </div>
            </div>
            <div v-if="item.line === '线下'">
              <div class="title">培训地点:</div>
              <div class="val">{{ item.site }}</div>
            </div>
            <div v-if="item.line === '线下'" class="reach">
              <div>
                <div class="title">培训签到人数:</div>
                <div class="val">{{ item.isReach }}/{{ item.reach }}</div>
              </div>
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  @click="viewRecord(item)"
                >查看记录</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="dialog-footer" style="text-align: right">
      <el-button size="small" @click="cancel()">关 闭</el-button>
    </div>

    <!-- 章节弹窗 -->
    <el-dialog title="章节详情" :visible.sync="recordFlag" width="50%">
      <div class="courseName">课程名称：关于退役军人教育培训的内容</div>
      <el-table :data="recordList" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号" align="center" />
        <el-table-column
          prop="name"
          label="学员姓名"
          width="180"
          align="center"
        />
        <el-table-column prop="plan" label="完成进度" align="center" />
        <el-table-column
          prop="time"
          label="培训完成时间"
          width="180"
          align="center"
        />
        <el-table-column prop="status" label="状态" width="180" align="center" />
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="recordCancel()">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    // formData: {
    //   type: Object,
    //   default: () => {},
    // },
    viewVal: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      form: {},
      wayOptions: [
        {
          label: '无',
          value: 1
        },
        {
          label: '试卷考核',
          value: 2
        },
        {
          label: '取证考核',
          value: 3
        }
      ],
      typeOptions: [
        {
          label: '适应性培训',
          value: 1
        },
        {
          label: '职业技能培训',
          value: 2
        },
        {
          label: '创业培训',
          value: 3
        },
        {
          label: '其他',
          value: 4
        }
      ],
      orgOptions: [
        {
          label: '新东方培训机构',
          value: 1
        },
        {
          label: '翰林教育培训机构',
          value: 2
        },
        {
          label: '学大教育培训机构',
          value: 3
        },
        {
          label: '羽真唐职业培训学员',
          value: 4
        }
      ],
      formData: {
        title: '职业技能培训',
        result: '为了更好的加强退役军人学习.....',
        content: '为了更好的加强退役军人学习.....',
        allNum: '50',
        time: ['2020-10-02', '2020-10-04'],
        time2: ['2020-09-21', '2020-10-24'],
        type: 1,
        orgName: [1, 2],
        way: 2,
        price: 2000,
        norm: '考试80分以上',
        initiator: '张三'
      },
      tableList: [],
      statusList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '线上',
          value: 1
        },
        {
          label: '线下',
          value: 2
        }
      ],
      dataList: [],
      curIndex: 0,
      recordList: [
        {
          name: '小李',
          plan: '100%',
          time: '2021-10-02 11:00:00',
          status: '已完成'
        },
        {
          name: '小张',
          plan: '100%',
          time: '2021-10-02 11:00:00',
          status: '已完成'
        },
        {
          name: '小王',
          plan: '80%',
          time: '',
          status: '未完成'
        }
      ],
      recordFlag: false
    }
  },
  watch: {
    visible() {
      if (this.viewVal === 1) {
        this.$nextTick(() => {
          this.$refs['formData'].resetFields()
        })
      }
    }
  },
  created() {
    this.dataList = this.tableList
    console.log(this.formData)
  },
  methods: {
    // 新增提交
    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          console.log(this.formData)
          this.$bus.$emit('goBackList')
        } else {
          return false
        }
      })
    },
    changeStatus(item, index) {
      this.curIndex = index
      if (item.label !== '全部') {
        this.dataList = this.tableList.filter(
          (items) => items.line === item.label
        )
      } else {
        this.dataList = this.tableList
      }
    },
    viewRecord(item) {
      console.log(item)
      this.recordFlag = true
    },
    // 关闭
    recordCancel() {
      this.recordFlag = false
    },
    cancel() {
      this.$bus.$emit('goBackList')
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
  .contentBox {
    padding: 0 20px;
    box-sizing: border-box;
    .trainBox {
      padding-top: 10px;
      padding-right: 20px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      margin-bottom: 20px;
      .num {
        margin-left: 10px;
        font-size: 18px;
        color: #666;
      }
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
  .listBox {
    width: 100%;
    height: 380px;
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    overflow: auto;
    margin-bottom: 20px;
    .listItem {
      width: calc(50% - 40px);
      // max-height: 155px;
      display: flex;
      border: 1px solid #ccc;
      padding: 10px;
      position: relative;
      margin-bottom: 20px;
      margin-right: 20px;
      .pic {
        width: 130px;
        height: 155px;
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
          .title {
            margin-right: 10px;
          }
          .line {
            margin-left: 50px;
          }
        }
        .reach {
          width: 100%;
          display: flex;
          justify-content: space-between;
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
  ::v-deep {
    .el-form-item__content {
      > div {
        width: 100%;
      }
      .el-date-editor {
        width: 300px;
      }
    }
    .courseName {
      margin-bottom: 20px;
      font-size: 14px;
    }
  }
}
</style>
