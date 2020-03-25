import axios from 'axios'
import that from '../main'
import PDo from 'PDo'

/* 一、工具函数 */
// 避免弹出多个系统错误
const showMessageError = PDo.Utils.throttle(1500, (text) => {
  // 注意：只有在回调函数中才能取到修改后的Vue的属性值(所以这里不能直接调用that.$global.utils.throttle)
  that.$Message.error(text || '系统错误~')
})
// 为了在控制台同时看到页面报错和网络请求等，可以在拦截响应中打印当情请求的响应结果。
const consoleResponse = function(is_true, response_data, config) {
  const CONSOLE_STYLE = {
    true: {
      one: '✅%c【%s】',
      two: 'color: green'
    },
    false: {
      one: '❌%c【%s】',
      two: 'color: red'
    }
  }
  const style = CONSOLE_STYLE[is_true] || {}

  console.log(style.one, style.two, config.name || config.url || '-', {
    response: response_data,
    request_config: config
  })
}

/* 二、请求实例 */
const instance = axios.create()

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    // 请求头加上Authorization字段（用户的cookie信息）
    if (that.$PDo.Cookies.get(process.env.VUE_APP_COOKIE)) {
      config.headers.Authorization = that.$PDo.Cookies.get(
        process.env.VUE_APP_COOKIE
      )
    }
    // 请求超时 timeout
    return { ...config, timeout: 2000 }
  },
  (err) => {
    // 第一级错误：网络错误（请求没有发送成功、超时了、断网）
    return Promise.reject(err)
  }
)

// 对response进行拦截统一处理
const handleResponse = ({ response, config, timer }) => {
  clearTimeout(timer)
  // token过期
  if ([1102, 1101].includes(response.data.code)) {
    console.error('token过期')
    that.$PDo.Cookies.remove(process.env.VUE_APP_COOKIE)
    location.reload()
  }

  // 判断结果是否正确.提取复用.并直接返回结果（data.data）
  if (response.data.code === 0) {
    consoleResponse(true, response.data.data, config)
    return response.data.data
  } else if (config.noCode) {
    consoleResponse(true, response.data, config)
    return response.data
  }

  // 如果报错.统一在这里toast提示（如果设置了showError为false，则不展示错误）
  const error = response.data.message || ''
  const is_no_error = (config.noErrorArr || []).includes(response.data.code)

  !is_no_error && // code 在不报错code数组中
  config.showError !== false && // 该接口不显示报错toast
    that.$Message.error(error)

  consoleResponse(false, error, config)

  // 第三级错误：接口返回错误（传参格式不对、没有权限等）
  return Promise.reject(response.data) // 返回接口返回的错误信息
}
// 响应超级
const handleTimeout = ({ rej, controller }) => {
  return setTimeout(() => {
    showMessageError('第二级错误：请求超时')
    controller.abort()
    rej('第二级错误：请求超时')
  }, 2000)
}

// 拦截响应
instance.interceptors.response.use(
  (response) => {
    // 注意：虽然 response 中包含config，但不包含自定义的config（所以需要对response做处理）
    return response
  },
  (error) => {
    showMessageError()
    // 第二级错误：远程服务错误（接口没有找到）
    return Promise.reject(error)
  }
)

// 对axios实例的封装
const request = (config) => {
  // config 中包括了很多自定义的属性（看md）
  const url = config.url
  const method = (config.method || '').toLowerCase() // 获得请求方法
  const controller = new AbortController()

  let params = config.params || {}

  // 为了兼容 get 请求，使参数无需{params: params}传入，依旧保持 params
  if (config.method === 'get') {
    params = { params }
  }

  // 禁止拦截器处理请求
  if (config.noHandle) {
    return instance(config)
  }
  let timer

  // 返回一个请求实例
  return new Promise((res, rej) => {
    // 响应超时
    timer = handleTimeout({ rej, controller })

    instance[method](url, params).then(res, rej) // 记得.then
  })
    .then((response) => Promise.resolve({ response, config, timer }))
    .then(handleResponse) // 对response做统一处理，且为了获取到config自定义数据
    .catch((error) => {
      return Promise.reject(error)
    })
}

export default request
