---
typora-root-url: html的加载事件DOMContentLoaded和load
title: html的加载事件DOMContentLoaded和load
date: 2020-07-04 18:21:39
tags:
categories: 
comments: true
top: false
---

> 主题：html的加载事件DOMContentLoaded和load
> 概述：有关html的加载事件的粗略整理，用于后面快速理解

<!--正文-->
<!--more-->

## 页面加载方式

1. 解析HTML结构。
2. 加载并解析外部脚本。
3. DOM树构建完成，执行脚本。//DOMInteractive –> DOMContentLoaded
4. 加载图片、样式表文件等外部文件。
5. 页面加载完毕。//window.onload

## 涉及到的事件

1. window.onload: 
   当页面全部加载完成（包括所有资源）
2. document.onload: 
   当整个html文档加载的时候就触发了，也就是在body元素加载之前就开始执行了
3. DOMContentLoaded: 
   当页面的DOM树解析好并且需要等待JS执行完才触发 
   DOMContentLoaded事件不直接等待CSS文件、图片的加载完成
4. onreadytstatechange: 
   当对象状态变更时触发这个事件，一旦document的readyState属性发生变化就会触发

##### DOMContentLoaded：dom内容加载完毕

当输入一个URL，页面的展示首先是空白的，然后过一会，页面会展示出内容，但是页面的有些资源比如说图片资源还无法看到，此时页面是可以正常的交互，过一段时间后，图片才完成显示在页面。从页面空白到展示出页面内容，会触发DOMContentLoaded事件。而这段时间就是HTML文档被加载和解析完成。



##### load页面所有内容（包括图像、脚本文件、CSS 文件等）对象已加载时触发；


1）支持DOMContentLoaded事件的，就使用DOMContentLoaded事件；
2）IE6、IE7不支持DOMContentLoaded，但它支持onreadystatechange事件，该事件的目的是提供与文档或元素的加载状态有关的信息。

3)  更低的ie还有个特有的方法doScroll， 通过间隔调用：document.documentElement.doScroll("left");

 可以检测DOM是否加载完成。 当页面未加载完成时，该方法会报错，直到doScroll不再报错时，就代表DOM加载完成了。该方法更接近DOMContentLoaded的实现。

```

function ready(fn){
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
            fn();
        }, false);
    } 
    // 如果IE
    else if(document.attachEvent) {
        // 确保当页面是在iframe中加载时，事件依旧会被安全触发
        document.attachEvent('onreadystatechange', function() {
            if(document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                fn();
            }
        });
        // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
        if(document.documentElement.doScroll && typeof window.frameElement === "undefined") {
            try{
                document.documentElement.doScroll('left');
            }
            catch(error){
                return setTimeout(arguments.callee, 20);
            };
            fn();
        }
    }
};
```

## document.ready的实现

作用：监控dom是否加载完毕，dom加载完毕时及资源加载之前触发 

```
$(function(){
 
});
 
$(document).ready(function(){
 
});
 
//jquery中默认为document对象
$().ready(function(){
 
});
```

> 转载：
>
> https://blog.csdn.net/u011700203/article/details/47656857