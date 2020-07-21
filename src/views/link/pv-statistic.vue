/* 链接访问次数统计 */
<template>
  <div class="pv-statistic  itv-flex-v--fs pr">
    <Spin fix v-if="loading"></Spin>
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <DatePicker
          type="daterange"
          :options="options"
          placement="bottom-start"
          placeholder="请选择"
          style="width: 200px"
          v-model="form.date"
          @on-change="doGetData"
          :clearable="false"
          format="yyyy/MM/dd"
        ></DatePicker>
      </div>
    </div>
    <!-- 图表 -->
    <div class="chart__wrap" id="chartPvStatistic">aaa</div>
  </div>
</template>

<script>
import moment from 'moment'
import echarts from 'echarts'

const dims = {
  time: 0,
  min_pv: 1,
  min_hour_pv: 2,
  min_hour_name: 3,
  hour_pv: 1
}

export default {
  name: 'PvStatistic',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      loading: true,
      // 获取表格数据的参数
      form: {
        date: [this.$PDo.Date.getTimeCalculation(-1, 'y/m/d'), this.$PDo.Date.getTimeCalculation(0, 'y/m/d')]
      },
      options: {
        shortcuts: [
          {
            text: '今天',
            formart: this.getTimeCalculation,
            value() {
              return [this.formart(0), this.formart(0)]
            }
          },
          {
            text: '昨天',
            formart: this.getTimeCalculation,
            value() {
              return [this.formart(-1), this.formart(-1)]
            }
          },
          {
            text: '最近7天',
            formart: this.getTimeCalculation,
            value() {
              return [this.formart(-6), this.formart(0)]
            }
          }
        ],
        disabledDate: (date) => {
          return date && date.valueOf() > Date.now()
        }
      },
      myChart: null,
      // data: []
      data_mins: [],
      data_hours: []
    }
  },
  computed: {},
  created() {},
  mounted() {
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
      this.loading = true
      try {
        const stats_date = this.form.date.map((v) => this.$PDo.Date.format(v.toJSON(), 'y-m-d')).join('~')

        let res = await this.$api.Statistic.getLinkPv({ stats_date })

        res = res.stats || []

        console.log(res)
        // const res = testData

        this.data_mins = []
        this.data_hours = []

        // 每分钟的数据
        echarts.util.map(res, (oneDay) => {
          echarts.util.each(oneDay.minutely_pv, (oneHour, i_hour) => {
            const data_hour = oneDay.hourly_pv[i_hour]

            // 时间.小时
            echarts.util.each(oneHour, (oneMin, i_min) => {
              // 时间.分钟
              let time_min = moment(oneDay.date).add({ hours: i_hour, minutes: i_min })

              this.data_mins.push([time_min.format(), oneMin, data_hour, `${i_hour}~${i_hour + 1}点`])
            })
          })
        })

        // 每小时的数据
        echarts.util.map(res, (oneDay) => {
          echarts.util.each(oneDay.hourly_pv, (oneHour, i_hour) => {
            let time_hour = moment(oneDay.date).add({ hours: i_hour })

            this.data_hours.push([time_hour.format(), oneHour])
          })
        })

        this.doDraw()

        console.log({ data_mins: this.data_mins, data_hours: this.data_hours })
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },

    // 绘制图表
    doDraw() {
      const option = {
        legend: {
          // backgroundColor: 'blue',
          data: [
            {
              name: '分钟pv',
              icon: 'circle'
            },
            {
              name: '小时pv',
              icon: 'circle'
            }
          ]
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff', // 背景色
          textStyle: {
            color: '#666'
          },
          extraCssText: 'box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);',
          formatter: (params) => {
            const index = params.length - 1

            return [
              echarts.format.formatTime('yyyy-MM-dd', params[index].value[dims.time]) + ' ' + echarts.format.formatTime('hh:mm', params[index].value[dims.time]),
              params[index].marker + '分钟pv：' + this.$global.utils.countFormat.three(params[index].value[dims.min_pv]),
              '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgb(253, 228, 238, 1);"></span>' +
                params[index].value[dims.min_hour_name] +
                'pv：' +
                this.$global.utils.countFormat.three(params[index].value[dims.min_hour_pv])
            ].join('<br>')
          }
        },
        grid: {
          top: 40,
          bottom: 125
        },
        xAxis: [
          {
            type: 'time',
            // maxInterval: 3600 * 1000 * 24, // 自动计算的坐标轴最大间隔大小
            splitLine: {
              show: false
            },
            boundaryGap: true,
            axisTick: {
              alignWithLabel: false
            },
            axisLabel: {
              // showMaxLabel: true,
              // showMinLabel: true,
              interval: 'auto'
            }
          },
          // 每小时pv，柱状图x
          {
            type: 'time',
            show: false,
            axisPointer: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '分钟pv',
            splitLine: {
              lineStyle: {
                type: 'dotted',
                color: '#ddd'
              }
            }
          },
          {
            type: 'value',
            name: '小时pv',
            show: false,
            splitLine: {
              show: false
            }
          }
        ],
        dataZoom: [
          // 内置型数据区域缩放组件
          {
            type: 'inside',
            minValueSpan: 3600 * 1000 * 5,
            xAxisIndex: [0, 1], // 表示这个 dataZoom 组件控制 第1个 xAxis
            // minValueSpan: 3600 * 1000, // 用于限制窗口大小的最小值, 表示 1 分钟
            minSpan: 5 // 用于限制窗口大小的最小值（百分比值） （如果设置了 maxValueSpan 则 maxSpan 失效。）
          },
          // 滑动条型数据区域缩放组件
          {
            type: 'slider',
            xAxisIndex: [0, 1],
            minSpan: 5,
            height: 20,
            bottom: 50,
            handleIcon:
              'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%'
          }
        ],
        series: [
          // 数据
          {
            name: '小时pv',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            showSymbol: false,
            symbolSize: 10,
            emphasis: {
              itemStyle: {
                color: 'rgb(253, 228, 238, 1)'
              }
            },
            barCategoryGap: 0,
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 0,
              color: 'rgb(253, 228, 238, 1)'
            },
            // 可以定义 data_mins 的哪个维度被编码成什么
            encode: {
              x: dims.time, // 表示维度 time 映射到 x 轴。
              y: dims.hour_pv // 表示维度 waveHeight 映射到 y 轴。
            },
            data: this.data_hours,
            z: 0
          },
          // 分钟pv
          {
            name: '分钟pv',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            showSymbol: false,
            symbolSize: 10,
            hoverAnimation: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(91,137,221,1)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(91,137,221,0.7)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(91,137,221,0)'
                  }
                ]
              }
            },
            lineStyle: {
              normal: {
                color: 'rgba(91,137,221,1)'
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(91,137,221,1)'
              }
            },
            encode: {
              x: dims.time, // 表示维度 time 映射到 x 轴。
              y: dims.min_pv // 表示维度 waveHeight 映射到 y 轴。
            },
            data: this.data_mins,
            z: 11
          }
        ]
      }

      this.myChart = echarts.init(document.getElementById('chartPvStatistic'))

      this.myChart && this.myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
.pv-statistic {
  .chart__wrap {
    flex: 1;
    max-height: 600px;
  }
}
</style>
