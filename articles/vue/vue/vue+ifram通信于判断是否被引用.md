---
typora-root-url: vue+iframe通信于判断是否被引用
title: vue+iframe通信于判断是否被引用
date: 2020-04-25 11:58:02
tags:
categories: vue
comments: true
---



## 父页面

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    #framePage{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
    }
</style>
<body>
    <script>
      window.onload = function() {
        var frame = document.getElementById('framePage');
        // 发送消息
        frame.contentWindow.postMessage({hide:true},'*');
      }
    </script>
    <iframe id="framePage" src="http://localhost:9528/#/dashboard" frameborder="0"></iframe>
</body>
</html>

```

## 子页面

我用的vue，因此用vue做示例，我的写在了main.js里：

```
window.addEventListener('message', function(event) {
  if (event.data.hide) {
    store.state.isHideAll = true
  }
}, false)
//判断是不是被iframe引用了
if (window.self !== window.top) {
  store.state.isHideAll = true
}
```

这样就被store管理了，在vue里也能够实时更新

