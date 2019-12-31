import Vue from 'vue'

export default new Vue({
  data() {
    return {
      token: null, // 登陆的token
      admin: {}, // 用户信息
      auto_login: null, // 是否自动登陆
      view_width: null, // 浏览器可视范围的宽度
      modal: {
        titleMap: {
          ws_creator: '设置创建协作空间权限',
          enabled: '设置用户登录权限'
        },
        type: '', // 对话框类型 [ ws_creator:用户协作空间创建权限 、 enabled:用户拉黑 ]
        show: false, // 显示对话框
        obj: null // 操作对象
      }, // 是否xxx.确认.对话框
      EVENTS: {
        LOGIN: 'LOGIN',
        AUTO_LOGIN: 'AUTO_LOGIN'
      } // 需要监听的事件
    }
  }
})
