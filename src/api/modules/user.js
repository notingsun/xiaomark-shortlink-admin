import request from '../instance'

export default {
  putUserTags(id, params) {
    return request({
      method: 'post',
      name: '给用户打标签',
      url: `/api/sl/users/${id}/tag/`,
      params
    })
  },

  getUserTags(params) {
    return request({
      method: 'get',
      name: '获取用户标签',
      url: '/api/sl/tags/',
      params
    })
  },

  getUserDetail(id, params) {
    return request({
      method: 'get',
      name: '获取用户详情',
      url: `/api/sl/users/${id}/`,
      showError: false,
      params
    })
  },

  postUserToken(id, params) {
    return request({
      method: 'post',
      name: '生成用户的身份令牌',
      url: `/api/sl/users/${id}/token/`,
      params
    })
  },

  putApiAuth(id, params) {
    return request({
      method: 'put',
      name: '设置用户是否有API权限',
      url: `/api/sl/users/${id}/api_auth/`,
      params
    })
  },

  putApiLimits(id, params) {
    return request({
      method: 'put',
      name: '更新用户的API调用限制',
      url: `/api/sl/users/${id}/api_limits/`,
      params
    })
  },

  putUserEnabled(id, params) {
    return request({
      method: 'put',
      name: '设置用户是否可用',
      url: `/api/sl/users/${id}/enabled/`,
      params
    })
  },

  putSpaceCreate(id, params) {
    return request({
      method: 'put',
      name: '设置用户是否可以创建协作空间',
      url: `/api/sl/users/${id}/ws_creator/`,
      params
    })
  },

  getUserList(params) {
    return request({
      method: 'get',
      name: '列出用户',
      url: '/api/sl/users/',
      params
    })
  }
}
