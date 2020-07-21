/* 用户增长数据统计 */
<template>
  <div class="uv-statistic  itv-flex-v--fs pr">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <span>第</span>
        <InputNumber class="input-number" :active-change="false" :max="maxWeek" :min="1" v-model="startWeek"></InputNumber>
        <span>周～第</span>
        <InputNumber class="input-number" readonly :value="maxWeek"></InputNumber>
        <span>周</span>
        <Button class="ml32" type="primary" @click="doGetData">查询</Button>
        <!-- <i-input v-model="startWeek" type="number">
          <span slot="prepend">第</span>
          <span slot="append">周～第{{ maxWeek }}周</span>
        </i-input> -->
      </div>
      <Button class="mr32" type="dashed" @click="handleIsRate" :loading="loading">切换为用户留存{{ isRate ? '数' : '率' }}</Button>
    </div>
    <!-- 图表 -->
    <div class="itv-flex--fs pr">
      <Spin fix v-if="chart_loading" style="z-index: 99999999" />
      <div :style="{ width: chartWidth }" class="wrap__chart" id="chartPvStatistic"></div>
      <div style="align-self: flex-start;">
        <Tabs :animated="false" v-model="legend_group_index" @on-click="handleLegendGroup">
          <Button
            v-show="((legend_group_arr || [])[legend_group_index] || {}).isSingle"
            @click="legend_selected_isSingle = !legend_selected_isSingle"
            size="small"
            type="dashed"
            class="mt8"
            slot="extra"
          >
            {{ legend_selected_isSingle ? '关闭' : '开启' }}单选
          </Button>
          <TabPane :label="group.name" :name="String(i_g)" v-for="(group, i_g) in legend_group_arr" :key="i_g">
            <div class="itv-flex--fs legend-wrap">
              <div v-for="(item, i_a) in group.arr" :key="i_a" class="mr4 legend-item" @click="handleLegendItem(i_g, item)">
                <div class="legend-item_bg" :style="{ background: legend_selected[series_map[item].name] ? series_map[item].color : '' }"></div>
                {{ series_map[item].name }}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <!-- 表格 -->
    <Table :loading="loading" style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
    <!-- 来源对话框 -->
    <Modal :width="1000" v-model="sourceModel.show" :title="sourceModel.title" :mask-closable="false">
      <Table :height="table.height * 0.7" :columns="sourceModel.columns" :data="sourceModel.data" />
    </Modal>
    <!-- 修改uv数据 -->
    <Modal :width="500" v-model="uvModel.show" :title="`填写第${uvModel.week}周的UV`" :mask-closable="false" @on-ok="doChangeUv">
      <InputNumber style="width: 120px;" v-model="uvModel.input" />
    </Modal>
  </div>
</template>

<script>
import moment from 'moment'
import mixinsChart from './uv-statistic-chart-mixins'

export default {
  name: 'UvStatistic',
  mixins: [mixinsChart],
  props: {},
  components: {},
  data() {
    return {
      isRate: false, // 周留存显示：率（反之为数）
      startWeek: 1,
      maxWeek: 1,
      initDiffWeek: 30, // 显示的初始周数
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [],
        height: null
      },
      sourceModel: {
        show: false,
        title: '',
        dataArr: [],
        data: [],
        columns: [
          {
            title: '渠道名称',
            minWidth: 230,
            render: (h, { row }) => {
              return <div>{row.source || '无'}</div>
            }
          },
          {
            title: '注册用户数称',
            minWidth: 120,
            key: 'n_users'
          },
          {
            title: '激活用户数',
            minWidth: 120,
            key: 'n_users_active'
          },
          {
            title: '留存用户数',
            minWidth: 120,
            key: 'n_users_stay'
          },
          {
            title: '激活率',
            minWidth: 120,
            render: (h, { row }) => {
              return <div>{row.active_rate ? `${(row.active_rate * 100).toFixed(2)}%` : '-'}</div>
            }
          }
        ]
      },
      uvModel: {
        show: false,
        week: '',
        input: 0
      }
    }
  },
  computed: {},
  created() {
    this.maxWeek = moment().diff('2020-02-10', 'weeks')
    this.startWeek = this.maxWeek - this.initDiffWeek > 0 ? this.maxWeek - this.initDiffWeek : this.startWeek
  },
  mounted() {
    console.log({ maxWeek: this.maxWeek })
    this.$nextTick(() => {
      this.table.height = this.$refs.refTable.$el.clientHeight
    })
    this.doGetData()
  },
  watch: {},
  methods: {
    // 获取数据
    async doGetData() {
      this.loading = true
      this.dealSetTableColumns()
      try {
        let res = await this.$api.Statistic.getUv({
          page: 1,
          per_page: this.maxWeek - this.startWeek + 1
        })

        res = res.stats
        this.table.data = [...res].reverse()
        console.log({ data: this.table.data })
        this.dealSetChart()
        setTimeout(() => {
          this.$nextTick(this.dealTableScrollBottom)
        })
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    dealTableScrollBottom() {
      console.log('表格回滚到底部')
      // 表格回滚到底部
      this.$refs.refTable && this.$refs.refTable.$refs.body && (this.$refs.refTable.$refs.body.scrollTop = this.$refs.refTable.$refs.body.scrollHeight)
    },
    // 点击.切换用户数留存（率/数）
    handleIsRate() {
      if (!this.loading) {
        this.loading = true
        setTimeout(() => {
          this.isRate = !this.isRate
          this.dealSetTableColumns()
          this.dealSetChart()
          this.$nextTick(() => {
            this.loading = false
          })
        }, 300)
      }
    },
    // 设置表格的表头
    dealSetTableColumns() {
      this.table.columns = []
      let columns = []
      const base_columns = [
        {
          title: '日期',
          fixed: 'left',
          width: 230,
          render: (h, { row }) => {
            return <div>{`第${row.week}周（${row.mon}至${row.sun}）`}</div>
          }
        },
        {
          title: '留存用户',
          minWidth: 100,
          render: (h, { row }) => {
            return <div>{this.$global.utils.countFormat.three(row.n_users_stay)}</div>
          }
        },
        {
          title: 'UV',
          // key: 'uv',
          minWidth: 100,
          render: (h, { row }) => {
            const uv = this.$global.utils.countFormat.three(row.uv)

            return <div>{row.uv ? uv : '-'}</div>
          }
        },
        {
          title: '注册用户数',
          key: 'n_users',
          minWidth: 100
        },
        {
          title: '注册率',
          // key: 'register_rate',
          minWidth: 100,
          render: (h, { row }) => {
            return <div>{row.register_rate ? `${(row.register_rate * 100).toFixed(2)}%` : '-'}</div>
          }
        },
        {
          title: '激活率',
          // key: 'active_rate',
          minWidth: 100,
          render: (h, { row }) => {
            return <div>{`${(row.active_rate * 100).toFixed(2)}%`}</div>
          }
        },
        {
          title: '激活用户数',
          key: 'n_users_active',
          className: 'itv-n_users_active',
          minWidth: 100
        },
        {
          title: '操作',
          width: 90,
          fixed: 'right',
          render: (h, { row }) => {
            return (
              <div>
                <span title="分渠道效果统计" class="mr12">
                  <itv-icon type="i-detail" size="20" class="itv-btn__icon" onClick={this.handleSourceModel.bind(null, row)} />
                </span>
                <span title="填写UV数据">
                  <itv-icon type="i-edit" size="20" class="itv-btn__icon" onClick={this.handleUvModel.bind(null, row)} />
                </span>
              </div>
            )
          }
        }
      ]

      columns = [...base_columns]

      // x周后的留存率
      const diffWeek = this.maxWeek - this.startWeek

      for (let i = 1; i <= diffWeek; i++) {
        columns.push({
          title: `第${i}周留存${this.isRate ? '率' : ''}`,
          minWidth: 110,
          render: (h, { row }) => {
            const v = row.n_users_stay_weeks_later[i]

            // eslint-disable-next-line no-extra-parens
            return <div>{typeof v === 'undefined' ? '' : this.isRate ? `${((v / row.n_users_active) * 100).toFixed(2)}%` : this.$global.utils.countFormat.three(v)}</div>
          }
        })
      }

      this.table.columns = columns
    },
    // 显示来源对话框
    handleSourceModel(row) {
      this.sourceModel.show = true
      this.sourceModel.title = `第${row.week}周（${row.mon}至${row.sun}）来源分布的统计数据`
      this.sourceModel.data = row.source_stats || []
    },
    // 显示修改UV对话框
    handleUvModel(row) {
      this.uvModel.show = true
      this.uvModel.week = row.week
      this.uvModel.input = Number(row.uv || 0)
    },
    // 修改UV
    async doChangeUv() {
      try {
        await this.$api.Statistic.putUv({
          week: this.uvModel.week,
          uv: this.uvModel.input
        })
        this.uvModel.show = false
        setTimeout(() => {
          this.$Message.success('修改成功')
          this.loading = true
          setTimeout(() => {
            this.doGetData()
          }, 1000)
        }, 300)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.uv-statistic {
  .input-number {
    margin: 0 8px;
    width: 60px;
  }
  .wrap__chart {
    width: 100%;
    height: 260px;
    flex-shrink: 0;
  }
  .legend-wrap {
    flex-wrap: wrap;
  }
  .legend-item {
    white-space: nowrap;
    padding: 4px;
    cursor: pointer;
    margin-bottom: 8px;
    margin-right: 8px;
    position: relative;
    .legend-item_bg {
      border-radius: 2px;
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
      opacity: 0.2;
    }
  }
}
</style>

<style lang="less">
.ivu-table {
  .itv-n_users_active,
  td.itv-n_users_active {
    background: #eff3fc;
  }
}
</style>
