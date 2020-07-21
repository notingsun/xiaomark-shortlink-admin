import echarts from 'echarts'

const colorUvArr = ['#5b89dd', '#862FB7', '#F676A8', '#4d8ba6', '#a66d4d', '#96a64d', '#086ca2', '#5b89dd', '#862FB7', '#F676A8']

export default {
  data() {
    this.chartWidth = this.$bus.view_width - 260 - 360 + 'px'
    return {
      chart_loading: true,
      base_columns: ['week', 'n_users_stay', 'n_users', 'n_users_active', 'active_rate', 'register_rate', 'uv'], // 固定有的那几列
      columns: [],
      legend_selected_isSingle: false,
      legend_selected: {}, // 图表需要.系列的显示情况
      legend_group_arr: [], // 系列的分组.用于切换显示
      legend_group_index: '0', // 显示哪一个系列的分组
      series_data_map: {}, // 每系列的值
      series_map: {}, // 每系列的配置
      series_key_arr: [], // 系列的keyname
      series: [] // 图表需要.series
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 处理图表数据等
    dealSetChart() {
      this.chart_loading = true
      if (this.myChart) {
        echarts.dispose(document.getElementById('chartPvStatistic'))
        this.myChart = null
      }
      // 注意下面的执行顺序不能轻易改变
      this.columns = this.dealGetSeriesColumns()
      this.series_key_arr = this.columns.slice(1)
      this.series_map = this.dealGetSeriesMap()
      this.series_data_map = this.dealGetSeriesDataMap()
      this.legend_group_arr = this.dealGetLegendGroupArr()
      this.legend_selected = this.dealGetLegendSelected()
      console.log({ legend_selected: this.legend_selected })
      this.series = this.dealGetSeries()
      this.doDraw()
    },
    // 计算第x周用户留存对应的keyname
    dealGetWeekRateKey(i) {
      return `itv_week_user_${i}`
    },
    // 计算系列columns
    dealGetSeriesColumns() {
      let columns = [...this.base_columns]

      for (let i = this.startWeek; i <= this.maxWeek; i++) {
        columns.push(this.dealGetWeekRateKey(i))
      }

      return columns
    },
    // 计算series每个系列图表配置信息
    dealGetSeriesMap() {
      let seriesMap = {}

      const baseMap = {
        n_users: {
          name: '注册用户数',
          yAxisIndex: 0,
          dataName: 'n_users',
          color: colorUvArr[0],
          type: 'line',
          smooth: true,
          z: 10
        },
        n_users_active: {
          name: '激活用户数',
          yAxisIndex: 0,
          dataName: 'n_users_active',
          color: colorUvArr[1],
          type: 'line',
          smooth: true,
          z: 10
        },
        n_users_stay: {
          name: '留存用户数',
          yAxisIndex: 0,
          dataName: 'n_users_stay',
          color: colorUvArr[2],
          type: 'line',
          smooth: true,
          z: 10
        },
        register_rate: {
          name: '注册率',
          yAxisIndex: 1,
          dataName: 'register_rate',
          color: colorUvArr[0],
          type: 'line',
          smooth: false,
          z: 1
        },
        active_rate: {
          name: '激活率',
          yAxisIndex: 1,
          dataName: 'active_rate',
          color: colorUvArr[1],
          type: 'line',
          smooth: false,
          z: 1
        },
        uv: {
          name: '访问人数',
          yAxisIndex: 2,
          dataName: 'uv',
          color: '#eff3fc',
          type: 'line',
          smooth: true,
          z: 0,
          areaStyle: {}
        }
      }

      this.series_key_arr.forEach((key) => {
        let v = baseMap[key]

        // 新增：第x周用户留存
        if (!v) {
          let arr = key.split('_')
          const week = arr[arr.length - 1].replace('_', '')

          v = {
            name: `第${week}周`,
            xAxisIndex: 1,
            yAxisIndex: this.isRate ? 1 : 0,
            dataName: key,
            color: colorUvArr[week % 10],
            type: 'line',
            areaStyle: {
              color: colorUvArr[week % 10] + 30
            },
            smooth: false,
            z: 1
          }
        }

        seriesMap[key] = v
      })

      return seriesMap
    },
    // 计算series每个系列的值
    dealGetSeriesDataMap() {
      let series_data_map = {}

      this.columns.forEach((cName) => {
        series_data_map[cName] = []
      })

      let week_i = 0

      this.series_key_arr.forEach((key) => {
        if (!this.base_columns.includes(key)) {
          let arr = (this.table.data[week_i] || {}).n_users_stay_weeks_later

          let n_users_active = (this.table.data[week_i] || {}).n_users_active

          if (this.isRate) {
            arr = arr.map((v) => {
              if (typeof v !== 'undefined') {
                // eslint-disable-next-line prettier/prettier
                return (v / n_users_active * 100).toFixed(2)
              }
              return v
            })
          }

          series_data_map[key] = arr
          week_i += 1
        }
      })
      this.table.data.forEach((data_week) => {
        this.columns.forEach((cName) => {
          let v = 0

          if (cName.includes('itv_week')) {
            return
          }
          v = data_week[cName] || 0

          if (cName.includes('_rate')) {
            if (typeof v !== 'undefined') {
              v = (v * 100).toFixed(2)
            }
          }
          series_data_map[cName].push(v)
        })
      })

      return series_data_map
    },
    // 计算 legend_group_arr 系列的分组显示配置
    dealGetLegendGroupArr() {
      let legend_group_arr = [
        {
          name: '用户数',
          yAxisIndex: 0,
          xAxisIndex: 0,
          select: '*',
          arr: ['n_users_stay', 'n_users', 'n_users_active', 'uv']
        },
        {
          name: '注册率',
          yAxisIndex: 1,
          xAxisIndex: 0,
          select: '*',
          arr: ['active_rate', 'register_rate', 'uv']
        }
      ]

      // 第x周用户留存系列
      let arr = []

      this.series_key_arr.forEach((key) => {
        if (!this.base_columns.includes(key)) {
          arr.push(key)
        }
      })

      if (arr.length !== 0) {
        legend_group_arr.push({
          name: `用户留存${this.isRate ? '率' : ''}`,
          xAxisIndex: 1,
          yAxisIndex: this.isRate ? 1 : 0,
          select: [arr[0]],
          isSingle: true,
          arr
        })
      }

      return legend_group_arr
    },
    // 计算 legend_selected 系列的显示
    dealGetLegendSelected() {
      // 选中的
      let legend_selected = {}

      let group_select_arr = (this.legend_group_arr[this.legend_group_index] || {}).select || []

      if (group_select_arr === '*') {
        this.legend_group_arr[this.legend_group_index].select = this.legend_group_arr[this.legend_group_index].arr || []
        group_select_arr = (this.legend_group_arr[this.legend_group_index] || {}).select
      }

      this.series_key_arr.forEach((name) => {
        legend_selected[this.series_map[name].name] = group_select_arr.includes(name)
      })

      return legend_selected
    },
    // 计算 series
    dealGetSeries() {
      return this.series_key_arr.map((name) => {
        const obj = this.series_map[name]

        return {
          ...obj,
          xAxisIndex: obj.xAxisIndex || 0,
          data: this.series_data_map[obj.dataName],
          showSymbol: false,
          itemStyle: {
            borderWidth: 2,
            color: obj.color
          },
          lineStyle: {
            color: obj.color
          }
        }
      })
    },
    // 绘制图表
    doDraw() {
      const group_info = this.legend_group_arr[this.legend_group_index] || {}

      const option = {
        legend: {
          show: false,
          selected: this.legend_selected
        },
        grid: {
          top: 40,
          bottom: 40
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff', // 背景色
          textStyle: {
            color: '#666'
          },
          extraCssText: 'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);',
          position: function(point) {
            // 固定在顶部
            return [point[0] + 10, '10%']
          }
        },
        xAxis: [
          // 第几周
          {
            type: 'category',
            data: this.series_data_map.week || [],
            show: group_info.xAxisIndex === 0,
            splitLine: {
              show: false
            },
            boundaryGap: true,
            axisTick: {
              alignWithLabel: false
            },
            // 坐标轴线
            axisLine: {
              show: true,
              lineStyle: {
                color: '#EBECF3'
              }
            },
            // 坐标刻度标签
            axisLabel: {
              interval: 'auto',
              color: '#C5C7CE',
              // fontWeight: 'bold',
              fontFamily: 'Microsoft YaHei',
              fontSize: 12,
              align: 'center'
            }
          },
          // 第几周留存
          {
            type: 'category',
            position: 'bottom',
            show: group_info.xAxisIndex === 1,
            data: this.series_data_map.week.map((item, i) => `第${i + 1}周`),
            splitLine: {
              show: false
            },
            boundaryGap: true,
            axisTick: {
              alignWithLabel: false
            },
            // 坐标轴线
            axisLine: {
              show: true,
              lineStyle: {
                color: '#EBECF3'
              }
            },
            // 坐标刻度标签
            axisLabel: {
              interval: 'auto',
              color: '#C5C7CE',
              // fontWeight: 'bold',
              fontFamily: 'Microsoft YaHei',
              fontSize: 12,
              align: 'center'
            }
          }
        ],
        yAxis: [
          // 第1个有轴，值
          {
            type: 'value',
            name: '',
            show: group_info.yAxisIndex === 0,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#ddd'
              }
            },
            // 坐标轴线
            axisLine: {
              show: false
            },
            // 坐标刻度
            axisTick: {
              show: false,
              inside: true,
              lineStyle: {
                color: '#aeb7c4',
                width: 2
              }
            },
            // 坐标刻度标签
            axisLabel: {
              color: '#C5C7CE',
              fontFamily: 'Microsoft YaHei',
              fontSize: 12,
              align: 'right'
            }
          },
          // 第2个有轴，率
          {
            type: 'value',
            name: '%',
            show: group_info.yAxisIndex === 1,
            position: 'left',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#ddd'
              }
            },

            // 坐标轴线
            axisLine: {
              show: false
            },
            // 坐标刻度
            axisTick: {
              show: false,
              inside: true,
              lineStyle: {
                color: '#aeb7c4',
                width: 2
              }
            },
            // 坐标刻度标签
            axisLabel: {
              color: '#C5C7CE',
              fontFamily: 'Microsoft YaHei',
              fontSize: 12,
              align: 'right'
            }
          },
          // 第3个有轴，uv
          {
            type: 'value',
            name: 'uv',
            show: false,
            splitLine: {
              show: false
            }
          }
        ],
        series: this.series
      }

      if (!this.myChart) {
        this.myChart = echarts.init(document.getElementById('chartPvStatistic'))
      }

      this.myChart.setOption(option)
      this.chart_loading = false
    },
    // 切换显示组
    handleLegendGroup() {
      if (this.myChart) {
        const group_index = this.legend_group_index
        const group_info = this.legend_group_arr[group_index] || {}

        this.legend_selected_isSingle = group_info.isSingle

        if (!this.legend_selected_isSingle) {
          this.legend_group_arr[group_index].select = '*'
        } else {
          this.legend_group_arr[group_index].select = this.legend_group_arr[group_index].arr[0] || []
        }

        this.legend_selected = this.dealGetLegendSelected()

        this.myChart.setOption({
          legend: {
            selected: this.legend_selected
          },
          xAxis: [{ show: group_info.xAxisIndex === 0 }, { show: group_info.xAxisIndex === 1 }],
          yAxis: [
            {
              show: group_info.yAxisIndex === 0
            },
            {
              show: group_info.yAxisIndex === 1
            },
            {}
          ]
        })
      }
    },
    // 切换显示某个图例
    handleLegendItem(group_index, name) {
      // const group_info = this.legend_group_arr[group_index] || {}

      let select_arr = this.legend_group_arr[group_index].select

      if (this.legend_selected_isSingle) {
        this.legend_group_arr[group_index].select = [name]
      } else if (select_arr.includes(name)) {
        this.legend_group_arr[group_index].select = select_arr.filter((v) => v !== name)
      } else {
        this.legend_group_arr[group_index].select.push(name)
      }

      this.legend_selected = this.dealGetLegendSelected()

      this.myChart &&
        this.myChart.setOption({
          legend: {
            selected: this.legend_selected
          }
        })
    }
  }
}
