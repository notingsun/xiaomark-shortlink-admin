/* 预览.内容.模版消息 */
<template>
  <!-- 内容.模版消息 -->
  <div
    :class="[
      'cnt__wrap--template',
      onlyView ? 'style-only-view' : '',
      isOldStyle ? '' : 'new_style'
    ]"
    v-if="data.template"
  >
    <!-- 1、标题 -->
    <div class="itv-flex--sb" style="width: 100%">
      <div class="template__title">
        {{ data.template.label }}
      </div>
      <div>
        <Icon type="ios-more" class="template__icon--top" />
      </div>
    </div>
    <!-- 2、日期 (新的不显示) -->
    <div class="template__date text--scale" v-if="isOldStyle">
      {{ today }}
    </div>
    <!-- 3、字段们 -->
    <div
      :class="['template__row', isOldStyle ? 'text--scale' : 'text--scale2']"
      v-for="(row, i) in data.template.rows"
      :key="`row-${i}`"
    >
      <span
        v-for="(cell, j) in row"
        :key="`row-${i}-cell-${j}`"
        :class="{
          'label-style': cell.type === 'text' && j === 1,
          'remark-style':
            !isOldStyle && cell.key === 'remark' && styleRowRemark(cell),
          'value-style': cell.last && !isOldStyle,
          'row-cell': !isOldStyle && cell.type !== 'br'
        }"
      >
        <!-- 类型：【字段】 -->
        <template-cell-value
          v-if="cell.type === 'value' && styleRowRemark(cell)"
          :color="(data_data[cell.key] || {})['color']"
          :data="(data_data[cell.key] || {})['input']"
          :defaultData="cell.value"
          :keyName="cell.key"
          :last="cell.last"
          :isOldStyle="isOldStyle"
        />
        <!-- 类型：文本 -->
        <span class="span--text" v-if="cell.type === 'text'">{{
          cell.value
        }}</span>
        <!-- 类型：换行 -->
        <div
          class="span--br"
          style="height: 2px;width: 100%"
          v-if="cell.type === 'br'"
        />
      </span>
    </div>
    <!-- 4、详情 -->
    <div class="itv-flex--sb template__url" v-show="show_template_url">
      <div class="text--scale">{{ isOldStyle ? '详情' : '查看详情' }}</div>
      <div>
        <Icon type="ios-arrow-forward" class="template__icon--bottom" />
      </div>
    </div>

    <div class="btn-wrap" v-if="!onlyView">
      <div class="itv-btn__text mr4 cp" @click="isOldStyle = !isOldStyle">
        切换为{{ isOldStyle ? '新' : '老' }}样式
      </div>
      <Tooltip
        content="微信模版样式正在调整中，具体效果请通过发送预览查看～"
        placement="bottom"
        :max-width="130"
      >
        <Icon type="md-help-circle" :size="15" />
      </Tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'previewTemplate',
  mixins: [],
  props: {
    // 是否显示切换图标
    onlyView: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    } // 预览需要的数据
  },
  components: {
    /* 【字段x】换行处理 */
    templateCellValue: {
      props: {
        last: { type: Boolean },
        isOldStyle: { type: Boolean },
        keyName: { type: String },
        color: { type: String },
        data: { type: String },
        defaultData: { type: String }
      },
      computed: {
        other_style() {
          let style = {}

          if (!this.isOldStyle) {
            if (this.keyName === 'first' || !this.last) {
              style.color = '#999'
            }
          }
          return style
        }
      },
      render() {
        if (!this.data) {
          return (
            <span class="span--value" style={{ color: '#999' }}>
              {this.defaultData}
            </span>
          )
        }

        const data_string = this.data.replace(/\n|\r\n/g, '<br/>')
        const data_arr = data_string.split('<br/>')
        const res = []

        data_arr.forEach((item, i) => {
          i !== 0 && res.push(<br />)
          res.push(
            <span style={{ color: this.color, ...this.other_style }}>
              {item}
            </span>
          )
        })

        return (
          <span class="span--value" style="word-break: break-all;">
            {res}
          </span>
        )
      }
    }
  },
  data() {
    return {
      isOldStyle: false
    }
  },
  computed: {
    /* data.data */
    data_data() {
      let res = {}

      this.data.data.forEach((item) => {
        res[item.key] = {
          input: item.value,
          color: item.color
        }
      })

      return res
    },
    /* 今天的日期 */
    today() {
      const today = new Date()

      return `${today.getMonth() + 1}月${today.getDate()}日`
    },
    /* 是否显示.详情(最下面的) */
    show_template_url() {
      if (!this.data) {
        return false
      } else if (this.data.url) {
        return true
      }
      return false
    }
  },
  created() {},
  mounted() {},
  watch: {
    data: {
      handler: function() {},
      deep: true,
      immediate: true
    }
  },
  methods: {
    styleRowRemark(cell) {
      return !(
        !this.isOldStyle &&
        cell.key === 'remark' &&
        (this.data_data[cell.key] || {})['input'] === ''
      )
    }
  }
}
</script>

<style lang="less">
.cnt__wrap--template {
  .remark-style {
    width: 100% !important;
    margin-left: 0 !important;
    padding-left: 70px;
    position: relative;
    min-height: 18px;
    &::before {
      width: 70px;
      content: '备注:';
      color: #999;
      display: inline-block;
      position: absolute;
      left: 0;
    }
  }
  &.style-only-view {
    border: 1px solid @border-color-base;
    width: 300px !important;
    .remark-style {
      padding-left: 82px;
    }

    .value-style {
      width: 245px !important;
    }
    .text--scale2 {
      transform: scale(0.89) translate(-1.58em, -0.05em) !important;
    }
  }
  &.new_style {
    .template__url {
      margin-left: -8px !important;
      width: calc(~'100% + 16px') !important;
      padding: 6px 8px 0 !important;
    }
  }
}
</style>
<style scoped lang="less">
// 模版消息
.cnt__wrap--template {
  position: relative;
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 12px;
  color: #000;

  .text--scale {
    transform: scale(0.95) translate(-0.4em, -0.05em);
    width: 108%;
  }
  .text--scale2 {
    transform: scale(0.89) translate(-1.18em, -0.05em);
    width: 116%;
    display: flex;
    justify-content: space-between;
    // font-size: 0px;
    .span--text {
      color: #999 !important;
    }
    // .span--text,
    // .span--value,
    // .span-br {
    //   font-size: 12px;
    // }
  }

  .template {
    // 文字.标题
    &__title {
      font-size: 14px;
      color: #000;
      height: 22px;
      line-height: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    // 文字.日期
    &__date {
      color: #999;
      margin-bottom: 4px;
    }

    // 文字.字段们
    &__row {
      margin-bottom: 4px;
      .value-style {
        // background: pink;
        width: 162px;
        display: inline-block;
        vertical-align: top;
        margin-left: 6px;
        flex-shrink: 0;
      }
      .label-style {
        margin-right: auto;
      }
      .row-cell {
        display: inline-block;
      }
    }

    // 链接.详情
    &__url {
      width: 100%;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid #eee;
    }

    // 图标
    &__icon {
      &--top {
        font-size: 24px;
        color: #aaa;
      }
      &--bottom {
        font-size: 14px;
        color: #ccc;
      }
    }
  }

  // 切换样式.问号提示
  /deep/.ivu-tooltip-inner {
    min-width: 130px;
  }
  // 切换样式.按钮
  .btn-wrap {
    position: absolute;
    bottom: -30px;
    left: 64px;
    display: flex;
    height: 20px;
    align-items: center;
  }
}
</style>
