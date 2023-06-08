
import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'

// 详情数据
export function getCount(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'count/org',
    params: data
  })
}
// 详情数据
export function getAuthLevel(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'count/authLevel',
    params: data
  })
}
// 详情数据
export function getNature(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'count/nature',
    params: data
  })
}
// 详情数据
export function getTrain(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'count/train',
    params: data
  })
}
// 详情数据
export function getTrainType(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'count/trainType',
    params: data
  })
}
// 详情数据
export function getProvince(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'count/authLevel/province',
    params: data
  })
}
