---
typora-root-url: CSS3.0使用@font-face自定义字体
title: CSS3.0使用@font-face自定义字体
date: 2020-08-15 10:34:04
tags:
categories: 
comments: true
top: false
---

> 主题：CSS3.0使用@font-face自定义字体
> 概述：CSS3.0使用@font-face自定义字体

<!--正文-->
<!--more-->

```
<!doctype html>
<html>
<head>
    <title>css3.0 @font-face</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <h1>myblog</h1>
</body>
</html>
```

```
@font-face {
    font-family: '汉仪雪君体简';
    src:url('./fonts/汉仪雪君体简.ttf') format('truetype')，
	    url('./fonts/汉仪雪君体简.eot') format('embedded-opentype')，
	    url('./fonts/汉仪雪君体简.woff') format('truetype');
    font-weight: normal;
    font-style: normal;
}
h1{
    font-family:"汉仪雪君体简";
}
```

如以上代码所示，@font-face的语法规则如下:

```
    @font-face {
      font-family: <YourWebFontName>;
      src: <source> [<format>][,<source> [<format>]]*;
      [font-weight: <weight>];
      [font-style: <style>];
    }
```

注：

* `YourWebFontName`:此值为你自定义的字体名称，最好是使用你下载的默认字体，他将被引用到你的Web元素中的`font-family`。如`font-family`: '汉仪雪君体简';

* `source`:此值指的是你自定义的字体的存放路径；

* `format`：此值指的是你自定义的字体的格式，主要用来帮助浏览器识别，其值主要有以下几种类型：

  `truetype,opentype,truetype-aat,embedded-opentype,avg`等。不同浏览器对字体格式的支持不同，一般来说至少需要`.woff,.eot`两种格式字体，甚至还需要`.svg`等字体达到更多种浏览版本的支持。

* `weight`和`style:weight`定义字体是否为粗体，style主要定义字体样式，如斜体。

* 下载字体：https://www.google.com/fonts
   获取@font-face所需字体格式：https://www.fontsquirrel.com/tools/webfont-generator