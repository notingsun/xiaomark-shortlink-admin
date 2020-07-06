/* 自定义域名列表 */
<template>
  <div class="plugin-list itv-flex-v--fs">
    <!-- 头部 -->
    <div class="header mb16 itv-flex--sb">
      <div class="header__search"></div>
      <Button type="primary" @click="handelClickEdit">编辑插件应用中间页地址</Button>
    </div>
    <!-- 表格 -->
    <Table :loading="loading" :columns="table.columns" :data="table.data" />
    <!-- 对话框 -->
    <Modal class="modal--plugin--bridge" :mask-closable="false" v-model="modal.show" title="编辑插件应用中间页地址">
      <div class="mb20" v-for="(item, i) in pluginList" :key="i">
        <div class="mb8" style="line-height: 24px;">
          <span>{{ item.name }}</span>
          <!-- <span class="ml8 itv-text--grey4">{{ bridges_data[item.key] }}</span> -->
          <span class="ml8 itv-text--red">{{ bridges_data[item.key] !== form[item.key] ? '修改了' : '' }}</span>
        </div>
        <Input v-model="form[item.key]" />
      </div>
      <div slot="footer">
        <Button type="text" @click="modal.show = false">取消</Button>
        <Button type="primary" @click="handleSubmit" :loading="modal.isSubmiting">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { appMap, pluginListUser, apiKeyMap, pluginList } from '../common/plugin-data'

export default {
  name: 'PluginList',
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      pluginList: {},
      form: {},
      bridges_data: {},
      modal: {
        show: false,
        isSubmiting: false
      },
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: '名称',
            minWidth: 120,
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <img src={row.icon} class="mr8 img--plugin--icon" />
                  <span>{row.name}</span>
                </div>
              )
            }
          },
          {
            title: '插件应用中间页地址',
            minWidth: 300,
            key: 'bridge'
          },
          {
            title: '打开人数',
            minWidth: 100,
            key: 'user'
          },
          {
            title: '应用空间数量',
            minWidth: 100,
            key: 'workspace'
          },
          {
            title: '应用短链数量',
            minWidth: 100,
            key: 'link'
          }
        ]
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.doGetData()
  },
  watch: {
    'modal.show'(v) {
      if (!v) {
        setTimeout(() => {
          pluginList.forEach((key) => {
            this.form[key] = this.bridges_data[key]
          })
        }, 300)
      }
    }
  },
  methods: {
    // 获取表格的数据
    async doGetData() {
      await this.doGetBrides()
      await this.doGetData2()
    },
    async doGetBrides() {
      try {
        let res = await this.$api.Plugin.getPluginBridegs({})

        this.bridges_data = {
          'wx-share': '-',
          'wx-visit': res.wxt,
          'wx-browser': res.wxe,
          'wx-auto-open': res.dya,
          'wx-auto-open-tb': res.tba
        }
        this.pluginList = []
        pluginList.forEach((key) => {
          this.$set(this.form, key, this.bridges_data[key])
          this.pluginList.push({
            key,
            name: appMap[key].key_name
          })
        })
      } catch (e) {
        console.error(e)
      }
    },
    async doGetData2() {
      this.loading = true
      try {
        let res = await this.$api.Plugin.getPluginList({})

        res = res || {}

        this.table.data = pluginListUser.map((key) => {
          const key2 = apiKeyMap[key]

          return {
            icon: appMap[key].icon,
            name: appMap[key].key_name,
            bridge: this.bridges_data[key],
            user: (res.user || {})[key2],
            workspace: (res.workspace || {})[key2],
            link: (res.link || {})[key2]
          }
        })
      } catch (e) {
        console.error(e)
      }
      this.loading = false
    },
    // 点击.编辑插件应用中间页地址
    handelClickEdit() {
      this.modal.show = true
    },
    // 点击.提交
    handleSubmit() {
      console.log('handleSubmit')
      const noValue = pluginList.some((key) => !this.form[key])

      if (!noValue) {
        this.doSubmit()
      } else {
        this.$Message.error('表单填写错误')
      }
    },
    async doSubmit() {
      try {
        await this.$api.Plugin.putPluginBridegs({
          wxt: this.form['wx-visit'],
          wxe: this.form['wx-browser'],
          dya: this.form['wx-auto-open'],
          tba: this.form['wx-auto-open-tb']
        })
        this.modal.show = false
        setTimeout(() => {
          this.$Message.success('编辑成功')
        }, 300)
        this.doGetData()
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="less">
// .plugin-list {
// }
// .modal--plugin--bridge {
//   .row {
//     margin-bottom: ;
//   }
// }
</style>
