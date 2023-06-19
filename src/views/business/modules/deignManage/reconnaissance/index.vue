<template>
  <div class="reconnaissanceBox">
    <div class="g-box">
      <div class="g-filter">
        <el-form ref="formInline" :model="pageParam" label-width="150px">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="机房地址及名称" prop="name">
                <el-input v-model="pageParam.name" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机房性质" prop="a">
                <el-select
                  v-model="pageParam.a"
                  clearable
                  :disabled="disabled"
                  style="width: 100%"
                >
                  <el-option key="1" label="IDC" :value="1" />
                  <el-option key="2" label="枢纽楼、电信自有机房" :value="2" />
                  <el-option
                    key="3"
                    label="第三方合作机房、自营池所在机房"
                    :value="3"
                  />
                  <el-option key="4" label="合营池所在机房" :value="4" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="本期占用机架" prop="b">
                <el-input v-model="pageParam.b" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item
                label="走线架/尾纤槽高度(单位: m)"
                label-width="200px"
                prop="c"
              >
                <el-input v-model="pageParam.c" :disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="机房出局ODF位置"
                prop="d"
                label-width="150px"
              >
                <el-input v-model="pageParam.d" :disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="contentBox">
        <el-table
          ref="showTable"
          :data="tableData"
          stripe
          border
          style="width: 100%"
          height="calc(100vh - 500px)"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column label="机架位置" width="160" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input v-model="scope.row.zm" style="width: 50px" />
                <span class="textMargin">-</span>
                <el-input v-model="scope.row.sz" style="width: 50px" />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.zm }}{{ scope.row.sz }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="机架尺寸(长*宽*高)单位: mm"
            width="330"
            align="center"
          >
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.a"
                  :step="10"
                  size="small"
                  :min="10"
                  controls-position="right"
                  style="width: 80px"
                />
                <span class="textMargin">*</span>
                <el-input-number
                  v-model="scope.row.b"
                  :step="10"
                  size="small"
                  :min="10"
                  controls-position="right"
                  style="width: 80px"
                />
                <span class="textMargin">*</span>
                <el-input-number
                  v-model="scope.row.c"
                  :step="10"
                  size="small"
                  :min="10"
                  controls-position="right"
                  style="width: 80px"
                />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.a }}{{ scope.row.b }}{{ scope.row.c }}</div>
            </template>
          </el-table-column>
          <el-table-column label="U数" width="110" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.d"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 80px"
                />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.d }}</div>
            </template>
          </el-table-column>
          <el-table-column label="单机柜功耗(KW)" width="130" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.e"
                  :precision="1"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 100px"
                />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.e }}</div>
            </template>
          </el-table-column>
          <el-table-column label="电源类型" width="120" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-select v-model="scope.row.f" placeholder="">
                  <el-option key="1" label="国际交流" value="1" />
                  <el-option key="2" label="国际直流" value="2" />
                  <el-option key="3" label="欧标交流" value="3" />
                  <el-option key="4" label="欧标直流" value="4" />
                </el-select>
              </div>
              <div v-show="disabled" class="text" />
            </template>
          </el-table-column>
          <el-table-column label="插座类型(10A)" width="160" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.g"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 80px"
                />
                <span class="textMargin">*</span>
                <span>10A</span>
              </div>
              <div v-show="disabled" class="text">{{ scope.row.g }} * 10A</div>
            </template>
          </el-table-column>
          <el-table-column label="插座类型(16A)" width="160" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.h"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 80px"
                />
                <span class="textMargin">*</span>
                <span>16A</span>
              </div>
              <div v-show="disabled" class="text">{{ scope.row.g }} * 16A</div>
            </template>
          </el-table-column>
          <el-table-column label="机柜上端不可用U位" width="110" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.i"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 80px"
                />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.i }}</div>
            </template>
          </el-table-column>
          <el-table-column label="机柜底端不可用U位" width="110" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.j"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 80px"
                />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.j }}</div>
            </template>
          </el-table-column>
          <el-table-column label="已占用U位" width="160" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input v-model="scope.row.k" size="small" />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.k }}</div>
            </template>
          </el-table-column>
          <el-table-column label="已占用功耗(KW)" width="130" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input-number
                  v-model="scope.row.l"
                  :precision="1"
                  size="small"
                  :min="1"
                  controls-position="right"
                  style="width: 100px"
                />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.l }}</div>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="160" align="center">
            <template slot-scope="scope">
              <div v-show="!disabled">
                <el-input v-model="scope.row.m" size="small" />
              </div>
              <div v-show="disabled" class="text">{{ scope.row.m }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button-group class="tab-button-group">
                <el-link
                  type="primary"
                  @click="addListData(scope.row, scope.$index)"
                >新增</el-link>
                |
                <el-link
                  type="primary"
                  @click="delListData(scope.$index)"
                >删除</el-link>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination
          background
          class="g-pagination"
          layout="total, sizes, prev, pager, next"
          :total="pageTotal"
          :current-page="pageParam.page + 1"
          :page-size="pageParam.pageSize"
          :page-sizes="[5, 10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        /> -->
      </div>
    </div>
    <div class="moreData">
      <div class="flag" @click="dataFlag = !dataFlag">
        <span>更多信息</span>
        <i :class="dataFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" />
      </div>
      <div v-show="dataFlag" class="content">
        <el-form
          ref="formInline"
          :model="formData"
          label-width="120px"
          label-position="top"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="列柜输出开关大小" prop="a">
                <el-input v-model="formData.a" :disabled="disabled" />
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="提示: 如机房有天翼云自营资源池，优先使用自营资源池网络出口"
                  placement="top"
                >
                  <i class="el-icon-warning-outline hint" />
                </el-tooltip>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="上级供电系统是否能够满足本期要求" prop="b">
                <el-radio
                  v-model="formData.b"
                  label="1"
                  :disabled="disabled"
                >是</el-radio>
                <el-radio
                  v-model="formData.b"
                  label="2"
                  :disabled="disabled"
                >否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机房制冷是否满足本期需求" prop="c">
                <el-radio
                  v-model="formData.c"
                  label="1"
                  :disabled="disabled"
                >是</el-radio>
                <el-radio
                  v-model="formData.c"
                  label="2"
                  :disabled="disabled"
                >否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="机房出局ODF端口类型" prop="d">
                <el-input v-model="formData.d" :disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="163网络接入设备所在位置及设备型号/端口型号"
                prop="e"
              >
                <el-input v-model="formData.e" :disabled="disabled" />
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="提示: 如机房有天翼云自营资源池，优先使用自营资源池网络出口"
                  placement="top"
                >
                  <i class="el-icon-warning-outline hint" />
                </el-tooltip>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本端设备与163网络接入设备走线路由" prop="f">
                <el-input v-model="formData.f" :disabled="disabled" />
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="提示: 如机房有天翼云自营资源池，优先使用自营资源池网络出口"
                  placement="top"
                >
                  <i class="el-icon-warning-outline hint" />
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="CN2网络接入设备所在位置及设备型号/端口型号"
                prop="g"
              >
                <el-input v-model="formData.g" :disabled="disabled" />
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="提示: 如机房有天翼云自营资源池，优先使用自营资源池网络出口"
                  placement="top"
                >
                  <i class="el-icon-warning-outline hint" />
                </el-tooltip>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本端设备与CN2网络接入设备走线路由" prop="h">
                <el-input v-model="formData.h" :disabled="disabled" />
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="提示: 如机房有天翼云自营资源池，优先使用自营资源池网络出口"
                  placement="top"
                >
                  <i class="el-icon-warning-outline hint" />
                </el-tooltip>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机架送风" prop="i">
                <el-input v-model="formData.i" :disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="省内老bss系统的核心设备" prop="j">
                <el-input v-model="formData.j" :disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机房出入联系人(机房现场负责人)" prop="k">
                <el-input v-model="formData.k" :disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="备注" prop="l">
                <el-input
                  v-model="formData.l"
                  type="textarea"
                  :rows="4"
                  :disabled="disabled"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="设计院查勘人员签名" prop="m">
                <el-input v-model="formData.m" :disabled="disabled" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省公司接口人签名" prop="n">
                <el-input v-model="formData.n" :disabled="disabled" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="handBtn">
      <div v-show="!disabled">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="save(1)">保存</el-button>
      </div>
      <div v-show="disabled">
        <el-button type="primary" plain size="small" @click="save(2)">编辑勘察信息</el-button>
        <el-button type="primary" plain size="small" @click="downTabel(2)">下载勘察信息</el-button>
        <el-button type="primary" plain size="small" @click="downChart(2)">下载柜面图</el-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 正在查询
      loading: false,
      disabled: false,
      formData: {},
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10,
        name: '上海市杨高南路5678号上海电信信息园B7/上海电信信息园B7/B7-101机房',
        b: 4
      },
      pageTotal: 0,
      // 查询结果
      tableData: [{}],
      dataFlag: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 保存/编辑
    save(val) {
      if (val === 1) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    // 下载勘查信息
    downTabel() {},
    // 下载柜面图
    downChart() {},
    // 取消
    cancel() {},
    // 获取列表数据
    queryList() {},
    // 新增列表
    addListData(item) {
      if (item.sz) {
        let num = Number(item.sz)
        console.log(num++)
        this.tableData.push({
          zm: item.zm,
          sz: num++
        })
      } else {
        this.tableData.push({})
      }
    },
    // 删除列表
    delListData(index) {
      this.tableData.splice(index, 1)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.reconnaissanceBox {
  width: 100%;
  min-height: calc(100vh - 110px);
  padding-bottom: 70px;
  position: relative;
  .textMargin {
    margin: 0 10px;
  }
  .moreData {
    width: 100%;
    .flag {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 20px 10px;
      box-sizing: border-box;
      cursor: pointer;
      font-size: 14px;
      color: #1890ff;
    }
    .content {
      width: 100%;
      ::v-deep {
        .el-form-item__label {
          line-height: 16px;
        }
        .hint {
          position: absolute;
          top: -24px;
          right: 0px;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
  .handBtn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
</style>
