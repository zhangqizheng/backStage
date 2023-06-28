
import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'

// 机构列表
export function getListData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/device/list',
    params: data
  })
}

// 机构详情
export function getOrgDetail(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'insitute/audit/info',
    params: data
  })
}

// 机构审核
export function auditOrg(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/audit/save',
    data: data
  })
}

// 园地列表
export function getFieldList(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/audit/query',
    data: data
  })
}
// 园地详情
export function getFieldDetail(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'gradenplot/audit/info',
    params: data
  })
}
// 园地审核
export function auditField(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/audit/save',
    data: data
  })
}
