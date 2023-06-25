<template>
  <div class="machineBox">
    <div class="handleList">
      <el-button type="primary" plain size="mini" @click="drawerFlag = true">设备上架</el-button>
      <el-button type="primary" plain size="mini">下载上架图</el-button>
      <el-button type="primary" plain size="mini">设计定稿</el-button>
    </div>
    <!--使用draggable组件-->
    <div ref="machineList" class="machineList" @mousewheel.prevent="rollImg">
      <div v-for="(item,index) in machineData" :key="index" class="machineItems">
        <div class="machineName">
          <div class="name">{{ item.machineName }}</div>
          <div class="icon">
            <i v-if="item.disabled" class="el-icon-lock" />
            <i v-else class="el-icon-unlock" />
          </div>
        </div>
        <div class="machineContent">
          <draggable
            v-model="item.list"
            :disabled="item.disabled"
            :group="groupOption"
            animation="300"
            :move="onMove"
            style="flex: 1;"
            handle=".mover"
            @start.stop="onStart"
            @end.stop="onEnd"
          >
            <transition-group style="min-height:120px; display: block;" :class="'group-' + index">
              <div
                v-for="(items, indexs) in item.list"
                :key="indexs"
                class="item"
                :class="items.name ? 'mover' : 'noBg'"
                :style="getNewStyle(items)"
              >
                <div class="name">{{ items.name }}</div>
              </div>
            </transition-group>
          </draggable>
          <div class="numList">
            <div v-for="(items,indexs) in item.allNum" :key="indexs">{{ Math.abs(items - 1 - item.allNum) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 上架设备 -->
    <el-drawer
      title="设备上架"
      size="500px"
      :modal="false"
      :wrapper-closable="false"
      :visible.sync="drawerFlag"
    >
      <div class="addFormBox">
        <el-form ref="formInline" :model="addForm" label-width="80px">
          <!-- 主要信息 -->
          <div class="equipmentNum">
            <div class="headTitle noMargin">
              <span class="line" />
              <span class="title">选择上架设备</span>
            </div>
            <div class="allnumBox">
              <div class="allNum">
                <i class="el-icon-document-copy" />
                <span class="numTitle">设备总数 </span>
                <span class="numVal">600</span>
              </div>
              <div class="upNum">
                <i class="el-icon-upload2" />
                <span class="numTitle">可上架设备总数 </span>
                <span class="numVal">450</span>
              </div>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="设备角色" prop="role">
                <el-select
                  v-model="deviceData"
                  style="width: 100%;"
                  placeholder="请选择设备角色"
                  value-key="id"
                  @change="getNum"
                >
                  <el-option
                    v-for="item in roleOption"
                    :key="item.id"
                    :label="item.label"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="numBox">
                <div class="allNum">
                  <span class="numTitle">所选设备数量</span>
                  <span class="numVal">{{ addForm.roleAllNum ? addForm.roleAllNum : 0 }}</span>
                </div>
                <div class="upNum">
                  <span class="numTitle">所选设备可上架数量</span>
                  <span class="numVal blueStyle">{{ addForm.roleUpNum ? addForm.roleUpNum : 0 }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="headTitle">
            <span class="line" />
            <span class="title">匹配上架规则</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="设备预上架机柜编号" prop="role" label-width="150px">
                <el-select
                  v-model="addForm.cabinet"
                  style="width: 100%;"
                  multiple
                  placeholder="请选择设备预上架机柜编号"
                  value-key="id"
                >
                  <el-option
                    v-for="item in cabinetOption"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="单机柜预布放数量" prop="role" label-width="150px">
                <el-input-number v-model.number="addForm.num" size="small" :min="1" :max="20" controls-position="right" style="width: 100px;" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="putawayBox">
        <el-button
          size="small"
          @click="drawerFlag = false"
        >关闭</el-button>
        <el-button
          type="primary"
          size="small"
          @click="putaway()"
        >上架设备</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
// 导入draggable组件
import draggable from 'vuedraggable'
import { machineData } from './api/data'
export default {
  // 注册draggable组件
  components: {
    draggable
  },
  data() {
    return {
      // 上架设备抽屉开关
      drawerFlag: false,
      // 上架设备数据
      addForm: {},
      // 设备角色
      deviceData: {},
      // 设备拖拽标识
      drag: false,
      // 拖拽配置
      groupOption: {
        name: 'machine',
        pull: true,
        put: true
      },
      roleOption: [
        {
          id: '1',
          label: '用户日志存储服务器',
          allNum: 30,
          upNum: 12
        }, {
          id: '2',
          label: '内容存储服务器',
          allNum: 40,
          upNum: 15
        }, {
          id: '3',
          label: '监控告警服务器',
          allNum: 63,
          upNum: 42
        }, {
          id: '4',
          label: '带外管理服务器',
          allNum: 15,
          upNum: 6
        }, {
          id: '5',
          label: '省中心点播管理服务器',
          allNum: 51,
          upNum: 23
        }
      ],
      cabinetOption: [
        {
          id: 'C-01',
          label: 'C-01'
        },
        {
          id: 'C-02',
          label: 'C-02'
        },
        {
          id: 'C-03',
          label: 'C-03'
        },
        {
          id: 'C-04',
          label: 'C-04'
        },
        {
          id: 'C-05',
          label: 'C-05'
        },
        {
          id: 'D-01',
          label: 'D-01'
        },
        {
          id: 'D-02',
          label: 'D-02'
        },
        {
          id: 'D-03',
          label: 'D-03'
        }
      ],
      // 机柜数据
      machineData: machineData,
      // 拖出对象
      fromObj: {},
      // 拖入对象
      toObj: {},
      // 拖出下标
      fromIndex: 0,
      // 拖入对象
      toIndex: 0,
      // 空数组之在的样式，设置了这个样式才能拖入
      style: 'min-height:120px;display: block;',
      num: 1,
      flag: false
    }
  },
  mounted() {
    this.getMergeStyle()
    this.changeLoction()
  },
  methods: {
    // 上架设备
    putaway() {
      console.log('上架设备')
      this.drawerFlag = false
    },
    // 开始拖拽事件
    onStart(e) {
      document.onmousemove = null
      document.onmouseup = null
      console.log('start', e)
      this.drag = true
      this.fromIndex = e.from.className.split('-')[1]
    },
    // 开始移动事件
    onMove(e) {
      // console.log('move', e)
      // 原来数据
      this.fromObj = e.draggedContext
      // 要放置数据
      this.toObj = e.relatedContext
      // 要放置的机柜下标
      this.toIndex = e.to.className.split('-')[1]
      // 要放置数组下标
      const toObjIndex = e.relatedContext.index
      // 要放置数组
      const toList = e.relatedContext.list
      // 要放置数组上一条数据
      const lastObj = toList[toObjIndex - 1]
      // 要放置数组下一条数据
      const nextObj = toList[toObjIndex + 1]
      console.log(lastObj, nextObj)
      if (lastObj.name === '' && nextObj.name === '') {
        console.log('可以放置')
      } else {
        console.log('不可以放置')
      }
      // for (let i = 0; i < this.fromObj.element.u; i++) {
      // let upObj = toList[toObjIndex - (i + 1)]
      // console.log(upObj)
      // let downObj = toList[toObIndex + (i + 1)]
      // if(upObj.name === ''){
      //   console.log('可以放置')
      // }else{
      //   console.log('不可以放置')
      // }
      // }
    },
    // 拖拽结束事件
    onEnd(e) {
      // console.log('end', e)
      this.drag = false
      if (this.fromIndex !== this.toIndex) {
        // 原机柜增加空
        if (this.fromObj.element.u > 0) {
          console.log(this.fromObj.element.u)
          for (let i = 0; i < this.fromObj.element.u; i++) {
            // 拖出数组增加空层
            const obj = { ...this.fromObj.element, name: '', u: 0 }
            this.machineData[this.fromIndex].list.splice(this.fromObj.index, 0, obj)
            // 拖入数组删除空层
            this.machineData[this.toIndex].list.splice(this.toObj.index + 1, 1)
            this.$set(this.machineData[this.toIndex].list[this.toObj.index], 'id', Math.abs(this.toObj.index - 43).toString())
          }

          // const obj = { ...this.fromObj.element, name: '', u: 0 }
          // this.machineData[this.fromIndex].list.splice(this.fromObj.index, 0, obj)

          console.log('拖出下标', this.fromObj.index)
          console.log('拖入下标', this.toObj.index)
          console.log('拖出数据', this.machineData[this.fromIndex].list[this.fromObj.index])
          console.log('拖入数据', this.machineData[this.toIndex].list[this.toObj.index])
        }
      }
    },
    // 拖拽
    changeLoction() {
      var box = document.querySelector('.machineBox')
      // 鼠标按下
      box.onmousedown = (e) => {
        // 鼠标相对于盒子的位置
        var offsetX = e.clientX - box.offsetLeft + 15
        var offsetY = e.clientY - box.offsetTop + 124
        // 鼠标移动
        document.onmousemove = (e) => {
          box.style.left = e.clientX - offsetX + 'px'
          box.style.top = e.clientY - offsetY + 'px'
        }
        // 鼠标抬起
        document.onmouseup = () => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    // 缩放
    rollImg(e) {
      const el = this.$refs.machineList
      var mouseX = e.clientX - el.offsetLeft - 220
      var mouseY = e.clientY - el.offsetTop - 100
      if (e.wheelDelta || e.detail) {
        if (e.wheelDelta > 0 || e.detail < 0) { // 当鼠标滚轮向上滚动时
          this.num += 0.1
          el.style.transform = `scale(${this.num}, ${this.num})`
          el.style.transformOrigin = mouseX + 'px ' + mouseY + 'px'
        }
        if (e.wheelDelta < 0 || e.detail > 0) { // 当鼠标滚轮向下滚动时
          if (this.num > 0.2) {
            this.num -= 0.1
            el.style.transform = `scale(${this.num}, ${this.num})`
            el.style.transformOrigin = mouseX + 'px ' + mouseY + 'px'
          }
        }
      }
    },
    // 数据初始化
    getMergeStyle() {
      this.machineData.forEach(item => {
        item.list.forEach((items, index) => {
          if (items.u > 1) {
            for (let i = 1; i < items.u; i++) {
              item.list.splice(index + 1, 1)
            }
          }
        })
      })
    },
    // 合并列
    getNewStyle(item) {
      const oneU = { height: '20px' }
      const moreU = { height: 20 * item.u + 'px' }
      if (item.u === 1 || item.u === 0) {
        return oneU
      } else {
        return moreU
      }
    },
    // 获取设备数量
    getNum(item) {
      this.addForm.role = item.id
      this.addForm.roleAllNum = item.allNum
      this.addForm.roleUpNum = item.upNum
      console.log(this.addForm.role, this.addForm.roleAllNum, this.addForm.roleUpNum)
    }
  }
}
</script>
<style lang='scss' scoped>
.machineBox {
  width: 100%;
  height: calc(100vh - 150px);
  // padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  .handleList{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    top: 100px;
    right: 10px;
    z-index: 9;
  }
  .machineList {
    width: 100%;
    display: flex;
    margin-top: 40px;
    .machineName{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-bottom: 6px;
      padding: 0 5px;
      box-sizing: border-box;
      .name{
        margin: auto;
      }
      .icon{
        font-size: 20px;
      }
    }
    .machineContent {
      width: 240px;
      border-top: solid 1px #aaa;
      display: flex;
      .item {
        width: 100%;
        height: 20px;
        padding: 0 12px;
        line-height: 20px;
        border: solid 1px #aaa;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0;
        font-size: 12px;
      }
      .item:hover {
        cursor: move;
      }
      .noBg {
        background: #fff;
      }
      .numList{
        width: 30px;
        display: flex;
        flex-direction: column;
        >div{
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border: solid 1px #aaa;
          border-top: 0;
          border-left: 0;
        }
      }
    }
    .machineItems + .machineItems {
      margin-left: 30px;
    }
  }

  .addFormBox{
    height: calc(100% - 70px);
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
    .noMargin{
      margin-bottom: 0;
    }
    .equipmentNum{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .allnumBox{
        display: flex;
        align-items: center;
        >div{
          .numTitle{
            margin: 0 2px;
          }
          .numVal{
            font-weight: 700;
          }
        }
        .allNum{
          margin-right: 20px;
        }
      }
    }
    .numBox{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 30px;
      >div{
        flex: 1;
        height: 60px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background: #1890ff10;
        padding: 10px;
        box-sizing: border-box;
        .numVal{
          font-size: 16px;
        }
        .blueStyle{
          color: #00a6ff;
        }
      }
      .allNum{
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }

  .putawayBox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
