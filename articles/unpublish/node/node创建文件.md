---
typora-root-url: node创建文件
title: node创建文件
date: 2020-04-22 11:03:17
tags:
categories: 
comments: true
---



### NodeJS 10+

> fs.mkdir已经增加递归选项

```
fs.mkdir('/tmp/test/www.inull.cn', { recursive: true }, (err) => {
    if (err) throw err;
});
```

<!--more-->

### NodeJS 9以前版本

同步方案

```javascript
var fs = require('path')
var path = require('path')
/**
 * 同步递归创建路径
 *
 * @param  {string} dir   处理的路径
 * @param  {function} cb  回调函数
 */
var $$mkdir = function(dir, cb) {
    var pathinfo = path.parse(dir)
    if (!fs.existsSync(pathinfo.dir)) {
        $$mkdir(pathinfo.dir,function() {
            fs.mkdirSync(pathinfo.dir)
        })
    }
    cb && cb()
}

$$mkdir(path.join(__dirname, 'demo/test/123/'))
```

异步方案

暂缓