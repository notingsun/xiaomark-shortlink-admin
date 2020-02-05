/* 自定义域名列表 */
<template>
  <div class="custom-domain-list itv-flex-v--fs">
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
  name: 'CustomDomainList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    return {
      form: {
        status: ''
      },
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '自定义域名',
            minWidth: 240,
            key: 'hostname netloc favicon',
            render: (h, { row }) => {
              return <span>{row.netloc}</span>
            }
          },
          {
            title: '所属用户',
            minWidth: 160,
            key: 'user.nickname user.headimgurl',
            render: (h, { row }) => {
              return (
                <div
                  class="table-cell__nickname big cp"
                  onClick={this.toUserDetail.bind(null, row)}
                >
                  <img
                    src={(row.user || {}).headimgurl}
                    class="img--headimgurl mr8"
                  />
                  <span class="text--nickname">
                    {(row.user || {}).nickname}
                  </span>
                </div>
              )
            }
          },
          {
            title: '状态',
            minWidth: 120,
            key: 'enabled',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '已生效', value: 1 },
                { name: '未生效', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.status === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.status = item.value
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
                  <div class="cp">
                    <span class="mr8">是否可用</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <Tag color={row.netloc === 'shimo.im' ? 'green' : 'default'}>
                  {row.netloc === 'shimo.im' ? '已生效' : '未生效'}
                </Tag>
              )
            }
          },
          {
            title: '短链数量',
            minWidth: 240,
            key: 'hostname netloc favicon',
            render: (h, { row }) => {
              return <span>{row.netloc}</span>
            }
          },
          {
            title: '操作',
            width: 100,
            render: (h, { row }) => {
              return (
                <div>
                  <span
                    class="itv-btn__text"
                    onClick={this.handleShowLinks.bind(null, row)}
                  >
                    查看短链
                  </span>
                </div>
              )
            }
          }
        ],
        height: null // 表格的高度
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
        name: 'UserList',
        query: { name: row.user.nickname }
      })
    },

    // 查看短链
    handleShowLinks(row) {
      this.$router.push({
        name: 'ShortLinkListCustomDomain',
        // TODO
        params: { domain_id: row.user.id },
        query: { name: row.user.nickname }
      })
    },

    // 获取表格的数据
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
          status: this.form.status
        }
        // TODO
        const res = await this.$api.ApiDomain.getApiDomain({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.domains || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.custom-domain-list {
  .text-visit {
    white-space: nowrap;
    display: inline-block;
  }
}
</style>
