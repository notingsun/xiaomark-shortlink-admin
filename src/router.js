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
    {
      path: '/user-list',
      meta: { menuIndex: '2', title: '用户列表' },
      name: 'UserList',
      component: () => import('@/views/user/user-list.vue')
    },
    {
      path: '/user-detail/:user_id',
      meta: { menuIndex: '2', title: '用户创建的短链页' },
      name: 'UserDetail',
      component: () => import('@/views/user/user-detail.vue')
    },
    {
      path: '/short-link-statistic',
      meta: { menuIndex: '3', title: '短链数据' },
      name: 'ShortLinkStatistic',
      component: () => import('@/views/link/short-link-statistic.vue')
    },
    {
      path: '/short-link-list',
      meta: { menuIndex: '4', title: '短链列表' },
      name: 'ShortLinkList',
      component: () => import('@/views/link/short-link-list.vue')
    },
    {
      path: '/target-link-statistic',
      meta: { menuIndex: '5', title: '跳转链接数据' },
      name: 'TargetLinkStatistic',
      component: () => import('@/views/link/target-link-statistic.vue')
    },
    // 渠道码
    {
      path: '/user-list-qr',
      meta: { menuIndex: '101', title: '用户列表-渠道码' },
      name: 'UserListQr',
      component: () => import('@/views/qr/user-list-qr.vue')
    },
    {
      path: '/account-qr-list/:account_id',
      meta: { menuIndex: '104', title: '公众号列表-二维码' },
      name: 'AccountQrList',
      component: () => import('@/views/qr/account-qr-list.vue')
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
    }
  ]
}

// dev 开发路由
const dev = {
  path: '/dev/svg-icon',
  name: 'SvgIcon',
  component: () => import('./components/svg-icon/svg-show-all.vue')
}

const router = new Router({
  mode: 'history',
  routes: [
    dev,
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
