---
typora-root-url: npm安装github包
title: npm安装github包
date: 2020-09-26 16:45:36
tags:
categories: 
comments: true
top: false
---

> 概述：

<!--正文-->
<!--more-->

## 直接在npm仓库进行安装

```
npm install kiana-js --save
```

## 直接利用用户名和仓库名进行安装

```
npm install easterCat/kiana-js
```

## 也可以在前面加上 github 前缀

```
npm install github:easterCat/kiana-js
```

## 直接通过 git 上项目的地址进行安装

```
npm install git+https://github.com/easterCat/kiana-js.git
```

## 或者以 ssh 的方式

```
npm install git+ssh://github.com/easterCat/kiana-js.git
```