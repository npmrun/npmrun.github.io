---
typora-root-url: npm常用命令
title: npm常用命令
date: 2020-7-5 22:16:24
tags:
categories: 
comments: true
---

### 初始化一个项目用npm管理

`npm init` （命令行会出现选择）   
`npm init -y` （跳过选择）


### 全局安装一个库
`npm i -g xxx`

### 本地安装一个库
`npm i xxx` （默认安装最新版的依赖包）   
`npm i xxx --save`   
`npm i xxx -D`   

### 更新
`npm update xxx`   

### 卸载
`npm uninstall xxx`   

### 安装到生产环境
`npm i xxx -S`   
>-S 是 --save 的缩写;使用 --save(-S) 安装的插件，被写入到 dependencies 对象里面去
>不写 -S 默认也是安装到生产环境

### 安装到开发环境
`npm i xxx -D`
> -D 是 -- save-dev;使用 --save-dev(-D) 安装的插件，被写入到 devDependencies 对象里面去   

* devDependencies 里面的插件只用于开发环境，不用于生产环境
* dependencies 是需要发布到生产环境的。（别人运行`npm i` 会安装的依赖）

>一般开发的时候没什么区别，写库的人才会区分

### 指定安装一个版本
`npm i xxx@0.0.1`   

### 如何列出npm模块所有的历史版本？
`npm view xxx versions`

### npm清理缓存
`npm cache clean -f`   

### npm包发布
`npm login`先登录   
`npm publish`再发布   
`npm publish --access public`  像`@xyx/tool`这种名字的会当作发布一个私有包，这时强制指定为共有
`npm unpublish --force`删除   

### 查看本地全局安装过的npm包
`npm list -g --depth 0`

### 查看当前项目的依赖模块如下：

`npm ls --depth 0`

### 查看全局依赖模块如下：

`npm ls -g --depth 0`