import request from './instance'

export default {
  getShortLinkList(params) {
    return request({
      method: 'get',
      name: `列出${params.user_id ? ` 用户${params.user_id} ` : ''}短链列表`,
      url: '/api/sl/links/',
      params
    })
  }
}
