/* 订单列表 */
<template>
  <div class="order-list itv-flex-v--fs">
    <div class="header mb16 itv-flex--sb">
      <div></div>
      <order-filter v-model="form_order_filter" @submit="doGetData" :loading="loading" />
    </div>
    <!-- 表格 -->
    <Table :loading="loading" style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'
import OrderFilter from './components/order-filter'
import { ORDER_OPTION_MAP } from './components/common-data'

export default {
  name: 'QrderList',
  components: { OrderFilter },
  mixins: [tableMixins],
  props: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_ORANGE = '#e88986'
    // const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

    const resMap = {
      SUCCESS: {
        name: '支付成功',
        color: C_GREEN,
        icon: 'md-checkmark-circle'
      },
      PAYERROR: {
        name: '支付失败',
        color: C_ORANGE,
        icon: 'md-close-circle'
      },
      NOTPAY: {
        name: '未支付',
        color: C_GREY,
        icon: 'md-close-circle'
        // md-remove-circle
      }
    }

    return {
      form_order_filter: {},
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '公众号',
            minWidth: 180,
            fixed: 'left',
            // key: 'platform',
            render: (h, { row }) => {
              /* eslint-disable */
              return (
                <div class="itv-flex--fs">
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
            title: '所选套餐',
            minWidth: 140,
            render: (h, { row }) => {
              const genre = ORDER_OPTION_MAP.genre[row.genre]
              const combo = ORDER_OPTION_MAP.combo[row.combo]
              const meal = ORDER_OPTION_MAP.meal[row.meal]
              const revert = ORDER_OPTION_MAP.revert[row.revert]
              const menu = ORDER_OPTION_MAP.menu[row.menu]

              return (
                <div>
                  {/* eslint-disable-next-line prettier/prettier */}
                  <span>{genre}{row.genre !== 0 ? '-' : ''}{combo || meal||revert ||menu}</span>
                </div>
              )
            }
          },
          {
            title: '应付金额',
            minWidth: 100,
            key: 'deal_prize'
          },
          {
            title: '抵扣金额',
            minWidth: 100,
            key: 'deduction'
          },
          {
            title: '实付金额',
            minWidth: 100,
            key: 'real_prize'
          },
          {
            title: '支付结果',
            minWidth: 100,
            render: (h, { row }) => {
              const icon = resMap[row.result] || {}

              return <Tag color={icon.color}>{icon.name}</Tag>
            }
          },
          {
            title: '创建时间',
            minWidth: 130,
            // key: 'create_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.create_time).split(' ')

              return (
                <span>
                  {arr[0]}
                  <br />
                  {arr[1]}
                </span>
              )
            }
          },
          {
            title: '完成时间',
            minWidth: 130,
            // key: 'finish_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.finish_time).split(' ')

              return (
                <span>
                  {arr[0]}
                  <br />
                  {arr[1]}
                </span>
              )
            }
          },
          {
            title: '订单号',
            minWidth: 120,
            key: 'code'
            // tooltip: true
          },
          {
            title: '套餐开始日期',
            minWidth: 120,
            // key: 'start_date',
            render: (h, { row }) => {
              return <span>{row.start_date}</span>
            }
          },
          {
            title: '套餐截止日期',
            minWidth: 120,
            // key: 'stop_date',
            render: (h, { row }) => {
              return <span>{row.stop_date}</span>
            }
          },
          {
            title: '下次可续费日期',
            minWidth: 120,
            // key: 'renew_date'
            render: (h, { row }) => {
              return <span>{row.renew_date || '-'}</span>
            }
          },
          {
            title: '用户',
            minWidth: 180,
            // key: 'platform',
            render: (h, { row }) => {
              /* eslint-disable */
              return (
                <div class="itv-flex--fs">
                  <img src={row.headimgurl} class="img--headimgurl mr8" />
                  <Tooltip content={row.nickname} placement="top" transfer class="df">
                    <div class='text--oneRow' style={{width: '120px'}}>{row.nickname}</div>
                  </Tooltip>
                </div>
              )
              /* eslint-enable */
            }
          }
        ],
        height: null // 表格的高度
      },
      form: {
        combo: '', // 套餐
        result: '' // 支付结果
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    // this.doGetData()
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
        let res = await this.$api.Qr.getQrderList({
          ...this.form_order_filter,
          ...this.$global.utils.pagination.params()
        })

        this.table.data = res.orders || []

        this.table.total = res.total
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
//.order-list {
//}
</style>
