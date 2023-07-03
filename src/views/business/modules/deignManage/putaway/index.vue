<template>
  <div class="machineBox">
    <div class="handleList">
      <el-button type="primary" plain size="mini" @click="openDrawer()">设备上架</el-button>
      <el-button type="primary" plain size="mini">下载上架图</el-button>
      <el-button type="primary" plain size="mini">设计定稿</el-button>
    </div>
    <!--使用draggable组件-->
    <div ref="machineList" class="machineList" @mousewheel.prevent="rollImg">
      <div v-for="(row,i) in machineData" :key="i" class="rowList" :class="'row-' + i">
        <div v-for="(item,index) in row" :key="index" class="machineItems">
          <div class="machineName">
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="machineContent">
            <draggable
              v-model="item.list"
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
                  :class="[items.name ? 'mover' : 'noBg', items.locked ? 'locked' : '']"
                  :style="getNewStyle(items)"
                >
                  <div class="name">{{ items.name }}</div>
                  <!-- <div class="icon" v-show="!items.locked">
                    <i v-if="!items.locked" class="el-icon-lock" />
                    <i v-else class="el-icon-unlock" />
                  </div> -->
                </div>
              </transition-group>
            </draggable>
            <div class="numList">
              <div v-for="(items,indexs) in item.udigit" :key="indexs">{{ Math.abs(items - 1 - item.udigit) }}</div>
            </div>
          </div>
          <div class="machineInfo">
            <div>{{ item.spec }}</div>
            <div>{{ item.power }}</div>
            <div>{{ item.pdu }}</div>
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
        <el-form ref="formInline" :model="addForm" :rules="rules" label-width="80px">
          <!-- 主要信息 -->
          <div class="equipmentNum">
            <div class="headTitle noMargin">
              <span class="line" />
              <span class="title">选择上架设备</span>
            </div>
            <div class="allnumBox">
              <div class="udigit">
                <i class="el-icon-document-copy" />
                <span class="numTitle">设备总数 </span>
                <span class="numVal">{{ addForm.deviceAllNum }}</span>
              </div>
              <div class="upNum">
                <i class="el-icon-upload2" />
                <span class="numTitle">可上架设备总数 </span>
                <span class="numVal">{{ addForm.deviceCanNum }}</span>
              </div>
            </div>
          </div>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="设备角色" prop="roleId">
                <el-select
                  v-model="addForm.roleId"
                  style="width: 100%;"
                  placeholder="请选择设备角色"
                  value-key="id"
                  @change="getNum"
                >
                  <el-option
                    v-for="item in roleOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="numBox">
                <div class="udigit">
                  <span class="numTitle">所选设备数量</span>
                  <span class="numVal">{{ addForm.roleAllNum ? addForm.roleAllNum : 0 }}</span>
                </div>
                <div class="useNum">
                  <span class="numTitle">所选设备已上架数量</span>
                  <span class="numVal">{{ addForm.roleAllNum ? addForm.roleAllNum - addForm.roleCanNum : 0 }}</span>
                </div>
                <div class="upNum">
                  <span class="numTitle">所选设备可上架数量</span>
                  <span class="numVal blueStyle">{{ addForm.roleCanNum ? addForm.roleCanNum : 0 }}</span>
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
              <el-form-item label="设备预上架机柜编号" prop="cabinet" label-width="150px">
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
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="单机柜预布放数量" prop="count" label-width="150px">
                <el-input-number v-model.number="addForm.count" size="small" :min="1" :max="addForm.roleCanNum" controls-position="right" style="width: 100px;" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="ruleBox">
                <div class="headTitle noMargin">
                  <span class="line" />
                  <span class="title">全局约束规则</span>
                </div>
                <div class="ruleList">
                  <div v-for="(item,index) in ruleList" :key="index" class="ruleItem">
                    <el-checkbox v-model="checked" disabled style="margin-right: 10px;" />{{ item }}
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="ruleBox">
                <div class="headTitle noMargin">
                  <span class="line" />
                  <span class="title">设备上架规则</span>
                </div>
                <div class="ruleList">
                  <div v-for="(item,index) in ruleList2" :key="index" class="ruleItem">
                    <el-checkbox v-model="checked" style="margin-right: 10px;" />{{ item }}
                  </div>
                </div>
              </div>
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
import { getListData, getRoleList, getAllCount, roleCount, deviceShelf, deviceCheck } from './api/index'
export default {
  name: 'Putaway',
  // 注册draggable组件
  components: {
    draggable
  },
  data() {
    return {
      // 上架设备抽屉开关
      drawerFlag: false,
      ruleList: [
        '单机柜设备布放占用U位数不能超过该机柜可用U位数;',
        '单机柜设备布放占用插座数量不能超过该机柜可用插座数量;',
        '单机柜设备布放占用功耗和不能超过该机柜可用功耗;'
      ],
      ruleList2: [
        '设备由机柜底端最小可用U位数开始向上布放设备 (适用于服务器设备);',
        '设备布放时在上方预留1U间隙 (适用于服务器设备);',
        '设备由机柜上端最大可用U位数开始向下布放设备 (适用于交换机设备);',
        '间隙用于理线架，适用于交设备布放时在下方预留2U间隙换机设备) ;'
      ],
      // 上架设备数据
      addForm: {
        // 设备总数量
        deviceAllNum: 0,
        // 可上架数量
        deviceCanNum: 0,
        // 上架的机柜号
        cabinet: [],
        // 设备角色Id
        roleId: '',
        // 设备角色数量
        roleAllNum: '',
        // 设备角色可上架数量
        roleCanNum: '',
        // 单机柜放置数量
        count: ''
      },
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
      roleOption: [],
      cabinetOption: [],
      // 机柜数据
      machineData: [],
      dragObj: {},
      // 拖出对象
      fromObj: {},
      // 拖入对象
      toObj: {},
      // 拖出下标
      fromIndex: null,
      // 拖入下标
      toIndex: null,
      // 空数组之在的样式，设置了这个样式才能拖入
      style: 'min-height:120px;display: block;',
      // 缩放比例
      scaleNum: 1,
      // 校验
      rules: {
        roleId: [
          { required: true, message: '请选择设备角色', trigger: 'change' }
        ],
        cabinet: [
          { required: true, message: '请选择设备预上架机柜编号', trigger: 'change' }
        ],
        count: [
          { required: true, message: '请选择单机柜预布放数量', trigger: 'change' }
        ]
      },
      params: {
        roomId: 1,
        engineeringId: 1
      },
      toOldList: []
    }
  },
  created() {
    this.getListData()
  },
  mounted() {
    this.changeLoction()
  },
  methods: {
    // 上架设备
    putaway() {
      console.log('上架设备', this.addForm)
      this.$refs.formInline.validate((valid) => {
        if (valid) {
          const params = { ...this.params, ...this.addForm }
          deviceShelf(params).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '上架成功'
              })
              this.getListData()
              this.getDeviceNum()
              this.getNum(this.addForm.roleId)
            } else {
              this.$message.error(res.data.exception_msg)
            }
          })
          // this.drawerFlag = false
        }
      })
    },
    // 开始拖拽事件
    onStart(e) {
      document.onmousemove = null
      document.onmouseup = null
      console.log('start', e)
      this.drag = true
      this.dragObj.fromIndex = e.from.className.split('-')[1]
    },
    // 开始移动事件
    onMove(e) {
      // console.log('move', e)
      // 原来数据
      this.dragObj.fromObj = e.draggedContext
      // 要放置数据
      this.dragObj.toObj = e.relatedContext
      // 要放置的机柜下标
      this.dragObj.toIndex = e.to.className.split('-')[1]
      // 要放置数组下标
      this.dragObj.toObjIndex = e.relatedContext.index
      // 原机柜行下标
      this.dragObj.oldRowIndex = e.from.parentNode.parentNode.parentNode.parentNode.className.split('-')[1]
      // 现机柜行下标
      this.dragObj.newRowIndex = e.to.parentNode.parentNode.parentNode.parentNode.className.split('-')[1]
      // 要放置数组
      // const toList = e.relatedContext.list
      // 要放置数组上一条数据
      // const lastObj = toList[this.dragObj.toObjIndex - 1]
      // 要放置数组下一条数据
      // const nextObj = toList[this.dragObj.toObjIndex + 1]

      this.toOldList = this.machineData[this.dragObj.newRowIndex][this.dragObj.toIndex].list

      console.log(this.dragObj.oldRowIndex, this.dragObj.newRowIndex)
    },
    // 拖拽结束事件
    onEnd() {
      this.drag = false
      // console.log(this.dragObj.fromIndex, this.dragObj.toIndex, this.dragObj.oldRowIndex, this.dragObj.newRowIndex)

      if (this.dragObj.fromIndex === this.dragObj.toIndex && this.dragObj.oldRowIndex === this.dragObj.newRowIndex) {
        // 同一机柜拖拽
        const obj = JSON.parse(JSON.stringify(this.dragObj.fromObj.element))
        obj.u = 43 - this.dragObj.toObjIndex - (this.dragObj.fromObj.element.ucount - 1)
        const arr = JSON.parse(JSON.stringify(this.machineData[this.dragObj.newRowIndex][this.dragObj.toIndex].list))
        const nameArr = arr.filter(item => {
          return item.name
        })
        const sameArr = nameArr.filter(item => {
          return item.shelfId !== this.dragObj.fromObj.element.shelfId
        })
        sameArr.push(obj)
        console.log('同一机柜拖拽', obj, nameArr, sameArr)
        const params = {
          ...this.machineData[this.dragObj.newRowIndex][this.dragObj.toIndex],
          list: sameArr,
          shelfId: this.dragObj.fromObj.element.shelfId,
          u: this.dragObj.fromObj.element.u,
          sameCabinet: true
        }
        console.log(1111111111, params, this.dragObj)
        deviceCheck(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.getListData()
          } else {
            this.$message.error(res.data.exception_msg)
          }
        })
      } else {
        // 不同机柜拖拽
        const obj = JSON.parse(JSON.stringify(this.dragObj.fromObj.element))
        obj.u = this.dragObj.toObj.element.u - (this.dragObj.fromObj.element.ucount - 1)
        // console.log(2222222, obj)
        const arr = JSON.parse(JSON.stringify(this.toOldList))
        arr.push(obj)
        const filterArr = arr.filter(item => {
          return item.name
        })
        const newArr = filterArr.sort((a, b) => {
          return b['u'] - a['u']
        })
        // console.log(333333333333, newArr)
        const params = {
          ...this.machineData[this.dragObj.newRowIndex][this.dragObj.toIndex],
          list: newArr,
          shelfId: this.dragObj.fromObj.element.shelfId,
          u: this.dragObj.fromObj.element.u,
          sameCabinet: false
        }
        console.log('不同机柜拖拽', params, this.dragObj)
        deviceCheck(params).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.getListData()
          } else {
            this.$message.error(res.data.exception_msg)
          }
        })
      }

      // if (this.dragObj.fromIndex !== this.dragObj.toIndex) {
      //   // 原机柜增加空
      //   if (this.dragObj.fromObj.element.ucount > 0) {
      //     console.log(this.dragObj.fromObj.element.ucount)
      //     for (let i = 0; i < this.dragObj.fromObj.element.ucount; i++) {
      //       // 拖出数组增加空层
      //       const obj = { ...this.dragObj.fromObj.element, name: '', u: 0 }
      //       this.machineData[this.dragObj.newRowIndex][this.dragObj.fromIndex].list.splice(this.dragObj.fromObj.index, 0, obj)
      //       // 拖入数组删除空层
      //       this.machineData[this.dragObj.newRowIndex][this.dragObj.toIndex].list.splice(this.dragObj.toObj.index + 1, 1)
      //       this.$set(this.machineData[this.dragObj.newRowIndex][this.dragObj.toIndex].list[this.dragObj.toObj.index], 'id', Math.abs(this.dragObj.toObj.index - 43).toString())
      //     }

      //     // const obj = { ...this.dragObj.fromObj.element, name: '', u: 0 }
      //     // this.machineData[this.dragObj.newRowIndex][this.dragObj.fromIndex].list.splice(this.dragObj.fromObj.index, 0, obj)

      //     console.log('拖出下标', this.dragObj.fromObj.index)
      //     console.log('拖入下标', this.dragObj.toObj.index)
      //     console.log('拖出数据', this.machineData[this.dragObj.newRowIndex][this.dragObj.fromIndex].list[this.fromObj.index])
      //     console.log('拖入数据', this.machineData[this.dragObj.newRowIndex][this.dragObj.toIndex].list[this.dragObj.toObj.index])
      //   }
      // }
    },
    // 获取数据
    getListData() {
      getListData(this.params).then(res => {
        if (res.status === 200) {
          this.cabinetOption = []
          this.machineData = res.body
          console.log(res, this.machineData)
          this.machineData.forEach(item => {
            item.forEach(items => {
              const arr = []
              for (let i = items.list.length - 1; i >= 0; i--) {
                arr.push(items.list[i])
              }
              items.list = arr
              this.getMergeStyle(items.list)
              this.cabinetOption.push({
                id: items.scId,
                name: items.name
              })
            })
          })
        }
      })
    },
    // 打开抽屉
    openDrawer() {
      this.drawerFlag = true
      this.roleOption = []
      this.getDeviceNum()
    },
    // 获取设备数量
    getNum(item) {
      const params = {
        ...this.params,
        role: item
      }
      roleCount(params).then(res => {
        if (res.status === 200) {
          this.addForm.roleAllNum = res.body.total
          this.addForm.roleCanNum = res.body.total - res.body.shelfTotal
        }
      })
    },
    // 获取设备数量
    getDeviceNum() {
      getRoleList(this.params).then(res => {
        if (res.status === 200) {
          res.body.forEach(item => {
            this.roleOption.push({
              id: item,
              name: this.dictMap.device_role[item]
            })
          })
          console.log(this.roleOption)
        }
      })
      getAllCount(this.params).then(res => {
        if (res.status === 200) {
          this.addForm.deviceAllNum = res.body.total
          this.addForm.deviceCanNum = res.body.shelfTotal
        }
      })
    },
    // 拖拽
    changeLoction() {
      var box = document.querySelector('.machineList')
      // 鼠标按下
      box.onmousedown = (e) => {
        // 鼠标相对于盒子的位置
        var offsetX = e.clientX - box.offsetLeft
        var offsetY = e.clientY - box.offsetTop
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
          this.scaleNum += 0.1
          el.style.transform = `scale(${this.scaleNum}, ${this.scaleNum})`
          el.style.transformOrigin = mouseX + 'px ' + mouseY + 'px'
        }
        if (e.wheelDelta < 0 || e.detail > 0) { // 当鼠标滚轮向下滚动时
          if (this.scaleNum > 0.2) {
            this.scaleNum -= 0.1
            el.style.transform = `scale(${this.scaleNum}, ${this.scaleNum})`
            el.style.transformOrigin = mouseX + 'px ' + mouseY + 'px'
          }
        }
      }
    },
    // 数据初始化
    getMergeStyle(list) {
      list.forEach((items, index) => {
        if (items.ucount > 1) {
          for (let i = 1; i < items.ucount; i++) {
            list.splice(index - 1, 1)
          }
        }
      })
    },
    // 合并列
    getNewStyle(item) {
      const oneU = { height: '20px' }
      const moreU = { height: 20 * item.ucount + 'px' }
      if (item.ucount === 1 || item.ucount === 0) {
        return oneU
      } else {
        return moreU
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.machineBox {
  width: 100%;
  height: calc(100vh - 120px);
  // padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  .handleList{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    top: 0px;
    right: 10px;
    z-index: 9;
  }
  .machineList {
    position: absolute;
    top: 40px;
    .rowList{
      display: flex;
      margin-bottom: 20px;
    }
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
        background-color: #38d700;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 0;
        font-size: 12px;
        position: relative;
        .icon{
          position: absolute;
          left: 2px;
        }
      }
      .item:hover {
        cursor: move;
      }
      .noBg {
        background: #fff;
      }
      .locked{
        background: #f1f1f1;
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
    .machineInfo{
      width: 100%;
      text-align: center;
      line-height: 20px;
      margin-top: 10px;
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
        .udigit{
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
        margin-right: 20px;
        .numVal{
          font-size: 16px;
        }
        .blueStyle{
          color: #00a6ff;
        }
      }
      .udigit{
        margin-left: 20px;
      }
    }
    .ruleBox{
      width: 100%;
      .ruleList{
        margin: 10px 0;
        >div{
          padding: 6px 0 6px 20px;
          color: #666;
          display: flex;
          align-items: center;
        }
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
::v-deep{
  .el-form-item{
    margin-bottom: 10px;
  }
}
</style>
