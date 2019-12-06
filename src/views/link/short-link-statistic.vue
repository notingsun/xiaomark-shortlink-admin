/* 短链数据 */
<template>
  <div class="short-link-statistic itv-flex-v--fs pr">
    <Spin fix v-if="loading"></Spin>
    <!-- 时间选择器 -->
    <div class="header mb16 itv-flex--sb">
      <DatePicker
        type="daterange"
        :options="options"
        placement="bottom-start"
        placeholder="请选择"
        style="width: 200px"
        v-model="form.date"
        @on-change="doGetTableData"
        :clearable="false"
        format="yyyy/MM/dd"
      ></DatePicker>
    </div>
    <!-- 图表的 -->
    <div>
      <itv-chart-line
        :width="chartWidth"
        :legendOptions="legendOptions"
        :chartData="chartData"
        :settings="chartSettings"
        :unSelectedArr="chartData.unSelectedArr"
      />
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
    // 这个需要和chartExtend同步
    this.legendOptions = [
      {
        isGroup: true,
        data: [
          {
            name: '访问次数',
            color: '#5b89dd',
            bg: '#EEF3FF'
          },
          {
            name: '访问人数',
            color: '#862FB7',
            bg: '#F6EEFF'
          },
          {
            name: '访问IP数',
            color: '#F676A8',
            bg: '#FFEEEE'
          }
        ]
      },
      {
        isGroup: true,
        data: [
          {
            name: '新建短链数',
            color: '#a64d7f',
            bg: '#ffecfc'
          },
          {
            name: '新建跳转链接数',
            color: '#4d8ba6',
            bg: '#edfaff'
          }
        ]
      },
      {
        isGroup: true,
        data: [
          {
            name: '登录用户数',
            color: '#a66d4d',
            bg: '#fff3ec'
          },
          {
            name: '注册用户数',
            color: '#96a64d',
            bg: '#f7ffec'
          },
          {
            name: '新建分组数',
            color: '#086ca2',
            bg: '#EEF3FF'
          }
        ]
      }
    ]

    this.chartSettings = {
      labelMap: {
        n_clicks: '访问次数',
        n_ips: '访问IP数',
        n_visitors: '访问人数',
        n_users_active: '登录用户数',
        n_users_new: '注册用户数',
        n_links: '新建短链数',
        n_urls: '新建跳转链接数',
        n_groups: '新建分组数'
      }
    }

    this.chartWidth = this.$bus.view_width - 260 - 460 + 'px'

    return {
      // legendOptions: legendOptions,
      chartData: {
        // 注意：这个顺序需要和legendOptions顺序保持一致
        columns: [
          'date',
          'n_clicks',
          'n_ips',
          'n_visitors',
          'n_links',
          'n_urls',
          'n_users_active',
          'n_users_new',
          'n_groups'
        ],
        rows: [],
        unSelectedArr: [
          '注册用户数',
          '登录用户数',
          '新建短链数',
          '新建跳转链接数',
          '新建分组数'
        ]
      },

      loading: true,
      // 获取表格数据的参数
      form: {
        date: [
          this.$PDo.Date.getTimeCalculation(-6, 'y/m/d'),
          this.$PDo.Date.getTimeCalculation(0, 'y/m/d')
        ]
      },
      options: {
        shortcuts: [
          {
            text: '最近7天',
            formart: this.getTimeCalculation,
            value() {
              return [this.formart(-6), this.formart(0)]
            }
          },
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
            title: '注册用户数',
            minWidth: 120,
            key: 'n_users_new'
          },
          {
            title: '登录用户数',
            minWidth: 120,
            key: 'n_users_active'
          },
          {
            title: '新建短链数',
            minWidth: 120,
            key: 'n_links'
          },
          {
            title: '新建跳转链接数',
            minWidth: 120,
            key: 'n_urls'
          },
          {
            title: '短链访问人数',
            minWidth: 120,
            // key: 'n_visitors',
            render: (h, { row }) => {
              return (
                <span>
                  {this.$global.utils.countFormat.three(row.n_visitors)}
                </span>
              )
            }
          },
          {
            title: '短链访问次数',
            minWidth: 120,
            // key: 'n_clicks',
            render: (h, { row }) => {
              return (
                <span>
                  {this.$global.utils.countFormat.three(row.n_clicks)}
                </span>
              )
            }
          },
          {
            title: '短链访问IP数',
            minWidth: 120,
            // key: 'n_clicks',
            render: (h, { row }) => {
              return (
                <span>{this.$global.utils.countFormat.three(row.n_ips)}</span>
              )
            }
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
    this.doGetTableData()
  },
  watch: {},
  methods: {
    // 时间格式化
    getTimeCalculation(v) {
      return new Date(this.$PDo.Date.getTimeCalculation(v, 'y/m/d'))
    },

    // 获取数据
    async doGetTableData() {
      this.loading = true
      try {
        const stats_date = this.form.date
          .map((v) => this.$PDo.Date.format(v.toJSON(), 'y-m-d'))
          .join('~')

        const res = await this.$api.Link.getShortLinkStatistic({
          stats_date
        })

        this.chartData.rows = []
        this.$nextTick(() => {
          this.chartData.rows = res.stats || []
        })

        this.table.data = JSON.parse(JSON.stringify(res.stats || [])).reverse()
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
// .short-link-statistic {
// }
</style>
