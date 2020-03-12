<template>
  <div class="itv-graphic__wrap">
    <!-- 选择的按钮 -->
    <div class="itv-graphic__btn" @click="handleShowDialog" v-if="!media_id">
      <Icon type="md-folder" class="itv-graphic__btn__icon" />
      <p class="itv-text--sub">从素材库选择</p>
    </div>
    <!-- 选中的示例 -->
    <div class="itv-graphic__checked" v-else>
      <itv-graphic-item :data="media_info.news_item" type="seleted" />
      <div class="itv-graphic__checked__cover">
        <span
          class="itv-btn__icon--wrap itv-graphic__checked__cover__btn"
          @click="handleDeleteChecked"
          title="删除"
        >
          <Icon type="ios-trash-outline" />
        </span>
      </div>
    </div>
    <!-- 弹窗 -->
    <Modal
      class="itv-graphic-dialog itv-modal"
      v-model="dialog.show"
      title="选择图文"
      :styles="{ top: '50px' }"
      width="920"
    >
      <div class="list">
        <itv-graphic-item
          style="margin-bottom:16px"
          v-for="(item, i) in graphic"
          :key="i"
          :data="item.news_item"
          :isChecked="(dialog.checked || {}).media_id === item.media_id"
          @click="handleClickItem(item)"
          :disabled="onlySingle && (item.news_item || []).length !== 1"
        />
        <span v-if="graphic.length === 0" class="text--null">暂无数据</span>
      </div>
      <itv-pagination :total="total" @on-change="getGraphic" />
      <div style="text-align:center" slot="footer">
        <Button type="text" @click="handleDialogCancel">取消</Button>
        <Button type="primary" @click="handleDialogSure">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
// import TEST_DATA from '../../store/modules/test-data'
export default {
  name: 'ItvMsgGraphic',
  components: {},
  props: {
    checkedId: {
      type: String
    },
    checkedInfo: {
      type: Object
    },
    onlySingle: {
      type: Boolean,
      default: true
    }
  },
  created() {
    this.media_id = this.checkedId // 初始化
    // media_info 的初始化是根据 media_id 的值得到
  },
  mounted() {
    this.$nextTick(() => {
      this.getGraphic()
    })
  },
  data() {
    return {
      graphic: [], // 图文消息.列表
      dialog: {
        show: false,
        checked: {}
      }, // 对话框的数据
      total: 0,
      media_id: null, // 当前选中的.图文消息
      media_info: {} // 当前选中的.图文消息.信息
    }
  },
  watch: {
    media_id(v) {
      this.$emit('update:checkedId', v)
    },
    media_info(v) {
      this.$emit('update:checkedInfo', v)
    }
  },
  methods: {
    /* 获取图文消息.列表 */
    async getGraphic() {
      try {
        let data = await this.$api.Account.getNews({
          ...this.$global.Utils.pagination.params()
        })

        this.total = data.total_count
        this.graphic = data.item
        if (this.media_id) {
          this.graphic.forEach((el) => {
            if (el.media_id === this.media_id) {
              this.media_info = el
            }
          })
          if (!this.media_info.news_item) {
            this.media_id = '' // 当前选中图文消息已删除
          } else if (
            this.onlySingle &&
            this.media_info.news_item.length !== 1
          ) {
            this.media_id = '' // 只能选单条图文消息，当前选中图文消息非单条
          }
        }
        return
      } catch (e) {
        console.error(e)
        this.$Message.error(e.message)
      }
    },

    /* 显示对话框 */
    handleShowDialog() {
      this.dialog.show = true
      this.dialog.checked = this.checked
    },

    /* 删除已选中的 */
    handleDeleteChecked() {
      this.media_id = null
      this.media_info = {}
      this.dialog.checked = {}
      this.$emit('on-change', {})
    },

    /* 对话框.取消当前操作 */
    handleDialogCancel() {
      this.dialog.show = false
      this.dialog.checked = this.checked
    },

    /* 对话框.确认 */
    handleDialogSure() {
      this.media_id = this.dialog.checked.media_id
      this.media_info = this.dialog.checked
      this.dialog.show = false
      this.$emit('on-change', this.media_info)
    },

    /* 点击图文 */
    handleClickItem(item) {
      this.dialog.checked = item
    }
  }
}
</script>

<style lang="less">
.itv-graphic__wrap {
  margin-top: 16px;
  // 选择的按钮
  .itv-graphic__btn {
    border: 1px dashed #e1e3ec;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    width: 270px;
    height: 119px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: @primary-color;
    }

    &__icon {
      font-size: 38px;
      color: @primary-color;
    }
  }

  // 选中的示例
  .itv-graphic__checked {
    width: fit-content;
    height: auto;
    border-radius: 4px;
    position: relative;

    .itv-msg-graphic-item--wrap {
      cursor: default;
    }

    // 操作蒙版
    &__cover {
      border-radius: 4px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      opacity: 0;
      transition: all 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;
      transition: all 0.2s ease-in-out;

      &__btn {
        font-size: 36px;
        color: @itv-white;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    &:hover .itv-graphic__checked__cover {
      opacity: 0.6;
    }
  }
}

.itv-graphic-dialog {
  .list {
    height: 400px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    .itv-msg-graphic-item--wrap {
      margin-right: 16px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
