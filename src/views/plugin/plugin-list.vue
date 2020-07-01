/* 自定义域名列表 */
<template>
  <div class="plugin-list itv-flex-v--fs">
    <!-- 表格 -->
    <Table :loading="loading" style="flex: 1;" ref="refTable" :height="table.height" :columns="table.columns" :data="table.data" />
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'

export default {
  name: 'PluginList',
  mixins: [tableMixins],
  props: {},
  components: {},
  data() {
    return {
      form: {
        bind: ''
        // status: '',
        // enabled: ''
      },
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '名称',
            minWidth: 240,
            key: 'hostname netloc favicon',
            render: (h, { row }) => {
              return <span>{row.domain}</span>
            }
          },
          {
            title: '打开人数',
            minWidth: 180,
            key: 'create_time',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.bind_time)}</span>
            }
          },
          {
            title: '应用控件数量',
            minWidth: 180,
            key: 'create_time',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.bind_time)}</span>
            }
          },
          {
            title: '应用短链数量',
            minWidth: 120,
            key: 'hostname netloc favicon',
            render: (h, { row }) => {
              return <span>{row.n_links}</span>
            }
          }
        ],
        height: null // 表格的高度
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    const { page, per_page } = this.$route.query
    const params = page && per_page ? { page, per_page } : ''

    this.doGetData(params)
  },
  watch: {},
  methods: {
    // 获取表格的数据
    doGetData(page = {}) {
      if (!page.page) {
        this.$global.utils.pagination.reset()
        this.$nextTick(() => {
          this.doGetData2()
        })
      } else {
        this.doGetData2()
      }
    },
    async doGetData2() {
      this.loading = true
      this.domTableScrollTop()
      try {
        const params = {
          bind: this.form.bind
          // resolved: this.form.status, // DNS解析是否正确：0 - 否，1 - 是
          // enabled: this.form.enabled // 是否可用：0 - 不可用，1 - 可用
        }
        const res = await this.$api.Plugin.getPluginList({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.domains || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less">
// .plugin-list {
// }
</style>
