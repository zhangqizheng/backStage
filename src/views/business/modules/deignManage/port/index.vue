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
          label="板卡名称"
          prop="f"
          width="200"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="端口号"
          prop="g"
          width="100"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="端口类型"
          prop="h"
          width="220"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="对端设备"
          prop="i"
          width="160"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="对端位置"
          prop="j"
          width="100"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="对端端口"
          prop="k"
          width="160"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="备注"
          prop="l"
          width="120"
          show-overflow-tooltip
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
          f: '48端口25GE光口',
          g: '1~7',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-1~7',
          j: 'C01',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '8~14',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '15~21',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '22~28',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '29~35',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '36~42',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '43~49',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '50~46',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '57~63',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '64~70',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '71~70',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '78~84',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
        },
        {
          f: '48端口25GE光口',
          g: '85~91',
          h: '25G光模块,多模(850nm,100m,SR,MM,LC)',
          i: '宿主机（6系）-8~14',
          j: 'C02',
          k: '25G网卡-1-1',
          l: ''
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
