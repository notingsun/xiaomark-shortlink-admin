/* 自定义域名列表 */
<template>
  <div class="custom-domain-list itv-flex-v--fs link-list">
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Input clearable v-model="form.search" placeholder="请输入" style="width: 300px" @on-enter="doGetData" @on-clear="doGetData" class="mr8" />
        <Button type="primary" @click="doGetData">搜索</Button>
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

export default {
  name: 'CustomDomainList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    return {
      form: {
        search: '',
        bind: ''
        // status: '',
        // enabled: ''
      },
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '自定义域名',
            width: 160,
            key: 'hostname netloc favicon',
            fixed: 'left',
            render: (h, { row }) => {
              return <span>{row.domain}</span>
            }
          },
          {
            title: '所属用户',
            minWidth: 160,
            key: 'user.nickname user.headimgurl',
            render: (h, { row }) => {
              return (
                <div class="table-cell__nickname big cp" onClick={this.toUserDetail.bind(null, row)}>
                  <img src={(row.user || {}).headimgurl} class="img--headimgurl mr8" />
                  <span class="text--nickname">{(row.user || {}).nickname}</span>
                </div>
              )
            }
          },
          {
            // title: '状态',
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
                      this.form.bind === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.bind = item.value
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
                    <span class="mr8">状态</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                // eslint-disable-next-line prettier/prettier
                <Tag color={row.status === 0 ? 'default' : row.status === 1 ? 'green' : 'red'}>
                  {/* eslint-disable-next-line prettier/prettier*/}
                  {row.status === 0 ? '未生效' : row.status === 1 ? '已启用' : '已停用'}
                </Tag>
              )
            }
          },
          {
            title: '协议',
            minWidth: 120,
            // key: 'scheme'
            render: (h, { row }) => {
              return <span>{row.scheme || '-'}</span>
            }
          },
          {
            title: 'CNAME',
            minWidth: 160,
            // key: 'cname'
            render: (h, { row }) => {
              return <span>{row.cname || '-'}</span>
            }
          },
          {
            title: '首页地址',
            minWidth: 140,
            tooltip: true,
            key: 'home_redirect'
            // render: (h, { row }) => {
            //   return <span>{row.home_redirect || '-'}</span>
            // }
          },
          {
            title: '创建时间',
            minWidth: 180,
            // key: 'create_time',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.create_time)}</span>
            }
          },
          {
            title: '绑定时间',
            minWidth: 180,
            // key: 'bind_time',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.bind_time)}</span>
            }
          },
          {
            title: '短链数量',
            minWidth: 120,
            key: 'hostname netloc favicon',
            render: (h, { row }) => {
              return <span>{row.n_links}</span>
            }
          },
          {
            title: '操作',
            width: 100,
            render: (h, { row }) => {
              return (
                <div>
                  <span class="itv-btn__text" onClick={this.handleShowLinks.bind(null, row)}>
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
      // this.$router.push({
      //   name: 'UserList',
      //   query: { name: row.user.nickname }
      // })
      this.$bus.drawer_user.show = true
      this.$bus.drawer_user.id = row.user.id
    },

    // 查看短链
    handleShowLinks(row) {
      this.$router.push({
        name: 'ShortLinkListCustomDomain',
        params: { domain_name: row.domain }
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
          qs: this.form.search,
          bind: this.form.bind
          // resolved: this.form.status, // DNS解析是否正确：0 - 否，1 - 是
          // enabled: this.form.enabled // 是否可用：0 - 不可用，1 - 可用
        }
        const res = await this.$api.CustomDomain.getCustomDomain({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.custom_domains || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
// .custom-domain-list {
// }
</style>
