---
typora-root-url: 有关构建一个简单的vuex模式，而不引入整个vuex
title: 有关构建一个简单的vuex模式，而不引入整个vuex
date: 2020-08-06 16:30:46
tags:
categories: 
comments: true
top: false
---

> 主题：Vue-observable
> 概述：让一个对象可响应。Vue 内部会用它来处理 `data` 函数返回的对象。返回的对象可以直接用于[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)和[计算属性](https://cn.vuejs.org/v2/guide/computed.html)内，并且会在发生变更时触发相应的			更新。也可以作为最小化的跨组件状态存储器

<!--正文-->
<!--more-->

简单使用方法：

```
Vue.prototype.$store= Vue.observable({ 
	state: {
		isLoc: false,
		addr: "未定位",
	},
	setLoction({loc,isLoc}){
		this.state.isLoc = isLoc;
		this.state.addr = loc
		if(isLoc){
			localStorage.setItem("cccity",loc)
		}
	},
})

	// 之后，直接使用就行：
	//计算方法
	computed:{
		addr(){
			return this.$store.state.addr
		},
		haveCity(){
			return this.$store.state.isLoc
		},
	},
	
	执行方法：
	this.$store.setLoction({loc:simple[1],isLoc:true});
```

