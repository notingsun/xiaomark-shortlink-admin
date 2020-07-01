const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL

export default {
  putWebsiteEnabled(id, params) {
    return {
      method: 'put',
      name: '设置网站是否可用',
      url: `/api/sl/websites/${id}/enabled/`,
      params
    }
  },

  putWxShareEnabled(id, params = {}) {
    return {
      method: 'put',
      name: '设置是否可以微信分享',
      url: `${BASE_URL_LINK}/api/links/${id}/open_wx_share/`,
      params
    }
  },

  putLinkEnabled(id, params = {}) {
    return {
      method: 'put',
      name: '设置链接是否可用',
      url: `${BASE_URL_LINK}/api/links/${id}/enabled/`,
      params
    }
  },

  putTargetLinkFavicon(id, params = {}) {
    return {
      method: 'put',
      name: '更新网站图标',
      url: `/api/sl/websites/${id}/favicon/`,
      params
    }
  },

  getShortLinkList(params) {
    return {
      method: 'get',
      name: `列出${params.user_id ? ` 用户${params.user_id} ` : ''}短链列表`,
      url: `${BASE_URL_LINK}/api/links/`,
      params
    }
  },

  getShortLinkStatistic(params) {
    return {
      method: 'get',
      name: '短链数据（获取每日数据）',
      url: '/api/sl/stats/',
      params
    }
  },

  getTargetLinkStatistic(params) {
    return {
      method: 'get',
      name: '跳转链接数据',
      url: '/api/sl/websites/',
      params
    }
  },

  getLinkStatistic(params) {
    return {
      method: 'get',
      name: '获取总体数据',
      url: '/api/sl/stats/overview/',
      params
    }
  }
}
