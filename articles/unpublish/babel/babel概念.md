---
typora-root-url: babel概念
title: babel概念
date: 2020-07-09 23:04:21
tags:
categories: 
comments: true
top: false
---

> 主题：
> 概述：

<!--正文-->
<!--more-->

`presets`：预设，即一组预先设定的插件，是babel插件的组合

presets与plugins同时存在的执行顺序:

1. plugins运行在presets之前；

2. plugins配置项，按照声明顺序执行，从第一个到最后一个；

3. presets配置项，按照声明逆序执行，从最后一个到第一个（主要是为了确保向后兼容）