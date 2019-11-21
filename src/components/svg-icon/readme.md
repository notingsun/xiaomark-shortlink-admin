# 组件.图标

## 注意： 如果要新加入svg图标，svg需要进行如下处理

> 1、将fill属性全部去除，有时stroke的值是色值也需要去除。（这样才能使组件的color生效，被svg沿用。）
> - fill="none"
> - fill="#45CB87"
> 2、将svg的title属性的值移入desc。（为了让svg-show-all.vue中能显示相应的中文解释，便于搜索。）
> 3、要将title属性删除。（为了让鼠标移入图标时，显示使用者自己设置的title。）

## 一、使用方法

```js
  <itv-icon type="i-notice" size="20"/>
```

---

## 二、文件的解释

### svg-show-all.vue

> 用于显示全部的图标（搜索【调试位置】可以根据文件夹显示图标，分为【通用图标common】和【导航栏及首页图标menu】（方便后期查找，分个类先）,
> 路由：http://localhost:8080/dev/svg-icon 
> 图表前缀的意义，i(通用的) index(首页) sub(侧边导航栏) menu(顶部导航栏)

### index.js

> 用于将svg一次性引入import，并使用处理器svg-sprite-loader

---

## 三、特殊的使用场景

### 1）当size 不是 20px的时候，垂直方向如何对齐

> 将其高度设置为20

```html
  <div>
    <span class="d-i h20">
      <itv-icon type="i-position" size="16" class="mr4"/>
    </span>
    <div class="ib20">
      图标后面的文字
    </div>
  </div>
```

### 2）如何在button组件中使用图标（样式）

> 已经将Button中的图标和文字的样式封装好了，可以直接在Button上加上样式属性【itv-button--icon】。（注意：Button 的大小为default时才会生效）

```html
  <Button class="itv-button--icon">
    <itv-icon type="i-deleteBin" size="16" color="" />
    <span class="ib16">清空条件</span>
  </Button>
```

### 3)input输入框后的按钮（样式）

> 将图标放在样式属性【itv-input__icon--wrap】中

```html
  <i-input
    v-model="search"
    placeholder="名称、url、组名"
    style="width:212px"
  >
    <span class="itv-input__icon--wrap" slot="suffix">
      <itv-icon type="i-search" size="16" color="sub" />
    </span>
  </i-input>
```
