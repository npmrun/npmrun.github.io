---
typora-root-url: prettier配置文件说明
title: prettier配置文件说明
date: 2020-07-24 10:34:00
tags:
categories: 
comments: true
top: false
---

> 主题：prettier的部分配置说明
> 概述：主要是为了适配ESlint的报错，请结合ESlint一起看

<!--正文-->
<!--more-->

[官网](https://prettier.io/)

`.prettierrc`

```javascript
{
    // tab缩进大小,默认为2
    "tabWidth": 4,
    // 使用tab缩进，默认false
    "useTabs": false,
    // 使用分号, 默认true
    "semi": false,
    // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    "singleQuote": false,
    // 行尾逗号,默认none,可选 none|es5|all
    // es5 包括es5中的数组、对象
    // all 包括函数对象等所有可选
    "TrailingCooma": "all",
    // 对象中的空格 默认true
    // true: { foo: bar }
    // false: {foo: bar}
    "bracketSpacing": true,
    // JSX标签闭合位置 默认false
    // false: <div
    //          className=""
    //          style={{}}
    //       >
    // true: <div
    //          className=""
    //          style={{}} >
    "jsxBracketSameLine": false,
    // 箭头函数参数括号 默认avoid 可选 avoid| always
    // avoid 能省略括号的时候就省略 例如x => x
    // always 总是有括号
    "arrowParens": "avoid",
    // 宽度最长为140
    "printWidth": 140,
}
```

> 其中有个问题，就是[1,2,3]再`bracketSpacing`为true后会被重新格式化为:`[1, 2, 3]`，1和3的左右没有空格符，因此就会有`eslint`中`array-bracket-spacing`的报错，这时候官网没有给出解决方案，最好把`array-bracket-spacing`规则关了