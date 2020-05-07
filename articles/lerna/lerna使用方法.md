---
typora-root-url: lerna使用方法
title: lerna使用方法
date: 2020-4-0 19:19:39
tags:
categories: lerna
comments: true
---

> `lerna`主要用于分模块管理`js`的依赖库，对于库项目开发者非常有友好，它可以将一个大的库项目分离成一个个独立的项目，但又不是完全独立的，而是全部由`lerna `进行管理。它的类似目录结构如下：
>
> ```javascript
> my-lerna-repo/
>   package.json
>   packages/
>     package-1/
>       package.json
>     package-2/
>       package.json
> ```

<!--more-->

## 环境安装

```
// 全局安装
npm i -g lerna
// 局部安装
npm i -D lerna
```

## 初始化

```
cd 你的项目根目录
//全局安装的话执行下面这个
lerna init
//局部安装的话执行下面这个
npx lerna init
```

