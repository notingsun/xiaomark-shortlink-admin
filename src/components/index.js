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
import ItvChartLine from './chart/chart-line'
import ItvUploadImage from './upload-images/upload-images'
import ItvModelImg from './upload-images/model-img'
import ItvGraphic from './msg-graphic/graphic'
import ItvGraphicItem from './msg-graphic/graphic-item'

const COMPONENTS = {
  ItvGraphic,
  ItvGraphicItem,
  ItvUploadImage,
  ItvModelImg,
  ItvChartLine,
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
