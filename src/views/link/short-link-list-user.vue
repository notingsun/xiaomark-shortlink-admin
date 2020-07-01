/* 用户创建的短链页 */
<template>
  <div class="short-link-list-space itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon type="i-back" title="返回" size="20" class="itv-btn__icon mr16" @click="$router.go(-1)" />
        <Breadcrumb>
          <BreadcrumbItem>短链列表</BreadcrumbItem>
          <BreadcrumbItem>
            创建者：{{ $route.query.name }}
            <Button
              class="ml16"
              @click="
                () => {
                  $bus.drawer_user.show = true
                  $bus.drawer_user.id = $route.params.user_id
                }
              "
            >
              用户详情
            </Button>
          </BreadcrumbItem>
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
  name: 'ShortLinkListUser',
  mixins: [tableMixins, shortLinkMixins],
  props: {},
  components: { ShortLinkFilter },
  data() {
    return {
      // 获取表格数据的参数
      form_short_link_filter: {},
      form: {}
    }
  },
  computed: {},
  created() {},
  mounted() {
    // 备注：页面的第一次数据调用组件 short-link-filter 触发
  },
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
          user_id: this.$route.params.user_id, // 用户ID
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
.short-link-list-space {
  .cp {
    cursor: pointer;
  }
}
</style>
