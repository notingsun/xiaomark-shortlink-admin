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

export default {
  name: 'UserDetail',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_BLUE = '#4F87FB'
    const C_ORANGE = '#e88986'
    const C_GREY = '#c5c8ce'
    const SOURCE_MAP = [
      {},
      {
        name: '网页',
        icon: 'i-pc',
        color: C_ORANGE
      },
      {
        name: '小程序',
        icon: 'i-wx',
        color: C_BLUE
      },
      {
        name: '浏览器插件',
        icon: 'i-extention',
        color: C_GREEN
      }
    ]

    return {
      loading: true,
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
            width: 156,
            tooltip: true,
            key: 'origin_url',
            render: (h, { row }) => {
              /* eslint-disable */
              const arr_a = row.mode === 0 ? [] : (row.origin_url_list || []).map((item, index) => (
                <p>
                  <span>【{index + 1}】</span>
                  <a
                    target="_blank"
                    href={item.url}
                    rel="noreferrer"
                    >
                    {item.url}
                  </a>
                </p>
              ))

              return (
                <Tooltip placement="bottom" max-width={500} theme="light">
                  {
                    row.mode === 0 
                    ? <a
                      target="_blank"
                      href={row.origin_url}
                      rel="noreferrer"
                      class="text--oneRow"
                      style="width: 120px;display: inline-block;"
                      >
                        {row.origin_url}
                      </a>
                    : <span class="cp" style="color: #2D8cF0;">随机_{row.mode === 1 ? '' : '非'}记忆</span>
                  }
                  <div slot="content">
                    {
                      row.mode === 0 
                      ? <a
                        target="_blank"
                        href={row.origin_url}
                        rel="noreferrer"
                        >
                          {row.origin_url}
                        </a>
                      : arr_a
                    }
                  </div>
                </Tooltip>
              )
              /* eslint-enable */
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
          },
          {
            title: '来源',
            minWidth: 80,
            key: 'source',
            render: (h, { row }) => {
              return (
                <div>
                  <span class="mr8" title={SOURCE_MAP[row.source].name || '--'}>
                    <itv-icon
                      type={SOURCE_MAP[row.source].icon || '--'}
                      style={{ color: SOURCE_MAP[row.source].color || '--' }}
                      size="24"
                    />
                  </span>
                </div>
              )
            }
          },
          {
            title: '是否可用',
            minWidth: 120,
            key: 'enabled',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '可用', value: 1 },
                { name: '不可用', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.enabled === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.enabled = item.value
                        this.doGetData()
                      }}
                    >
                      {item.name}
                    </span>
                  </DropdownItem>
                )
              })

              return (
                <Dropdown>
                  <div>
                    <span class="mr8">是否可用</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <Icon
                  title={row.enabled ? '可用' : '不可用'}
                  type="md-checkmark-circle"
                  color={row.enabled ? C_GREEN : C_GREY}
                  size="20"
                />
              )
            }
          }
        ],
        height: null // 表格的高度
      },
      // 获取表格数据的参数
      form: {
        enabled: '',
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
