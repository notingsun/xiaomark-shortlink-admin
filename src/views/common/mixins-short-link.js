import { pluginList, appMap, apiKeyMap } from './plugin-data'

export default {
  data() {
    const C_GREEN = '#47cb89'
    const C_BLUE = '#4F87FB'
    const C_ORANGE = '#e88986'
    const C_GREY = '#c5c8ce'
    const C_BLACK = '#2c3358'
    const SOURCE_MAP = [
      {},
      {
        name: '网页',
        icon: 'i-pc',
        color: C_ORANGE
      },
      {
        name: '小程序',
        icon: 'i-wx',
        color: C_BLUE
      },
      {
        name: '浏览器插件',
        icon: 'i-extention',
        color: C_GREEN
      },
      {
        name: '开放API',
        icon: 'i-api',
        color: C_BLACK
      }
    ]

    // 目标页面的数据键名
    this.targetMap = {
      open_wx_trace: {
        tooltip: '成功访问跳转链接的数据',
        pv: 'pv_wx_trace',
        uv: 'uv_wx_trace',
        uip: 'uip_wx_trace'
      }, // 是否开启微信内追踪访问记录
      open_wx_escape: {
        tooltip: '最终使用手机浏览器打开短链的数据',
        pv: 'pv_wx_escape',
        uv: 'uv_wx_escape',
        uip: 'uip_wx_escape'
      }, // 是否开启微信内强制浏览器打开
      open_douyin_app: {
        tooltip: '最终使用手机浏览器打开短链的数据',
        pv: 'pv_douyin_app',
        uv: 'uv_douyin_app',
        uip: 'uip_douyin_app'
      }, // 是否开启跳转抖音APP
      open_taobao_app: {
        tooltip: '最终使用手机浏览器打开短链的数据',
        pv: 'pv_taobao_app',
        uv: 'uv_taobao_app',
        uip: 'uip_taobao_app'
      } // 是否开启跳转淘宝APP
    }

    return {
      form: {
        set_wx_share: '', // 是否设置了微信内分享卡片参数
        open_wx_share: '', // 是否开启微信内分享卡片
        open_wx_trace: '', // 是否开启微信内追踪访问记录
        open_wx_escape: '', // 是否开启微信内强制浏览器打开
        open_douyin_app: '', // 是否开启跳转抖音APP
        open_taobao_app: '', // 是否开启跳转淘宝APP
        modes: [], // 链接类型
        sources: [], // 创建来源
        api: false // 来源
      },
      loading: true,
      tableColumns: [
        // 0 基本
        [
          {
            title: '短链名称',
            minWidth: 150,
            // key: 'name',
            render: (h, { row }) => {
              return (
                <Tooltip placement="bottom" max-width={300} theme="light" content={row.name} transfer>
                  <span class="itv-text--2row">{row.name}</span>
                </Tooltip>
              )
            }
          },
          {
            title: '短链',
            minWidth: 180,
            // key: 'url',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <div class="flex1">{row.url}</div>
                  <div class="ml4 fs0" title="查看报告分享">
                    <itv-icon
                      type="i-statistic"
                      size="20"
                      class="itv-btn__icon"
                      color="sub"
                      onClick={() => {
                        window.open(row.share_link)
                      }}
                    />
                  </div>
                </div>
              )
            }
          },
          {
            title: '创建时间',
            minWidth: 90,
            key: 'create_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.create_time).split(' ')

              return (
                <span>
                  {arr[0]}
                  {arr[1] && <br />}
                  {arr[1]}
                </span>
              )
            }
          },
          {
            title: '修改时间',
            minWidth: 90,
            key: 'modify_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.modify_time).split(' ')

              return (
                <span>
                  {arr[0]}
                  {arr[1] && <br />}
                  {arr[1]}
                </span>
              )
            }
          },
          {
            title: '跳转链接',
            width: 166,
            tooltip: true,
            key: 'origin_url',
            render: (h, { row }) => {
              // 随机链接
              /* eslint-disable */
              const arr_a = ((row.origin_url || '').split('\n') || []).map((item, index) => (
                <p>
                  <span>【{index + 1}】</span>
                  <a
                    target="_blank"
                    href={item}
                    rel="noreferrer"
                    >
                    {item}
                  </a>
                </p>
              ))
              /* eslint-enable */

              return (
                <div class="itv-flex--fs">
                  {/* eslint-disable */}
                  <Tooltip placement="bottom" max-width={500} theme="light" class="flex1">
                    {
                      row.mode === 0 
                      ? <a
                        target="_blank"
                        href={row.origin_url}
                        rel="noreferrer"
                        class="text--oneRow"
                        style="width: 116px;display: inline-block;vertical-align: middle;"
                        >
                          {row.origin_url}
                        </a>
                      : <div class="cp" style="color: #2D8cF0;">随机_{row.mode === 1 ? '' : '非'}记忆</div>
                    }
                    <div slot="content">
                      {
                        row.mode === 0 
                        ? <a
                          target="_blank"
                          href={row.origin_url}
                          rel="noreferrer"
                          >
                            {row.origin_url}
                          </a>
                        : arr_a
                      }
                    </div>
                  </Tooltip>
                  {/* eslint-enable */}
                  <div class="ml4 fs0" title="查看报告分享">
                    <itv-icon
                      type="i-qrcode"
                      size="20"
                      class="itv-btn__icon"
                      color="sub"
                      onClick={() => {
                        // eslint-disable-next-line prettier/prettier
                        const arr = (row.origin_url || '').split('\n') || []

                        this.$bus.modal.type = 'link_qr' // 链接的二维码
                        this.$bus.modal.show = true
                        this.$bus.modal.obj = {
                          list: arr
                        }
                        this.$bus.modal.success_cb = this.doGetData
                      }}
                    />
                  </div>
                </div>
              )
            }
          },
          {
            title: '访问次数 / 人数 / IP数',
            minWidth: 160,
            format: this.$global.utils.countFormat.three,
            render: (h, { row }) => {
              const stats = row.stats || {}
              // 累计
              const n_clicks = this.$global.utils.countFormat.three(stats.pv)
              const n_visitors = this.$global.utils.countFormat.three(stats.uv)
              const n_ips = this.$global.utils.countFormat.three(stats.uip)
              // 今日
              const n_clicks_t = this.$global.utils.countFormat.three(stats.pv_today)
              const n_visitors_t = this.$global.utils.countFormat.three(stats.uv_today)
              const n_ips_t = this.$global.utils.countFormat.three(stats.uip_today)

              // 目标页面
              let targetType = ''

              row.open_wx_trace && (targetType = 'open_wx_trace')
              row.open_wx_escape && (targetType = 'open_wx_escape')
              row.open_douyin_app && (targetType = 'open_douyin_app')
              row.open_taobao_app && (targetType = 'open_taobao_app')
              const targetInfo = this.targetMap[targetType] || {}
              const statsTargetInfo = {
                show: Boolean(targetType),
                type: targetType,
                tooltip: targetInfo.tooltip,
                pv: targetInfo.pv,
                uv: targetInfo.uv,
                uip: targetInfo.uip
              }

              return (
                <div class="cp mt4 mb4">
                  <div>
                    <span class="text-visit-label">今日</span>
                    <span class="text-visit" title="访问次数">
                      {n_clicks_t}
                    </span>
                    <span> / </span>
                    <span class="text-visit" title="访问人数">
                      {n_visitors_t}
                    </span>
                    <span> / </span>
                    <span class="text-visit" title="IP数">
                      {n_ips_t}
                    </span>
                  </div>
                  <div class="grey">
                    <span class="text-visit-label">累计</span>
                    <span class="text-visit" title="访问次数">
                      {n_clicks}
                    </span>
                    <span> / </span>
                    <span class="text-visit" title="访问人数">
                      {n_visitors}
                    </span>
                    <span> / </span>
                    <span class="text-visit" title="IP数">
                      {n_ips}
                    </span>
                  </div>
                  <div class="grey" style={statsTargetInfo.show ? 'display: block' : 'display: none'}>
                    <span class="text-visit-label" title={statsTargetInfo.tooltip}>
                      目标页面
                    </span>
                    <span class="text-visit" title="访问次数">
                      {n_clicks}
                    </span>
                    <span> / </span>
                    <span class="text-visit" title="访问人数">
                      {n_visitors}
                    </span>
                    <span> / </span>
                    <span class="text-visit" title="IP数">
                      {n_ips}
                    </span>
                  </div>
                </div>
              )
            }
          }
        ],
        // 1 创建者
        [
          {
            title: '创建者',
            minWidth: 160,
            key: 'user.nickname user.headimgurl',
            render: (h, { row }) => {
              return (
                <div class="table-cell__nickname table-cell__nickname--click cp" onClick={this.toUserDetail.bind(null, row)}>
                  <img src={row.user.headimgurl} class="img--headimgurl mr8" />
                  <span class="text--nickname">{row.user.nickname}</span>
                </div>
              )
            }
          }
        ],
        // 2 来源 插件功能  微信分享 是否可用 是否归档
        [
          // 来源
          {
            title: '来源',
            minWidth: 136,
            key: 'source',
            render: (h, { row }) => {
              return (
                <div>
                  <span class="mr8" title={SOURCE_MAP[row.source].name || '--'}>
                    <itv-icon type={SOURCE_MAP[row.source].icon || '--'} style={{ color: SOURCE_MAP[row.source].color || '--' }} size="24" />
                  </span>
                </div>
              )
            }
          },
          {
            title: '插件功能',
            minWidth: 130,
            key: 'subscribe',
            // align: 'center',
            render: (h, { row }) => {
              let res = pluginList.map((item) => {
                return row[apiKeyMap[item]] ? <img src={appMap[item].icon} class="mr8 img--plugin--icon" title={appMap[item].title} /> : null
              })

              return <div>{res}</div>
            }
          },
          // 微信分享
          {
            title: ' ',
            minWidth: 120,
            key: 'wx_share',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '已设置分享参数', value: 1 },
                { name: '未设置分享参数', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.has_params === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.has_params = item.value
                        this.doGetData()
                      }}
                    >
                      {item.name}
                    </span>
                  </DropdownItem>
                )
              })

              return (
                <Dropdown>
                  <div class="cp">
                    <span class="mr8">微信分享</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            // eslint-disable-next-line no-unused-vars
            render: (h, { row }) => {
              if (row.wx_share_params) {
                return (
                  <img
                    style="width: 20px;"
                    title={row.open_wx_share ? '通过审核' : '未通过审核'}
                    class={row.open_wx_share ? 'cp' : 'cp img--grey'}
                    src={require('../../assets/report/b_wechat.png')}
                    onClick={() => {
                      this.$bus.modal.type = 'wx_share'
                      this.$bus.modal.show = true
                      this.$bus.modal.obj = row
                      this.$bus.modal.success_cb = this.doGetData
                    }}
                  />
                )
              }
              return null
            }
          },
          // 是否可用
          {
            title: '是否可用',
            minWidth: 120,
            key: 'enabled',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '可用', value: 1 },
                { name: '不可用', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.enabled === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.enabled = item.value
                        this.doGetData()
                      }}
                    >
                      {item.name}
                    </span>
                  </DropdownItem>
                )
              })

              return (
                <Dropdown>
                  <div class="cp">
                    <span class="mr8">是否可用</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return (
                <itv-icon
                  class="cp"
                  title={row.enabled ? '可用' : '不可用'}
                  type={row.enabled ? 'i-stop' : 'i-start'}
                  size="20"
                  style={`color: ${row.enabled ? C_GREEN : C_GREY}`}
                  onClick={() => {
                    this.$bus.modal.type = 'enabled_short_link'
                    this.$bus.modal.show = true
                    this.$bus.modal.obj = row
                    this.$bus.modal.success_cb = this.doGetData
                  }}
                />
              )
            }
          }
        ],
        // 3 协作空间
        [
          {
            title: '协作空间',
            minWidth: 140,
            key: 'workspace',
            render: (h, { row }) => {
              return <span>{(row.workspace || {}).name || '-'}</span>
            }
          }
        ],
        // 4是否归档
        [
          // 是否归档
          {
            title: '是否归档',
            minWidth: 120,
            key: '',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '已归档', value: 1 },
                { name: '未归档', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.archived === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.archived = item.value
                        this.doGetData()
                      }}
                    >
                      {item.name}
                    </span>
                  </DropdownItem>
                )
              })

              return (
                <Dropdown>
                  <div class="cp">
                    <span class="mr8">是否归档</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            },
            render: (h, { row }) => {
              return <Icon title={row.archived ? '已归档' : '未归档'} type="md-checkmark-circle" color={row.archived ? C_GREEN : C_GREY} size="20" />
            }
          }
        ]
      ],
      table: {
        data: [],
        total: 0,
        columns: [],
        height: null // 表格的高度
      },
      options: {
        sort: [
          { value: 'modify_time', label: '按数据修改时间倒序' },
          { value: 'pv', label: '按访问次数倒序' },
          { value: 'uv', label: '按访问人数倒序' },
          { value: 'uip', label: '按访问IP数倒序' },
          { value: 'pv_today', label: '按今日访问次数倒序' },
          { value: 'uv_today', label: '按今日访问人数倒序' },
          { value: 'uip_today', label: '按今日访问IP数倒序' }
          // { value: 'time', label: '按创建时间倒序' },
          // { value: 'click', label: '按访问次数倒序' },
          // { value: 'visitor', label: '按访问人数倒序' },
          // { value: 'ip', label: '按访问IP数倒序' }
        ]
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    console.log(this.$route.name)
    // 0 基本
    // 1 创建者
    // 2 是否可用
    // 3 协作空间
    if (this.$route.name === 'ShortLinkListSpace') {
      this.table.columns = [...this.tableColumns[0], ...this.tableColumns[1], ...this.tableColumns[2], ...this.tableColumns[4]]
      return
    }
    if (this.$route.name === 'ShortLinkListCustomDomain') {
      this.table.columns = [...this.tableColumns[0], ...this.tableColumns[2], ...this.tableColumns[3], ...this.tableColumns[4]]
      return
    }
    /* eslint-disable */
    this.table.columns = this.$route.name === 'ShortLinkListUser'
      ? [...this.tableColumns[0], ...this.tableColumns[2], ...this.tableColumns[3], ...this.tableColumns[4]]
      : [ ...this.tableColumns[0],
          ...this.tableColumns[1],
          ...this.tableColumns[2],
          ...this.tableColumns[3],
          ...this.tableColumns[4]
        ]
    /* eslint-enable */
  },
  watch: {},
  methods: {}
}
