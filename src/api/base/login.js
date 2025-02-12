import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/admin/login',
    headers: {
      //是否忽略token，不填写此参数的话，默认是false。
      //false是不忽略，即接口需要带上token
      //true是忽略token，即不登录也能调用的接口
      ignoreToken: true
    },
    method: 'post',
    data: data
  })
}



// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/admin/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

