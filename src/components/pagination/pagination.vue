/* 分页器 使用方法：
<itv-pagination :total="page.total" @on-change="handlePage" />
*/
<template>
  <Page
    class="mt24"
    style="text-align:center"
    :total="total"
    :current="current_page"
    :page-size="page_size"
    @on-change="pageChange"
    @on-page-size-change="changePageSize"
    show-sizer
    show-elevator
    :show-total="showTotal"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    routeSave: {
      type: Boolean,
      default: true
    }, // 将page的数据保存在url中
    total: {
      type: Number
    },
    showTotal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      current_page: 1,
      page_size: this.$global.consts.INIT_PAGE_SIZE
    }
  },
  created() {},
  mounted() {
    const pagination = this.$global.utils.pagination.get()

    if (pagination) {
      this.current_page = pagination.page - 0
      this.page_size = pagination.per_page - 0
    }
  },
  computed: {
    reset() {
      return this.$route.query.page_reset || null
    }
  },
  methods: {
    /**
     * 每页条数变化
     * @param {String} pageSize - 每页显示条数
     */
    changePageSize(pageSize) {
      // 切换每页条数时，为了不出现奇怪的现象，需要重置到第一页
      this.page_size = pageSize
      // eslint-disable-next-line no-extra-parens
      this.current_page === 1 ? this.pageChange(1) : (this.current_page = 1) // 当page为1时，需要手动触发ageChange。当page不为1时，直接修改page，会触发pageChange
    },

    /**
     * 页码变换
     */
    pageChange(page) {
      this.current_page = page
      this.routeSave && this.$global.utils.pagination.set(this.current_page, this.page_size)
      // console.log(this.current_page, this.page_size)

      this.$emit('on-change', {
        page: this.current_page,
        per_page: this.page_size
      })
    }
  },
  watch: {
    // 用于重置当前分页器的值，
    // FIXME 会重置所有分页器的值
    reset(v) {
      if (v) {
        this.current_page = 1
        // this.page_size = this.page_size // 不重置每页显示条数
        this.routeSave && this.$global.utils.pagination.set(this.current_page, this.page_size)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
