/* 某个用户创建的协作空间列表 */
<template>
  <div class="space-list itv-flex-v--fs">
    <!-- 头部 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon type="i-back" title="返回" size="20" class="itv-btn__icon mr16" @click="$router.go(-1)" />
        <Breadcrumb>
          <BreadcrumbItem>协作空间列表</BreadcrumbItem>
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
      <!-- 排序 -->
      <filter-space v-model="form_filter" @submit="doGetData" :loading="loading"></filter-space>
    </div>
    <!-- 表格 -->
    <Table :loading="loading" style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'
import spaceMixins from '../common/mixins-space-list'
import filterSpace from '../common/filter-space'

export default {
  name: 'SpaceList',
  mixins: [tableMixins, spaceMixins],
  props: {},
  components: { filterSpace },
  data() {
    return {
      form_filter: {},
      // 获取表格数据的参数
      form: {
        sort: 'time',
        n_collaborators: ''
      }
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
        const res = await this.$api.Space.getSpaceList({
          ...this.form_filter,
          qs: this.form.search,
          user_id: this.$route.params.user_id,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.workspaces || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
//.space-list {
//}
</style>
