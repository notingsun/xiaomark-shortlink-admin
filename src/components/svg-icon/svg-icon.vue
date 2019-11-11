/* 组件.图标 */
<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="styles"
    @click="handleClick"
  >
    <use :xlink:href="iconClass" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    type: {
      type: String,
      required: true
    },
    classes: {
      type: String
    },
    width: {
      type: String,
      default: '16px'
    },
    height: {
      type: String,
      default: '16px'
    },
    size: {
      type: [Number, String],
      validator: (value) => {
        return !isNaN(value - 0)
      }
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return ['primary', 'success', 'error', 'sub', ''].indexOf(value) !== -1
      }
    }
  },
  mounted() {},
  methods: {
    handleClick() {
      this.$emit('click')
    }
  },
  computed: {
    iconClass() {
      return `#icon-${this.type}`
    },
    svgClass() {
      if (this.classes) {
        return `svg-icon ${this.color}` + this.classes
      }
      return `svg-icon ${this.color}`
    },
    styles() {
      const size = this.size ? `${this.size}px` : ''
      const style = {
        width: size || this.width,
        height: size || this.height
      }

      return style
    }
  }
}
</script>

<style lang="less">
.svg-icon {
  overflow: hidden;
  fill: currentColor;
  stroke: currentColor;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;
  &.primary {
    color: @primary-color;
  }
  &.success {
    color: @success-color;
  }
  &.error {
    color: @error-color;
  }
  &.sub {
    color: @btn-disable-color;
  }
}
</style>
