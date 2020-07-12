---
typora-root-url: pm2常用命令
title: pm2常用命令
date: 2020-07-05 10:52:16
tags:
categories: 
comments: true
top: false
---

> 主题：
> 概述：

<!--正文-->
<!--more-->

### 安装

```
npm install pm2 -g
npm install pm2@latest -g
npm install git://github.com/Unitech/pm2#master -g
```

### 升级安装

```
npm install pm2@latest -g
pm2 update  #Update in memory pm2
```

### 启动一个应用

```shell
pm2 start <app_name|id|all>  #可以指定应用名称pm2 start app,js --name=test
pm2 start app.js -i 4 --name "episode"   #-i 4 表示启动四个app.js, 也可以-i max 将会最大限度利用cpu核心数目 --name 用于命名进程
pm2 start app.js
pm2 start app.js -i 1  #cluster_mode
pm2 start app.js -i 0  #支持使用多核 CPU
pm2 start big-app.js --max-memory-restart 20M
cluster_mode 需要Node 0.11.x 以上，否则请用fork mode。
```

```shell
 # PM2下使用 执行npm命令
 pm2 start  npm -- run dev #--> npm run dev
 pm2 start npm -- start  #--> npm start
 # 命名进程
 pm2 start  npm --name test -- run dev
 pm2 start npm --name test -- start 
 # 语法：
 # pm2 start npm --watch --name <taskname> -- run <scriptname>;
```

### 关闭一个应用

```shell
# 通过别名关闭
pm2 stop web-interface
```

### 关闭与重启

```
# 都是通过别名
# 关闭
pm2 stop web-interface
# 重启
pm2 restart web-interface
```

### 更新环境变量

```
NODE_ENV=production pm2 restart web-interface --update-env
```

### 删除应用

```
pm2 delete web-interface
```

### 传递参数

```
pm2 start app.js -- -p 8080 
pm2 start app.js --node-args="--debug=7001 --trace-deprecation"
```

### 命名应用

```
NODE_ENV=production pm2 start index.js -n Ghost
```

### 生成服务脚本

```
pm2 startup <ubuntu|centos|gentoo|systemd>  #产生init脚本，保持进程活着
```

### 查看信息

```
pm2 list          # 显示所有进程状态
pm2 jlist         # Print process list in raw JSON
pm2 prettylist    # Print process list in beautified JSON
pm2 info 0        # Display all informations about a specific process
```

### 运行控制

```
pm2 stop 0             # 停止指定进程
pm2 stop all           # 停止所有进程
pm2 restart 0          # Restart specific process id
pm2 restart all        # 重启所有进程
pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list
pm2 reload 0           # 类似restart，0秒重载，支持 cluster_mode
pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)
pm2 gracefulReload all # Send exit message then reload (for networked apps)
pm2 dump               # ~/.pm2/dump.pm2
pm2 kill               # 杀掉PM2
pm2 resurrect          # 复活所有进程
```

### 代码监控

```
pm2 start app.js --watch  # 代码修改自动重启
pm2 stop 0                # not stop watching
pm2 stop --watch 0        # stop watching
```

### 运行监测

```
pm2 monit              # Monitor all processes
```

### 日志

```
pm2 logs               # 显示所有进程日志
pm2 ilogs              # Advanced termcaps interface to display logs
pm2 flush              # Empty all log file
pm2 reloadLogs         # Reload all logs
```

### 杂项

```sehll
pm2 ping  # Ensure pm2 daemon has been launched
pm2 reset <process>  # Reset meta data (restarted time...)
pm2 sendSignal SIGUSR2 my-app  # Send system signal to script
pm2 start app.js --no-daemon  # run pm2 daemon in the foreground
pm2 describe id|all #查看启动程序的详细信息
pm2 web  #API(端口:9615)
```

### 实例

**管理Ghost**

```sehll
cd /path/to/ghost/folder
echo "export NODE_ENV=production" >> ~/.profile
source ~/.profile
pm2 kill
pm2 start index.js --name "Ghost"

# Ghost已经运行在PM2管理下
pm2 ls
pm2 stop <process ID>
pm2 monit
pm2 logs

#生成服务启动脚本：/etc/init.d/pm2-init.sh。只会将pm2 list中的应用加入服务启动脚本，确保需要启动的应用就在其中。不要使用root账户(下面用的是ghost账户)。
pm2 startup ubuntu

#生成命令如下：包含node路径，用户账户。执行即可
sudo env PATH=$PATH:/usr/local/bin pm2 startup ubuntu -u ghost
pm2 save或reboot
```



> 参考资料
>
> https://pm2.keymetrics.io/docs/usage/process-management/