export default {
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.table.height = this.$refs.refTable.$el.clientHeight
    })
  },
  watch: {},
  methods: {
    domTableScrollTop() {
      // 表格回滚到顶部
      this.$refs.refTable &&
        this.$refs.refTable.$refs.body &&
        (this.$refs.refTable.$refs.body.scrollTop = 0)
    }
  }
}
