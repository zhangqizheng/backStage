/*
 * @Author: your name
 * @Date: 2020-01-09 16:14:02
 * @LastEditTime: 2020-10-26 10:50:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /PARK-WEB3.0/src/utils/AMap.js
 */
export default function MapLoader() { // <-- 原作者这里使用的是module.exports
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = '//webapi.amap.com/maps?v=1.4.15&key=beab717d397f5422932a32edf6ec137a&plugin=AMap.ControlBar'
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}
