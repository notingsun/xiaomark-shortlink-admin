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
      <p v-show="modal.type === 'stop_api_domain'">
        <span
          >屏蔽后该域名会从当前列表消失，确认屏蔽【{{
            (modal.obj || {}).netloc || '-'
          }}】吗？
        </span>
      </p>

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
        <div class="itv-flex--fs">
          <p class="mr16 itv-title--16 mb8">每日创建短链接上限：</p>
          <Input
            type="number"
            v-model="form.open_api_domain._count"
            style="width: 100px"
          />
        </div>
      </div>

      <!-- 7、审核API域名 -->
      <div v-show="modal.type === 'check_api_domain'">
        <!-- 用户 -->
        <div class="table-cell__nickname mb24">
          <img :src="(modal.obj || {}).favicon" class="img--headimgurl mr8" />
          <div class="itv-div__text--nowrap text_one_line">
            {{ (modal.obj || {}).netloc }}
          </div>
        </div>
        <!-- 域名列表 -->
        <div class="mb24">
          <p class="mr16 itv-title--16 mb8">域名列表</p>
          <div
            class="itv-flex--sb mb8"
            v-for="(item, index) in (modal.obj || {}).domain_list || []"
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
          <p v-show="((modal.obj || {}).domain_list || []).length === 0">无</p>
        </div>
      </div>

      <!-- 按钮.取消/确认 -->
      <template slot="footer">
        <div class="itv-flex--fe" v-show="show_footer">
          <Button type="text" class="mr16" @click="modal.show = false"
            >取消</Button
          >
          <Button type="primary" @click="handleModal">确认</Button>
        </div>
      </template>
    </Modal>
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
      is_change: {
        open_api_domain: false
      },
      titleMap: {
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
        open_api_domain: {
          _switch: false,
          _list: [],
          _count: 0
        },
        check_api_domain: {
          _switch: []
        }
      }
    }
  },
  computed: {
    modal() {
      return this.$bus.modal
    },
    show_footer() {
      const arr_no_show = ['open_api_domain']

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
        // TODO
      } else if (v && this.modal.type === 'check_api_domain') {
        // 初始化.审核API域名
        // TODO
        // form.check_api_domain._switch[index]
      }
    }
  },
  methods: {
    // 打开一个新标签页
    handleOpenNewTag(url) {
      // TODO
      window.open(`http://${url}`, '_blank')
    },

    // 确认对话框
    handleModal() {
      const type = this.modal.type

      type === 'ws_creator' && this.handleSpace()
      type === 'enabled' && this.handleUserEnabled()
      type === 'enabled_short_link' && this.handleLinkEnabled()
      type === 'enabled_target_link' && this.handleWebsiteEnabled()
      type === 'stop_api_domain' && this.handleStopApi()
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

    // API域名.屏蔽
    async handleStopApi() {
      // TODO
    },

    // API域名.开启权限
    async handleOpenApi() {
      // TODO
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 300)
        console.log(reject)
      })
      // this.is_change.open_api_domain = true
      // const res = await this.doPutReportShare({ share: !this.report_share })

      // return new Promise((resolve, reject) => {
      //   this.is_change.open_api_domain = false
      //   res && this.$Message.success(`数据分享已${this.report_share ? '开启' : '关闭'}`)
      //   reject()
      // })
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
}
</style>
