/* 查看大图 使用方法：
<itv-model-img v-model="img_model.show" :imgModelUrl="img_model.url" />
img_model: { show: false, url: '' } */
<template>
  <div v-show="value" class="itv-model">
    <Icon type="md-close itv-model__btn--close" @click="handleClose" />
    <slot>
      <img :src="imgModelUrl" class="itv-model__img" :style="img_style" />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ItvModelImg',
  mixins: [],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }, // 是否显示图片大图
    imgWidth: {
      type: Number
    }, // 图片狂赌
    imgModelUrl: {
      type: String,
      required: true
    } // 大图的url
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    img_style() {
      const width = this.imgWidth ? `width: ${this.imgWidth}px` : ''

      return width ? `${width};height: auto;margin-top: 20vh;` : ''
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    handleClose() {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="less"></style>
