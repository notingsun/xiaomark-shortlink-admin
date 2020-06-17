/**
 * 接口模块入口文件
 * 提供全局拦截器，每个模块都需在本文件中引入并导出
 * @authors Pony <mycnj123@gmail.com>
 */
import Admin0 from './modules/admin'
import User0 from './modules/user'
import Link0 from './modules/link'
import Qr0 from './modules/qr'
import Space0 from './modules/space'
import ApiDomain0 from './modules/api-domain'
import CustomDomain0 from './modules/custom-domain'
import Plugin0 from './modules/plugin'

import request from './request' // 为了只使用一个请求实例

// 获取一个代理实例，根据配置信息生成接口
// eslint-disable-next-line no-unused-vars
const getProxy = (proxyObj) => {
  return new Proxy(
    {},
    {
      get(target, apiName) {
        return (param1, param2) => {
          // 为了兼容传了两个参数的（id需要用在url中，动态url），返回request请求
          // param2 可能没有（有的时候param1是id）
          return request(proxyObj[apiName](param1, param2))
        }
      }
    }
  )
}

// 第一种方法：动态生成全部的对象
// const getProxy = (proxyObj) => {
//   return Object.keys(proxyObj).reduce((pre, apiName) => {
//     // eslint-disable-next-line no-invalid-this
//     pre[apiName] = (param1, param2) =>
//       request(proxyObj[apiName](param1, param2))
//     return pre
//   }, {})
// }

// 第二种方法：动态代理获取接口
const ApiDomain = getProxy(ApiDomain0)
const User = getProxy(User0)
const Space = getProxy(Space0)
const Admin = getProxy(Admin0)
const Link = getProxy(Link0)
const Qr = getProxy(Qr0)
const CustomDomain = getProxy(CustomDomain0)
const Plugin = getProxy(Plugin0)

export default {
  Plugin,
  CustomDomain,
  ApiDomain,
  Space,
  Qr,
  User,
  Admin,
  Link
}
