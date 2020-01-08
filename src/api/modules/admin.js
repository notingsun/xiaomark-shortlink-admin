import request from '../instance'

export default {
  getQnToken(params) {
    return request({
      name: '获取七牛上传凭证',
      method: 'get',
      url: 'https://xiaomark.com/ext/qn/upload_token/',
      params,
      noCode: true
    })
  },
  /**
   * 登录
   */
  login(params) {
    return request({
      method: 'put',
      url: '/api/admin/login/',
      params
    })
  },

  /**
   * 修改密码
   */
  putPassword(params) {
    return request({
      method: 'put',
      url: '/api/password/',
      params
    })
  },

  /**
   * 获取当前用户详情
   */
  getAdminDetail(params) {
    return request({
      method: 'get',
      url: '/api/current_admin/',
      params
    })
  }
}
