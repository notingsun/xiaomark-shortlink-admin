/* 短链列表 */
<template>
  <div class="short-link-list itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon
          type="i-back"
          title="返回"
          size="20"
          class="itv-btn__icon mr16"
          @click="$router.go(-1)"
        />
        <Breadcrumb>
          <BreadcrumbItem>短链列表</BreadcrumbItem>
          <BreadcrumbItem>空间：{{ $route.query.name }}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Select
        v-model="form.sort"
        style="width:150px"
        @on-change="doGetData"
        placement="bottom-end"
      >
        <Option
          v-for="(item, index) in options.sort"
          :value="item.value"
          :key="index"
          >{{ item.label }}</Option
        >
      </Select>
    </div>
    <!-- 表格 -->
    <Table
      :loading="loading"
      style="flex: 1;"
      ref="refTable"
      :height="table.height"
      :columns="table.columns"
      :data="table.data"
    />
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'
import shortLinkMixins from '../common/mixins-short-link'

export default {
  name: 'ShortLinkListSpace',
  mixins: [tableMixins, shortLinkMixins],
  props: {},
  components: {},
  data() {
    return {
      form: {
        has_params: '',
        archived: '',
        enabled: '',
        search: '',
        sort: 'time'
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    const { page, per_page } = this.$route.query
    const params = page && per_page ? { page, per_page } : ''

    this.doGetData(params)
  },
  watch: {},
  methods: {
    // 去用户详情
    toUserDetail(row) {
      this.$router.push({
        name: 'ShortLinkListUser',
        params: { user_id: row.user.id },
        query: { name: row.user.nickname }
      })
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
        const params = {
          has_params: this.form.has_params,
          archived: this.form.archived,
          enabled: this.form.enabled,
          workspace_id: this.$route.params.space_id, // 用户ID
          order_by: this.form.sort
        }

        const res = await this.$api.Link.getShortLinkList({
          ...params,
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
.short-link-list {
  .text-visit {
    white-space: nowrap;
    display: inline-block;
  }
}
</style>
