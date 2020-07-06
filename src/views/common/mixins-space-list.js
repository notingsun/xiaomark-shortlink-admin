import { appMap, pluginListUser, apiKeyMap } from './plugin-data'

/* 协作空间列表 */
export default {
  data() {
    return {
      loading: true,
      tableColumns: [
        [
          {
            title: '名称',
            minWidth: 120,
            key: 'name'
          },
          {
            title: '创建时间',
            minWidth: this.$bus.view_width <= 1300 ? 120 : 150,
            key: 'create_time',
            render: (h, { row }) => {
              const arr = this.$PDo.Date.format(row.create_time).split(' ')

              return (
                <span>
                  {arr[0]}
                  {arr[1] && this.$bus.view_width <= 1300 ? <br /> : ' '}
                  {arr[1]}
                </span>
              )
            }
          },
          {
            title: '协作者数量',
            minWidth: 120,
            key: 'n_collaborators'
          },
          {
            title: '链接分组数量',
            minWidth: 120,
            key: 'n_groups'
          },
          {
            title: '链接数量',
            minWidth: 140,
            // key: 'n_links',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <div class="flex1" title="今日">
                    {row.n_links_today}
                  </div>
                  <div class="mr16">/</div>
                  <div class="flex2" title="累计">
                    {row.n_links}
                  </div>
                </div>
              )
            }
          },
          {
            title: '链接访问次数',
            minWidth: 160,
            // key: 'n_clicks',
            render: (h, { row }) => {
              return (
                <div class="itv-flex--fs">
                  <div class="flex1" title="今日">
                    {row.pv_today}
                  </div>
                  <div class="mr16">/</div>
                  <div class="flex2" title="累计">
                    {row.pv}
                  </div>
                </div>
              )
            }
          },
          {
            title: '插件',
            minWidth: 190,
            // key: 'n_clicks',
            render: (h, { row }) => {
              let res = pluginListUser.map((item) => {
                return <img src={appMap[item].icon} class={`mr8 img--plugin--icon ${row[apiKeyMap[item]] ? '' : ' disabled'}`} title={appMap[item].title} />
              })

              return <div>{res}</div>
            }
          }
        ],
        [
          {
            title: '创建者',
            key: 'nickname headimgurl',
            minWidth: 160,
            render: (h, { row }) => {
              return (
                <div class="table-cell__nickname cp" onClick={this.toUserSpaceList.bind(null, row)}>
                  <img src={(row.user || {}).headimgurl} class="img--headimgurl mr8" />
                  <div class="text--nickname">{(row.user || {}).nickname}</div>
                </div>
              )
            }
          }
        ],
        [
          {
            title: '操作',
            width: 100,
            fixed: 'right',
            render: (h, { row }) => {
              return (
                <div>
                  <span title="查看成员">
                    <itv-icon type="sub-MemberList" size="20" class="itv-btn__icon mr16" onClick={this.toSpaceDetail.bind(null, row)} />
                  </span>
                  <span title="查看短链">
                    <itv-icon type="i-detail" size="20" class="itv-btn__icon" onClick={this.toShortLinkSpace.bind(null, row)} />
                  </span>
                </div>
              )
            }
          }
        ]
      ],
      table: {
        data: [],
        total: 0,
        columns: [],
        height: null // 表格的高度
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.table.height = this.$refs.refTable.$el.clientHeight
    })
    console.log(this.$route.name)
    /* eslint-disable */
    this.table.columns = this.$route.name === 'SpaceListUser'
      ? [...this.tableColumns[0], ...this.tableColumns[2]]
      : [ ...this.tableColumns[0],
          ...this.tableColumns[1],
          ...this.tableColumns[2]
        ]
    /* eslint-enable */
  },
  watch: {},
  methods: {
    toSpaceDetail(row) {
      this.$router.push({
        name: 'SpaceDetail',
        params: { space_id: row.id },
        query: { name: row.name }
      })
    },
    // 查看该空间的短链
    toShortLinkSpace(row) {
      this.$router.push({
        name: 'ShortLinkListSpace',
        params: { space_id: row.id },
        query: { name: row.name }
      })
    }
  }
}
