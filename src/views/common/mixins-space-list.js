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
            key: 'n_collaborators',
            // eslint-disable-next-line no-unused-vars
            renderHeader: (h) => {
              const options = [
                { name: '全部', value: '' },
                { name: '大于0', value: 1 },
                { name: '0', value: 0 }
              ]
              const optionsList = options.map((item) => {
                return (
                  <DropdownItem
                    class={
                      // eslint-disable-next-line prettier/prettier
                      this.form.n_collaborators === item.value ? 'enabled_active enabled_item' : 'enabled_item'
                    }
                  >
                    <span
                      class="enabled_span"
                      onClick={() => {
                        this.form.n_collaborators = item.value
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
                    <span class="mr8">协作者数量</span>
                    <Icon type="ios-funnel" title="筛选" />
                  </div>
                  <DropdownMenu slot="list">{optionsList}</DropdownMenu>
                </Dropdown>
              )
            }
          },
          {
            title: '链接分组数量',
            minWidth: 120,
            key: 'n_groups'
          },
          {
            title: '链接数量',
            minWidth: 90,
            key: 'n_links'
          },
          {
            title: '链接访问次数',
            minWidth: 120,
            key: 'n_clicks'
          }
        ],
        [
          {
            title: '创建者',
            key: 'nickname headimgurl',
            minWidth: 160,
            render: (h, { row }) => {
              return (
                <div
                  class="table-cell__nickname cp"
                  onClick={this.toUserSpaceList.bind(null, row)}
                >
                  <img
                    src={(row.user || {}).headimgurl}
                    class="img--headimgurl mr8"
                  />
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
                    <itv-icon
                      type="sub-MemberList"
                      size="20"
                      class="itv-btn__icon mr16"
                      onClick={this.toSpaceDetail.bind(null, row)}
                    />
                  </span>
                  <span title="查看短链">
                    <itv-icon
                      type="i-detail"
                      size="20"
                      class="itv-btn__icon"
                      onClick={this.toShortLinkSpace.bind(null, row)}
                    />
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
      },
      options: {
        sort: [
          { value: 'time', label: '按创建时间倒序' },
          { value: 'collaborator', label: '按协作者数量倒序' },
          { value: 'link', label: '按链接数量倒序' },
          { value: 'click', label: '按链接访问次数倒序' }
        ]
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
