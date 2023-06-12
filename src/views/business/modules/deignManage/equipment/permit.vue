<template>
  <div>
    <div v-if="permit.add.permit">
      我显示了
    </div>
    <div v-if="permit.update.permit">
      我显示了
    </div>
  </div>
</template>

<script>
import permitService from '@/api/permit/permit'
export default {
  data() {
    return {

      permit: {
        add: {
          context: '/umc',
          url: '/user/get',
          method: 'get',
          permit: false
        },
        update: {

          context: '/umc',
          url: '/user/get',
          method: 'get',
          permit: false

        }
      }
    }
  },
  created() {
    permitService.permitBtnAuth(this.permit)
  }
}
</script>

<style>
</style>
