---
typora-root-url: ts使用paths配置路径别名
title: ts使用paths配置路径别名
date: 2020-04-24 10:45:41
tags:
categories: 
comments: true
---

```
{
  "compilerOptions": {
    ***
    // 配置基础路径
    "baseUrl": ".",
    "paths": {
    	// '@/*' 表示中的@表示路径别名，*代表匹配所有声明的所有路径
    	// './app/*' 表示在baseUrl的相对目录下的app的所有文件都在paths的范围内
        "@/*": ["./app/*"]
    }
    ***
  },
  "exclude": [
    "app/public",
    "app/views",
    "node_modules*"
  ]
}
```

<!--more-->

webstrom的一些配置：

![image-20200424105018577](/images/image-20200424105018577.png)

![image-20200424105035089](/images/image-20200424105035089.png)

> 不一定要一样，只是我这样是可以用的。
>
> 那个Recompile on changes不推荐钩选，不然会把你的所有ts文件的同级目录下编译出一个js文件