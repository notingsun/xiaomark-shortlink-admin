/* [某个公众号]客服消息列表 */
<template>
  <div class="service-list itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <Breadcrumb v-show="$route.query.name">
        <BreadcrumbItem class="cp" @click.native="$router.go(-1)"
          >公众号列表</BreadcrumbItem
        >
        <BreadcrumbItem>{{ $route.query.name }} 推送的客服消息</BreadcrumbItem>
      </Breadcrumb>
      <div class="header__search">
        <Input
          clearable
          v-model="form.search"
          placeholder="请输入"
          style="width: 300px"
          @on-enter="doGetData"
          @on-clear="doGetData"
          class="mr8"
        />
        <Button type="primary" @click="doGetData">搜索</Button>
      </div>
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
    <!-- 分页器 -->
    <itv-pagination :total="table.total" @on-change="doGetData" />
    <!-- 对话框.详情 -->
    <modal-msg-detail v-model="dialog_detail.show" :data="dialog_detail.data" />
  </div>
</template>

<script>
import tableMixins from '../table-mixins'
import listMixins from './components/mixins-msg-list'
import ModalMsgDetail from './components/modal-msg-detail'

export default {
  name: 'ServiceList',
  mixins: [tableMixins, listMixins],
  props: {},
  components: { ModalMsgDetail },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    this.doGetData()
  },
  watch: {
    '$route.name': {
      handler: function() {
        this.initColumns()
      },
      immediate: true
    }
  },
  methods: {
    // 初始化表头（公共的，是否显示公众号）
    initColumns() {
      if (this.$route.params.account_id) {
        this.table.columns = [
          this.columns_map.name, // 推送名称
          this.columns_map.push_time, // 实际发送时间
          this.columns_service_map.msg_type, // 消息类型
          this.columns_map.n_pushes, // 送达的人数
          this.columns_service_map.actions // 操作
        ]
      } else {
        this.table.columns = [
          this.columns_map.name, // 推送名称
          this.columns_map.platform, // 服务号
          this.columns_map.push_time, // 实际发送时间
          this.columns_service_map.msg_type, // 消息类型
          this.columns_map.n_pushes, // 送达的人数
          this.columns_service_map.actions // 操作
        ]
      }
    },

    // 获取表格数据
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
          platform_id: this.$route.params.account_id || '',
          name: this.form.search
        }

        const res = await this.$api.Qr.getServiceList({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.messages || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },

    // 点击详情
    handleDetail(row) {
      this.dialog_detail.show = true
      this.dialog_detail.data = row
    }
  }
}
</script>

<style scoped lang="less">
.service-list {
  .cp {
    cursor: pointer;
  }
}
</style>
