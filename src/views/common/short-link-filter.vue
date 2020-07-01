/* 短链列表的筛选 */
<template>
  <div class="short-link-filter">
    <Dropdown trigger="custom" :visible="show_drawer" placement="bottom-end" @on-clickoutside="handleClickoutside">
      <Button class="" @click="show_drawer = true" style="width: 90px;" :loading="loading">筛选</Button>
      <DropdownMenu slot="list">
        <div class="form-filter">
          <!-- 筛选表单 -->
          <div class="itv-flex--fs mb8" v-for="(fromItem, i) in form_filter" :key="i">
            <div class="row-label">{{ fromItem.name }}</div>
            <div class="row-value">
              <!-- 下拉框 -->
              <Select v-if="['select', 'selectMultiple'].includes(fromItem.type)" v-model="fromItem.value" :multiple="fromItem.type === 'selectMultiple'">
                <Option v-for="option in options[fromItem.key]" :value="option.value" :key="option.value">
                  {{ option.label }}
                </Option>
              </Select>
            </div>
          </div>
          <!-- 底部按钮 -->
          <div class="itv-flex--sb mt24">
            <Button class="mr16" @click="handleFilterReset">重置</Button>
            <div>
              <Button class="mr16" @click="handleCancle">取消</Button>
              <Button type="primary" @click="handleSubmit">确认</Button>
            </div>
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  name: 'ShortLinkFilter',
  mixins: [],
  props: {
    loading: {
      type: Boolean
    },
    value: {
      type: Object
    }
  },
  components: {},
  data() {
    const OPTIONS_YES_NO = [
      { label: '不限', value: '*' },
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]

    this.start_form_filter = null

    return {
      show_drawer: false,
      options: {
        filter: [
          { value: '*', label: '不限' },
          { value: 'eq', label: '等于' },
          { value: 'lt', label: '小于' },
          { value: 'gt', label: '大于' }
        ],
        // 列表排序方式
        order_by: [
          { value: 'modify_time', label: '按数据修改时间倒序' },
          { value: '*', label: '按数据创建时间倒序' },
          { value: 'pv', label: '按访问次数倒序' },
          { value: 'uv', label: '按访问人数倒序' },
          { value: 'uip', label: '按访问IP数倒序' },
          { value: 'pv_today', label: '按今日访问次数倒序' },
          { value: 'uv_today', label: '按今日访问人数倒序' },
          { value: 'uip_today', label: '按今日访问IP数倒序' }
        ],
        // 列表排序方式
        sources: [
          { value: '1', label: '网站' },
          { value: '2', label: '小程序' },
          { value: '3', label: '浏览器插件' },
          { value: '4', label: '开放API' }
        ],
        // 链接跳转类型
        modes: [
          { value: '0', label: '普通' },
          { value: '1', label: '随机-记忆' },
          { value: '2', label: '随机-非记忆' }
        ],
        // 是否设置了微信内分享卡片参数
        set_wx_share: OPTIONS_YES_NO,
        // 是否开启微信内分享卡片
        open_wx_share: OPTIONS_YES_NO,
        open_other_plugin: [
          { value: '*', label: '不限' },
          { value: 'open_wx_trace', label: '微信内追踪访问记录' },
          { value: 'open_wx_escape', label: '微信内强制浏览器打开' },
          { value: 'open_douyin_app', label: '跳转抖音APP' },
          { value: 'open_taobao_app', label: '跳转淘宝APP' }
        ],
        // 是否可用
        enabled: OPTIONS_YES_NO,
        // 是否归档
        archived: OPTIONS_YES_NO
      },
      form_filter: [
        /*
          name: 筛选项的名称
          key: 筛选项对应的键名
          value: 筛选项的值
          type: 筛选项的表单类型
          valueCaclType: 提取值时，处理方式
         */
        {
          name: '列表排序方式',
          key: 'order_by',
          valueCaclType: 'calcSpecialValue',
          value: 'modify_time',
          type: 'select'
        },
        {
          name: '来源',
          key: 'sources',
          valueCaclType: 'calcArr',
          value: ['3', '1', '2'],
          type: 'selectMultiple'
        },
        {
          name: '链接跳转类型',
          key: 'modes',
          valueCaclType: 'calcArr',
          value: ['0', '1', '2'],
          type: 'selectMultiple'
        },
        {
          name: '设置微信内分享卡片参数',
          key: 'set_wx_share',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: '插件微信内分享卡片',
          key: 'open_wx_share',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: '其他插件',
          key: 'open_other_plugin',
          valueCaclType: 'calcPlugin',
          value: '*',
          type: 'select'
        },
        {
          name: '是否可用',
          key: 'enabled',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: '是否归档',
          key: 'archived',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    value: {
      handler: function(v) {
        if (JSON.stringify(v) === '{}') {
          this.handleSubmit()
        }
      },
      immediate: true
    },
    show_drawer(v) {
      if (v) {
        this.start_form_filter = JSON.parse(JSON.stringify(this.form_filter))
      }
    }
  },
  methods: {
    // 重置筛选
    handleFilterReset() {
      this.form_filter = this.$options.data().form_filter
    },

    // 获得筛选的值
    calcFormFilter() {
      let res = {}

      this.form_filter.forEach((formItem) => {
        const t = formItem.valueCaclType
        const v = formItem.value

        const calcStarPlugin = function(other, key) {
          if (other === key) {
            return '1'
          }
          return ''
        }

        if (t === 'calcSpecialValue') {
          res[formItem.key] = v === '*' ? '' : v
        } else if (t === 'calcArr') {
          res[formItem.key] = v.join(',')
        } else if (t === 'calcDefault') {
          res[formItem.key] = v
        } else if (t === 'calcPlugin') {
          res.open_wx_trace = calcStarPlugin(v, 'open_wx_trace')
          res.open_wx_escape = calcStarPlugin(v, 'open_wx_escape')
          res.open_douyin_app = calcStarPlugin(v, 'open_douyin_app')
          res.open_taobao_app = calcStarPlugin(v, 'open_taobao_app')
        } else {
          console.error('没有对应测处理函数', t)
        }
      })

      return res
    },

    // 筛选
    handleSubmit() {
      this.show_drawer = false
      // 提交筛选数据
      this.$emit('input', this.calcFormFilter())
      this.$emit('submit')
    },

    // 点击外部
    handleClickoutside() {
      console.log('handleClickoutside')
      // this.show_drawer = false
    },

    // 点击取消
    handleCancle() {
      this.form_filter = JSON.parse(JSON.stringify(this.start_form_filter))
      this.show_drawer = false
    }
  }
}
</script>

<style lang="less">
// .short-link-filter {
// }

.form-filter {
  width: 540px;
  padding: 16px 16px 8px;
  box-sizing: border-box;
  .row-label {
    width: 150px;
    text-align: right;
    padding-right: 16px;
  }
  .row-value {
    flex: 1;
  }
}
.ivu-select-dropdown {
  max-height: 300px;
}
</style>
