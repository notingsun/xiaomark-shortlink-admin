/* 域名列表 */
<template>
  <div class="api-domain-list itv-flex-v--fs">
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Input
          clearable
          v-model="form.search"
          placeholder="请输入"
          style="width: 300px"
          @on-enter="doGetData"
          @on-clear="doGetData"
          class="mr8"
        />
        <Button type="primary" @click="doGetData">搜索</Button>
      </div>
      <div></div>
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
  name: 'ApiDomainList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_GREY = '#c5c8ce'

    return {
      form: {
        search: ''
      },
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '域名',
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
            title: '是否可用',
            minWidth: 120,
            render: (h, { row }) => {
              return (
                <Icon
                  title={row.enabled ? '已归档' : '未归档'}
                  type="md-checkmark-circle"
                  color={row.enabled ? C_GREEN : C_GREY}
                  size="20"
                />
              )
            }
          },
          {
            title: '提交时间',
            minWidth: 120,
            key: 'create_time',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.create_time)}</span>
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
                    onClick={this.handleStop.bind(null, row)}
                  >
                    屏蔽
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
      this.$bus.drawer_user.show = true
      this.$bus.drawer_user.id = row.user.id
      // this.$router.push({
      //   name: 'UserList',
      //   query: { name: row.user.nickname }
      // })
    },

    // 确认屏蔽
    handleStop(row) {
      // 屏蔽后该域名从当前列表消失
      this.$bus.modal.type = 'stop_api_domain'
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
        const params = {
          qs: this.form.search
        }

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
.api-domain-list {
  .text-visit {
    white-space: nowrap;
    display: inline-block;
  }
}
</style>
