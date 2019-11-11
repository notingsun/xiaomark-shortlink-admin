import Vue from 'vue'

export default new Vue({
  data() {
    return {
      token: null, // 登陆的token
      admin: {}, // 用户信息
      auto_login: null, // 是否自动登陆
      EVENTS: {
        LOGIN: 'LOGIN',
        AUTO_LOGIN: 'AUTO_LOGIN'
      } // 需要监听的事件
    }
  }
})
