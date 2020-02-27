/* 协作空间的具体信息 */
<template>
  <div class="space-detail itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon
          type="i-back"
          title="返回"
          size="20"
          class="itv-btn__icon mr16"
          @click="$router.go(-1)"
        />
        <Breadcrumb>
          <BreadcrumbItem>协作空间成员列表</BreadcrumbItem>
          <BreadcrumbItem>{{ $route.query.name }}</BreadcrumbItem>
        </Breadcrumb>
      </div>
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
  </div>
</template>

<script>
import tableMixins from '../table-mixins'

export default {
  name: 'SpaceDetail',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_ORANGE = '#e88986'
    const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

    return {
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '用户',
            key: 'nickname headimgurl',
            width: 160,
            fixed: 'left',
            // minWidth: 160,
            render: (h, { row }) => {
              return (
                <div
                  class="table-cell__nickname cp"
                  onClick={() => {
                    this.$bus.drawer_user.show = true
                    this.$bus.drawer_user.id = row.id
                  }}
                >
                  <div
                    class={`img--headimgurl__wrap ${
                      row.creator ? 'creator' : ''
                    }`}
                  >
                    <img src={row.headimgurl} class={'img--headimgurl mr8'} />
                  </div>
                  {/* onError={this.handleImgError.bind(null, row, index)} */}
                  {/* eslint-disable */
                    row.sex === 0
                    ? '-'
                    : row.sex === 2
                    ? <itv-icon class="fs0" type="i-woman" size="20" />
                    : <itv-icon class="fs0" type="i-man" size="20" />
                    /* eslint-enable*/
                  }
                  <Tooltip
                    content={row.nickname}
                    placement="top"
                    transfer
                    class="df"
                  >
                    <div class="text--nickname">{row.nickname}</div>
                  </Tooltip>
                </div>
              )
            }
          },
          {
            title: '创建时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 160,
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
            title: '创建/加入的时间',
            minWidth: this.$bus.view_width <= 1300 ? 140 : 160,
            key: 'join_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.join_time).split(' ')

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
            title: '最近登录时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 160,
            key: 'last_login_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.last_login_time).split(' ')

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
            title: '开启协作空间',
            minWidth: 110,
            key: 'ws_creator',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <Icon
                    class="cp"
                    title={
                      row.ws_creator ? '可以创建协作空间' : '不可以创建协作空间'
                    }
                    type="md-checkmark-circle"
                    color={row.ws_creator ? C_GREEN : C_GREY}
                    size="20"
                  />
                </div>
              )
            }
          },
          {
            title: '协作空间数量',
            minWidth: 120,
            // key: 'n_ws_joined',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <span
                    class="ml8 cp"
                    title={`已创建 ${row.n_ws_created} 个协作空间`}
                  >
                    {row.n_ws_created}
                  </span>
                  <span class="ml8">/</span>
                  <span
                    class="ml8 cp"
                    title={`已加入 ${row.n_ws_joined} 个协作空间`}
                  >
                    {row.n_ws_joined}
                  </span>
                </div>
              )
            }
          },
          {
            title: '创建短链数量',
            minWidth: 120,
            key: 'n_links n_links_in_ws',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <span class="ml8 cp" title="该协作空间内的链接数">
                    {row.n_links_in_ws}
                  </span>
                  <span class="ml8">/</span>
                  <span class="ml8 cp" title="创建短链数量">
                    {row.n_links}
                  </span>
                </div>
              )
            }
          },
          {
            title: '链接访问次数',
            minWidth: 120,
            key: 'n_links n_links_in_ws',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <span class="ml8 cp" title="该协作空间内的链接访问次数">
                    {row.n_clicks_in_ws}
                  </span>
                  <span class="ml8">/</span>
                  <span class="ml8 cp" title="链接访问次数">
                    {row.n_clicks}
                  </span>
                </div>
              )
            }
          },
          // {
          //   title: '服务号openid',
          //   minWidth: 120,
          //   key: 'sa_openid',
          //   tooltip: true
          // },
          // {
          //   title: '小程序openid',
          //   minWidth: 120,
          //   key: 'mp_openid',
          //   tooltip: true
          // },
          {
            title: '其他',
            minWidth: 130,
            key: 'subscribe',
            // align: 'center',
            render: (h, { row }) => {
              return (
                <div>
                  <span class="mr8" title="是否关注服务号">
                    <itv-icon
                      type="i-attention"
                      style={{ color: row.subscribe ? C_GREEN : C_GREY }}
                      size="24"
                    />
                  </span>
                  <span class="mr8" title="是否网页登录">
                    <itv-icon
                      type="i-pc"
                      style={{ color: row.sa_openid ? C_ORANGE : C_GREY }}
                      size="24"
                    />
                  </span>
                  <span title="是否小程序登录">
                    <itv-icon
                      type="i-wx"
                      style={{ color: row.mp_openid ? C_BLUE : C_GREY }}
                      size="24"
                    />
                  </span>
                </div>
              )
            }
          },
          {
            title: '地域',
            width: 146,
            key: 'country province city',
            render: (h, { row }) => {
              const string = [row.country, row.province, row.city]
                .filter((item) => item)
                .join('-')

              return (
                <Tooltip
                  content={string}
                  placement="top-start"
                  transfer
                  class="df"
                >
                  <div class="text-area">{string}</div>
                </Tooltip>
              )
            }
          },
          {
            title: '操作',
            width: 80,
            fixed: 'right',
            render: (h, { row }) => {
              return (
                <span title="查看短链">
                  <itv-icon
                    type="i-detail"
                    size="20"
                    class="itv-btn__icon"
                    onClick={this.toUserDetail.bind(null, row)}
                  />
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
    this.doGetData()
  },
  watch: {},
  methods: {
    async doGetData() {
      this.loading = true
      this.domTableScrollTop()
      try {
        const res = await this.$api.Space.getSpaceDetail(
          this.$route.params.space_id
        )

        this.table.data = res.users || []
        this.table.total = this.table.data.length
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    // 去用户详情
    toUserDetail(row) {
      this.$router.push({
        name: 'ShortLinkListUser',
        params: { user_id: row.id },
        query: { name: row.nickname }
      })
    }
  }
}
</script>

<style scoped lang="less">
//.space-detail {
//}
</style>
