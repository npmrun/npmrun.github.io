---
typora-root-url: storybook注意事项
title: storybook注意事项
date: 2020-09-25 17:51:21
tags:
categories: 
comments: true
top: false
---

> 概述：storybook注意事项

<!--正文-->
<!--more-->

* [this file ./sb_dll/storybook_ui_dll.js is too big](https://github.com/storybookjs/storybook/issues/10776)

  文件太大了，根据问题描述，在`.storybook\main`中的有个两个参数可以插入`webpack`的参数，里面可以加入拆分代码。

  ```
  modul.exports = {
    finalWebpack: (config) => config, // for preview changes 预览走的webpack配置
    managerWebpack: (config) => config, // for manager changes	管理面板走的webpack配置
  }
  ```

  