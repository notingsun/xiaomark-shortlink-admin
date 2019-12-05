/* 用户数据 */
<template>
  <div class="user-statistic">
    <div class="card" v-for="(overview, i0) in list" :key="`overview-${i0}`">
      <div class="card__title">{{ overview.name }}</div>
      <!-- 一行数据 -->
      <div>
        <div
          v-for="(row, index) in overview.map"
          :key="`row-${index}`"
          class="overview--wrap mb16"
        >
          <div
            class="overview__cell"
            v-for="(item, i) in row"
            :key="`item-${i}`"
          >
            <!-- 历史总的数据 -->
            <div class="overview__cell__value">
              <Tooltip
                :disabled="config[overview.key].data[item.key] < 1000"
                placement="top"
                theme="light"
              >
                <div slot="content" style="font-size: 16px;">
                  {{ config[overview.key].data[item.key] | countThree }}
                </div>
                <div class="pr minh38">
                  <Spin fix v-if="config[overview.key].loading"></Spin>
                  <span>{{
                    config[overview.key].data[item.key] | countShort
                  }}</span>
                </div>
              </Tooltip>
            </div>
            <!-- 数据名称 -->
            <p class="overview__cell__name mb4">
              {{ config[overview.key].name_map[item.key] }}
            </p>
            <!-- 今日数据 -->
            <div
              class="text-today pr"
              v-if="item.today"
              :title="config[overview.key].name_map[item.today]"
            >
              <div v-show="!config[overview.key].loading" class="itv-flex--fs">
                <!-- <span style="font-size: 12px;">今日</span> -->
                <itv-icon type="i-increase" size="14" color="" />
                <span class="ml4">{{
                  config[overview.key].data[item.today] | countThree
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      n_users_new_today: '今天注册的用户数',
      n_users_active_today: '今天的活跃用户数',
      n_groups: '链接分组数',
      n_groups_today: '今天创建的链接分组数',
      n_links: '链接数',
      n_links_today: '今天创建的链接数',
      n_urls: '跳转链接数',
      n_urls_today: '今天创建的跳转链接数',
      n_clicks: '链接访问次数',
      n_clicks_today: '今天的链接访问次数',
      n_visitors: '链接访问人数',
      n_visitors_today: '今天的链接访问人数',
      n_ips: '链接访问IP数',
      n_ips_today: '今天的链接访问IP数'
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
          map: [
            [
              { key: 'n_users' },
              { key: 'n_users_new_today' },
              { key: 'n_users_active_today' }
            ],
            [
              { key: 'n_groups', today: 'n_groups_today' },
              { key: 'n_links', today: 'n_links_today' },
              { key: 'n_urls', today: 'n_urls_today' },
              { key: 'n_clicks', today: 'n_clicks_today' },
              { key: 'n_visitors', today: 'n_visitors_today' },
              { key: 'n_ips', today: 'n_ips_today' }
            ]
          ]
        },
        // 总体数据-渠道码
        {
          name: '小码渠道码',
          key: 'overview_qr',
          map: [
            [
              { key: 'n_users' },
              { key: 'n_users_new_today' },
              { key: 'n_users_active_today' }
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

        this.config.overview.data = res
      } catch (e) {
        console.log(e)
      }
      this.config.overview.loading = false
    },
    // 获取总的数据-渠道码
    async doGetTableDataAllQr() {
      this.config.overview_qr.loading = true
      try {
        const res = await this.$api.Qr.getStatisticsInfo({})

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
@row-margin: 28px;

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
  .minh38 {
    min-height: 38px;
  }
  .card {
    padding: 24px 0 24px;
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
        height: 20px;
        background: #dcdee2;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
    .overview__cell__value {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 4px;
      color: @primary-color;
    }
    .overview__cell__name {
      font-size: 14px;
    }
  }
}
</style>
