const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL

export default {
  getPluginList(params) {
    return {
      name: '列出插件列表',
      method: 'get',
      url: `${BASE_URL_LINK}/api/system/plugin_stats/`,
      params
    }
  },
  getPluginBridegs(params) {
    return {
      name: '获取插件应用中间页地址',
      method: 'get',
      url: `${BASE_URL_LINK}/api/system/plugin_bridges/`,
      params
    }
  },
  putPluginBridegs(params) {
    return {
      name: '获取插件应用中间页地址',
      method: 'put',
      url: `${BASE_URL_LINK}/api/system/plugin_bridges/`,
      params
    }
  }
}
