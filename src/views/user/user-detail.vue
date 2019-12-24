/* 用户创建的短链页 */
<template>
  <div class="user-detail itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <Breadcrumb>
        <BreadcrumbItem class="cp" @click.native="$router.go(-1)"
          >用户列表</BreadcrumbItem
        >
        <BreadcrumbItem>{{ $route.query.name }} 创建的短链</BreadcrumbItem>
      </Breadcrumb>
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
import userMixins from '../common/mixins-user-link'

export default {
  name: 'UserDetail',
  mixins: [tableMixins, userMixins],
  props: {},
  components: {},
  data() {
    return {
      // 获取表格数据的参数
      form: {
        archived: '',
        enabled: '',
        sort: 'time'
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.doGetData()
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
          user_id: this.$route.params.user_id, // 用户ID
          archived: this.form.archived,
          enabled: this.form.enabled,
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

<style scoped lang="less">
.user-detail {
  .cp {
    cursor: pointer;
  }
}
</style>
