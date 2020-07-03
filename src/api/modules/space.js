const BASE_URL_LINK = process.env.VUE_APP_LINK_BASE_URL

export default {
  getSpaceList(params) {
    return {
      method: 'get',
      name: '列出协作空间',
      url: `${BASE_URL_LINK}/api/workspaces/`,
      params
    }
  },

  getSpaceDetail(id) {
    return {
      method: 'get',
      name: '列出协作空间的成员用户',
      url: `${BASE_URL_LINK}/api/workspaces/${id}/users/`,
      params: {}
    }
  }
}
