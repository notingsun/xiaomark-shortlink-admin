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
export default {
  name: 'UserList',
  mixins: [],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_ORANGE = '#e88986'
    const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

    return {
      // img_default: require('../../assets/earth.png'),
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
            render: (h, { row, index }) => {
              return (
                <div class="table-cell__nickname">
                  <img
                    src={row.headimgurl}
                    class="img--headimgurl mr8"
                    onError={this.handleImgError.bind(null, row, index)}
                  />
                  {/* eslint-disable */
                    row.sex === 0
                    ? '-'
                    : row.sex === 2
                    ? <itv-icon class="fs0" type="i-woman" size="20" />
                    : <itv-icon class="fs0" type="i-man" size="20" />
                  }
                  <Tooltip content={row.nickname} placement="top" transfer class="df">
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
                    <itv-icon type="i-attention" style={{color: (row.subscribe ? C_GREEN : C_GREY)}} size="24"/>
                  </span>
                  <span class="mr8" title="是否网页登录">
                    <itv-icon type="i-pc" style={{color: (row.sa_openid ? C_ORANGE : C_GREY)}} size="24"/>
                  </span>
                  <span title="是否小程序登录">
                    <itv-icon type="i-wx" style={{color: (row.mp_openid ? C_BLUE : C_GREY)}} size="24"/>
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
              const string = [row.country, row.province, row.city].filter(item => item).join('-')
              return (
                <Tooltip content={string} placement="top-start" transfer class="df">
                  <div  class="text-area">{string}</div>
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
                  <itv-icon type="i-detail" size="20" class="itv-btn__icon" onClick={this.toUserDetail.bind(null, row)}/>
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
    this.$nextTick(() => {
      this.table.height = this.$refs.refTable.$el.clientHeight
    })
    this.doGetData()
  },
  watch: {},
  methods: {
    handleImgError(row, index) {
      // console.log(row, index)
      // this.table.data[index].headimgurl = this.img_default
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
      try {
        const params = {
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
// .user-list {
// }
</style>
