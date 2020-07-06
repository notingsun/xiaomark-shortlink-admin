/* 协作空间列表的筛选 */
<template>
  <div class="filter-user">
    <Dropdown trigger="custom" :visible="show_drawer" placement="bottom-end" @on-clickoutside="handleClickoutside">
      <Button class="" @click="show_drawer = true" style="width: 90px;" :loading="loading">筛选</Button>
      <DropdownMenu slot="list">
        <div class="form-filter">
          <!-- 筛选表单 -->
          <div class="itv-flex--fs mb8 row" v-for="(fromItem, i) in form_filter" :key="i">
            <div class="row-label">{{ fromItem.name }}</div>
            <div class="row-value">
              <!-- 下拉框 -->
              <Select v-if="['select', 'selectMultiple'].includes(fromItem.type)" v-model="fromItem.value" :multiple="fromItem.type === 'selectMultiple'">
                <Option v-for="option in options[fromItem.key]" :value="option.value" :key="option.value">
                  {{ option.label }}
                </Option>
              </Select>
              <!-- 单选 -->
              <RadioGroup v-if="['radio'].includes(fromItem.type)" v-model="fromItem.value">
                <Radio :label="option.value" v-for="option in options[fromItem.key]" :key="option.value">{{ option.label }}</Radio>
              </RadioGroup>
              <!-- 有范围的输入框 -->
              <i-input v-if="['range_input'].includes(fromItem.type)" v-model="fromItem.value" type="number">
                <Select v-model="fromItem.range_value" style="width:60px" slot="prepend">
                  <Option v-for="item in options_range" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </i-input>
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
  name: 'FilterUser',
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

    this.options_range = [
      { value: '*', label: '不限' },
      { value: 'eq', label: '等于' },
      { value: 'lt', label: '小于' },
      { value: 'gt', label: '大于' }
    ]

    this.start_form_filter = null

    return {
      show_drawer: false,
      options: {
        // 列表排序方式
        order_by: [
          { value: '*', label: '按创建时间倒序' },
          { value: 'last_login_time', label: '按最近登录时间倒序' },
          { value: 'n_created_workspaces', label: '按创建的协作空间数量倒序' },
          { value: 'n_joined_workspaces', label: '按加入的协作空间数量倒序' },
          { value: 'n_links', label: '按创建的链接数量倒序' },
          { value: 'n_api_links', label: '按开放API创建的链接数量倒序' },
          { value: 'n_nonapi_links', label: '按非开放API创建的链接数量倒序' },
          { value: 'n_normal_links', label: '按创建的普通跳转链接数量倒序' },
          { value: 'n_random_links', label: '按创建的随机跳转链接数量倒序' },
          { value: 'n_links_today', label: '按今日创建的链接数量倒序' },
          { value: 'pv', label: '按创建的链接的访问次数倒序' },
          { value: 'pv_today', label: '按创建的链接的今日访问次数倒序' }
        ],
        // 是否可用
        enabled: OPTIONS_YES_NO,
        // 是否已激活
        active: OPTIONS_YES_NO,
        // 是否开启API
        open_api: OPTIONS_YES_NO,
        // 是否开启协作空间
        open_workspace: OPTIONS_YES_NO,
        // 是否开启微信内分享卡片
        open_wx_share: OPTIONS_YES_NO,
        // 是否开启微信内追踪访问记录
        open_wx_trace: OPTIONS_YES_NO,
        // 是否开启微信内强制浏览器打开
        open_wx_escape: OPTIONS_YES_NO,
        // 是否开启跳转抖音APP
        open_douyin_app: OPTIONS_YES_NO,
        // 是否开启跳转淘宝APP
        open_taobao_app: OPTIONS_YES_NO,
        // 协作者数量是否大于0
        has_collaborator: OPTIONS_YES_NO
      },
      form_filter: [
        /*
          name: 筛选项的名称
          key: 筛选项对应的键名
          range_key: 取值范围对应选项的键名
          value: 筛选项的值
          range_value: 筛选的前置选择框
          type: 筛选项的表单类型
          valueCaclType: 提取值时，处理方式
         */
        {
          name: '列表排序方式',
          key: 'order_by',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: '最近登录时间距今的天数',
          key: 'last_login_date',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '激活时间距今的天数',
          key: 'active_date',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '过去30天登录天数',
          key: 'login_30',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '过去30天创建链接数',
          key: 'link_30',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '过去30天数据报表页分享次数',
          key: 'share_30',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '是否可用',
          key: 'enabled',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '是否已激活',
          key: 'active',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '是否开启API',
          key: 'open_api',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '是否开启协作空间',
          key: 'open_workspace',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启微信内追踪访问记录',
          key: 'open_wx_trace',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启微信内分享卡片',
          key: 'open_wx_share',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启微信内强制浏览器打开',
          key: 'open_wx_escape',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启跳转抖音APP',
          key: 'open_douyin_app',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启跳转淘宝APP',
          key: 'open_taobao_app',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
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

        if (t === 'calcSpecialValue') {
          res[formItem.key] = v === '*' ? '' : v
        } else if (t === 'calcArr') {
          const isSelectAll = (this.options[formItem.key] || []).length === v.length

          // 全部选中表示不限，传给后端空，提高查询效率
          res[formItem.key] = isSelectAll ? '' : v.join(',')
        } else if (t === 'calcDefault') {
          res[formItem.key] = v
        } else if (t === 'calcRangeInput') {
          res[formItem.key] = formItem.range_value === '*' ? null : `${formItem.range_value}${v}`
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
      setTimeout(() => {
        this.$emit('submit')
      }, 300)
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
// .filter-user {
// }

.form-filter {
  width: 540px;
  padding: 16px 16px 8px;
  box-sizing: border-box;
  .row {
    min-height: 32px;
  }
  .row-label {
    width: 160px;
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
