/* eslint-disable vars-on-top,no-unused-vars,prettier/prettier*/

/*
    公共：获取url的参数
*/
function getUrlQuery() {
  var search = window.location.search.slice(1).split('&')
  var query_map = {}
  var param_arr

  search.forEach(function(param) {
    if (param && param.indexOf('=') !== -1) {
      param_arr = param.split('=')
      query_map[param_arr[0]] = query_map[param_arr[0].toLocaleLowerCase()] = decodeURIComponent(param_arr[1] || '')
    }
  })

  console.log({ query_map })
  return query_map
}

/*
    公共：计算页面 html 的 font-size
 */
window.addEventListener('DOMContentLoaded', function() {
  // 备注：设置html的font-size，用于rem的计算，按照375的设计稿
  var w_document = document.documentElement.clientWidth
  // 备注：乘以10的原因是安卓机上，微信内嵌浏览器的最小字体大小好像不支持1px（具体什么原因不知道）
  var value_font_size = w_document / 375 * 10

  // 不让字体太小
  if (value_font_size < 10) {
    value_font_size = 10
  }
  if (value_font_size > 20) {
    value_font_size = 20
  }
  document.documentElement.style.fontSize = value_font_size + 'px'
})

/*
    公共：XMLHttpRequest 的 GET 和 POST 的封装
*/
function request(option) {
  if (String(option) !== '[object Object]') {
    return false
  }

  option.method = option.method ? option.method.toUpperCase() : 'GET'
  option.data = option.data || {}

  // GET 的参数
  var formData = []

  for (var key in option.data) {
    formData.push(''.concat(key, '=', encodeURIComponent(option.data[key])))
  }
  option.data = formData.join('&')

  if (option.method === 'GET') {
    option.url += location.search.length === 0 ? ''.concat(option.data ? '?' : '', option.data) : ''.concat('&', option.data)
  }

  // 新建一个请求
  var xhr = new XMLHttpRequest()

  xhr.responseType = option.responseType || 'json'

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (option.success && typeof option.success === 'function') {
          typeof option.success === 'function' && option.success(xhr.response)
        }
      } else if (option.error && typeof option.error === 'function') {
        typeof option.error === 'function' && option.error()
      }
    }
  }

  xhr.open(option.method, option.url, true)

  if (option.method === 'POST') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  }

  xhr.send(option.method === 'POST' ? option.data : null)
}

/*
    公共：判断用户设备
 */
function getDeviceInfo() {
  var userAgent = window.navigator.userAgent.toLowerCase()
  var is_android = /(android)/.test(userAgent)
  var is_iphone = /(iphone|ipod|ipad|ios)/.test(userAgent) // 抖音ipad可以直接打开
  var is_mobile = is_android || is_iphone
  var is_weixin_browser = /micromessenger/.test(userAgent)

  return {
    is_mobile,
    is_android,
    is_iphone,
    is_weixin_browser
  }
}

/*
    公共：立即执行防抖函数
 */
function debounce({ delay, successCb }) {
  var timer_target = null
  // eslint-disable-next-line no-underscore-dangle
  var _delay = delay || 1000

  return function() {
    if (!timer_target) {
      typeof successCb === 'function' && successCb()
    }
    if (timer_target) {
      clearTimeout(timer_target)
    }
    timer_target = setTimeout(function() {
      // eslint-disable-next-line no-undefined
      timer_target = undefined
    }, _delay)
  }
}