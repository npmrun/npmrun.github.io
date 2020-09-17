---
typora-root-url: react知识点
title: react知识点
date: 2020-09-12 14:32:53
tags:
categories: 
comments: true
top: false
---

> 概述：

<!--正文-->
<!--more-->

### 通用知识

* 组件名首字母必须大写
* 添加类名不是`class`而是`className`
* 用`{}`包裹的表达式会被解析，`{{}}`不同于`vue`，react里是个对象
* [context](https://react.docschina.org/docs/context.html) 感觉相当于vue的`Provider/Inject`
* [Ref](https://react.docschina.org/docs/refs-and-the-dom.html) 用于引用，可以获取到dom元素或组件，跟vue的refs差不多
* [Ref转发](https://react.docschina.org/docs/forwarding-refs.html)
* 函数式组件是使用一个函数，函数中return一个定义好的组件
* class式组件是使用一个类，类中必须要有一个`render`函数，其中需要return一个定义好的组件
* 16版本之后可以使用`lazy, Suspense`做组件的懒加载，低版本的可以用网上的通用方式
* [useEffect](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

### React生命周期

* **componentWillMount** 

  在渲染前调用,在客户端也在服务端。

* **componentDidMount** 

  在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)

* **componentWillReceiveProps** 

  在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

* **shouldComponentUpdate** 

  返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
  可以在你确认不需要更新组件时使用。

* **componentWillUpdate**

  在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

* **componentDidUpdate** 

  在组件完成更新后立即调用。在初始化时不会被调用。

* **componentWillUnmount**

  在组件从 DOM 中移除之前立刻被调用。

![img](/images/5287253-315eac1c26082f08.png)