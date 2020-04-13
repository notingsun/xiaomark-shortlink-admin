/* 消息详情：各种处理函数 */
export default {
  computed: {
    // 显示跳转链接
    show_link_block() {
      const show_arr = ['text', 'template']

      return show_arr.includes(this.dialog.category)
    }
  },
  methods: {
    // 对话框的信息
    calDialogInfo() {
      // 处理的信息
      const obj = this.dialog.obj
      // 消息类型
      const dialog_type = obj.msg_type || 'template'

      this.dialog.category = dialog_type // 设置消息类型

      this.calContentAndLink()
      this.dialog.tags = obj.tags
      this.calTitle()
    },

    // 处理模版消息
    calTemplateHtml(template, data) {
      let res = template

      data.forEach((item) => {
        const key = `{{${item.key}.DATA}}`

        if (template.includes(key)) {
          res = res.replace(key, item.value)
        }
      })
      // eslint-disable-next-line prettier/prettier
      res = res.split('\n').filter(item => item !== '').join('<br/>')
      res = res.split(' ').join('&nbsp;')

      return res
    },

    // 标题
    calTitle() {
      const title_map = {
        text: '文本消息',
        image: '图片消息',
        mpnews: '图文消息',
        template: ''
      }

      const title = title_map[this.dialog.category]

      this.dialog.title = title
    },

    // 内容
    calContentAndLink() {
      let content,
        links = []

      const dialog_type = this.dialog.category
      const obj = this.dialog.obj

      // 文本消息
      if (dialog_type === 'text') {
        content = obj.text_html.replace(/(<a [^>]+>)([^<]*)([^]*?)(<\/a *>)/g, '$1$2$4').replace(/(<a )([^]*?)([^>]*?)(>)/g, '$1$4')
        content = obj.text_html.replace(/(<span )([^]*?)([^>]*?)(>)/g, '$1$4')
        links = this.$global.utils.formatEditorLinkArray(obj.text_html).links_arr
      }

      // 模版消息
      if (dialog_type === 'template') {
        content = obj
        content.template_html = this.calTemplateHtml(content.content, content.msg_data)
        if (content.mini_appid) {
          links = [
            {
              name: content.mini_name,
              origin_url: content.mini_pagepath,
              mini_appid: content.mini_appid
            }
          ]
        } else {
          links = [{ name: '', origin_url: content.link_url }]
        }
      }

      // 图片消息
      if (dialog_type === 'image') {
        content = obj.image_url
      }

      // 图文消息
      if (dialog_type === 'mpnews') {
        content = obj.news_media_id || []
      }

      this.dialog.content = content
      this.dialog.links = links
    }
  }
}
