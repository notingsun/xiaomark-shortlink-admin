/* 图文消息(最小单元） */
<template>
  <div
    v-if="data"
    :class="['itv-msg-graphic-item--wrap', { 'itv-msg-graphic-item--wrap--checked': isChecked }, { 'itv-msg-graphic-item--wrap--disabled': disabled }]"
    :title="disabled ? '图文消息条数限制在1条以内' : ''"
    @click="handleClick"
  >
    <div v-for="(item, i) in data" :key="i" :class="calItemClass(i, item)">
      <img class="itv-msg-graphic-item__img" v-if="item.thumb_url !== ''" :src="isdev ? `${item.thumb_url}` : `https://wx-open.interval.im/ext/wx/bridge/?url=${item.thumb_url}`" />
      <div class="itv-msg-graphic-item__text">
        <div class="itv-msg-graphic-item__text--title">{{ item.title }}</div>
        <div class="itv-msg-graphic-item__text--detail">{{ item.digest }}</div>
      </div>
    </div>
    <Icon :class="['itv-msg-graphic-item--wrap__icon--checked animated', { bounceIn: isChecked }]" type="md-checkmark" v-show="isChecked" />
  </div>
</template>

<script>
export default {
  name: 'ItvMsgGraphicItem',
  mixins: [],
  props: {
    // 不可以操作
    disabled: {
      type: Boolean,
      default: false
    },
    // 图文消息.消息内容 news_item
    data: {
      type: Array
    },
    // 是否选中
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    isdev() {
      return process.env.NODE_ENV === 'development'
    },
    multiple() {
      return (this.data || []).length > 1
    },
    calWrapClass() {
      // eslint-disable-next-line prettier/prettier
      return `itv-msg-graphic-item--wrap ${this.isChecked ? 'itv-msg-graphic-item--wrap--checked' : ''}`
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    calItemClass(i, item) {
      let res = ['itv-msg-graphic-item']

      if (item.thumb_url === '' && i === 0) {
        res.push('no-img')
      }
      // eslint-disable-next-line prettier/prettier
      this.multiple && res.push(i === 0 ? 'itv-msg-graphic-item--multiple--first' : 'itv-msg-graphic-item--multiple')

      return res.join(' ')
    },
    handleClick() {
      !this.disabled && this.$emit('click')
    }
  }
}
</script>

<style lang="less">
// 包裹图文消息所有行.外壳
.itv-msg-graphic-item--wrap {
  width: 270px;
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid @border-color-base;
  border-radius: 4px;
  overflow: hidden;
  line-height: 1.5;
  background: #fff;
  box-sizing: border-box;
  font-size: @font-size-small;
  position: relative;
  height: fit-content;
  break-inside: avoid;
  &:hover {
    border-color: @primary-color;
  }

  // 外壳蒙版（不显示，一个渐变的过程）
  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    background: #000;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    transition: all 0.3s;
  }

  // 外壳蒙版.选中（显示）
  &--checked {
    &:after {
      opacity: 0.6;
    }
  }

  // 不可以选中
  &--disabled {
    cursor: not-allowed;
    filter: grayscale(100%);
  }

  // 外壳蒙版.上的图标
  &__icon {
    // 选中图标
    &--checked {
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 58px;
      color: @itv-white;
      z-index: 2;
      margin-left: -29px;
      margin-top: -29px;
    }
  }
}

// 图文消息行
.itv-msg-graphic-item {
  width: 100%;
  position: relative;

  &__img {
    height: 120px;
    width: 100%;
    object-fit: cover;
    display: block;
  }

  &__text {
    padding: 8px;

    &--title {
      font-size: @font-size-normal;
      font-weight: normal;
      white-space: pre-line;
      margin-bottom: 4px;
    }
    &--detail {
      color: @subsidiary-color;
      font-size: @font-size-small;
      white-space: pre-line;
    }
  }
}

// 多图文的样式.首行
.itv-msg-graphic-item--multiple--first {
  .itv-msg-graphic-item__text {
    position: absolute;
    left: 0px;
    bottom: -4px;
  }
}

// 没图
.no-img {
  .itv-msg-graphic-item__text {
    position: relative;
    .itv-msg-graphic-item__text--title {
      font-weight: bold;
    }
  }
}

// 多图文样式.行
.itv-msg-graphic-item--multiple {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid @border-color-split;
  padding: 8px;
  .itv-msg-graphic-item__img {
    width: 30px;
    height: 30px;
    object-fit: cover;
  }
  .itv-msg-graphic-item__text {
    padding: 0px;
  }
}

// 多图文样式.行.不需要描述
.itv-msg-graphic-item--multiple--first,
.itv-msg-graphic-item--multiple {
  .itv-msg-graphic-item__text--detail {
    display: none;
  }
}
</style>
