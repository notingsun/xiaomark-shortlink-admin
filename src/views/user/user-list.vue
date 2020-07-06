/* 用户列表 */
<template>
  <div class="user-list itv-flex-v--fs">
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Input clearable v-model="form.search" placeholder="请输入" style="width: 300px" @on-enter="doGetData" @on-clear="doGetData" class="mr8" />
        <Button type="primary" @click="doGetData">搜索</Button>
      </div>
      <div>
        <filter-user v-model="form_filter" @submit="doGetData" :loading="loading"></filter-user>
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
import { appMap, pluginListUser, apiKeyMap } from '../common/plugin-data'
import FilterUser from '../common/filter-user'

export default {
  name: 'UserList',
  mixins: [tableMixins],
  props: {},
  components: { FilterUser },
  data() {
    const C_GREEN = '#47cb89'
    const C_ORANGE = '#e88986'
    const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

    return {
      form_filter: {},
      show_drawer: false, // 显示抽屉
      value: '',
      type: '',
      filter: {},
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '微信昵称',
            key: 'nickname headimgurl',
            width: 160,
            fixed: 'left',
            // minWidth: 160,
            render: (h, { row }) => {
              return (
                <div class="table-cell__nickname cp" onClick={this.openUserDetail.bind(null, row)}>
                  <img src={row.headimgurl} class="img--headimgurl mr8" />
                  {/* onError={this.handleImgError.bind(null, row, index)} */}
                  {/* eslint-disable */
                    row.sex === 0
                    ? '-'
                    : row.sex === 2
                    ? <itv-icon class="fs0" type="i-woman" size="20" />
                    : <itv-icon class="fs0" type="i-man" size="20" />
                    /* eslint-enable*/
                  }
                  <Tooltip content={row.nickname} placement="top" transfer class="df">
                    <div class="text--nickname">{row.nickname}</div>
                  </Tooltip>
                </div>
              )
            }
          },
          // {
          //   title: 'PC最近登录时间',
          //   width: 200,
          //   // key: 'pc_last_login_time',
          //   render: (h, { row }) => {
          //     return (
          //       <div class="mt4 mb4">
          //         <div title="PC端最近登录时间" class="mb4">
          //           <span class="mr8" title="是否网页登录">
          //             <itv-icon type="i-pc" style={{ color: row.pc_last_login_time ? C_ORANGE : C_GREY }} size="24" />
          //           </span>
          //           <span class={row.pc_last_login_time ? '' : 'itv-text--grey4'}>{row.pc_last_login_time ? this.$PDo.Date.format(row.pc_last_login_time) : '未登录'}</span>
          //         </div>
          //         <div title="小程序最近登录时间">
          //           <span class="mr8" title="是否小程序登录" v-if="">
          //             <itv-icon type="i-wx" style={{ color: row.mp_last_login_time ? C_BLUE : C_GREY }} size="24" />
          //           </span>
          //           <span class={row.mp_last_login_time ? '' : 'itv-text--grey4'}>{row.mp_last_login_time ? this.$PDo.Date.format(row.mp_last_login_time) : '未登录'}</span>
          //         </div>
          //       </div>
          //     )
          //   }
          // },
          {
            title: '创建短链数量',
            minWidth: 200,
            key: 'n_links',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs mt4 mb4">
                  <div style="width: 30%">
                    <span title="今日">{row.n_links_today}</span>
                    <span>/</span>
                    <span title="累计">{row.n_links}</span>
                  </div>
                  <div class="itv-flex--v ml8 flex1">
                    <div class="itv-flex--fs">
                      <div style="color: #afafaf;width: 36px;">普通：</div>
                      {row.n_normal_links}
                    </div>
                    <div class="itv-flex--fs">
                      <div style="color: #afafaf;width: 36px;">随机：</div>
                      {row.n_random_links}
                    </div>
                    <div class="itv-flex--fs">
                      <div style="color: #afafaf;width: 36px;">API： </div>
                      <span title="开放API创建的链接数量">{row.n_random_links}</span>
                      {/* <span>/</span> */}
                      {/* <span title="非开放API创建的链接数量">{row.n_nonapi_links}</span> */}
                    </div>
                  </div>
                </div>
              )
            }
          },
          {
            title: '短链访问次数',
            minWidth: 120,
            key: 'n_links n_links_in_ws',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <span class="ml8 cp" title="链接今日访问次数">
                    {row.pv_today}
                  </span>
                  <span class="ml8">/</span>
                  <span class="ml8 cp" title="链接访问次数">
                    {row.pv}
                  </span>
                </div>
              )
            }
          },
          {
            title: '协作空间',
            minWidth: 130,
            // key: 'open_workspace',
            // <itv-icon
            //   class="cp"
            //   title={row.open_workspace ? '可以创建协作空间' : '不可以创建协作空间'}
            //   type={row.open_workspace ? 'i-stop' : 'i-start'}
            //   size="20"
            //   style={`color: ${row.open_workspace ? C_GREEN : C_GREY}`}
            //   onClick={() => {
            //     this.$bus.modal.type = 'ws_creator'
            //     this.$bus.modal.show = true
            //     this.$bus.modal.obj = row
            //     this.$bus.modal.success_cb = this.doGetData
            //   }}
            // />
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <div class="itv-flex--v ml8" style={`color: ${row.open_workspace ? '' : '#afafaf'}`}>
                    <p class="ml8 cp" title={`已创建 ${row.n_created_workspaces} 个协作空间`}>
                      <span style="color: #afafaf;">创建：</span>
                      {row.n_created_workspaces}
                    </p>
                    <p class="ml8 cp" title={`已加入 ${row.n_joined_workspaces} 个协作空间`}>
                      <span style="color: #afafaf;">加入：</span>
                      {row.n_joined_workspaces}
                    </p>
                  </div>
                </div>
              )
            }
          },
          {
            title: 'API权限',
            minWidth: 120,
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <itv-icon
                    class="cp mr12"
                    title={row.open_api ? '有API权限' : '没有API权限'}
                    type={row.open_api ? 'i-stop' : 'i-start'}
                    size="20"
                    style={`color: ${row.open_api ? C_GREEN : C_GREY}`}
                    onClick={() => {
                      this.$bus.modal.type = 'open_api_domain'
                      this.$bus.modal.show = true
                      this.$bus.modal.obj = row
                      this.$bus.modal.success_cb = this.doGetData
                    }}
                  />
                  <span title="每日调用API创建链接数上限">{row.api_max_links_daily}</span>
                </div>
              )
            }
          },
          {
            title: '是否可登录',
            minWidth: 120,
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <itv-icon
                    class="cp"
                    title={row.enabled ? '可登录' : '不可登录'}
                    type={row.enabled ? 'i-stop' : 'i-start'}
                    size="20"
                    style={`color: ${row.enabled ? C_GREEN : C_GREY}`}
                    onClick={() => {
                      this.$bus.modal.type = 'enabled'
                      this.$bus.modal.show = true
                      this.$bus.modal.obj = row
                      this.$bus.modal.success_cb = this.doGetData
                    }}
                  />
                </div>
              )
            }
          },
          {
            title: '插件',
            minWidth: 190,
            // key: 'n_clicks',
            render: (h, { row }) => {
              let res = pluginListUser.map((item) => {
                return <img src={appMap[item].icon} class={`mr8 img--plugin--icon ${row[apiKeyMap[item]] ? '' : ' disabled'}`} title={appMap[item].title} />
              })

              return <div>{res}</div>
            }
          },
          {
            title: 'PC最近登录时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            render: (h, { row }) => {
              if (!row.pc_last_login_time) {
                return <span class="itv-text--grey3">-</span>
              }
              return <div>{this.$PDo.Date.format(row.pc_last_login_time)}</div>
            }
          },
          {
            title: '小程序最近登录时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            render: (h, { row }) => {
              if (!row.mp_last_login_time) {
                return <span class="itv-text--grey3">-</span>
              }
              return <div>{this.$PDo.Date.format(row.mp_last_login_time)}</div>
            }
          },
          {
            title: '注册时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
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
            title: '激活时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            // key: 'active_date',
            render: (h, { row }) => {
              if (!row.active) {
                return <span class="itv-text--grey3">-</span>
              }
              const arr = this.$PDo.Date.format(row.active_date).split(' ')

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
            title: '其他',
            width: 150,
            key: 'subscribe',
            // align: 'center',
            render: (h, { row }) => {
              return (
                <div>
                  <span class="mr8" title="是否关注服务号">
                    <itv-icon type="i-attention" style={{ color: row.subscribe ? C_GREEN : C_GREY }} size="24" />
                  </span>
                  <span class="mr8" title="是否网页登录">
                    <itv-icon type="i-pc" style={{ color: row.pc_last_login_time ? C_ORANGE : C_GREY }} size="24" />
                  </span>
                  <span class="mr8" title="是否小程序登录" v-if="">
                    <itv-icon type="i-wx" style={{ color: row.mp_last_login_time ? C_BLUE : C_GREY }} size="24" />
                  </span>
                </div>
              )
            }
          },
          {
            title: '来源',
            minWidth: 120,
            // key: 'source'
            render: (h, { row }) => {
              return <span class={row.source ? '' : 'itv-text--grey3'}>{row.source || '-'}</span>
            }
          },
          {
            title: '邮箱',
            minWidth: 120,
            // key: 'email',
            render: (h, { row }) => {
              return <span class={row.email ? '' : 'itv-text--grey3'}>{row.email || '-'}</span>
            }
          },
          {
            title: '地域',
            width: 146,
            key: 'country province city',
            render: (h, { row }) => {
              const string = [row.country, row.province, row.city].filter((item) => item).join('-')

              return (
                <Tooltip content={string} placement="top-start" transfer class="df">
                  <div class="text-area">{string}</div>
                </Tooltip>
              )
            }
          },
          {
            title: '操作',
            width: 140,
            fixed: 'right',
            render: (h, { row }) => {
              return (
                <div>
                  <span title="查看短链">
                    <itv-icon type="i-detail" size="20" class="itv-btn__icon mr8" onClick={this.toUserDetail.bind(null, row)} />
                  </span>
                  <span title="查看协作空间">
                    <itv-icon type="i-member" size="20" class="itv-btn__icon mr8" onClick={this.toUserSpaceList.bind(null, row)} />
                  </span>
                  <span title="登录该用户">
                    <itv-icon type="i-eye" size="20" class="itv-btn__icon mr8" onClick={this.toUserLogin.bind(null, row)} />
                  </span>
                  <span title="给用户打标签">
                    <itv-icon type="i-tag" size="20" class="itv-btn__icon" onClick={this.handleUserTags.bind(null, row)} />
                  </span>
                </div>
              )
            }
          }
        ],
        height: null // 表格的高度
      },
      // 获取表格数据的参数
      form: {
        search: ''
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    // const { page, per_page } = this.$route.query
    // const params = page && per_page ? { page, per_page } : ''

    this.form.search = this.$route.query.name || ''
    // this.doGetData(params)
  },
  watch: {},
  methods: {
    // 打开用户详情窗口
    openUserDetail(row) {
      this.$bus.drawer_user.show = true
      this.$bus.drawer_user.id = row.id
    },
    // 去用户详情
    toUserDetail(row) {
      this.$router.push({
        name: 'ShortLinkListUser',
        params: { user_id: row.id },
        query: { name: row.nickname }
      })
    },
    // 去用户创建的协作空间列表
    toUserSpaceList(row) {
      this.$router.push({
        name: 'SpaceListUser',
        params: { user_id: row.id },
        query: { name: row.nickname }
      })
    },
    // 登录该用户
    toUserLogin(row) {
      this.$bus.modal.type = 'login_user'
      this.$bus.modal.show = true
      this.$bus.modal.obj = row
    },
    // 给用户打标签
    handleUserTags(row) {
      this.$bus.modal.type = 'user_tags'
      this.$bus.modal.show = true
      this.$bus.modal.obj = row
    },

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
        const res = await this.$api.User.getUserList({
          ...this.form_filter,
          qs: this.form.search,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.users || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
.form-filter {
  width: 3364x;
  padding: 8px 16px;
  box-sizing: border-box;
  .label {
    width: 150px;
    padding-right: 16px;
  }
}
.ivu-select-dropdown {
  max-height: 300px;
}
</style>
