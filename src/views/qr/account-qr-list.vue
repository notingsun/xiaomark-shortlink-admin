/* 用户创建的短链页 */
<template>
  <div class="account-qr-list itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <Breadcrumb>
        <BreadcrumbItem class="cp" @click.native="$router.go(-1)">公众号列表</BreadcrumbItem>
        <BreadcrumbItem>{{ $route.query.name }} 创建的二维码</BreadcrumbItem>
      </Breadcrumb>
      <Select v-model="form.sort" style="width:150px" @on-change="doGetData" placement="bottom-end">
        <Option v-for="(item, index) in options.sort" :value="item.value" :key="index">{{ item.label }}</Option>
      </Select>
    </div>
    <!-- 表格 -->
    <Table :loading="loading" style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'
import { arr_reply, arr_reply_status_map } from './components/data-const'

export default {
  name: 'AccountQrList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    const C_GREY = '#c5c8ce'

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
            title: '回复类型',
            minWidth: 160,
            // key: 'reply',
            render: (h, { row }) => {
              const reply_status = arr_reply_status_map[row.reply_status] || {}

              return (
                <div class="itv-flex--fs" title={'自动回复状态:' + (reply_status.text || '-')}>
                  <div
                    style={{
                      background: reply_status.color,
                      width: '8px',
                      height: '8px',
                      'border-radius': '50%',
                      'margin-right': '8px'
                    }}
                  />
                  <div>{arr_reply[row.reply] || '-'}</div>
                </div>
              )
            }
          },
          {
            // title: '开启关注回复',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '开启', value: 1 },
                { name: '关闭', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.auto_switch === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.auto_switch = item.value
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
                    <span class="mr8">开启关注回复</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            minWidth: 100,
            key: 'stay_ratio',
            render: (h, { row }) => {
              return <Icon title={row.auto_switch ? '开启关注回复' : '停用关注回复'} type="md-checkmark-circle" color={row.auto_switch ? C_GREEN : C_GREY} size="20" />
            }
          },
          {
            // title: '扫码 / 扫码新增关注 / 当前留存 / 当前取关',
            minWidth: 300,
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              return (
                <div class="itv-flex--fs" style="text-align: center;">
                  <div class="flex1">扫码</div>
                  <Divider type="vertical" />
                  <div style="flex:1.5">扫码新增关注</div>
                  <Divider type="vertical" />
                  <div class="flex1">当前留存</div>
                  <Divider type="vertical" />
                  <div class="flex1">当前取关</div>
                </div>
              )
            },
            // key: 'n_visitors n_sub n_stay n_leave',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs" style="text-align: center;">
                  <div class="flex1" title="扫码人数">
                    {row.n_visitors}
                  </div>
                  <Divider type="vertical" />
                  <div style="flex:1.5" title="扫码新增关注">
                    {row.n_sub}
                  </div>
                  <Divider type="vertical" />
                  <div class="flex1" title="当前留存人数">
                    {row.n_stay}
                  </div>
                  <Divider type="vertical" />
                  <div class="flex1" title="当前取关人数">
                    {row.n_leave}
                  </div>
                </div>
              )
            }
          },
          {
            title: '当前留存率',
            align: 'center',
            minWidth: 120,
            key: 'stay_ratio',
            render: (h, { row }) => {
              return <span>{((row.stay_ratio || 0) * 100).toFixed(1)}%</span>
            }
          }
        ],
        height: null // 表格的高度
      },
      // 获取表格数据的参数
      form: {
        auto_switch: '',
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
          auto_switch: this.form.auto_switch,
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
