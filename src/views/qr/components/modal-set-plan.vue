/* 设置套餐 */
<template>
  <Modal v-model="dialog.show" :width="600" title="修改套餐" class="itv-modal modal-set-plan" footer-hide>
    <div class="row">
      <div class="row-label">公众号</div>
      <div class="row-value">
        <div class="itv-flex--fs">
          <img :src="info.head_img" class="img--headimgurl mr8" />
          <Tooltip :content="info.nick_name" placement="top" transfer class="df">
            <div class="text--oneRow" style="width: '120px'">{{ info.nick_name }}</div>
          </Tooltip>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row-label">套餐</div>
      <div class="row-value">
        <Select v-model="form.bale">
          <Option v-for="option in options.bale" :value="option.value" :key="option.value">
            {{ option.label }}
          </Option>
        </Select>
      </div>
      <div title="原本的值" class="row-value2">{{ info.bale_name }}</div>
    </div>
    <!-- 打包套餐显示 -->
    <div class="row" v-show="form.bale === '1'">
      <div class="row-label">到期日</div>
      <div class="row-value">
        <DatePicker size="large" class="value" type="date" placeholder="请选择" v-model="form.bale_date" :options="options_date"></DatePicker>
      </div>
      <div title="原本的值" class="row-value2">{{ info.bale_date }}</div>
    </div>
    <div v-show="form.bale === '0'">
      <!-- 渠道码 -->
      <div class="row__title">渠道码</div>
      <div class="row">
        <div class="row-label">套餐</div>
        <div class="row-value">
          <Select v-model="form.combo">
            <Option v-for="option in options.combo" :value="option.value" :key="option.value">
              {{ option.label }}
            </Option>
          </Select>
        </div>
        <div title="原本的值" class="row-value2">{{ info.combo_name }}</div>
      </div>
      <div class="row" v-show="form.combo !== '0'">
        <div class="row-label">到期日</div>
        <div class="row-value">
          <DatePicker size="large" class="value" type="date" placeholder="请选择" v-model="form.combo_date" :options="options_date"></DatePicker>
        </div>
        <div title="原本的值" class="row-value2">{{ info.combo_date }}</div>
      </div>
      <!-- 推送套餐 -->
      <div class="row__title">推送</div>
      <div class="row">
        <div class="row-label">套餐</div>
        <div class="row-value">
          <Select v-model="form.meal">
            <Option v-for="option in options.meal" :value="option.value" :key="option.value">
              {{ option.label }}
            </Option>
          </Select>
        </div>
        <div title="原本的值" class="row-value2">{{ info.meal_name }}</div>
      </div>
      <div class="row" v-show="form.meal === '2'">
        <div class="row-label">到期日</div>
        <div class="row-value">
          <DatePicker size="large" class="value" type="date" placeholder="请选择" v-model="form.meal_date" :options="options_date"></DatePicker>
        </div>
        <div title="原本的值" class="row-value2">{{ info.meal_date }}</div>
      </div>
      <div class="row" v-show="form.meal === '1'">
        <div class="row-label">可用条数</div>
        <div class="row-value">
          <Input type="number" v-model="form.meal_count" class="value" size="large" />
        </div>
        <div title="原本的值" class="row-value2">{{ info.meal_count }}</div>
      </div>
      <!-- 自动回复 -->
      <div class="row__title">自动回复</div>
      <div class="row">
        <div class="row-label">套餐</div>
        <div class="row-value">
          <Select v-model="form.revert">
            <Option v-for="option in options.revert" :value="option.value" :key="option.value">
              {{ option.label }}
            </Option>
          </Select>
        </div>
        <div title="原本的值" class="row-value2">{{ info.revert_name }}</div>
      </div>
      <div class="row" v-show="form.revert !== '0'">
        <div class="row-label">到期日</div>
        <div class="row-value">
          <DatePicker size="large" class="value" type="date" placeholder="请选择" v-model="form.revert_date" :options="options_date"></DatePicker>
        </div>
        <div title="原本的值" class="row-value2">{{ info.options_date }}</div>
      </div>
      <!-- 个性化菜单栏 -->
      <div class="row__title">个性化菜单栏</div>
      <div class="row">
        <div class="row-label">套餐</div>
        <div class="row-value">
          <Select v-model="form.menu">
            <Option v-for="option in options.menu" :value="option.value" :key="option.value">
              {{ option.label }}
            </Option>
          </Select>
        </div>
        <div title="原本的值" class="row-value2">{{ info.menu_name }}</div>
      </div>
      <div class="row" v-show="form.menu !== '0'">
        <div class="row-label">到期日</div>
        <div class="row-value">
          <DatePicker size="large" class="value" type="date" placeholder="请选择" v-model="form.menu_date" :options="options_date"></DatePicker>
        </div>
        <div title="原本的值" class="row-value2">{{ info.menu_date }}</div>
      </div>
    </div>

    <div class="itv-flex--fe mt40 mb16">
      <Button class="mr16" @click="dialog.show = false">取消</Button>
      <Button type="primary" :loading="isSubmitting" @click="handleSubmit">确认</Button>
    </div>
  </Modal>
</template>

<script>
import { ORDER_OPTIONS_MAP } from './common-data'
import moment from 'moment'

export default {
  name: 'ModalSetPlan',
  props: {
    // 是否显示
    value: {
      type: Boolean,
      required: true
    },
    // 显示的数据
    data: {
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    this.options = ORDER_OPTIONS_MAP
    return {
      // 正在提交
      isSubmitting: false,
      // 原始数据
      info: {},
      // 表单重的数据
      form: {
        bale_name: '',
        combo_name: '',
        meal_name: '',
        revert_name: '',
        menu_name: '',
        bale: '',
        bale_date: '',
        combo: 0,
        combo_date: '',
        meal: 1,
        meal_date: '',
        meal_count: 0,
        revert: 0,
        revert_date: '',
        menu: 0,
        menu_date: ''
      },
      // 对话框配置信息
      dialog: {
        show: false
      },
      // 时间选择器快速选择
      options_date: {
        shortcuts: [
          {
            text: '7天后',
            value() {
              return new Date(Date.now() + 86400000 * 7)
            }
          },
          {
            text: '366天后',
            value() {
              return new Date(Date.now() + 86400000 * 366)
            }
          }
        ]
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    // 保持显示框的值一致
    value(v) {
      if (this.dialog.show !== v) {
        this.dialog.show = v
      }
      if (v) {
        this.initDialog()
      }
    },
    'dialog.show'(v) {
      if (this.value !== v) {
        this.$emit('input', v)
        this.$emit('success_cb')
      }
    }
  },
  methods: {
    // 初始化对话框
    initDialog() {
      this.info = Object.assign({}, this.data)
      this.form = Object.assign({}, this.info)

      const date_after_one_year = new Date(moment().add(1, 'y'))

      // 备注：用于选择包年版时，快速选择一年
      this.info.revert === '0' && (this.form.revert_date = date_after_one_year)
      this.info.menu === '0' && (this.form.menu_date = date_after_one_year)
      this.info.meal === '1' && (this.form.meal_date = date_after_one_year)
    },

    // 点击了提交
    handleSubmit() {
      if (this.isSubmitting) {
        return
      }
      console.test('点击了提交')
      const form = this.calcFrom()

      if (form) {
        this.doSubmit(form)
      }
    },
    // 获取后端需要时间格式
    calcDate(v) {
      return v ? moment(v).format('YYYY-MM-DD') : ''
    },
    // 校验并获得表单内容
    calcFrom() {
      let err = ''

      let res = {}

      if (this.form.bale === '1') {
        const bale_date = this.calcDate(this.form.bale_date)

        err = !bale_date ? '请选择套餐到期日' : ''
        res.genre = 1
        // 打包版截止日期（打包时传）
        res.end_date = bale_date
      } else if (this.form.bale === '0') {
        const combo_date = this.calcDate(this.form.combo_date)
        const meal_date = this.calcDate(this.form.meal_date)
        const revert_date = this.calcDate(this.form.revert_date)
        const menu_date = this.calcDate(this.form.menu_date)

        console.log({
          combo_date,
          meal_date,
          revert_date,
          menu_date
        })

        err = this.form.combo !== '0' && !combo_date ? '请选择渠道码套餐到期日' : ''
        err = !err && this.form.meal === '2' && !meal_date ? '请选择推送套餐到期日' : ''
        err = !err && this.form.revert === '1' && !revert_date ? '请选择自动回复套餐到期日' : ''
        err = !err && this.form.menu === '1' && !menu_date ? '请选择菜单套餐到期日' : ''

        res.genre = 0
        // 渠道码截止日期（修改为入门版/专业版时必有 stop_date
        this.form.combo !== '0' && (res.stop_date = combo_date)
        res.combo = this.form.combo - 0
        // 推送 over_date
        this.form.meal === '2' && (res.over_date = meal_date)
        this.form.meal === '1' && (res.n_push = (this.form.meal_count || 0) - 0)
        res.meal = this.form.meal - 0
        // 自动回复套餐 late_date
        this.form.revert === '1' && (res.late_date = revert_date)
        res.revert = this.form.revert - 0
        // 菜单套餐 final_date
        this.form.menu === '1' && (res.final_date = menu_date)
        res.menu = this.form.menu - 0
      }

      if (err) {
        this.$Message.error(err)
      }

      return err ? false : res
    },
    // 提交订单
    async doSubmit(form) {
      this.isSubmitting = true

      try {
        await this.$api.Qr.putPackage(this.info.id, form)
        this.dialog.show = false
        setTimeout(() => {
          this.isSubmitting = false
          this.$Message.success('修改成功')
        }, 300)
      } catch (e) {
        console.error(e)
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style lang="less">
.modal-set-plan {
  /deep/.ivu-modal-body {
    font-size: 14px;
    word-break: break-all;
    max-height: 70vh;
    overflow-y: auto;
  }
  /deep/.ivu-date-picker {
    display: block;
  }
  .itv-text--14 {
    color: #303659;
  }
  .show-img {
    max-width: 120px;
    max-height: 120px;
    object-fit: contain;
  }
  .row__title {
    margin-top: 54px;
    margin-bottom: 24px;
    font-weight: bold;
    // padding-left: 16px;
    padding-left: 26px;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      width: 2px;
      top: 0;
      bottom: 0;
      left: 16px;
      background: @primary-color;
      display: block;
    }
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .row-label {
    width: 120px;
    padding-right: 12px;
    text-align: right;
    padding-right: 16px;
    flex-shrink: 0;
  }
  .row-value {
    flex: 1;
  }
  .row-value2 {
    width: 120px;
    flex-shrink: 0;
    margin-left: 16px;
    color: @btn-disable-color;
  }
}
</style>
