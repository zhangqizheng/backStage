
import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'
// 学员报名审核列表
export function auditList(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'user/apply/audit/list',
    data: data
  })
}
// 机构审核列表
// get接口
export function getOrgDetail(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'supervise/org/info',
    params: data
  })
}
// 机构审核接口
export function getOrgList(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'supervise/org/query',
    data: data
  })
}

// 学员审核管理 详情
export function applyauditdetailt(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'user/apply/audit/detail',
    params: data
  })
}
