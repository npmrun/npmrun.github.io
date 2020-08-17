---
typora-root-url: 有关在vue中使用防抖节流的正确姿势
title: 有关在vue中使用防抖节流的正确姿势
date: 2020-08-15 11:21:59
tags:
categories: 
comments: true
top: false
---

> 主题：有关在vue中使用防抖节流的正确姿势
> 概述：有关在vue中使用防抖节流的正确姿势

<!--正文-->
<!--more-->

`util.js`

```
export default {
    // 防抖
	_debounce(fn, delay) {

		var delay = delay || 200;
		var timer;
		return function() {
			var th = this;
			var args = arguments;
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				timer = null;
				fn.apply(th, args);
			}, delay);
		};
	},
	// 节流
	_throttle(fn, interval) {
		var last;
		var timer;
		var interval = interval || 200;
		return function() {
			var th = this;
			var args = arguments;
			var now = +new Date();
			if (last && now - last < interval) {
				clearTimeout(timer);
				timer = setTimeout(function() {
					last = now;
					fn.apply(th, args);
				}, interval);
			} else {
				last = now;
				fn.apply(th, args);
			}
		}
	}
}
```

 使用的文件：

```
import util from "@/utils/index.js"

{
    ...
    watch:{
		amount(n){
			this.getData(n,this);
		}
	},
	onShow() {
	    // 确保一进来就调用，传递this上下文方便调用方法。
		this.getData(0,this);
	},
    methods:{
        getData: util._debounce(async function(value,that) {
			if(!value) value = 0;
			const data = await that.getPayAmount(value)
			that.payHowMuch = data.payAmount;
			that.payYue = data.amount;
		}, 300),
    }
    
    ...
}

```

