import request from '../instance'

export default {
  getStatisticsInfo(params) {
    return request({
      method: 'get',
      name: '获取总体数据',
      url: '/api/qr/stats/overview/',
      params
    })
  },

  getUserListQr(params) {
    return request({
      method: 'get',
      name: '列出用户',
      url: '/api/qr/users/',
      params
    })
  },

  getAccountList(params) {
    return request({
      method: 'get',
      name: '列出微信公众平台',
      url: '/api/qr/platforms/',
      params
    })
  },

  getQrderList(params) {
    return request({
      method: 'get',
      name: '列出订单',
      url: '/api/qr/platforms/orders/',
      params
    })
  },

  getQrList(params) {
    return request({
      method: 'get',
      name: '列出二维码',
      url: '/api/qr/qrcodes/',
      params
    })
  },

  putPackageDate(id, params) {
    return request({
      method: 'put',
      name: '修改公众号套餐到期日',
      url: `/api/qr/platforms/${id}/date/`,
      params
    })
  }
}
