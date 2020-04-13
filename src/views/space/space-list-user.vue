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
      <Select v-model="form.sort" style="width:150px" @on-change="doGetData" placement="bottom-end">
        <Option v-for="(item, index) in options.sort" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
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

export default {
  name: 'SpaceList',
  mixins: [tableMixins, spaceMixins],
  props: {},
  components: {},
  data() {
    return {
      // 获取表格数据的参数
      form: {
        sort: 'time',
        n_collaborators: ''
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
          ...this.filter,
          user_id: this.$route.params.user_id,
          order_by: this.form.sort,
          has_collaborator: this.form.n_collaborators // 协作空间的数量
        }

        const res = await this.$api.Space.getSpaceList({
          ...params,
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
