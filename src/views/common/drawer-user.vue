/* 用户详情的抽屉 */
<template>
  <div class="drawer-user">
    <Drawer title="用户详情" :closable="false" v-model="drawer.show">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: 'DrawerUser',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {
    drawer() {
      return this.$bus.drawer_user
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style scoped lang="less">
//.drawer-user {
//}
</style>
