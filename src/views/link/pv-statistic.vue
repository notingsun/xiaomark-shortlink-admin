/* 链接访问次数统计 */
<template>
  <div class="pv-statistic">链接访问次数统计</div>
</template>

<script>
import testData from './test'
export default {
  name: 'PvStatistic',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    this.doGetData()
  },
  watch: {},
  methods: {
    async doGetData() {
      try {
        // const v = this.$PDo.Date.format(new Date().toLocaleDateString(), 'y-m-d')
        // const stats_date = '2020-07-15~2020-07-15'

        // const res = await this.$api.Statistic.getLinkPv({ stats_date })
        const res = testData

        console.log(res)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
//.pv-statistic {
//}
</style>
