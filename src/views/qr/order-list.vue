/* 订单列表 */
<template>
  <div class="order-list itv-flex-v--fs">
    <Tabs v-model="order_type">
      <TabPane label="渠道码" name="qr"></TabPane>
      <TabPane label="推送" name="push"></TabPane>
    </Tabs>
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
import { comboMap, mealMap } from './components/common-data'

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
      loading: true,
      order_type: 'qr',
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
            // title: '所选套餐',
            minWidth: 100,
            // key: 'combo',
            // eslint-disable-next-line
            renderHeader: (h) => {
              const optionsMap = {
                qr: [
                  { name: '全部', value: '' },
                  { name: '入门版', value: 1 },
                  { name: '专业版', value: 2 }
                ],
                push: [
                  { name: '全部', value: '' },
                  { name: '付费版', value: 2 },
                  { name: '单条额度', value: 1 }
                ]
              }
              const options = optionsMap[this.order_type] || []
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.combo === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.combo = item.value
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
                    <span class="mr8">所选套餐</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <div>
                  {/* eslint-disable-next-line prettier/prettier */}
                  <span>{this.order_type === 'qr' ? comboMap[row.combo] : this.order_type === 'push' ? mealMap[row.meal] : '' }</span>
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
            // title: '支付结果',
            minWidth: 100,
            // key: 'pay',
            // eslint-disable-next-line
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '已支付', value: 'SUCCESS' },
                { name: '未支付', value: 'NOTPAY' }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.result === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.result = item.value
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
                    <span class="mr8">支付结果</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              const icon = resMap[row.result] || {}

              // eslint-disable-next-line prettier/prettier
              return row.real_prize > 0 ? <Tag color={icon.color}>{icon.name}</Tag> : <span>-</span>
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
              return (
                <span>
                  {this.order_type === 'qr' ? row.start_date : row.begin_date}
                </span>
              )
            }
          },
          {
            title: '套餐截止日期',
            minWidth: 120,
            // key: 'stop_date',
            render: (h, { row }) => {
              return (
                <span>
                  {this.order_type === 'qr' ? row.stop_date : row.over_date}
                </span>
              )
            }
          },
          {
            title: '下次可续费日期',
            minWidth: 120,
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
  watch: {
    order_type() {
      // 重置初始化星系
      this.form.combo = ''
      this.form.result = ''
      this.doGetData()
    }
  },
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
        let res = {}

        if (this.order_type === 'qr') {
          res = await this.$api.Qr.getQrderList({
            combo: this.form.combo,
            result: this.form.result,
            ...this.$global.utils.pagination.params()
          })
          this.table.data = res.orders || []
        } else if (this.order_type === 'push') {
          res = await this.$api.Qr.getPushQrderList({
            meal: this.form.combo,
            result: this.form.result,
            ...this.$global.utils.pagination.params()
          })
          this.table.data = res.indents || []
        }

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
