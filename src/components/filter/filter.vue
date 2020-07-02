/* 列表的下拉筛选 */
<template>
  <div class="itv-filter">
    <Dropdown trigger="custom" :visible="show_drawer" placement="bottom-end" @on-clickoutside="handleClickoutside">
      <Button class="" @click="show_drawer = true" style="width: 90px;" :loading="loading">筛选</Button>
      <DropdownMenu slot="list">
        <div class="form-filter">
          <!-- 筛选表单 -->
          <div v-for="(fromItem, i) in form_filter" :key="i">
            <div class="itv-flex--fs mb8" v-if="typeof fromItem.noShow !== 'function' || !fromItem.noShow()">
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
  name: 'ItvFilter',
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
    this.start_form_filter = null

    // 是否显示下拉框（共用）
    const calcNoShow = (v) => {
      return () => {
        const keyIndex = this.form_filter_map['genre'].index

        return this.form_filter[keyIndex].value !== v
      }
    }
    // 值的处理（公用）
    const calcValueCacl = (v, key) => {
      return (res) => {
        const isSelect = this.form_filter[1].value === v
        const keyIndex = this.form_filter_map[key].index

        let value = this.form_filter[keyIndex].value

        value === '*' && (value = '')
        res[key] = isSelect ? value : ''
      }
    }

    return {
      show_drawer: false,
      options: {
        // 列表排序方式
        genre: [
          { value: '*', label: '不限' },
          { value: '0', label: '打包' },
          { value: '1', label: '渠道码' },
          { value: '2', label: '推送' },
          { value: '3', label: '自动回复' },
          { value: '4', label: '菜单' }
        ],
        combo: [
          { value: '*', label: '不限' },
          { value: '0', label: '免费版' },
          { value: '1', label: '入门版' },
          { value: '2', label: '专业版' }
        ],
        meal: [
          { value: '*', label: '不限' },
          { value: '1', label: '单次' },
          { value: '2', label: '包年' }
        ],
        revert: [
          { value: '*', label: '不限' },
          { value: '0', label: '免费版' },
          { value: '1', label: '包年版' }
        ],
        menu: [
          { value: '*', label: '不限' },
          { value: '0', label: '免费版' },
          { value: '1', label: '包年版' }
        ],
        result: [
          { value: '*', label: '不限' },
          { value: 'NOTPAY', label: '未支付' },
          { value: 'SUCCESS', label: '支付成功' },
          { value: 'PAYERROR', label: '支付失败' }
        ]
      },
      form_filter: [
        /*
          name: 筛选项的名称
          key: 筛选项对应的键名
          value: 筛选项的值
          type: 筛选项的表单类型 (selectMultiple 多选,select单选)
          valueCaclType: 提取值时，处理方式 （calcSpecialValue 需要处理不限, calcArr 将多选的值拼接, calcDefault 不处理, calcPlugin 插件特殊处理)
          备注： calcPlugin 可以变成自由的形式，函数
         */
        {
          name: '支付结果',
          key: 'result',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: '套餐分类',
          key: 'genre',
          valueCaclType: 'calcSpecialValue',
          value: '*',
          type: 'select'
        },
        {
          name: '渠道码套餐',
          key: 'combo',
          valueCaclType: calcValueCacl('1', 'combo'),
          value: '*',
          noShow: calcNoShow('1'),
          type: 'select'
        },
        {
          name: '推送套餐',
          key: 'meal',
          valueCaclType: calcValueCacl('2', 'meal'),
          value: '*',
          noShow: calcNoShow('2'),
          type: 'select'
        },
        {
          name: '自动回复套餐',
          key: 'revert',
          valueCaclType: calcValueCacl('3', 'revert'),
          value: '*',
          noShow: calcNoShow('3'),
          type: 'select'
        },
        {
          name: '菜单套餐',
          key: 'menu',
          valueCaclType: calcValueCacl('4', 'menu'),
          value: '*',
          noShow: calcNoShow('4'),
          type: 'select'
        }
      ]
    }
  },
  computed: {
    form_filter_map() {
      let res = {}

      this.form_filter.forEach((item, index) => {
        res[item.key] = {
          index,
          name: item.name,
          key: item.key
        }
      })

      return res
    }
  },
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
        this.start_form_filter = this.copyArr(this.form_filter)
      }
    }
  },
  methods: {
    // 拷贝子元素是对象，且对象中包含值为function类型的数组
    copyArr(arr) {
      let res = []

      arr.forEach((item) => {
        let new_item = {}

        Object.keys(item).forEach((key) => {
          new_item[key] = item[key]
        })
        res.push(new_item)
      })
      return res
    },
    // 重置筛选
    handleFilterReset() {
      this.form_filter = this.$options.data.apply(this).form_filter
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

        if (typeof t === 'function') {
          t(res)
        } else if (t === 'calcSpecialValue') {
          res[formItem.key] = v === '*' ? '' : v
        } else if (t === 'calcArr') {
          const isSelectAll = (this.options[formItem.key] || []).length === v.length

          // 全部选中表示不限，传给后端空，提高查询效率
          res[formItem.key] = isSelectAll ? '' : v.join(',')
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
      this.form_filter = this.copyArr(this.start_form_filter)
      this.show_drawer = false
    }
  }
}
</script>

<style lang="less">
// .itv-filter {
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
