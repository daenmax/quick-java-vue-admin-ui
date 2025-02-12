import request from '@/utils/request'


// 查询
export function apiQuery() {
  return request({
    url: '/admin/systemConfig/query',
    method: 'get'
  })
}
// 修改
export function apiEdit(data) {
  return request({
    url: '/admin/systemConfig/edit',
    method: 'post',
    data: data
  })
}


