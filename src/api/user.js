import request from '@/utils/request'

// export function login (data) {
//   return request({
//     url: '/Tamil-admin/user/login',
//     method: 'post',
//     data
//   })
// }

export function getInfo(token) {
  return request({
    url: '/Tamil-admin/user/info',
    method: 'get',
    params: { token }
  })
}
export function login(data) {
  return request({
    url: 'https://tyjrfwapp.mva.gov.cn/dev/appedt/user/token/updateUserToken',
    method: 'post',
    data: data
  })
}

// export function getInfo (token) {
//   return request({
//     url: 'https://tyjrfwapp.mva.gov.cn/govapitest/myinfo',
//     method: 'get'
//     // params: token
//   })
// }
export function logout() {
  return request({
    url: '/Tamil-admin/user/logout',
    method: 'post'
  })
}
