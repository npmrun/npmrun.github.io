---
typora-root-url: Git出现Pathspec &#x27;xxx&#x27; is in submodule解决方案
title: Git出现Pathspec &#x27;xxx&#x27; is in submodule解决方案
date: 2020-06-28 12:04:13
tags:
categories: 
comments: true
top: false
---



更新了七牛的SDK， 目录为vendor/crazyfd/yii2-qiniu, 下面有4个文件，

`LICENSE Qiniu.php README.md composer.json`

使用git status查看，没有任何提交，后手动删除重新copy了文件，再次使用git status：

`modified: vendor/crazyfd/yii2-qiniu (modified content)`

git add后只增加了文件夹，但是没有文件。手动Add:
`git add vendor/crazyfd/yii2-qiniu/Qiniu.php`

报出错误信息：
`fatal: Pathspec 'xxx' is in submodule`

## 解决方案
发现vendor/crazyfd下面并没有.git文件
所以使用下面命令：

```
git rm -rf --cached vendor/crazyfd/yii2-qiniu
git add vendor/crazyfd/yii2-qiniu/*
```

再次使用git status查看发现文件已经成功添加：

```
Changes to be committed:
(use "git reset HEAD <file>..." to unstage)
deleted: vendor/crazyfd/yii2-qiniu
new file: vendor/crazyfd/yii2-qiniu/LICENSE
new file: vendor/crazyfd/yii2-qiniu/Qiniu.php
new file: vendor/crazyfd/yii2-qiniu/README.md
new file: vendor/crazyfd/yii2-qiniu/composer.json
```

