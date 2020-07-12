---
typora-root-url: git本地多账号配置
title: git本地多账号配置
date: 2020-04-20 10:59:02
tags:
categories: 
comments: true
---



### 前提条件

* `git环境`

<!--more-->

### 生成第一个账号的密钥

先确保你已经有多个git账号（如：一个github的账号、一个码云的账号、...）。

在Git Bash Here的控制台里输入：

`git config --global user.name "你的名称"  `

`git config --global user.email "你的邮箱"  `

这里的邮箱是你申请git账号时的邮箱，不报错就是正确的，继续往下走

输入 `ssh-keygen -t rsa -C "你的邮箱"`  回车，再连续3次回车见下图：

此时看下图中有一行提示：`Your public key has been saved in /c/Users/xxx/.ssh/id_rsa.pub`

到该路径（`C/Users/xxx/.ssh`）可以看见两个文件：id_rsa、id_rsa.pub 。

![image-20200420110415002](/images/image-20200420110415002.png)

把密钥添加进git账号中：

用编辑器打开`id_rsa.pub`，推荐使用Notepad++，不要使用记事本打开，因为记事本的默认编码不是utf-8，拷贝里面的全部内容，登录你其中一个git 账号，例如:我登录github平台，后添加公钥里把它添加进去，公钥名称可以随便写。提交保存，输入你的github登录密码并提示添加成功。

![image-20200420110453118](/images/image-20200420110453118.png)

测试刚才添加的github密钥是否成功：

在Git Bash Here中输入 ssh git@github.com  回车

会出现一个提示，输入 yes 回车，可以看见一个successfully的提示信息，说明添加成功，可以使用了。

![image-20200420110505960](/images/image-20200420110505960.png)

### 生成第二个账号的密钥

重复上面的步骤，那用户名和邮箱改成另一个账号的

> 注：在输入`ssh-keygen -t rsa -C "你的邮箱" `的第一个选择存储路径的时候请自行改成自己的自定义名字，例如输入：smalldemons，这个时候一般是在`C/Users/xxx/.ssh`目录下就会又增加两个文件：smalldemons、smalldemons.pub,如果没看到的话，一般是在命令行打开的当前目录下，把这两个文件复制过去就行了

![image-20200420110803461](/images/image-20200420110803461.png)

添加多账号配置文件config（`C/Users/xxx/.ssh`）：

![image-20200420110903542](/images/image-20200420110903542.png)

里面的代码 如下：

![image-20200420111043623](/images/image-20200420111043623.png)

> Host 配置的别名
>
> HostName  填写改git账号的官网地址
>
> IdentityFile：是对应的密钥文件
>
> 如此就可以在多个账号间切换使用了



## 注意

这样的话只能使用`git@github.com:xxxx/xxxx.git`的方式拉取或推送代码，另一种我试的是失效的，得再看一下。

![image-20200420111258450](/images/image-20200420111258450.png)

切换`npmrun`账号:

```
git config --global user.name "你的名称" 
git config --global user.email "你的邮箱" 
# 上面两步不是必须的
git@npmrun.github.com:npmrun/npmrun.github.io.git
// 注意前面的 git@npmrun.github.com,我加了npmrun,对应的是config里面的Host
```

切换`1549469775`账号:

```
git config --global user.name "你的名称" 
git config --global user.email "你的邮箱" 
# 上面两步不是必须的
git@1549469775.github.com:npmrun/1549469775.github.io.git
// 注意前面的 git@1549469775.github.com,我加了1549469775,对应的是config里面的Host
```



> 查看自己的用户名和邮箱地址
>
> ```
> $ git config user.name
> $ git config user.email
> ```
>



> 注意别把两个账号的ssh密钥都放一个账号里去了，会出问题，我就是有一个放一起了，结果两个配置访问的都是一个账号下的仓库了。

>此时由于你的id_rsa存放的是1549469775的密钥，于是在使用`ssh git@github.com`发送的是默认的这个密钥，如果要修改默认登录的账号，可以在`config`文件里添加如下面的代码：
>
>```
>#npmrun Git账号
>Host github.com
>HostName github.com
>User git
>IdentityFile ~/.ssh/npmrun
>```
>
>就是把`github.com`默认指向npmrun这个账号

> 之后可以自己添加对应的git的，如：
>
> ```
> #poorman账号,这是我自建的git网站
> Host git.poorman.top
> HostName git.poorman.top
> User xxx  #
> IdentityFile ~/.ssh/poorman
> ```
>
> 

## 参考

> https://www.cnblogs.com/fanbi/p/7825746.html