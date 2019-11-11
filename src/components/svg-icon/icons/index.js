/* 引入所有的svg图标（当前文件夹下的.svg图标） */
// import Vue from 'vue'
// import SvgIcon from '../components/svg-icon/svg-icon.vue' // svg组件

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('.', true, /\.svg$/)

// console.log(requireAll(req))

requireAll(req)

// register globally
// Vue.component('svg-icon', SvgIcon)
