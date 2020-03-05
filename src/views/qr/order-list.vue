/* 订单列表 */
<template>
  <div class="order-list itv-flex-v--fs">
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
  name: 'QrderList',
  mixins: [tableMixins],
  props: {},
  components: {},
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
        name: '支付成功',
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
            minWidth: 100,
            // key: 'combo',
            render: (h, { row }) => {
              return (
                <div>
                  <span>{row.combo === 1 ? '入门' : '专业'}</span>
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
            // key: 'pay',
            render: (h, { row }) => {
              const icon = resMap[row.result] || {}

              return <span class="mr8">{icon.name || '-'}</span>
            }
          },
          // {
          //   title: '支付方式',
          //   minWidth: 100,
          //   // key: 'pay',
          //   render: (h, { row }) => {
          //     const icon = resMap[row.result]

          //     /* eslint-disable */
          //     // type="md-remove-circle"
          //     return (
          //       <div class="itv-flex--fs">
          //         <span class="mr8">{row.combo === 1 ? '微信' : '-'}</span>
          //         {
          //           row.combo === 1 && icon && <Icon
          //             title={icon.name}
          //             type={icon.icon}
          //             color={icon.color}
          //             size="20"
          //           />
          //         }
          //       </div>
          //     )
          //     /* eslint-enable */
          //   }
          // },
          {
            title: '创建时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            // key: 'create_time',
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
            title: '完成时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            // key: 'finish_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.finish_time).split(' ')

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
            title: '订单号',
            minWidth: 120,
            key: 'code'
            // tooltip: true
          },
          {
            title: '套餐开始日期',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            key: 'start_date'
          },
          {
            title: '套餐截止日期',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            key: 'stop_date'
          },
          {
            title: '下次可续费日期',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            key: 'renew_date'
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
                    <div class='text--oneRow' style={{width: '120px'}}>{row.nick_name}</div>
                  </Tooltip>
                </div>
              )
              /* eslint-enable */
            }
          }
        ],
        height: null // 表格的高度
      }
      // form: {
      //   search: '',
      //   sort: 'time'
      // },
      // options: {
      //   sort: [
      //     { value: 'time', label: '按创建时间倒序' },
      //     { value: 'visitor', label: '按扫码人数倒序' },
      //     { value: 'sub', label: '按扫码新增关注人数倒序' },
      //     { value: 'stay', label: '按当前留存人数倒序' },
      //     { value: 'leave', label: '按当前取关人数倒序' }
      //   ]
      // }
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
          // qs: this.form.search,
          // order_by: this.form.sort
        }

        const res = await this.$api.Qr.getQrderList({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.orders || []
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
