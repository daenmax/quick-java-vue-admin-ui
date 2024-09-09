import request from '@/utils/request'

// 分页列表
export function apiPage(query) {
  return request({
    url: '/custom/demoPeople/page',
    method: 'get',
    params: query
  })
}

// 全部数据
export function apiAll(query) {
  return request({
    url: '/custom/demoPeople/all',
    method: 'get',
    params: query
  })
}

// 新增
export function apiAdd(data) {
  return request({
    url: '/custom/demoPeople/add',
    method: 'post',
    data: data
  })
}

// 查询
export function apiQuery(id) {
  return request({
    url: '/custom/demoPeople/query?id=' + id,
    method: 'get'
  })
}

// 修改
export function apiEdit(data) {
  return request({
    url: '/custom/demoPeople/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function apiRemove(ids) {
  return request({
    url: '/custom/demoPeople/remove',
    method: 'post',
    data: ids
  })
}

// 全部删除
export function apiRemoveAll() {
  return request({
    url: '/custom/demoPeople/removeAll',
    method: 'get'
  })
}

// 呼叫测试
export function apiTestCall(ids) {
  return request({
    url: '/custom/demoPeople/testCall',
    method: 'post',
    data: ids
  })
}

// 复制人员信息
export function apiCopyInfo(data) {
  return request({
    url: '/custom/demoPeople/copyInfo',
    method: 'post',
    data: data
  })
}
