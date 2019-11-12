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

export default CONSTS
