<template>
  <div class="layout">
    <Menu
      class="layout-menu"
      :active-name="$route.meta.menuIndex"
      :open-names="['01', '02']"
    >
      <!-- 只打开一个 -->
      <!-- :open-names="[$route.meta.menuIndex < 100 ? '01' : '02']" -->
      <!-- logo -->
      <div class="logo cp" @click="handleToRoute({ name: 'UserStatistic' })">
        <img src="../assets/logo-xm.png" alt="" class="img-logo" />
      </div>
      <!-- 菜单 -->
      <div class="flex1 itv-flex-v--fs">
        <!-- 小码短链接 -->
        <Submenu name="01">
          <div slot="title" class="img-logo-sub">
            <img
              src="../assets/logo-link.png"
              class="img-logo-link"
              alt="小码短链接"
            />
          </div>
          <!-- 菜单 -->
          <div class="flex1 itv-flex-v--fs">
            <MenuItem
              v-for="item in menu_link"
              :name="item.name"
              :key="`menu_${item.name}`"
              @click.native="handleToRoute(item.route)"
              class="menu-item"
            >
              <span class="ib20">{{ item.title }}</span>
            </MenuItem>
          </div>
        </Submenu>

        <!-- 小码渠道码 -->
        <Submenu name="02">
          <div slot="title" class="img-logo-sub">
            <img
              src="../assets/logo-qr.png"
              class="img-logo-link"
              alt="小码渠道码"
            />
          </div>
          <MenuItem
            v-for="item in menu_qr"
            :name="item.name"
            :key="`menu_${item.name}`"
            :to="item.route"
            class="menu-item"
          >
            <span class="ib20">{{ item.title }}</span>
          </MenuItem>
        </Submenu>
      </div>

      <!-- 用户名称 -->
      <Dropdown
        class="setting layout_setting"
        placement="bottom-start"
        transfer
      >
        <span class="layout_user_name itv-flex--sb">
          {{ $bus.admin.username }}
          <Icon type="md-settings" class="mr16" />
        </span>
        <DropdownMenu slot="list">
          <DropdownItem style="width: 160px;" @click.native="handleChangePwd"
            >修改密码</DropdownItem
          >
          <DropdownItem style="width: 160px;" @click.native="toUploadImage"
            >上传图片</DropdownItem
          >
          <DropdownItem style="width: 160px;" @click.native="handleSignOut"
            >退出</DropdownItem
          >
        </DropdownMenu>
      </Dropdown>
    </Menu>
    <div
      :class="[
        'layout-content-wrap',
        $route.meta.menuIndex === '1' ? 'bg-none' : ''
      ]"
    >
      <transition name="fade" mode="out-in">
        <router-view class="layout-content" v-if="show_view" />
      </transition>
    </div>
    <Modal
      :mask-closable="false"
      v-model="modal.show"
      title="修改密码"
      @on-visible-change="handleModalShow"
    >
      <Form
        ref="refChangePwdForm"
        :label-width="168"
        label-position="left"
        :model="modal.form"
        :rules="modal.rules"
      >
        <FormItem label="新密码" prop="password">
          <Input
            v-model="modal.form.password"
            placeholder="请输入新密码"
            style="width: 214px;"
          />
        </FormItem>
        <FormItem label="确认新密码" prop="password2">
          <Input
            v-model="modal.form.password2"
            placeholder="确认新密码"
            style="width: 214px;"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal.show = false">取消</Button>
        <Button type="primary" @click="doChangePwd" :loading="modal.isSubmiting"
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      show_view: false,
      modal: {
        show: false,
        isSubmiting: false,
        form: {
          password: '',
          password2: ''
        },
        rules: {
          password: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          password2: [
            {
              required: true,
              validator: (rules, value, cbFun) => {
                if (!value) {
                  return cbFun(new Error('请输入'))
                }
                if (this.modal.form.password !== this.modal.form.password2) {
                  return cbFun(new Error('两次输入的密码不一致'))
                }
                return cbFun()
              },
              trigger: 'blur'
            }
          ]
        }
      },
      menu_link: [
        {
          name: '2',
          title: '用户列表',
          route: { name: 'UserList' }
        },
        {
          name: '3',
          title: '短链数据',
          route: { name: 'ShortLinkStatistic' }
        },
        {
          name: '4',
          title: '短链列表',
          route: { name: 'ShortLinkList' }
        },
        {
          name: '5',
          title: '跳转链接数据',
          route: { name: 'TargetLinkStatistic' }
        },
        {
          name: '6',
          title: '协作空间列表',
          route: { name: 'SpaceList' }
        },
        {
          name: '7',
          title: 'API域名列表',
          route: { name: 'ApiDomainList' }
        },
        {
          name: '8',
          title: 'API待审核域名',
          route: { name: 'ApiDomainCheck' }
        }
      ],
      menu_qr: [
        {
          name: '101',
          title: '用户列表',
          route: { name: 'UserListQr' }
        },
        {
          name: '103',
          title: '二维码列表',
          route: { name: 'QrList' }
        },
        {
          name: '104',
          title: '公众号列表',
          route: { name: 'AccountList' }
        }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getAdminDetail()
    setTimeout(() => {
      this.show_view = true
    }, 300)
  },
  methods: {
    toUploadImage() {
      const name = this.$route.name

      if (name !== 'UploadImgs') {
        this.$router.push({ name: 'UploadImgs' })
      }
    },
    // 获取当前管理员详情
    async getAdminDetail() {
      try {
        const res = await this.$api.Admin.getAdminDetail()

        this.$bus.admin = res.admin
      } catch (e) {
        this.$router.push({ name: 'Login' })
      }
    },

    async doChangePwd() {
      if (this.$global.utils.verifyForm(this.$refs.refChangePwdForm)) {
        try {
          await this.$api.Admin.putPassword({
            password: this.modal.form.password
          })
          this.$PDo.Cookies.remove(process.env.VUE_APP_COOKIE)
          this.$router.replace({ name: 'Login' })
          this.modal.show = false
        } catch (e) {
          console.error(e)
        }
      }
    },
    handleChangePwd() {
      console.log('修改密码')
      this.modal.show = true
    },
    handleModalShow(v) {
      if (!v) {
        this.$refs.refChangePwdForm.resetFields()
      }
    },
    handleSignOut() {
      console.log('退出登陆')
      this.$PDo.Cookies.remove(process.env.VUE_APP_COOKIE)
      location.reload()
    },
    handleToRoute(route) {
      if (this.$route.name !== route.name) {
        this.$router.push(route)
      }
    }
  }
}
</script>

<style lang="less">
.layout {
  background: #f8f8f9;
  height: 100vh;
  display: flex;
  h2 {
    margin-bottom: 24px;
    text-align: center;
  }
  .img-logo {
    height: 40px;
  }
  .img-logo-sub {
    width: 50px;
    text-align: right;
  }
  .img-logo-link {
    height: 24px;
  }
  .logo {
    width: 100%;
    text-align: center;
    margin-bottom: 28px;
    position: relative;
    // &::after {
    //   content: '';
    //   height: 1px;
    //   width: 98%;
    //   display: block;
    //   left: 1%;
    //   bottom: -18px;
    //   position: absolute;
    //   background: @border-color-split;
    // }
  }
  .layout-menu {
    padding: 32px 0 0;
    width: 200px !important;
    height: 100vh;
    overflow: auto;
    border: none;
    display: flex;
    flex-direction: column;
  }
  &-content-wrap {
    display: flex;
    flex: 1;
    margin-left: 8px;
    max-height: 100vh;
    height: 100vh;
    overflow: hidden;
    padding: 0;
    background: #fff;
    height: 100vh;
    &.bg-none {
      background: transparent;
    }
    &.bg-none .layout-content {
      padding: 16px 16px 0 0;
    }
  }
  &-content {
    flex: 1;
    margin-left: 8px;
    max-height: 100vh;
    height: 100vh;
    overflow: hidden;
    padding: 32px 24px 20px 24px;
    height: 100vh;
  }
}
.layout_setting {
  // position: absolute;
  // bottom: 20px;
  // left: 0px;
  padding-left: 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fff;
  height: auto;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0px -2px 9px @border-color-base;
}
.layout_user_name {
  color: @primary-color;
}
.ivu-menu-horizontal.ivu-menu-light:after,
.ivu-menu-vertical.ivu-menu-light:after {
  display: none;
}

// 导航 hover 时，图标的随之变化color
.menu-item:hover {
  .menu-item__icon {
    color: @primary-color;
  }
}

.menu-item {
  font-size: 14px !important;
}

// bugfix：侧边导航有子目录时， hover 位置缩小
.sub-menu__wrap {
  /deep/.ivu-menu-submenu-title {
    padding: 0;
  }
  .menu-item {
    padding: 14px 24px;
  }

  .ivu-menu-submenu-title:hover {
    .menu-item__icon {
      color: @primary-color;
    }
  }
}
</style>
