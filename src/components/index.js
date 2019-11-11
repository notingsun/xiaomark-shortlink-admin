/**
 * 全局注册自定义组件
 * 每个自定义组件，都需要在本文件中引入
 * @authors Pony <mycnj123@gmail.com>
 */
import Vue from 'vue'
import itvIcon from './svg-icon/svg-icon'
import './svg-icon/icons' // 引入全部的svg图标
import ItvPagination from './pagination/pagination.vue'
import ItvBreadcrumb from './breadcrumb/breadcrumb.vue'

const COMPONENTS = {
  ItvBreadcrumb,
  itvIcon,
  ItvPagination
}

// register globally
export default () => {
  Object.keys(COMPONENTS).forEach((key) => {
    Vue.component(key, COMPONENTS[key])
  })
}
