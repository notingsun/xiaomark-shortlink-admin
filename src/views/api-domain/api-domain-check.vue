/* 待审核域名 */
<template>
  <div class="api-domain-check itv-flex-v--fs">
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
  name: 'ApiDomainCheck',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    return {
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
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
            title: '提交时间',
            minWidth: 160,
            key: 'create_time',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.create_time)}</span>
            }
          },
          {
            title: '申请次数',
            minWidth: 160,
            key: 'nth'
          },
          {
            title: '操作',
            width: 160,
            render: (h, { row }) => {
              if (row.reviewed) {
                return <span class="itv-text--grey">已审核</span>
              }
              return (
                <span
                  class="itv-btn__text"
                  onClick={this.handleCheck.bind(null, row)}
                >
                  审核
                </span>
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

    // 审核
    handleCheck(row) {
      // 屏蔽后该域名从当前列表消失
      this.$bus.modal.type = 'check_api_domain'
      this.$bus.modal.show = true
      this.$bus.modal.obj = row
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
        const res = await this.$api.ApiDomain.getApiDomainCheckList({
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.applications || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
//.api-domain-check {
//}
</style>
