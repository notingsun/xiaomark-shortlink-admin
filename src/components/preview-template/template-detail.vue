/* 模版详情特殊样式 */
<template>
  <div class="template-detail">
    <preview-template :data="data" :onlyView="true" v-if="data.template" />
  </div>
</template>

<script>
import previewTemplate from './template.vue'
export default {
  name: 'TemplateDetail',
  mixins: [],
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  components: { previewTemplate },
  data() {
    return {
      data: {
        template: null,
        url: 'ss',
        data: []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.init()
  },
  watch: {
    'content.name': {
      handler: function() {
        this.init()
      },
      immediate: true
    }
  },
  methods: {
    getPushTemplate({ template }) {
      // console.log(template)
      const arr_template_row_string = (template.content || '').split('\n') // （当前模版消息，全部的）每行模版信息{String}

      let arr_template_rows = [],
        /* 转化整理过后的模版消息，即：全部的每行模版信息。用于预览组件。
            [{
              value: 预览组件中该单元格要显示的值,
              type: 该单元格的类型（text: 纯文本, br: 换行, value: 动态的值）,
              [key: 对应模版信息中的keyName（动态的值才会有该字段）,]
              [last: 是否是该行最后一个“动态值‘（动态的值才会有该字段）]
            }]
          */
        count_keyword = 1, // 发送模版消息时依据的表单.索引index
        arr_template_keywords = [] // 发送模版消息时依据的表单 {{label, key: 对应模版信息中的keyName}}

      // 遍历 解构 每行模版信息
      arr_template_row_string.forEach((row) => {
        let arr_template_row = [] // 该行（预览）模版消息

        // bugfix: 火狐和ie不支持反向断言 ?<= ,row.match(/(?<=\{\{)(.+?)(?=.DATA\}\})/g) || []
        let arr_keyword = row.match(/(?=\{\{)(.+?)(?=.DATA\}\})/g) || [] // 该行全部的“动态的值”的keyName

        arr_keyword = arr_keyword.map((item) => item.split('{{')[1]) // 因为，不支持反向断言，需要手动删除{{

        if (arr_keyword.length > 0) {
          // 该行：有“动态的值”（{{xxx.DATA}}）
          let current_row_string = row // 当前(操作后)的行字符串

          arr_keyword.map((cell, cellIndex) => {
            // 1、获取“动态的值”单元格的前后
            let current_row_arr = current_row_string.split(`{{${cell}.DATA}}`) // 将当前“动态值”从当前的行模版信息中删除

            // 2、当前处理的行模版信息（不断的删减中）的第一单元格是纯文本
            if (!current_row_string.startsWith('{{')) {
              // 更新.预览组件依据的模版信息.某行.某个单元格
              arr_template_row.push({
                value: current_row_arr[0],
                type: 'text'
              })
              // 将该“纯文本”从当前的行模版信息中删除
              current_row_arr.shift()
            }

            // 3、更新.预览组件依据的模版信息.某行.某个单元格
            arr_template_row.push({
              // eslint-disable-next-line prettier/prettier
              last: cell === 'remark' || !current_row_string.startsWith('{{') && cellIndex === arr_keyword.length - 1,
              value: `【字段${count_keyword}】`,
              key: cell,
              type: 'value'
            })

            // 4、更新.发送模版消息时依据的表单
            arr_template_keywords.push({
              label: `字段${count_keyword}`,
              key: cell
            })

            // 5、更新.发送模版消息时依据的表单.行数
            count_keyword += 1

            // 6、更新【当前(操作后)的行字符串】
            current_row_string = current_row_arr.join('')
          })
        } else if (arr_keyword.length === 0) {
          // 该行：纯文本、换行
          arr_template_row.push({ value: row, type: row ? 'text' : 'br' })
        } else {
          console.warn('---模版消息遍历时有未知的情况：', row) // 捕获异常
        }

        arr_template_rows.push(arr_template_row)
      })

      return {
        value: template['template_id'], // 模版.id
        label: template['title'], // 模版.名称
        rows: arr_template_rows, // 模版.’预览信息中字段x的’行信息，作为推送模版预览的依据
        keywords: arr_template_keywords // 模版.表单中‘值占位符’(字段x)的数组，作为推送模版表单的依据
      }
    },
    calValue() {
      return (this.content.msg_data || []).map((item) => {
        let value =
          (item.value || '').replace(/\$\$NICKNAME\$\$/g, '#关注者昵称#') || ' '

        return { ...item, value }
      })
    },
    async init() {
      // console.log({ content: this.content })
      this.data.template = await this.getPushTemplate({
        template: {
          content: this.content.content,
          template_id: '-',
          title: this.content.title
        }
      })
      this.data.data = this.calValue()
      this.data.url = this.content.link_url || this.content.mini_appid || ''

      console.log({ data: this.data })
    }
  }
}
</script>

<style scoped lang="less">
.template-detail {
  // width: 216px;
}
</style>
