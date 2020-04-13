import { arr_status_status_map } from '../components/data-const'

export default {
  data() {
    // 客服消息类型
    this.msg_type_map = {
      text: '文本消息',
      image: '图片消息',
      mpnews: '图文消息'
    }

    // 模版、客服消息 公共的
    this.columns_map = {
      // this.columns_map.name, // 推送名称
      name: {
        title: '推送名称',
        minWidth: 140,
        key: 'name',
        tooltip: true
      },
      // this.columns_map.platform, // 服务号
      platform: {
        title: '服务号',
        minWidth: 180,
        // key: 'platform',
        render: (h, { row }) => {
          /* eslint-disable */
            return (
              <div class="itv-flex--fs cp" onClick={this.handleToAccount.bind(null, row)}>
                <img src={row.platform.head_img} class="img--headimgurl mr8" />
                <div class="flex1 itv-div__text--nowrap">
                  <Tooltip content={row.platform.nick_name} placement="top" transfer class="df itv-tooltip--table">
                    <div class='itv-div__text--nowrap'>{row.platform.nick_name}</div>
                  </Tooltip>
                </div>
              </div>
            )
          /* eslint-enable */
        }
      },
      // this.columns_map.push_time, // 实际发送时间
      push_time: {
        title: '实际发送时间',
        minWidth: 170,
        key: 'create_time',
        render: (h, { row }) => {
          return (
            <div class="itv-flex--fs">
              {/* <div style="width: 20px;height: 20px;margin-left: -18px;"> */}
              {/* eslint-disable */}
                {/* {row.cron ? <itv-icon type="i-clock" size="18" color="sub" /> : null}
              </div> */}
              <span>{this.$PDo.Date.format(row.push_time)}</span>
              {row.cron ? <itv-icon type="i-clock" size="18" color="sub" class="ml8" title="定时推送"/> : null}
            </div>
          )
        }
      },
      // this.columns_map.tag_ids, // 推送标签
      tag_ids: {
        title: '推送对象',
        minWidth: 120,
        // key: 'tag_ids',
        render: (h, { row }) => {
          return <span>{(row.tag_ids || []).length === 0 ? '全部' : '部分粉丝'}</span>
        }
      },
      // this.columns_map.n_pushes, // 送达的人数
      n_pushes: {
        title: '送达的人数',
        minWidth: 120,
        // key: 'n_pushes',
        render: (h, { row }) => {
          const reply_status = arr_status_status_map[row.status] || {}

          return (
            <div
              class="itv-flex--fs"
              title={'推送状态:' + (reply_status.text || '-')}
            >
              <div
                style={{
                  background: reply_status.color,
                  width: '8px',
                  height: '8px',
                  'border-radius': '50%',
                  'margin-right': '8px'
                }}
              />
              <div>{row.status === 0 ? '-' : row.n_pushes}</div>
            </div>
          )
        }
      }
    }

    // 模版消息
    this.columns_template_map = {
      // this.columns_template_map.title, // 使用模版
      title: {
          title: '使用模版',
          minWidth: 150,
          key: 'title'
        },
      // this.columns_template_map.link_url, // 跳转链接
      link_url: {
          title: '跳转链接',
          minWidth: 120,
          key: 'link_url',
          render: (h, { row }) => {
            /* eslint-disable */
            const link_url = (<div class="itv-flex--fs">
              <div class="flex1 mr8 itv-div__text--nowrap">
                <Tooltip
                  placement="bottom"
                  max-width={300}
                  theme="light"
                  content={row.link_url}
                  transfer
                  class="itv-tooltip--table"
                >
                  <div class="itv-div__text--nowrap">{row.link_url}</div>
                </Tooltip>
              </div>
              <itv-icon
                type="i-copy2"
                title="复制"
                class="cp fs0"
                size="20"
                color=""
                onClick={this.handleCopy.bind(null, row.link_url)}
              />
            </div>)
            /* eslint-enable */

          // eslint-disable-next-line
          return row.link_url ? link_url : <span>{row.mini_appid ? '小程序' : '-'}</span>
        }
      },
      // this.columns_template_map.actions, // 操作
      actions: {
        title: '操作',
        minWidth: 110,
        // key: 'n_sub',
        render: (h, { row }) => {
          return (
            <span class="itv-btn__text" onClick={this.handleDetail.bind(null, row)}>
              查看推送详情
            </span>
          )
        }
      }
    }

    // 客服消息
    this.columns_service_map = {
      // this.columns_service_map.msg_type, // 消息类型
      msg_type: {
        title: '消息类型',
        minWidth: 100,
        // key: 'msg_type',
        render: (h, { row }) => {
          return <span>{this.msg_type_map[row.msg_type] || '-'}</span>
        }
      },
      // this.columns_service_map.actions, // 操作
      actions: {
        title: '操作',
        width: 120,
        // key: 'n_sub',
        render: (h, { row }) => {
          return (
            <span class="itv-btn__text" onClick={this.handleDetail.bind(null, row)}>
              查看推送详情
            </span>
          )
        }
      }
    }

    return {
      loading: true,
      table: {
        data: [],
        total: 0,
        columns: [],
        height: null // 表格的高度
      },
      // 获取表格数据的参数
      form: {
        search: ''
      },
      // 对话框详情
      dialog_detail: {
        show: false, // 是否显示
        data: {} // 要显示的数据
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 点击公众号
    handleToAccount(row) {
      console.log(row)
      this.$router.push({
        name: 'AccountList',
        query: {
          account: (row.platform || {}).nick_name || ''
        }
      })
    }
  }
}
