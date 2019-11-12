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
      <Select v-model="form.sort" style="width:150px" @on-change="doGetData">
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
    return {
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
                  <span class="text--nickname">{row.nickname}</span>
                </div>
              )
            }
          },
          {
            title: '性别',
            key: 'sex',
            width: 80,
            render: (h, { row }) => {
              /* eslint-disable */
              return (
                row.sex === 0
                ? '-'
                : row.sex === 2
                ? <itv-icon type="i-woman" size="20" />
                : <itv-icon type="i-man" size="20" />
              )
            }
          },
          {
            title: '注册时间',
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
          },
          {
            title: '是否关注服务号',
            minWidth: 120,
            key: 'subscribe',
            // align: 'center',
            render: (h, { row }) => {
              return <span>{row.subscribe ? '是' : '否'}</span>
            }
          },
          {
            title: '地域',
            minWidth: 120,
            key: 'country province city',
            render: (h, { row }) => {
              const string = [row.country, row.province, row.city].filter(item => item).join('-')
              return <span>{string}</span>
            }
          },
          {
            title: '是否可用',
            minWidth: 100,
            key: 'enabled',
            render: (h, { row }) => {
              return <span>{row.enabled ? '是' : '否'}</span>
            }
          },
          {
            title: '最近登录时间',
            minWidth: 120,
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
            title: '操作',
            width: 80,
            fixed: 'right',
            render: (h, { row }) => {
              return <itv-icon title="查看短链" type="i-detail" size="20" class="itv-btn__icon" onClick={this.toUserDetail.bind(null, row)}/>
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
    // 去用户详情
    toUserDetail(row) {
      this.$router.push({
        name: 'UserDetail',
        params: { user_id: row.id },
        query: { name: row.nickname }
      })
    },

    async doGetData() {
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
    }
  }
}
</script>

<style lang="less">
// .user-list {
// }
</style>
