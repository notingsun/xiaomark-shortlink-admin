/* 全局的常量 */

/**
 * 分页器.每页显示条数的初始值(分页器提取后，页面请求数据初始值保持统一)
 */
const INIT_PAGE_SIZE = 40
const PAGINATION_DEFAULT = {
  page: 1,
  per_page: INIT_PAGE_SIZE
}

/**
 * 需要注册的常量
 */
const CONSTS = {
  INIT_PAGE_SIZE,
  PAGINATION_DEFAULT
}

/* 套餐 */
// 套餐 free - 免费版 personal - 个人版，team - 团队版，enterprise - 企业版
// API套餐：
export const PACKAGES = {
  free: '免费版',
  personal: '个人版',
  team: '团队版',
  enterprise: '企业版'
}
export const API_PACKAGES = {
  free: '免费版',
  basic: '基础版',
  advanced: '进阶版',
  premium: '高级版',
  custom: '定制版'
}

export const PACKAGES_ARR = Object.keys(PACKAGES)
  .filter((key) => key !== 'free')
  .map((key) => ({ name: PACKAGES[key], key }))
export const API_PACKAGES_ARR = Object.keys(API_PACKAGES)
  .filter((key) => key !== 'free')
  .map((key) => ({ name: API_PACKAGES[key], key }))
export const PACKAGES_OPTIONS = Object.keys(PACKAGES).map((key) => ({ label: PACKAGES[key], value: key }))
export const API_PACKAGES_OPTIONS = Object.keys(API_PACKAGES).map((key) => ({ label: API_PACKAGES[key], value: key }))

export default CONSTS
