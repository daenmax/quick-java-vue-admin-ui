import request from '@/utils/request'



// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/common/dict/' + dictType,
    method: 'get'
  })
}

// 获取路由
export const getRouters = () => {
  return request({
    url: '/common/getRouters',
    method: 'get'
  })
}

