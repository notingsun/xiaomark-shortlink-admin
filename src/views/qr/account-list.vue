/* 短链列表 */
<template>
  <div class="account-list itv-flex-v--fs">
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
      <div>
        <Select
          v-model="form.authorized"
          style="width:150px"
          @on-change="doGetData"
          class="mr8"
          placement="bottom-end"
        >
          <Option
            v-for="(item, index) in options.authorized"
            :value="item.value"
            :key="index"
            >{{ item.label }}</Option
          >
        </Select>
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
  name: 'AccountList',
  mixins: [],
  props: {},
  components: {},
  data() {
    const C_GREEN = '#47cb89'
    // const C_ORANGE = '#e88986'
    // const C_BLUE = '#4F87FB'
    const C_GREY = '#c5c8ce'

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
            title: '二维码数量',
            minWidth: 120,
            key: 'n_qrcodes'
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
            title: '绑定用户',
            key: 'nickname headimgurl',
            minWidth: 120,
            render: (h, { row }) => {
              return (
                <div class="table-cell__nickname">
                  <img src={row.user.headimgurl} class="img--headimgurl mr8" />
                  <div class="">{row.user.nickname}</div>
                </div>
              )
            }
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
            title: '其他',
            // key: 'nickname',
            minWidth: 120,
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <span class="mr8" title="是否已授权">
                    <itv-icon
                      type="i-user"
                      style={{ color: row.authorized ? C_GREEN : C_GREY }}
                      size="24"
                    />
                  </span>
                  <span class="mr8" title="是否已授权必要的权限集">
                    <itv-icon
                      type="i-key"
                      style={{ color: row.fully_authorized ? C_GREEN : C_GREY }}
                      size="24"
                    />
                  </span>
                  <span title="是否为已认证的服务号">
                    <itv-icon
                      type="sub-FansManagement"
                      style={{ color: row.verified ? C_GREEN : C_GREY }}
                      size="24"
                    />
                  </span>
                </div>
              )
            }
          },
          {
            title: '操作',
            width: 60,
            fixed: 'right',
            render: (h, { row }) => {
              return (
                <span title="查看二维码">
                  <itv-icon
                    type="i-qrcode"
                    size="20"
                    class="itv-btn__icon"
                    onClick={this.toAccountQrList.bind(null, row)}
                  />
                </span>
              )
            }
          }
        ],
        height: null // 表格的高度
      },
      form: {
        search: '',
        authorized: '*', // 公众号授权状态：0 - 取消授权，1 - 授权中
        sort: 'time'
      },
      options: {
        authorized: [
          { value: '*', label: '不限授权' },
          { value: '0', label: '未授权' },
          { value: '1', label: '已授权' }
        ],
        sort: [
          { value: 'time', label: '按创建时间倒序' },
          { value: 'qrcode', label: '按二维码数量倒序' },
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
    this.$nextTick(() => {
      this.table.height = this.$refs.refTable.$el.clientHeight
    })
    this.doGetData()
  },
  watch: {},
  methods: {
    // 去公众号二维码列表
    toAccountQrList(row) {
      this.$router.push({
        name: 'AccountQrList',
        params: { account_id: row.id },
        query: { name: row.nick_name }
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
          qs: this.form.search,
          authorized: this.form.authorized,
          order_by: this.form.sort
        }

        const res = await this.$api.Qr.getAccountList({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.platforms || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
//.account-list {
//}
</style>
