/* 短链列表 */
<template>
  <div class="short-link-list itv-flex-v--fs link-list">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon type="i-back" title="返回" size="20" class="itv-btn__icon mr16" @click="$router.go(-1)" />
        <Breadcrumb>
          <BreadcrumbItem>短链列表</BreadcrumbItem>
          <BreadcrumbItem>空间：{{ $route.query.name }}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <short-link-filter v-model="form_short_link_filter" @submit="doGetData" :loading="loading" />
    </div>
    <!-- 表格 -->
    <Table :loading="loading" style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'
import shortLinkMixins from '../common/mixins-short-link'
import ShortLinkFilter from '../common/short-link-filter'

export default {
  name: 'ShortLinkListSpace',
  mixins: [tableMixins, shortLinkMixins],
  props: {},
  components: { ShortLinkFilter },
  data() {
    return {
      form_short_link_filter: {},
      form: {
        search: ''
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 去用户详情
    toUserDetail(row) {
      this.$bus.drawer_user.show = true
      this.$bus.drawer_user.id = row.user.id
      // this.$router.push({
      //   name: 'ShortLinkListUser',
      //   params: { user_id: row.user.id },
      //   query: { name: row.user.nickname }
      // })
    },
    doGetData(page = {}) {
      if (!page.page) {
        this.$global.utils.pagination.reset()
        this.$nextTick(() => {
          this.doGetData2()
        })
      } else {
        this.doGetData2()
      }
    },
    async doGetData2() {
      this.loading = true
      this.domTableScrollTop()
      try {
        const res = await this.$api.Link.getShortLinkList({
          workspace_id: this.$route.params.space_id, // 用户ID
          ...this.form_short_link_filter,
          qs: this.form.search, // 查询字符串（名称/原始URL/短链接URL）
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.links || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
// .short-link-list {
// }
</style>
