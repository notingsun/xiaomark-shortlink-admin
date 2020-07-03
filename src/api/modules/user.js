const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL

export default {
  putUserTags(id, params) {
    return {
      method: 'post',
      name: '给用户打标签',
      url: `${BASE_URL_LINK}/api/users/${id}/tags/`,
      params
    }
  },

  getUserTags(params) {
    return {
      method: 'get',
      name: '获取用户标签',
      url: `${BASE_URL_LINK}/api/tags/`,
      params
    }
  },

  getUserDetail(id, params) {
    return {
      method: 'get',
      name: '获取用户详情',
      url: `${BASE_URL_LINK}/api/users/${id}/`,
      showError: false,
      params
    }
  },

  postUserToken(id, params) {
    return {
      method: 'post',
      name: '生成用户的身份令牌',
      url: `${BASE_URL_LINK}/api/users/${id}/token/`,
      params
    }
  },

  putApiAuth(id, params) {
    return {
      method: 'put',
      name: '设置用户是否有API权限',
      url: `/api/sl/users/${id}/api_auth/`,
      params
    }
  },

  putApiLimits(id, params) {
    return {
      method: 'put',
      name: '更新用户的API调用限制',
      url: `${BASE_URL_LINK}/api/users/${id}/api_config/`,
      params
    }
  },

  putUserEnabled(id, params) {
    return {
      method: 'put',
      name: '设置用户是否可用',
      url: `${BASE_URL_LINK}/api/users/${id}/enabled/`,
      params
    }
  },

  putSpaceCreate(id, params) {
    return {
      method: 'put',
      name: '设置用户是否可以创建协作空间',
      url: `/api/sl/users/${id}/ws_creator/`,
      params
    }
  },

  getUserList(params) {
    return {
      method: 'get',
      name: '列出用户',
      url: '/api/sl/users/',
      params
    }
  }
}
