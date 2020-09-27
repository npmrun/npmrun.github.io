---
typora-root-url: css 伪类实现弧形
title: css 伪类实现弧形
date: 2020-05-25 23:26:47
tags: 前端
categories:
comments: true
---

在实现页面五花八门的有特色的ui时，我们有时会遇到要用实现一个弧形，而这样的弧形要怎么实现呢？用图片？好像不大现实，因为这样就要无故多加载一张图片了，这里我们来说说怎么用css的after伪类来实现弧形。

![img](/images/7513201-18bc753766c1fc46.png)

先是一写元素，再给这个元素设置样式和伪类样式
 `<view class="pure_top"></view>`
 比如说这个pure_top元素(因为这里是小程序所以用的是view，h5也是一样实现的啦)，我设置的样式如下:

```
.pure_top {
  width: 100%;
  height: 100px;
  position: relative;
  z-index: -1;
  overflow: hidden;
}

.pure_top::after {
  content: '';
  width: 140%;
  height: 100px;
  position: absolute;
  left: -20%;
  top: 0;
  z-index: -1;
  border-radius: 0 0 50% 50%;
  background: #1496f1;
}
```

如何在元素后追加一个after，当然是元素自身定位为relative，伪类设置content:‘’，并相对定位为absolute，再设置下left ,top 值，使伪类元素的位置摆放的合理就行了。
 这里需要注意的是我把z-index值设为-1，因为弧形一般是作为背景图的，所有层级自然要放低些。
 实现效果如下图：

![img](/images/7513201-4d0d0a9438d118e3.png)

上面的图看起来好像弧度太大，几乎要看不出。依上面的实现原理，弧度要多少可以是自己微调。看上面的伪类`.pure_top::after { content: '';width: 140%;}`宽度为140%，难怪弧度那么大呢？半径越大，弧度就越大(我应该没记错吧哈哈哈哈哈哈)，那我们是不是可以减小半径来达到变小弧度的需求？看下图的实现：

![img](/images/7513201-8833cd268690e1c6.png)

```
.gradient_top {
  width:100%;
    height: 330rpx;
  position: relative;
  z-index: -1;
  overflow: hidden;
}
.gradient_top::after {
  content: '';
  width: 100%;
  height: 330rpx;
  position: absolute;
  left: 0;
  top:0;
  z-index: -1;
  border-radius: 0 0 80% 80%;
  background: linear-gradient(160deg,#1496f1, #E0F0FA);
}
```

这里把伪类的宽设为100%，left ， top值自然就为0了。
 这里可以看到，如果要设置渐变，把background设为渐变就可以了，但是注意，我都是把颜色设置在伪类上的。

学会了就快去实现你丰富多彩的界面吧~