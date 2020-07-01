/* 跳转链接数据 */
<template>
  <div class="target-link-statistic itv-flex-v--fs">
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Input clearable v-model="form.search" placeholder="请输入" style="width: 300px" @on-enter="doGetData" @on-clear="doGetData" class="mr8" />
        <Button type="primary" @click="doGetData">搜索</Button>
      </div>
      <div>
        <Button class="mr16" @click="$router.push({ name: 'TargetLinkBlack' })">查看网站黑名单</Button>
        <Select v-model="form.sort" style="width:150px" @on-change="doGetData" placement="bottom-end">
          <Option v-for="(item, index) in options.sort" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <!-- 表格 -->
    <Table :loading="loading" style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'

export default {
  name: 'TargetLinkStatistic',
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
            title: '域名',
            minWidth: 240,
            key: 'hostname netloc favicon',
            render: (h, { row }) => {
              // <img src={row.favicon} class="img--headimgurl mr8" />
              return (
                <div class="table-cell__nickname">
                  <div class="img--favicon__wrap">
                    <img src={row.favicon || require('../../assets/earth.png')} class="img--favicon" />
                  </div>
                  <span>{row.netloc}</span>
                </div>
              )
            }
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
            title: '对应短链数量',
            minWidth: 120,
            key: 'n_links',
            // eslint-disable-next-line
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '大于0', value: 1 },
                { name: '等于0', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.has_link === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.has_link = item.value
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
                    <span class="mr8">对应短链数量</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            }
          },
          {
            title: '访问次数',
            minWidth: 120,
            key: 'pv'
          },
          {
            title: '是否可用',
            minWidth: 120,
            key: 'enabled',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '可用', value: 1 },
                { name: '不可用', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.enabled === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.enabled = item.value
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
                    <span class="mr8">是否可用</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <itv-icon
                  class="cp"
                  title={row.enabled ? '可用' : '不可用'}
                  type={row.enabled ? 'i-stop' : 'i-start'}
                  size="20"
                  style={{ color: `${row.enabled ? C_GREEN : C_GREY}`, display: row.enabled ? 'block' : 'none' }}
                  onClick={() => {
                    this.$bus.modal.type = 'enabled_target_link'
                    this.$bus.modal.show = true
                    this.$bus.modal.obj = { ...row, editable: false }
                    this.$bus.modal.success_cb = this.doGetData
                  }}
                />
              )
            }
          },
          {
            title: '操作',
            width: 100,
            render: (h, { row }) => {
              return (
                <div>
                  <span class="itv-btn__text" onClick={this.handleFavicon.bind(null, row)}>
                    更新图标
                  </span>
                </div>
              )
            }
          }
        ],
        height: null // 表格的高度
      },
      form: {
        has_link: '',
        enabled: '',
        search: '',
        sort: 'time'
      },
      options: {
        sort: [
          { value: 'time', label: '按创建时间排序' },
          { value: 'n_links', label: '按链接数量倒序' },
          { value: 'pv', label: '按链接访问次数倒序' }
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
    handleFavicon(row) {
      this.$Modal.confirm({
        title: '确认更新图标吗？',
        okText: '确认',
        cancelText: '取消',
        loading: true,
        onOk: () => {
          this.doUpdateFavicon(
            row,
            (favicon) => {
              this.$Modal.remove()
              favicon && (this.table[row['_index']].favicon = favicon)
            },
            () => {
              this.$Modal.remove()
            }
          )
        }
      })
    },
    // 更新图标
    async doUpdateFavicon(row, cbSuccess, cbError) {
      try {
        await this.$api.Link.putTargetLinkFavicon(row.id) // 最慢要30s

        cbSuccess()
      } catch (e) {
        // console.error(e)
        cbError()
      }
    },

    // 获取表格的数据
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
          has_link: this.form.has_link,
          enabled: this.form.enabled,
          qs: this.form.search,
          order_by: this.form.sort
        }

        const res = await this.$api.Link.getTargetLinkStatistic({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.websites || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
// .target-link-statistic {
// }
</style>
