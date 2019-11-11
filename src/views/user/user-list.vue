/* 用户列表 */
<template>
  <div class="user-list">
    <!-- 表格 -->
    <Table
      style="flex: 1;"
      ref="refTable"
      :height="table.height"
      :columns="table.columns"
      :data="table.data"
    />
    <!-- 分页器 -->
    <itv-pagination :total="total" @on-change="getApplications" />
  </div>
</template>

<script>
export default {
  name: 'UserList',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      table: {
        data: [],
        columns: [
          {
            title: 'id',
            key: 'id',
            width: 50
          },
          {
            title: '创建时间',
            key: 'create_time',
            render: (h, { row }) => {
              return <span>{this.$PDo.Date.format(row.create_time)}</span>
            }
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '电话',
            key: 'phone'
          },
          {
            title: '微信号',
            key: 'wechat'
          },
          {
            title: '公司',
            key: 'company'
          }
        ],
        height: null // 表格的高度
      },
      table_loading: true,
      total: 0
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang="less">
//.user-list {
//}
</style>
