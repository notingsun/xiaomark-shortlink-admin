import request from '../instance'

export default {
  putTargetLinkFavicon(id, params = {}) {
    return request({
      method: 'put',
      name: '更新网站图标',
      url: `/api/sl/websites/${id}/favicon/`,
      params
    })
  },

  putTargetLinkEnable(params) {
    console.log(params.id)
    return request({
      method: 'put',
      name: '设置网站是否可用',
      url: `/api/sl/websites/${params.id}/enabled/`,
      params
    })
  },

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
  },

  getLinkStatistic(params) {
    return request({
      method: 'get',
      name: '获取总体数据',
      url: '/api/sl/stats/overview/',
      params
    })
  }
}
