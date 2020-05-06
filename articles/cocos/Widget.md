---
typora-root-url: Widget
title: Widget
date: 2020-05-06 17:16:15
tags:
categories: cocos
comments: true
---



> https://docs.cocos.com/creator/api/zh/classes/Widget.html#updatealignment

##### updateAlignment

立刻执行 widget 对齐操作。这个接口一般不需要手工调用。 只有当你需要在当前帧结束前获得 widget 对齐后的最新结果时才需要手动调用这个方法。

##### 示例

```js
widget.top = 10;       // change top margin
cc.log(widget.node.y); // not yet changed
widget.updateAlignment();
cc.log(widget.node.y); // changed
```

> 可能会遇见的问题
>
> https://blog.csdn.net/u013654125/article/details/83379765