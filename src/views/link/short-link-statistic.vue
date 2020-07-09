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
      <itv-chart-line :width="chartWidth" :legendOptions="legendOptions" :chartData="chartData" :settings="chartSettings" :unSelectedArr="chartData.unSelectedArr" />
    </div>
    <!-- 表格 -->
    <Table style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" :border="false" />
  </div>
</template>

<script>
// import testData from './test'
import { colorMap } from '../../components/chart/color'

export default {
  name: 'ShortLinkStatistic',
  mixins: [],
  props: {},
  components: {},
  data() {
    const labelMap = {
      n_users: '注册用户数',
      n_users_active: '激活用户数',
      n_users_login: '活跃用户数',
      n_users_login_pc: 'PC端登录用户数',
      n_users_login_mp: '小程序登录用户数',
      n_links: '链接数',
      n_links_user: '属于用户的链接数',
      n_links_workspace: '属于协作空间的链接数',
      n_links_s1: '来自网站的链接数',
      n_links_s2: '来自小程序的链接数',
      n_links_s3: '来自浏览器插件的链接数',
      n_links_s4: '来自开放API的链接数',
      n_links_random: '随机跳转链接数',
      n_links_custom: '自定义域名链接数',
      pv: '访问次数',
      uv: '访问人数',
      uip: '访问IP数'
    }
    const selectedKeyArr = ['pv', 'uv', 'uip']
    const unSelectedArr = []

    Object.keys(labelMap).forEach((key) => {
      if (!selectedKeyArr.includes(key)) {
        unSelectedArr.push(labelMap[key])
      }
    })

    // 这个需要和chartExtend同步
    this.legendOptions = [
      {
        groupName: '访问数据',
        data: [
          {
            isGroup: true,
            data: [
              {
                name: labelMap['pv'],
                showName: '访问次数',
                color: colorMap['访问数据'][0][0],
                bg: colorMap['访问数据'][0][1]
              },
              {
                name: labelMap['uv'],
                showName: '访问人数',
                color: colorMap['访问数据'][1][0],
                bg: colorMap['访问数据'][1][1]
              },
              {
                name: labelMap['uip'],
                showName: '访问IP数',
                color: colorMap['访问数据'][2][0],
                bg: colorMap['访问数据'][2][1]
              }
            ]
          }
        ]
      },
      {
        groupName: '用户数',
        data: [
          {
            isGroup: true,
            data: [
              {
                name: labelMap['n_users'],
                showName: '注册',
                color: colorMap['用户数'][0][0],
                bg: colorMap['用户数'][0][1]
              },
              {
                name: labelMap['n_users_active'],
                showName: '激活',
                color: colorMap['用户数'][1][0],
                bg: colorMap['用户数'][1][1]
              },
              {
                name: labelMap['n_users_login'],
                showName: '活跃',
                color: colorMap['用户数'][2][0],
                bg: colorMap['用户数'][2][1]
              }
            ]
          },
          {
            isGroup: true,
            data: [
              {
                name: labelMap['n_users_login_pc'],
                showName: 'PC登录',
                color: colorMap['用户数'][3][0],
                bg: colorMap['用户数'][3][1]
              },
              {
                name: labelMap['n_users_login_mp'],
                showName: '小程序登录',
                color: colorMap['用户数'][4][0],
                bg: colorMap['用户数'][4][1]
              }
            ]
          }
        ]
      },
      {
        groupName: '链接数',
        data: [
          {
            isGroup: true,
            data: [
              {
                name: labelMap['n_links'],
                showName: '链接数',
                color: colorMap['链接数'][0][0],
                bg: colorMap['链接数'][0][1]
              },
              {
                name: labelMap['n_links_user'],
                showName: '属于用户',
                color: colorMap['链接数'][1][0],
                bg: colorMap['链接数'][1][1]
              },
              {
                name: labelMap['n_links_workspace'],
                showName: '属于协作空间',
                color: colorMap['链接数'][2][0],
                bg: colorMap['链接数'][2][1]
              }
            ]
          },
          {
            isGroup: true,
            data: [
              {
                name: labelMap['n_links_s1'],
                showName: '网站',
                color: colorMap['链接数'][3][0],
                bg: colorMap['链接数'][3][1]
              },
              {
                name: labelMap['n_links_s2'],
                showName: '小程序',
                color: colorMap['链接数'][4][0],
                bg: colorMap['链接数'][4][1]
              },
              {
                name: labelMap['n_links_s3'],
                showName: '浏览器插件',
                color: colorMap['链接数'][5][0],
                bg: colorMap['链接数'][5][1]
              },
              {
                name: labelMap['n_links_s4'],
                showName: '开放API',
                color: colorMap['链接数'][6][0],
                bg: colorMap['链接数'][6][1]
              }
            ]
          },
          {
            isGroup: true,
            data: [
              {
                name: labelMap['n_links_random'],
                showName: '随机跳转',
                color: colorMap['链接数'][7][0],
                bg: colorMap['链接数'][7][1]
              },
              {
                name: labelMap['n_links_custom'],
                showName: '自定义域名',
                color: colorMap['链接数'][8][0],
                bg: colorMap['链接数'][8][1]
              }
            ]
          }
        ]
      }
    ]

    this.chartSettings = {
      labelMap
    }

    this.chartWidth = this.$bus.view_width - 260 - 460 + 'px'

    return {
      // legendOptions: legendOptions,
      chartData: {
        // 注意：这个顺序需要和legendOptions顺序保持一致
        columns: [
          'date',
          'pv',
          'uv',
          'uip',
          'n_users',
          'n_users_active',
          'n_users_login',
          'n_users_login_pc',
          'n_users_login_mp',
          'n_links',
          'n_links_user',
          'n_links_workspace',
          'n_links_s1',
          'n_links_s2',
          'n_links_s3',
          'n_links_s4',
          'n_links_random',
          'n_links_custom'
        ],
        rows: [],
        unSelectedArr
      },

      loading: true,
      // 获取表格数据的参数
      form: {
        date: [this.$PDo.Date.getTimeCalculation(-6, 'y/m/d'), this.$PDo.Date.getTimeCalculation(0, 'y/m/d')]
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
            className: 'itv-date',
            key: 'date',
            fixed: 'left',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.date, 'y/m/d')}</span>
            }
          },
          {
            title: '用户数',
            align: 'center',
            className: 'itv-user-h',
            children: [
              {
                title: '注册',
                minWidth: 80,
                className: 'itv-user',
                key: 'n_users'
              },
              {
                title: '激活',
                minWidth: 80,
                className: 'itv-user',
                key: 'n_users_active'
              },
              {
                title: '活跃',
                minWidth: 80,
                className: 'itv-user',
                key: 'n_users_login'
              },

              {
                title: 'PC登录',
                minWidth: 80,
                className: 'itv-user2',
                key: 'n_users_login_pc'
              },
              {
                title: '小程序登录',
                minWidth: 100,
                className: 'itv-user2',
                key: 'n_users_login_mp'
              }
            ]
          },
          {
            title: '链接数',
            align: 'center',
            className: 'itv-link-h',
            children: [
              {
                title: '总链接数',
                minWidth: 100,
                className: 'itv-link',
                key: 'n_links'
              },
              {
                title: '所属空间',
                align: 'center',
                className: 'itv-space-h',
                children: [
                  {
                    title: '我的短链',
                    minWidth: 80,
                    className: 'itv-space',
                    key: 'n_links_user'
                  },
                  {
                    title: '协作空间',
                    minWidth: 80,
                    className: 'itv-space',
                    key: 'n_links_workspace'
                  }
                ]
              },
              {
                title: '所属来源',
                align: 'center',
                className: 'itv-source-h',
                children: [
                  {
                    title: '网站',
                    minWidth: 80,
                    className: 'itv-source',
                    key: 'n_links_s1'
                  },
                  {
                    title: '小程序',
                    minWidth: 80,
                    className: 'itv-source',
                    key: 'n_links_s2'
                  },
                  {
                    title: '浏览器插件',
                    minWidth: 100,
                    className: 'itv-source',
                    key: 'n_links_s3'
                  },
                  {
                    title: '开放API',
                    minWidth: 80,
                    className: 'itv-source',
                    key: 'n_links_s4'
                  }
                ]
              },
              {
                title: '其他',
                align: 'center',
                className: 'itv-other-h',
                children: [
                  {
                    title: '随机跳转',
                    minWidth: 100,
                    className: 'itv-other',
                    key: 'n_links_random'
                  },
                  {
                    title: '自定义域名',
                    minWidth: 100,
                    className: 'itv-other',
                    key: 'n_links_custom'
                  }
                ]
              }
            ]
          },
          {
            title: '短链访问',
            className: 'itv-visit-h',
            align: 'center',
            children: [
              {
                title: '访问人数',
                className: 'itv-visit',
                minWidth: 100,
                render: (h, { row }) => {
                  return <span>{this.$global.utils.countFormat.three(row.uv)}</span>
                }
              },
              {
                title: '访问次数',
                className: 'itv-visit',
                minWidth: 100,
                render: (h, { row }) => {
                  return <span>{this.$global.utils.countFormat.three(row.pv)}</span>
                }
              },
              {
                title: '访问IP数',
                className: 'itv-visit',
                minWidth: 100,
                render: (h, { row }) => {
                  return <span>{this.$global.utils.countFormat.three(row.uip)}</span>
                }
              }
            ]
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
        const stats_date = this.form.date.map((v) => this.$PDo.Date.format(v.toJSON(), 'y-m-d')).join('~')

        const res = await this.$api.Link.getShortLinkStatistic({
          stats_date
        })
        // const res = testData

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

<style lang="less">
@t1-100: #eff3fc;
@t1-200: #d6e2f7;
@t1-300: #bdd0f1;
@t1-400: #8cace7;
@t1-500: #5b89dd;

.ivu-table {
  .itv-date {
    background: @t1-100;
  }
  // 用户数
  th.itv-user-h {
    background: @t1-300;
  }
  .itv-user {
    background: @t1-200;
  }
  .itv-user2 {
    background: @t1-100;
  }
  // 链接数
  th.itv-link-h {
    background: @t1-400;
  }
  // 总链接数
  .itv-link {
    background: @t1-400;
  }
  // 所属空间
  th.itv-space-h {
    background: @t1-300;
  }
  .itv-space {
    background: @t1-200;
  }
  // 所属来源
  th.itv-source-h {
    background: @t1-200;
  }
  .itv-source {
    background: @t1-100;
  }
  // 其他
  th.itv-other-h {
    background: @t1-300;
  }
  .itv-other {
    background: @t1-200;
  }
  // 短链访问
  th.itv-visit-h {
    background: @t1-200;
  }
  .itv-visit {
    background: @t1-100;
  }
}
</style>
