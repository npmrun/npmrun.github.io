---
typora-root-url: 有关storybookreadme的在vue解析docss标签的问题
title: 有关storybookreadme的在vue解析docs标签的问题
date: 2020-08-13 22:24:38
tags:
categories: 
comments: true
top: false
---

> 主题：
> 概述：

<!--正文-->
<!--more-->

## 问题：

我是根据`storybook-readme`的文档进行配置的，类似于下面这样 ：

```
 	config.module.rules.push({
      test: /\.vue$/,
      use: "vue-docgen-loader",
      enforce: "post",
    });
    config.module.rules.push({
      resourceQuery: /blockType=docs/,
      use: ['storybook-readme/vue/docs-loader','html-loader', 'markdown-loader'],
    });
```

然后就出问题了：

![image-20200813224956262](/images/image-20200813224956262.png)

经过长时间的尝试，发现这两个错误，在`Component.options.__docs`后面竟然没有引号，直接接了一串`docs`的内容，因此我找到那个`docs-loader`进行修改，修改之后类似于下面这样：

```
module.exports = function (source, map) {
  this.callback(null, 'module.exports = function(Component) {Component.options.__docs = "' + source + '"}', map);
};
```

然后又除了下面这个问题：

![image-20200813225100254](/images/image-20200813225100254.png)

百度得知好像是双引号不能回车，因此我们把加的双引号换车反引号。

```
module.exports = function (source, map) {
  console.log(source)
  this.callback(null, 'module.exports = function(Component) {Component.options.__docs = `' + source + '`}', map);
};
```

通过打印`source`你会发现又多了一小撮东西，这是因为这个`source`本质上是一个js文件，需要导入才行，不过我也不知道怎么把字符串当js导入，因此我就直接把`html-loader`去掉了，这样就行了。能够使用`docs`标签了。





