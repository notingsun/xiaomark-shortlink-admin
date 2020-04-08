/* 用户详情的抽屉 */
<template>
  <Drawer
    title=""
    :closable="false"
    v-model="drawer.show"
    class="drawer-user"
    :width="440"
  >
    <Spin fix v-show="loading" />
    <div class="pl16" v-show="show_page">
      <!-- 头像 -->
      <div class="row mb32">
        <img :src="data.headimgurl" class="img--headimgurl mr16" />
        <span>{{ data.nickname }}</span>
      </div>

      <!-- 是否可登录 -->
      <div class="row">
        <div class="label">是否可登录</div>
        <itv-icon
          class="cp"
          :title="data.enabled ? '可登录' : '不可登录'"
          :type="data.enabled ? 'i-stop' : 'i-start'"
          size="20"
          :style="{
            color: data.enabled ? C_GREEN : C_GREY
          }"
          @click="
            () => {
              this.$bus.modal.type = 'enabled'
              this.$bus.modal.show = true
              this.$bus.modal.obj = data
              this.$bus.modal.success_cb = this.doGetData
            }
          "
        />
      </div>

      <!-- API 权限 -->
      <div class="row">
        <div class="label">API 权限</div>
        <Icon
          :title="data.api_auth ? '有API权限' : '没有API权限'"
          type="md-checkmark-circle"
          :color="data.api_auth ? C_GREEN : C_GREY"
          size="20"
        />
      </div>

      <!-- API 创建上限 -->
      <div class="row">
        <div class="label"></div>
        <!-- <div class="label">API 创建上限</div> -->

        <div class="itv-flex--fs">
          <span title="每日创建短链接上限">{{ data.api_n_links_d_limit }}</span>
          <span
            class="itv-text--btn ml8"
            style="margin-top: -2px;"
            @click="
              () => {
                this.$bus.modal.type = 'open_api_domain'
                this.$bus.modal.show = true
                this.$bus.modal.obj = data
                this.$bus.modal.success_cb = this.doGetData
              }
            "
          >
            设置上限
          </span>
        </div>
      </div>

      <!-- 最近登录时间 -->
      <div class="row">
        <div class="label">最近登录时间</div>
        <div>{{ last_login_time }}</div>
      </div>

      <!-- 注册时间 -->
      <div class="row">
        <div class="label">注册时间</div>
        <div>{{ create_time }}</div>
      </div>

      <!-- 短链访问次数 -->
      <div class="row">
        <div class="label">短链访问次数</div>
        <div>{{ data.n_clicks }}</div>
      </div>

      <!-- 创建短链数量 -->
      <div class="row">
        <div class="label">创建短链数量</div>
        <div>
          {{ data.n_links }}
          <!-- （普通: {{ data.n_normal_links }}、 随机:{{ data.n_random_links }}） -->
        </div>
      </div>

      <!-- 协作空间 -->
      <div class="row">
        <div class="label">协作空间权限</div>
        <div>
          <Icon
            :title="data.ws_creator ? '可以创建协作空间' : '不可以创建协作空间'"
            type="md-checkmark-circle"
            :color="data.ws_creator ? C_GREEN : C_GREY"
            size="20"
          />
          <!-- <span>（创建: {{ data.n_ws_created }}、</span> -->
          <!-- <span>加入: {{ data.n_ws_joined }}）</span> -->
        </div>
      </div>

      <!-- 创建协作空间数量 -->
      <div class="row">
        <div class="label"></div>
        <!-- <div class="label">创建协作空间数量</div> -->
        <div class="itv-flex--fs">
          <span>创建：{{ data.n_ws_created }}</span>
        </div>
      </div>

      <!-- 加入协作空间数量 -->
      <div class="row">
        <div class="label"></div>
        <!-- <div class="label">加入协作空间数量</div> -->
        <div>加入：{{ data.n_ws_joined }}</div>
      </div>

      <!-- 其他 -->
      <div class="row">
        <div class="label">其他</div>
        <div>
          <span class="mr8" title="是否关注服务号">
            <itv-icon
              type="i-attention"
              :style="{ color: data.subscribe ? C_GREEN : C_GREY }"
              size="24"
            />
          </span>
          <span class="mr8" title="是否网页登录">
            <itv-icon
              type="i-pc"
              :style="{ color: data.sa_openid ? C_ORANGE : C_GREY }"
              size="24"
            />
          </span>
          <span title="是否小程序登录">
            <itv-icon
              type="i-wx"
              :style="{ color: data.mp_openid ? C_BLUE : C_GREY }"
              size="24"
            />
          </span>
        </div>
      </div>

      <!-- 来源 -->
      <div class="row">
        <div class="label">来源</div>
        <div style="word-break: break-all">{{ data.source || '-' }}</div>
      </div>

      <!-- openid -->
      <div class="row">
        <div class="label">openid</div>
        <div class="itv-flex--fs">
          <div style="word-break: break-all;font-size: 12px;">
            {{ data.sa_openid || '-' }}
          </div>
          <div
            title="复制链接"
            class="ml4"
            style="flex-shrink:0;"
            v-if="data.sa_openid"
          >
            <itv-icon
              type="i-copy2"
              class="itv-text--btn"
              size="20"
              color=""
              @click="handleCopy(data.sa_openid)"
            />
          </div>
        </div>
      </div>

      <!-- 操作 -->
      <div class="row">
        <div class="label">操作</div>
        <div class="itv-flex--v--fs">
          <!-- 查看短链 -->
          <div
            class="mb8 itv-flex--fs"
            @click="
              $bus.drawer_user.show = false
              $router.push({
                name: 'ShortLinkListUser',
                params: { user_id: data.id },
                query: { name: data.nickname }
              })
            "
          >
            <itv-icon type="i-detail" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">查看短链</span>
          </div>
          <!-- 查看协作空间 -->
          <div
            class="mb8 itv-flex--fs"
            @click="
              $bus.drawer_user.show = false
              $router.push({
                name: 'SpaceListUser',
                params: { user_id: data.id },
                query: { name: data.nickname }
              })
            "
          >
            <itv-icon type="i-member" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">查看协作空间</span>
          </div>
          <!-- 登录该用户 -->
          <div
            class="mb8 itv-flex--fs"
            @click="
              () => {
                $bus.modal.type = 'login_user'
                $bus.modal.show = true
                $bus.modal.obj = data
              }
            "
          >
            <itv-icon type="i-eye" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">登录该用户</span>
          </div>
          <!-- 打标签 -->
          <div
            class="mb8 itv-flex--fs"
            @click="
              () => {
                $bus.modal.type = 'user_tags'
                $bus.modal.show = true
                $bus.modal.obj = data
              }
            "
          >
            <itv-icon type="i-tag" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">打标签</span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!show_page">报错: {{ page_error }}</div>
  </Drawer>
</template>

<script>
export default {
  name: 'DrawerUser',
  mixins: [],
  props: {},
  components: {},
  data() {
    this.C_GREEN = '#47cb89'
    this.C_ORANGE = '#e88986'
    this.C_BLUE = '#4F87FB'
    this.C_GREY = '#c5c8ce'

    return {
      page_error: '',
      show_page: false,
      loading: true,
      data: {}
    }
  },
  computed: {
    drawer() {
      return this.$bus.drawer_user
    },
    user_id() {
      return (this.$bus.drawer_user || {}).id
    },
    last_login_time() {
      const time = (this.data || {}).last_login_time || ''

      return time ? this.$PDo.Date.format(time) : '-'
    },
    create_time() {
      const time = (this.data || {}).create_time || ''

      return time ? this.$PDo.Date.format(time) : '-'
    }
  },
  created() {},
  mounted() {},
  watch: {
    'drawer.show'(v) {
      if (v) {
        this.doGetData()
      }
    }
  },
  methods: {
    async doGetData() {
      this.loading = true
      try {
        const res = await this.$api.User.getUserDetail(this.user_id)

        this.data = (res || {}).user
        this.show_page = true
      } catch (e) {
        console.error(e)
        this.show_page = false
        this.page_error = e.message || '获取用户详情失败'
      }
      this.loading = false
    },
    handleCopy(data) {
      this.$PDo.Utils.copy({
        content: data,
        success: () => {
          this.$Message.success('复制成功！')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.drawer-user {
  .row {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 16px;
    .label {
      width: 150px;
      font-weight: 500;
      // text-align: right;
      text-align: left;
      padding-right: 24px;
      align-self: flex-start;
    }
  }
  .img--headimgurl {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
    display: block;
  }
  .itv-text--btn {
    font-weight: 500;
  }
}
</style>
