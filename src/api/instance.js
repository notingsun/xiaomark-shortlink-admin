/* 仅仅只是将封装：
 *  1、get 请求，参数无需{params: params}传入， 依旧保持 params
 *  2、如果请求成功，直接返回data.data的值，跳转try;
 *    如果请求失败，会在这里执行$Message.error，跳转catch;
 *    接口需要写在try catch模块中
 */
import Vue from 'vue'
import axios from 'axios'

const instance = axios.create()

// instance.defaults.withCredentials = true // 带上token

instance.interceptors.request.use(
  (config) => {
    if (Vue.prototype.$PDo.Cookies.get(process.env.VUE_APP_COOKIE)) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = Vue.prototype.$PDo.Cookies.get(
        process.env.VUE_APP_COOKIE
      )
    }
    // console.log(config)
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    // token过期
    if (response.data.code === 1101) {
      Vue.prototype.$PDo.Cookies.remove(process.env.VUE_APP_COOKIE)
      location.reload()
    }
    // 判断结果是否正确.提取复用.并直接返回结果（data.data）
    if (response.data.code === 0) {
      return response.data.data
    }
    // 如果报错.统一在这里toast提示
    const error = response.data.message

    Vue.prototype.$Message.error(error)
    return Promise.reject(error)
  },
  (error) => {
    Vue.prototype.$Message.error('系统错误')
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)

const request = (config) => {
  const { method, url } = config

  let params = config.params || {}

  if (config.method === 'get' && params) {
    params = { params }
  } // get 请求，参数无需{params: params}传入， 依旧保持 params
  return instance[method](url, params)
}

export default request
