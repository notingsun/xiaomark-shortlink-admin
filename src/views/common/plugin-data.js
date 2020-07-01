/* 插件的静态信息 */

export const pluginList = ['wx-visit', 'wx-browser', 'wx-auto-open', 'wx-auto-open-tb']

/*
    获取微信内访问记录    wx-visit
    微信内分享卡片       wx-share
    微信内提示浏览器打开  wx-browser
    跳转抖音 App        wx-auto-open
    跳转淘宝 App        wx-auto-open-tb
 */

/* 插件前端key对应后端的key */
export const apiKeyMap = {
  'wx-share': 'open_wx_share',
  'wx-visit': 'open_wx_trace',
  'wx-browser': 'open_wx_escape',
  'wx-auto-open': 'open_douyin_app',
  'wx-auto-open-tb': 'open_taobao_app'
}

/**
 * 插件基本信息（列表页和详情页通用的信息）
 *    icon 图标
 *    title 名称
 *    description 描述
 *    img_introduce 介绍图片
 *    key_name 返回按钮显示的文案
 *    key 路由的key
 **/
export const appMap = {
  'wx-share': {
    icon: 'https://static.interval.im/interval/EecDs6dmKKj5TST3.png',
    title: '微信内分享卡片',
    description: '摆脱传统分享形式，用更微信的方式分享短链',
    key_name: '微信内分享卡片',
    key: 'wx-share'
  },
  'wx-visit': {
    icon: 'https://static.interval.im/interval/FfRxD4iafQtEcxJb.png',
    title: '获取微信内访问记录',
    description: '通过服务授权，获取微信内访问链接者的信息',
    key_name: '微信内访问记录',
    key: 'wx-visit'
  },
  'wx-browser': {
    icon: 'https://static.interval.im/interval/cBXJGYzYe3YxSX7K.png',
    title: '微信内提示浏览器打开',
    description: '短链接在微信内打开后，引导访问者通过浏览器打开网页',
    key_name: '微信内提示浏览器打开',
    key: 'wx-browser'
  },
  'wx-auto-open': {
    icon: 'https://static.interval.im/interval/mDmFCX8eW5Bpbb4d.png',
    title: '跳转抖音 App',
    description: '访客点击短链接后，会自动打开抖音 App 并跳转到相应页面',
    key_name: '跳转抖音 App',
    key: 'wx-auto-open'
  },
  'wx-auto-open-tb': {
    icon: 'https://static.interval.im/interval/WHWt7jGhQ73mdtDC.png',
    title: '跳转淘宝 App',
    description: '访客点击短链接后，会自动打开淘宝 App 并跳转到相应页面',
    key_name: '跳转淘宝 App',
    key: 'wx-auto-open-tb'
  }
}
