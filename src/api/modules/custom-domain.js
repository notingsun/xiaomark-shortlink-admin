const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL

export default {
  getCustomDomain(params) {
    return {
      name: '列出自定义域名',
      method: 'get',
      url: `${BASE_URL_LINK}/api/custom_domains/`,
      params
    }
  }
}
