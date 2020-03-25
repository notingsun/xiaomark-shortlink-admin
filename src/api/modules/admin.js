export default {
  getQnToken(params) {
    return {
      name: '获取七牛上传凭证',
      method: 'get',
      url: 'https://xiaomark.com/ext/qn/upload_token/',
      params,
      noCode: true
    }
  },
  /**
   * 登录
   */
  login(params) {
    return {
      method: 'put',
      url: '/api/admin/login/',
      params
    }
  },

  /**
   * 修改密码
   */
  putPassword(params) {
    return {
      method: 'put',
      url: '/api/password/',
      params
    }
  },

  /**
   * 获取当前用户详情
   */
  getAdminDetail(params) {
    return {
      method: 'get',
      url: '/api/current_admin/',
      params
    }
  }
}
