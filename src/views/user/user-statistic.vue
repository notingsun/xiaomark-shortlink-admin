/* 用户数据 */
<template>
  <div class="user-statistic">
    <div class="card" v-for="(overview, i0) in list" :key="`overview-${i0}`">
      <div class="card__title">{{ overview.name }}</div>
      <!-- 一行数据 -->
      <div>
        <div v-for="(row, index) in overview.map" :key="`row-${index}`" class="overview--wrap mb16">
          <div class="overview__cell" v-for="(item, i) in row" :key="`item-${i}`">
            <!-- 数据名称 -->
            <p class="overview__cell__name mb4">
              {{ config[overview.key].name_map[item.key] }}
            </p>

            <!-- 历史总的数据 -->
            <div class="overview__cell__value mb4">
              <Tooltip :disabled="config[overview.key].data[item.key] < 1000 || item.noShort" placement="top" theme="light">
                <div slot="content" style="font-size: 18px;">
                  {{ config[overview.key].data[item.key] | countThree }}
                </div>
                <div class="pr minh38">
                  <Spin fix v-if="config[overview.key].loading"></Spin>
                  <span v-if="item.noShort">{{ config[overview.key].data[item.key] }}</span>
                  <span v-else>{{ config[overview.key].data[item.key] | countShort }}</span>
                </div>
              </Tooltip>
            </div>

            <!-- 今日/昨日 -->
            <div :style="{ width: '100%', minHeight: item.nosmall ? '' : '44px' }">
              <!-- 今日数据 -->
              <div class="itv-flex--fs" v-if="item.today" :title="config[overview.key].name_map[item.today]">
                <div class="cell-small-label">今日</div>
                <div class="cell-small-value ml4">{{ config[overview.key].data[item.today] | countThree }}</div>
              </div>
              <div class="itv-flex--fs" v-if="item.yesterday" :title="config[overview.key].name_map[item.yesterday]">
                <div class="cell-small-label">昨日</div>
                <div class="cell-small-value ml4">{{ config[overview.key].data[item.yesterday] | countThree }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <Table
        v-if="overview.table"
        :loading="config[overview.key].loading"
        ref="refTable"
        :height="overview.table.height"
        :columns="overview.table.columns"
        :data="overview.table.data"
        class="table"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserStatistic',
  mixins: [],
  props: {},
  components: {},
  data() {
    const OVERVIEW_NAME_MAP = {
      n_users: '用户数',
      n_users_yesterday: '昨天注册的用户数',
      n_users_today: '今天注册的用户数',
      n_users_active: '已激活的用户数',
      n_users_active_yesterday: '昨天激活的用户数',
      n_users_login_yesterday: '昨天的活跃用户数',
      n_users_login_today: '今天的活跃用户数',
      n_workspaces: '协作空间数',
      n_workspaces_yesterday: '昨天创建的协作空间数',
      n_workspaces_today: '今天创建的协作空间数',
      n_custom_domains: '自定义域名数',
      n_custom_domains_yesterday: '昨天绑定的自定义域名数',
      n_custom_domains_today: '今天绑定的自定义域名数',
      n_groups: '链接分组数',
      n_groups_yesterday: '昨天创建的链接分组数',
      n_groups_today: '今天创建的链接分组数',
      n_links: '链接数',
      n_links_yesterday: '昨天创建的链接数',
      n_links_today: '今天创建的链接数'
    }

    const OVERVIEW_NAME_QR_MAP = {
      n_users: '用户数',
      n_users_new_today: '今天注册的用户数',
      n_users_active_today: '今天的活跃用户数',
      n_platforms: '微信公众平台',
      n_platforms_today: '今天授权的微信公众平台数',
      n_qrcodes: '二维码数',
      n_qrcodes_today: '今天创建的二维码数',
      n_records: '扫码次数',
      n_records_today: '今天的扫码次数'
    }

    return {
      list: [
        // 总体数据
        {
          name: '小码短链接',
          key: 'overview',
          table: {
            columns: [
              {
                title: '数据类型',
                width: 150,
                key: 'name'
              },
              {
                title: '访问次数',
                align: 'center',
                minWidth: 120,
                // key: 'name',
                render: (h, { row }) => {
                  return (
                    <div class="itv-flex--fs">
                      <div class="text-blue" title="累计">
                        {row.pv}
                      </div>
                      <div class="itev-flex--v--fs text-grey">
                        <div class="" title="今日">
                          今日：{row.pv_today}
                        </div>
                        <div class="" title="昨日">
                          昨日：{row.pv_yesterday}
                        </div>
                      </div>
                    </div>
                  )
                }
              },
              {
                title: '访问人数',
                align: 'center',
                minWidth: 120,
                // key: 'name',
                render: (h, { row }) => {
                  return (
                    <div class="itv-flex--fs">
                      <div class="text-blue" title="累计">
                        {row.uv}
                      </div>
                      <div class="itev-flex--v--fs text-grey">
                        <div class="" title="今日">
                          今日：{row.uv_today}
                        </div>
                        <div class="" title="昨日">
                          昨日：{row.uv_yesterday}
                        </div>
                      </div>
                    </div>
                  )
                }
              },
              {
                title: '访问IP数',
                align: 'center',
                minWidth: 120,
                // key: 'name',
                render: (h, { row }) => {
                  return (
                    <div class="itv-flex--fs">
                      <div class="text-blue" title="累计">
                        {row.uip}
                      </div>
                      <div class="itev-flex--v--fs text-grey">
                        <div class="" title="今日">
                          今日：{row.uip_today}
                        </div>
                        <div class="" title="昨日">
                          昨日：{row.uip_yesterday}
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            ],
            data: [],
            height: null
          },
          map: [
            [
              { key: 'n_users', noShort: true, today: 'n_users_today', yesterday: 'n_users_yesterday' },
              { key: 'n_users_active', noShort: true, yesterday: 'n_users_active_yesterday' },
              { key: 'n_users_login_today', noShort: true, yesterday: 'n_users_login_yesterday' }
            ],
            [
              { key: 'n_workspaces', today: 'n_workspaces_today', yesterday: 'n_workspaces_yesterday' },
              { key: 'n_custom_domains', today: 'n_custom_domains_today', yesterday: 'n_custom_domains_yesterday' },
              { key: 'n_groups', today: 'n_groups_today', yesterday: 'n_groups_yesterday' },
              { key: 'n_links', today: 'n_links_today', yesterday: 'n_links_yesterday' }
            ]
          ]
        },
        // 总体数据-渠道码
        {
          name: '小码渠道码',
          key: 'overview_qr',
          map: [
            [
              { key: 'n_users', nosmall: true },
              { key: 'n_users_new_today', nosmall: true },
              { key: 'n_users_active_today', nosmall: true }
            ],
            [
              { key: 'n_platforms', today: 'n_platforms_today' },
              { key: 'n_qrcodes', today: 'n_qrcodes_today' },
              { key: 'n_records', today: 'n_records_today' }
            ]
          ]
        }
      ],
      config: {
        // 总体数据
        overview: {
          loading: true,
          name_map: OVERVIEW_NAME_MAP,
          data: {}
        },
        // 总体数据-渠道码
        overview_qr: {
          loading: true,
          name_map: OVERVIEW_NAME_QR_MAP,
          data: {}
        }
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.doGetTableDataAll()
    this.doGetTableDataAllQr()
  },
  watch: {},
  methods: {
    // 获取总的数据
    async doGetTableDataAll() {
      this.config.overview.loading = true
      try {
        const res = await this.$api.Link.getLinkStatistic({})

        const arr1 = ['link_core_stats', 'link_wxt_stats', 'link_wxe_stats', 'link_dya_stats', 'link_tba_stats']
        const arrMap = {
          link_core_stats: '链接核心访问数据',
          link_wxt_stats: '微信内追踪访问记录',
          link_wxe_stats: '微信内强制浏览器打开',
          link_dya_stats: '跳转抖音APP',
          link_tba_stats: '跳转淘宝APP'
        }

        this.config.overview.data = res
        this.list[0].table.data = arr1.map((key) => {
          return {
            name: arrMap[key],
            ...res[key]
          }
        })
      } catch (e) {
        console.log(e)
      }
      this.config.overview.loading = false
    },
    // 获取总的数据-渠道码
    async doGetTableDataAllQr() {
      this.config.overview_qr.loading = true
      try {
        let res = await this.$api.Qr.getStatisticsInfo({})

        this.config.overview_qr.data = res
      } catch (e) {
        console.log(e)
      }
      this.config.overview_qr.loading = false
    }
  }
}
</script>

<style scoped lang="less">
@row-margin: 24px;

.pr {
  position: relative;
}

.user-statistic {
  overflow-y: auto;

  .text-today {
    color: #07c160;
    font-size: 24px;
    cursor: default;
    min-height: 36px;
  }
  .text-yesterday {
    color: grey;
    font-size: 24px;
    cursor: default;
    min-height: 36px;
  }
  .minh38 {
    min-height: 38px;
  }
  .card {
    padding: 16px 0 16px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    position: relative;
    &:not(:first-child) {
      margin-top: 16px;
    }
    &__title {
      font-size: 18px;
      font-weight: bold;
      margin-left: 32px;
      margin-bottom: 24px;
    }
  }
  .overview--wrap {
    display: flex;
    justify-content: flex-start;
    // justify-content: space-around;
    flex-wrap: wrap;

    &:not(:last-child) {
      margin-bottom: @row-margin;
    }

    .overview__cell {
      display: flex;
      width: 16.66%;
      // background: pink;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      flex-shrink: 0;
      &:last-child:after {
        width: 0px !important;
      }
      &:nth-child(n + 7) {
        margin-top: @row-margin;
      }
      &:not(:nth-child(6n + 6)):after {
        position: absolute;
        content: '';
        right: 0;
        top: 50%;
        width: 1px;
        height: 40px;
        background: #dcdee2;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    .overview__cell__value {
      font-size: 32px;
      font-weight: 500;
      color: @primary-color;
    }
    .overview__cell__name {
      font-size: 14px;
    }
  }
  .cell-small-label {
    flex-shrink: 0;
    width: 44%;
    text-align: right;
    padding-right: 8px;
    box-sizing: border-box;
    font-size: 12px;
    color: #9a9a9a;
  }
  .cell-small-value {
    flex: 1;
    color: #9a9a9a; // 灰色
    // color: #07c160; // 绿色
    font-size: 18px;
    line-height: 22px;
  }
  .table {
    margin: 40px 3% 12px;
    min-height: 280px;
    max-width: 62%;
  }
}
</style>

<style lang="less">
.user-statistic {
  .text-blue {
    color: @primary-color;
    font-weight: bold;
    font-size: 16px;
    width: 50%;
    text-align: right;
    margin-right: 12px;
  }
  .text-grey {
    color: #9a9a9a;
  }
}
</style>
