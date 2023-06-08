/*
 * @Author: your name
 * @Date: 2021-05-17 17:47:22
 * @LastEditTime: 2021-06-08 13:17:24
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /gitee-scene-monitoring/mock/utils.js
 */
/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 这只是deep copy的一个简单版本
 * 有很多边缘情况的bug吗
 * 如果你想使用一个完美的深度拷贝，使用lodash的_.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

module.exports = {
  param2Obj,
  deepClone
}
