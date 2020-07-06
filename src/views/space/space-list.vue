/* 协作空间列表 */
<template>
  <div class="space-list itv-flex-v--fs">
    <!-- 头部 -->
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Input clearable v-model="form.search" placeholder="请输入" style="width: 300px" @on-enter="doGetData" @on-clear="doGetData" class="mr8" />
        <Button type="primary" @click="doGetData">搜索</Button>
      </div>
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
        search: ''
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
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.workspaces || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },

    // 去用户详情
    toUserSpaceList(row) {
      // this.$bus.drawer_user.show = true
      // this.$bus.drawer_user.id = row.user.id
      this.$router.push({
        name: 'SpaceListUser',
        params: { user_id: (row.user || {}).id },
        query: { name: (row.user || {}).nickname }
      })
    }
  }
}
</script>

<style scoped lang="less">
//.space-list {
//}
</style>
