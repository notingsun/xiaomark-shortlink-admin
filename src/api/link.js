import request from './instance'

export default {
  getAccountList(params) {
    return request({
      method: 'get',
      url: '/api-admin/masters/',
      params
    })
  }
}
