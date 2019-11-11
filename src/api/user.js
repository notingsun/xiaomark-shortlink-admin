import request from './instance'

export default {
  getUserList(params) {
    return request({
      method: 'get',
      name: '列出用户',
      url: '/api/sl/users/',
      params
    })
  }
}
