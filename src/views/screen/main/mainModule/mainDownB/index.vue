<!--
 * @Author: your name
 * @Date: 2019-12-25 16:41:22
 * @LastEditTime: 2020-12-04 15:27:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /SunSea-Github/src/views/screen/main/mainModule/mainDownA/index.vue
 -->
<!-- 中下1 -->
<template>
  <div class="mainStyle">
    <el-row class="heardStyle">
      <el-col :span="24">
        <svg-icon class="iconStyle" icon-class="mingzhong" /> <span>人工坐席话务量</span>
      </el-col>
    </el-row>
    <el-row class="bodyStyle">
      <el-col :span="18" style="height: 100%;">
        <div class="tableMainDownB">
          <el-table
            :data="alarmList"
            height="21vh"
            :show-header="true"
            :header-cell-style="{background:'#156393a9',color:'#D8FFFC'}"
            :cell-style="cellStyle"
            style="width: 100%"
          >
            <el-table-column
              prop="data1"
              align="center"
              label="坐席工号"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              align="center"
              label="呼入"
            >
              <template slot-scope="props">
                <span v-if="props.row.data2===2" class="alarmType1">车辆告警</span>
                <span v-else class="alarmType2">人脸告警</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="data3"
              align="center"
              label="呼出"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="data4"
              align="center"
              label="总计"
            />
            <el-table-column
              :show-overflow-tooltip="true"
              prop="data5"
              align="center"
              label="总计时长"
            />
          </el-table>
        </div>
      </el-col>
      <el-col :span="6" style="height: 100%;">
        <div class="phoneMainDownB">
          <div class="tltle">
            人工坐席排队
          </div>
          <div class="phoneIcon">
            <img :src="phoneImage" class="phone">
          </div>
          <div class="numberStyle">
            <div class="grid-bg">
              <div class="spanStyle">0</div>
            </div>
            <div class="grid-bg">
              <div class="spanStyle">0</div>
            </div>
            <div class="grid-bg">
              <div class="spanStyle">0</div>
            </div>
            <div class="grid-bg">
              <div class="spanStyle">5</div>
            </div>
          </div>
          <div class="belowStyle" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import phone from '@/assets/theme/phone.gif'
export default {
  name: 'MainDownA',
  components: {
  },
  data() {
    return {
      phoneImage: phone,
      alarmList: [
        {
          data1: '1753',
          data2: '2',
          data3: '32',
          data4: '42',
          data5: '00:00:55'
        }, {
          data1: '2136',
          data2: '2',
          data3: '33',
          data4: '43',
          data5: '00:00:21'
        }, {
          data1: '3316',
          data2: '2',
          data3: '43',
          data4: '54',
          data5: '00:00:33'
        }, {
          data1: '4211',
          data2: '2',
          data3: '31',
          data4: '41',
          data5: '00:00:65'
        }, {
          data1: '5121',
          data2: '2',
          data3: '63',
          data4: '84',
          data5: '00:00:65'
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    // 图标初始化
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if ((rowIndex % 2) === 1) {
        return 'background:#1f67889e;font-weight:700;color:#D8FFFC'
      } else {
        return 'background:#0e4c737d;font-weight:700;color:#D8FFFC'
      }
    }
  }
}
</script>
<style  lang="scss" scoped>
  .mainStyle{
    height: 100%;
    .heardStyle{
      padding-top: .1vh;
      padding-left: .5vw;
      text-align: left;
      height: 12%;
      background-image: url('../../../../../assets/theme/big-title.png');
      background-repeat: no-repeat;   //不重复
      background-size: 100% 100%;     // 满屏
      .iconStyle{
        color: #17E1CD;
      }
      span{
        font-size: 1rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.85);
        line-height: 3vh;
      }
      @media screen and (max-width:1440px){
        span{
          font-size: .8rem;
        }
      }
      .moreStyle{
        text-align: right;
        padding-right: .5vw;
        a{
          font-size: .8rem;
          font-weight: 500;
          color: #17E1CD;
          line-height: 3vh;
        }
      }
    }
    .bodyStyle{
      padding: 10px;
      overflow: auto;
      height: 88%;
      background: rgba(3,23,31,0.41);
      border-radius: 0px 0px 4px 4px;
      border: 2px solid rgba(51, 101, 172, 0.2);
      text-align: center;
      .tableMainDownB{
        height: 100%;
        padding-right: 10px;
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
      }
      .phoneMainDownB{
        height: 100%;
        background-image: url('../../../../../assets/theme/phone-bg.png');
        background-repeat: no-repeat;   //不重复
        background-size: 100% 100%;     // 满屏
        .tltle{
          height: 15%;
          font-size: 14px;
          padding-top: 1.3vh;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #D9FFFC;
        }
        .phoneIcon{
          height: 65%;
          .phone{
            width: 100%;
            height: 100%;
            transform: rotateY(180deg);
          }
        }
        .numberStyle{
          height: 15%;
          margin-left: 10px;
          .grid-bg{
            width: 30px;
            height: 30px;
            display: inline-block;
            background: #124d75bc;
            border: 1px solid #10466bd8;
            margin-right: 10px;
            .spanStyle{
              margin-top: 5px;
            }
          }
          @media screen and (max-width:1440px){
            .grid-bg{
              width: 25px;
              height: 25px;
              display: inline-block;
              background: #124d75bc;
              border: 1px solid #10466bd8;
              margin-right: 10px;
              .spanStyle{
                margin-top: 5px;
              }
            }
          }
        }
        .belowStyle{
          height: 5%;
        }
      }
    }
  }
</style>
