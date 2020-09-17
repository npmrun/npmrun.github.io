---
typora-root-url: Babel知识
title: Babel知识
date: 2020-07-11 22:21:09
tags:
categories: 
comments: true
top: false
---

> 主题：这篇主要写Babel的理解
> 概述：这篇主要写Babel的理

<!--正文-->
<!--more-->

# Babel

> 我是从Babel开始搭建的，因为之前对这个鬼东西只存在于会用的阶段，但是具体里面更深入的东西确实没有去了解。借此机会，好好理解一下! 当然，最好的教材就是[官网](https://babeljs.io/)！不过我还是想看[中文网](https://babel.docschina.org/docs/en/babel-preset-env)

前言，你如果想要了解Babel的具体功能，建议去看看中文网，或者英文官网就行了，看之前就记住Babel就是一个翻译器，它可以将高版本的JS语法翻译成适合在低版本中运行的JS，当然，只限于Javascript。如果想要CSS也兼容一下，那么可以去看另一个Awesome的库：Postcss

目前我所涉及到的部分Babel库：

* `@babel/preset-env`

  它是一个智能预设，它使您可以使用最新的`JavaScript`，而无需微观管理目标环境所需的语法转换（以及可选的浏览器`polyfill`）。 这都使您的生活更轻松，`JavaScript`包更小！

* `@babel/preset-typescript`

  其中包含了[@babel/plugin-transform-typescript](https://babel.docschina.org/docs/en/babel-plugin-transform-typescript),用于转化`ts`文件的预设插件

* `@babel/plugin-transform-runtime`

  允许重用Babel注入的帮助代码以节省编码的插件。其中如果`corejs`指定了3(或2)的话，就需要额外安装另一个对应大版本的`@babel/runtime-corejs3`插件.同时我们需要安装另一个插件：`@babel/runtime`.

  > 帮助学习： https://zhuanlan.zhihu.com/p/147083132

* `@babel/plugin-syntax-dynamic-import`

  动态导入的lib,使代码中能够使用`import()`动态引入文件，但是貌似在IE11中有问题，因此就可以用`babel-plugin-dynamic-import-polyfill`代替一下，等官网有更好的决绝方案

  > 问题描述：
  >
  > https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
  >
  > https://github.com/babel/babel/issues/9872
  >
  > 

* `babel-plugin-dynamic-import-polyfill`

  用于简便的处理`@babel/plugin-syntax-dynamic-import`在IE11以下的BUG

* `@babel/cli`

  用于命令行执行babel转化的必要工具

* `@babel/core`

  babel核心代码，这是必须的，主要用于代码的转换，也可直接转化`Ast`

* `@babel/runtime-corejs3`

  `@babel/plugin-transform-runtime`指定`corejs：3`时必须引入的库，否则会找不到这个包。

* `babel-loader`

  webpack的加载器

* `@babel/polyfill`

  这将模拟一个完整的ES2015 +环境（不包含第4阶段的提议），并且打算在应用程序中使用，而不是在库/工具中使用。 （使用babel-node时会自动加载此polyfill）。7.4.0之后貌似不推荐了。

  > * 如果在.babelrc中指定了useBuiltIns：'usage'，则在webpack.config.js条目数组或源文件中都不包含@ babel / polyfill。 注意，仍需要安装@ babel / polyfill。
  >
  > * 如果在.babelrc中指定了useBuiltIns：'entry'，则如上所述，通过require或import在应用程序入口点的顶部包含@ babel / polyfill。
  >
  > 总之，必须要安装，或者用7.4.0推荐的用法可以不安装

  > 浏览器的话可以直接接入CDN就行了，如下面这个：
  >
  > https://cdn.bootcss.com/babel-polyfill/7.6.0/polyfill.js

* `@babel/runtime`

  `@babel/plugin-transform-runtime`必须的lib

## 安装相关库

**Babel**

```
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save-dev @babel/plugin-transform-runtime @babel/runtime
npm install --save-dev @babel/runtime-corejs3
npm install --save-dev babel-plugin-dynamic-import-polyfill
npm install --save @babel/polyfill
npm install --save-dev @babel/preset-typescript
```

根目录的`babel.config.json`配置：

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    [
      "@babel/preset-typescript"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ],
    [
      "babel-plugin-dynamic-import-polyfill"
    ]
  ]
}
```

### 新建一个Demo试验场

1. 找到自己的一个目录，新建Demo文件，例如的我的是`babel-run-demo`。

2. 终端进入这个文件夹

3. 执行`npm init -y`

4. 打开`package.json`,直接复制我的配置:

   ```
   {
     "name": "babel-run-demo",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "start": "babel source  --extensions .ts --out-dir dist"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "devDependencies": {
       "@babel/cli": "^7.10.4",
       "@babel/core": "^7.10.4",
       "@babel/plugin-syntax-dynamic-import": "^7.8.3",
       "@babel/plugin-transform-runtime": "^7.10.4",
       "@babel/preset-env": "^7.10.4",
       "@babel/preset-typescript": "^7.10.4",
       "@babel/runtime-corejs3": "^7.10.4",
       "babel-plugin-dynamic-import-polyfill": "^1.0.0",
       "@babel/polyfill": "^7.10.4",
       "@babel/runtime": "^7.10.4"
     }
   }
   ```

5. 执行`npm i `,安装依赖

6. 新建一个`babel.config.json`配置文件（如果`package.json`中没有配置的话就会读取）配置如下：

   ```
   {
     "presets": [
       [
         "@babel/preset-env",
         {
           "useBuiltIns": "usage",
           "corejs": 3
         }
       ],
       [
         "@babel/preset-typescript"
       ]
     ],
     "plugins": [
       [
         "@babel/plugin-transform-runtime",
         {
           "corejs": 3
         }
       ],
       [
         "babel-plugin-dynamic-import-polyfill"
       ]
     ]
   }
   
   ```

7. 新建一个`.browserslistrc`文件，用于指定兼容哪些浏览器，如果在`babel.config.json`中`@babel/preset-env`没有配置`target`字段就会读取这里的配置。

8. 根目录下新建目录`source`,因为我在`package.json`中指定了只转换`source`中的文件。

9. 随意建一个例如`main.ts`的代码（或者`js`，都行）写点代码上去：

   ```
   const add = (a,b)=>{
       return a+b;
   }
   new Promise(resolve => {
       setTimeout(() => {
           resolve(12234323)
       }, 2000);
   }).then(res=>{
       console.log(123);
   }).catch(e=>{
       console.log(e)
   })
   console.log([1,2,5,3].includes(1));
   console.log(process.env.NODE_ENV);
   export default {
       ab: 1332
   }
   ```

10. 执行`npm start`命令，完成之后就会在根目录下发现一个`dist`文件夹，其中便是转换过后的代码了。如`main.js`:

    ```
    "use strict";
    
    var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
    
    var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
    
    var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/interopRequireWildcard"));
    
    var _main = _interopRequireDefault(require("@/main"));
    
    var _axios = _interopRequireDefault(require("axios"));
    
    // import aba from "@/a"
    console.log(["asssssssssssssssssss"]);
    
    let ac = _promise.default.resolve().then(() => (0, _interopRequireWildcard2.default)(require("@/a")));
    
    console.log(ac.then(r => console.log(r)));
    console.log(_main.default); // console.log(aba);
    
    console.log(_axios.default.defaults);
    ```

这个时候的代码只能用`node`执行，如果想在浏览器中执行必须要借助`webpack`或其他工具将导入的一起打包。如上，转化过后的代码引入了`@babel/runtime-corejs3`，因此这个包是必须的，如果你发现你转化后的代码没有这个引入，那么安不安装都无所谓。

最后附上`Git`仓库地址，[点击这里](http://git.poorman.top/Demo/babel-run-demo)



> 参考资料：
>
> [@babel/plugin-transform-runtime 到底是什么](https://zhuanlan.zhihu.com/p/147083132)
>
> [中文官网](https://babel.docschina.org/)
>
> [*browserslist 目标浏览器配置表*](https://www.jianshu.com/p/bd9cb7861b85)
>
> [*@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别*](https://blog.csdn.net/m0_37846579/article/details/103379084)
>
> *[Babel：plugin、preset的区别与使用](https://www.cnblogs.com/dapengFly/p/9876915.html)*
>
> [Github上自定义babel预设的示例仓库](https://github.com/chyingp/blog/tree/master/demo/2018.05.31-babel-plugin-preset/create-preset)