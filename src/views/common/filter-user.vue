/* 协作空间列表的筛选 */
<template>
  <div class="filter-user">
    <Dropdown trigger="custom" :visible="show_drawer" placement="bottom-end" @on-clickoutside="handleClickoutside">
      <Button class="" @click="show_drawer = true" style="width: 90px;" :loading="loading">筛选</Button>
      <DropdownMenu slot="list">
        <div class="form-filter">
          <!-- 筛选表单 -->
          <div class="form-filter__cnt">
            <div class="itv-flex--fs mb8 row" v-for="(fromItem, i) in form_filter" :key="i">
              <div class="row-label" v-if="fromItem" :title="fromItem.name">{{ fromItem.shortName || fromItem.name }}</div>
              <div class="row-value">
                <!-- 下拉框 -->
                <Select v-if="['select_group'].includes(fromItem.type)" v-model="fromItem.value" :multiple="fromItem.type === 'selectMultiple'">
                  <OptionGroup :label="group.groupName" v-for="(group, i) in options[fromItem.key]" :key="group.groupName" :style="{ 'border-top': i ? '1px solid #eee' : '' }">
                    <Option v-for="option in group.list" :value="option.value" :key="option.value" :disabled="option.disabled" :title="option.label">
                      {{ option.labelShort || option.label }}
                    </Option>
                  </OptionGroup>
                </Select>
                <Select v-if="['select', 'selectMultiple'].includes(fromItem.type)" v-model="fromItem.value" :multiple="fromItem.type === 'selectMultiple'">
                  <Option v-for="option in options[fromItem.key]" :value="option.value" :key="option.value" :disabled="option.disabled">
                    {{ option.label }}
                  </Option>
                </Select>
                <!-- 单选 -->
                <RadioGroup v-if="['radio'].includes(fromItem.type)" v-model="fromItem.value">
                  <Radio :label="option.value" v-for="option in options[fromItem.key]" :key="option.value" class="cell--label">{{ option.label }}</Radio>
                </RadioGroup>
                <!-- 有范围的输入框 -->
                <i-input v-if="['range_input'].includes(fromItem.type)" v-model="fromItem.value" type="number">
                  <Select v-model="fromItem.range_value" style="width:60px" slot="prepend">
                    <Option v-for="item in options_range" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </i-input>
              </div>
            </div>
          </div>
          <!-- 底部按钮 -->
          <div class="itv-flex--sb mt24 form-filter__footer">
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
import { PACKAGES_OPTIONS, API_PACKAGES_OPTIONS } from '../../libs/consts'

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
    const OPTIONS_YES_NO2 = [
      { label: '不限', value: '*' },
      { label: '是', value: '1' },
      { label: '否', value: '0' }
    ]
    const OPTIONS_YES_NO = [
      { label: '不限', value: '*' },
      { label: '开启', value: '1' },
      { label: '未开启', value: '0' }
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
          {
            groupName: '时间',
            list: [
              { value: '*', label: '创建时间' },
              { value: 'last_login_time', label: '最近登录时间' }
            ]
          },
          {
            groupName: '协作空间数量',
            list: [
              { value: 'n_created_workspaces', label: '创建的协作空间数量', labelShort: '创建的' },
              { value: 'n_joined_workspaces', label: '加入的协作空间数量', labelShort: '加入的' }
            ]
          },
          {
            groupName: '创建的链接数量',
            list: [
              { value: 'n_links_today', label: '今日创建的链接数量', labelShort: '今日' },
              { value: 'n_links', label: '创建的链接数量', labelShort: '累计' },
              { value: 'n_normal_links', label: '创建的普通跳转链接数量', labelShort: '普通跳转' },
              { value: 'n_random_links', label: '创建的随机跳转链接数量', labelShort: '随机跳转' },
              { value: 'n_cdm_links', label: '创建的自定义域名链接数量', labelShort: '自定义域名' },
              { value: 'n_api_links', label: '开放API创建的链接数量', labelShort: '开放API' },
              { value: 'n_nonapi_links', label: '非开放API创建的链接数量', labelShort: '非开放API' }
            ]
          },
          {
            groupName: '创建的链接的访问次数',
            list: [
              { value: 'pv', label: '创建的链接的访问次数', labelShort: '累计' },
              { value: 'pv_today', label: '创建的链接的今日访问次数', labelShort: '今日' }
            ]
          }
        ],
        package: [{ value: '*', label: '不限' }, ...PACKAGES_OPTIONS],
        api_package: [{ value: '*', label: '不限' }, ...API_PACKAGES_OPTIONS],
        // 是否可用
        enabled: OPTIONS_YES_NO2,
        // 是否已激活
        active: OPTIONS_YES_NO2,
        // 是否开启API
        open_api: OPTIONS_YES_NO,
        // 是否开启事件推送
        open_webhook: OPTIONS_YES_NO,
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
          name: '列表排序方式（按选项倒序）',
          shortName: '列表排序',
          key: 'order_by',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select_group'
        },
        {
          name: '套餐',
          key: 'package',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: 'API套餐',
          key: 'api_package',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: '最近登录时间距今的天数',
          shortName: '最近登录时间',
          key: 'last_login_date',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '激活时间距今的天数',
          shortName: '激活时间',
          key: 'active_date',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '过去30天登录天数',
          shortName: '登录天数',
          key: 'login_30',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '过去30天创建链接数',
          shortName: '创建链接数',
          key: 'link_30',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '过去30天数据报表页分享次数',
          shortName: '数据报表页分享次',
          key: 'share_30',
          valueCaclType: 'calcRangeInput',
          type: 'range_input',
          value: '',
          range_value: '*'
        },
        {
          name: '是否可用',
          shortName: '登录权限',
          key: 'enabled',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '是否已激活',
          shortName: '已激活',
          key: 'active',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '是否开启API',
          shortName: 'API',
          key: 'open_api',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '是否开启事件推送',
          shortName: '事件推送',
          key: 'open_webhook',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '是否开启协作空间',
          shortName: '协作空间',
          key: 'open_workspace',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启微信内追踪访问记录',
          shortName: '微信内追踪访问记录',
          key: 'open_wx_trace',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启微信内分享卡片',
          shortName: '微信内分享卡片',
          key: 'open_wx_share',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启微信内强制浏览器打开',
          shortName: '微信内强制浏览器打开',
          key: 'open_wx_escape',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启跳转抖音APP',
          shortName: '跳转抖音APP',
          key: 'open_douyin_app',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'radio'
        },
        {
          name: '开启跳转淘宝APP',
          shortName: '跳转淘宝APP',
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
    cursor: default;
  }
  .row-value {
    flex: 1;
  }
  .form-filter__cnt {
    max-height: 70vh;
    padding-right: 20px;
    padding-bottom: 32px;
    overflow-y: auto;
  }
  .form-filter__footer {
    position: relative;
    &::before {
      content: '';
      width: 540px;
      height: 1px;
      position: absolute;
      background: @border-color-split;
      top: -24px;
      left: -16px;
    }
  }
  .cell--label {
    min-width: 50px;
  }
}
.ivu-select-dropdown {
  max-height: 300px;
}
</style>
