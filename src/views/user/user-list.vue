/* 用户列表 */
<template>
  <div class="user-list itv-flex-v--fs">
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
      <div>
        <!-- 筛选 -->
        <Dropdown
          trigger="custom"
          :visible="show_drawer"
          placement="bottom-end"
          @on-clickoutside="show_drawer = false"
        >
          <Button
            class="mr16"
            @click="show_drawer = true"
            style="width: 90px;"
            :loading="loading"
            >筛选</Button
          >
          <DropdownMenu slot="list">
            <div class="form-filter">
              <div
                class="itv-flex--fs mb8"
                v-for="(item, i) in form_filter"
                :key="i"
              >
                <div class="label">{{ item.name }}</div>
                <i-input
                  v-model="item.value"
                  type="number"
                  style="width: 150px;"
                >
                  <Select v-model="item.type" style="width:60px" slot="prepend">
                    <Option
                      v-for="item in options.filter"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </i-input>
              </div>
              <div class="itv-flex--sb mt24">
                <Button class="mr16" @click="handleFilterReset">清空</Button>
                <div>
                  <Button class="mr16" @click="show_drawer = false"
                    >取消</Button
                  >
                  <Button type="primary" @click="handleFilter">确认</Button>
                </div>
              </div>
            </div>
          </DropdownMenu>
        </Dropdown>
        <!-- 排序 -->
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
  name: 'UserList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_ORANGE = '#e88986'
    const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

    return {
      // img_default: require('../../assets/earth.png'),
      // modal: {
      //   titleMap: {
      //     ws_creator: '设置创建协作空间权限',
      //     enabled: '设置用户登录权限'
      //   },
      //   type: '', // 对话框类型 [ ws_creator:用户协作空间创建权限 、 enabled:用户拉黑 ]
      //   show: false, // 显示对话框
      //   obj: null // 操作对象
      // },
      show_drawer: false, // 显示抽屉
      value: '',
      type: '',
      form_filter: [
        {
          name: '最近登录时间距今的天数',
          key: 'last_login',
          value: '',
          type: '*'
        },
        {
          name: '过去30天登录天数',
          key: 'login_30',
          value: '',
          type: '*'
        },
        {
          name: '过去30天创建链接数',
          key: 'link_30',
          value: '',
          type: '*'
        },
        {
          name: '过去30天链接访问数',
          key: 'click_30',
          value: '',
          type: '*'
        },
        {
          name: '过去30天导出图片数',
          key: 'share1_30',
          value: '',
          type: '*'
        },
        {
          name: '过去30天小程序内分享数',
          key: 'share2_30',
          value: '',
          type: '*'
        }
      ],
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
                <div
                  class="table-cell__nickname cp"
                  onClick={this.openUserDetail.bind(null, row)}
                >
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
            title: '最近登录时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
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
            title: '短链访问次数',
            minWidth: 120,
            key: 'n_clicks'
          },
          {
            title: '创建短链数量',
            minWidth: 160,
            key: 'n_links',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <p style="width: 30%">{row.n_links}</p>
                  <div class="itv-flex--v ml8 flex1">
                    <p>
                      <span style="color: #afafaf;">普通：</span>
                      {row.n_normal_links}
                    </p>
                    <p>
                      <span style="color: #afafaf;">随机：</span>
                      {row.n_random_links}
                    </p>
                  </div>
                </div>
              )
            }
          },
          // {
          //   title: '普通跳转链接数量',
          //   minWidth: 140,
          //   key: 'n_normal_links'
          // },
          // {
          //   title: '随机跳转链接数量',
          //   minWidth: 140,
          //   key: 'n_random_links'
          // },
          {
            // title: '协作空间',
            minWidth: 180,
            // key: 'ws_creator',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '可创建', value: 1 },
                { name: '不可创建', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.ws_creator === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.ws_creator = item.value
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
                    <span class="mr8">是否可创建协作空间</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <itv-icon
                    class="cp"
                    title={
                      row.ws_creator ? '可以创建协作空间' : '不可以创建协作空间'
                    }
                    type={row.ws_creator ? 'i-stop' : 'i-start'}
                    size="20"
                    style={`color: ${row.ws_creator ? C_GREEN : C_GREY}`}
                    onClick={() => {
                      this.$bus.modal.type = 'ws_creator'
                      this.$bus.modal.show = true
                      this.$bus.modal.obj = row
                      this.$bus.modal.success_cb = this.doGetData
                    }}
                  />
                  <div
                    class="itv-flex--v ml8"
                    style={`color: ${row.ws_creator ? '' : '#afafaf'}`}
                  >
                    <p
                      class="ml8 cp"
                      title={`已创建 ${row.n_ws_created} 个协作空间`}
                    >
                      <span style="color: #afafaf;">创建：</span>
                      {row.n_ws_created}
                    </p>
                    <p
                      class="ml8 cp"
                      title={`已加入 ${row.n_ws_joined} 个协作空间`}
                    >
                      <span style="color: #afafaf;">加入：</span>
                      {row.n_ws_joined}
                    </p>
                  </div>
                </div>
              )
            }
          },
          {
            // title: 'API权限',
            minWidth: 120,
            // key: 'enabled',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '有API权限', value: 1 },
                { name: '没有API权限', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.api_auth === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.api_auth = item.value
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
                    <span class="mr8">API权限</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <itv-icon
                    class="cp"
                    title={row.api_auth ? '有API权限' : '没有API权限'}
                    type={row.api_auth ? 'i-stop' : 'i-start'}
                    size="20"
                    style={`color: ${row.api_auth ? C_GREEN : C_GREY}`}
                    onClick={() => {
                      this.$bus.modal.type = 'open_api_domain'
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
            // title: '是否可登录',
            minWidth: 120,
            // key: 'enabled',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '可登录', value: 1 },
                { name: '不可登录', value: 0 }
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
                  <div class="cp">
                    <span class="mr8">是否可登录</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
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
            title: '来源',
            minWidth: 120,
            key: 'source'
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
            title: 'openid',
            minWidth: 120,
            key: 'sa_openid',
            tooltip: true
          },
          {
            title: '操作',
            width: 140,
            fixed: 'right',
            render: (h, { row }) => {
              return (
                <div>
                  <span title="查看短链">
                    <itv-icon
                      type="i-detail"
                      size="20"
                      class="itv-btn__icon mr8"
                      onClick={this.toUserDetail.bind(null, row)}
                    />
                  </span>
                  <span title="查看协作空间">
                    <itv-icon
                      type="i-member"
                      size="20"
                      class="itv-btn__icon mr8"
                      onClick={this.toUserSpaceList.bind(null, row)}
                    />
                  </span>
                  <span title="登录该用户">
                    <itv-icon
                      type="i-eye"
                      size="20"
                      class="itv-btn__icon mr8"
                      onClick={this.toUserLogin.bind(null, row)}
                    />
                  </span>
                  <span title="给用户打标签">
                    <itv-icon
                      type="i-tag"
                      size="20"
                      class="itv-btn__icon"
                      onClick={this.handleUserTags.bind(null, row)}
                    />
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
        api_auth: '',
        enabled: '',
        ws_creator: '',
        search: '',
        sort: 'time'
      },
      options: {
        filter: [
          { value: '*', label: '不限' },
          { value: 'eq', label: '等于' },
          { value: 'lt', label: '小于' },
          { value: 'gt', label: '大于' }
        ],
        sort: [
          { value: 'time', label: '按创建时间倒序' },
          { value: 'login', label: '按最近登录时间' },
          { value: 'link', label: '按创建短链数量倒序' },
          { value: 'normal_link', label: '按普通跳转链接数量倒序' },
          { value: 'random_link', label: '按随机跳转链接数量倒序' },
          { value: 'click', label: '按短链访问次数倒序' },
          { value: 'ws_created', label: '按创建的协作空间数量倒序' },
          { value: 'ws_joined', label: '按加入的协作空间数量倒序' }
        ]
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    const { page, per_page } = this.$route.query
    const params = page && per_page ? { page, per_page } : ''

    this.form.search = this.$route.query.name || ''
    this.doGetData(params)
  },
  watch: {},
  methods: {
    // 打开用户详情窗口
    openUserDetail(row) {
      this.$bus.drawer_user.show = true
      this.$bus.drawer_user.id = row.id
    },
    // handleImgError(row, index) {
    // console.log(row, index)
    // this.table.data[index].headimgurl = this.img_default
    // },
    // 重置筛选
    handleFilterReset() {
      this.form_filter.forEach((item, i) => {
        this.form_filter[i].value = ''
        this.form_filter[i].type = '*'
      })
      console.log(this.form_filter)
    },
    // 筛选
    handleFilter() {
      this.show_drawer = false
      let filter = {}

      this.form_filter.forEach((item) => {
        filter[item.key] =
          item.type === '*' ? null : `${item.type}${item.value}`
      })
      this.filter = filter
      this.doGetData()
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
        const params = {
          ...this.filter,
          api_auth: this.form.api_auth,
          enabled: this.form.enabled,
          ws_creator: this.form.ws_creator,
          nickname: this.form.search,
          order_by: this.form.sort
        }

        const res = await this.$api.User.getUserList({
          ...params,
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
