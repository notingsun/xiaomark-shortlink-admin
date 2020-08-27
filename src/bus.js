import Vue from 'vue'

export default new Vue({
  data() {
    return {
      token: null, // 登陆的token
      admin: {}, // 用户信息
      auto_login: null, // 是否自动登陆
      view_width: null, // 浏览器可视范围的宽度
      modal: {
        type: '', // 对话框类型
        show: false, // 显示对话框
        obj: null, // 操作对象
        success_cb: Function // 操作成功的回调
      }, // 是否xxx.确认.对话框
      modal2: {
        type: '', // 对话框类型
        show: false, // 显示对话框
        obj: null, // 操作对象
        success_cb: Function // 操作成功的回调
      }, // 是否xxx.确认.对话框(渠道码)
      modal3: {
        type: '', // 对话框类型
        show: false, // 显示对话框
        obj: null, // 操作对象
        success_cb: Function // 操作成功的回调
      }, // 套餐对话框（短链接）
      /* 用户详情.抽屉 */
      drawer_user: {
        // show: true, // 是否显示
        // id: '2' // 用户的id
        show: false, // 是否显示
        id: '' // 用户的id
      },
      // 用户的标签列表
      userTags: {},
      EVENTS: {
        LOGIN: 'LOGIN',
        AUTO_LOGIN: 'AUTO_LOGIN'
      } // 需要监听的事件
    }
  },
  methods: {
    // 获取用户标签
    updateUserTags(v) {
      let res = {}

      v.forEach((item) => {
        res[item.id] = item.name
      })
      this.userTags = res
    }
  }
})
