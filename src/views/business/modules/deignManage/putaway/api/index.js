import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'
// import store from '@/store'

// 机柜图数据
export function getListData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/deviceShelf',
    params: data
  })
}
// 设备角色列表
export function getRoleList(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/device/getRoleList',
    params: data
  })
}
// 设备总数
export function getAllCount(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/deviceShelf/allCount',
    params: data
  })
}
// 设备数量
export function roleCount(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/deviceShelf/roleCount',
    params: data
  })
}

// 上架设备
export function deviceShelf(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + '/deviceShelf',
    data: data
  })
}
// 设备拖拽
export function deviceCheck(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + '/deviceShelf/check',
    data: data
  })
}
