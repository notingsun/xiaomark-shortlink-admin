// 渠道码套餐
export const comboMap = {
  0: '免费版',
  1: '入门版',
  2: '专业版',
  4: '赠送7天',
  5: '新手任务',
  6: '新手任务',
  7: '新手任务',
  8: '新手任务'
}

// 推送套餐
export const mealMap = {
  0: '活动赠送',
  1: '单条',
  2: '包年'
}

export default {
  comboMap,
  mealMap
}

// 获取选项的map
function calcOptionsMap(Options) {
  let res = {}

  Options.forEach((options) => {
    res[options.value] = options.label
  })
  return res
}

// 套餐分类
const ORDER_GENRE_ARR = [
  { value: '*', label: '不限' },
  { value: '0', label: '打包' },
  { value: '1', label: '渠道码' },
  { value: '2', label: '推送' },
  { value: '3', label: '自动回复' },
  { value: '4', label: '菜单' }
]
// 渠道码套餐
const ORDER_COMBO_ARR = [
  { value: '*', label: '不限' },
  { value: '0', label: '免费版' },
  { value: '1', label: '入门版' },
  { value: '2', label: '专业版' }
]
// 推送套餐
const ORDER_MEAL_ARR = [
  { value: '*', label: '不限' },
  { value: '1', label: '单次' },
  { value: '2', label: '包年' }
]
// 自动回复套餐
const ORDER_REVERT_ARR = [
  { value: '*', label: '不限' },
  { value: '0', label: '免费版' },
  { value: '1', label: '包年版' }
]
// 菜单套餐
const ORDER_MENU_ARR = [
  { value: '*', label: '不限' },
  { value: '0', label: '免费版' },
  { value: '1', label: '包年版' }
]
// 支付状态
const ORDER_RESULT_ARR = [
  { value: '*', label: '不限' },
  { value: 'NOTPAY', label: '未支付' },
  { value: 'SUCCESS', label: '支付成功' },
  { value: 'PAYERROR', label: '支付失败' }
]

// 筛选框需要用到的选项map
export const ORDER_OPTIONS_MAP = {
  genre: ORDER_GENRE_ARR,
  combo: ORDER_COMBO_ARR,
  meal: ORDER_MEAL_ARR,
  revert: ORDER_REVERT_ARR,
  menu: ORDER_MENU_ARR,
  result: ORDER_RESULT_ARR
}

// 某个选项value对应的前端显示值
export const ORDER_OPTION_MAP = {
  genre: calcOptionsMap(ORDER_GENRE_ARR),
  combo: calcOptionsMap(ORDER_COMBO_ARR),
  meal: calcOptionsMap(ORDER_MEAL_ARR),
  revert: calcOptionsMap(ORDER_REVERT_ARR),
  menu: calcOptionsMap(ORDER_MENU_ARR),
  result: calcOptionsMap(ORDER_RESULT_ARR)
}
