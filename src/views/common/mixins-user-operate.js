/*  mixins-user-operate MixinsUserOperate 用户的各种操作 */
export default {
  mixins: [],
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handlePackage(data) {
      this.$bus.modal3.type = 'package'
      this.$bus.modal3.show = true
      console.log(data)
      this.$bus.modal3.obj = data
      this.$bus.modal3.success_cb = this.doGetData
    },
    handlePackage2(data) {
      this.$bus.modal3.type = 'package2'
      this.$bus.modal3.show = true
      this.$bus.modal3.obj = data
      this.$bus.modal3.success_cb = this.doGetData
    },
    // 去用户详情
    toUserLink(data) {
      this.$bus.drawer_user.show && (this.$bus.drawer_user.show = false)
      this.$router.push({
        name: 'ShortLinkListUser',
        params: { user_id: data.id },
        query: { name: data.nickname }
      })
    },
    // 恢复游客链接
    handleGuestLinks(data) {
      this.$bus.modal.type = 'guset_link'
      this.$bus.modal.show = true
      this.$bus.modal.obj = data
    },
    // 去用户创建的协作空间列表
    toUserSpaceList(data) {
      this.$bus.drawer_user.show && (this.$bus.drawer_user.show = false)
      this.$router.push({
        name: 'SpaceListUser',
        params: { user_id: data.id },
        query: { name: data.nickname }
      })
    },
    // 给用户打标签
    handleUserTags(row) {
      if (row.subscribe) {
        this.$bus.modal.type = 'user_tags'
        this.$bus.modal.show = true
        this.$bus.modal.obj = row
        this.$bus.modal.success_cb = this.doGetData
      }
    },
    // 是否可登录
    handleUserLogin(data) {
      this.$bus.modal.type = 'enabled'
      this.$bus.modal.show = true
      this.$bus.modal.obj = data
      this.$bus.modal.success_cb = this.doGetData
    },
    // 登录该用户
    handleLoginUser(row) {
      this.$bus.modal.type = 'login_user'
      this.$bus.modal.show = true
      this.$bus.modal.obj = row
    }
  }
}
