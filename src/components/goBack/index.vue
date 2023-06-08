<template>
  <div class="goBack">
    <el-button size="small" @click="goBack()">返回</el-button>
  </div>
</template>

<script>
export default {
  props: {
    previousPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      if (this.previousPage === false) {
        this.$bus.$emit('goBack')
      } else {
        this.$bus.$emit('goBackList')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.goBack{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
