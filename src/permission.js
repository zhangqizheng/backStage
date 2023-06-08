import router from './router'

import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  // // NProgress.start()
  var roles = 'admin'
  store.dispatch('permission/generateRoutes', roles).then(accessRoutes => {
    console.log(accessRoutes)
    // 根据roles权限生成可访问的路由表
    router.addRoutes(accessRoutes) // 动态添加可访问路由表
  })
  next()
})

router.afterEach(() => {
  NProgress.done()
})
