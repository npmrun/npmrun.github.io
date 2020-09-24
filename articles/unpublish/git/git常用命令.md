---
typora-root-url: git常用命令
title: git常用命令
date: 2020-09-12 10:22:43
tags:
categories: 
comments: true
top: false
---

> 概述：

<!--more-->

### 强制提交

```
git push -f origin master
```

### 强制覆盖本地 (从远程仓库下载最新版本)

```
git fetch -all 
// 将本地设为刚获取的最新的内容
git reset --hard origin/master
```

### 显示当前分支的最近几次提交

```
git reflog
```



### Log信息打印

`git log --abbrev-commit --pretty=oneline `

### 将代码从一个分支转移到另一个分支

`git cherry-pick `

http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html



> 附录

[常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

![img](/images/145b0cdfa98a4a9cb724d745a1466c47~tplv-k3u1fbpfcp-zoom-1.image)