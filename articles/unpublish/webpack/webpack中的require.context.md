---
typora-root-url: webpack中的require.context
title: webpack中的require.context
date: 2020-08-01 00:41:15
tags:
categories: 
comments: true
top: false
---

> 主题：require.context
> 概述：主要是记录加深一下require.context的印象

<!--正文-->
<!--more-->

> [学习地址](https://webpack.docschina.org/api/module-methods/#requirecontext)
>
> https://webpack.docschina.org/guides/dependency-management/#requirecontext

基本的使用方法：

```js
require.context(
  directory: String, // 目录
  includeSubdirs: Boolean /* 是否查询子目录 */,
  filter: RegExp /* 正则筛选 */,
  mode: String  /* 可选的， 'sync' | 'eager' | 'weak' | 'lazy' | 'lazy-once'，默认值是 'sync' */
)
```

以上的方式可以通过配置上面的选项，提供需要的目标目录，可以筛选出更加细粒度的依赖性从而引入.

举个例子:

comments
   ├─a.js
   ├─b.js
   ├─c.js
   ├─basd.js
   ├─bsd.js
我们只需要b.js引入,通常情况下只需要引入require对应的文件路径就行了.但是我想要b开头的文件都引入呢?这就需要用到require.context了

```
require.context("./",false,/^b(.*?)$/g)
// ./ 表示需要遍历的当前目录,也就是我们需要的文件都在这个文件夹中.
// false 表示是不是要遍历子文件夹,如果我们不需要匹配子文件夹中的b开头的文件就指定为false;
// /^b(.*?)$/g 正则匹配出文件名第一个字母都是b的文件,例如:baaa.js这种b开头的
```

那它最后返回的结果是什么呢?

> **require.context模块导出（返回）一个（require）函数**，这个函数可以接收一个参数：request 函数–这里的 request 应该是指在 require() 语句中的表达式

导出的方法有 3 个属性： resolve, keys, id。

- resolve 是一个函数，它返回请求被解析后得到的模块 id。
- keys 也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。
- id 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到

参照官方的示例代码:

```javascript
const cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../components/', true, /\.js$/));
// 在构建时(build-time)，所有被 require 的模块都会被填充到 cache 对象中。
```

可以看出`require.context`的执行结果作为参数传递进去,此时所有的模块名称可以使用`.keys`获取到,但是这只是名称而已,因为`require.context`返回的是一个`require`函数,我们可以用它结合keys中的key进行导入.这个时候cache中保存的就是所有的可以被导入的对象.