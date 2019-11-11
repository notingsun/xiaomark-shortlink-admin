<template>
  <div class="layout">
    <Menu class="layout-menu" :active-name="$route.meta.menuIndex">
      <!-- <h2>SCRM 管理后台</h2> -->
      <div class="logo">
        <img src="../assets/logo-1.png" alt="" class="logo--img" />
      </div>
      <template v-for="item in menu">
        <MenuItem
          :name="item.name"
          :key="`menu_${item.name}`"
          :to="item.route"
          class="menu-item"
        >
          <!-- <itv-icon
            :type="item.icon"
            width="20px"
            height="20px"
            :color="item.name == sub_menu_active ? 'primary' : 'sub'"
            class="menu-item__icon ib20 mr24"
          /> -->
          <span class="ib20">{{ item.title }}</span>
        </MenuItem>
      </template>
      <Dropdown class="setting">
        <a href="javascript:void(0)">
          {{ $bus.admin.username }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="handleChangePwd">修改密码</DropdownItem>
          <DropdownItem @click.native="handleSignOut">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Menu>
    <transition name="fade" mode="out-in">
      <router-view class="layout-content" />
    </transition>
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
      menu: [
        {
          name: '1',
          title: '用户数据',
          icon: 'i-home',
          route: { name: 'UserStatistic' }
        },
        {
          name: '2',
          title: '用户列表',
          icon: 'i-email',
          route: { name: 'UserList' }
        },
        {
          name: '3',
          title: '短链数据',
          icon: 'i-email',
          route: { name: 'ShortLinkStatistic' }
        },
        {
          name: '4',
          title: '短链列表',
          icon: 'i-email',
          route: { name: 'ShortLinkList' }
        },
        {
          name: '5',
          title: '跳转链接数据',
          icon: 'i-email',
          route: { name: 'TargetLinkStatistic' }
        }
      ]
    }
  },
  computed: {
    // 选中的侧边菜单
    sub_menu_active() {
      const sub_menu_active = this.$route.meta.menuIndex

      // console.log('------选中的侧边菜单 ', sub_menu_active)
      return sub_menu_active
    }
  },
  created() {},
  mounted() {
    this.getAdminDetail()
  },
  methods: {
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
  .logo {
    width: 100%;
    text-align: center;
    margin-bottom: 28px;
    &--img {
      width: 120px;
      height: 55px;
      object-fit: contain;
    }
  }
  &-menu {
    padding: 32px 0;
    width: 200px !important;
    height: 100vh;
    overflow: auto;
    border: none;
  }
  &-content {
    flex: 1;
    margin-left: 8px;
    max-height: 100vh;
    height: 100vh;
    overflow: hidden;
    padding: 32px 24px;
    background: #fff;
    height: 100vh;
  }
  .setting {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
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
