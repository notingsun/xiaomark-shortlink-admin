/* 用户数据 */
<template>
  <div class="user-statistic">
    <!-- 总的数据 -->
    <div class="overview--wrap mb16">
      <div class="overview__cell" v-for="(item, i) in overview.list" :key="i">
        <p class="overview__cell__value">
          <Tooltip
            :disabled="overview.data[item] < 1000"
            :content="overview.data[item] | countThree"
            placement="bottom"
            theme="light"
          >
            <span>
              {{ overview.data[item] | countShort }}
            </span>
          </Tooltip>
        </p>
        <p class="overview__cell__name">{{ overview.name_map[item] }}</p>
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

    return {
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
    this.doGetTableDataAll()
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
    }
  }
}
</script>

<style scoped lang="less">
.user-statistic {
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
