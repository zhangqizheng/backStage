<!--
 * @Author: your name
 * @Date: 2020-12-03 21:50:22
 * @LastEditTime: 2021-06-16 16:56:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Tamil-admin-master/src/App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  // 是否全局禁用鼠标右键  是---false\否---true
  created() {
    document.oncontextmenu = function(e) {
      return true
    }
  }
}
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(189, 189, 189);
  background-color: rgb(255, 255, 255);
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 60px rgb(62, 142, 227);
  background-color: rgb(224, 221, 221);
}
.el-table__header{
    width: 100% !important;
}
.el-table__body{
    width: 100% !important;
}
</style>
