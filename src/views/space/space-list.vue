/* 协作空间列表 */
<template>
  <div class="space-list itv-flex-v--fs">
    <!-- 头部 -->
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Input clearable v-model="form.search" placeholder="请输入" style="width: 300px" @on-enter="doGetData" @on-clear="doGetData" class="mr8" />
        <Button type="primary" @click="doGetData">搜索</Button>
      </div>
      <div>
        <!-- 排序 -->
        <Select v-model="form.sort" style="width:150px" @on-change="doGetData" placement="bottom-end">
          <Option v-for="(item, index) in options.sort" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </div>
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
        search: '',
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
          // user_id: this.form.user_id,
          qs: this.form.search,
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
