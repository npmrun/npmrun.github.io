---
typora-root-url: spriteAltas精灵图集使用方式
title: spriteAltas精灵图集使用方式
comments: true
date: 2020-04-07 11:43:23
tags: cocos
categories: 
---

> 之前，对于扑克牌的加载一直是散装加载，用`loadRes`动态的添加到游戏中，这样的缺陷是在动画的时候会闪一下，在网慢的情况下也许扑克牌不会加载出来而动画就执行了。因此，改用图集加载方式，将整幅扑克牌一起加载出来，用那种加载哪张就行了。

<!--more-->

1. 新加一个属性:

   ![image-20200407114816545](/images/image-20200407114816545.png)

2. 我们用图集打包出来的是这样的文件：

   ![image-20200407114923862](/images/image-20200407114923862.png)

3. 在`cocos`上将`plist`拖进属性中。

   ![image-20200407115004375](/images/image-20200407115004375.png)

4. 编写代码动态修改精灵图：

   ```javascript
     setAtlasImg(node,spAtlas,spriteName){
       let sprite = node.getComponent(cc.Sprite);
       if (!sprite) {
         sprite = node.addComponent(cc.Sprite);
       }
       let mySprite =  spAtlas.getSpriteFrame(spriteName)
       sprite.spriteFrame = mySprite;
       return mySprite;
     }
     // 节点，图集组件，图集中文件名字
     setAtlasImg(this.node, this.spAtlas, "11");
   ```

