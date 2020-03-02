/* 用户创建的短链页 */
<template>
  <div class="service-list itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div>
        <Breadcrumb v-show="$route.query.name">
          <BreadcrumbItem class="cp" @click.native="$router.go(-1)"
            >公众号列表</BreadcrumbItem
          >
          <BreadcrumbItem
            >{{ $route.query.name }} 推送的客服消息</BreadcrumbItem
          >
        </Breadcrumb>
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
import tableMixins from '../table-mixins'

export default {
  name: 'ServiceList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const arr_reply = ['无', '文本消息', '图片消息', '图文消息']
    // const arr_reply_status = ['未开始', '进行中', '进行中']

    this.columns = [
      {
        title: '推送名称',
        minWidth: 120,
        key: 'name',
        tooltip: true
      },
      {
        title: '服务号',
        minWidth: 180,
        // key: 'platform',
        render: (h, { row }) => {
          /* eslint-disable */
              return (
                <div class="itv-flex--fs cp" onClick={this.handleToAccount.bind(null, row)}>
                  <img src={row.head_img} class="img--headimgurl mr8" />
                  <Tooltip content={row.nick_name} placement="top" transfer class="df">
                    <div class='text--oneRow' style={{width: '120px'}}>{row.nick_name}</div>
                  </Tooltip>
                </div>
              )
              /* eslint-enable */
        }
      },
      {
        title: '实际发送时间',
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
        title: '消息类型',
        minWidth: 160,
        // key: 'reply',
        render: (h, { row }) => {
          return (
            <div>
              <span>{arr_reply[row.reply] || '-'}</span>（
              <span>{'文本/图片/图文' || '-'}</span>）
            </div>
          )
        }
      },
      {
        title: '送达的人数',
        minWidth: 120,
        key: 'n_visitors'
      },
      {
        title: '操作',
        minWidth: 120,
        // key: 'n_sub',
        render: (h, { row }) => {
          return (
            <span
              class="itv-btn__text"
              onClick={this.handleDetail.bind(null, row)}
            >
              查看推送详情
            </span>
          )
        }
      }
    ]

    return {
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [],
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
  watch: {
    '$route.name': {
      handler: function() {
        console.log('immediate')
        this.initColumns()
      },
      immediate: true
    }
  },
  methods: {
    initColumns() {
      if (this.$route.params.account_id) {
        console.log('aaaa')
        const columns = JSON.parse(JSON.stringify(this.columns))

        columns.splice(1, 1)

        console.log(columns)

        this.table.columns = columns
      } else {
        console.log('nnn')
        this.table.columns = this.columns
      }
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
          platform_id: this.$route.params.account_id || '',
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
    },
    handleDetail() {},
    handleToAccount(row) {
      console.log(row)
      this.$router.push({
        name: 'AccountList',
        query: {
          account: '小码短链接'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.service-list {
  .cp {
    cursor: pointer;
  }
}
</style>
