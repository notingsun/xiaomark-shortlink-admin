const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL

export default {
  getWebsiteBlackList(params) {
    return {
      method: 'get',
      name: '列出网站黑名单',
      url: `${BASE_URL_LINK}/api/blacklists/`,
      params
    }
  },

  putWebsiteBlack(params) {
    return {
      method: 'POST',
      name: '将域名添加到黑名单',
      url: `${BASE_URL_LINK}/api/blacklists/`,
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
      url: `${BASE_URL_LINK}/api/websites/${id}/favicon/`,
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
      url: `${BASE_URL_LINK}/api/stats/daily/`,
      params
    }
  },

  getTargetLinkStatistic(params) {
    return {
      method: 'get',
      name: '跳转链接数据',
      url: `${BASE_URL_LINK}/api/websites/`,
      params
    }
  },

  getLinkStatistic(params) {
    return {
      method: 'get',
      name: '获取总体数据(短链)',
      url: `${BASE_URL_LINK}/api/stats/overview/`,
      params
    }
  },

  postGuestLinks(params) {
    return {
      method: 'post',
      name: '恢复游客链接',
      url: `${BASE_URL_LINK}/api/recover_guest_link/`,
      params
    }
  }
}
