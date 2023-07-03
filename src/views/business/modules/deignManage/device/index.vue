<template>
  <div>
    <div class="g-box">
      <div class="g-filter">
        <el-form ref="formInline" :model="pageParam" label-width="80px">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="厂商" prop="firm">
                <el-select
                  v-model="pageParam.firm"
                  placeholder="请选择厂商"
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
      </div>
      <div class="contentBox">
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
        </div>
        <el-table
          ref="showTable"
          :data="tableData"
          stripe
          border
          style="width: 100%;"
          height="calc(100vh - 350px)"
        >
          <el-table-column
            type="selection"
            align="center"
            width="55"
          />
          <el-table-column
            type="index"
            label="序号"
            width="50"
            align="center"
          />
          <el-table-column
            label="厂商"
            prop="f"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="型号"
            prop="g"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="CPU类型"
            prop="h"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="CPU配置"
            prop="i"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="内存配置"
            prop="j"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="系统盘"
            prop="k"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="数据盘"
            prop="l"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="缓存盘"
            prop="m"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="raid卡"
            prop="n"
            width="80"
            align="center"
          />
          <el-table-column
            label="板卡信息"
            prop="n"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备标牌功率"
            prop="o"
            width="100"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="是否现网在用设备"
            prop="p"
            width="80"
            align="center"
          />
          <el-table-column
            label="电源模块"
            prop="q"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="电源类型"
            prop="e"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="插座要求"
            prop="s"
            width="120"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="设备尺寸(高x宽x深)(mm)"
            prop="t"
            width="160"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            label="单台高度(U)"
            prop="u"
            width="80"
            align="center"
          />
          <el-table-column
            label="重量(kg)"
            prop="v"
            width="80"
            align="center"
          />
          <el-table-column
            label="是否定制化"
            prop="w"
            width="80"
            align="center"
          />
          <el-table-column label="操作" width="100" align="center" fixed="right">
            <template>
              <el-button-group class="tab-button-group">
                <el-link
                  type="primary"
                >编辑</el-link>
                |
                <el-link
                  type="primary"
                >删除</el-link>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firmOption: [{
        value: '1',
        label: '厂商1'
      }, {
        value: '2',
        label: '厂商2'
      }, {
        value: '3',
        label: '厂商3'
      }, {
        value: '4',
        label: '厂商4'
      }, {
        value: '5',
        label: '厂商5'
      }],
      // 查询条件
      pageParam: {
        page: 0,
        pageSize: 10
      },
      // 列表数据
      tableData: [
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '烽火',
          g: 'S6805-54HF',
          h: '海光 7265',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '四川虹信',
          g: 'S6805-54HF',
          h: 'Intel 5320',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '紫光',
          g: 'S6805-54HF',
          h: 'Kunpeng 5320',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '可控',
          g: 'S6805-54HF',
          h: 'X86',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '华为',
          g: 'S6805-54HF',
          h: '海光 7265',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '锐捷',
          g: 'S6805-54HF',
          h: 'X86',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: 'H3C',
          g: 'S6805-54HF',
          h: 'Kunpeng 5320',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '锐捷',
          g: 'S6805-54HF',
          h: 'X86',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '华为',
          g: 'S6805-54HF',
          h: '海光 7265',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
        },
        {
          a: '4U缓存服务器',
          b: 1,
          c: 'CT3',
          d: '缓存服务器',
          e: '1',
          f: '四川虹信',
          g: 'S6805-54HF',
          h: 'Intel 5320',
          i: '2C64核',
          j: '16*32G',
          k: '2*1.8TSAS',
          l: '24*16TSATA',
          m: '4*32TPCIE NVMESSD',
          n: '1',
          o: '2XIntel 8378A(21Cores,3.0GHz)CPU',
          p: '646W',
          q: '2',
          r: '交流',
          s: '2*10A',
          t: '44(1RU)x440x400',
          u: '1',
          v: '10',
          w: '否'
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
