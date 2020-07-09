/* 图表的配置 */
import { colorArr1 } from './color'

export default {
  // 曲线图
  line: {
    animationEasingUpdate: 'linear',
    grid: {
      top: 10,
      left: 20,
      right: 40,
      bottom: 24
    },
    series: {
      showSymbol: false, // 是否显示拐点
      // 拐点的样式
      symbolSize: 4,
      itemStyle: {
        borderWidth: 2,
        shadowColor: 'rgba(255, 255, 255, 0.1)',
        shadowBlur: 8
      },
      smooth: true, // 曲线
      lineStyle: {
        width: 2
      }
    },
    // 图例设置
    legend: {
      show: false
      // bottom: 0, // 显示在底部
      // icon: 'circle', // 显示实心圆圈
      // itemWidth: 8,
      // itemGap: 30, // 图例间隔
      // backgroundColor: 'rgba(91, 137, 221, 0.1)', // 图例背景色
      // borderRadius: 20,
      // padding: [8, 30]
    },
    // x轴
    xAxis: {
      boundaryGap: false, // 旁边是否留白
      // 坐标轴线
      axisLine: {
        show: true,
        lineStyle: {
          color: '#EBECF3'
        }
      },
      // 坐标刻度
      axisTick: {
        // show: false
        inside: true, // 刻度显示在图里
        lineStyle: {
          color: '#aeb7c4',
          width: 2
          // type: 'dotted'
        }
      },
      // 坐标刻度标签
      axisLabel: {
        color: '#C5C7CE',
        // fontWeight: 'bold',
        fontFamily: 'Microsoft YaHei',
        fontSize: 12,
        align: 'center'
      },
      // 分割线
      splitLine: {
        show: true, // 类目轴的默认不显示分割线
        lineStyle: {
          type: 'dashed',
          color: '#EBECF3'
        }
      }
    },
    // y轴
    yAxis: {
      minInterval: 1,
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
      },
      // 分割线
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed',
          color: '#EBECF3'
        }
      }
    },
    // 指示器
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          // color: '#495A7C', // 黑
          // color: '#C5C7CE', // 灰深
          // color: '#5b89dd', // 蓝
          color: '#EBECF3', // 灰浅
          width: 2
        },
        snap: true
      },
      backgroundColor: '#fff', // 背景色
      textStyle: {
        color: '#666'
      },
      extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);'
    },
    color: colorArr1
  }
}
