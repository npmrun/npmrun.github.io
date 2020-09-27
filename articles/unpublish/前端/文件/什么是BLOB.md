---
typora-root-url: 什么是BLOB
title: 什么是BLOB
date: 2020-09-25 10:43:48
tags:
categories: 
comments: true
top: false
---

> 概述：什么是BLOB?

<!--正文-->
<!--more-->

# Blob 是什么

`Blob（Binary Large Object）`表示二进制类型的大对象。在数据库管理系统中，将二进制数据存储为一个单一个体的集合。

`Blob `对象表示一个不可变、原始数据的类文件对象。`Blob `表示的不一定是`JavaScript`原生格式的数据。`File` 接口基于`Blob`，继承了 `blob` 的功能并将其扩展使其支持用户系统上的文件。

## blob与复制粘贴

**粘贴** 有时会遇到 在输入框拦截图片进行上传的场景，这时候就是监听paste事件，并获取剪切板内的文件

```
handlePaste (e) {
  if (this.paste) {
    this.uploadFiles(e.clipboardData.files);
  }
}
```

我们拿到的files就是基于blob的file类型。你可以使用`FileReader`的所有方法将blib变成你想要的样子

**复制** 有时候我们需要点击按钮或右键菜单触发一个复制事件，将文本或图片扔进剪切板里。这时候我们也需要生成一个blob对象 如果是文本对象

```
"text/html": new Blob(["<i>Markup</i> <b>text</b>. Paste me into a rich text editor."], { type: "text/html" }),
"text/plain": new Blob(["Fallback markup text. Paste me into a rich text editor."], { type: "text/plain" })
```

如果是图片等文件类型数据，就需要自己fetch请求下载图片为blob，然后扔到剪切板里

```
 new ClipboardItem({
     [blob.type]: blob
 })
```

