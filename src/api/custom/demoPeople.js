import request from '@/utils/request'

// 分页列表
export function apiPage(query) {
  return request({
    url: '/demo/people/page',
    method: 'get',
    params: query
  })
}

// 全部数据
export function apiAll(query) {
  return request({
    url: '/demo/people/all',
    method: 'get',
    params: query
  })
}

// 新增
export function apiAdd(data) {
  return request({
    url: '/demo/people/add',
    method: 'post',
    data: data
  })
}

// 查询
export function apiQuery(id) {
  return request({
    url: '/demo/people/query?id=' + id,
    method: 'get'
  })
}

// 修改
export function apiEdit(data) {
  return request({
    url: '/demo/people/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function apiRemove(ids) {
  return request({
    url: '/demo/people/remove',
    method: 'post',
    data: ids
  })
}

// 全部删除
export function apiRemoveAll() {
  return request({
    url: '/demo/people/removeAll',
    method: 'get'
  })
}

// 呼叫测试
export function apiTestCall(ids) {
  return request({
    url: '/demo/people/testCall',
    method: 'post',
    data: ids
  })
}

// 复制人员信息
export function apiCopyInfo(data) {
  return request({
    url: '/demo/people/copyInfo',
    method: 'post',
    data: data
  })
}
