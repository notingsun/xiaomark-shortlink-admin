/* 短链列表 */
<template>
  <div class="short-link-list itv-flex-v--fs">
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
  name: 'ShortLinkList',
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
            title: '短链名称',
            minWidth: 120,
            key: 'name'
          },
          {
            title: '短链',
            minWidth: 160,
            key: 'url'
          },
          {
            title: '创建时间',
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
            title: '跳转链接',
            minWidth: 120,
            tooltip: true,
            key: 'origin_url',
            render: (h, { row }) => {
              return (
                <Tooltip
                  content={row.origin_url}
                  placement="bottom"
                  max-width={200}
                >
                  <a
                    href={row.origin_url}
                    class="text--oneRow"
                    style="width: 120px;display: inline-block;"
                  >
                    {row.origin_url}
                  </a>
                </Tooltip>
              )
            }
          },
          {
            title: '访问次数',
            minWidth: 80,
            key: 'n_clicks'
          },
          {
            title: '访问人数',
            minWidth: 80,
            key: 'n_visitors'
          },
          {
            title: '访问IP数',
            minWidth: 80,
            key: 'n_ips'
          },
          {
            title: '创建者',
            minWidth: 160,
            key: 'user.nickname user.headimgurl',
            render: (h, { row }) => {
              return (
                <div
                  class="table-cell__nickname table-cell__nickname--click"
                  onClick={this.toUserDetail.bind(null, row)}
                >
                  <img src={row.user.headimgurl} class="img--headimgurl mr8" />
                  <span class="text--nickname">{row.user.nickname}</span>
                </div>
              )
            }
          }
        ],
        height: null // 表格的高度
      },
      form: {
        search: '',
        sort: 'time'
      },
      options: {
        sort: [
          { value: 'time', label: '按创建时间倒序' },
          { value: 'click', label: '按点击次数倒序' },
          { value: 'visitor', label: '按点击人数倒序' },
          { value: 'ip', label: '按点击IP数倒序' }
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
        params: { user_id: row.user.id },
        query: { name: row.user.nickname }
      })
    },
    async doGetData() {
      try {
        const params = {
          user_id: '', // 用户ID
          qs: this.form.search, // 查询字符串（名称/原始URL/短链接URL）
          order_by: this.form.sort
        }

        const res = await this.$api.Link.getShortLinkList({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.links || []
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
//.short-link-list {
//}
</style>
