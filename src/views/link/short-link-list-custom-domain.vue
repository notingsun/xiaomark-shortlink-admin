/* 用户创建的短链页 */
<template>
  <div class="short-link-list-custom-domain itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon type="i-back" title="返回" size="20" class="itv-btn__icon mr16" @click="$router.go(-1)" />
        <Breadcrumb>
          <BreadcrumbItem>短链列表</BreadcrumbItem>
          <BreadcrumbItem>自定义域名：{{ $route.params.domain_name }}</BreadcrumbItem>
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
  name: 'ShortLinkListCustomDomain',
  mixins: [tableMixins, shortLinkMixins],
  props: {},
  components: { ShortLinkFilter },
  data() {
    return {
      form_short_link_filter: {},
      // 获取表格数据的参数
      form: {}
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
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
          ...this.form_short_link_filter,
          domain: this.$route.params.domain_name, // 用户ID
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

<style scoped lang="less">
.short-link-list-custom-domain {
  .cp {
    cursor: pointer;
  }
}
</style>
