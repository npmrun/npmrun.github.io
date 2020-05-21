---
typora-root-url: cocos两点之间的距离
title: cocos两点之间的距离
date: 2020-05-21 10:52:24
tags:
categories: cocos
comments: true
top: false
---

```javascript
let startPos = cc.v2(0, 0);  //开始位置
let endPos = cc.v2(0, 0);    //结束位置
let distance = startPos.sub(endPos).mag();
```

