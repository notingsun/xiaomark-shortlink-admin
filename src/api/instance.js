/*
  仅仅只是将封装：
      1、get 请求，参数无需{params: params}传入，依旧保持 params
      2、如果请求成功，直接返回data.data的值（代码中取值不累赘），跳转try（封装了response.data.code === 0的判断）;
        如果请求失败，会在这里执行$Message.error，执行跳转catch（接口调用需要写在try catch模块中）;
 */
import axios from 'axios'
import that from '../main'
import PDo from 'PDo'

const instance = axios.create()

// 注意：只有在回调函数中才能取到修改后的Vue的属性值(所以这里不能这么调用that.$global.utils.throttle)
// 避免弹出多个系统错误
const messageError = PDo.Utils.throttle(1500, () => {
  that.$Message.error('系统错误~')
})

// instance.defaults.withCredentials = true // 带上token

instance.interceptors.request.use(
  (config) => {
    if (that.$PDo.Cookies.get(process.env.VUE_APP_COOKIE)) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = that.$PDo.Cookies.get(
        process.env.VUE_APP_COOKIE
      )
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    messageError()
    return Promise.reject(error)
  }
)

/* 对response进行统一的处理 */
const handleResponse = ({ config, response }) => {
  // token过期
  // 1109 没有会员权限
  if ([1102, 1101, 1109].includes(response.data.code)) {
    that.$PDo.Cookies.remove(process.env.VUE_APP_COOKIE)
    location.reload()
  }

  // 判断结果是否正确.提取复用.并直接返回结果（data.data）
  if (response.data.code === 0) {
    // eslint-disable-next-line prettier/prettier
    console.log('✅%c【%s】', 'color: green', config.name || config.url, response.data.data, { config })
    return response.data.data
  } else if (config.noCode) {
    // eslint-disable-next-line prettier/prettier
    console.log('✅%c【%s】', 'color: green', config.name || config.url, response.data, { config })
    return response.data
  }

  // 如果报错.统一在这里toast提示（如果设置了showError为false，则不展示错误）
  const error = response.data.message

  config.showError !== false && error && that.$Message.error(error)

  console.log('❌%c【%s】', 'color: red', config.name || '-', error, { config })

  return Promise.reject(response.data) // 返回接口返回的错误信息
}

const request = (config) => {
  /**
   * config: {
   *      name: '接口描述',
   *      method: 'get',
   *      url: '接口地址',
   *      params: '接口参数',
   *      showError: Boolean, // 是否自动报错
   *      noCode: Boolean, // 是否根据code判断返回结果(七牛云的接口，没有返回code...)
   *      noHandle: Boolean, // 是否使用handleResponse处理响应结果(下载表格时，不能处理，blob会被字符串化乱码～)
   * }
   */
  const url = config.url
  const method = (config.method || '').toLowerCase()

  let params = config.params || {}

  if (config.method === 'get' && params) {
    params = { params }
  }

  if (config.noHandle) {
    return instance(config)
  }

  return instance[method](url, params)
    .then((response) => Promise.resolve({ config, response }))
    .then(handleResponse)
    .catch((error) => {
      return Promise.reject(error)
    })
}

export default request
