import request from '@/utils/request'
import baseURL from '@/utils/baseUrl'
// 根据字典类型查询字典数据信息
export function queryDict(data) {
  return request({
    url: baseURL.jypx + 'dict/data/queryDictAll',
    method: 'get',
    params: data
  })
}
