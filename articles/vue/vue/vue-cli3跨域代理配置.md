---
typora-root-url: vue-cli3跨域代理配置
title: vue-cli3跨域代理配置
date: 2020-04-25 14:08:22
tags:
categories: vue
comments: true
---



> 配置只能作用于本地，开发模式下，axios请不要设置默认服务器网址，这个在`vue.config.js`中设置。![image-20200425141012188](/images/image-20200425141012188.png)

`vue.config.js`:

```
module.exports = {
	***
	devServer: {
		port: port, // 本地服务的端口
		open: true, // 启动之后是否自动打开浏览器
		proxy: {
          '/member': {	//配置`/member`开头的网址
            target: 'http://0000000:9002', //请替换成你自己的服务器地址
            ws: false, // 是否代理websockets
            changeOrigin: true, // 默认是false：请求头中host仍然是浏览器发送过来的host
            pathRewrite: {
              // '^/member': '' // 重写路径，这个的意思是去掉了/member
            }
          }
        }
	}
	***
}
```

