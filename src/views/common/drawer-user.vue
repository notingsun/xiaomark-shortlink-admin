/* 用户详情的抽屉 */
<template>
  <Drawer title="" :closable="false" v-model="drawer.show" class="drawer-user" :width="440">
    <Spin fix v-show="loading" />
    <div class="pl16 pb32" v-show="show_page">
      <!-- 头像 -->
      <div class="row mb32">
        <img :src="data.headimgurl" class="img--headimgurl mr16" />
        <span class="mr16">{{ data.nickname }}</span>
        <itv-icon class="fs0" type="i-woman" size="20" v-if="data.sex === 2" />
        <itv-icon class="fs0" type="i-man" size="20" v-if="data.sex === 1" />
      </div>

      <!-- 套餐 -->
      <div class="row">
        <div class="label">套餐</div>
        <div>
          <div @click="handlePackage(data)">
            {{ data['_package_name'] }}
            <itv-icon class="ml4" type="i-edit" size="16" color="primary" />
          </div>
          <div v-show="data.package !== 'free'" class="row__row">
            到期时间：
            {{ data.package_expire_date | itvTimeShort }}
          </div>
        </div>
      </div>

      <!-- API 套餐 -->
      <div class="row">
        <div class="label">API 套餐</div>
        <!-- 开启了 -->
        <div v-show="data.open_api">
          <div @click="handlePackage2(data)">
            {{ data['_api_package_name'] }}
            <itv-icon class="ml4" type="i-edit" size="16" color="primary" />
          </div>
          <!-- 有套餐 -->
          <div v-show="data.api_package !== 'free'" class="row__row">
            到期时间：
            {{ data.api_package_expire_date | itvTimeShort }}
          </div>
          <div class="row__row">
            今日调用API创建链接数：
            {{ data.api_n_links_today }}
          </div>
          <div class="row__row">
            今日调用API请求数：
            {{ data.api_n_requests_today }}
          </div>
          <div class="row__row">
            白名单：
            {{ (data.api_whitelists || []).join('、') || '-' }}
          </div>
          <div v-show="data.open_webhook" class="row__row">
            webHook 推送：开启
          </div>
        </div>
        <!-- 未开启 -->
        <div v-show="!data.open_api" class="itv-text--grey4">未开启</div>
      </div>

      <!-- 创建短链数量 -->
      <div class="row">
        <div class="label">创建短链数量</div>
        <div class="flex1">
          <div class="link__row">
            <div class="link__cell">
              <div class="link__label">今日：</div>
              <div class="link__value">{{ data.n_links_today }}</div>
            </div>
            <div class="link__cell">
              <div class="link__label">累计：</div>
              <div class="link__value">{{ data.n_links }}</div>
            </div>
          </div>
          <div class="link__row grey">
            <div class="link__cell">
              <div class="link__label">普通：</div>
              <div class="link__value">{{ data.n_normal_links }}</div>
            </div>
            <div class="link__cell">
              <div class="link__label">随机：</div>
              <div class="link__value">{{ data.n_random_links }}</div>
            </div>
          </div>
          <div class="link__row grey">
            <div class="link__cell">
              <div class="link__label" title="自定义域名">自域名：</div>
              <div class="link__value">{{ data.n_cdm_links }}</div>
            </div>
            <div class="link__cell">
              <div class="link__label" title="开放API">API：</div>
              <div class="link__value">{{ data.n_api_links }}</div>
            </div>
          </div>
          <!-- 查看短链 -->
          <div class="mt8 mb8 itv-flex--fs" @click="toUserLink(data)">
            <itv-icon type="i-detail" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">查看短链</span>
          </div>
          <!-- 恢复游客链接 -->
          <div class="mb8 mt8 itv-flex--fs" @click="handleGuestLinks(data)">
            <div class="itv-text--btn4 mr8" title="恢复游客链接">
              游
            </div>
            <span class="itv-text--btn">恢复游客链接</span>
          </div>
        </div>
      </div>

      <!-- 短链访问次数 -->
      <div class="row">
        <div class="label">短链访问次数</div>
        <div class="flex1">
          <div class="link__row">
            <div class="link__cell">
              <div class="link__label">今日：</div>
              <div class="link__value">{{ data.pv_today }}</div>
            </div>
            <div class="link__cell">
              <div class="link__label">累计：</div>
              <div class="link__value">{{ data.pv }}</div>
              <!-- {this.$global.utils.countFormat.short(row.pv)} -->
            </div>
          </div>
        </div>
      </div>

      <!-- 协作空间 -->
      <div class="row">
        <div class="label">协作空间数</div>
        <div class="flex1">
          <div class="link__row">
            <div class="link__cell">
              <div class="link__label">创建：</div>
              <div class="link__value">{{ data.n_created_workspaces }}</div>
            </div>
          </div>
          <div class="link__row">
            <div class="link__cell">
              <div class="link__label">加入：</div>
              <div class="link__value">{{ data.n_joined_workspaces }}</div>
            </div>
          </div>
          <!-- 查看协作空间 -->
          <div class="mt8 mb8 itv-flex--fs" @click="toUserSpaceList(data)">
            <itv-icon type="i-member" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">查看协作空间</span>
          </div>
        </div>
      </div>

      <!-- 插件功能 -->
      <div class="row">
        <div class="label">插件权限</div>
        <div class="itv-flex--fs">
          <div v-for="(item, i) in pluginList" :key="i" class="mr8">
            <img
              :class="['img--plugin--icon', data[apiKeyMap[item]] ? '' : 'disabled']"
              :src="appMap[item].icon"
              :title="`${data[apiKeyMap[item]] ? '开启' : '未开启'}${appMap[item].title}`"
            />
          </div>
        </div>
      </div>

      <!-- 激活时间 -->
      <div class="row">
        <div class="label">激活时间</div>
        <div>
          <span v-show="data.active">{{ data.active_date | itvTimeShort }}</span>
          <span v-show="!data.active">未激活</span>
        </div>
      </div>

      <!-- 注册时间 -->
      <div class="row">
        <div class="label">注册时间</div>
        <div>{{ create_time || '-' }}</div>
      </div>

      <!-- 是否关注服务号 -->
      <div class="row">
        <div class="label">关注服务号</div>
        <div>
          <div class="itv-flex--fs mb8">
            <span class="mr8 cp" :title="data.subscribe ? '已关注' : '未关注'">
              <itv-icon type="i-attention" :style="{ color: data.subscribe ? C_GREEN : C_GREY }" size="24" />
            </span>
            <span :title="data.subscribe ? '最近关注服务号的时间' : '最近取消关注服务号的时间'" class="cp">{{ subscribe_time || '-' }}</span>
          </div>
          <div title="关注服务号的渠道来源" class="cp">渠道：{{ subscribe_scene_map[data.subscribe_scene] }}</div>
        </div>
      </div>

      <!-- 用户标签 -->
      <div class="row">
        <div class="label">用户标签</div>
        <div>
          <!-- 标签 -->
          <div>{{ tagid_list }}</div>
          <!-- 打标签 -->
          <div class="mb8 mt8 itv-flex--fs" @click="handleUserTags(data)">
            <itv-icon type="i-tag" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">打标签</span>
          </div>
        </div>
      </div>

      <!-- 最近登录时间 -->
      <div class="row">
        <div class="label">最近登录时间</div>
        <div>
          <div class="itv-flex--fs mb8">
            <span class="mr8" title="是否网页登录">
              <itv-icon type="i-pc" :style="{ color: pc_last_login_time ? C_ORANGE : C_GREY }" size="22" />
            </span>
            <span title="PC端最近登录时间">{{ pc_last_login_time || '-' }}</span>
          </div>
          <div class="itv-flex--fs mb8" v-if="data.sa_openid">
            <div class="itv-text--grey4 cp small" title="服务号openid">
              {{ data.sa_openid || '-' }}
            </div>
            <div title="复制链接" class="ml4" style="flex-shrink:0;" v-if="data.sa_openid">
              <itv-icon type="i-copy2" class="itv-text--btn" size="20" color="" @click="handleCopy(data.sa_openid)" />
            </div>
          </div>
          <div class="itv-flex--fs mb8">
            <span class="mr8" title="是否小程序登录">
              <itv-icon type="i-wx" :style="{ color: mp_last_login_time ? C_BLUE : C_GREY }" size="22" />
            </span>
            <span title="小程序最近登录时间">{{ mp_last_login_time || '-' }}</span>
          </div>
          <div class="itv-flex--fs mb8" v-show="data.mp_openid">
            <div class="itv-text--grey4 small cp" title="小程序openid">
              {{ data.mp_openid || '-' }}
            </div>
            <div title="复制链接" class="ml4" style="flex-shrink:0;" v-if="data.mp_openid">
              <itv-icon type="i-copy2" class="itv-text--btn" size="20" color="" @click="handleCopy(data.mp_openid)" />
            </div>
          </div>
          <!-- 是否可以登录 -->
          <div class="itv-flex--fs" @click="handleUserLogin(data)">
            <itv-icon
              :title="data.enabled ? '可登录' : '禁止登录'"
              :type="data.enabled ? 'i-check' : 'i-delete2'"
              class="itv-btn__icon mr8"
              size="18"
              :style="{ color: data.enabled ? C_BLUE : C_ORANGE }"
            />
            <span class="itv-text--btn">{{ data.enabled ? '禁止' : '允许' }}登录</span>
          </div>
          <!-- 登录该用户 -->
          <div class="mb8 mt8 itv-flex--fs" @click="handleLoginUser(data)">
            <itv-icon type="i-eye" size="20" class="itv-btn__icon mr8" />
            <span class="itv-text--btn">登录该用户</span>
          </div>
        </div>
      </div>

      <!-- 地区 -->
      <div class="row">
        <div class="label">地区</div>
        <div>{{ [data.country, data.province, data.city].filter((v) => v).join('-') }}</div>
      </div>

      <!-- 电子邮箱 -->
      <div class="row">
        <div class="label">电子邮箱</div>
        <div>
          {{ data.email || '-' }}
        </div>
      </div>

      <!-- 来源 -->
      <div class="row">
        <div class="label">来源</div>
        <div style="word-break: break-all">{{ data.source || '-' }}</div>
      </div>

      <!-- 操作 -->
      <!-- <div class="row">
        <div class="label">操作</div>
        <div class="itv-flex--v--fs"></div>
      </div> -->
    </div>
    <div v-show="!show_page">报错: {{ page_error }}</div>
  </Drawer>
</template>

<script>
import { pluginListUser as pluginList, appMap, apiKeyMap } from '../common/plugin-data'
import { PACKAGES, API_PACKAGES } from '../../libs/consts'
import MixinsUserOperate from '../common/mixins-user-operate'
import moment from 'moment'

export default {
  name: 'DrawerUser',
  mixins: [MixinsUserOperate],
  props: {},
  components: {},
  data() {
    this.C_GREEN = '#47cb89'
    this.C_ORANGE = '#e88986'
    this.C_BLUE = '#4F87FB'
    this.C_GREY = '#c5c8ce'
    this.pluginList = pluginList
    this.appMap = appMap
    this.apiKeyMap = apiKeyMap

    this.subscribe_scene_map = {
      ADD_SCENE_SEARCH: '公众号搜索',
      ADD_SCENE_ACCOUNT_MIGRATION: '公众号迁移',
      ADD_SCENE_PROFILE_CARD: '名片分享',
      ADD_SCENE_QR_CODE: '扫描二维码',
      ADD_SCENE_PROFILE_LINK: '图文页内名称点击',
      ADD_SCENE_PROFILE_ITEM: '图文页右上角菜单',
      ADD_SCENE_PAID: '支付后关注',
      ADD_SCENE_OTHERS: '其他'
    }

    return {
      page_error: '',
      show_page: false,
      loading: true,
      data: {}
    }
  },
  filters: {
    itvTimeShort: function(v) {
      const time = v ? moment(v).format('YYYY/MM/DD') : ''

      return time
    },
    itvTime: function(v) {
      const time = v ? moment(v).format('YYYY/MM/DD hh:mm:ss') : ''

      return time
    }
  },
  computed: {
    drawer() {
      return this.$bus.drawer_user
    },
    user_id() {
      return (this.$bus.drawer_user || {}).id
    },
    pc_last_login_time() {
      const time = (this.data || {}).pc_last_login_time || ''

      return time ? this.$PDo.Date.format(time) : ''
    },
    mp_last_login_time() {
      const time = (this.data || {}).mp_last_login_time || ''

      return time ? this.$PDo.Date.format(time) : ''
    },
    create_time() {
      const time = (this.data || {}).create_time || ''

      return time ? this.$PDo.Date.format(time) : ''
    },
    active_date() {
      const time = (this.data || {}).active_date || ''

      return time ? this.$PDo.Date.format(time) : ''
    },
    subscribe_time() {
      const time1 = (this.data || {}).subscribe_time || ''
      const time0 = (this.data || {}).unsubscribe_time || ''

      const time = (this.data || {}).subscribe ? time1 : time0

      return time ? this.$PDo.Date.format(time) : ''
    },
    tagid_list() {
      return ((this.data || {}).tagid_list || []).map((id) => this.$bus.userTags[id] || '-').join('、') || '-'
    }
  },
  created() {},
  mounted() {},
  watch: {
    'drawer.show': {
      handler: function(v) {
        if (v) {
          this.doGetData()
          this.doGetUserTags()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取用户标签
    async doGetUserTags() {
      if (Object.keys(this.$bus.userTags || {}).length === 0) {
        try {
          let res = await this.$api.User.getUserTags()

          res = (res || {}).tags || []

          this.$bus.updateUserTags(res)
        } catch (e) {
          console.error(e)
        }
      }
    },
    async doGetData() {
      this.loading = true
      try {
        let res = await this.$api.User.getUserDetail(this.user_id)

        res = (res || {}).user || {}

        // 前端自定义的变量
        res['_package_name'] = PACKAGES[res.package]
        res['_api_package_name'] = API_PACKAGES[res.api_package]

        this.data = res
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
      width: 120px;
      font-weight: 500;
      // text-align: right;
      text-align: left;
      padding-right: 24px;
      align-self: flex-start;
      flex-shrink: 0;
    }
    .row__row {
      color: #afafaf;
      font-size: 12px;
      word-break: break-all;
      margin-top: 8px;
    }
    .link__row {
      display: flex;
      margin-bottom: 4px;
      .link__cell {
        flex: 1;
        display: flex;
        .link__label {
          width: 64px;
          flex: none;
          // text-align: right;
          padding-right: 8px;
        }
        .link__value {
          flex: 1;
          text-align: left;
        }
      }
      &.grey {
        color: #afafaf;
      }
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
