<template>
  <div class="machineBox">
    <!--使用draggable组件-->
    <div class="machineList">
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
            @start="onStart"
            @end="onEnd"
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
      drag: false,
      disabled: false,
      groupOption: {
        name: 'machine',
        pull: true,
        put: true
      },
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
      style: 'min-height:120px;display: block;'
    }
  },
  mounted() {
    this.getMergeStyle()
  },
  methods: {
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
    // 开始拖拽事件
    onStart(e) {
      // console.log('start', e)
      this.drag = true
      this.fromIndex = e.from.className.split('-')[1]
    },
    // 拖拽结束事件
    onEnd(e) {
      // console.log('end', e)
      this.drag = false
      if (this.fromIndex !== this.toIndex) {
        // 原机柜增加空
        if (this.fromObj.element.u > 0) {
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
    // 开始移动事件
    onMove(e) {
      console.log('move', e)
      this.fromObj = e.draggedContext
      this.toObj = e.relatedContext
      this.toIndex = e.to.className.split('-')[1]

      // this.machineData[this.toIndex].list.forEach((item, index)=>{
      // if(!item.u){
      // this.machineData[this.toIndex].list.splice(this.toObj.index, 1)
      // const obj = { id: Math.abs(index - item.allNum), name: '', u: 0 }
      // this.machineData[this.toIndex].list.splice(this.toObj.index, 0, obj)
      // this.$set(this.machineData[this.toIndex].list[this.toObj.index], 'id', Math.abs(this.toObj.index - 43).toString())
      // }
      // })
      // console.log(this.machineData[this.toIndex].list)
    }
  }
}
</script>
<style lang='scss' scoped>
.machineBox {
  width: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  .machineList {
    width: 100%;
    display: flex;
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
}
</style>
