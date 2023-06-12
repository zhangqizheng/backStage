import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'
// import store from '@/store'

// 机构列表数据
export function getOrgListData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/query',
    data: data
  })
}
// 机构新增
export function addOrgData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/save',
    data: data
  })
}
// 机构修改
export function updateOrgData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/update',
    data: data
  })
}
// 机构删除
export function delOrgData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'insitute/del',
    params: data
  })
}
// 机构重置密码
export function resetOrgPassWord(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/resetPsd',
    data: data
  })
}
// 机构解约
export function cancelOrgData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/cancel',
    data: data
  })
}
// 机构续约
export function renewalOrgData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/renewal',
    data: data
  })
}
// 机构注销
export function offOrgData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/off',
    data: data
  })
}
// 机构公示
export function publicOrgData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'insitute/public',
    params: data
  })
}
// 机构详情
export function getOrgInfo(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'insitute/info',
    params: data
  })
}

// 园地列表数据
export function getListData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/query',
    data: data
  })
}
// 园地新增
export function addData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/save',
    data: data
  })
}
// 园地修改
export function updateData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/update',
    data: data
  })
}
// 园地删除
export function delData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'gradenplot/del',
    params: data
  })
}
// 园地重置密码
export function resetPassWord(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/resetPsd',
    data: data
  })
}
// 园地解约
export function cancelData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/cancel',
    data: data
  })
}
// 园地续约
export function renewalData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/renewal',
    data: data
  })
}
// 园地注销
export function offData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/off',
    data: data
  })
}
// 园地公示
export function publicData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'gradenplot/public',
    params: data
  })
}
// 园地详情
export function getInfo(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'gradenplot/info',
    params: data
  })
}

// 承训项目列表
export function getProjectList(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/train/query',
    data: data
  })
}
// 承训项目新增
export function projectAdd(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/train/save',
    data: data
  })
}
// 承训项目修改
export function projectUpdate(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'insitute/train/update',
    data: data
  })
}
// 承训项目删除
export function projectDel(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'insitute/train/del',
    params: data
  })
}
// 机构导入
export function importOrg(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    url: baseURL.jypx + 'insitute/importData',
    data: data
  })
}
// 园地导入
export function importField(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'gradenplot/importData',
    data: data
  })
}
// 测试用户
export function findBy(data) {
  return request({
    url: 'http://111.206.10.3:4933/uoc/bim /V1/api/ExtApiMgmtOrganizationService/findBy',
    method: 'post',
    data: data
  })
}
