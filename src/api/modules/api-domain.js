import request from '../instance'

export default {
  putWebsiteEnabled(id, params) {
    return request({
      method: 'put',
      name: '设置网站是否可用',
      url: `/api/sl/websites/${id}/enabled/`,
      params
    })
  }
}
