// 这现在等于是一个配置文件
export default {
  putApiDomainDisable(id, params) {
    return {
      method: 'put',
      name: '禁用API域名',
      url: `/api/sl/api_domains/${id}/disable/`,
      params
    }
  },

  getApiDomain(params) {
    return {
      method: 'get',
      name: '列出API域名',
      url: '/api/sl/api_domains/',
      params
    }
  },

  putApiDomainCheck(id, params) {
    return {
      method: 'put',
      name: '审核API域名申请',
      url: `/api/sl/api_domain_applications/${id}/review/`,
      params // enabled_list 开关数组
    }
  },

  getApiDomainCheckList(params) {
    return {
      method: 'get',
      name: '列出API域名申请',
      url: '/api/sl/api_domain_applications/',
      params
    }
  }
}
