---
typora-root-url: css实现全站变灰
title: css实现全站变灰
date: 2020-04-04 22:48:22
tags: [前端,css]
categories:
comments: true
---



```css
html{
     filter: grayscale(100%);
     -webkit-filter: grayscale(100%);
     -moz-filter: grayscale(100%);
     -ms-filter: grayscale(100%);
     -o-filter: grayscale(100%);
     filter: progid:DXImageTransfrom.Microsoft.BasicImage(grayscale=1);
     -webkit-filter: grayscale(1);
}
```

