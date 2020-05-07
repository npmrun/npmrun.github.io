---
typora-root-url: node后端解决跨域
title: node后端解决跨域
date: 2020-04-25 10:53:16
tags:
categories:
comments: true
---



> 注意这个Access-Control-Allow-Headers,当然也可以设置为*

```
const express = require('express');
const app= express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
//   Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//这里虽说省略也可以，但是改成404就不行，因为会自动返回200
app.options('/member/api/game/authorization', (req, res)=>{
    res.sendStatus(200);
});
app.post('/member/api/game/authorization', (req, res)=>{
    res.send({aa:123});
});
app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})
```

后端针对跨域的两个条件：

* options请求返回200 （复杂请求会有预检请求）

* 响应携带允许跨域的请求头

  ```
  Access-Control-Allow-Origin
  Access-Control-Allow-Headers
  Access-Control-Allow-Methods
  ```

  