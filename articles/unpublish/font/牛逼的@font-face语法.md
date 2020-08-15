---
typora-root-url: 牛逼的@font-face语法
title: 牛逼的@font-face语法
date: 2020-08-15 09:37:07
tags:
categories: 
comments: true
top: false
---

> 主题：@font-face语法
> 概述：近期在制作`XYX-UI`的时候遇到了图标问题，经过查询资料与上手实践，发现最好的办法莫过于使用字体了，用svg实在有点太重了。

<!--正文-->
<!--more-->

# 防弹`@font-face`语法

让我向您介绍@font-face定义的最佳方法:

```css
@font-face {
  font-family: 'Graublau Web';
  src: url('GraublauWeb.eot?') format('eot'), url('GraublauWeb.woff') format('woff'), url('GraublauWeb.ttf') format('truetype');
}
```

这就是最好的`@font-face`语法。

我将回到为什么这是最好的解决方案，但让我们先回顾一下其他技术的缺点。

当然，问题的核心是IE需要一种`.eot`字体，而其他浏览器必须采用`.ttf`或`.otf`。

> 2010年5月12日。如果你今天想要使用@font-face，只需前往[FontSquirrel s生成器](http://www.fontsquirrel.com/fontface/generator)。在实现@font-face时，它是不可缺少的工具。如果你想知道更多的原因，请继续

好吧，让我们看看我们在这里得到了什么……

## 条件注释

```css
<!--
@font-face{
  font-family:'Graublau Web';
  src: url('GraublauWeb.otf') format('opentype');
}
-->

<!--[if IE]>
<mce:style type="text/css" media="screen"><!
@font-face{
  font-family:'Graublau Web';
  src: url('GraublauWeb.eot');
}
-->
```

啊。认真的吗?我们必须把它放到每个html文件或有唯一的iefont .css文件。不好玩。同时,非常的丑陋。

## 双重注释

```
@font-face{
  font-family:'Graublau Web';
  src: url('GraublauWeb.eot'); /* here you go, IE */
}
@font-face{
  font-family:'Graublau Web';
  src: url('GraublauWeb.otf'); /* everyone else take this */
}
```

这里也是有问题的，正如[Andrea](https://webreflection.blogspot.com/2009/09/font-face-we-are-already-doing-wrong.html)指出的那样。IE会下载`.otf`文件。我们不能有额外的HTTP连接，所以这是典型的解决方案:

```
@font-face {
  font-family: 'Graublau Web';
  src url('GraublauWeb.otf') format('opentype'); /* IE no comprende format()! */
}
```

因为，毕竟`IE`无法理解`format`语法，这是真的。但实际发生的是IE对这个文件名进行了请求

`GraublauWeb.otf’)%20format(‘opentype`

oops,看起来就像是有人在他们的正则表达式中忘记了一个`?`。但是，一个404总比抓取一个20到100k的文件靠谱点。不过，我们也可以干掉404：

## Mo’ Bulletproofer

```
@font-face{
  font-family:'Graublau Web';
  src: url('GraublauWeb.eot'); /* here you go, IE */
}
@font-face{
  font-family:'Graublau Web';
  src: url(//:) format ('no404'), url('GraublauWeb.otf') format('opentype'); /* tricky! */
}
```



> 转载翻译：
>
> https://www.paulirish.com/2009/bulletproof-font-face-implementation-syntax/
>
> https://www.w3cplus.com/css3/icon-fonts.html