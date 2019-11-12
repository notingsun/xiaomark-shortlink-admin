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
    return {
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '域名',
            minWidth: 120,
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
                  <span class="text--nickname">{row.netloc}</span>
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
              return <span>{row.enabled ? '是' : '否'}</span>
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
          { value: 'time', label: '按创建时间倒序' },
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
