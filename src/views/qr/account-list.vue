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
import tableMixins from '../table-mixins'
import { comboMap, mealMap } from './components/common-data'

export default {
  name: 'AccountList',
  mixins: [tableMixins],
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
            // title: '渠道码套餐',
            minWidth: 120,
            key: 'n_qrcodes',
            // eslint-disable-next-line
            renderHeader: (h) => {
              const options = [
                { value: '', name: '不限套餐' },
                { value: '0', name: '免费版' },
                { value: '1', name: '入门版' },
                { value: '2', name: '专业版' }
              ]
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
                    <span class="mr8">渠道码套餐</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return <span>{comboMap[row.combo]}</span>
            }
          },
          {
            title: '渠道码套餐到期时间',
            minWidth: 150,
            key: 'create_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.stop_date).split(' ')

              return (
                <div class="itv-flex--fs">
                  <p style="width: 70px;">{arr[0] || '-'}</p>
                  <itv-icon
                    title="编辑"
                    type="i-edit"
                    class="ml16 "
                    size="18"
                    color="primary"
                    onClick={this.handlePackage.bind(this, row)}
                  />
                </div>
              )
            }
          },
          {
            // title: '推送套餐',
            minWidth: 130,
            key: 'n_qrcodes',
            // eslint-disable-next-line
            renderHeader: (h) => {
              const options = [
                { value: '', name: '不限套餐' },
                { value: '1', name: '单条' },
                { value: '2', name: '包年' }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.meal === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.meal = item.value
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
                    <span class="mr8">推送套餐</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              let mealName =
                row.meal === 1 && row.n_push === 0 ? '-' : mealMap[row.meal]

              return (
                <span>
                  {mealName}
                  {row.meal === 1 && row.n_push ? `（余: ${row.n_push}）` : ''}
                </span>
              )
            }
          },
          {
            title: '推送套餐到期时间',
            minWidth: 150,
            // key: 'over_date',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.over_date).split(' ')

              return (
                <div class="itv-flex--fs">
                  <p style="width: 70px;">{arr[0] || '-'}</p>
                  <itv-icon
                    title="编辑"
                    type="i-edit"
                    class="ml16 "
                    size="18"
                    color="primary"
                    onClick={this.handlePackage2.bind(this, row)}
                  />
                </div>
              )
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
            title: '模版/客服消息',
            minWidth: 120,
            // key: 'n_leave'
            // eslint-disable-next-line no-unused-vars
            render: (h, { row }) => {
              return (
                <div>
                  <span>{row.n_template}</span>
                  <span> / </span>
                  <span>{row.n_custom}</span>
                </div>
              )
            }
          },
          {
            title: '绑定用户',
            key: 'nickname headimgurl',
            minWidth: 120,
            render: (h, { row }) => {
              return (
                <div
                  class="table-cell__nickname cp"
                  onClick={this.toUserDetail.bind(null, row)}
                >
                  <img src={row.user.headimgurl} class="img--headimgurl mr8" />
                  <div class="">{row.user.nickname}</div>
                </div>
              )
            }
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
            // title: '其他',
            // key: 'nickname',
            minWidth: 120,
            // eslint-disable-next-line
            renderHeader: (h) => {
              const options = [
                { value: '', name: '不限授权' },
                { value: '0', name: '未授权' },
                { value: '1', name: '已授权' }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.authorized === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.authorized = item.value
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
                    <span class="mr8">其他</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
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
            title: '主体名称',
            width: 160,
            tooltip: true,
            key: 'principal_name'
          },
          {
            title: '操作',
            width: 110,
            fixed: 'right',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <span title="查看二维码" class="mr8">
                    <itv-icon
                      type="i-qrcode"
                      size="20"
                      class="itv-btn__icon"
                      color={
                        (row.user || {}).last_login_time ? 'primary' : 'sub'
                      }
                      onClick={this.toAccountXList.bind(
                        null,
                        row,
                        'AccountQrList'
                      )}
                    />
                  </span>
                  <div
                    class={`itv-text--btn2 mr8 ${
                      (row.user || {}).final_login_time ? '' : 'sub'
                    }`}
                    title="查看模版消息"
                    onClick={this.toAccountXList.bind(
                      null,
                      row,
                      'AccountTemplateList'
                    )}
                  >
                    模
                  </div>
                  <div
                    class={`itv-text--btn2 ${
                      (row.user || {}).final_login_time ? '' : 'sub'
                    }`}
                    title="查看客服消息"
                    onClick={this.toAccountXList.bind(
                      null,
                      row,
                      'AccountServiceList'
                    )}
                  >
                    客
                  </div>
                </div>
              )
            }
          }
        ],
        height: null // 表格的高度
      },
      form: {
        search: '',
        combo: '',
        meal: '',
        authorized: '', // 公众号授权状态：0 - 取消授权，1 - 授权中
        sort: 'time'
      },
      options: {
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
    const { page, per_page } = this.$route.query
    const params = page && per_page ? { page, per_page } : ''

    this.form.search = this.$route.query.account || ''

    this.doGetData(params)
  },
  watch: {},
  methods: {
    // 去用户详情
    toUserDetail(row) {
      this.$router.push({
        name: 'UserListQr',
        params: { user_id: row.user.id },
        query: { name: row.user.nickname }
      })
    },
    // 去公众号二维码列表
    toAccountXList(row, name) {
      this.$router.push({
        name: name,
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
      this.domTableScrollTop()
      try {
        const params = {
          qs: this.form.search,
          meal: this.form.meal,
          combo: this.form.combo,
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
    },
    handlePackage(row) {
      // 屏蔽后该域名从当前列表消失
      this.$bus.modal2.type = 'package'
      this.$bus.modal2.show = true
      this.$bus.modal2.obj = row
      this.$bus.modal2.success_cb = this.doGetData
    },
    handlePackage2(row) {
      // 屏蔽后该域名从当前列表消失
      this.$bus.modal2.type = 'package2'
      this.$bus.modal2.show = true
      this.$bus.modal2.obj = row
      this.$bus.modal2.success_cb = this.doGetData
    }
  }
}
</script>

<style lang="less">
.account-list {
  @btn-size: 20px;
  .itv-text--btn2 {
    width: @btn-size;
    height: @btn-size;
    border-radius: 50%;
    text-align: center;
    background: @primary-color;
    line-height: @btn-size;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    &.sub {
      background: #c5c7ce;
    }
  }
}
</style>
