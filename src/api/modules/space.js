export default {
  getSpaceList(params) {
    return {
      method: 'get',
      name: '列出协作空间',
      url: '/api/sl/workspaces/',
      params
    }
  },

  getSpaceDetail(id) {
    return {
      method: 'get',
      name: '列出协作空间详情',
      url: `/api/sl/workspaces/${id}/users/`,
      params: {}
    }
  }
}
