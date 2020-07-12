---
typora-root-url: 有关process.env
title: 有关process.env
date: 2020-07-10 16:30:25
tags:
categories: 
comments: true
top: false
---

> 主题：
> 概述：

<!--正文-->
<!--more-->

#### process 顾名思义就是进程

> 该对象表示Node所处的当前进程，允许开发者与该进程互动。

打开命令行（请先装node），输入node，再输入process.env，可以看见process.env是一个对象。

on Windows：

```bash
set NODE_ENV=dev
```

on OS X or Linux：

```bash
export NODE_ENV=dev
```

直接写在js文件:

```bash
process.env.NODE_ENV = 'production';
```

然后在`package.json`：

```bash
"scripts": {
  "start": "set NODE_ENV=dev && node app.js"
 }
```