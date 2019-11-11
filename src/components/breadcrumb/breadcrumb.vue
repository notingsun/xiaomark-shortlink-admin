/* 面包屑组件封装，标题可以直接 */
<template>
  <!-- 使用方法：
    标题模式：
      <itv-breadcrumb data="自动化营销工具" mb="mb24"/>

    面包屑模式：
      <itv-breadcrumb :data="cal_breadcrumb_data"/>


    1、data 数据格式：
      提示： replace 默认为true，所以可以不传入
      data: [
        { title: '自动化营销工具', replace: true, to: '/marketing_tools/index' },
        { title: '会员积分兑换提醒', to: '/marketing_tools/redeem-list' },
        { title: '编辑' }
      ]

    2、mb 底部的边距，默认是mb0
  -->
  <Breadcrumb :class="mb">
    <BreadcrumbItem
      v-for="(item, i) in cal_data"
      :key="i"
      :class="i + 1 === cal_data.length ? '' : 'itv-breadcrumb-item--small'"
      :replace="item.replace"
      :to="item.to"
    >
      {{ item.title }}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  name: 'ItvBreadcrumb',
  mixins: [],
  props: {
    data: {
      required: true,
      type: [Array, String]
    },
    mb: {
      type: String,
      default: 'mb0'
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    cal_data() {
      let data = this.data

      // 兼容标题模式
      if (typeof this.data === 'string') {
        data = [{ title: this.data }]
      }
      // 默认将replace 设置为 true
      return data.map((item) => {
        let temp = { ...item }

        if (item.replace !== false) {
          temp.replace = true
        }
        return temp
      })
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang="less">
//.breadcrumb {
//}
</style>
