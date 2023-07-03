
import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'

// 勘察信息
export function getListData(data) {
  return request({
    method: 'get',
    url: baseURL.jypx + '/survey',
    params: data
  })
}

// 保存勘察信息
export function addData(data) {
  return request({
    method: 'post',
    url: baseURL.jypx + '/survey',
    data: data
  })
}
// 保存勘察信息
export function updateData(data) {
  return request({
    method: 'put',
    url: baseURL.jypx + '/survey',
    data: data
  })
}

// 勘察信息
export function delCabinet(data) {
  return request({
    method: 'delete',
    url: baseURL.jypx + '/surveyCabinet/' + data
  })
}
