import request from './instance'

export default {
  getShortLinkList(params) {
    return request({
      method: 'get',
      name: `列出${params.user_id ? ` 用户${params.user_id} ` : ''}短链列表`,
      url: '/api/sl/links/',
      params
    })
  },

  getShortLinkStatistic(params) {
    return request({
      method: 'get',
      name: '短链数据（获取每日数据）',
      url: '/api/sl/stats/',
      params
    })
  },

  getTargetLinkStatistic(params) {
    return request({
      method: 'get',
      name: '跳转链接数据',
      url: '/api/sl/websites/',
      params
    })
  }
}
