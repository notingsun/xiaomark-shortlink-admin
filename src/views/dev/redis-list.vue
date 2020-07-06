/* 获取Redis集群运行数据 */
<template>
  <div class="redis-list itv-flex-v--fs">
    <!-- 头部 -->
    <div class="header mb16 itv-flex--sb">
      <div class="header__search">
        <Tabs v-model="redisType">
          <TabPane v-for="(item, i) in redisTypeArr" :label="item" :name="item" :key="i"></TabPane>
        </Tabs>
      </div>
      <Button type="primary" @click="doGetData">刷新</Button>
    </div>
    <!-- 表格 -->
    <Table style="flex:1" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'

export default {
  name: 'RedisList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    this.redisTypeArr = ['cluster', 'server', 'clients', 'memory', 'persistence', 'stats', 'keyspace']

    return {
      redisType: 'cluster',
      pluginList: {},
      form: {},
      bridges_data: {},
      modal: {
        show: false,
        isSubmiting: false
      },
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '插件应用中间页地址',
            minWidth: 300,
            key: 'bridge'
          }
        ],
        height: null // 表格的高度
      }
    }
  },
  computed: {},
  created() {},
  async mounted() {
    this.doGetData()
    try {
      await this.$api.Admin.getRedis()
    } catch (e) {
      console.error(e)
    }
  },
  watch: {
    'modal.show'(v) {
      console.log(v)
    },
    redisType(v) {
      this.showData(v)
    }
  },
  methods: {
    // 获取表格的数据
    async doGetData() {
      this.loading = true
      try {
        let res = await this.$api.Admin.getRedis({})

        this.res = res
        this.showData()
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    // 切换数据
    showData(type) {
      this.domTableScrollTop()
      let res = this.res

      let redisType = type || this.redisType

      res = (res || {})[redisType] || {}

      const columnArr = Object.keys(res) || []
      const rowArr = Object.keys(res[columnArr[0]] || {}).sort()

      let columns = [
        {
          title: '',
          minWidth: 300,
          key: 'valueName'
        }
      ]

      columnArr.forEach((columnName) => {
        columns.push({
          title: columnName,
          minWidth: 300,
          key: columnName
        })
      })

      let data = []

      rowArr.forEach((rowName) => {
        let rowData = {
          valueName: rowName
        }

        columnArr.forEach((columnName) => {
          rowData[columnName] = res[columnName][rowName]
        })
        data.push(rowData)
      })

      this.table.columns = columns
      this.table.data = data
    }
  }
}
</script>

<style lang="less">
// .redis-list {
// }
// .modal--plugin--bridge {
//   .row {
//     margin-bottom: ;
//   }
// }
</style>
