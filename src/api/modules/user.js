import request from '../instance'

export default {
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
