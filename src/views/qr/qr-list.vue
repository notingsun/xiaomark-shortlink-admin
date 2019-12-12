/* 短链列表 */
<template>
  <div class="qr-list itv-flex-v--fs">
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
import tableMixins from '../table-mixins'

export default {
  name: 'QrList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    // const C_ORANGE = '#e88986'
    // const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

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
            key: 'stay_ratio',
            render: (h, { row }) => {
              return <span>{((row.stay_ratio || 0) * 100).toFixed(1)}%</span>
            }
          },
          {
            title: '所属公众号',
            minWidth: 280,
            key: 'platform',
            render: (h, { row }) => {
              /* eslint-disable */
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
              /* eslint-enable */
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
          qs: this.form.search,
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
//.qr-list {
//}
</style>
