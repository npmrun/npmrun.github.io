---
typora-root-url: rollup导出的包的名词解释
title: rollup导出的包的名词解释
date: 2020-08-02 13:58:25
tags:
categories: 
comments: true
top: false
---

> 主题：
> 概述：

<!--正文-->
<!--more-->

## 什么是 Rollup

简单而言, [Rollup](https://link.zhihu.com/?target=https%3A//rollupjs.org/guide/en) 是一个模块打包工具, 可以将我们按照 ESM (ES2015 Module) 规范编写的源码构建输出如下格式:

- IIFE: 自执行函数, 可通过 `<script>` 标签加载
- AMD: 浏览器端的模块规范, 可通过 `RequireJS` 可加载
- CommonJS: Node 默认的模块规范, 可通过 `Webpack` 加载
- UMD: 兼容 IIFE, AMD, CJS 三种模块规范
- ESM: ES2015 Module 规范, 可用 `Webpack`, `Rollup` 加载

大多数的 Library 也是选择使用 Rollup 构建, 比如: React, Vue, Angular, D3, Moment, Redux…

借助于 Rollup 的插件体系, 我们也可以处理 css, images, font 等资源, 但是 Rollup 不支持代码拆分(Code Splitting)和运行时态加载(Dynamic Import) 特性, 所以较少的应用于 Application 开发.