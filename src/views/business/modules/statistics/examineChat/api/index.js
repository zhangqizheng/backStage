
import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'

// 详情数据
export function getDetailData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + 'funding/manage/queryFunding',
    params: data
  })
}
// 列表数据
export function getListData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'funding/manage/queryList',
    data: data
  })
}
// 拨款提交
export function saveFunding(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + 'funding/manage/saveFunding',
    data: data
  })
}
