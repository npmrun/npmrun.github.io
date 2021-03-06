---
typora-root-url: cocos适配心得
title: cocos适配心得
date: 2020-04-14 11:12:36
tags:
categories: 
comments: true
---



> 在cocos的适配方案中，默认提供的就是`fit height`和`fit width`.
>
> * `fit height`表示根据高度来适配，高度一定是与设备高度一直，宽度可以随意变化，这个时候，在宽度很宽的情况下可能会有两边截断的情况。
> * `fit width`同理
> * 当两个一起钩选的时候，会保证界面一定完整的显示界面，但是不可避免的，会产生黑边。
>
> 在做cocos的适配的时候，我们不能直接钩选两个，而是只控制一边，另一部分可结合`Widget`组件来实现

<!--more-->

## 简要

![image-20200428134427268](/images/image-20200428134427268.png)

场景的适配策略只需要钩选适配高度就行了。再结合`Widget`就能够实现不留黑边的全屏

![image-20200428134542763](/images/image-20200428134542763.png)

但这还是不够的，因为你的子元素也得加上这个`Widget`才行，保证不是绝对布局，而是相对于上下左右四个边界的距离，灵活调整`top,right,bottom,left`的值，就能实现全屏与布局的流动化。

## 缺点

你要实现某部分的流动布局，必须将其所有的父元素也先`widget`化.或者直接绑定根元素

屏幕太小的话元素会重叠。

