/* 曲线图 */
<template>
  <div class="chart-line itv-flex--fs">
    <!-- 图表 -->
    <div :style="{ height: '230px', width: width }">
      <ve-line
        v-if="showLine"
        :data="chartData"
        :legend="chartLegend"
        :extend="chartExtend"
        height="230px"
        :width="width"
        :settings="settings"
      />
    </div>
    <div class="btns--wrap">
      <div
        class="itv-flex--fs btns--group--wrap"
        v-for="(group, i_g) in legendOptions"
        :key="i_g"
      >
        <div
          class="btn mb16 mr8"
          @click="handleChangeLegend(o)"
          v-for="(o, i) in group.data"
          :key="i"
          :style="{
            'background-color': unSelected.includes(o.name)
              ? 'transparent'
              : o.bg
          }"
        >
          <div
            :style="{ 'background-color': o.color }"
            class="btn__square mr8"
          />
          <span>{{ o.name }}</span>
        </div>
        <div v-if="group.isGroup">
          <Button
            @click="handleSelectGroup(group)"
            type="dashed"
            class="mb16 mr8"
            size="small"
            >只显示</Button
          >
          <Button
            @click="handleHideGroup(group)"
            size="small"
            type="dashed"
            class="mb16"
            >隐藏</Button
          >
        </div>
      </div>
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
        group.data.forEach((item) => {
          res.push(item.name)
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
    handleSelectGroup(group) {
      const v = group.data.map((item) => item.name)
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
    handleHideGroup(group) {
      const v = group.data.map((item) => item.name)

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
    width: 460px;
  }
  .btns--group--wrap {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
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
