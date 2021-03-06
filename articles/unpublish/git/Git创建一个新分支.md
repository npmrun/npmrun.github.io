---
typora-root-url: Git创建一个新分支
title: Git创建一个新分支
date: 2020-06-29 20:01:04
tags:
categories: 
comments: true
top: false
---

# 创建一个空的分支

在Git中创建分支，是一定有一个父节点的，也就说新创建的分支是要在已经存在分支上来创建，如果你的工程已经开到了中途，这个时候你直接创建分支的话，它是无法成为一个空分支的。

> git checkout --orphan 新的分支名

这个命令的是作用是：
 创建一个没有父节点的分支，但是会复制当前分支的内容到 新的分支上。
 举个例子，在A分支上，有两个文件 t1.txt;t2.txt
 调用`git checkout --orphan 新的分支名`创建了新的分支并切换到新的分支下，而且`t1.txt`;`t2.txt`也会被复制到新的分支下，其实这个时候新的分支还不能说是一个分支，你查看分支的话，是没有这个分支的，你必须要提交一次，这个分支才算是真的创建出来了，因为这个分支没有父节点，所以没有任何的历史，只需要调用

```undefined
git rm -rf .
```

删除所有的文件（只会删除加入版本管理的文件），然后你可以随便创建一个文件，提交之后，这个新的空分支就算是创建完成了