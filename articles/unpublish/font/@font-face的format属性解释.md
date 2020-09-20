---
typora-root-url: @font-face的format属性解释
title: @font-face的format属性解释
date: 2020-08-15 10:22:26
tags:
categories: 
comments: true
top: false
---

> 主题：@font-face的format属性解释
> 概述：@font-face的format属性解释

<!--正文-->
<!--more-->

`format` :字体的格式，主要用于浏览器识别，一般有以下几种:

* truetype 
* opentype
* truetype-aat
* embedded
* opentype
* avg
* 等

对于`@font-face`而言，兼容性问题就是各浏览器所能识别的字体格式不尽相同。

### **TrueType格式(.ttf)**

Windows和Mac上常见的字体格式，是一种原始格式，因此它并没有为网页进行优化处理。

> 浏览器支持：IE9+,FireFox3.5+,Chrome4.0+,Safari3+,Opera10+,IOS Mobile Safari4.2+

### **OpenType格式(.otf)**

以TrueType为基础，也是一种原始格式，但提供更多的功能。

> 浏览器支持：FireFox3.5+,Chrome4.0+,Safari3.1+,Opera10.0+,IOS Mobile Safari4.2+

### **Web Open Font格式(.woff)**
针对网页进行特殊优化，因此是Web字体中最佳格式，它是一个开放的TrueType/OpenType的压缩版，同时支持元数据包的分离。

> 浏览器支持：IE9+, FireFox3.5+, Chrome6+, Safari3.6+,Opera11.1+

### **Embedded Open Type格式(.eot)**

IE专用字体格式，可以从TrueType格式创建此格式字体。
浏览器支持：IE4+

### **SVG格式(.svg)**

基于SVG字体渲染的格式。

> 浏览器支持：Chrome4+, Safari3.1+, Opera10.0+, IOS Mobile Safari3.2+

为解决兼容性问题，Paul Irish写了称为Bulletproof的一个独特的`@font-face`语法：

```
@font-face {
	font-family: ‘YourWebFontName’;
	src: url(‘YourWebFontName.eot’); /* IE9 Compat Modes */
	src: url(‘YourWebFontName.eot?#iefix’) format(‘embedded-opentype’), /* IE6-IE8 */
		 url(‘YourWebFontName.woff’) format(‘woff’), /* Modern Browsers */
		 url(‘YourWebFontName.ttf’) format(‘truetype’), /* Safari, Android, iOS */
		 url(‘YourWebFontName.svg#YourWebFontName’) format(‘svg’); /* Legacy iOS */
}
```

