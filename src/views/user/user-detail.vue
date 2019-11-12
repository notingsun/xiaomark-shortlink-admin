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
      <Select v-model="form.sort" style="width:150px" @on-change="doGetData">
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
export default {
  name: 'UserDetail',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '短链名称',
            minWidth: 120,
            key: 'name'
          },
          {
            title: '短链',
            minWidth: 160,
            key: 'url'
          },
          {
            title: '创建时间',
            minWidth: 120,
            key: 'create_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.create_time).split(' ')

              return (
                <span>
                  {arr[0]}
                  {arr[1] && this.$bus.view_width <= 1300 ? <br /> : ' '}
                  {arr[1]}
                </span>
              )
            }
          },
          {
            title: '跳转链接',
            minWidth: 120,
            tooltip: true,
            key: 'origin_url',
            render: (h, { row }) => {
              return (
                <Tooltip
                  content={row.origin_url}
                  placement="bottom"
                  max-width={200}
                >
                  <a
                    href={row.origin_url}
                    class="text--oneRow"
                    style="width: 120px;display: inline-block;"
                  >
                    {row.origin_url}
                  </a>
                </Tooltip>
              )
            }
          },
          {
            title: '访问次数',
            minWidth: 80,
            key: 'n_clicks'
          },
          {
            title: '访问人数',
            minWidth: 80,
            key: 'n_visitors'
          },
          {
            title: '访问IP数',
            minWidth: 80,
            key: 'n_ips'
          }
        ],
        height: null // 表格的高度
      },
      // 获取表格数据的参数
      form: {
        sort: 'time'
      },
      options: {
        sort: [
          { value: 'time', label: '按创建时间倒序' },
          { value: 'click', label: '按点击次数倒序' },
          { value: 'visitor', label: '按点击人数倒序' },
          { value: 'ip', label: '按点击IP数倒序' }
        ]
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.table.height = this.$refs.refTable.$el.clientHeight
    })
    this.doGetData()
  },
  watch: {},
  methods: {
    async doGetData() {
      try {
        const params = {
          user_id: this.$route.params.user_id, // 用户ID
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
