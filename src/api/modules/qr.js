export default {
  getStatisticsInfo(params) {
    return {
      method: 'get',
      name: '获取总体数据',
      url: '/api/qr/stats/overview/',
      params
    }
  },

  getUserListQr(params) {
    return {
      method: 'get',
      name: '列出用户',
      url: '/api/qr/users/',
      params
    }
  },

  postUserToken(id, params) {
    return {
      method: 'post',
      name: '生成用户的身份令牌',
      url: `/api/qr/users/${id}/token/`,
      params
    }
  },

  getAccountList(params) {
    return {
      method: 'get',
      name: '列出微信公众平台',
      url: '/api/qr/platforms/',
      params
    }
  },

  getQrderList(params) {
    return {
      method: 'get',
      name: '列出订单(渠道码)',
      url: '/api/qr/platforms/orders/',
      params
    }
  },

  getPushQrderList(params) {
    return {
      method: 'get',
      name: '列出订单(推送)',
      url: '/api/ps/platforms/indents/',
      params
    }
  },

  getQrList(params) {
    return {
      method: 'get',
      name: '列出二维码',
      url: '/api/qr/qrcodes/',
      params
    }
  },

  getTemplateList(params) {
    return {
      method: 'get',
      name: '模版消息列表',
      url: '/api/templateMessage/',
      params
    }
  },

  getServiceList(params) {
    return {
      method: 'get',
      name: '客服消息列表',
      url: '/api/customMessage/',
      params
    }
  },

  putPackage(id, params) {
    return {
      method: 'put',
      name: '修改公众号套餐',
      url: `/api/qr/platforms/${id}/bale/`,
      params
    }
  },

  // TODO 删除
  putPackage22(id, params) {
    return {
      method: 'put',
      name: '修改公众号套餐（此API会归零已扫码次数）',
      url: `/api/qr/platforms/${id}/combo/`,
      params
    }
  },

  // TODO 删除
  putPackage2(id, params) {
    return {
      method: 'put',
      name: '修改公众号推送套餐',
      url: `/api/ps/platforms/${id}/meal/`,
      params
    }
  }
}
