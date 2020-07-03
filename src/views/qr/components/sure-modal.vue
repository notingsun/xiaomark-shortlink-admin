/* 确认对话框 */
<template>
  <div>
    <Modal class="sure-modal" v-model="modal.show" :title="titleMap[modal.type]" :mask-closable="false">
      <!-- 登录用户 -->
      <p v-show="modal.type === 'login_user'">
        <span>确认使用</span>
        <span>【{{ (modal.obj || {}).nickname || '-' }}】</span>
        <span>
          的身份登录
          <b>小码渠道码</b>
          吗？
        </span>
        <br />
      </p>

      <!-- 按钮.取消/确认 -->
      <template slot="footer">
        <div class="itv-flex--fe" v-show="show_footer">
          <Button type="text" class="mr16" @click="modal.show = false">取消</Button>
          <Button type="primary" @click="handleModal" :loading="loading">确认</Button>
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
      titleMap: {
        login_user: '确认登录'
      },
      // 修改渠道码套餐
      form_package: {
        _stop_date: '',
        _combo: '',
        stop_date: '',
        combo: ''
      },
      // 修改推送套餐
      form_package2: {
        _over_date: '',
        _meal: '',
        _n_push: '',
        over_date: '',
        meal: '',
        n_push: ''
      },
      // 登录用户
      form_login_user: {
        token: ''
      },
      // 下拉框的选项
      options: {
        // 套餐
        combo: [
          { value: 0, label: '免费版' },
          { value: 1, label: '入门版' },
          { value: 2, label: '专业版' }
        ],
        // 套餐
        meal: [
          { value: 1, label: '单条' },
          { value: 2, label: '包年' }
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
    },
    meal_map() {
      let res = {}

      this.options.meal.forEach((item) => {
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
      } else if (v && this.modal.type === 'login_user') {
        // 初始化.获取用户token
        this.doGetUserToken()
      }
    }
  },
  methods: {
    // 确认对话框
    async handleModal() {
      const type = this.modal.type

      this.loading = true

      /* eslint-disable */
      type === 'login_user' && await this.handleUserLogin()
      /* eslint-enable */

      this.loading = false
    },

    // 获取用户的临时token
    async doGetUserToken() {
      try {
        const res = await this.$api.Qr.postUserToken(this.modal.obj.id)

        this.form_login_user.token = res.token
      } catch (e) {
        console.error(e)
      }
    },
    // 登录小码短链
    handleUserLogin() {
      const token = this.form_login_user.token

      if (token) {
        const hostname = window.location.hostname
        const info_map = {
          localhost: {
            url: 'http://localhost:8081',
            c_name: 'xiaomark-qr-dev',
            domain: 'localhost'
          },
          'admin-test.xiaomark.com': {
            url: 'http://test.xiaomark.com/beta',
            c_name: 'xiaomark-qr-stage',
            domain: 'xiaomark.com'
          },
          'admin.xiaomark.com': {
            url: 'https://xiaomark.com/beta',
            c_name: 'xiaomark-qr',
            domain: '.xiaomark.com'
          }
        }
        const info = info_map[hostname] || info_map.localhost || {}
        const { url, c_name, domain } = info

        console.log(`${encodeURIComponent(c_name)}=${encodeURIComponent(token)};domain=${domain}`)

        document.cookie = `${encodeURIComponent(c_name)}=${encodeURIComponent(token)};domain=${domain}`

        window.open(`${url}`, '_blank')
      } else {
        this.modal.show = false
        setTimeout(() => {
          this.$Message.success('token获取失败')
        }, 300)
      }
      this.modal.show = false
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
