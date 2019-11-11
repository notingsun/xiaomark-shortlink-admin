/**
 * 接口模块入口文件
 * 提供全局拦截器，每个模块都需在本文件中引入并导出
 * @authors Pony <mycnj123@gmail.com>
 */
import Admin from './admin'
import User from './user'
import Link from './link'

export default {
  User,
  Admin,
  Link
}
