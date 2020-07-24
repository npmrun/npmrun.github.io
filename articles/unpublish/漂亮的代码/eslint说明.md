---
typora-root-url: eslint说明
title: eslint说明
date: 2020-07-24 13:11:12
tags:
categories: 
comments: true
top: false
---

> 主题：eslint说明文档
> 概述：eslint是为了使开发人员写出一手规范的js代码

<!--正文-->
<!--more-->

[官网](https://eslint.org/docs/user-guide/configuring)

`npm install eslint --save-dev`

`.eslintrc`

```

{
	// 扩展配置文件,默认使eslint:recommended
	"extends": "eslint:recommended",
	// 指定环境
	// https://eslint.org/docs/user-guide/configuring#specifying-environments
	"env": {
        "browser": true,
        "node": true
    },
	// 默认情况下，ESLint使用Espree作为其解析器。您可以选择指定在配置文件中使用不同的解析器，只要解析器满足以下要求
	// https://eslint.org/docs/user-guide/configuring
	"parser": "esprima",
	// 指定你的解析器选项
	"parserOptions": {
		// 指定你想使用的ECMAScript 版本
        "ecmaVersion": 6,
        // 如果代码在ECMAScript模块中，设置为“script”(默认)或“module”。
        "sourceType": "module",
        // 一个对象，指示您要使用哪些其他语言功能（比如jsx）
        "ecmaFeatures": {
        	// 允许全局范围内的return语句
        	"globalReturn": true,
        	// 启用全局严格模式（如果ecmaVersion为5或更高）
        	impliedStrict: true,
            "jsx": true
        }
    },
    // 指定处理器
    // https://eslint.org/docs/user-guide/configuring#specifying-processor
    "processor": "a-plugin/a-processor",
	// js书写必须遵守的规则
    "rules": {
    	// "error"表示不遵守就会报错
    	// "warn"表示不遵守就会警告
    	// "off"表示不用遵守
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    },
    // 指定全局变量，写了就不会报错了
    "globals": {
        // 可以指定不使用这种语法
    	"Promise": "off",
        "var1": "writable",
        "var2": "readonly"
    },
    // ESLint支持使用第三方插件。 在使用插件之前，您必须使用npm进行安装。
    "plugins": [
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}

```



