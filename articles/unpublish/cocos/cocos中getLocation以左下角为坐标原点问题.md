---
typora-root-url: cocos中getLocation以左下角为坐标原点问题
title: cocos中getLocation以左下角为坐标原点问题
date: 2020-05-27 16:58:32
tags:
categories: 
comments: true
top: false
---

> 参考链接
>
> https://forum.cocos.org/t/creator/85600

按下面这样从世界坐标转化为本地节点坐标就行了

```javascript
 this.map.on(cc.Node.EventType.MOUSE_DOWN,function(event) {
     let pos = this.map.convertToNodeSpaceAR(event.getLocation());
     this.graphics.fillColor = new cc.Color().fromHEX('#0000ff');
     this.graphics.circle(pos.x,pos.y,10)
     this.graphics.fill();
},this)
```

