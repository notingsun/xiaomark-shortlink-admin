/* 图片上传组件 使用方法：
<itv-upload-image
  multiple="false"
  :max="15"
  v-model=""
  :accept="'image/png, image/jpeg'"
  limitText="图片仅支持 jpeg、png 格式"
  clearable
  @on-change="setImage"
/>
<template>
  <!-- 组件依赖于iview的上传组件 -->
  <div class="upload-images">
    <Upload
      v-show="show_upload"
      :multiple="max > 1"
      :disabled="loading"
      class="upload-images"
      action=""
      :show-upload-list="false"
      :before-upload="uploadToQiniu"
      :accept="accept"
    >
      <!-- 多图片 -->
      <div v-if="multiple">
        <Button class="w88 mb8" :loading="loading" :disabled="disabled_btn">
          {{ loading ? '添加中' : '添加图片' }}
        </Button>
        <span
          class="upload-images__hint2"
          slot="tip"
          v-show="multiple && limitText"
        >
          {{ limitText }}
        </span>
      </div>
      <!-- 单图片 -->
      <div class="upload-images__wrap" v-else>
        <Spin fix v-if="loading" />
        <Icon type="ios-add" class="upload-images__icon" />
      </div>
    </Upload>

    <!-- 已上传的图片 -->
    <div
      v-show="url_arr.length > 0"
      class="itv-flex--fs"
      style="flex-wrap: wrap;"
    >
      <div
        class="upload-images__wrap mb8 mr8"
        v-for="(url, index) in url_arr"
        :key="index"
      >
        <Spin fix v-if="loading && !multiple" />
        <img class="upload-images__img" :src="url" />
        <div class="upload-images__img__cover">
          <!-- 按钮.查看大图 -->
          <span
            class="itv-btn__icon--wrap upload-images__img__cover__icon mr16"
            @click="handleShow(url)"
            title="查看大图"
          >
            <itv-icon type="i-eye" size="20" color="" />
          </span>
          <!-- 按钮.删除 -->
          <span
            class="itv-btn__icon--wrap upload-images__img__cover__icon"
            @click="handleClear(index)"
            title="删除"
          >
            <itv-icon type="i-delete" size="20" color="" />
          </span>
        </div>
      </div>
    </div>

    <!-- 提示文字 -->
    <p class="upload-images__hint" v-show="!multiple && limitText">
      {{ limitText }}
    </p>

    <itv-model-img v-model="img_model.show" :imgModelUrl="img_model.url" />
  </div>
</template>

<script>
/* eslint-disable no-unreachable */
import * as qiniu from 'qiniu-js'

export default {
  name: 'UploadImages',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    max: {
      // 多选时最多可以选择多少张
      type: Number,
      default: 1
    },
    value: {
      type: [String, Array]
    },
    clearable: {
      // 是否可以清空
      type: Boolean,
      default: true
    },
    // 多选时一次性返回结果
    multipleOneReturn: {
      type: Boolean,
      default: false
    },
    multiple: {
      // 是否支持多选
      type: Boolean,
      default: false
    },
    accept: {
      // 可以上传的图片类型
      type: String,
      default: 'image/png, image/jpeg, image/jpg, image/gif'
    },
    limitText: {
      // 上传限制说明
      type: String,
      default: ''
    }
  },
  data() {
    return {
      url_arr_temp_length: 0,
      count: 0, // 同步完成的图片数
      url_arr_deafult: null, // 防止初始化时，触发on-change
      configMutiple: {
        url_arr: [],
        isMutiple: false, // 上传了多个
        time: 0
      },
      img_model: {
        show: false,
        url: 'http://n.sinaimg.cn/transform/20150825/rsTR-fxhcvsc4370080.jpg'
      }, // 查看图片大图
      isSyncing: false, // 正在同步绑定的图片
      url_arr: [],
      loading: false,
      confirm: false
    }
  },
  mounted() {
    this.syncValue()
  },
  methods: {
    /* 同步value */
    syncValue() {
      // console.log('--- syncValue')
      this.isSyncing = true
      this.count = 0
      let url_arr = this.calUrlArr(this.value)

      // bugfix: 初始值选中的值不为空，才设置
      url_arr.length > 0 && (this.url_arr_deafult = JSON.stringify(url_arr))

      url_arr.length === 0 && (this.isSyncing = false)

      url_arr.forEach((v, i) => {
        this.preLoadImg(v, () => {
          this.count += 1
          this.$set(this.url_arr, i, v)
          if (this.count === url_arr.length) {
            this.isSyncing = false
          }
        })
      })
    },

    /* 单张图片value支持直接为字符串（所以需要进行如下处理转化），多张图片的上传value为数组 */
    calUrlArr(value) {
      let url_arr = value

      typeof url_arr === 'string' && url_arr && (url_arr = [url_arr])
      url_arr = url_arr || []
      return url_arr
    },

    /* 预加载（解决上传大图时，图片从上到下缓慢加载） */
    preLoadImg(url, cb) {
      const IMAGE = new Image()

      IMAGE.src = url
      IMAGE.onload = () => {
        cb()
      }
    },

    /**
     * 上传图片至七牛
     */
    async uploadToQiniu(file) {
      if (this.multiple) {
        if (this.max === this.url_arr_temp_length) {
          return
        }
        !this.url_arr_temp_length &&
          (this.url_arr_temp_length = this.url_arr.length)
        this.url_arr_temp_length += 1

        // 上传了多个
        if (this.multipleOneReturn && !this.configMutiple.isMutiple) {
          if (this.configMutiple.time) {
            const timeDiff = Date.now() - this.configMutiple.time

            if (timeDiff < 100) {
              this.configMutiple.isMutiple = true
              this.configMutiple.time = 0
            }
          } else {
            this.configMutiple.time = Date.now()
          }
        }
      }

      try {
        let data = await this.$api.Admin.getQnToken()

        let token = data.uptoken

        let key = `interval/${this.$PDo.String.random()}.${
          file.type.split('/')[1]
        }`

        let observable = qiniu.upload(file, key, token, [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'image/gif'
        ])

        observable.subscribe({
          next: () => {
            this.loading = true
          },
          error: (err) => {
            this.$Message.error(err)
          },
          complete: (val) => {
            const url = 'https://static.interval.im/' + val.key

            this.preLoadImg(url, () => {
              if (this.multipleOneReturn && this.configMutiple.isMutiple) {
                // 一次性返回
                this.configMutiple.url_arr.push(url)
                if (
                  this.configMutiple.url_arr.length === this.url_arr_temp_length
                ) {
                  this.url_arr = [
                    ...this.url_arr,
                    ...this.configMutiple.url_arr
                  ]
                  this.configMutiple.isMutiple = false
                  this.configMutiple.url_arr = []
                }
              } else {
                // 一个个返回
                this.url_arr.push(url)
              }
              this.loading = false
            })
          }
        })
        // }
        // return false // bugfix： 因为这个函数用了async,所以组件实际接收到是一个promise，而不是false
        return Promise.reject()
      } catch (e) {
        console.error(e)
        return Promise.reject()
      }
    },

    /* 清除 */
    handleClear(index) {
      this.url_arr.splice(index, 1)
      this.url_arr_temp_length -= 1
    },

    /* 查看大图 */
    handleShow(url) {
      // console.log('handleShow', url)
      this.img_model.show = true
      this.img_model.url = url
    }
  },
  computed: {
    disabled_btn() {
      return !(!this.max || this.max > this.url_arr.length)
    },
    show_upload() {
      return this.multiple || !this.url_arr.length
    }
  },
  watch: {
    url_arr: {
      handler: function(v) {
        if (this.isSyncing) {
          return
        }

        if (this.url_arr_deafult === JSON.stringify(v)) {
          return
        }

        const res = this.multiple ? v : v[0]

        this.$emit('change', res)
        this.$emit('on-change', res)
      },
      deep: true
    },
    value(v) {
      // 基本用不到
      let url_arr = this.calUrlArr(v)

      if (JSON.stringify(url_arr) === JSON.stringify(this.url_arr)) {
        return
      }
      // console.log('----- 同步 value', this.value)
      this.url_arr = []
      this.isSyncing = true
      this.syncValue()
    }
  }
}
</script>

<style lang="less">
.upload-images {
  // 图片/上传组件边框
  &__wrap {
    // margin-top: 24px;
    border: 1px dashed @border-color-base;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    width: 85px;
    height: 85px;
    display: flex;

    // 图片遮罩层.操作
    .upload-images__img__cover {
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.7);
      width: inherit;
      height: inherit;
      display: none;
      &__icon {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        // margin: 0 2px;
        &:hover {
          color: @primary-color;
        }
      }
    }
    &:hover {
      // border-color: @primary-color;

      .upload-images__img__cover {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  // 上传的图片
  &__img {
    max-width: 85px;
    max-height: 85px;
    display: block;
    margin: auto;
    position: relative;
  }

  // 上传加号图标
  &__icon {
    font-size: 68px;
    color: @subsidiary-color;
    width: 100%;
    height: 100%;
    line-height: 85px !important;
    text-align: center;
  }

  // 提示文案
  &__hint {
    // margin-top: -10px;
    color: @subsidiary-color;
    font-size: 12px;
  }
  &__hint2 {
    height: 32px;
    line-height: 32px;
    display: inline-block;
    vertical-align: top;
    color: @subsidiary-color;
    font-size: 12px;
    margin-left: 8px;
  }
}
</style>
