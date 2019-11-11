/* 将libs中的常量和函数统一注册到$global上面 */
import consts from './consts' // 常量
import utils from './utils' // 工具函数

const ALL_CONTENT = {
  consts,
  utils
}

export default ALL_CONTENT
