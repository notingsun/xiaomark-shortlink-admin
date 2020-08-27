/* 对话框.套餐 */
<template>
  <div>
    <Modal class="plan-modal" v-model="modal.show" :title="titleMap[modal.type]" :mask-closable="false" :width="640">
      <!-- 修改渠道码套餐到期日 -->
      <div v-if="modal.type === 'package'">
        <div class="row">
          <span class="itv-title--14 mr16 mb8 label">
            套餐：
          </span>
          <Select v-model="form_package.package" class="value" size="large">
            <Option v-for="item in options.package" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
          <span class="value--old" title="原本的值">{{ package_map[form_package.old_package] || '-' }}</span>
        </div>
        <div class="row">
          <span class="itv-title--14 mr16 mb8 label">
            套餐到期日：
          </span>
          <DatePicker size="large" class="value" type="date" placeholder="请选择" v-model="form_package.expire_date" :options="options.shortcuts_combo"></DatePicker>
          <span class="value--old" title="原本的值">{{ form_package.old_expire_date }}</span>
        </div>
      </div>

      <!-- 修改推送套餐 -->
      <div v-if="modal.type === 'package2'" class="content">
        <div class="row">
          <span class="itv-title--14 mr16 mb8 label">
            套餐：
          </span>
          <Select v-model="form_package2.api_package" class="value" size="large" @on-change="handleCanSetPackage2DataByPackage">
            <Option v-for="item in options.api_package" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
          <span class="value--old" title="原本的值">{{ package2_map[form_package2.old_api_package] || '-' }}</span>
        </div>
        <div class="row">
          <span class="itv-title--14 mr16 mb8 label">
            套餐到期日：
          </span>
          <DatePicker size="large" class="value" type="date" placeholder="请选择" v-model="form_package2.expire_date" :options="options.shortcuts_combo"></DatePicker>
          <span class="value--old" title="原本的值">{{ form_package2.old_expire_date }}</span>
        </div>
        <div class="row">
          <span class="itv-title--14 mr16 mb8 label">
            自定义 API 套餐：
          </span>
          <RadioGroup v-model="form_package2.setPackage2Data" class="value" @on-change="handleCanSetPackage2Data">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </div>
        <!-- 自定义 API 套餐 -->
        <div :class="[disabledPackage2Data ? 'disabledPackage2Data' : '']">
          <div class="row">
            <span class="itv-title--14 mr16 mb8 label">
              每日创建链接数上限：
            </span>
            <div class="value">
              <Input :disabled="disabledPackage2Data" type="number" v-model="form_package2.max_links_daily" size="large" />
              <div class="itv-text--grey4">0表示不限</div>
            </div>
            <span class="value--old" title="原本的值">{{ form_package2.old_max_links_daily }}</span>
          </div>
          <div class="row">
            <span class="itv-title--14 mr16 mb8 label">
              网站白名单数上限：
            </span>
            <div class="value">
              <Input :disabled="disabledPackage2Data" type="number" v-model="form_package2.max_whitelists" size="large" />
              <div class="itv-text--grey4">0表示不限</div>
            </div>
            <span class="value--old" title="原本的值">{{ form_package2.old_max_whitelists }}</span>
          </div>
          <div class="row" v-for="item in api_package_form_radios" :key="item.key">
            <span class="itv-title--14 mr16 mb8 label">{{ item.name }}：</span>
            <RadioGroup v-model="form_package2[item.key]" class="value">
              <Radio :disabled="disabledPackage2Data" label="1">可以</Radio>
              <Radio :disabled="disabledPackage2Data" label="0">不可以</Radio>
            </RadioGroup>
            <span class="value--old" title="原本的值">{{ form_package2[`old_${item.key}`] === '1' ? '可以' : '不可以' }}</span>
          </div>
        </div>
      </div>

      <!-- 按钮.取消/确认 -->
      <template slot="footer">
        <div class="itv-flex--fe">
          <Button type="text" class="mr16" @click="modal.show = false">取消</Button>
          <Button type="primary" @click="handleModal" :loading="loading">确认</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { PACKAGES_OPTIONS, API_PACKAGES_OPTIONS } from '../../libs/consts'
import moment from 'moment'

export default {
  name: 'SureModal',
  mixins: [],
  props: {},
  components: {},
  data() {
    this.titleMap = {
      package: '修改套餐',
      package2: '修改 API 套餐'
    }
    this.api_package_form_radios = [
      {
        name: '编辑链接 API',
        key: 'edit'
      },
      {
        name: '查询访问数据 API',
        key: 'stats'
      },
      {
        name: '查询访问记录 API',
        key: 'record'
      },
      {
        name: '获取数据报表',
        key: 'report'
      },
      {
        name: '开启事件推送',
        key: 'webhook'
      },
      {
        name: '自定义数据报表',
        key: 'customize'
      }
    ]

    return {
      loading: false,
      // 修改套餐
      form_package: {
        old_expire_date: '',
        old_package: '',
        expire_date: '',
        package: ''
      },
      // 修改api套餐
      form_package2: {
        setPackage2Data: '0',
        old_expire_date: '',
        old_api_package: '',
        old_max_links_daily: '',
        old_max_whitelists: '',
        old_edit: '0',
        old_stats: '0',
        old_record: '0',
        old_report: '0',
        old_webhook: '0',
        old_customize: '0',
        expire_date: '',
        api_package: '',
        max_links_daily: '', // 每日创建链接数上限，0表示不限
        max_whitelists: '', // 网站白名单数上限，0表示不限
        edit: '0', // 是否可以调用编辑链接API
        stats: '0', // 是否可以调用查询访问数据API
        record: '0', // 是否可以调用查询访问记录API
        report: '0', // 是否可以获取数据报表
        webhook: '0', // 是否可以开启事件推送
        customize: '0' // 是否可以自定义数据报表
      },
      // 下拉框的选项
      options: {
        // 套餐
        package: PACKAGES_OPTIONS,
        // api 套餐
        api_package: API_PACKAGES_OPTIONS,
        // 套餐到期日快捷选择
        shortcuts_combo: {
          shortcuts: [
            {
              text: '7天后',
              value() {
                return new Date(Date.now() + 86400000 * 7)
              }
            },
            {
              text: '30天后',
              value() {
                return new Date(Date.now() + 86400000 * 30)
              }
            },
            {
              text: '90天后',
              value() {
                return new Date(Date.now() + 86400000 * 90)
              }
            },
            {
              text: '365天后',
              value() {
                return new Date(Date.now() + 86400000 * 365)
              }
            }
          ]
        }
      },
      disabledPackage2Data: false
    }
  },
  computed: {
    modal() {
      return this.$bus.modal3
    },
    package_map() {
      let res = {}

      this.options.package.forEach((item) => {
        res[item.value] = item.label
      })
      return res
    },
    package2_map() {
      let res = {}

      this.options.api_package.forEach((item) => {
        res[item.value] = item.label
      })
      return res
    }
  },
  created() {},
  mounted() {},
  watch: {
    // 重置表单
    'modal.show'(v) {
      if (!v) {
        setTimeout(() => {
          this.form = this.$options.data().form
        }, 300)
      } else if (v && this.modal.type === 'package') {
        // 初始化.修改套餐到期日
        this.form_package['old_expire_date'] = this.modal.obj.package_expire_date || '-'
        this.form_package['expire_date'] = this.modal.obj.package_expire_date || null
        this.form_package['package'] = this.modal.obj.package || 'free'
        this.form_package['old_package'] = this.modal.obj.package || 'free'
      } else if (v && this.modal.type === 'package2') {
        // 初始化.修改套餐到期日
        const obj = this.modal.obj || {}
        const api_package_info = obj.api_package_info || {}

        this.form_package2['old_expire_date'] = obj.api_package_expire_date || '-'
        this.form_package2['expire_date'] = obj.api_package_expire_date || null

        this.form_package2['api_package'] = obj.api_package || 'free'
        this.form_package2['setPackage2Data'] = obj.api_package === 'custom' ? '1' : '0'
        this.disabledPackage2Data = obj.api_package !== 'custom'
        this.form_package2['old_api_package'] = obj.api_package || 'free'

        this.form_package2['max_links_daily'] = api_package_info.max_links_daily || 0
        this.form_package2['old_max_links_daily'] = api_package_info.max_links_daily || 0

        this.form_package2['max_whitelists'] = api_package_info.max_whitelists || 0
        this.form_package2['old_max_whitelists'] = api_package_info.max_whitelists || 0

        this.form_package2['edit'] = api_package_info.edit ? '1' : '0'
        this.form_package2['old_edit'] = api_package_info.edit ? '1' : '0'

        this.form_package2['stats'] = api_package_info.stats ? '1' : '0'
        this.form_package2['old_stats'] = api_package_info.stats ? '1' : '0'

        this.form_package2['record'] = api_package_info.record ? '1' : '0'
        this.form_package2['old_record'] = api_package_info.record ? '1' : '0'

        this.form_package2['report'] = api_package_info.report ? '1' : '0'
        this.form_package2['old_report'] = api_package_info.report ? '1' : '0'

        this.form_package2['webhook'] = api_package_info.webhook ? '1' : '0'
        this.form_package2['old_webhook'] = api_package_info.webhook ? '1' : '0'

        this.form_package2['customize'] = api_package_info.customize ? '1' : '0'
        this.form_package2['old_customize'] = api_package_info.customize ? '1' : '0'
      }
    }
  },
  methods: {
    // 确认对话框
    async handleModal() {
      if (!this.loading) {
        const type = this.modal.type

        this.loading = true
        /* eslint-disable */
      type === 'package' && await this.doChangePackage()
      type === 'package2' && await this.doChangePackage2()
        /* eslint-enable */
        this.loading = false
      }
    },
    // 修改套餐
    async doChangePackage() {
      if (this.form_package.package !== 'free' && !this.form_package.expire_date) {
        return this.$Message.error('请选择时间')
      }
      try {
        await this.$api.User.putUserPackage(this.modal.obj.id, {
          expire_date: moment(this.form_package.expire_date).format('YYYY-MM-DD'),
          package: this.form_package.package
        })
        this.$Message.success('修改成功')
        this.$bus.modal3.show = false
        this.modal.success_cb()
      } catch (e) {
        console.error(e)
      }
    },
    // 修改API套餐
    async doChangePackage2() {
      if (this.form_package2.api_package !== 'free' && !this.form_package2.expire_date) {
        return this.$Message.error('请选择时间')
      }
      console.log('修改API套餐')

      try {
        await this.$api.User.putUserApiPackage(this.modal.obj.id, {
          expire_date: moment(this.form_package2.expire_date).format('YYYY-MM-DD'),
          api_package: this.form_package2.api_package
        })
        if (this.form_package2.setPackage2Data) {
          await this.$api.User.putUserApiPackageData(this.modal.obj.id, {
            max_links_daily: this.form_package2.max_links_daily - 0,
            max_whitelists: this.form_package2.max_whitelists - 0,
            edit: this.form_package2.edit === '1',
            stats: this.form_package2.stats === '1',
            record: this.form_package2.record === '1',
            report: this.form_package2.report === '1',
            webhook: this.form_package2.webhook === '1',
            customize: this.form_package2.customize === '1'
          })
        }
        this.$Message.success('修改成功')
        this.$bus.modal3.show = false
        this.modal.success_cb()
      } catch (e) {
        console.error(e)
      }
    },
    // 禁用设置api套餐内容表单的逻辑
    handleCanSetPackage2DataByPackage() {
      if (this.form_package2.api_package === 'custom') {
        this.form_package2.setPackage2Data = '1'
        this.disabledPackage2Data = false
      } else {
        this.form_package2.setPackage2Data = '0'
        this.disabledPackage2Data = true
      }
    },
    handleCanSetPackage2Data() {
      this.disabledPackage2Data = this.form_package2.setPackage2Data === '0'
    }
  }
}
</script>

<style lang="less">
.plan-modal {
  .disabledPackage2Data .row .label {
    color: #ccc;
  }
  .itv-title--14 {
    margin-bottom: 0;
  }
  span {
    font-size: 14px;
  }
  .value {
    width: 280px;
    line-height: 36px;
  }
  .value--old {
    margin-left: 16px;
    line-height: 36px;
    color: #afafaf;
  }
  .text_one_line {
    width: 360px;
    font-size: 14px;
  }
  .row {
    display: flex;
    font-size: 14px;
    margin-bottom: 20px;
    .label {
      flex: none;
      font-weight: bold;
      width: 150px;
      padding-right: 10px;
      box-sizing: border-box;
      flex-shrink: 0;
      text-align: right;
      display: inline-block;
      line-height: 36px;
    }
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .content {
    max-height: 50vh;
    overflow-y: auto;
  }
}
</style>
