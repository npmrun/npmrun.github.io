---
typora-root-url: scrollWidth,clientWidth,offsetWidth的区别
title: scrollWidth,clientWidth,offsetWidth的区别
date: 2020-08-19 23:19:47
tags:
categories: 
comments: true
top: false
---

> 主题：scrollWidth,clientWidth,offsetWidth的区别
> 概述：scrollWidth,clientWidth,offsetWidth的区别

<!--正文-->
<!--more-->

* `scrollWidth`：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。
* `clientWidth`：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。
* `offsetWidth`：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。



示例展示：

该demo就在页面中放一个textarea元素，采用默认宽高显示。

情况1：

元素内无内容或者内容不超过可视区，滚动不出现或不可用的情况下。

scrollWidth=clientWidth，两者皆为内容可视区的宽度。

offsetWidth为元素的实际宽度。

![img](/images/dd81f5ea107d46c3a87894408db35355.png)

情况2：

元素的内容超过可视区，滚动条出现和可用的情况下。

scrollWidth>clientWidth。

scrollWidth为实际内容的宽度。

clientWidth是内容可视区的宽度。

offsetWidth是元素的实际宽度。

![img](/images/32163def3f0742049681f4a7b258e28f.png)

