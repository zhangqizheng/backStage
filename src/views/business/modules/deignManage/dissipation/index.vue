<template>
  <div>
    <div class="g-box">
      <!-- <div class="g-filter">
        <el-form ref="formInline" :model="pageParam" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="本端设备角色" prop="firm">
                <el-select
                  v-model="pageParam.firm"
                  placeholder="请选择本端设备角色"
                >
                  <el-option
                    v-for="item in firmOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="对端设备角色" prop="firm">
                <el-select
                  v-model="pageParam.firm"
                  placeholder="请选择对端设备角色"
                >
                  <el-option
                    v-for="item in firmOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="链路类型" prop="firm">
                <el-select
                  v-model="pageParam.firm"
                  placeholder="请选择链路类型"
                >
                  <el-option
                    v-for="item in firmOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="10">
              <div style="float: right">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  size="small"
                >查询</el-button>
                <el-button
                  type="info"
                  icon="el-icon-refresh"
                  size="small"
                >重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div> -->
      <!-- <div class="contentBox">
        <div class="handleBox">
          <div class="title">设备清单</div>
          <div class="btnList">
            <el-button
              type="primary"
              size="small"
              plain
            >新增设备</el-button>
            <el-button
              size="small"
              plain
            >下载模板</el-button>
            <el-button
              size="small"
              plain
            >批量删除</el-button>
          </div>
        </div> -->
      <el-table
        ref="showTable"
        :data="tableData"
        stripe
        border
        style="width: 100%;"
        height="calc(100vh - 120px)"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          label="机房名称"
          prop="f"
          width="150"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="机柜编号"
          prop="g"
          width="100"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="设备名称"
          prop="h"
          width="150"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="厂家型号"
          prop="i"
          width="110"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="数量"
          prop="j"
          width="80"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="单位"
          prop="k"
          width="80"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="单台功耗（W）"
          prop="l"
          width="100"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="功耗小计（W）"
          prop="m"
          width="100"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="机柜总功耗（W）"
          prop="n"
          width="110"
          align="center"
        />
        <el-table-column
          label="单台高度（U）"
          prop="o"
          width="80"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="供电类型"
          prop="p"
          width="120"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="单台插座要求"
          prop="q"
          width="120"
          align="center"
        />
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
        />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 抽屉开关
      drawerFlag: false,
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      // 列表数据
      tableData: [
        {
          f: '数据中心机房601',
          g: 'C01',
          h: 'SPINE交换机',
          i: 'CE16808',
          j: '1',
          k: '台',
          l: '2200',
          m: '2200',
          n: '2200',
          o: '12',
          p: '两路交流',
          q: '6*16A'
        },
        {
          f: '数据中心机房601',
          g: 'C02',
          h: '6系宿主机',
          i: 'NF5280M5',
          j: '7',
          k: '台',
          l: '550',
          m: '3850',
          n: '4250',
          o: '2',
          p: '两路交流',
          q: '4*16A'
        },
        {
          f: '数据中心机房601',
          g: 'C02',
          h: '25G接入交换机',
          i: 'RG-S6510',
          j: '6',
          k: '台',
          l: '800',
          m: '300',
          n: '4500',
          o: '2',
          p: '两路交流',
          q: '6*10A'
        },
        {
          f: '数据中心机房601',
          g: 'C03',
          h: '带外管理交换机',
          i: 'RG-S5750V2',
          j: '2',
          k: '台',
          l: '1800',
          m: '1300',
          n: '3500',
          o: '4',
          p: '两路交流',
          q: '8*10A'
        },
        {
          f: '数据中心机房601',
          g: 'C03',
          h: '25G接入交换机',
          i: 'RG-S6510',
          j: '3',
          k: '台',
          l: '300',
          m: '200',
          n: '1500',
          o: '2',
          p: '两路交流',
          q: '8*10A'
        },
        {
          f: '数据中心机房601',
          g: 'C03',
          h: '6系宿主机',
          i: 'NF5280M5',
          j: '6',
          k: '台',
          l: '550',
          m: '3850',
          n: '4250',
          o: '2',
          p: '两路交流',
          q: '4*16A'
        },
        {
          f: '数据中心机房601',
          g: 'C04',
          h: 'SPINE交换机',
          i: 'CE16808',
          j: '1',
          k: '台',
          l: '2200',
          m: '2200',
          n: '2200',
          o: '12',
          p: '两路交流',
          q: '6*16A'
        },
        {
          f: '数据中心机房601',
          g: 'C05',
          h: '带外管理交换机',
          i: 'RG-S5750V2',
          j: '2',
          k: '台',
          l: '1800',
          m: '1300',
          n: '3500',
          o: '4',
          p: '两路交流',
          q: '4*10A'
        },
        {
          f: '数据中心机房601',
          g: 'C05',
          h: '25G接入交换机',
          i: 'I620-G40',
          j: '6',
          k: '台',
          l: '800',
          m: '1300',
          n: '4270',
          o: '2',
          p: '两路交流',
          q: '6*10A'
        },
        {
          f: '数据中心机房601',
          g: 'C06',
          h: '文件存储节点（性能型）',
          i: 'I620-G40',
          j: '4',
          k: '台',
          l: '800',
          m: '1300',
          n: '3270',
          o: '2',
          p: '两路交流',
          q: '4*10A'
        },
        {
          f: '数据中心机房601',
          g: 'C06',
          h: '业务管理汇聚交换机',
          i: 'I620-G40',
          j: '3',
          k: '台',
          l: '800',
          m: '1300',
          n: '4670',
          o: '2',
          p: '两路交流',
          q: '6*10A'
        },
        {
          f: '数据中心机房601',
          g: 'C06',
          h: '25G接入交换机',
          i: 'RG-S5750V2',
          j: '8',
          k: '台',
          l: '800',
          m: '1300',
          n: '3200',
          o: '2',
          p: '两路交流',
          q: '4*16A'
        },
        {
          f: '数据中心机房601',
          g: 'C07',
          h: '块存储节点(SSD)',
          i: 'I620-G40',
          j: '3',
          k: '台',
          l: '800',
          m: '1300',
          n: '4680',
          o: '2',
          p: '两路交流',
          q: '8*16A'
        }
      ],
      // 总条数
      pageTotal: 0
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    // 新增设备
    addDevice() {
      console.log(this.addForm)
      // this.drawerFlag = false;
    },
    // 打开抽屉
    openDrawer() {
      this.drawerFlag = true
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
.handleBox{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  .title{
    font-weight: 700;
  }
  .btnList{
    display: flex;
    align-items: center;
  }
}
.addFormBox{
  padding: 0 10px;
  box-sizing: border-box;
  .headTitle{
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #606266;
    font-weight: 700;
    margin-bottom: 20px;
    .line{
      width: 4px;
      height: 16px;
      background: #1890ff;
      margin-right: 4px;
    }
  }
  .addBk{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dfe6ec;
    border-radius: 5px;
    font-size: 12px;
    padding: 10px 0;
    cursor: pointer;
    color: #606266;
    i{
      margin-right: 4px;
    }
  }
  .textMargin{
    margin: 0 10px;
  }
  ::v-deep{
    .el-input-number.is-controls-right .el-input__inner{
      padding-left: 0;
      padding-right: 30px;
    }
    .el-form-item{
      margin-bottom: 16px;
    }
    .indexBox{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .del{
        color: #f00;
        cursor: pointer;
      }
    }
    .bkBtn{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      .add{
        color: #1890ff;
        cursor: pointer;
      }
      .del{
        color: #f00;
        cursor: pointer;
        margin-left: auto;
      }
    }
    .bkBtn:last-child{
      border-bottom: 0;
    }
    .marginStyle{
      padding: 5px 0;
    }
  }
}
.handleList{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  box-sizing: border-box;
}
::v-deep{
  .el-drawer.rtl{
    overflow: auto;
  }
}
</style>
