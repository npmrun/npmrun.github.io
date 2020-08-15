---
typora-root-url: uniapp推荐
title: uniapp推荐
date: 2020-08-13 11:59:22
tags:
categories: 
comments: true
top: false
---

> 主题：
> 概述：

<!--正文-->
<!--more-->

### [image-tools](https://ext.dcloud.net.cn/plugin?id=123) 

图像转换工具，可用于图像和base64的转换

可配合uni.saveImageToPhotosAlbum保存相册

```
				base64ToPath(this.qrcode)
				  .then(path => {
				    uni.saveImageToPhotosAlbum({
				    	filePath: path,
				    	success: function() {
				    		that.$toast('保存成功');
				    		that.$hideLoading()
				    	},
				    	fail: err => {
				    		that.$toast('保存失败');
				    		that.$hideLoading()
				    	}
				    });
				  })
				  .catch(error => {
				    console.error(error)
				  })
```

