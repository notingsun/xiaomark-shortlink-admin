<template>
  <div id="app">
    <router-view />
    <!-- 对话框 -->
    <sure-modal />
    <!-- 对话框 -->
    <sure-modal2 />
  </div>
</template>

<script>
import SureModal from './views/common/sure-modal'
import SureModal2 from './views/qr/components/sure-modal'

export default {
  name: 'app',
  components: { SureModal, SureModal2 },
  created() {
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
      document.title = document.title + '（本地测试）'
    }
  },
  mounted() {
    // 全局设置Message距离顶部的高度
    // this.$Message.config({
    //   top: 300
    // })

    // 登录 LOGIN 触发的事件
    this.$bus.$on(this.$bus.EVENTS.LOGIN, (token) => {
      this.$bus.token = token
    })

    // 自动登录 AUTO_LOGIN 触发的事件
    this.$bus.$on(this.$bus.EVENTS.AUTO_LOGIN, (value) => {
      this.$bus.auto_login = value
      localStorage.setItem('SCRM_ADMIN_AUTO_LOGIN', value)
    })

    // 获取Cookies，并保存在this.$bus.token中
    this.$bus.$emit(
      this.$bus.EVENTS.LOGIN,
      this.$PDo.Cookies.get(process.env.VUE_APP_COOKIE)
    )

    // 获取是否自动登陆
    this.$bus.$emit(
      this.$bus.EVENTS.AUTO_LOGIN,
      JSON.parse(localStorage.getItem('SCRM_ADMIN_AUTO_LOGIN') || 'false')
    )

    // 如果没有token，跳转到登陆页
    // TODO 测试一下这个有没有问题
    if (!this.$bus.token && this.$route.name !== 'Login') {
      this.$router.replace({ name: 'Login' })
    }

    this.$bus.view_width = window.innerWidth
  }
}
</script>
