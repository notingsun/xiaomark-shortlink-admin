/* 确认对话框 */
<template>
  <div>
    <Modal
      class="sure-modal"
      v-model="modal.show"
      :title="titleMap[modal.type]"
      :mask-closable="false"
    >
      <!-- 1、设置创建协作空间权限 -->
      <p v-show="modal.type === 'ws_creator'">
        <span>确认 </span>
        <span
          :style="{
            color: (modal.obj || {}).ws_creator ? 'red' : 'green',
            'font-weight': 'bold'
          }"
          >{{ (modal.obj || {}).ws_creator ? '关闭' : '开启' }}
        </span>
        <span>【{{ (modal.obj || {}).nickname || '-' }}】</span>
        <span>创建协作空间的权限吗？</span>
      </p>

      <!-- 2、设置用户登录权限 -->
      <p v-show="modal.type === 'enabled'">
        <span>确认 </span>
        <span
          :style="{
            color: (modal.obj || {}).enabled ? 'red' : 'green',
            'font-weight': 'bold'
          }"
          >{{ (modal.obj || {}).enabled ? '不允许' : '允许' }}
        </span>
        <span>【{{ (modal.obj || {}).nickname || '-' }}】</span>
        <span>登录吗？</span>
      </p>

      <!-- 3、设置短链是否可用 -->
      <p v-show="modal.type === 'enabled_short_link'">
        <span>确认 </span>
        <span
          :style="{
            color: (modal.obj || {}).enabled ? 'red' : 'green',
            'font-weight': 'bold'
          }"
          >{{ (modal.obj || {}).enabled ? '禁用' : '启用' }}
        </span>
        <span>【{{ (modal.obj || {}).name || '-' }}】</span>
        <span>吗？</span>
      </p>

      <!-- 4、设置网站是否可用 -->
      <div v-show="modal.type === 'enabled_target_link'">
        <p class="mb16">
          <span>确认 </span>
          <span
            :style="{
              color: (modal.obj || {}).enabled ? 'red' : 'green',
              'font-weight': 'bold'
            }"
            >{{ (modal.obj || {}).enabled ? '禁用' : '启用' }}
          </span>
          <span>【{{ (modal.obj || {}).hostname || '-' }}】</span>
          <span>吗？</span>
        </p>
        <Checkbox v-model="form.enabled_target_link.recursive" size="large"
          >设置相关联的链接</Checkbox
        >
      </div>

      <!-- 5、屏蔽API域名 -->
      <div v-show="modal.type === 'stop_api_domain'">
        <p class="mb16">
          屏蔽后该域名会从当前列表消失，确认屏蔽【{{
            (modal.obj || {}).netloc || '-'
          }}】吗？
        </p>
        <Checkbox v-model="form.stop_api_domain.recursive" size="large"
          >设置相关联的链接</Checkbox
        >
      </div>

      <!-- 6、设置API权限 -->
      <div v-show="modal.type === 'open_api_domain'">
        <!-- 用户 -->
        <div class="table-cell__nickname mb24">
          <img
            :src="(modal.obj || {}).headimgurl"
            class="img--headimgurl mr8"
          />
          <div class="itv-div__text--nowrap text_one_line">
            {{ (modal.obj || {}).nickname }}
          </div>
        </div>
        <!-- 开关 -->
        <div class="itv-flex--fs mb24">
          <p class="mr16 itv-title--16">API 权限</p>
          <i-switch
            :loading="is_change.open_api_domain"
            v-model="form.open_api_domain._switch"
            :before-change="handleOpenApi"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </div>
        <!-- 域名列表 -->
        <div class="mb24">
          <p class="mr16 itv-title--16 mb8">域名列表</p>
          <p v-for="(item, index) in form.open_api_domain._list" :key="index">
            {{ item }}
          </p>
          <p v-show="form.open_api_domain._list.length === 0">无</p>
        </div>
        <!-- 每日创建短链接上限 -->
        <div class="itv-flex--fs" style="height: 32px;">
          <p class="mr16 itv-title--16">每日创建短链接上限：</p>
          <div class="itv-flex--fs" v-show="!form.open_api_domain.isEditing">
            <p class="mr32">
              {{ form.open_api_domain._count_default }}
            </p>
            <itv-icon
              title="编辑"
              type="i-edit"
              class="mr16 "
              size="18"
              color="primary"
              @click="
                form.open_api_domain.isEditing = true
                form.open_api_domain._count =
                  form.open_api_domain._count_default
              "
            />
          </div>
          <div class="itv-flex--fs" v-show="form.open_api_domain.isEditing">
            <Input
              type="number"
              v-model="form.open_api_domain._count"
              style="width: 100px"
              class="mr16"
            />
            <Button
              style="width: 60px;"
              size="small"
              type="primary"
              @click="handleApiLimits"
            >
              确认
            </Button>
            <Button
              type="text"
              class="mr16"
              style="width: 60px;"
              size="small"
              @click="form.open_api_domain.isEditing = false"
              >取消</Button
            >
          </div>
        </div>
      </div>

      <!-- 7、审核API域名 -->
      <div v-show="modal.type === 'check_api_domain'">
        <!-- 用户 -->
        <div class="table-cell__nickname mb24">
          <img
            :src="((modal.obj || {}).user || {}).headimgurl"
            class="img--headimgurl mr8"
          />
          <div class="itv-div__text--nowrap text_one_line">
            {{ ((modal.obj || {}).user || {}).nickname }}
          </div>
        </div>
        <!-- 域名列表 -->
        <div class="mb24">
          <p class="mr16 itv-title--16 mb8">域名列表</p>
          <div
            class="itv-flex--sb mb8"
            v-for="(item, index) in (modal.obj || {}).netloc_list || []"
            :key="index"
          >
            <p
              class="itv-div__text--nowrap itv-text--a2 text_one_line"
              @click="handleOpenNewTag(item)"
            >
              {{ item }}
            </p>
            <i-switch
              v-model="form.check_api_domain._switch[index]"
              class="mr16"
            >
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </div>
          <p v-show="((modal.obj || {}).netloc_list || []).length === 0">无</p>
        </div>
      </div>

      <!-- 8、微信分享 -->
      <div v-show="modal.type === 'wx_share'">
        <!-- 封面图 -->
        <div class="row">
          <div class="label">封面图</div>
          <div class="value">
            <img
              :src="
                calImgUrl(((modal.obj || {}).wx_share_params || {}).image_url)
              "
              style="width: 80px;height: 80px;object-fit: cover;"
              alt="fmt"
              class="cp"
              title="点击查看大图"
              @click="
                img_model.show = true
                img_model.url = calImgUrl(
                  ((modal.obj || {}).wx_share_params || {}).image_url
                )
              "
            />
          </div>
        </div>
        <!-- 标题 -->
        <div class="row">
          <div class="label">标题</div>
          <div class="value">
            {{ ((modal.obj || {}).wx_share_params || {}).title }}
          </div>
        </div>
        <!-- 描述 -->
        <div class="row">
          <div class="label">描述</div>
          <div class="value">
            {{ ((modal.obj || {}).wx_share_params || {}).desc }}
          </div>
        </div>
        <!-- 审核 -->
        <div class="row">
          <div class="label">审核</div>
          <div class="value">
            <i-switch
              :before-change="handleWxShare"
              :loading="form.wx_share.loading"
              v-model="form.wx_share._switch"
              class="mr16"
            >
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
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
        open_api_domain: false
      },
      titleMap: {
        wx_share: '微信分享',
        check_api_domain: '审核API域名',
        open_api_domain: '设置API权限',
        stop_api_domain: '屏蔽API域名',
        enabled_target_link: '设置网站是否可用',
        enabled_short_link: '设置短链是否可用',
        ws_creator: '设置创建协作空间权限',
        enabled: '设置用户登录权限'
      },
      form: {
        enabled_target_link: {
          recursive: true // 是否设置相关联的链接
        },
        stop_api_domain: {
          recursive: true // 是否设置相关联的链接
        },
        open_api_domain: {
          _switch: false,
          _list: [],
          _count_default: 0,
          _count: 0,
          isEditing: false
        },
        check_api_domain: {
          _switch: []
        },
        wx_share: {
          loading: false,
          _switch: false
        }
      }
    }
  },
  computed: {
    modal() {
      return this.$bus.modal
    },
    show_footer() {
      const arr_no_show = ['open_api_domain', 'wx_share']

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
      } else if (v && this.modal.type === 'open_api_domain') {
        // 初始化.设置API权限
        this.form.open_api_domain['_switch'] = this.modal.obj.api_auth
        this.form.open_api_domain['_list'] = this.modal.obj.api_domains || []
        this.form.open_api_domain['_count'] = this.modal.obj.api_n_links_d_limit
        // eslint-disable-next-line prettier/prettier
        this.form.open_api_domain['_count_default'] = this.modal.obj.api_n_links_d_limit
      } else if (v && this.modal.type === 'check_api_domain') {
        // 初始化.审核API域名
        this.form.check_api_domain['_switch'] = this.modal.obj.netloc_list.map(
          () => true
        )
      } else if (v && this.modal.type === 'wx_share') {
        // 初始化.微信分享是否开启
        this.form.wx_share['_switch'] = this.modal.obj.wx_share
      }
    }
  },
  methods: {
    // 处理图片
    calImgUrl(url) {
      if (url && !url.includes('https://static.interval.im/')) {
        return `${process.env.VUE_APP_GET_IMG}${url}`
      }
      return url
    },
    // 打开一个新标签页
    handleOpenNewTag(url) {
      // TODO
      window.open(`http://${url}`, '_blank')
    },

    // 确认对话框
    async handleModal() {
      const type = this.modal.type

      this.loading = true

      /* eslint-disable */
      type === 'ws_creator' && await this.handleSpace()
      type === 'enabled' && await this.handleUserEnabled()
      type === 'enabled_short_link' && await this.handleLinkEnabled()
      type === 'enabled_target_link' && await this.handleWebsiteEnabled()
      type === 'stop_api_domain' && await this.handleStopApiDomain()
      type === 'check_api_domain' && await this.handleCheckApiDomain()
      /* eslint-enable */

      this.loading = false
    },

    // 是否可以创协作空间
    async handleSpace() {
      try {
        await this.$api.User.putSpaceCreate(this.modal.obj.id, {
          ws_creator: !this.modal.obj.ws_creator
        })
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
        setTimeout(() => {
          this.$Message.success(
            (this.modal.obj || {}).ws_creator ? '关闭成功' : '开启成功'
          )
        }, 300)
      } catch (e) {
        console.error(e)
      }
    },

    // 用户是否可以登录
    async handleUserEnabled() {
      try {
        await this.$api.User.putUserEnabled(this.modal.obj.id, {
          enabled: !this.modal.obj.enabled
        })
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
        setTimeout(() => {
          this.$Message.success(
            // eslint-disable-next-line prettier/prettier
            (this.modal.obj || {}).enabled ? '已设置为不允许登录' : '已设置为允许登录'
          )
        }, 300)
      } catch (e) {
        console.error(e)
      }
    },

    // 短链是否可用
    async handleLinkEnabled() {
      try {
        await this.$api.Link.putLinkEnabled(this.modal.obj.id, {
          enabled: !this.modal.obj.enabled
        })
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
        setTimeout(() => {
          this.$Message.success(
            // eslint-disable-next-line prettier/prettier
            (this.modal.obj || {}).enabled ? '禁用成功' : '启用成功'
          )
        }, 300)
      } catch (e) {
        console.error(e)
      }
    },

    // 网站是否可用
    async handleWebsiteEnabled() {
      try {
        await this.$api.Link.putWebsiteEnabled(this.modal.obj.id, {
          enabled: !this.modal.obj.enabled,
          recursive: this.form.enabled_target_link.recursive
        })
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
        setTimeout(() => {
          this.$Message.success(
            // eslint-disable-next-line prettier/prettier
            (this.modal.obj || {}).enabled ? '禁用成功' : '启用成功'
          )
        }, 300)
      } catch (e) {
        console.error(e)
      }
    },

    // 微信分享
    async handleWxShare() {
      try {
        let v = !this.form.wx_share['_switch']

        await this.$api.Link.putWxShareEnabled(this.modal.obj.id, {
          wx_share: v
        })
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
        setTimeout(() => {
          this.$Message.success(v ? '启用成功' : '禁用成功')
        }, 300)
        return Promise.resolve()
      } catch (e) {
        console.error(e)
        return Promise.reject()
      }
    },

    // API域名.屏蔽
    async handleStopApiDomain() {
      try {
        await this.$api.ApiDomain.putApiDomainDisable(this.modal.obj.id, {
          recursive: this.form.enabled_target_link.recursive
        })
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
        setTimeout(() => {
          this.$Message.success('屏蔽成功')
        }, 300)
      } catch (e) {
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
      }
    },

    // API域名.开启权限
    async handleOpenApi() {
      this.is_change.open_api_domain = true

      try {
        const api_auth = !this.modal.obj.api_auth

        await this.$api.User.putApiAuth(this.modal.obj.id, {
          api_auth
        })
        this.$Message.success(`API 权限已${api_auth ? '开启' : '关闭'}`)
        this.form.open_api_domain['_switch'] = api_auth
      } catch (e) {
        console.error(e)
      }
      this.is_change.open_api_domain = false

      return new Promise((resolve, reject) => {
        reject()
      })
    },

    // API域名.更新用户的API调用限制
    async handleApiLimits() {
      try {
        const n_links_d = Number(this.form.open_api_domain['_count'])

        await this.$api.User.putApiLimits(this.modal.obj.id, {
          n_links_d
        })
        this.$Message.success('设置成功')
        this.form.open_api_domain['_count_default'] = n_links_d
        this.form.open_api_domain.isEditing = false
      } catch (e) {
        console.error(e)
      }
    },

    // API域名.审核
    async handleCheckApiDomain() {
      const enabled_list = this.form.check_api_domain['_switch']

      try {
        await this.$api.ApiDomain.putApiDomainCheck(this.modal.obj.id, {
          enabled_list
        })
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
        setTimeout(() => {
          this.$Message.success('屏蔽成功')
        }, 300)
      } catch (e) {
        this.modal.show = false
        this.modal.success_cb({ page: 'now' })
      }
    }
  }
}
</script>

<style lang="less">
.sure-modal {
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
