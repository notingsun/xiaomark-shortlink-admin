/* 确认对话框 */
<template>
  <div>
    <Modal
      class="sure-modal"
      v-model="modal.show"
      :title="titleMap[modal.type]"
      :mask-closable="false"
    >
      <!-- 修改套餐到期日 -->
      <div v-if="modal.type === 'package'">
        <div class="mb24">
          <span class="itv-title--14 mr16 mb8 label">
            原套餐：
          </span>
          <span>{{ combo_map[form_package._combo] || '-' }}</span>
        </div>
        <div class="mb24">
          <span class="itv-title--14 mr16 mb8 label">
            原套餐到期日：
          </span>
          <span>{{ form_package._stop_date }}</span>
        </div>

        <div class="mb24">
          <span class="itv-title--14 mr16 mb8 label">
            套餐：
          </span>
          <Select v-model="form_package.combo" class="value" size="large">
            <Option
              v-for="item in options.combo"
              :value="item.value"
              :key="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="mb24">
          <span class="itv-title--14 mr16 mb8 label">
            套餐到期日：
          </span>
          <DatePicker
            size="large"
            class="value"
            type="date"
            placeholder="请选择"
            v-model="form_package.stop_date"
            :options="options.shortcuts_combo"
          ></DatePicker>
        </div>
      </div>

      <!-- 按钮.取消/确认 -->
      <template slot="footer">
        <div class="itv-flex--fe" v-show="show_footer">
          <Button type="text" class="mr16" @click="modal.show = false"
            >取消</Button
          >
          <Button type="primary" @click="handleModal" :loading="loading"
            >确认</Button
          >
        </div>
      </template>
    </Modal>
    <itv-model-img v-model="img_model.show" :imgModelUrl="img_model.url" />
  </div>
</template>

<script>
export default {
  name: 'SureModal',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      img_model: {
        show: false,
        url: ''
      },
      loading: false,
      is_change: {
        package: false
      },
      titleMap: {
        package: '修改套餐到期日'
      },
      // 修改套餐
      form_package: {
        _stop_date: '',
        _combo: '',
        stop_date: '',
        combo: ''
      },
      // 下拉框的选项
      options: {
        // 套餐
        combo: [
          { value: 0, label: '免费版' },
          { value: 1, label: '入门版' },
          { value: 2, label: '专业版' }
        ],
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
      }
    }
  },
  computed: {
    modal() {
      return this.$bus.modal2
    },
    show_footer() {
      const arr_no_show = []

      return !arr_no_show.includes(this.modal.type)
    },
    combo_map() {
      let res = {}

      this.options.combo.forEach((item) => {
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
        this.form_package['_stop_date'] = this.modal.obj.stop_date || '-'
        this.form_package['stop_date'] = this.modal.obj.stop_date || new Date()
        this.form_package['combo'] = this.modal.obj.combo || 0
        this.form_package['_combo'] = this.modal.obj.combo || 0
      }
    }
  },
  methods: {
    // 确认对话框
    async handleModal() {
      const type = this.modal.type

      this.loading = true

      /* eslint-disable */
      type === 'package' && await this.doChangePackage()
      /* eslint-enable */

      this.loading = false
    },
    // 修改公众号套餐
    async doChangePackage() {
      try {
        await this.$api.Qr.putPackage(this.modal.obj.id, {
          stop_date: this.$PDo.Date.format(
            (this.form_package.stop_date || new Date()).toJSON(),
            'y-m-d'
          ),
          combo: this.form_package.combo
        })
        this.$Message.success('修改成功')
        this.$bus.modal2.show = false
        this.modal.success_cb()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="less">
.sure-modal {
  span {
    font-size: 14px;
  }
  .label {
    width: 110px;
    text-align: right;
    display: inline-block;
  }
  .value {
    width: 280px;
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
      font-weight: bold;
      width: 100px;
      padding-right: 10px;
      box-sizing: border-box;
      flex-shrink: 0;
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
}
</style>
