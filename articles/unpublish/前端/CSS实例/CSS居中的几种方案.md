---
typora-root-url: CSS居中的几种方案
title: CSS居中的几种方案
date: 2020-09-10 09:35:13
tags:
categories: 
comments: true
top: false
---

> 概述：CSS居中的几种方案

<!--正文-->
<!--more-->

### 已知盒子大小

* 子元素：定位+margin

  定位+margin（position: absolute; left:50%; top:50%; margin-top:-盒子高度一半px;margin-left:-盒子宽度一半px）

* 子盒子：定位

  positon: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;

### 未知盒子大小

* 定位+transform

  positon: absolute;left:50%;top:50%;transform: translate(-50%,-50%);

* flex布局

  父盒子 display:flex; justify-content: center; aligin-items: center;

* table-ceil

  display: table-ceil; text-align: center; vertical-align: middle;

* 用js获取到盒子的宽高，按照方法1设置 定位+margin

* display：flex;margin:auto;