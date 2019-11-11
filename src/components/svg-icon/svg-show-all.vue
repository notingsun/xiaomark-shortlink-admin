/* svg图标的可视化页面 */
<template>
  <div class="svg-show-all pl16">
    <div class="mb40" style="text-align:center;">
      <span class="itv-title--14">颜色color：</span>
      <RadioGroup v-model="color" type="button">
        <Radio label="primary" />
        <Radio label="success" />
        <Radio label="error" />
        <Radio label="sub" />
      </RadioGroup>
      <span class="itv-title--14 ml32">大小size：</span>
      <RadioGroup v-model="size" type="button">
        <Radio label="">不设置size（设置了width:32px，height:32px;）</Radio>
        <Radio label="16" />
        <Radio label="20" />
        <Radio label="24" />
      </RadioGroup>
      <span class="ml32 itv-text--vip">点击图标，可以复制icon的名称</span>
    </div>
    <div class="itv-flex--fs svgs-wrap">
      <div
        class="svg-wrap mb32 ml16 mr16"
        v-for="(item, i) in list"
        :key="i"
        :title="name_map[item.type]"
      >
        <itv-icon
          :type="item.type"
          width="32px"
          height="32px"
          :color="color"
          ref="ref"
          :size="size"
          class="svg-item"
        />
        <p class="mt16 svg__title">
          {{ item.type }}
          <br />
          {{ name_map[item.type] }}
        </p>
        <div class="itv-flex--fs button-wrap mt8">
          <Button class="mr16" size="small" @click="handleCopy(item.type, 0)"
            >名称</Button
          >
          <Button size="small" @click="handleCopy(item.type, 1)">代码</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Name',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      size: '',
      color: 'success',
      list: []
    }
  },
  computed: {
    name_map() {
      let res = {}

      this.list.forEach((item) => {
        let v = document
          .getElementById(`icon-${item.type}`)
          .getElementsByTagName('desc')[0].innerHTML

        v = v
          .split('')
          .splice(v.lastIndexOf('/') + 1)
          .join('')

        res[item.type] = v
      })

      return res
    }
  },
  created() {
    this.initList()
  },
  mounted() {},
  watch: {},
  methods: {
    initList() {
      let res = []

      require
        .context('./icons/', true, /\.svg$/) // 全部的
        .keys()
        .forEach((item) => {
          const name = item.replace(/(.*\/)*([^.]+).*/gi, '$2')

          res.push({
            type: name,
            path: item
          })
        })

      this.list = res
    },
    handleCopy(v, type) {
      const input = document.createElement('input'),
        value = type ? `<itv-icon type="${v}" size="20" />` : v,
        text = `复制【${value}】成功`.replace('<', '&lt;') // Message方法将text用v-html显示

      document.body.appendChild(input)
      input.setAttribute('value', value)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        this.$Message.success(text)
      }
      document.body.removeChild(input)
    }
  }
}
</script>

<style scoped lang="less">
.svg-show-all {
  margin: 50px 0px;

  .svgs-wrap {
    flex-wrap: wrap;
  }
  .svg-wrap {
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &:hover {
      box-shadow: 1px 1px 10px #888888;

      .button-wrap {
        display: block;
      }

      .svg-item {
        color: pink;
      }
    }

    .button-wrap {
      display: none;
    }
  }

  .svg__title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: center;
  }
}
</style>
