---
typora-root-url: Nginx中server_name 参数详解
title: Nginx中server_name 参数详解
date: 2020-06-11 12:01:02
tags:
categories: 
comments: true
---

Nginx中的`server_name`指令主要用于配置基于名称的虚拟主机，`server_name`指令在接到请求后的匹配顺序分别为：

1、准确的server_name匹配，例如：

```
server {
     listen       80;
     server_name  domain.com  www.domain.com;
     ...
}
```

2、以*通配符开始的字符串：

```
server {
     listen       80;
     server_name  *.domain.com;     ...
}
```

3、以*通配符结束的字符串：

```
server {
     listen       80;
     server_name  www.*;
     ...
}
```

4、匹配正则表达式：

```
server {
     listen       80;
     server_name  ~^(?.+)\.domain\.com$;     ...
}
```

`nginx`将按照1,2,3,4的顺序对`server name`进行匹配，只有有一项匹配以后就会停止搜索，所以我们在使用这个指令的时候一定要分清楚它的匹配顺序（类似于`location`指令）。

`server_name`指令一项很实用的功能便是可以在使用正则表达式的捕获功能，这样可以尽量精简配置文件，毕竟太长的配置文件日常维护也很不方便。下面是2个具体的应用：

1、在一个server块中配置多个站点：

```
server
   {
     listen       80;
     server_name  ~^(www\.)?(.+)$;
     index index.php index.html;
     root  /data/wwwsite/$2;
   }
```

站点的主目录应该类似于这样的结构：

```
/data/wwwsite/domain.com
/data/wwwsite/nginx.org
/data/wwwsite/baidu.com
/data/wwwsite/google.com
```

这样就可以只使用一个server块来完成多个站点的配置。

2、在一个server块中为一个站点配置多个二级域名。

实际网站目录结构中我们通常会为站点的二级域名独立创建一个目录，同样我们可以使用正则的捕获来实现在一个server块中配置多个二级域名：

```
server
   {
     listen       80;
     server_name  ~^(.+)?\.domain\.com$;     
     index index.html;
     if ($host = domain.com){         
     	rewrite ^ http://www.domain.com permanent;     
     }
     root  /data/wwwsite/domain.com/$1/;   
   }
```

站点的目录结构应该如下：

```
/data/wwwsite/domain.com/www/
/data/wwwsite/domain.com/nginx/
```

这样访问www.domain.com时root目录为/data/wwwsite/domain.com/www/，nginx.domain.com时为/data/wwwsite/domain.com/nginx/，以此类推。

后面if语句的作用是将domain.com的方位重定向到www.domain.com，这样既解决了网站的主目录访问，又可以增加seo中对www.domain.com的域名权重。

`server_name `同样也可以使用 ip进行匹配，以下是自己使用IP进行配置单的：

```
  upstream web_app {
   server 127.0.0.1:8080 weight=1 max_fails=2 fail_timeout=30s;
   server 127.0.0.1:8081 weight=1 max_fails=2 fail_timeout=30s;
 }
  server{
  listen 8093;
  \#server_name 127.0.0.1:8093;
  server_name 192.168.47.128:8093
  access_log  logs/host.access.log  main;
  location /
  {
  proxy_next_upstream http_502 http_504 error timeout invalid_header;
  proxy_set_header Host  $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_pass http://web_app;
  expires    3d;
  }
```

以上配置的为用两个tomcat做负载均衡，分别为8080、8081，当通过 192.168.47.128:8093 访问时会随机分配到这两个tomcat上,但是在配置时我把 listen 换成 80 就会访问不到，原因还没弄清楚，有知道原因的还请留言告知，不胜感激！！！！