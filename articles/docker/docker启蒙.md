---
typora-root-url: docker启蒙
title: docker启蒙
date: 2020-04-26 21:41:29
tags:
categories: docker
comments: false
---



## Hello world

`Docker`允许你在容器内运行应用程序，使用`docker run `命令在容器中运行一个应用程序。如下：将会输出一个`Hello world`。

```
$ docker run ubuntu:15.10 /bin/echo "Hello world"
$ Hello world
```

<!--more-->

* docker`: Docker的二进制执行文件
* `run`：与前面的docker组合来运行一个容器
* `ubuntu:15.10` 指定要运行的镜像，Docker首先从本地主机上查找镜像是否存在，如果不存在，Docker就会从镜像仓库DockerHub下载公共镜像。
* `/bin/echo "Hello world"`：在启动的容器中执行的命令

以上的代码大概意思是：Docker以ubuntu15.10镜像创建一个新容器，然后再容器里执行`/bin/echo "Hello world"`,输出结果

## 运行交互式容器

有时我们需要自己进入容器的命令行来执行一些操作，这种情况显然是可以的。

```
docker -i -t ubuntu:15.10 /bin/bash
```

这样的话，就会进入容器`ubuntu:15.10`内的命令行。

* `-t`:再新容器中指定一个伪终端或终端
* `-i`:允许你在容器内的标77bd8交互

当出现类似于`root@0123ce188bd8:/#`,表示我们已经进入一个``ubuntu15.10`系统的容器了，我们可以运行下`ls`查看当前目录的文件。

### 退出

在可交互式容器中输入`exit`,或者Ctrl+D来退出容器。

## 以进程方式启动容器

使用以下命令创建一个进程式容器：

```
$ docker run -d ubuntu:15.10 /bin/sh -c "while true;do echo hello world;sleep 1;done"
一长串的字符
```

上面一长串的字符叫做容器ID，对于容器来说，这是唯一的。我们可以通过容器ID来查看容器发生了什么。当然，我们需要确认是否有容器在运行：`docker ps`

![image-20200426220150273](/images/image-20200426220150273.png)

如果，我们可以看到有一个容器。

| 字段         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| CONTAINER ID | 容器ID                                                       |
| IMAGE        | 使用的镜像                                                   |
| COMMAND      | 启动容器时运行的命令                                         |
| STATUS       | 容器状态(7种)<br />create(已创建)     restarting(重启中)     running(运行中)<br />removing(迁移种)     paused(暂停)     exited(停止)    dead(死亡) |
| PORT         | 容器的端口细腻些和使用的链接类型（tcp\udp）                  |
| NAME         | 启动分配的容器名称                                           |

为了查看宿主主机内的输出，我们可以运行`docker logs ***`，后面表示ID或者容器名称

![image-20200426220812571](/images/image-20200426220812571.png)

### 停止容器

```
docker ps  # 查看容器的信息
docker stop *** # 后面接ID或者容器名称
docker ps # 看到容器已经不在了
```

