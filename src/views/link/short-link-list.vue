/* 短链列表 */
<template>
  <div class="short-link-list itv-flex-v--fs link-list">
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Input clearable v-model="form.search" placeholder="请输入" style="width: 300px" @on-enter="doGetData" @on-clear="doGetData" class="mr8" />
        <Button type="primary" @click="doGetData">搜索</Button>
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
  name: 'ShortLinkList',
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
  mounted() {
    // 备注：页面的第一次数据调用组件 short-link-filter 触发
  },
  watch: {},
  methods: {
    // 去用户详情
    toUserDetail(row) {
      this.$bus.drawer_user.show = true
      this.$bus.drawer_user.id = row.user.id
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
