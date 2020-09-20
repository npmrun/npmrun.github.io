---
typora-root-url: 讲一讲iconfont的三种实现方式以及自定义制作
title: 讲一讲iconfont的三种实现方式以及自定义制作
date: 2020-08-20 23:02:39
tags:
categories: 
comments: true
top: false
---

> 主题：讲一讲iconfont的三种实现方式以及自定义制作
> 概述：iconfont的图标都挺好看的，但是最近我要自己搞一套UI库的话，不可避免的需要制作一些图标，因此就研究了一下具体的实现方式，统共的话有两种。

<!--正文-->
<!--more-->

1. `unicode`：制作自定义字体文件并引入，当在网页上编写特殊的unicode编码的时候可以呈现对应的文字。
2. `font-class`: 前一种的变种，不用再费力去看unicode编码，而是直接制作成一个css文件，采用将字符编码以伪类的方式定义在content中，能达到更上面类似的效果。
3. `symbol`：这属于Svg了，svg可以设置symbol,然后通过use:xlink引用symbol的id从而实现svg的类似雪碧图效果。这样的方式支持彩色图标。

