---
typora-root-url: nginx反向代理
title: nginx反向代理
date: 2020-09-15 10:56:34
tags:
categories: 
comments: true
top: false
---

> 概述：简要记录下nginx反向代理

<!--正文-->
<!--more-->

```
server
{
    listen 80; # 默认监听的端口
    server_name frp.poorman.top www.frp.poorman.top; // 域名访问地址，按需修改

    location / { // 当访问/目录时，执行下面的配置
      proxy_pass http://127.0.0.1:7001; // 代理到7001端口
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Host $host; 
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_redirect off;
    }
}
```

