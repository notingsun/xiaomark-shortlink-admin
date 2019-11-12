<template>
  <div class="itv-login">
    <div class="content">
      <div class="content__title">小码短链接 管理后台</div>
      <Form ref="form" label-position="left" class="mt40">
        <FormItem>
          <Input size="large" v-model="form.username" placeholder="账户" />
        </FormItem>
        <FormItem prop="password" class="mb16">
          <Input
            size="large"
            type="password"
            v-model="form.password"
            placeholder="密码"
            @keyup.enter.native="handleLogin"
          />
        </FormItem>
        <FormItem style="text-align: left;" class="mb16">
          <Checkbox v-model="$bus.auto_login" @on-change="handleSiwtchAutoLogin"
            >自动登录</Checkbox
          >
        </FormItem>
        <FormItem class="mb32">
          <Button
            type="primary"
            long
            class="mb4 content__btn"
            :loading="loading"
            @click="handleLogin"
            >登录</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  created() {},
  computed: {
    /* 选择了自动登陆，将cookie的过期时间设置为7天后 */
    token_expires() {
      return this.$bus.auto_login ? { expires: 7 } : {}
    }
  },
  mounted() {},
  methods: {
    /* 点击.登陆 */
    async handleLogin() {
      this.loading = true

      try {
        this.loading = false
        const res = await this.$api.Admin.login(this.form)

        this.handleLoginSuccess(res)
      } catch (e) {
        this.loading = false
        console.error(e)
      }
    },

    /* 登陆成功的处理 */
    handleLoginSuccess(res) {
      this.$Message.success('登录成功')
      this.$PDo.Cookies.set(
        process.env.VUE_APP_COOKIE,
        res.token,
        this.token_expires // 是否自动登陆
      )
      this.$bus.$emit(this.$bus.EVENTS.LOGIN, res.token)
      this.$router.push({ name: 'UserList' })
    },

    /* 切换自动登陆 */
    handleSiwtchAutoLogin(v) {
      this.$bus.$emit(this.$bus.EVENTS.AUTO_LOGIN, v)
    }
  }
}
</script>
<style lang="less">
.itv-login {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom right,
    @primary-color,
    @primary-color-30
  );
  .content {
    width: 300px;
    text-align: center;

    &__title {
      color: #436099;
      font-size: 28px;
    }

    &__btn {
      font-size: 14px;
      height: 36px;
      background: @primary-color;
    }
  }
}
</style>
