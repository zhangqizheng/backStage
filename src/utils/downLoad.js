
import axios from 'axios'
import baseURL from '@/utils/baseUrl'
import { getToken } from '@/utils/auth'
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: baseURL.jypx,
  // 超时
  timeout: 2000
})

// 导出方法
/*
download(url, params, filename)
第一个参数是请求的api
第二个参数是请求参数
第三个参数是导出的文件名
*/
export function download(url, params, filename) {
  // 数据请求
  return service.post(url, params, {
    // transformRequest: [(params) => {
    //   return tansParams(params)
    // }],
    // 请求头
    headers: {
      'GREEN-CHANNEL-AUTH': getToken(),
      'token': getToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  }).then((res) => {
    let url = window.URL.createObjectURL(new Blob([res.data], { type: '.xlsx' }))
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.setAttribute('download', `${filename}.xlsx`)
    document.body.appendChild(a)
    a.click()
    url = window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }).catch((r) => {
    console.error(r)
  })
}
//  导出
export function downloadLeading(url, params, filename) {
  // 数据请求
  return service.post(url, params, {
    // transformRequest: [(params) => {
    //   return tansParams(params)
    // }],
    // 请求头
    headers: {
      'GREEN-CHANNEL-AUTH': getToken(),
      'token': getToken()
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'blob'
  }).then((res) => {
    console.log(res)
    let url = window.URL.createObjectURL(new Blob([res.data], { type: '.xlsx' }))
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.setAttribute('download', `${filename}.xlsx`)
    document.body.appendChild(a)
    a.click()
    url = window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }).catch((r) => {
    console.error(r)
  })
}

export default { download, downloadLeading }
