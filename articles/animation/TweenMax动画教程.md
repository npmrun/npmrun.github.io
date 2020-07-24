---
typora-root-url: TweenMax动画教程
title: TweenMax动画教程
date: 2020-07-19 00:05:05
tags:
categories: 
comments: false
top: false
---

> 主题：[TweenMax](https://www.tweenmax.com.cn/api/tweenmax/)动画教程
> 概述：主要进行对[TweenMax](https://www.tweenmax.com.cn/api/tweenmax/)的学习

<!--正文-->
<!--more-->

## 简单使用

* 第一步，自然是引入TweenMax库了，这个官方可以找到。

* 最基础的使用，我们制作一个逐渐隐藏的红色方块吧。

  ```
  
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          .box1{
              width: 100px;
              height: 100px;
              background-color: red;
          }
      </style>
  </head>
  <body>
      <div class="box1"></div>
      <script src="../lib/TweenMax.min.js"> </script>
      <script>
      	TweenLite.fromTo('.box1', 5, {opacity:1}, {opacity:0});
      </script>
  </body>
  </html>
  ```

  > 同时请注意文档中的这一句话：例子中使用的CSS属性动画（opacity、x等）需要CSSPlugin插件支持，此插件包含在`TweenMax.min.js`中。如果你使用`TweenLite.min.js`，需另外加载`CSSPlugin.min.js`。**不是全量引入的话需要额外的css插件支持**

### TweenLite和TweenMax区别

TweenMax和TweenLite差不多，后者是轻量级的，不包含插件，如果需要对应的特性需要引入不同的插件库。这也就导致这一些API的不同，不过这两者大部分的API是一样的。

## 扩展使用

### 暂停与恢复

我们采用实例的方式一步步的学习。经过上面的示例，我们扩展一下，尝试写出一个控制按钮，按一下播放，再按一下暂停。这就需要一个简单的流程：

1. 动画是否再执行中，如果是，暂停
2. 动画是否停止了，如果是，开始

我们可以看到[这里](https://www.tweenmax.com.cn/api/tweenmax/)的文档,里面有简要的列出一些API，但是我貌似没有看到具体的用法，我们猜测一下:

1. `TweenLite`或`TweenMax`写好链式语法后会返回自身的实例，我们可以用它来调用具体方法。
2. 在**TweenLite 和TweenMax 共有方法**中，我们可以看到我们需要的几个函数：`pause()`,`paused()`,`resume()`这三个是属于暂停的方法，通过英文名大概可以得知，`paused()`是判断是否暂停的

因此：以下的代码就顺利成章了，可以实验以下是否得到想要的结果。

```
	<div class="box1"></div>
    <button onclick="toggle()">播放</button>
    <script src="../lib/TweenMax.min.js"> </script>
    <script>
        let anim1 = TweenLite.fromTo('.box1', 5, {opacity:1}, {opacity:0});
        function toggle(){
            if (anim1.paused()) {
                anim1.resume()
            }else{
                anim1.pause()
            }
        }
    </script>
```

> 注意的是这里是暂停与恢复，不能判断是否播放完毕，如果判断播放完毕可以用`anim1.progress()`判断是否播放到1了:
>
> ```
> 		function toggle(){
>             if (anim1.paused()&&anim1.progress()<1) {
>                 anim1.resume()
>             }else if (anim1.progress()==1) {
>                 anim1.restart()
>             }else{
>                 anim1.pause()
>             }
>         }
> ```
>
> **isActive**和**paused**的区别暂时不知道，貌似都是判断是否停止的，暂停之后paused是true,isActive是false,
>
> 动画开始之后paused是false,isActive是true,动画停止之后paused是false,isActive是false,