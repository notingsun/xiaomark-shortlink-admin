/* 用户列表-渠道码 */
<template>
  <div class="user-list-qr itv-flex-v--fs">
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
      <div class="itv-flex--fs">
        <Select
          v-model="form.bound"
          style="width:150px"
          @on-change="doGetData"
          class="mr8"
          placement="bottom-end"
        >
          <Option
            v-for="(item, index) in options.bound"
            :value="item.value"
            :key="index"
            >{{ item.label }}</Option
          >
        </Select>
        <Select
          v-model="form.authorized"
          style="width:150px"
          class="mr8"
          @on-change="doGetData"
          placement="bottom-end"
        >
          <Option
            v-for="(item, index) in options.authorized"
            :value="item.value"
            :key="index"
            >{{ item.label }}</Option
          >
        </Select>
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
  name: 'UserListQr',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    // const C_ORANGE = '#e88986'
    // const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

    return {
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '微信昵称',
            key: 'nickname headimgurl',
            width: 200,
            // fixed: 'left',
            // minWidth: 160,
            render: (h, { row }) => {
              return (
                <div class="table-cell__nickname">
                  <img src={row.headimgurl} class="img--headimgurl mr8" />
                  {/* eslint-disable */
                    row.sex === 0
                    ? '-'
                    : row.sex === 2
                    ? <itv-icon class="fs0" type="i-woman" size="20" />
                    : <itv-icon class="fs0" type="i-man" size="20" />
                  }
                  <Tooltip content={row.nickname} placement="top" transfer class="df">
                    <div class="text--oneRow ml8" style={{width: '120px'}}>{row.nickname}</div>
                  </Tooltip>
                </div>
              )
            }
          },
          {
            title: '地域',
            minWidth: 150,
            key: 'country province city',
            render: (h, { row }) => {
              const string = [row.country, row.province, row.city].filter(item => item).join('-')
              return (
                <Tooltip content={string} placement="top-start" transfer class="df">
                  <div  class="text-area">{string}</div>
                </Tooltip>
              )
            }
          },
          {
            title: '绑定公众号',
            minWidth: 280,
            key: 'platform',
            render: (h, { row }) => {
              return row.platform ? (
                  <div class="itv-flex--fs">
                    <img src={row.platform.head_img} class="img--headimgurl mr8" />
                    <div class='text--table--name' style={{width: '180px'}} title={row.platform.nick_name}>{row.platform.nick_name}</div>
                    <span class="mr8" title="是否已授权">
                      <itv-icon type="i-user" style={{color: (row.platform.authorized ? C_GREEN : C_GREY)}} size="24"/>
                    </span>
                    <span class="mr8" title="是否已授权必要的权限集">
                      <itv-icon type="i-key" style={{color: (row.platform.fully_authorized ? C_GREEN : C_GREY)}} size="24"/>
                    </span>
                    <span title="是否为已认证的服务号">
                      <itv-icon type="sub-FansManagement" style={{color: (row.platform.verified ? C_GREEN : C_GREY)}} size="24"/>
                    </span>
                  </div>
                ) : <span>未绑定</span>
            }
          },
          // 登录应用
          {
            title: ' ',
            minWidth: 120,
            key: 'wx_share',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '仅渠道码', value: 1 },
                { name: '仅小码推送', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.login_way === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.login_way = item.value
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
                    <span class="mr8">登录应用</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            // eslint-disable-next-line no-unused-vars
            render: (h, { row }) => {
              return (<div>
                <span class="mr8" title="小码渠道码"><itv-icon type="i-qrcode" size="20" color="sub" /></span>
                <span title="小码推送"><itv-icon type="menu-Push" size="20" color="primary"/></span>
              </div>)
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
            title: '是否关注服务号',
            width: 150,
            align: 'center',
            // key: '',
            render: (h, { row }) => {
              return (
                <Icon
                  title="是否关注服务号"
                  type="md-checkmark-circle"
                  color={row.subscribe ? C_GREEN : C_GREY}
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
        login_way: '*', // 登录应用
        search: '',
        bound: '*', // 公众号绑定状态：0 - 未绑定，1 - 已绑定
        authorized: '*', // 公众号授权状态：0 - 取消授权，1 - 授权中
        sort: 'time'
      },
      options: {
        sort: [
          { value: 'time', label: '按创建时间倒序' },
          { value: 'login', label: '按最近登录时间倒序' }
        ],
        bound: [
          { value: '*', label: '不限绑定' },
          { value: '0', label: '未绑定' },
          { value: '1', label: '已绑定' }
        ],
        authorized: [
          { value: '*', label: '不限授权' },
          { value: '0', label: '未授权' },
          { value: '1', label: '已授权' }
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
    // 去用户详情
    toUserDetail(row) {
      this.$router.push({
        name: 'ShortLinkListUser',
        params: { user_id: row.id },
        query: { name: row.nickname }
      })
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
          nickname: this.form.search,
          bound: this.form.bound, // 公众号绑定状态：0 - 未绑定，1 - 已绑定
          authorized: this.form.authorized, // 公众号授权状态：0 - 取消授权，1 - 授权中
          order_by: this.form.sort
        }
        
        const res = await this.$api.Qr.getUserListQr({
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
// .user-list-qr {
// }
</style>
