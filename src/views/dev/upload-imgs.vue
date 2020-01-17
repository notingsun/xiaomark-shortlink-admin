/* 上传图片 */
<template>
  <div class="upload-imgs">
    <div class="mb16 itv-flex--sb top">
      <div class="itv-flex--fs--fs">
        <p class="itv-title--14 mr16">请选择要上传的图片：</p>
        <itv-upload-image
          v-model="image"
          :accept="'image/png, image/jpeg'"
          limitText=""
          :multiple="true"
          :max="30"
          clearable
          :multipleOneReturn="true"
          @on-change="handleImg"
        />
      </div>
      <div>
        <Button type="error" @click="deleteAll">删除全部（本地缓存）</Button>
      </div>
    </div>
    <Table :height="560" :columns="columns" :data="data" />
    <itv-model-img v-model="img_model.show" :imgModelUrl="img_model.url" />
  </div>
</template>

<script>
export default {
  name: 'UploadImgs',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      columns: [
        {
          title: '图片',
          minWidth: 120,
          render: (h, { row }) => {
            return (
              <img
                onClick={() => {
                  this.img_model.show = true
                  this.img_model.url = row.url
                }}
                src={row.url}
                aly="img"
                style="width: 80px;"
                class="mt8 mb8 cp"
              />
            )
          }
        },
        {
          title: '地址',
          minWidth: 300,
          key: 'url'
        },
        {
          title: '复制',
          width: 80,
          render: (h, { row }) => {
            return (
              <itv-icon
                type="i-copy2"
                title="复制链接"
                class="cp"
                size="20"
                color=""
                onClick={this.copy.bind(null, row)}
              />
            )
          }
        },
        {
          title: '删除',
          width: 80,
          render: (h, { row, index }) => {
            return (
              <itv-icon
                type="i-delete"
                title="删除"
                class="cp"
                size="20"
                color=""
                onClick={this.delete.bind(null, { row, index })}
              />
            )
          }
        }
      ],
      data: [],
      image: [],
      img_model: {
        show: false,
        url: ''
      }
      // https://static.interval.im/scrm/HbSHB5bnTnWENMKf.png
    }
  },
  computed: {},
  created() {},
  mounted() {
    let data = this.getData()

    if (data.length === 0) {
      window.localStorage.setItem('UploadImgs', [])
    }

    this.data = data.map((item) => {
      return {
        url: item
      }
    })
  },
  watch: {},
  methods: {
    getData(reverse = true) {
      let data = window.localStorage.getItem('UploadImgs') || ''

      data = data ? (data || '').split(',') : []

      return reverse ? data.reverse() : data
    },
    handleImg(v) {
      if (v && v.length > 0) {
        let data = this.getData(false)

        this.image = v
        setTimeout(() => {
          this.image = []
        }, 300)
        v.forEach((item) => {
          if (!data.includes(item)) {
            data.push(item)
          }
        })
        window.localStorage.setItem('UploadImgs', data)
        this.data = this.getData().map((item) => {
          return {
            url: item
          }
        })
      }
    },
    copy(data) {
      this.$PDo.Utils.copy({
        content: data.url,
        success: () => {
          this.$Message.success('复制成功！')
        }
      })
    },
    delete({ index }) {
      let data = this.getData()

      data.splice(index, 1)
      window.localStorage.setItem('UploadImgs', (data || []).reverse())
      this.data = this.getData().map((item) => {
        return {
          url: item
        }
      })
    },
    deleteAll() {
      window.localStorage.setItem('UploadImgs', [])
      this.data = []
    }
  }
}
</script>

<style scoped lang="less">
.upload-imgs {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 32px;
  .top {
    height: 40px;
    overflow: hidden;
  }
}
</style>
