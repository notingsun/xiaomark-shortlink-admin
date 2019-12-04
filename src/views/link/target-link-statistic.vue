/* 跳转链接数据 */
<template>
  <div class="target-link-statistic itv-flex-v--fs">
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
export default {
  name: 'TargetLinkStatistic',
  mixins: [],
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
                    <img
                      src={row.favicon || require('../../assets/earth.png')}
                      class="img--favicon"
                    />
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
            key: 'n_links'
          },
          {
            title: '访问次数',
            minWidth: 120,
            key: 'n_clicks'
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
                  <div>
                    <span class="mr8">是否可用</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <Icon
                  title="是否关注服务号"
                  type="md-checkmark-circle"
                  color={row.enabled ? C_GREEN : C_GREY}
                  size="20"
                />
              )
            }
          },
          {
            title: '操作',
            width: 150,
            render: (h, { row }) => {
              return (
                <div>
                  <span
                    class="itv-btn__text mr16"
                    onClick={this.handleEnable.bind(null, row)}
                  >
                    {row.enabled ? '停用' : '启用'}
                  </span>
                  <span
                    class="itv-btn__text"
                    onClick={this.handleFavicon.bind(null, row)}
                  >
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
        enabled: '',
        search: '',
        sort: 'time'
      },
      options: {
        sort: [
          { value: 'time', label: '按创建时间排序' },
          { value: 'link', label: '按链接数量倒序' },
          { value: 'click', label: '按链接访问次数倒序' }
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
    handleFavicon(row) {
      this.$Modal.confirm({
        title: '确认更新图标吗？',
        okText: '确认',
        cancelText: '取消',
        loading: true,
        onOk: () => {
          this.doUpdateFavicon(row, (favicon) => {
            this.$Modal.remove()
            favicon && (this.table[row['_index']].favicon = favicon)
          })
        }
      })
    },
    // 更新图标
    async doUpdateFavicon(row, cbFun) {
      try {
        await this.$api.Link.putTargetLinkFavicon(row.id) // 最慢要30s

        cbFun()
      } catch (e) {
        console.error(e)
      }
    },
    handleEnable(row) {
      this.$Modal.confirm({
        title: `确认${row.enabled ? '停用' : '启用'}该网站吗？`,
        okText: '确认',
        cancelText: '取消',
        loading: true,
        onOk: () => {
          this.doPutEnable(row, () => {
            this.$Modal.remove()
            this.doGetData()
          })
        }
      })
    },
    // 修改可用
    async doPutEnable(row, cbFun) {
      try {
        const params = {
          id: row.id,
          enabled: !row.enabled
        }

        await this.$api.Link.putTargetLinkEnable(params)

        cbFun()
      } catch (e) {
        console.error(e)
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
      try {
        const params = {
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
.target-link-statistic {
  .enabled_active {
    color: @primary-color;
  }
  .enabled_item {
    padding: 0 !important;
  }
  .enabled_span {
    padding: 7px 16px;
    display: inline-block;
  }
}
</style>
