/* 短链数据 */
<template>
  <div class="short-link-statistic itv-flex-v--fs">
    <!-- TODO 历史总计没有算 -->
    <div class="header mb16 itv-flex--sb">
      <DatePicker
        type="daterange"
        :options="options"
        placement="bottom-end"
        placeholder="请选择"
        style="width: 200px"
        v-model="form.date"
        @on-change="doGetData"
        :clearable="false"
        format="yyyy/MM/dd"
      ></DatePicker>
    </div>
    <!-- 表格 -->
    <Table
      style="flex: 1;"
      ref="refTable"
      :height="table.height"
      :columns="table.columns"
      :data="table.data"
    />
  </div>
</template>

<script>
export default {
  name: 'ShortLinkStatistic',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      // 获取表格数据的参数
      form: {
        date: [
          this.$PDo.Date.getTimeCalculation(-29, 'y/m/d'),
          this.$PDo.Date.getTimeCalculation(0, 'y/m/d')
        ]
      },
      options: {
        shortcuts: [
          {
            text: '最近30天',
            formart: this.getTimeCalculation,
            value() {
              return [this.formart(-29), this.formart(0)]
            }
          },
          {
            text: '最近60天',
            formart: this.getTimeCalculation,
            value() {
              return [this.formart(-59), this.formart(0)]
            }
          },
          {
            text: '最近90天',
            formart: this.getTimeCalculation,
            value() {
              return [this.formart(-89), this.formart(0)]
            }
          }
        ]
      },
      table: {
        data: [],
        columns: [
          {
            title: '日期',
            minWidth: 120,
            key: 'date',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.date, 'y/m/d')}</span>
            }
          },
          {
            title: '登录用户数',
            minWidth: 120,
            key: 'n_users'
          },
          {
            title: '新建短链数',
            minWidth: 120,
            key: 'n_links'
          },
          {
            title: '新建跳转短链数',
            minWidth: 120,
            key: 'n_urls'
          },
          {
            title: '短链访问人数',
            minWidth: 120,
            key: 'n_visitors'
          },
          {
            title: '短链访问次数',
            minWidth: 120,
            key: 'n_clicks'
          },
          {
            title: '新建分组数',
            minWidth: 120,
            key: 'n_groups'
          }
        ],
        height: null // 表格的高度
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
    // 时间格式化
    getTimeCalculation(v) {
      return new Date(this.$PDo.Date.getTimeCalculation(v, 'y/m/d'))
    },

    // 获取数据
    async doGetData() {
      try {
        const stats_date = this.form.date
          .map((v) => this.$PDo.Date.format(v.toJSON(), 'y-m-d'))
          .join('~')

        const res = await this.$api.Link.getShortLinkStatistic({
          stats_date
        })

        this.table.data = res.stats || []
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
//.short-link-statistic {
//}
</style>
