/* 用户创建的短链页 */
<template>
  <div class="account-qr-list itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <Breadcrumb>
        <BreadcrumbItem class="cp" @click.native="$router.go(-1)"
          >公众号列表</BreadcrumbItem
        >
        <BreadcrumbItem>{{ $route.query.name }} 创建的二维码</BreadcrumbItem>
      </Breadcrumb>
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
import tableMixins from '../table-mixins'

export default {
  name: 'AccountQrList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const arr_reply = ['无', '文本消息', '图片消息', '图文消息']
    const arr_reply_status = ['未开始', '进行中', '进行中']

    return {
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '二维码名称',
            minWidth: 120,
            fixed: 'left',
            key: 'name',
            tooltip: true
          },
          {
            title: '创建时间',
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
            title: '回复类型',
            minWidth: 160,
            // key: 'reply',
            render: (h, { row }) => {
              return (
                <div>
                  <span>{arr_reply[row.reply] || '-'}</span>（
                  <span title="自动回复状态">
                    {arr_reply_status[row.reply_status] || '-'}
                  </span>
                  ）
                </div>
              )
            }
          },
          {
            title: '扫码人数',
            minWidth: 120,
            key: 'n_visitors'
          },
          {
            title: '扫码新增关注',
            minWidth: 120,
            key: 'n_sub'
          },
          {
            title: '当前留存人数',
            minWidth: 120,
            key: 'n_stay'
          },
          {
            title: '当前取关人数',
            minWidth: 120,
            key: 'n_leave'
          },
          {
            title: '当前留存率',
            minWidth: 120,
            // key: 'stay_ratio',
            render: (h, { row }) => {
              return <span>{((row.stay_ratio || 0) * 100).toFixed(1)}%</span>
            }
          }
        ],
        height: null // 表格的高度
      },
      // 获取表格数据的参数
      form: {
        sort: 'time'
      },
      options: {
        sort: [
          { value: 'time', label: '按创建时间倒序' },
          { value: 'visitor', label: '按扫码人数倒序' },
          { value: 'sub', label: '按扫码新增关注人数倒序' },
          { value: 'stay', label: '按当前留存人数倒序' },
          { value: 'leave', label: '按当前取关人数倒序' }
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
          platform_id: this.$route.params.account_id,
          order_by: this.form.sort
        }

        const res = await this.$api.Qr.getQrList({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.qrcodes || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.account-qr-list {
  .cp {
    cursor: pointer;
  }
}
</style>
