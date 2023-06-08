import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/Tamil-admin/user/getRouters',
    method: 'get'
  })
}
