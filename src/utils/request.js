import axios from 'axios'
import { Message } from 'element-ui'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
// import router from '../router'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  console.log(config)
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['GREEN-CHANNEL-AUTH'] = getToken()// 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['token'] = getToken()// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (sessionStorage.getItem('token') && !isToken) {
    config.headers['GREEN-CHANNEL-AUTH'] = sessionStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['token'] = sessionStorage.getItem('token')// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  console.log(res)
  // 未设置状态码则默认成功状态
  const code = res.data.status || 0
  // 获取错误信息
  const message = errorCode[code] || res.data.msg || errorCode['default']
  if (code === 401) {
    // MessageBox.confirm(
    //   '登录状态已过期，您可以继续留在该页面，或者重新登录',
    //   '系统提示',
    //   {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }
    // ).then(() => {
    //   store.dispatch('LogOut').then(() => {
    //     location.reload() // 为了重新实例化vue-router对象 避免bug
    //   })
    // })
  } else if (code === 500) {
    Message({
      message: res.data.exception_msg,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  } else {
    return res.data
  }
}, error => {
  // MessageBox.confirm(
  //   '登录状态已过期，您可以继续留在该页面，或者重新登录',
  //   '系统提示',
  //   {
  //     confirmButtonText: '重新登录',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }
  // ).then(() => {
  //   router.replace('/login')
  // location.reload() // 为了重新实例化vue-router对象 避免bug

  // store.dispatch('LogOut').then(() => {
  // })
  // })
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
