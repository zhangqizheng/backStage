<!--
 * @Author: your name
 * @Date: 2019-12-15 04:17:58
 * @LastEditTime: 2021-07-06 10:52:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /sunsea-master/src/layout/components/Sidebar/Logo.vue
 -->
<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" :to="screenUrl">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" :to="screenUrl">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
import Cookies from 'js-cookie'
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '天翼云-翼设计',
      logo: logoImg,
      screenUrl: '/screenMain'
    }
  },
  computed: {
    ...mapGetters([
      'theme'
    ])
  },
  mounted() {
    /**
     * 大屏组件初始化
     * 这里可以调用厚点接口返回对应数据
     */
    if (Cookies.get('themeData')) {
      this.screenUrl = Cookies.get('themeData')
    } else {
      this.screenUrl = '/screenMain'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: 8px;
    }
    & .sidebar-logo-long {
      width: 100px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
