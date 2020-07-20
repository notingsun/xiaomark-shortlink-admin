import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录
const login = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue')
}

// 404
const not_found = {
  path: '/404',
  name: '404',
  component: () => import('@/views/404.vue')
}

// 短链
const short_link = [
  {
    path: '/user-list',
    meta: { menuIndex: '2', title: '用户列表' },
    name: 'UserList',
    component: () => import('@/views/user/user-list.vue')
  },

  // 数据统计
  {
    path: '/short-link-statistic',
    meta: { menuIndex: '3', title: '短链数据' },
    name: 'ShortLinkStatistic',
    component: () => import('@/views/link/short-link-statistic.vue')
  },
  {
    path: '/pv-statistic',
    meta: { menuIndex: '3', title: '链接访问次数统计' },
    name: 'PvStatistic',
    component: () => import('@/views/link/pv-statistic.vue')
  },
  {
    path: '/uv-statistic',
    meta: { menuIndex: '3', title: '用户增长数据统计' },
    name: 'UvStatistic',
    component: () => import('@/views/link/uv-statistic.vue')
  },

  /* 短链列表 */
  {
    path: '/short-link-list',
    meta: { menuIndex: '4', title: '短链列表' },
    name: 'ShortLinkList',
    component: () => import('@/views/link/short-link-list.vue')
  },
  {
    path: '/short-link-list-user/:user_id',
    meta: { menuIndex: '4', title: '短链列表.用户' },
    name: 'ShortLinkListUser',
    component: () => import('@/views/link/short-link-list-user.vue')
  },
  {
    path: '/short-link-list-space/:space_id',
    meta: { menuIndex: '4', title: '短链列表.协作空间' },
    name: 'ShortLinkListSpace',
    component: () => import('@/views/link/short-link-list-space.vue')
  },
  {
    path: '/short-link-list-custom-domain/:domain_name',
    meta: { menuIndex: '4', title: '短链列表.自定义域名' },
    name: 'ShortLinkListCustomDomain',
    component: () => import('@/views/link/short-link-list-custom-domain.vue')
  },

  {
    path: '/target-link-statistic',
    meta: { menuIndex: '5', title: '跳转链接数据' },
    name: 'TargetLinkStatistic',
    component: () => import('@/views/link/target-link-statistic.vue')
  },
  {
    path: '/target-link-black',
    meta: { menuIndex: '5', title: '网站黑名单' },
    name: 'TargetLinkBlack',
    component: () => import('@/views/link/target-link-black.vue')
  },

  /* 协作空间列表 */
  {
    path: '/space-list',
    meta: { menuIndex: '6', title: '协作空间列表' },
    name: 'SpaceList',
    component: () => import('@/views/space/space-list.vue')
  },
  {
    path: '/space-list-user/:user_id',
    meta: { menuIndex: '6', title: '协作空间列表.用户' },
    name: 'SpaceListUser',
    component: () => import('@/views/space/space-list-user.vue')
  },
  {
    path: '/space-detail/:space_id',
    meta: { menuIndex: '6', title: '某个协作空间的详细信息' },
    name: 'SpaceDetail',
    component: () => import('@/views/space/space-detail.vue')
  },

  /* api域名 */
  {
    path: '/apI-domain-list',
    meta: { menuIndex: '7', title: 'API域名列表' },
    name: 'ApiDomainList',
    component: () => import('@/views/api-domain/api-domain-list.vue')
  },
  {
    path: '/apI-domain-check',
    meta: { menuIndex: '8', title: 'API待审核域名' },
    name: 'ApiDomainCheck',
    component: () => import('@/views/api-domain/api-domain-check.vue')
  },

  /* 自定义域名列表 */
  {
    path: '/custom-domain-list',
    meta: { menuIndex: '9', title: '自定义域名列表' },
    name: 'CustomDomainList',
    component: () => import('@/views/custom-domain/custom-domain-list.vue')
  },

  /* 插件列表 */
  {
    path: '/plugin-list',
    meta: { menuIndex: '10', title: '插件列表' },
    name: 'PluginList',
    component: () => import('@/views/plugin/plugin-list.vue')
  },

  /* Redis集群列表 */
  {
    path: '/redis-list',
    meta: { menuIndex: '11', title: 'Redis集群列表' },
    name: 'RedisList',
    component: () => import('@/views/dev/redis-list.vue')
  }
]

// 渠道码
const qr = [
  {
    path: '/user-list-qr',
    meta: { menuIndex: '101', title: '用户列表-渠道码' },
    name: 'UserListQr',
    component: () => import('@/views/qr/user-list-qr.vue')
  },
  {
    path: '/qr-list/:account_id',
    meta: { menuIndex: '104', title: '公众号列表-二维码' },
    name: 'AccountQrList',
    component: () => import('@/views/qr/qr-list.vue')
  },
  {
    path: '/template-list',
    meta: { menuIndex: '105', title: '模版消息' },
    name: 'TemplateList',
    component: () => import('@/views/qr/template-list.vue')
  },
  {
    path: '/service-list',
    meta: { menuIndex: '106', title: '客服消息' },
    name: 'ServiceList',
    component: () => import('@/views/qr/service-list.vue')
  },
  {
    path: '/template-list/:account_id',
    meta: { menuIndex: '104', title: '公众号列表-模版消息' },
    name: 'AccountTemplateList',
    component: () => import('@/views/qr/template-list.vue')
  },
  {
    path: '/service-list/:account_id',
    meta: { menuIndex: '104', title: '公众号列表-客服消息' },
    name: 'AccountServiceList',
    component: () => import('@/views/qr/service-list.vue')
  },
  {
    path: '/order-list',
    meta: { menuIndex: '107', title: '订单列表' },
    name: 'OrderList',
    component: () => import('@/views/qr/order-list.vue')
  },
  {
    path: '/order-list2',
    meta: { menuIndex: '1072', title: '订单列表(老)' },
    name: 'OrderList2',
    component: () => import('@/views/qr/order-list2.vue')
  },
  {
    path: '/qr-list',
    meta: { menuIndex: '103', title: '二维码列表' },
    name: 'QrList',
    component: () => import('@/views/qr/qr-list.vue')
  },
  {
    path: '/account-list',
    meta: { menuIndex: '104', title: '公众号列表' },
    name: 'AccountList',
    component: () => import('@/views/qr/account-list.vue')
  },
  {
    path: '/account-list2',
    meta: { menuIndex: '1042', title: '公众号列表（老）' },
    name: 'AccountList2',
    // TODO
    component: () => import('@/views/qr/account-list2.vue')
  }
]

// 入口
const layout = {
  path: '/',
  name: 'Layout',
  redirect: '/user-statistic',
  component: () => import('@/views/layout.vue'),
  children: [
    {
      path: '/user-statistic',
      meta: { menuIndex: '1', title: '用户数据' },
      name: 'UserStatistic',
      component: () => import('@/views/user/user-statistic.vue')
    },

    // 短链
    ...short_link,

    // 渠道码
    ...qr
  ]
}

// dev 开发路由
const dev = [
  {
    path: '/dev/svg-icon',
    name: 'SvgIcon',
    component: () => import('./components/svg-icon/svg-show-all.vue')
  },
  {
    path: '/dev/upload-imgs',
    name: 'UploadImgs',
    component: () => import('@/views/dev/upload-imgs.vue')
  }
]

const originalPush = Router.prototype.push

Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}

const router = new Router({
  mode: 'history',
  routes: [
    ...dev,
    login,
    layout,
    not_found,
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

export default router
