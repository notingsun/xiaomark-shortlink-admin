/* 确认对话框 */
<template>
  <div class="sure-modal">
    <Modal
      v-model="modal.show"
      :title="titleMap[modal.type]"
      :mask-closable="false"
      @on-ok="handleModal"
      @on-cancel="modal.show = false"
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
      titleMap: {
        enabled_target_link: '设置网站是否可用',
        enabled_short_link: '设置短链是否可用',
        ws_creator: '设置创建协作空间权限',
        enabled: '设置用户登录权限'
      },
      form: {
        enabled_target_link: {
          recursive: true // 是否设置相关联的链接
        }
      }
    }
  },
  computed: {
    modal() {
      return this.$bus.modal
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
      }
    }
  },
  methods: {
    // 确认对话框
    handleModal() {
      const type = this.modal.type

      type === 'ws_creator' && this.handleSpace()
      type === 'enabled' && this.handleUserEnabled()
      type === 'enabled_short_link' && this.handleLinkEnabled()
      type === 'enabled_target_link' && this.handleWebsiteEnabled()
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
    }
  }
}
</script>

<style scoped lang="less">
//.sure-modal {
//}
</style>
