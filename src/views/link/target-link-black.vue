/* 跳转链接数据 */
<template>
  <div class="target-link-black itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon type="i-back" title="返回" size="20" class="itv-btn__icon mr16" @click="$router.go(-1)" />
        <Breadcrumb>
          <BreadcrumbItem>列出网站</BreadcrumbItem>
        </Breadcrumb>
        <Button class="ml32" @click="handleAdd">添加黑名单域名</Button>
      </div>
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
  name: 'TargetLinkBlack',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_GREY = '#c5c8ce'

    return {
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '域名',
            minWidth: 240,
            key: 'domain'
          },
          {
            title: '网站数量',
            minWidth: 240,
            key: 'n_websites'
          },
          {
            title: '是否封禁子域名',
            minWidth: 240,
            key: 'block_sub',
            render: (h, { row }) => {
              return <Icon title={row.block_sub ? '是' : '否'} type="md-checkmark-circle" color={row.block_sub ? C_GREEN : C_GREY} size="20" />
            }
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
          }
        ],
        height: null // 表格的高度
      },
      form: {
        has_link: '',
        enabled: '',
        search: '',
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
    // 将域名添加到黑名单
    handleAdd() {
      this.$bus.modal.type = 'enabled_target_link'
      this.$bus.modal.show = true
      this.$bus.modal.obj = { domain: '', editable: true }
      this.$bus.modal.success_cb = this.doGetData
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
        const res = await this.$api.Link.getWebsiteBlackList({
          qs: this.form.search,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.blacklists || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
// .target-link-black {
// }
</style>
