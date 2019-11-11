/* 公共的渲染函数 */
/* 样式写在custom.less中 */
import PDo from 'PDo'

/**
 * 表格.单元格.显示:是/否(通用)
 */
const tableCellTrueFalse = function(h, v) {
  return <span>{v ? '是' : '否'}</span>
}

/**
 * 表格.单元格.显示:时间（通用）
 */
const tableCellDate = function(h, v, format = '') {
  return <span>{PDo.Date.format(v, format) || '-'}</span>
}

/**
 * 表格.单元格.显示:操作（通用）
 * @param {Array} actions 操作按钮的（对象）数组
 *      @param {String} actions.name 操作按钮的名字(用于图标的提示)
 *      @param {String} actions.icon 操作按钮的图标
 *      @param {String} actions.poptip 操作按钮显示二次确认的话术[可选]
 *      @param {String} actions.disabled 操作按钮是否禁用[可选]
 *      @param {Function} actions.click 操作按钮的点击函数 this.handleClick.bind(this, row, index) 相当于 v-bind:click
 */
const tableCellAction = function(h, actions) {
  /* eslint-disable */
  const FUNCTION_NULL = () => {
    console.log('点击了空')
  }

  // 文字类型
  const renderTextButton = (item, index) => {
    return (
      <span
        style={index === 0 ? '' : 'margin-left: 5px;'}
        onClick={((item.poptip || item.disabled) ? '' : item.click) || FUNCTION_NULL}
        class={`itv-btn__text ${item.disabled ? 'itv-btn__text--disabled' : ''}`}
      >
        {item.name}
      </span>
    )
  }

  // 图标类型
  // itv-btn__icon--disabled
  const renderIconButton = (item, index) => {
    return (
      <span
        title={item.name}
        onClick={((item.poptip || item.disabled) ? '' : item.click) || FUNCTION_NULL}
        style={index === 0 ? '' : 'margin-left: 16px;'}
        class={`itv-btn__icon--wrap ${item.disabled ? 'itv-btn__icon--disabled' : ''}`}
      >
        <itv-icon
          class="itv-btn__icon"
          type={item.icon}
          size="20"
          color={item.disabled ? 'sub' : ''}/>
      </span>
    )
  }

  // 有二次确认.类型
  const renderPoptipButton = (item, index) => {
    return h(
      'Poptip',
      {
        props: {
          placement: 'bottom',
          confirm: true,
          offset: 8,
          transfer: true,
          'word-wrap': true,
          width: 250,
          'popper-class': 'itv-table-poptip',
          title: item.poptip || '二次确认的话术'
        },
        on: {
          'on-ok': item.click || FUNCTION_NULL
        }
      },
      [item.icon ? renderIconButton(item, index) : renderTextButton(item, index)]
    )
  }

  const actions_arr = actions.map((item, index) => {
    if (item.poptip && !item.disabled) {
      return renderPoptipButton(item, index)
    } else if (item.icon) {
      return renderIconButton(item, index)
    }
    return renderTextButton(item, index)
  })

  return (
    <div style="text-align: center;">
      {actions_arr}
    </div>
  )
  /* eslint-enable */
}

const RENDERS = {
  tableCellAction,
  tableCellDate,
  tableCellTrueFalse
}

export default RENDERS
