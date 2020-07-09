/* 曲线图 */
<template>
  <div class="chart-line itv-flex--fs">
    <!-- 图表 -->
    <div :style="{ height: '230px', width: width }">
      <ve-line v-if="showLine" :data="chartData" :legend="chartLegend" :extend="chartExtend" height="230px" :width="width" :settings="settings" />
    </div>
    <div class="btns--wrap">
      <Tabs :animated="false" v-model="groupIndex" @on-click="handleSelectGroup">
        <Button @click.native="handleHideGroup" size="small" type="dashed" class="mb16" slot="extra">隐藏全部</Button>
        <TabPane :label="group.groupName" :name="String(i_g)" v-for="(group, i_g) in legendOptions" :key="i_g">
          <div class="itv-flex--fs btns--group--wrap" v-for="(groupSmall, i_g_s) in group.data" :key="i_g_s">
            <div
              class="btn mb16 mr8"
              @click="handleChangeLegend(o)"
              v-for="(o, i) in groupSmall.data"
              :key="i"
              :style="{
                'background-color': unSelected.includes(o.name) ? 'transparent' : o.bg
              }"
            >
              <div :style="{ 'background-color': o.color }" class="btn__square mr8" />
              <span>{{ o.showName || o.name }}</span>
            </div>
            <div v-if="groupSmall.isGroup">
              <Button @click="handleSelectGroup(groupSmall)" type="dashed" class="mb16 mr8" size="small">选</Button>
              <Button @click="handleHideGroup(groupSmall)" size="small" type="dashed" class="mb16">隐</Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import chartExtend from '@/components/chart/chartExtend.js'
import getYMax from '@/components/chart/getMax'

export default {
  name: 'ChartLine',
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    chartData: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      default: function() {
        return {}
      }
    },
    legendOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    unSelectedArr: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  components: {},
  data() {
    return {
      groupIndex: '',
      unSelected: [],
      chartLegend: {
        selected: {}
      },
      chartExtend: JSON.parse(JSON.stringify(chartExtend.line))
    }
  },
  computed: {
    selecteOptions() {
      let res = []

      this.legendOptions.forEach((group) => {
        group.data.forEach((row) => {
          row.data.forEach((item) => {
            res.push(item.name)
          })
        })
      })
      return res
    },
    showLine() {
      return this.chartData.rows.length > 0
    }
  },
  created() {},
  mounted() {
    this.chartExtend.yAxis.max = function(value) {
      return value.max < 5 ? 5 : getYMax(value.max)
    }
  },
  watch: {
    unSelectedArr: {
      handler: function(v) {
        this.selecteOptions.forEach((item) => {
          this.$set(this.chartLegend.selected, item, !v.includes(item))
        })

        console.log(this.chartLegend, v)

        this.unSelected = v
      },
      immediate: true
    }
  },
  methods: {
    handleChangeLegend(v) {
      const index = this.unSelected.indexOf(v.name)

      if (index === -1) {
        this.unSelected.push(v.name)
        this.$set(this.chartLegend.selected, v.name, false)
      } else {
        this.unSelected.splice(index, 1)
        this.$set(this.chartLegend.selected, v.name, true)
      }
    },
    handleSelectGroup(params) {
      console.log(params)
      let group = []

      if (typeof params === 'object' && params.type !== 'click') {
        group = params.data
      } else {
        console.log(this.legendOptions[params].data)
        this.legendOptions[params].data.forEach((row) => {
          group = [...group, ...row.data]
        })
        console.log(group)
      }

      const v = group.map((item) => item.name)
      const other = this.selecteOptions.filter((item) => !v.includes(item))

      const v_arr = v.map((item) => ({
        name: item,
        value: true
      }))
      const other_arr = other.map((item) => ({
        name: item,
        value: false
      }))
      const arr = [...v_arr, ...other_arr]

      arr.forEach((item) => {
        this.$set(this.chartLegend.selected, item.name, item.value)
      })
      this.unSelected = other
    },
    handleHideGroup(params) {
      console.log(params, this.groupIndex)
      let group = []

      if (typeof params === 'object' && params.type !== 'click') {
        group = params.data
      } else {
        this.legendOptions[this.groupIndex || 0].data.forEach((row) => {
          group = [...group, ...row.data]
        })
        console.log(group)
      }
      const v = group.map((item) => item.name)

      v.forEach((item) => {
        this.$set(this.chartLegend.selected, item, false)
        !this.unSelected.includes(item) && this.unSelected.push(item)
      })
    }
  }
}
</script>

<style scoped lang="less">
.chart-line {
  align-items: flex-start;
  /deep/.ivu-btn-dashed {
    color: #ccc;
    &:hover {
      color: #5d83e6;
    }
  }
  .btns--wrap {
    display: flex;
    flex-direction: column;
    width: 480px;
  }
  .btns--group--wrap {
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    // &:not(:last-child) {
    //   border-bottom: 1px solid #eee;
    // }
  }
  // .btns--group--name {
  //   width: 100%;
  //   font-weight: bold;
  //   margin-bottom: 8px;
  // }
  .btn {
    padding: 6px 16px;
    // width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 16px;
    cursor: pointer;
    color: #303659;
    // background: red;
    user-select: none;
    white-space: nowrap;
  }
  .btn.active {
    background: transparent !important;
  }
  .btn__square {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    // background: black;
  }
}
</style>
