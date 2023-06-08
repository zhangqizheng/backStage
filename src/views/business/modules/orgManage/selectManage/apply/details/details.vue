<template>
  <el-drawer :title="drawerTitle" :visible="childVisible_" size="50%" @close="handleClose">
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs>

    </div>

  </el-drawer>
</template>

<script>
export default {
  // 传值
  props: {
    // 父组件传  childVisible值；
    childVisible: {
      type: Boolean,
      default: false // 这里默认为false
    },
    drawerTitle: {
      type: String,
      default: '' // 这里默认为false
    }
  },
  data() {
    return {
      activeName: 'second'
    }
  },
  // 计算属性
  computed: {
    childVisible_: {
      get() {
        console.log(this.childVisible, 'childVisible')
        return this.childVisible
      },
      // 值变化的时候会被调用
      set(v) {
        console.log(v, 'v')
        this.$emit('changeDrawer', v)
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 关闭当前抽屉；触发set方法（childVisible_值改变就会调用set）
    handleClose() {
      this.childVisible_ = false
    }
  }
}
</script>
<style lang="scss">
.main{
  padding: 20px;
}
</style>
