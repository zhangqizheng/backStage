<!--
 * @Author: your name
 * @Date: 2019-12-25 16:41:22
 * @LastEditTime: 2020-11-24 13:13:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/views/screen/main/mainModule/leftMid/index.vue
 -->
<!-- 左中 -->
<template>
  <div class="mainStyle">
    <el-row class="heardStyle">
      <el-col :span="24"><svg-icon class="iconStyle" icon-class="mingzhong" /> <span>地区综合排名</span></el-col>
    </el-row>
    <el-row class="bodyStyle">
      <el-col :span="24">
        <!-- 控制区域 开始 -->
        <div class="tableMainDownB">
          <el-table
            :data="alarmList"
            height="100%"
            :show-header="true"
            :header-cell-style="{background:'#156393a9',color:'#D8FFFC'}"
            :cell-style="cellStyle"
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="序号"
              type="index"
              width="50"
            />
            <el-table-column
              align="center"
              label="地区名称"
              prop="cityName"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="num1"
              align="center"
              label="机构数"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="num2"
              align="center"
              label="学员数"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="num3"
              align="center"
              label="培训总数"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="num4"
              align="center"
              label="取证率"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="num5"
              align="center"
              label="就业率"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="num6"
              align="center"
              label="合格率"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="num7"
              align="center"
              label="评价分"
            />
          </el-table>
        </div>
        <!-- 控制区域 结束 -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'LeftMid',
  components: {
  },
  data() {
    return {
      alarmList: [
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        },
        {
          cityName: '北京市',
          num1: '12',
          num2: '523',
          num3: '34',
          num4: '90%',
          num5: '95%',
          num6: '98%',
          num7: '4.9'
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if ((rowIndex % 2) === 1) {
        return 'background:rgba(0,154,201,.1);color:#D8FFFC;font-size:12px;'
      } else {
        return 'background:rgba(0,19,105,.1);color:#D8FFFC;font-size:12px;'
      }
    }
  }
}
</script>
<style  lang="scss" scoped>
  .mainStyle{
    height: 100%;
    .heardStyle{
      padding-left: .5vw;
      text-align: left;
      height: 8%;
      background-image: url('../../../../../assets/visual/titleBg.png');
      background-repeat: no-repeat;   //不重复
      background-size: 100% 100%;     // 满屏
      // border-radius: 4px 4px 0px 0px;
      // opacity: 0.8;
      // border: 3px solid;
      // border-image: radial-gradient(circle, rgba(124, 190, 255, 1), rgba(51, 101, 172, 0)) 3 3;
      .iconStyle{
        color: #17E1CD;
      }
      span{
        font-size: 1rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.85);
        line-height: 3.5vh;
      }
      @media screen and (max-width:1440px){
        span{
          font-size: .8rem;
        }
      }
    }
    .bodyStyle{
      overflow: auto;
      height: 92%;
      background: rgba(3,23,31,0.41);
      border-radius: 0px 0px 4px 4px;
      border: 2px solid rgba(51, 101, 172, 0.2);
      padding: 10px;
      .iconStyle{
        margin-top: 15%;
        width: 120px;
        height: 120px;
      }
      .tableMainDownB{
        height: 100%;
        @media screen and (max-width:1440px){
          ::v-deep .el-table{
            font-size: 8px;
          }
        }
        ::v-deep .el-table, .el-table__expanded-cell {
          background-color: transparent;
          color:'#D8FFFC';
          border: none;
        }
        ::v-deep .el-table tr {
          background-color: transparent!important;
          color:'#D8FFFC';
          border: none;
        }
        ::v-deep .el-table th.is-leaf  {
          border: none;
        }
        ::v-deep .el-table__row>td{
          border: none;
        }
        ::v-deep .el-table th{
          background-color: transparent;
          border: none;
        }
        ::v-deep .el-table--enable-row-transition .el-table__body td, .el-table .cell{
          background-color: transparent;
          color:'#D8FFFC';
          border: none;
        }
        ::v-deep .el-table::before {//去除底部白线
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0px;
        }
        ::v-deep .el-table--medium th, .el-table--medium td{
          padding: 2px 0;
        }
      }
    }
  }
</style>
