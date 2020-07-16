const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL

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
      url: `${BASE_URL_LINK}/api/admin/login/`,
      params
    }
  },

  /**
   * 修改密码
   */
  putPassword(params) {
    return {
      method: 'put',
      url: `${BASE_URL_LINK}/api/password/`,
      params
    }
  },

  /**
   * 获取当前用户详情
   */
  getAdminDetail(params) {
    return {
      method: 'get',
      name: '获取当前用户详情',
      url: `${BASE_URL_LINK}/api/current_admin/`,
      params
    }
  },

  /**
   * 获取Redis集群运行数据
   */
  getRedis(params) {
    return {
      method: 'get',
      url: `${BASE_URL_LINK}/api/system/rc_info/`,
      params
    }
  }
}
