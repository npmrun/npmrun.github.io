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



