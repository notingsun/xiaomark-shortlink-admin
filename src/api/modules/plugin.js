export default {
  getPluginList(params) {
    return {
      name: '列出插件列表',
      method: 'get',
      url: '/api/sl/user_domains/',
      params
    }
  }
}
