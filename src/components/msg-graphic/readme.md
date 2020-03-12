# 从素材库中选择图文消息

## 示例

```html
  <itv-msg-graphic
    :checked-id.sync="id"
    :checked-info.sync="info"
  />
```

## 属性 Attributes

参数            | 说明             | 类型         | 默认值 | 其他
------------   | --------------- | ------------ | ---   | ---
checked-id | 选中的图文消息的id  | String | -     | sync
checked-info | 图文消息的所有信息（用于预览）  | Object | -     | sync

## 事件 Events

事件名称            | 说明             | 回调参数
------------   | --------------- | ------------
on-change | 选择了图文消息 | 选中的图文消息的全部信息
