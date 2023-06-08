<!--
 * @Author: your name
 * @Date: 2019-12-20 13:36:22
 * @LastEditTime: 2020-12-02 15:41:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0-Gitee/src/views/screen/main/index.vue
 -->
<template>
  <div class="mainStyle">
    <el-row style="height: 100%;">
      <el-col :span="6" style="height: 100%;">
        <el-row class="leftTop">
          <el-col :span="24" style="height: 100%;">
            <div v-if="layoutTheme" class="block" :class="{active:layOutState==='leftTop'}" @click="componentSelect('leftTop')">
              <component :is="arrangementData.leftTopName" />
            </div>
            <component :is="arrangementData.leftTopName" v-else />
          </el-col>
        </el-row>
        <el-row class="leftMid">
          <el-col :span="24" style="height: 100%;">
            <div v-if="layoutTheme" class="block" :class="{active:layOutState==='leftMid'}" @click="componentSelect('leftMid')">
              <component :is="arrangementData.leftMidName" />
            </div>
            <component :is="arrangementData.leftMidName" v-else />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" style="height: 100%;">
        <el-row style="height: 50%;">
          <el-col class="mainDownA" :span="24">
            <div v-if="layoutTheme" class="block" :class="{active:layOutState==='screenMap'}" @click="componentSelect('screenMap')">
              <component :is="arrangementData.screenMapName" />
            </div>
            <component :is="arrangementData.screenMapName" v-else />
          </el-col>
        </el-row>
        <el-row style="height: 50%;">
          <el-col class="mainDownA" :span="24">
            <div v-if="layoutTheme" class="block" :class="{active:layOutState==='mainDownA'}" @click="componentSelect('mainDownA')">
              <component :is="arrangementData.mainDownAName" />
            </div>
            <component :is="arrangementData.mainDownAName" v-else />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" style="height: 100%;">
        <el-row class="rightTop">
          <el-col :span="24" style="height: 100%;">
            <div v-if="layoutTheme" class="block" :class="{active:layOutState==='rightTop'}" @click="componentSelect('rightTop')">
              <component :is="arrangementData.rightTopName" />
            </div>
            <component :is="arrangementData.rightTopName" v-else />
          </el-col>
        </el-row>
        <el-row class="rightMid">
          <el-col :span="24" style="height: 100%;">
            <div v-if="layoutTheme" class="block" :class="{active:layOutState==='rightMid'}" @click="componentSelect('rightMid')">
              <component :is="arrangementData.rightMidName" />
            </div>
            <component :is="arrangementData.rightMidName" v-else />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { leftMid, leftTop, screenMap, mainDownA, rightMid, rightTop } from './mainModule'
export default {
  name: 'Main',
  components: { leftMid, leftTop, screenMap, mainDownA, rightMid, rightTop },
  data() {
    return {
      layoutTheme: false, // 判断是否进行模块调整
      layOutState: '', // 调整模块时的状态变量【很重要】
      arrangementState: Cookies.get('arrangementState'),
      arrangementData: {
        leftTopName: 'leftTop', // 定义左侧三个模块组件名称
        leftMidName: 'leftMid',
        leftDownName: 'leftDown',
        screenMapName: 'screenMap',
        mainDownAName: 'mainDownA', // 定义中间下面四个模块组件名称
        mainDownBName: 'mainDownB', // 定义中间下面四个模块组件名称
        rightTopName: 'rightTop', // 定义右侧三个模块组件名称
        rightMidName: 'rightMid',
        rightDownName: 'rightDown'
      },

      // 组件初始化
      componentList: [
        { name: 'leftTop', title: '道路安全监测', id: '1', icon: 'SSJK' },
        { name: 'leftMid', title: '人员密度监测', id: '2', icon: 'UGM' },
        { name: 'leftDown', title: '道路卫生监测', id: '3', icon: 'ManholeCover' },
        { name: 'rightTop', title: '消防安全监测', id: '9', icon: 'XFS' },
        { name: 'rightMid', title: '能耗监测', id: '10', icon: 'LL' },
        { name: 'rightDown', title: '停车监测', id: '11', icon: 'chewei' },
        { name: 'mainDownB', title: 'BBBBBBBB', id: '4', icon: 'zhihuihuanwei' },
        { name: 'mainDownA', title: '环境质量监测', id: '5', icon: 'zhihuihuanwei' }
      ]
    }
  },
  watch: {
  },
  mounted() {
    /**
     * 大屏组件初始化
     * 这里可以调用服务接口返回对应数据
     */
    this.$EventBus.$on('changeCaseTrue', (val) => {
      this.layoutTheme = val
    })

    this.$EventBus.$on('changeCaseFalse', (val) => {
      this.layoutTheme = val
      const arrangementData = {
        leftTopName: this.arrangementData.leftTopName,
        leftMidName: this.arrangementData.leftMidName,
        leftDownName: this.arrangementData.leftDownName,
        mainDownAName: this.arrangementData.mainDownAName,
        rightTopName: this.arrangementData.rightTopName,
        rightMidName: this.arrangementData.rightMidName,
        rightDownName: this.arrangementData.rightDownName
      }
      Cookies.set('arrangementData', arrangementData)
    })
    if (Cookies.get('arrangementState') === '1') {
      this.arrangementData = JSON.parse(Cookies.get('arrangementData'))
    }
  },

  methods: {
    /**
     * 初始化
     */
    init() {
    },
    /**
     * 大屏模块选择
     * 选中大屏某一模块后进行调整
     */
    componentSelect(e) {
      this.layOutState = ''
      switch (e) {
        case 'leftTop':
          this.layOutState = 'leftTop'
          break
        case 'leftMid':
          this.layOutState = 'leftMid'
          break
        case 'leftDown':
          this.layOutState = 'leftDown'
          break
        case 'rightTop':
          this.layOutState = 'rightTop'
          break
        case 'rightMid':
          this.layOutState = 'rightMid'
          break
        case 'rightDown':
          this.layOutState = 'rightDown'
          break

        case 'mainDownA':
          this.layOutState = 'mainDownA'
          break

        default:
          break
      }
    },
    /**
     * 调换选择中模块内组件
     */
    componentFun(e) {
      switch (this.layOutState) {
        case 'leftTop':
          this.arrangementData.leftTopName = e
          break
        case 'leftMid':
          this.arrangementData.leftMidName = e
          break
        case 'leftDown':
          this.arrangementData.leftDownName = e
          break
        case 'rightTop':
          this.arrangementData.rightTopName = e
          break
        case 'rightMid':
          this.arrangementData.rightMidName = e
          break
        case 'rightDown':
          this.arrangementData.rightDownName = e
          break
        case 'mainDownA':
          this.arrangementData.mainDownAName = e
          break
        default:
          this.$message({
            message: '请先选择要调换的模块',
            type: 'warning'
          })
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mainStyle{
  padding: 5px;
  height: 100%;
  .changeBox{
    height: 100%;
    padding:5px;
    .screenCase{
      height: 100%;
      overflow: auto;
      background: #0B214C;
      border-radius: 0px 0px 4px 4px;
      opacity: 0.77;
      border: 4px solid rgba(51, 102, 172, 0.418);
      .caseTitle{
        text-align: center;
        color: #189BD5;
      }
      .caseBody{
        height: 50vh;
        overflow: auto;
        .elColStyle{
          padding:10px;
        }
        .box-card{
          height: 165px;
          .clearfix{
            span{
              font-size: .8rem;
              color:#189BD5;
            }
            a{
              font-size: .8rem;
              color:#F78C01;
            }
          }
          .component-item{
            text-align: center;
            .iconStyle{
              color: #189BD5;
              width: 80px;
              height: 80px;
            }
            span{
              color:#666;
            }
          }
        }
      }
    }
  }
  .map{
    height: 100%;
    padding:5px;
    .screenMap{
      overflow: auto;
      height: 100%;
      background: #0B214C;
      border-radius: 0px 0px 4px 4px;
      opacity: 0.77;
      border: 4px solid rgba(51, 101, 172, 0.2);
    }
  }
  .leftTop{
    height: 50%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .leftMid{
    height: 50%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .leftDown{
    height: 30%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .rightTop{
    height: 50%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .rightMid{
    height: 50%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .rightDown{
    height: 30%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .mainDownA{
    height: 100%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .mainDownB{
    height: 100%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .mainDownC{
    height: 100%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
  .mainDownD{
    height: 100%;
    .block {
      height: 100%;
      position: relative;
    }
    .block:hover{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active{
      box-sizing: border-box;
      border: 2px solid rgba(51, 102, 172, 0.562);
    }
    .active:before {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      border: 17px solid rgb(0, 71, 170);
      border-top-color: transparent;
      border-left-color: transparent;
      color: #fff;
    }
    .active:after {
      content: '';
      display: block;
      width: 5px;
      height: 12px;
      position: absolute;
      right: 6px;
      bottom: 6px;

      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
    }
  }
}
</style>
