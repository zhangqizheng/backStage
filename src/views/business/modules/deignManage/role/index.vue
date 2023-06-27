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
        height="calc(100vh - 350px)"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          label="本端角色名称"
          prop="f"
          width="120"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="本端设备名称"
          prop="g"
          width="120"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="本端设备编号"
          prop="h"
          width="120"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="本端设备数量"
          prop="i"
          width="110"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="指定端口"
          prop="j"
          width="220"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="对端角色名称"
          prop="k"
          width="160"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="对端设备名称"
          prop="l"
          width="120"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="对端设备编号"
          prop="m"
          width="120"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="对端设备数量"
          prop="n"
          width="110"
          align="center"
        />
        <el-table-column
          label="链路方式"
          prop="o"
          width="80"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="指定端口"
          prop="p"
          width="220"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="链路类型"
          prop="q"
          width="120"
          align="center"
        />
        <el-table-column
          label="链路数量"
          prop="r"
          width="80"
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
          f: 'SPINE交换机',
          g: 'SPINE交换机',
          h: '1-4',
          i: '4',
          j: '板卡3-40GE管模块, 单模1-16',
          k: '25G接入交换机',
          l: '25G接入交换机',
          m: '1-16',
          n: '16',
          o: 'up',
          p: '板卡1-40GE光模块, 单模1-16',
          q: '40GE光'
        },
        {
          f: '25G交换机',
          g: '25Gleaf交换机',
          h: '1-2',
          i: '2',
          j: '板卡4-40GE管模块, 单模1-16',
          k: '宿主服务器',
          l: '宿主服务器',
          m: '1-16',
          n: '16',
          o: 'up',
          p: '板卡2-40GE光模块, 单模1-16',
          q: '40GE光'
        },
        {
          f: '千兆业务管理接入交换机',
          g: '千兆业务管理接入交换机',
          h: '1-2',
          i: '2',
          j: '板卡2-40GE管模块, 单模1-16',
          k: '裸金属服务器',
          l: '裸金属服务器',
          m: '1-16',
          n: '16',
          o: 'up',
          p: '板卡3-40GE光模块, 单模1-16',
          q: '40GE光'
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
