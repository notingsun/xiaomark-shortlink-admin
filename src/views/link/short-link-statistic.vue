/* 短链数据 */
<template>
  <div class="short-link-statistic itv-flex-v--fs">
    <!-- 总的数据 -->
    <div class="overview--wrap mb16">
      <div class="overview__cell" v-for="(item, i) in overview.list" :key="i">
        <p class="overview__cell__value">
          {{
            overview.data[item]
              ? String(overview.data[item]).replace(
                  /(\d+?)(?=(\d{3})+$)/g,
                  '$1,'
                )
              : '-'
          }}
        </p>
        <p class="overview__cell__name">{{ overview.name_map[item] }}</p>
      </div>
    </div>
    <!-- 时间选择器 -->
    <div class="header mb16 itv-flex--sb">
      <DatePicker
        type="daterange"
        :options="options"
        placement="bottom-end"
        placeholder="请选择"
        style="width: 200px"
        v-model="form.date"
        @on-change="doGetTableData"
        :clearable="false"
        format="yyyy/MM/dd"
      ></DatePicker>
    </div>
    <!-- 表格 -->
    <Table
      :loading="loading"
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
    const OVERVIEW_NAME_MAP = {
      n_users: '用户数',
      n_groups: '链接分组数',
      n_links: '链接数',
      n_urls: '跳转链接数',
      n_clicks: '链接访问次数',
      n_visitors: '链接访问人数'
    }

    return {
      loading: true,
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
      },
      // 总体数据
      overview: {
        list: Object.keys(OVERVIEW_NAME_MAP),
        name_map: OVERVIEW_NAME_MAP,
        data: {}
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.table.height = this.$refs.refTable.$el.clientHeight
    })
    this.doGetTableDataAll()
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

        this.table.data = (res.stats || []).reverse()
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    },

    // 获取总的数据
    async doGetTableDataAll() {
      try {
        const res = await this.$api.Link.getLinkStatistic({})

        this.overview.data = res
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.short-link-statistic {
  .overview--wrap {
    display: flex;
    justify-content: space-around;
    .overview__cell {
      display: flex;
      width: 16.5%;
      // background: pink;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      &:not(:last-child):after {
        position: absolute;
        content: '';
        right: 0;
        top: 50%;
        width: 1px;
        height: 20px;
        background: #dcdee2;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    .overview__cell__value {
      font-size: 28px;
      font-weight: 500;
      color: @primary-color;
    }
    // .overview__cell__name {
    // }
  }
}
</style>
