/* 确认对话框 */
<template>
  <div class="sure-modal">
    <Modal
      v-model="modal.show"
      :title="modal.titleMap[modal.type]"
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
        <span>创建协作空间的权限？</span>
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
        <span>登录？</span>
      </p>
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
    return {}
  },
  computed: {
    modal() {
      return this.$bus.modal
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 确认对话框
    handleModal() {
      const type = this.modal.type

      type === 'ws_creator' && this.handleSpace()
      type === 'enabled' && this.handleUserEnabled()
    },
    // 是否可以创协作空间
    async handleSpace() {
      try {
        await this.$api.User.putSpaceCreate(this.modal.obj.id, {
          ws_creator: !this.modal.obj.ws_creator
        })
        this.modal.show = false
        this.doGetData({ page: 'now' })
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
        this.doGetData({ page: 'now' })
        setTimeout(() => {
          this.$Message.success(
            // eslint-disable-next-line prettier/prettier
            (this.modal.obj || {}).enabled ? '已设置为不允许登录' : '已设置为允许登录'
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
