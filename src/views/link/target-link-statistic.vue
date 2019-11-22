/* 跳转链接数据 */
<template>
  <div class="target-link-statistic itv-flex-v--fs">
    <div class="header mb16 itv-flex--sb">
      <div class="header__search"></div>
      <Select v-model="form.sort" style="width:150px" @on-change="doGetData">
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
            minWidth: 100,
            key: 'enabled',
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
            width: 100,
            // fixed: 'right',
            render: (h, { row }) => {
              return (
                // <Poptip transfer>
                //   <div class="api" slot="content">
                //     <div style="margin-top: 8px;margin-bottom: 8px;">
                //       确认{row.enabled ? '停用' : '启用'}吗？
                //     </div>
                //     <div style="text-align: right;">
                //       <Button type="text">取消</Button>
                //       <Button type="primary" size="small">
                //         确认
                //       </Button>
                //     </div>
                //   </div>
                //   <span type="itv-btn__text">
                //     {row.enabled ? '停用' : '启用'}
                //   </span>
                // </Poptip>
                <span
                  class="itv-btn__text"
                  onClick={this.handleEnable.bind(null, row)}
                >
                  {row.enabled ? '停用' : '启用'}
                </span>
              )
            }
          }
        ],
        height: null // 表格的高度
      },
      form: {
        sort: 'time'
      },
      options: {
        sort: [
          { value: 'time', label: '按域名排序' },
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

        console.log(params)

        await this.$api.Link.putTargetLinkEnable(params)

        cbFun()
      } catch (e) {
        console.error(e)
      }
    },
    async doGetData() {
      try {
        const params = {
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
    }
  }
}
</script>

<style scoped lang="less">
//.target-link-statistic {
//}
</style>
