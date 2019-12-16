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
                <div class="table-cell__nickname">
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
            title: '注册时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 140,
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
            minWidth: this.$bus.view_width <= 1300 ? 120 : 140,
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
            title: '创建短链数量',
            minWidth: 120,
            key: 'n_links'
          },
          {
            title: '短链访问次数',
            minWidth: 120,
            key: 'n_clicks'
          },
          {
            title: '跳转链接数量',
            minWidth: 120,
            key: 'n_urls'
          },
          {
            title: '其他',
            minWidth: 130,
            key: 'subscribe',
            // align: 'center',
            render: (h, { row }) => {
              // return <span>{row.subscribe ? '是' : '否'}</span>
              //  <Icon title="是否可用" type="md-checkmark-circle" color={row.enabled ? C_GREEN : C_GREY} size="18"/>
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
      },
      // 获取表格数据的参数
      form: {
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
          { value: 'click', label: '按短链访问次数倒序' },
          { value: 'url', label: '按跳转链接数量倒序' }
        ]
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
        name: 'UserDetail',
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
          ...this.filter,
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
</style>
