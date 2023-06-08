
import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'

// 机构详情数据
export function getInfo(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'insitute/cancel/audit/info',
    params: data
  })
}
// 园地详情数据
export function getFieldInfo(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'gradenplot/cancel/audit/info',
    params: data
  })
}
// 机构列表数据
export function getListData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/cancel/audit/query',
    data: data
  })
}
// 园地列表数据
export function getFieldListData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/cancel/audit/query',
    data: data
  })
}
// 机构审核
export function saveData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/cancel/audit/save',
    data: data
  })
}
// 园地审核
export function saveFieldData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/cancel/audit/save',
    data: data
  })
}
