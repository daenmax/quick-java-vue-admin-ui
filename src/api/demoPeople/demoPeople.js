import request from '@/utils/request'

// 分页列表
export function page(query) {
  return request({
    url: '/admin/demoPeople/page',
    method: 'get',
    params: query
  })
}

// 导出
export const exportData =  '/admin/demoPeople/exportData'

// 导入
export const importData =  '/admin/demoPeople/importData'

// 下载导入模板
export const importTemplate =  '/admin/demoPeople/importTemplate'

// 查询
export function query(id) {
  const data = {
    id
  }
  return request({
    url: '/admin/demoPeople/query',
    method: 'get',
    params: data
  })
}

// 新增
export function add(data) {
  return request({
    url: '/admin/demoPeople/add',
    method: 'post',
    data: data
  })
}

// 修改
export function edit(data) {
  return request({
    url: '/admin/demoPeople/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function del(ids) {
  return request({
    url: '/admin/demoPeople/del',
    method: 'post',
    data: ids
  })
}

// 全部删除
export function delAll() {
  return request({
    url: '/admin/demoPeople/delAll',
    method: 'get'
  })
}

// 修改状态
export function changeStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/admin/demoPeople/changeStatus',
    method: 'post',
    data: data
  })
}

// 呼叫测试
export function testCall(ids) {
  return request({
    url: '/admin/demoPeople/testCall',
    method: 'post',
    data: ids
  })
}

// 复制人员信息
export function copyInfo(data) {
  return request({
    url: '/admin/demoPeople/copyInfo',
    method: 'post',
    data: data
  })
}
