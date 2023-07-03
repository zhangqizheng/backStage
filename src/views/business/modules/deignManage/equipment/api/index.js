
import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'

// 设备列表
export function getListData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/device/list',
    params: data
  })
}

// 新增设备
export function addDevice(data) {
  console.log('data add:', data)
  return request({
    method: 'post',
    url: baseURL.jypx + '/device/add',
    data: data
  })
}

// 编辑设备
export function updateDevice(data) {
  console.log('data add:', data)
  return request({
    method: 'post',
    url: baseURL.jypx + '/device/add',
    data: data
  })
}
// 编辑设备
export function getDeviceTemplate(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/deviceTemplate/list',
    params: data
  })
}
