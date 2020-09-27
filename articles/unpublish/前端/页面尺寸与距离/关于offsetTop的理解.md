---
typora-root-url: 关于offsetTop的理解
title: 关于offsetTop的理解
date: 2020-09-27 10:36:17
tags:
categories: 
comments: true
top: false
---

> 概述：关于offsetTop的理解

<!--正文-->
<!--more-->

**1. offsetTop**：元素到offsetParent顶部的距离

**2. offsetParent**：距离元素最近的一个具有定位的祖宗元素（relative，absolute，fixed），若祖宗都不符合条件，offsetParent为body。如下图所示：获取child的offsetTop，图1的offsetParent为father，图2的offsetParent为body。

![img](/images/20190530103353390.jpg)

3. 注意：只有元素show（渲染完成）才会计算入offsetTop，若是中间有元素数据需要异步获取，会导致最终获取的offsetTop值偏小