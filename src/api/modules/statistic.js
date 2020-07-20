const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL
const IS_DEV = process.env.NODE_ENV === 'development'
// 本地测试环境，数据统计的数据用线上数据
// 线上环境的token（如果过期需要更新）
const STATISTIC_BASE_URL_LINK = IS_DEV ? 'http://sl-admin.xiaomark.com' : BASE_URL_LINK
const STATISTIC_ONLINE_TOKEN = IS_DEV

export default {
  login(params) {
    return {
      method: 'put',
      name: 'dev环境登录线上',
      url: `${STATISTIC_BASE_URL_LINK}/api/admin/login/`,
      params
    }
  },

  getShortLinkStatistic(params) {
    return {
      method: 'get',
      name: '短链数据（获取每日数据）',
      online_token: STATISTIC_ONLINE_TOKEN,
      url: `${STATISTIC_BASE_URL_LINK}/api/stats/daily/`,
      params
    }
  },

  getLinkStatistic(params) {
    return {
      method: 'get',
      name: '获取总体数据(短链)',
      online_token: STATISTIC_ONLINE_TOKEN,
      url: `${STATISTIC_BASE_URL_LINK}/api/stats/overview/`,
      params
    }
  },

  getUv(params) {
    return {
      method: 'get',
      name: '获取总体数据(短链)',
      online_token: STATISTIC_ONLINE_TOKEN,
      url: `${STATISTIC_BASE_URL_LINK}/api/stats/user_growth/`,
      params
    }
  },

  putUv(params) {
    return {
      method: 'put',
      name: '更新用户增长数据某一周的UV',
      online_token: STATISTIC_ONLINE_TOKEN,
      url: `${STATISTIC_BASE_URL_LINK}/api/stats/user_growth/uv/`,
      params
    }
  },

  getLinkPv(params) {
    return {
      method: 'get',
      name: '链接访问次数统计',
      online_token: STATISTIC_ONLINE_TOKEN,
      url: `${STATISTIC_BASE_URL_LINK}/api/stats/pv/`,
      params
    }
  }
}
