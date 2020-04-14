/* 消息.详情 */
<template>
  <div class="modal-auto-reply">
    <Modal v-model="dialog.show" title="关注自动回复详情" footer-hide class="itv-modal modal-detail-msg-list">
      <div class="pr" v-for="(item, i) in list" :key="i">
        <Divider v-if="i" />
        <p class="itv-text--14 fw500 mb12">
          {{ item.typeName }}
          <span class="itv-text--grey" v-if="item.time">（距上一条消息延迟 {{ item.time }} 分钟）</span>
        </p>
        <!-- 1.文本消息 -->
        <div v-if="item.reply === 1" v-html="item.showCnt"></div>
        <!-- 2.图片消息 -->
        <div v-if="item.reply === 2">
          <img
            :src="item.showCnt"
            class="cp show-img"
            alt=""
            @click="
              () => {
                img_model.show = true
                img_model.url = item.showCnt
              }
            "
          />
        </div>
        <!-- 3.图文消息 -->
        <div v-if="item.reply === 3">
          <itv-graphic-item :data="item.showCnt" v-if="item.showCnt" />
        </div>
        <!-- 4.网页链接 -->
        <div v-if="item.reply === 4">
          <div class="row">
            <div class="label">跳转链接：</div>
            {{ item.showCnt.url }}
          </div>
          <div class="row">
            <div class="label">标题：</div>
            {{ item.showCnt.title || '-' }}
          </div>
          <div class="row">
            <div class="label">描述：</div>
            {{ item.showCnt.description || '-' }}
          </div>
          <div class="row">
            <div class="label">
              封面图：
            </div>
            <img
              :src="item.showCnt.picurl"
              class="cp show-img"
              alt=""
              @click="
                () => {
                  img_model.show = true
                  img_model.url = item.showCnt.picurl
                }
              "
            />
          </div>
        </div>
        <!-- 5.小程序卡片 -->
        <div v-if="item.reply === 5">
          <div class="row">
            <div class="label">小程序AppID：</div>
            {{ item.showCnt.appid }}
          </div>
          <div class="row">
            <div class="label">页面路径：</div>
            {{ item.showCnt.pagepath || '-' }}
          </div>
          <div class="row">
            <div class="label">标题：</div>
            {{ item.showCnt.title || '-' }}
          </div>
          <div class="row">
            <div class="label">
              封面图：
            </div>
            <img
              :src="item.showCnt.fiche_url"
              class="cp show-img"
              alt=""
              @click="
                () => {
                  img_model.show = true
                  img_model.url = item.showCnt.fiche_url
                }
              "
            />
          </div>
        </div>
      </div>
      <div class="mb40"></div>
    </Modal>

    <!-- 查看大图 -->
    <itv-model-img v-model="img_model.show" :imgModelUrl="img_model.url" />
  </div>
</template>

<script>
export default {
  name: 'ModalAutoReply',
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
        show: false
      },
      list: []
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
      let info = JSON.parse(JSON.stringify(this.data))
      const arr2 = JSON.parse(JSON.stringify(info.more_message))

      delete info.more_message
      const arr = [{ ...info }, ...arr2]

      const typeMap = {
        1: '文本消息',
        2: '图片消息',
        3: '图文消息',
        4: '网页链接',
        5: '小程序卡片'
      }

      let res = []

      arr.forEach((item) => {
        const type = item.reply

        let showCnt

        if (type === 1) {
          // 文本消息
          showCnt = item.text_html.replace(/(<a [^>]+>)([^<]*)([^]*?)(<\/a *>)/g, '$1$2$4').replace(/(<a )([^]*?)([^>]*?)(>)/g, '$1$4')
          showCnt = item.text_html.replace(/(<span )([^]*?)([^>]*?)(>)/g, '$1$4')
        } else if (type === 2) {
          // 图片消息
          showCnt = item.image_url
        } else if (type === 3) {
          // 图文消息
          showCnt = item.news_item
        } else if (type === 4) {
          // 网页链接
          // description: "没有"
          // picurl: "https://static.interval.im/xiaoma/d8tJjQnXA7SJTmYY.png"
          // title: "测试"
          // url: "https://www.iviewui.com/components/divider"
          showCnt = item.link_news
        } else if (type === 5) {
          // 小程序卡片
          // appid: "111111"
          // fiche_url: "https://static.interval.im/xiaoma/XHnWH7GDppC2F2TR.png"
          // pagepath: "222"
          // thumb_media_id: "VcD1-pmGh7XXu1LH-p23RoUO1bnlm8wOqHgMptnXOWQ"
          // title: "标题"
          showCnt = item.mini_program_page
        }

        res.push({ ...item, typeName: typeMap[item.reply], showCnt })
      })

      this.list = res
      // this.$set(this, 'list', res)

      console.log({ res })
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
  .show-img {
    max-width: 120px;
    max-height: 120px;
    object-fit: contain;
  }
  .row {
    display: flex;
    margin-bottom: 8px;
  }
  .label {
    width: 120px;
    padding-right: 12px;
  }
}
</style>
