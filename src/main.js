/*
 * @Author: your name
 * @Date: 2020-12-03 21:50:22
 * @LastEditTime: 2021-07-02 19:24:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Tamil-admin-master/src/main.js
 */
import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // 一个新的样式文件可以替代CSS重置
import Element from 'element-ui'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // 全局样式
import App from '@/App'
import store from '@/store'
import router from '@/router'
import VueQuillEditor from 'vue-quill-editor'
import bus from '@/utils/bus'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/icons' // 图标
import '@/permission' // 权限控制
import '@/utils/error-log' // 错误日志
// 字典
import dictList from './utils/dictMap'
import * as filters from '@/filters' // 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(VueQuillEditor)
// 图像裁剪插件
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
// 图像裁剪end
Vue.prototype.$EventBus = new Vue()
// 字典
Vue.prototype.dictMap = {}
Vue.prototype.dictKeyMap = {}
Vue.prototype.$getNewType = dictList.getNewType
Vue.prototype.$bus = bus
setTimeout(() => {
  // 字典
  Vue.prototype.dictMap = store.state.dict.dictMap
  Vue.prototype.dictKeyMap = store.state.dict.dictKeyMap
}, 1000)
// 字典假数据
import shamData from './utils/shamData'
Vue.prototype.shamData = shamData.data
// 返回组件
import goBack from '@/utils/goBack'
Vue.use(goBack)

/**
 * 监控视频组件引入
 */
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
const hls = require('videojs-contrib-hls')
Vue.use(hls)
Vue.use(VideoPlayer)

/**
 * 引入高德地图
 */
import MapLoader from '@/utils/AMap.js'
if (!store.state.settings.embedded) {
  Vue.prototype.MapLoader = MapLoader
  Vue.use(MapLoader)
}

/**
 * 图表组件引入-球图
 */
import Echarts from 'echarts'
import 'echarts-liquidfill'
Vue.prototype.echarts = Echarts
Vue.use(Echarts)

/**
 * 如果你不想使用mock-server
 * 你想使用MockJs模拟api
 * 你可以执行:mockXHR()
 *
 * 目前MockJs将用于生产环境，
 * 请在上线前删除它!!!
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // 设置元素-ui默认大小
})

// 注册全局实用过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
