/* 消息.详情 */
<template>
  <div class="modal-msg-detail">
    <Modal
      v-model="dialog.show"
      title="推送详情"
      footer-hide
      class="itv-modal modal-detail-msg-list"
    >
      <div class="pr" style="min-height: 390px;">
        <Spin fix v-show="dialog.loading" />
        <!-- 一、公共.标题 -->
        <p class="itv-text--14 fw500">{{ dialog.title }}</p>

        <!-- 二、消息内容 start -->
        <div class="mt8 mb24">
          <!-- 1.文本消息 -->
          <div v-if="dialog.category === 'text'" v-html="dialog.content"></div>

          <!-- 2.模板消息 -->
          <div v-if="dialog.category === 'template'">
            <!-- <div v-html="dialog.content.template_html"></div> -->
            <itv-preview-template :content="dialog.content" />
          </div>

          <!-- 3.图片消息 -->
          <div v-if="dialog.category === 'image'">
            <img
              :src="dialog.content"
              style="max-width: 300px;max-height:300px;object-fit: contain;"
              class="cp"
              alt=""
              @click="
                () => {
                  this.img_model.show = true
                  this.img_model.url = dialog.content
                }
              "
            />
          </div>

          <!-- 4.图文消息 -->
          <div v-if="dialog.category === 'mpnews'">
            <itv-graphic-item :data="dialog.content" v-if="dialog.content" />
          </div>
        </div>
        <!-- 2）消息内容 end -->

        <!-- 三、跳转链接 -->
        <div v-if="show_link_block" class="mb24">
          <p class="itv-text--14 fw500">跳转链接</p>
          <div class="mt8" v-for="link in dialog.links" :key="link.id">
            <!-- 模版消息.链接是小程序的 -->
            <div v-if="link.mini_appid && dialog.category === 'template'">
              <span>小程序AppID: {{ link.mini_appid || '-' }}</span>
              <br />
              <span>路径: {{ link.origin_url || '-' }}</span>
            </div>
            <!-- 模版消息.普通链接 -->
            <div v-else-if="dialog.category === 'template'">
              <span>{{ link.origin_url || '-' }}</span>
            </div>
            <!-- 客服消息.文本消息.链接 -->
            <div v-else-if="dialog.category === 'text'">
              <span>{{ link.origin_url || '-' }}</span>
              <!-- <Tag color="cyan" v-for="tag in link.tag_ids" :key="tag.id">{{ tag }}</Tag> -->
            </div>
          </div>
          <div v-show="(dialog.links || []).length === 0">-</div>
        </div>

        <!-- 四、用户标签 -->
        <!-- <p class="itv-text--14 fw500">用户标签</p>
      <div class="mt8">
        <Tag color="cyan" v-for="tag in dialog.tags" :key="tag.id">{{ tag.name }}</Tag>
      </div> -->
      </div>
    </Modal>

    <!-- 查看大图 -->
    <itv-model-img v-model="img_model.show" :imgModelUrl="img_model.url" />
  </div>
</template>

<script>
import MixinsMsgDetail from './mixins-msg-detail'

export default {
  name: 'ModalMsgDeatil',
  mixins: [MixinsMsgDetail],
  props: {
    // 是否显示
    value: {
      type: Boolean,
      required: true
    },
    // 显示的数据
    data: {
      type: Object,
      required: true
    }
  },
  components: {},
  data() {
    return {
      img_model: {
        show: false,
        url: ''
      }, // 查看大图
      dialog: {
        obj: null,
        loading: false,
        title: '',
        show: false,
        category: null, // 类型 图片还是文字
        content: '', // 内容 文字或图片
        links: [], // 跳转链接
        tags: [] // 用户标签
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    // 保持显示框的值一致
    value(v) {
      if (this.dialog.show !== v) {
        this.dialog.show = v
      }
      if (v) {
        this.initDialog()
      }
    },
    'dialog.show'(v) {
      if (this.value !== v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    // 初始化对话框
    initDialog() {
      this.dialog.category = (this.data || {}).msg_type || 'template'
      this.dialog.obj = this.data || {}
      this.calDialogInfo()
    }
  }
}
</script>

<style lang="less">
.modal-detail-msg-list {
  /deep/.ivu-modal-body {
    font-size: 14px;
    word-break: break-all;
  }
  .itv-text--14 {
    color: #303659;
  }
}
</style>
