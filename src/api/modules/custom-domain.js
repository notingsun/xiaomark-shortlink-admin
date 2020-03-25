export default {
  getCustomDomain(params) {
    return {
      name: '列出自定义域名',
      method: 'get',
      url: '/api/sl/user_domains/',
      params
    }
  }
}
