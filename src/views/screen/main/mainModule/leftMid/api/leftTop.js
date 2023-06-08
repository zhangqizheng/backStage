import request from '@/utils/request'

export function post(data) {
  return request({
    url: '/api/v1/',
    method: 'post',
    data
  })
}

export function get() {
  return request({
    url: '/api/v1/',
    method: 'get'
  })
}
