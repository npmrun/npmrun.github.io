---
typora-root-url: 如何给git仓库瘦身,删除大文件
title: 如何给git仓库瘦身,删除大文件
date: 2020-04-16 13:24:04
tags:
categories:
comments: true
---



> http://blog.mallol.cn/2015/8d45392.html

## 开始

`git`用久后,或者`.gitignore`设置不好,没有忽略掉大文件(比如:`zip,sql,deb,tar.gz… `等二进制文件)。会把git库撑的很大,有几个G。这些大文件有些是没必要放进来的,需要删除掉.下面有解决办法:

进入项目根目录下面(确保是最新文件)。这个git库有6.4G.

```
[ jonny@wheezy ~ ]
$ cd project
```

从所有提交(commit)中删除所有的zip文件(*.zip.其他的请自行修正).

```
[ jonny@wheezy ~ ]
$ git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch *.zip' \
--prune-empty --tag-name-filter cat -- --all
```

> 注意，会删除磁盘上的文件，请注意备份

`Rewrite 48dc599c80e20527ed902928085e7861e6b3cbe6 (266/266)`

`Ref ‘refs/heads/master’ was rewritten`

清除快取和回收空间。

```
[ jonny@wheezy ~ ]
$ rm -rf .git/refs/original/ 
$ git reflog expire --expire=now --all
$ git gc --prune=now
$ git gc --aggressive --prune=now
```

强制覆盖并上传到 remote repository。

```
[ jonny@wheezy ~ ]
$ git push origin master --force
```

打完收工！现在就可以看到瘦身的效果了。

```
[ jonny@wheezy ~ ]
$ du .git -lsh 
126M .
```

`du -d 1 -h`

## 问题

* `fatal :bad revision 'rm'`: 这个命令是使用**双引号**，而不是单引号。