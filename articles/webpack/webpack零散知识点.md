---
typora-root-url: webpack零散知识点
title: webpack零散知识点
date: 2020-04-04 22:36:53
tags: webpack
categories: 
comments: true
---

### 参数解析

* `mode`

  主要区分为：`development`和`production`

  | 选项          | **描述**                                                     |
  | ------------- | ------------------------------------------------------------ |
  | `development` | 会将 `process.env.NODE_ENV` 的值设为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 |
  | `production`  | 会将 `process.env.NODE_ENV` 的值设为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin` |

  > *记住，只设置* `NODE_ENV`*，则不会自动设置* `mode`。

<!--more-->

* `entry`

  可以是数组或者对象

  * 数组

    数组中表示的所有文件都将打包成一个文件，对应的是对象中键的`main`。也就是说

    如果值是`['src/index.js']`的话，跟`{main:'src/index.js'}`效果是一样的。

  * 对象

    如果存在多个键值的话表示的就是多个入口，`webpack`将会从多个入口进入开始打包。例如：

    ```javascript
    ...
    "entry":{
       "main":["src/index.js"],
       "react":"react",
       "vue":["vue","vue-router","vuex"]
    }
    ...
    ```

    如上的话就会打包出三个文件出来，分别是`main`,`react`,`vue`名字可以再输出的时候自定义。

* `output`

  对象。作为此配置的最低要求，我们需要提供两个参数：1. `filename`表示将要输出的文件名字。2. `path`将要输出的路径

  * 单入口文件

    ```javascript
    const config = {
      output: {
        filename: 'bundle.js',
        path: '/home/proj/public/assets'
      }
    };
    
    module.exports = config;
    ```

    此配置将一个单独的 `bundle.js` 文件输出到 `/home/proj/public/assets` 目录中。

  * 多入口文件

    多入口不能单独的指定一个具体的文件名，而是需要提供一个占位符，由`webpack`提供各个文件的一些参数，但是具体的名字仍旧可以自己定义。

    ```javascript
    {
      entry: {
        app: './src/app.js',
        search: './src/search.js'
      },
      output: {
        filename: '[name].js',
        path: __dirname + '/dist'
      }
    }
    // 写入到硬盘：./dist/app.js, ./dist/search.js
    ```

  * [publicPath](https://www.webpackjs.com/concepts/output/)  (这个参数尚未用过)

