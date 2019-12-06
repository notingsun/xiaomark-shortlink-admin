import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 第三方库
import iView from 'iview'
import VeLine from 'v-charts/lib/line.common'
// import 'iview/src/styles/index.less'
import './styles/theme.less'
import './styles/custom.less'
import './styles/animate.css'
import './styles/table.less'

import Api from './api/index'
import PDo from 'PDo'
import Bus from './bus'
import CustomComponents from './components/index' // itv 组件
import global from './libs/index' // 常量/函数 注册在 this.$global 上

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
}

// console.log 调试
console.test = () => {}
if (process.env.NODE_ENV === 'development') {
  console.test = (v) => {
    console.log('%c 🚀🚀🚀 --- %s', 'color: red', JSON.stringify(v))
  }
}

Vue.filter('countShort', global.utils.countFormat.short)
Vue.filter('countThree', global.utils.countFormat.three)

Vue.use(iView)
Vue.use(CustomComponents)
Vue.component(VeLine.name, VeLine)

Vue.prototype.$api = Api
Vue.prototype.$PDo = PDo
Vue.prototype.$bus = Bus
Vue.prototype.$global = global

Vue.config.productionTip = false

let that = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

export default that
