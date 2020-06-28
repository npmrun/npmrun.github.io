---
typora-root-url: 自定义设置hr的颜色
title: 自定义设置hr的颜色
date: 2020-05-25 23:32:31
tags: 前端
categories:
comments: true
---

1、hr的颜色不能使用color来控制，要使用background-color来控制

2、hr的高度不能为 0

3,、还会有灰色的阴影，设置border:none

默认的hr样式

自定的hr样式：

附上代码：

```
hr {
  height: 1px;
  background-color: #6EECB4;
  border: none;
}
```

