/* 确认对话框 */ /* TODO */
<template>
  <div>
    <Modal
      class="sure-modal"
      v-model="modal.show"
      :title="titleMap[modal.type]"
      :mask-closable="false"
    >
      <!-- 修改套餐到期日 -->
      <div v-show="modal.type === 'package'">
        <!-- 域名列表 -->
        <div class="mb24">
          <span class="itv-title--14 mr16 mb8 label">
            原先套餐到期日：
          </span>
          <span>
            {{ form_package._date }}
          </span>
        </div>
        <!-- 每日创建短链接上限 -->
        <div class="itv-flex--fs" style="height: 32px;">
          <p class="mr16 itv-title--14 label">增加：</p>
          <div class="itv-flex--fs">
            <Input
              type="number"
              v-model="form_package._count"
              style="width: 100px"
              class="mr16"
            />
          </div>
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
      form_package: {
        _date: '',
        _count: 0
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
        this.form_package['_date'] = '2021-04-02'
        this.form_package['_count'] = this.modal.obj.n_qrcodes
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
    async doChangePackage() {
      console.log('doChangePackage')
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
    width: 120px;
    text-align: right;
    display: inline-block;
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
