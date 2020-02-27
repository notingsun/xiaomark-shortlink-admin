/* 用户创建的短链页 */
<template>
  <div class="short-link-list-custom-domain itv-flex-v--fs">
    <!-- 面包屑 -->
    <div class="header mb16 itv-flex--sb">
      <div class="itv-flex--fs">
        <itv-icon
          type="i-back"
          title="返回"
          size="20"
          class="itv-btn__icon mr16"
          @click="$router.go(-1)"
        />
        <Breadcrumb>
          <BreadcrumbItem>短链列表</BreadcrumbItem>
          <BreadcrumbItem>
            自定义域名：{{ $route.params.domain_name }}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <Select
        v-model="form.sort"
        style="width:150px"
        @on-change="doGetData"
        placement="bottom-end"
      >
        <Option
          v-for="(item, index) in options.sort"
          :value="item.value"
          :key="index"
          >{{ item.label }}</Option
        >
      </Select>
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
  </div>
</template>

<script>
import tableMixins from '../table-mixins'
import shortLinkMixins from '../common/mixins-short-link'

export default {
  name: 'ShortLinkListCustomDomain',
  mixins: [tableMixins, shortLinkMixins],
  props: {},
  components: {},
  data() {
    return {
      // 获取表格数据的参数
      form: {
        has_params: '',
        archived: '',
        enabled: '',
        sort: 'time'
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.doGetData()
  },
  watch: {},
  methods: {
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
          api: this.form.api ? 1 : 0, // 是否为开放API创建
          domain: this.$route.params.domain_name, // 用户ID
          has_params: this.form.has_params,
          archived: this.form.archived,
          enabled: this.form.enabled,
          order_by: this.form.sort
        }

        const res = await this.$api.Link.getShortLinkList({
          ...params,
          ...this.$global.utils.pagination.params()
        })

        this.table.total = res.total
        this.table.data = res.links || []
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.short-link-list-custom-domain {
  .cp {
    cursor: pointer;
  }
}
</style>
