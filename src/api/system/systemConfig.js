import request from '@/utils/request'


// 查询
export function apiQuery() {
  return request({
    url: '/system/config/query',
    method: 'get'
  })
}
// 修改
export function apiEdit(data) {
  return request({
    url: '/system/config/edit',
    method: 'post',
    data: data
  })
}


