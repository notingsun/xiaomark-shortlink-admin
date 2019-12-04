/* 用户数据 */
<template>
  <div class="user-statistic">
    <!-- 总的数据 -->
    <div class="card">
      <div class="card__title">小码短链接</div>
      <div class="overview--wrap mb16">
        <div class="overview__cell" v-for="(item, i) in overview.list" :key="i">
          <p class="overview__cell__value">
            <Tooltip
              :disabled="overview.data[item] < 1000"
              placement="top"
              theme="light"
            >
              <div slot="content" style="font-size: 16px;">
                {{ overview.data[item] | countThree }}
              </div>
              <span>
                {{ overview.data[item] | countShort }}
              </span>
            </Tooltip>
          </p>
          <p class="overview__cell__name">{{ overview.name_map[item] }}</p>
        </div>
      </div>
    </div>
    <!-- 总的数据-渠道码 -->
    <div class="card mt16">
      <div class="card__title">小码渠道码</div>
      <div class="overview--wrap mb16">
        <div
          class="overview__cell"
          v-for="(item, i) in overview_qr.list"
          :key="i"
        >
          <p class="overview__cell__value">
            <Tooltip
              :disabled="overview_qr.data[item] < 1000"
              placement="top"
              theme="light"
            >
              <div slot="content" style="font-size: 16px;">
                {{ overview_qr.data[item] | countThree }}
              </div>
              <span>
                {{ overview_qr.data[item] | countShort }}
              </span>
            </Tooltip>
          </p>
          <p class="overview__cell__name">{{ overview_qr.name_map[item] }}</p>
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
      n_groups: '链接分组数',
      n_links: '链接数',
      n_urls: '跳转链接数',
      n_clicks: '链接访问次数',
      n_visitors: '链接访问人数'
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
      // 总体数据
      overview: {
        list: Object.keys(OVERVIEW_NAME_MAP),
        name_map: OVERVIEW_NAME_MAP,
        data: {}
      },
      // 总体数据-渠道码
      overview_qr: {
        list: Object.keys(OVERVIEW_NAME_QR_MAP),
        name_map: OVERVIEW_NAME_QR_MAP,
        data: {}
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
      try {
        const res = await this.$api.Link.getLinkStatistic({})

        this.overview.data = res
      } catch (e) {
        console.log(e)
      }
    },
    // 获取总的数据-渠道码
    async doGetTableDataAllQr() {
      try {
        const res = await this.$api.Qr.getStatisticsInfo({})

        this.overview_qr.data = res
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-statistic {
  .card {
    padding: 24px 0 32px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      margin-left: 32px;
      margin-bottom: 32px;
    }
  }
  .overview--wrap {
    display: flex;
    justify-content: flex-start;
    // justify-content: space-around;
    flex-wrap: wrap;
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
        margin-top: 56px;
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
