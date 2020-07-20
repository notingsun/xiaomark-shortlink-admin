/* eslint-diasble */
const data = {
  count: 22,
  stats: [
    {
      week: 22, // 第几周
      mon: '2020-07-06', // 周一
      sun: '2020-07-12', // 周日
      // uv: null, // 一周的UV
      n_users: 640, // 一周的注册用户数
      n_users_active: 197, // 一周的激活用户数
      n_users_stay: 1072, // 一周的留存用户数
      // register_rate: null, // 注册率
      active_rate: 0.3078, // 激活率
      n_users_stay_weeks_later: [197], // N周后留存用户数
      // 按来源分布的统计数据
      source_stats: [
        {
          active_rate: 0.2131,
          n_users: 352,
          n_users_active: 75,
          n_users_stay: 387,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3793,
          n_users: 116,
          n_users_active: 44,
          n_users_stay: 200,
          source: ''
        },
        {
          active_rate: 0.3673,
          n_users: 49,
          n_users_active: 18,
          n_users_stay: 133,
          source: 'baidu.com'
        },
        {
          active_rate: 0.4118,
          n_users: 34,
          n_users_active: 14,
          n_users_stay: 77,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.4737,
          n_users: 19,
          n_users_active: 9,
          n_users_stay: 52,
          source: 'google.com'
        },
        {
          active_rate: 0.5333,
          n_users: 15,
          n_users_active: 8,
          n_users_stay: 61,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.9091,
          n_users: 11,
          n_users_active: 10,
          n_users_stay: 50,
          source: 'workspace-share'
        },
        {
          active_rate: 0.125,
          n_users: 8,
          n_users_active: 1,
          n_users_stay: 15,
          source: 'docsmall.com'
        },
        {
          active_rate: 1,
          n_users: 5,
          n_users_active: 5,
          n_users_stay: 5,
          source: 'google.com.hk'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 5,
          source: 'bing.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 8,
          source: 'sspai.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 8,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 0,
          source: '46wx.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 8,
          source: '6url.cn'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'gddlm.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'csdn.net'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 3,
          source: 'v2ex.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'hao.su'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '5118.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'ujuji.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'adzhp.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'xuetu20.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'ku68.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'mianbaoduo.com'
        },
        {
          n_users: 0,
          n_users_active: 2,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'jianshu.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'fly63.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'qq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'infoq.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dycharts.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'feishu.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'github.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'logosc.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'shimo.im'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xmt.cn'
        }
      ]
    },
    {
      active_rate: 0.2835,
      mon: '2020-06-29',
      n_users: 716,
      n_users_active: 203,
      n_users_stay: 1089,
      n_users_stay_weeks_later: [203, 99],
      register_rate: 0.065,
      source_stats: [
        {
          active_rate: 0.223,
          n_users: 417,
          n_users_active: 93,
          n_users_stay: 405,
          source: 'miniprogram'
        },
        {
          active_rate: 0.4286,
          n_users: 84,
          n_users_active: 36,
          n_users_stay: 175,
          source: ''
        },
        {
          active_rate: 0.2692,
          n_users: 52,
          n_users_active: 14,
          n_users_stay: 127,
          source: 'baidu.com'
        },
        {
          active_rate: 0.45,
          n_users: 40,
          n_users_active: 18,
          n_users_stay: 59,
          source: 'google.com'
        },
        {
          active_rate: 0.28,
          n_users: 25,
          n_users_active: 7,
          n_users_stay: 77,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.28,
          n_users: 25,
          n_users_active: 7,
          n_users_stay: 58,
          source: 'workspace-share'
        },
        {
          active_rate: 0.5385,
          n_users: 13,
          n_users_active: 7,
          n_users_stay: 69,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.3,
          n_users: 10,
          n_users_active: 3,
          n_users_stay: 16,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.375,
          n_users: 8,
          n_users_active: 3,
          n_users_stay: 4,
          source: 'google.com.hk'
        },
        {
          active_rate: 0.25,
          n_users: 8,
          n_users_active: 2,
          n_users_stay: 10,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.25,
          n_users: 8,
          n_users_active: 2,
          n_users_stay: 9,
          source: 'sspai.com'
        },
        {
          active_rate: 1,
          n_users: 3,
          n_users_active: 3,
          n_users_stay: 9,
          source: 'csdn.net'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'bing.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'data-share'
        },
        {
          active_rate: 2,
          n_users: 2,
          n_users_active: 4,
          n_users_stay: 6,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'v2ex.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'douban.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'gddlm.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 10,
          source: '6url.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 6,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'hao.su'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'google.com.tw'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'kt1.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '5118.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 8,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'infoq.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dycharts.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'feishu.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'logosc.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'shimo.im'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xmt.cn'
        }
      ],
      sun: '2020-07-05',
      uv: 11007,
      week: 21
    },
    {
      active_rate: 0.3101,
      mon: '2020-06-22',
      n_users: 587,
      n_users_active: 182,
      n_users_stay: 1071,
      n_users_stay_weeks_later: [182, 93, 70],
      register_rate: 0.0634,
      source_stats: [
        {
          active_rate: 0.21,
          n_users: 281,
          n_users_active: 59,
          n_users_stay: 384,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3475,
          n_users: 118,
          n_users_active: 41,
          n_users_stay: 190,
          source: ''
        },
        {
          active_rate: 0.5,
          n_users: 46,
          n_users_active: 23,
          n_users_stay: 133,
          source: 'baidu.com'
        },
        {
          active_rate: 0.4828,
          n_users: 29,
          n_users_active: 14,
          n_users_stay: 50,
          source: 'google.com'
        },
        {
          active_rate: 0.6154,
          n_users: 26,
          n_users_active: 16,
          n_users_stay: 76,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.375,
          n_users: 16,
          n_users_active: 6,
          n_users_stay: 75,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.4286,
          n_users: 14,
          n_users_active: 6,
          n_users_stay: 52,
          source: 'workspace-share'
        },
        {
          active_rate: 0.2222,
          n_users: 9,
          n_users_active: 2,
          n_users_stay: 18,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.1667,
          n_users: 6,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          active_rate: 0.6,
          n_users: 5,
          n_users_active: 3,
          n_users_stay: 9,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.6,
          n_users: 5,
          n_users_active: 3,
          n_users_stay: 6,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 5,
          n_users_active: 0,
          n_users_stay: 6,
          source: 'bing.com'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'sogou.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'sspai.com'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 7,
          source: '6url.cn'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'logosc.cn'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'meibp.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'infoq.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'gddlm.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'waysto.work'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'google.com.hk'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'mysxl.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'adzhp.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'tb.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'dydata.io'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'daok.cc'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'mianbaoduo.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'feishu.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'qq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dycharts.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'interval.im'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'shimo.im'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xmt.cn'
        }
      ],
      sun: '2020-06-28',
      uv: 9256,
      week: 20
    },
    {
      active_rate: 0.2062,
      mon: '2020-06-15',
      n_users: 1193,
      n_users_active: 246,
      n_users_stay: 1223,
      n_users_stay_weeks_later: [246, 98, 63, 60],
      register_rate: 0.0832,
      source_stats: [
        {
          active_rate: 0.1476,
          n_users: 901,
          n_users_active: 133,
          n_users_stay: 485,
          source: 'miniprogram'
        },
        {
          active_rate: 0.413,
          n_users: 92,
          n_users_active: 38,
          n_users_stay: 206,
          source: ''
        },
        {
          active_rate: 0.4286,
          n_users: 63,
          n_users_active: 27,
          n_users_stay: 147,
          source: 'baidu.com'
        },
        {
          active_rate: 0.1765,
          n_users: 34,
          n_users_active: 6,
          n_users_stay: 75,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.381,
          n_users: 21,
          n_users_active: 8,
          n_users_stay: 87,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.4118,
          n_users: 17,
          n_users_active: 7,
          n_users_stay: 53,
          source: 'google.com'
        },
        {
          active_rate: 0.4444,
          n_users: 9,
          n_users_active: 4,
          n_users_stay: 49,
          source: 'workspace-share'
        },
        {
          active_rate: 0.6667,
          n_users: 6,
          n_users_active: 4,
          n_users_stay: 10,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.3333,
          n_users: 6,
          n_users_active: 2,
          n_users_stay: 9,
          source: '6url.cn'
        },
        {
          active_rate: 0.1667,
          n_users: 6,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'csdn.net'
        },
        {
          active_rate: 1,
          n_users: 5,
          n_users_active: 5,
          n_users_stay: 8,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 5,
          n_users_active: 0,
          n_users_stay: 18,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.5,
          n_users: 4,
          n_users_active: 2,
          n_users_stay: 5,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 4,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'gddlm.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'google.com.hk'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 13,
          source: 'wx-data.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'sspai.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'jianshu.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'meibp.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'interval.im'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 8,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'rdonly.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'tomdh.me'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '255.158'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'infoq.cn'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'dycharts.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'feishu.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'shimo.im'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xmt.cn'
        }
      ],
      sun: '2020-06-21',
      uv: 14345,
      week: 19
    },
    {
      active_rate: 0.3189,
      mon: '2020-06-08',
      n_users: 668,
      n_users_active: 213,
      n_users_stay: 1102,
      n_users_stay_weeks_later: [213, 119, 89, 79, 61],
      register_rate: 0.0742,
      source_stats: [
        {
          active_rate: 0.2324,
          n_users: 340,
          n_users_active: 79,
          n_users_stay: 390,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3243,
          n_users: 111,
          n_users_active: 36,
          n_users_stay: 187,
          source: ''
        },
        {
          active_rate: 0.3438,
          n_users: 64,
          n_users_active: 22,
          n_users_stay: 135,
          source: 'baidu.com'
        },
        {
          active_rate: 0.6176,
          n_users: 34,
          n_users_active: 21,
          n_users_stay: 82,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.4848,
          n_users: 33,
          n_users_active: 16,
          n_users_stay: 54,
          source: 'google.com'
        },
        {
          active_rate: 0.4783,
          n_users: 23,
          n_users_active: 11,
          n_users_stay: 87,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.1111,
          n_users: 9,
          n_users_active: 1,
          n_users_stay: 19,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.5,
          n_users: 8,
          n_users_active: 4,
          n_users_stay: 11,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.3333,
          n_users: 6,
          n_users_active: 2,
          n_users_stay: 6,
          source: 'sogou.com'
        },
        {
          active_rate: 0.4,
          n_users: 5,
          n_users_active: 2,
          n_users_stay: 47,
          source: 'workspace-share'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'bing.com'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 9,
          source: 'sspai.com'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 5,
          source: 'jianshu.com'
        },
        {
          active_rate: 1.5,
          n_users: 2,
          n_users_active: 3,
          n_users_stay: 6,
          source: 'data-share'
        },
        {
          active_rate: 1.5,
          n_users: 2,
          n_users_active: 3,
          n_users_stay: 3,
          source: 'google.com.hk'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 10,
          source: 'wx-data.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 9,
          source: '6url.cn'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'douban.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'hao.su'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 4,
          source: 'csdn.net'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'infoq.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'mubu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'dydata.io'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'youtube.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'developers.weixin.qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'kt1.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'weixinbridge.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 0,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'v2ex.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'bidianer.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dycharts.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'shimo.im'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xmt.cn'
        }
      ],
      sun: '2020-06-14',
      uv: 9007,
      week: 18
    },
    {
      active_rate: 0.3432,
      mon: '2020-06-01',
      n_users: 679,
      n_users_active: 233,
      n_users_stay: 1068,
      n_users_stay_weeks_later: [233, 133, 106, 90, 74, 68],
      register_rate: 0.0734,
      source_stats: [
        {
          active_rate: 0.2621,
          n_users: 309,
          n_users_active: 81,
          n_users_stay: 385,
          source: 'miniprogram'
        },
        {
          active_rate: 0.274,
          n_users: 146,
          n_users_active: 40,
          n_users_stay: 185,
          source: ''
        },
        {
          active_rate: 0.4407,
          n_users: 59,
          n_users_active: 26,
          n_users_stay: 122,
          source: 'baidu.com'
        },
        {
          active_rate: 0.5,
          n_users: 32,
          n_users_active: 16,
          n_users_stay: 48,
          source: 'google.com'
        },
        {
          active_rate: 0.56,
          n_users: 25,
          n_users_active: 14,
          n_users_stay: 73,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.8636,
          n_users: 22,
          n_users_active: 19,
          n_users_stay: 55,
          source: 'workspace-share'
        },
        {
          active_rate: 0.8333,
          n_users: 18,
          n_users_active: 15,
          n_users_stay: 71,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.0714,
          n_users: 14,
          n_users_active: 1,
          n_users_stay: 15,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.2,
          n_users: 10,
          n_users_active: 2,
          n_users_stay: 10,
          source: 'sogou.com'
        },
        {
          active_rate: 0.4,
          n_users: 5,
          n_users_active: 2,
          n_users_stay: 7,
          source: 'google.com.hk'
        },
        {
          active_rate: 0.2,
          n_users: 5,
          n_users_active: 1,
          n_users_stay: 12,
          source: '6url.cn'
        },
        {
          active_rate: 0.75,
          n_users: 4,
          n_users_active: 3,
          n_users_stay: 10,
          source: 'bing.com'
        },
        {
          active_rate: 0.5,
          n_users: 4,
          n_users_active: 2,
          n_users_stay: 10,
          source: 'sspai.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'douban.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'xmt.cn'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 8,
          source: 'wx-data.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'csdn.net'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'shimo.im'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'xuezha.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 6,
          source: 'data-share'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dycharts.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'smzdm.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'sbkko.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'ilxdh.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'songshu.pro'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'pickfree.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'dugutx.cn'
        },
        {
          n_users: 0,
          n_users_active: 2,
          n_users_stay: 5,
          source: 'infoq.cn'
        },
        {
          n_users: 0,
          n_users_active: 2,
          n_users_stay: 3,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 2,
          source: '46wx.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ihealthcoming.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        }
      ],
      sun: '2020-06-07',
      uv: 9256,
      week: 17
    },
    {
      active_rate: 0.2874,
      mon: '2020-05-25',
      n_users: 696,
      n_users_active: 200,
      n_users_stay: 1013,
      n_users_stay_weeks_later: [200, 112, 73, 79, 61, 46, 55],
      register_rate: 0.0756,
      source_stats: [
        {
          active_rate: 0.2964,
          n_users: 280,
          n_users_active: 83,
          n_users_stay: 365,
          source: 'miniprogram'
        },
        {
          active_rate: 0.2635,
          n_users: 167,
          n_users_active: 44,
          n_users_stay: 173,
          source: ''
        },
        {
          active_rate: 0.3103,
          n_users: 58,
          n_users_active: 18,
          n_users_stay: 121,
          source: 'baidu.com'
        },
        {
          active_rate: 0.3902,
          n_users: 41,
          n_users_active: 16,
          n_users_stay: 51,
          source: 'google.com'
        },
        {
          active_rate: 0.1707,
          n_users: 41,
          n_users_active: 7,
          n_users_stay: 69,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.3548,
          n_users: 31,
          n_users_active: 11,
          n_users_stay: 71,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.2,
          n_users: 15,
          n_users_active: 3,
          n_users_stay: 17,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.1538,
          n_users: 13,
          n_users_active: 2,
          n_users_stay: 38,
          source: 'workspace-share'
        },
        {
          active_rate: 0.125,
          n_users: 8,
          n_users_active: 1,
          n_users_stay: 7,
          source: 'sogou.com'
        },
        {
          active_rate: 0.4286,
          n_users: 7,
          n_users_active: 3,
          n_users_stay: 7,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.2,
          n_users: 5,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'infoq.cn'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 10,
          source: 'sspai.com'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 7,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 4,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'google.com.hk'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 3,
          source: 'v2ex.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'douban.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'youtube.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 14,
          source: '6url.cn'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 10,
          source: 'wx-data.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'xmt.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'juejin.im'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'ys168.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'huaban.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'data-share'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'jianshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        }
      ],
      sun: '2020-05-31',
      uv: 9207,
      week: 16
    },
    {
      active_rate: 0.2943,
      mon: '2020-05-18',
      n_users: 649,
      n_users_active: 191,
      n_users_stay: 951,
      n_users_stay_weeks_later: [191, 106, 85, 74, 69, 50, 43, 41],
      register_rate: 0.063,
      source_stats: [
        {
          active_rate: 0.2075,
          n_users: 318,
          n_users_active: 66,
          n_users_stay: 348,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3364,
          n_users: 107,
          n_users_active: 36,
          n_users_stay: 155,
          source: ''
        },
        {
          active_rate: 0.4151,
          n_users: 53,
          n_users_active: 22,
          n_users_stay: 121,
          source: 'baidu.com'
        },
        {
          active_rate: 0.375,
          n_users: 32,
          n_users_active: 12,
          n_users_stay: 70,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.3793,
          n_users: 29,
          n_users_active: 11,
          n_users_stay: 41,
          source: 'google.com'
        },
        {
          active_rate: 0.48,
          n_users: 25,
          n_users_active: 12,
          n_users_stay: 61,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.1875,
          n_users: 16,
          n_users_active: 3,
          n_users_stay: 4,
          source: 'infoq.cn'
        },
        {
          active_rate: 0.5,
          n_users: 10,
          n_users_active: 5,
          n_users_stay: 38,
          source: 'workspace-share'
        },
        {
          active_rate: 0.2222,
          n_users: 9,
          n_users_active: 2,
          n_users_stay: 6,
          source: 'sogou.com'
        },
        {
          active_rate: 0.2857,
          n_users: 7,
          n_users_active: 2,
          n_users_stay: 4,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0,
          n_users: 7,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'feishu.cn'
        },
        {
          active_rate: 0.3333,
          n_users: 6,
          n_users_active: 2,
          n_users_stay: 8,
          source: 'sspai.com'
        },
        {
          active_rate: 0.75,
          n_users: 4,
          n_users_active: 3,
          n_users_stay: 8,
          source: 'google.com.hk'
        },
        {
          active_rate: 1,
          n_users: 3,
          n_users_active: 3,
          n_users_stay: 6,
          source: 'csdn.net'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 9,
          source: '6url.cn'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'data-share'
        },
        {
          active_rate: 1.5,
          n_users: 2,
          n_users_active: 3,
          n_users_stay: 17,
          source: 'docsmall.com'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 12,
          source: 'wx-data.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 7,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'jianshu.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'douban.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 2,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'hao.su'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'xinquji.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'smzdm.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'yymiao.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'maxthon.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'ones.ai'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'waysto.work'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'qq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ihealthcoming.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'v2ex.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xmt.cn'
        }
      ],
      sun: '2020-05-24',
      uv: 10300,
      week: 15
    },
    {
      active_rate: 0.2486,
      mon: '2020-05-11',
      n_users: 692,
      n_users_active: 172,
      n_users_stay: 894,
      n_users_stay_weeks_later: [172, 88, 68, 57, 64, 49, 40, 42, 39],
      register_rate: 0.0786,
      source_stats: [
        {
          active_rate: 0.2016,
          n_users: 377,
          n_users_active: 76,
          n_users_stay: 341,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3378,
          n_users: 74,
          n_users_active: 25,
          n_users_stay: 132,
          source: ''
        },
        {
          active_rate: 0.4146,
          n_users: 41,
          n_users_active: 17,
          n_users_stay: 72,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.2821,
          n_users: 39,
          n_users_active: 11,
          n_users_stay: 35,
          source: 'google.com'
        },
        {
          active_rate: 0.3421,
          n_users: 38,
          n_users_active: 13,
          n_users_stay: 105,
          source: 'baidu.com'
        },
        {
          active_rate: 0,
          n_users: 27,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'infoq.cn'
        },
        {
          active_rate: 0.3043,
          n_users: 23,
          n_users_active: 7,
          n_users_stay: 67,
          source: 'sourl.cn'
        },
        {
          active_rate: 0,
          n_users: 11,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'hao.su'
        },
        {
          active_rate: 0.5556,
          n_users: 9,
          n_users_active: 5,
          n_users_stay: 8,
          source: 'sogou.com'
        },
        {
          active_rate: 0.3333,
          n_users: 9,
          n_users_active: 3,
          n_users_stay: 6,
          source: 'bing.com'
        },
        {
          active_rate: 0.1111,
          n_users: 9,
          n_users_active: 1,
          n_users_stay: 18,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.5,
          n_users: 4,
          n_users_active: 2,
          n_users_stay: 8,
          source: 'sspai.com'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'google.com.hk'
        },
        {
          active_rate: 0,
          n_users: 4,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 1,
          n_users: 3,
          n_users_active: 3,
          n_users_stay: 31,
          source: 'workspace-share'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'douban.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 12,
          source: '6url.cn'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'jianshu.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'shimo.im'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'likeyunba.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huaban.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'adoi.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'rework.tools'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'wuzuowei.net'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'yyl125.top'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'kt1.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'so.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'qq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 8,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'smzdm.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        }
      ],
      sun: '2020-05-17',
      uv: 8800,
      week: 14
    },
    {
      active_rate: 0.2625,
      mon: '2020-05-04',
      n_users: 499,
      n_users_active: 131,
      n_users_stay: 794,
      n_users_stay_weeks_later: [131, 67, 51, 53, 45, 42, 40, 32, 35, 35],
      register_rate: 0.0689,
      source_stats: [
        {
          active_rate: 0.1569,
          n_users: 274,
          n_users_active: 43,
          n_users_stay: 281,
          source: 'miniprogram'
        },
        {
          active_rate: 0.434,
          n_users: 53,
          n_users_active: 23,
          n_users_stay: 123,
          source: ''
        },
        {
          active_rate: 0.4242,
          n_users: 33,
          n_users_active: 14,
          n_users_stay: 107,
          source: 'baidu.com'
        },
        {
          active_rate: 0.4194,
          n_users: 31,
          n_users_active: 13,
          n_users_stay: 33,
          source: 'google.com'
        },
        {
          active_rate: 0.3548,
          n_users: 31,
          n_users_active: 11,
          n_users_stay: 57,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.3333,
          n_users: 15,
          n_users_active: 5,
          n_users_stay: 54,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.2222,
          n_users: 9,
          n_users_active: 2,
          n_users_stay: 19,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.2857,
          n_users: 7,
          n_users_active: 2,
          n_users_stay: 11,
          source: '6url.cn'
        },
        {
          active_rate: 0.5,
          n_users: 6,
          n_users_active: 3,
          n_users_stay: 4,
          source: 'google.com.hk'
        },
        {
          active_rate: 0.1667,
          n_users: 6,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'sogou.com'
        },
        {
          active_rate: 0.1667,
          n_users: 6,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'qq.com'
        },
        {
          active_rate: 1.2,
          n_users: 5,
          n_users_active: 6,
          n_users_stay: 38,
          source: 'workspace-share'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 8,
          source: 'bing.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 7,
          source: 'douban.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 7,
          source: 'sspai.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'csdn.net'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 8,
          source: 'wx-data.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'sbkko.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'ailongmiao.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'fulibus.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ys168.com'
        }
      ],
      sun: '2020-05-10',
      uv: 7245,
      week: 13
    },
    {
      active_rate: 0.2776,
      mon: '2020-04-27',
      n_users: 490,
      n_users_active: 136,
      n_users_stay: 761,
      n_users_stay_weeks_later: [136, 56, 52, 45, 36, 35, 36, 31, 29, 26, 30],
      register_rate: 0.0301,
      source_stats: [
        {
          active_rate: 0.1831,
          n_users: 284,
          n_users_active: 52,
          n_users_stay: 265,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3671,
          n_users: 79,
          n_users_active: 29,
          n_users_stay: 133,
          source: ''
        },
        {
          active_rate: 0.5172,
          n_users: 29,
          n_users_active: 15,
          n_users_stay: 110,
          source: 'baidu.com'
        },
        {
          active_rate: 0.5,
          n_users: 24,
          n_users_active: 12,
          n_users_stay: 54,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.1429,
          n_users: 14,
          n_users_active: 2,
          n_users_stay: 23,
          source: 'google.com'
        },
        {
          active_rate: 0.3333,
          n_users: 12,
          n_users_active: 4,
          n_users_stay: 55,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.4286,
          n_users: 7,
          n_users_active: 3,
          n_users_stay: 5,
          source: 'sogou.com'
        },
        {
          active_rate: 0.6667,
          n_users: 6,
          n_users_active: 4,
          n_users_stay: 33,
          source: 'workspace-share'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 17,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 7,
          source: 'wx-data.com'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 3,
          source: 'google.com.hk'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 8,
          source: 'bing.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'xuezha.cn'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'smzdm.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 8,
          source: '6url.cn'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'sspai.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'douban.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'github.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'duanshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'sourl.cn/km2ijd'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'getgetai.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'start.me'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'ailongmiao.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'data-share'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'xmt.cn'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'jianshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'liaotiangou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'creatorsdaily.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'qq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        }
      ],
      sun: '2020-05-03',
      uv: 16292,
      week: 12
    },
    {
      active_rate: 0.2478,
      mon: '2020-04-20',
      n_users: 565,
      n_users_active: 140,
      n_users_stay: 790,
      n_users_stay_weeks_later: [140, 82, 68, 69, 69, 57, 53, 51, 52, 47, 39, 40],
      register_rate: 0.0295,
      source_stats: [
        {
          active_rate: 0.1783,
          n_users: 314,
          n_users_active: 56,
          n_users_stay: 281,
          source: 'miniprogram'
        },
        {
          active_rate: 0.2381,
          n_users: 63,
          n_users_active: 15,
          n_users_stay: 125,
          source: ''
        },
        {
          active_rate: 0.3571,
          n_users: 42,
          n_users_active: 15,
          n_users_stay: 61,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.35,
          n_users: 40,
          n_users_active: 14,
          n_users_stay: 115,
          source: 'baidu.com'
        },
        {
          active_rate: 0.4762,
          n_users: 21,
          n_users_active: 10,
          n_users_stay: 34,
          source: 'google.com'
        },
        {
          active_rate: 0.45,
          n_users: 20,
          n_users_active: 9,
          n_users_stay: 50,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.0769,
          n_users: 13,
          n_users_active: 1,
          n_users_stay: 14,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.3333,
          n_users: 12,
          n_users_active: 4,
          n_users_stay: 37,
          source: 'workspace-share'
        },
        {
          active_rate: 0.1667,
          n_users: 6,
          n_users_active: 1,
          n_users_stay: 9,
          source: '6url.cn'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 7,
          source: 'sspai.com'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'sogou.com'
        },
        {
          active_rate: 1,
          n_users: 3,
          n_users_active: 3,
          n_users_stay: 5,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'csdn.net'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'webjike.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'google.com.hk'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'wx-data.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'waysto.work'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 7,
          source: 'bing.com'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 4,
          source: 'jianshu.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xmt.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'appinn.net'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'likeyunba.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'linnk.net'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'xinquji.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'data-share'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'duanshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'google.com.tw'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'qq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'smzdm.com'
        }
      ],
      sun: '2020-04-26',
      uv: 19137,
      week: 11
    },
    {
      active_rate: 0.266,
      mon: '2020-04-13',
      n_users: 530,
      n_users_active: 141,
      n_users_stay: 732,
      n_users_stay_weeks_later: [141, 82, 65, 58, 60, 52, 46, 39, 43, 45, 33, 39, 30],
      register_rate: 0.0885,
      source_stats: [
        {
          active_rate: 0.1765,
          n_users: 306,
          n_users_active: 54,
          n_users_stay: 259,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3,
          n_users: 60,
          n_users_active: 18,
          n_users_stay: 118,
          source: ''
        },
        {
          active_rate: 0.6944,
          n_users: 36,
          n_users_active: 25,
          n_users_stay: 113,
          source: 'baidu.com'
        },
        {
          active_rate: 0.3333,
          n_users: 24,
          n_users_active: 8,
          n_users_stay: 39,
          source: 'workspace-share'
        },
        {
          active_rate: 0.3636,
          n_users: 22,
          n_users_active: 8,
          n_users_stay: 44,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.6667,
          n_users: 18,
          n_users_active: 12,
          n_users_stay: 52,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.5385,
          n_users: 13,
          n_users_active: 7,
          n_users_stay: 26,
          source: 'google.com'
        },
        {
          active_rate: 0.25,
          n_users: 8,
          n_users_active: 2,
          n_users_stay: 14,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.4286,
          n_users: 7,
          n_users_active: 3,
          n_users_stay: 8,
          source: '6url.cn'
        },
        {
          active_rate: 0,
          n_users: 6,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'google.com.hk'
        },
        {
          active_rate: 0,
          n_users: 4,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 5,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'xinquji.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 6,
          source: 'sspai.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'duanshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'iyunying.org'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'sm.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'gitmind.cn'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 3,
          source: '46wx.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 9,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'google.com.tw'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'smzdm.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'v2ex.com'
        }
      ],
      sun: '2020-04-19',
      uv: 5990,
      week: 10
    },
    {
      active_rate: 0.2759,
      mon: '2020-04-06',
      n_users: 435,
      n_users_active: 120,
      n_users_stay: 644,
      n_users_stay_weeks_later: [120, 73, 56, 42, 45, 44, 39, 30, 25, 31, 30, 27, 23, 17],
      register_rate: 0.0882,
      source_stats: [
        {
          active_rate: 0.2194,
          n_users: 278,
          n_users_active: 61,
          n_users_stay: 265,
          source: 'miniprogram'
        },
        {
          active_rate: 0.303,
          n_users: 33,
          n_users_active: 10,
          n_users_stay: 86,
          source: 'baidu.com'
        },
        {
          active_rate: 0.3438,
          n_users: 32,
          n_users_active: 11,
          n_users_stay: 96,
          source: ''
        },
        {
          active_rate: 0.4545,
          n_users: 22,
          n_users_active: 10,
          n_users_stay: 42,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.6154,
          n_users: 13,
          n_users_active: 8,
          n_users_stay: 43,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.6,
          n_users: 10,
          n_users_active: 6,
          n_users_stay: 28,
          source: 'workspace-share'
        },
        {
          active_rate: 0.4444,
          n_users: 9,
          n_users_active: 4,
          n_users_stay: 23,
          source: 'google.com'
        },
        {
          active_rate: 0,
          n_users: 6,
          n_users_active: 0,
          n_users_stay: 9,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.25,
          n_users: 4,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 3,
          source: 'douban.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'waysto.work'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 5,
          source: '6url.cn'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 2,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'hao.su'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'sspai.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'google.com.tw'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 6,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 6,
          source: 'wx-data.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'qipeng.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'duanshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'rework.tools'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 0,
          source: 'jianshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'smzdm.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        }
      ],
      sun: '2020-04-12',
      uv: 4931,
      week: 9
    },
    {
      active_rate: 0.2645,
      mon: '2020-03-30',
      n_users: 533,
      n_users_active: 141,
      n_users_stay: 690,
      n_users_stay_weeks_later: [141, 78, 59, 46, 36, 31, 26, 30, 30, 24, 26, 33, 25, 25, 22],
      register_rate: 0.0925,
      source_stats: [
        {
          active_rate: 0.2258,
          n_users: 372,
          n_users_active: 84,
          n_users_stay: 291,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3571,
          n_users: 42,
          n_users_active: 15,
          n_users_stay: 111,
          source: ''
        },
        {
          active_rate: 0.45,
          n_users: 40,
          n_users_active: 18,
          n_users_stay: 81,
          source: 'baidu.com'
        },
        {
          active_rate: 0.4348,
          n_users: 23,
          n_users_active: 10,
          n_users_stay: 42,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.4545,
          n_users: 11,
          n_users_active: 5,
          n_users_stay: 51,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.0909,
          n_users: 11,
          n_users_active: 1,
          n_users_stay: 22,
          source: 'workspace-share'
        },
        {
          active_rate: 0.2857,
          n_users: 7,
          n_users_active: 2,
          n_users_stay: 14,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.1429,
          n_users: 7,
          n_users_active: 1,
          n_users_stay: 22,
          source: 'google.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 5,
          source: 'bing.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'wx-data.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'duckduckgo.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 9,
          source: '6url.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'sspai.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'xinquji.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '5118.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'waysto.work'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'sm.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'xiaogegh.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'zsxq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'bidianer.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'creatorsdaily.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'google.com.hk'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'jianshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'smzdm.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sogou.com'
        }
      ],
      sun: '2020-04-05',
      uv: 5764,
      week: 8
    },
    {
      active_rate: 0.2613,
      mon: '2020-03-23',
      n_users: 486,
      n_users_active: 127,
      n_users_stay: 647,
      n_users_stay_weeks_later: [127, 80, 53, 56, 52, 44, 39, 36, 44, 39, 40, 34, 31, 36, 34, 31],
      register_rate: 0.083,
      source_stats: [
        {
          active_rate: 0.2021,
          n_users: 287,
          n_users_active: 58,
          n_users_stay: 250,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3239,
          n_users: 71,
          n_users_active: 23,
          n_users_stay: 102,
          source: ''
        },
        {
          active_rate: 0.375,
          n_users: 40,
          n_users_active: 15,
          n_users_stay: 82,
          source: 'baidu.com'
        },
        {
          active_rate: 0.3,
          n_users: 30,
          n_users_active: 9,
          n_users_stay: 46,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.3636,
          n_users: 11,
          n_users_active: 4,
          n_users_stay: 43,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.5714,
          n_users: 7,
          n_users_active: 4,
          n_users_stay: 22,
          source: 'google.com'
        },
        {
          active_rate: 0.4286,
          n_users: 7,
          n_users_active: 3,
          n_users_stay: 23,
          source: 'workspace-share'
        },
        {
          active_rate: 0.1667,
          n_users: 6,
          n_users_active: 1,
          n_users_stay: 11,
          source: 'sspai.com'
        },
        {
          active_rate: 0.75,
          n_users: 4,
          n_users_active: 3,
          n_users_stay: 5,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 11,
          source: 'docsmall.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 9,
          source: '6url.cn'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 4,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'go176.net'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 2,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'data-share'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'waysto.work'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'hzwdd.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'dogedoge.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'kaolamedia.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'getgetai.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 've2x.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'hao.su'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'smzdm.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 3,
          source: '46wx.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'bidianer.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'qq.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ys168.com'
        }
      ],
      sun: '2020-03-29',
      uv: 5854,
      week: 7
    },
    {
      active_rate: 0.2773,
      mon: '2020-03-16',
      n_users: 476,
      n_users_active: 132,
      n_users_stay: 574,
      n_users_stay_weeks_later: [132, 87, 63, 52, 47, 53, 50, 37, 38, 36, 35, 30, 26, 30, 25, 30, 28],
      register_rate: 0.108,
      source_stats: [
        {
          active_rate: 0.2247,
          n_users: 316,
          n_users_active: 71,
          n_users_stay: 244,
          source: 'miniprogram'
        },
        {
          active_rate: 0.1842,
          n_users: 38,
          n_users_active: 7,
          n_users_stay: 34,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.4,
          n_users: 30,
          n_users_active: 12,
          n_users_stay: 90,
          source: ''
        },
        {
          active_rate: 0.56,
          n_users: 25,
          n_users_active: 14,
          n_users_stay: 60,
          source: 'baidu.com'
        },
        {
          active_rate: 0.5833,
          n_users: 12,
          n_users_active: 7,
          n_users_stay: 19,
          source: 'workspace-share'
        },
        {
          active_rate: 0.5,
          n_users: 12,
          n_users_active: 6,
          n_users_stay: 38,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.2222,
          n_users: 9,
          n_users_active: 2,
          n_users_stay: 15,
          source: 'google.com'
        },
        {
          active_rate: 0.2222,
          n_users: 9,
          n_users_active: 2,
          n_users_stay: 10,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.5,
          n_users: 4,
          n_users_active: 2,
          n_users_stay: 4,
          source: '46wx.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'jianshu.com'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 9,
          source: 'sspai.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'hao.su'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'bing.com'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 3,
          source: 'sogou.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'data-share'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'douban.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 7,
          source: '6url.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'smzdm.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'qq.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'laodaoshaonian.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'webjike.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'bidianer.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'creatorsdaily.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ihealthcoming.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'waysto.work'
        }
      ],
      sun: '2020-03-22',
      uv: 4406,
      week: 6
    },
    {
      active_rate: 0.2753,
      mon: '2020-03-09',
      n_users: 385,
      n_users_active: 106,
      n_users_stay: 504,
      n_users_stay_weeks_later: [106, 66, 50, 44, 36, 38, 38, 33, 31, 32, 29, 26, 23, 19, 24, 25, 22, 21],
      register_rate: 0.094,
      source_stats: [
        {
          active_rate: 0.2414,
          n_users: 232,
          n_users_active: 56,
          n_users_stay: 192,
          source: 'miniprogram'
        },
        {
          active_rate: 0.5,
          n_users: 30,
          n_users_active: 15,
          n_users_stay: 69,
          source: 'baidu.com'
        },
        {
          active_rate: 0.3667,
          n_users: 30,
          n_users_active: 11,
          n_users_stay: 90,
          source: ''
        },
        {
          active_rate: 0.2143,
          n_users: 28,
          n_users_active: 6,
          n_users_stay: 24,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.2308,
          n_users: 13,
          n_users_active: 3,
          n_users_stay: 35,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.4,
          n_users: 10,
          n_users_active: 4,
          n_users_stay: 15,
          source: 'google.com'
        },
        {
          active_rate: 0.1,
          n_users: 10,
          n_users_active: 1,
          n_users_stay: 10,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.6,
          n_users: 5,
          n_users_active: 3,
          n_users_stay: 12,
          source: 'workspace-share'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 13,
          source: '6url.cn'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'ihealthcoming.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'smzdm.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'wuzuowei.net'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'hao.su'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 7,
          source: 'sspai.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'huhuhang.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'waysto.work'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'xiaoduyu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'getgetai.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'likeyunba.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'fulibus.net'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '51.la'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'bidianer.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 8,
          source: 'wx-data.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'bing.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'creatorsdaily.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'jianshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'so.com'
        }
      ],
      sun: '2020-03-15',
      uv: 4095,
      week: 5
    },
    {
      active_rate: 0.1779,
      mon: '2020-03-02',
      n_users: 607,
      n_users_active: 108,
      n_users_stay: 478,
      n_users_stay_weeks_later: [108, 63, 54, 47, 41, 41, 29, 31, 22, 21, 25, 22, 23, 23, 16, 18, 11, 12, 15],
      register_rate: 0.1573,
      source_stats: [
        {
          active_rate: 0.1156,
          n_users: 441,
          n_users_active: 51,
          n_users_stay: 174,
          source: 'miniprogram'
        },
        {
          active_rate: 0.225,
          n_users: 40,
          n_users_active: 9,
          n_users_stay: 79,
          source: ''
        },
        {
          active_rate: 0.3548,
          n_users: 31,
          n_users_active: 11,
          n_users_stay: 64,
          source: 'baidu.com'
        },
        {
          active_rate: 0.36,
          n_users: 25,
          n_users_active: 9,
          n_users_stay: 27,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.4615,
          n_users: 13,
          n_users_active: 6,
          n_users_stay: 16,
          source: 'workspace-share'
        },
        {
          active_rate: 0.875,
          n_users: 8,
          n_users_active: 7,
          n_users_stay: 37,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.5714,
          n_users: 7,
          n_users_active: 4,
          n_users_stay: 13,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.1429,
          n_users: 7,
          n_users_active: 1,
          n_users_stay: 12,
          source: 'google.com'
        },
        {
          active_rate: 0.2,
          n_users: 5,
          n_users_active: 1,
          n_users_stay: 12,
          source: '6url.cn'
        },
        {
          active_rate: 0.2,
          n_users: 5,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'sspai.com'
        },
        {
          active_rate: 0.2,
          n_users: 5,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 5,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'data-share'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 10,
          source: 'wx-data.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'bing.com'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 2,
          source: 'meibp.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'pickfree.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'rdonly.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 've2x.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'wuzuowei.net'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'learnku.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'webjike.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '5118.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'iurobot.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'huhuhang.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'sogou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'bidianer.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'creatorsdaily.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'so.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'v2ex.com'
        }
      ],
      sun: '2020-03-08',
      uv: 3859,
      week: 4
    },
    {
      active_rate: 0.2589,
      mon: '2020-02-24',
      n_users: 448,
      n_users_active: 116,
      n_users_stay: 441,
      n_users_stay_weeks_later: [116, 84, 65, 63, 63, 53, 45, 45, 47, 42, 40, 38, 37, 40, 35, 36, 36, 29, 32, 29],
      register_rate: 0.0881,
      source_stats: [
        {
          active_rate: 0.2034,
          n_users: 236,
          n_users_active: 48,
          n_users_stay: 148,
          source: 'miniprogram'
        },
        {
          active_rate: 0.2069,
          n_users: 58,
          n_users_active: 12,
          n_users_stay: 96,
          source: ''
        },
        {
          active_rate: 0.4348,
          n_users: 23,
          n_users_active: 10,
          n_users_stay: 56,
          source: 'baidu.com'
        },
        {
          active_rate: 0.4091,
          n_users: 22,
          n_users_active: 9,
          n_users_stay: 18,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.3889,
          n_users: 18,
          n_users_active: 7,
          n_users_stay: 38,
          source: 'sourl.cn'
        },
        {
          active_rate: 0,
          n_users: 15,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'v2ex.com'
        },
        {
          active_rate: 0,
          n_users: 11,
          n_users_active: 0,
          n_users_stay: 8,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.6,
          n_users: 10,
          n_users_active: 6,
          n_users_stay: 12,
          source: 'google.com'
        },
        {
          active_rate: 0.75,
          n_users: 8,
          n_users_active: 6,
          n_users_stay: 11,
          source: 'wx-data.com'
        },
        {
          active_rate: 0.8333,
          n_users: 6,
          n_users_active: 5,
          n_users_stay: 9,
          source: 'workspace-share'
        },
        {
          active_rate: 0.6,
          n_users: 5,
          n_users_active: 3,
          n_users_stay: 9,
          source: '6url.cn'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'data-share'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 5,
          source: 'sspai.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'sogou.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'huhuhang.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'creatorsdaily.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 3,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'smzdm.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 've2x.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'sbkko.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'liaotiangou.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'hao.su'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'meibp.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'bidianer.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'douban.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'inoreader.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'google.com.hk'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'waysto.work'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'so.com'
        }
      ],
      sun: '2020-03-01',
      uv: 5087,
      week: 3
    },
    {
      active_rate: 0.2799,
      mon: '2020-02-17',
      n_users: 368,
      n_users_active: 103,
      n_users_stay: 378,
      n_users_stay_weeks_later: [103, 62, 42, 39, 36, 39, 34, 35, 31, 28, 30, 24, 29, 31, 32, 26, 29, 22, 19, 19, 23],
      register_rate: 0.1006,
      source_stats: [
        {
          active_rate: 0.2194,
          n_users: 237,
          n_users_active: 52,
          n_users_stay: 124,
          source: 'miniprogram'
        },
        {
          active_rate: 0.56,
          n_users: 25,
          n_users_active: 14,
          n_users_stay: 94,
          source: ''
        },
        {
          active_rate: 0.35,
          n_users: 20,
          n_users_active: 7,
          n_users_stay: 22,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.5,
          n_users: 12,
          n_users_active: 6,
          n_users_stay: 31,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.4545,
          n_users: 11,
          n_users_active: 5,
          n_users_stay: 52,
          source: 'baidu.com'
        },
        {
          active_rate: 0,
          n_users: 9,
          n_users_active: 0,
          n_users_stay: 7,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.5714,
          n_users: 7,
          n_users_active: 4,
          n_users_stay: 11,
          source: 'google.com'
        },
        {
          active_rate: 0.3333,
          n_users: 6,
          n_users_active: 2,
          n_users_stay: 5,
          source: 'sspai.com'
        },
        {
          active_rate: 0.1667,
          n_users: 6,
          n_users_active: 1,
          n_users_stay: 6,
          source: '6url.cn'
        },
        {
          active_rate: 0,
          n_users: 4,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'workspace-share'
        },
        {
          active_rate: 1,
          n_users: 3,
          n_users_active: 3,
          n_users_stay: 4,
          source: 'wx-data.com'
        },
        {
          active_rate: 0.6667,
          n_users: 3,
          n_users_active: 2,
          n_users_stay: 5,
          source: 'data-share'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'sogou.com'
        },
        {
          active_rate: 1,
          n_users: 2,
          n_users_active: 2,
          n_users_stay: 2,
          source: 'smzdm.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 3,
          source: 'csdn.net'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'jianshu.com'
        },
        {
          active_rate: 0,
          n_users: 2,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'google.com.hk'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'waysto.work'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'bing.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'rdonly.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'ops-coffee.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'wuzuowei.net'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'dugutx.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'webjike.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'go176.net'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'logosc.cn'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'hao.su'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 've2x.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: '3650714.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'mubu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'so.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'youdao.com'
        }
      ],
      sun: '2020-02-23',
      uv: 3658,
      week: 2
    },
    {
      active_rate: 0.2766,
      mon: '2020-02-10',
      n_users: 282,
      n_users_active: 78,
      n_users_stay: 305,
      n_users_stay_weeks_later: [78, 44, 38, 28, 28, 24, 21, 20, 17, 19, 18, 14, 14, 16, 13, 12, 9, 10, 10, 8, 8, 10],
      register_rate: 0.0886,
      source_stats: [
        {
          active_rate: 0.1868,
          n_users: 182,
          n_users_active: 34,
          n_users_stay: 89,
          source: 'miniprogram'
        },
        {
          active_rate: 0.3333,
          n_users: 30,
          n_users_active: 10,
          n_users_stay: 98,
          source: ''
        },
        {
          active_rate: 0.2632,
          n_users: 19,
          n_users_active: 5,
          n_users_stay: 9,
          source: 'zhihu.com'
        },
        {
          active_rate: 0.6923,
          n_users: 13,
          n_users_active: 9,
          n_users_stay: 45,
          source: 'baidu.com'
        },
        {
          active_rate: 0.7,
          n_users: 10,
          n_users_active: 7,
          n_users_stay: 27,
          source: 'sourl.cn'
        },
        {
          active_rate: 0.3333,
          n_users: 6,
          n_users_active: 2,
          n_users_stay: 6,
          source: '6url.cn'
        },
        {
          active_rate: 0,
          n_users: 4,
          n_users_active: 0,
          n_users_stay: 6,
          source: 'docsmall.com'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 4,
          source: 'data-share'
        },
        {
          active_rate: 0.3333,
          n_users: 3,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'sspai.com'
        },
        {
          active_rate: 0,
          n_users: 3,
          n_users_active: 0,
          n_users_stay: 2,
          source: 'workspace-share'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 6,
          source: 'google.com'
        },
        {
          active_rate: 0.5,
          n_users: 2,
          n_users_active: 1,
          n_users_stay: 1,
          source: '46wx.com'
        },
        {
          active_rate: 2,
          n_users: 1,
          n_users_active: 2,
          n_users_stay: 1,
          source: 'bing.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'wx-data.com'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 2,
          source: 'csdn.net'
        },
        {
          active_rate: 1,
          n_users: 1,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'youdao.com'
        },
        {
          active_rate: 0,
          n_users: 1,
          n_users_active: 0,
          n_users_stay: 0,
          source: 'sogou.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'so.com'
        },
        {
          n_users: 0,
          n_users_active: 1,
          n_users_stay: 1,
          source: 'smzdm.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'douban.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'jianshu.com'
        },
        {
          n_users: 0,
          n_users_active: 0,
          n_users_stay: 1,
          source: 'mubu.com'
        }
      ],
      sun: '2020-02-16',
      uv: 3184,
      week: 1
    }
  ],
  total: 22
}

export default data
