/* 公共的工具函数 */
import that from '../main' // 引入vue的实例，并直接使用其属性方法

/**
 * 表单验证
 * @param {*} ref
 */
const verifyForm = (ref) => {
  let ok = false

  ref.validate((valid) => {
    if (valid) {
      ok = true
    } else {
      ok = false
    }
  })
  return ok
}

/**
 * 下载base64格式文件
 * @param {*} b64 - b64文件编码
 * @param {String} file_name - 命名的名称
 */
const downloadBase64Img = (b64, file_name) => {
  // 创建隐藏的可下载链接
  let eleLink = document.createElement('a')

  eleLink.download = file_name
  eleLink.style.display = 'none'
  eleLink.href = b64
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

/**
 * 路由中分页器参数的设置
 *    因为筛选如果是抽屉组件，那么分页器的数据又需要提取到全局store中，又要增加一个变量太麻烦了
 *    其次不直接在使用 itv-pagination 组件的地方，传入 current 和 page-size，感觉再创建一个变量太麻烦了
 *
 *    重置分页组件的值的页面（模块）可能不包含分页组件，不能够直接修改分页器的值（比如一个页面分为筛选页面，列表页面等，这时可能分页组件的值需要存放在父容器中/全局的store中）为了避免这些，才将分页器的值提出在路由中，直接操作路由的参数
 */
const pagination = {
  params: () => {
    return (
      that.$global.utils.pagination.get() ||
      that.$global.consts.PAGINATION_DEFAULT
    )
  }, // 获取分页参数，给后端的
  /* 注意： reset 后，若要获取最新的 params 值，需要将获取 params 的函数 写在 $nextTick 中，因为 Pagination 中 watch 的执行优先级比较低， 最后才会执行 */
  reset: () => {
    let query = { ...that.$route.query, page_reset: Date.now() } // 保留原本的参数

    that.$router.replace({
      name: that.$route.name,
      query
    })
  },
  set: (page, per_page) => {
    let query = { ...that.$route.query, page, per_page } // 保留原本的参数

    delete query.page_reset

    that.$router.replace({
      name: that.$route.name,
      query
    })
  },
  get: () => {
    const { page, per_page } = that.$route.query
    const res = { page, per_page }

    return page && per_page ? res : null
  }
}

const countFormat = {
  // 数量，三位逗号分割
  three: function(value) {
    return String(value || 0).replace(/(\d+?)(?=(\d{3})+$)/g, '$1,') || '-'
  },
  // 数量，缩短
  short: function(count) {
    const p = 1 // 精度

    let k = parseInt(count / 1000),
      w = parseInt(count / 10000)

    // 千
    if (k > 0 && k < 10) {
      return parseFloat(count / 1000).toFixed(p) + 'k'
    }

    // 万
    if (w > 0) {
      return parseFloat(count / 10000).toFixed(p) + 'w'
    }
    return count
  }
}

/**
 *  格式化编辑器内链接 返回该编辑器内链接的对象数组
 * @param {*} edit_format - 编辑器内已格式化后的内容
 */
const formatEditorLinkArray = (edit_format) => {
  if (!edit_format) {
    return
  }

  const regexp = /<a id="link[^>]+>([^]*?)(<\/a *>)/g
  const regexp_help = /<a id="help[^>]+>/g
  // 被匹配到的链接数组
  const links = edit_format.match(regexp)
  const helps = edit_format.match(regexp_help)

  let new_cnt = null

  let links_arr = []

  let helps_arr = []

  // 获取各链接信息返
  if (links) {
    // 格式化所有链接，替换为占位符，是后端要的
    links.forEach((item) => {
      const get_id = /(id=")([^]*?)(")/g
      const get_name = /(data-name=")([^]*?)(")/g
      const get_href = /(href=")([^]*?)(")/g
      const get_tags = /(data-tags=")([^]*?)(")/g

      let tags = []

      // 判断是否有标签
      // 注意：不能直接exec后，直接去[2]
      const get_tags_exec = get_tags.exec(item) || []
      const get_id_exec = get_id.exec(item) || []
      const get_name_exec = get_name.exec(item) || []
      const get_href_exec = get_href.exec(item) || []

      if (get_tags_exec[2] !== '' && get_tags_exec[2]) {
        tags = get_tags_exec[2].split(',').map(Number)
      } else {
        tags = []
      }

      links_arr.push({
        id: get_id_exec[2],
        name: get_name_exec[2],
        origin_url: get_href_exec[2],
        tag_ids: tags
      })
    })
  }

  // 获取各助力口令
  if (helps) {
    helps.forEach((item) => {
      const get_name = /(data-name=")([^]*?)(")/g
      const get_name_exec = get_name.exec(item) || []

      helps_arr.push(get_name_exec[2] + '助力进度')
    })
  }

  // eslint-disable-next-line
  new_cnt = edit_format.replace(regexp, '$$$LINK$$$').replace(/(<a ).*?(href=\".+?\").*?(>.+?<\/a>)/g, '$1$2$3') // 只保留href标签

  return { new_cnt, links_arr, helps_arr }
}

/**
 * 需要注册的工具函数
 */
const UTILS = {
  formatEditorLinkArray,
  countFormat,
  verifyForm,
  pagination,
  downloadBase64Img
}

export default UTILS
