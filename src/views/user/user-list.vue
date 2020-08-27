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
import MixinsUserOperate from '../common/mixins-user-operate'
import { appMap, pluginListUser, apiKeyMap } from '../common/plugin-data'
import FilterUser from '../common/filter-user'
import { PACKAGES, API_PACKAGES } from '../../libs/consts'

export default {
  name: 'UserList',
  mixins: [tableMixins, MixinsUserOperate],
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
          {
            title: '套餐',
            width: 110,
            render: (h, { row }) => {
              const time = row.package_expire_date ? this.$PDo.Date.format(row.package_expire_date, 'y/m/d') : ''

              return (
                <Tooltip content={`过期时间: ${time}`} class="flex1 cp" disabled={!time}>
                  <div onClick={this.handlePackage.bind(this, row)}>
                    {PACKAGES[row.package]}
                    <itv-icon class="ml4" type="i-edit" size="16" color="primary" />
                  </div>
                </Tooltip>
              )
            }
          },
          {
            title: 'API 套餐',
            width: 116,
            render: (h, { row }) => {
              if (row.open_api) {
                const time = row.api_package_expire_date ? this.$PDo.Date.format(row.api_package_expire_date, 'y/m/d') : ''

                return (
                  <div class="itv-flex--fs">
                    <Tooltip content={`过期时间: ${time}`} class="flex1 cp" disabled={!time}>
                      <div class="mr8" onClick={this.handlePackage2.bind(this, row)}>
                        {API_PACKAGES[row.api_package]}
                        <itv-icon class="ml4" type="i-edit" size="16" color="primary" />
                      </div>
                    </Tooltip>
                    <span title="开启事件推送" style={`display: ${row.open_webhook ? 'inline' : 'none'};`} class="itv-text--grey4">
                      推送
                    </span>
                  </div>
                )
              }
              return <div class="flex1 itv-text--grey4">未开启</div>
            }
          },
          {
            // title: '普通 / 随机  / API  / 自定义域名',
            minWidth: 360,
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              return (
                <div class="itv-flex--fs" style="text-align: center;">
                  <div class="flex2 itv-flex--c">短链数量</div>
                  <Divider type="vertical" />
                  <div class="flex1">普通</div>
                  <Divider type="vertical" />
                  <div class="flex1">随机</div>
                  <Divider type="vertical" />
                  <div class="flex1" title="自定义域名">
                    自域名
                  </div>
                  <Divider type="vertical" />
                  <div class="flex1">API</div>
                </div>
              )
            },
            // key: 'n_visitors n_sub n_stay n_leave',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs" style="text-align: center;">
                  <div class="flex2 itv-flex--fs">
                    <div class="flex1" title={`今日: ${row.n_links_today}`}>
                      {this.$global.utils.countFormat.short(row.n_links_today)}
                    </div>
                    <span>/</span>
                    <div class="flex1" title={`累计: ${row.n_links}`}>
                      {this.$global.utils.countFormat.short(row.n_links)}
                    </div>
                  </div>
                  <Divider type="vertical" />
                  <div class="flex1" title={`普通: ${row.n_normal_links}`}>
                    {this.$global.utils.countFormat.short(row.n_normal_links)}
                  </div>
                  <Divider type="vertical" />
                  <div class="flex1" title={`随机: ${row.n_random_links}`}>
                    {this.$global.utils.countFormat.short(row.n_random_links)}
                  </div>
                  <Divider type="vertical" />
                  <div class="flex1" title={`自定义域名: ${row.n_cdm_links}`}>
                    {this.$global.utils.countFormat.short(row.n_cdm_links)}
                  </div>
                  <Divider type="vertical" />
                  <div class="flex1" title={`开放API创建的链接数量: ${row.n_api_links}`}>
                    {this.$global.utils.countFormat.short(row.n_api_links)}
                  </div>
                </div>
              )
            }
          },
          {
            title: '短链访问次数',
            align: 'center',
            minWidth: 140,
            key: 'n_links n_links_in_ws',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs" style="text-align: center;">
                  <div class="flex1" title="今日">
                    {row.pv_today}
                  </div>
                  <span>/</span>
                  <div class="flex1" title={`累计：${row.pv}`}>
                    {this.$global.utils.countFormat.short(row.pv)}
                  </div>
                </div>
              )
            }
          },
          {
            title: '创建空间',
            align: 'center',
            minWidth: 80,
            key: 'n_created_workspaces'
          },
          {
            title: '加入空间',
            align: 'center',
            minWidth: 80,
            key: 'n_joined_workspaces'
          },
          {
            title: '插件',
            minWidth: 190,
            align: 'center',
            // key: 'n_clicks',
            render: (h, { row }) => {
              let res = pluginListUser.map((item) => {
                return <img src={appMap[item].icon} class={`mr8 img--plugin--icon ${row[apiKeyMap[item]] ? '' : ' disabled'}`} title={appMap[item].title} />
              })

              return <div>{res}</div>
            }
          },
          {
            title: '激活时间',
            // key: 'active_date',
            minWidth: 120,
            render: (h, { row }) => {
              if (!row.active_date) {
                return <span class="itv-text--grey4">未激活</span>
              }
              return <div>{this.$PDo.Date.format(row.active_date, 'y/m/d')}</div>
            }
          },
          {
            title: '注册时间',
            minWidth: 180,
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <span class="mr8" title="是否关注服务号">
                    <itv-icon type="i-attention" style={`color: ${row.subscribe ? C_GREEN : C_GREY}`} size="24" />
                  </span>
                  <div>{this.$PDo.Date.format(row.create_time)}</div>
                </div>
              )
            }
          },
          {
            title: 'PC最近登录时间',
            minWidth: 180,
            render: (h, { row }) => {
              let res

              if (!row.pc_last_login_time) {
                res = <span class="itv-text--grey4">未登录</span>
              } else {
                res = <div>{this.$PDo.Date.format(row.pc_last_login_time)}</div>
              }
              return (
                <div class="itv-flex--fs">
                  <span class="mr8" title="是否网页登录">
                    <itv-icon type="i-pc" style={`color: ${row.pc_last_login_time ? C_ORANGE : C_GREY}`} size="24" />
                  </span>
                  {res}
                </div>
              )
            }
          },
          {
            title: '小程序最近登录时间',
            minWidth: 180,
            render: (h, { row }) => {
              let res

              if (!row.mp_last_login_time) {
                res = <span class="itv-text--grey4">未登录</span>
              } else {
                res = <div>{this.$PDo.Date.format(row.mp_last_login_time)}</div>
              }
              return (
                <div class="itv-flex--fs">
                  <span class="mr8" title="是否小程序登录">
                    <itv-icon type="i-wx" style={`color: ${row.mp_last_login_time ? C_BLUE : C_GREY}`} size="24" />
                  </span>
                  {res}
                </div>
              )
            }
          },
          {
            title: '来源',
            minWidth: 120,
            // key: 'source'
            render: (h, { row }) => {
              return <span class={row.source ? '' : 'itv-text--grey4'}>{row.source || '-'}</span>
            }
          },
          {
            title: '邮箱',
            minWidth: 150,
            tooltip: true,
            key: 'email'
            // render: (h, { row }) => {
            //   return <span class={row.email ? '' : 'itv-text--grey4'}>{row.email || '-'}</span>
            // }
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
            width: 90,
            fixed: 'right',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <Dropdown transfer transfer-class-name="user-list-dropdown">
                    <Button>操作</Button>
                    <DropdownMenu slot="list">
                      <div onClick={this.toUserLink.bind(null, row)}>
                        <DropdownItem>
                          <itv-icon type="i-detail" size="20" class="itv-btn__icon mr8" />
                          查看短链
                        </DropdownItem>
                      </div>
                      <div onClick={this.toUserSpaceList.bind(null, row)}>
                        <DropdownItem>
                          <itv-icon type="i-member" size="20" class="itv-btn__icon mr8" />
                          查看协作空间
                        </DropdownItem>
                      </div>
                      <div onClick={this.handleLoginUser.bind(null, row)}>
                        <DropdownItem>
                          <itv-icon type="i-eye" size="20" class="itv-btn__icon mr8" />
                          登录该用户
                        </DropdownItem>
                      </div>
                      <div onClick={this.handleUserTags.bind(null, row)}>
                        <DropdownItem disabled={!row.subscribe} title={row.subscribe ? '给用户打标签' : '无权限，该用户未关注公众号'}>
                          <itv-icon type="i-tag" size="20" class="itv-btn__icon mr8" style={`color: ${row.subscribe ? C_BLUE : C_GREY}`} />
                          给用户打标签
                        </DropdownItem>
                      </div>
                      <div onClick={this.handleGuestLinks.bind(null, row)}>
                        <DropdownItem>
                          <span class={'itv-text--btn4 mr8'} title="恢复游客链接" onClick={this.handleGuestLinks.bind(null, row)}>
                            游
                          </span>
                          恢复游客链接
                        </DropdownItem>
                      </div>
                      <div onClick={this.handleUserLogin.bind(null, row)}>
                        <DropdownItem>
                          <div class="itv-flex--fs">
                            <itv-icon type={row.enabled ? 'i-check' : 'i-delete2'} class="itv-btn__icon mr8" size="20" style={`color: ${row.enabled ? C_BLUE : C_ORANGE}`} />
                            {row.enabled ? '禁止' : '允许'}登录
                          </div>
                        </DropdownItem>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
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
.user-list-dropdown {
  .ivu-dropdown-item {
    line-height: 20px;
  }
}
</style>
