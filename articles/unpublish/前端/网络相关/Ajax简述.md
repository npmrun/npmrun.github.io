---
typora-root-url: Ajax简述
title: Ajax简述
date: 2020-07-05 21:46:16
tags:
categories: 
comments: true
top: false
---

> 主题：Ajax的使用与意义
> 概述：为了加深基础的理解，能够在不借助库的情况下实现不同方式的请求才能够更好的理解那些异步请求库的工作流程

<!--正文-->
<!--more-->

**AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。**

如上，我们不需要重新加载页面就能够更新页面的数据，AJAX的出现意味着颠覆了传统的开发模式，使得页面更加的流畅，用户体验能够做到极致。

其中，**XMLHttpRequest 是 AJAX 的基础。**

## 什么是XMLHttpRequest 呢？

所有现代浏览器均支持 `XMLHttpRequest` 对象（IE5 和 IE6 使用 `ActiveXObject`）。

`XMLHttpRequest` 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

## 发送一个请求

我们需要分几步实现：

1. 创建 XMLHttpRequest 对象
2. 确定请求方式以及传递的数据
3. 接收数据的递回做下一步的处理

### 创建 XMLHttpRequest 对象

由于老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象，为了做部分的兼容，我们可以做以下的方式的创建：

```javascript
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
```

### 向服务器发送请求

现在我们可以配置需要发送给服务器数据的东西了。

一般来说，只需要下面这两个就能够发送了：

```javascript
xmlhttp.open("GET","test1.txt",true);
xmlhttp.send();
```

> | 方法                     | 描述                                                         |
> | :----------------------- | :----------------------------------------------------------- |
> | `open(method,url,async)` | 规定请求的类型、URL 以及是否异步处理请求。*method*：请求的类型；`GET` 或 `POST`*url*：文件在服务器上的位置`async：true`（异步）或 false（同步） |
> | `send(string)`           | 将请求发送到服务器。*string*：仅用于 POST 请求               |

> **GET 还是 POST？**
>
> 与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。
>
> 然而，在以下情况中，请使用 POST 请求：
>
> - 无法使用缓存文件（更新服务器上的文件或数据库）
> - 向服务器发送大量数据（POST 没有数据量限制）
> - 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
>
> **GET**
>
> ```javascript
> xmlhttp.open("GET","demo_get.asp",true);
> xmlhttp.send();
> ```
>
> **POST**
>
> ```javascript
> xmlhttp.open("POST","demo_post.asp",true);
> xmlhttp.send();
> ```

**设置请求头**

请求头也是一个必须要配置的东西：

```javascript
xmlhttp.open("POST","ajax_test.asp",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send("fname=Bill&lname=Gates");
```

> | 方法                             | 描述                                                         |
> | :------------------------------- | :----------------------------------------------------------- |
> | `setRequestHeader(header,value)` | 向请求添加 HTTP 头。*header*: 规定头的名称*value*: 规定头的值 |

#### 有关同步与异步的分别

**`Async = true`**(异步)

当使用 `async=true` 时，请规定在响应处于 `onreadystatechange` 事件中的就绪状态时执行的函数：

```javascript
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","test1.txt",true);
xmlhttp.send();
```

**`Async = false`**（同步）

如需使用 `async=false`，请将 open() 方法中的第三个参数改为 false：

```
xmlhttp.open("GET","test1.txt",false);
```

我们不推荐使用` async=false`，但是对于一些小型的请求，也是可以的。

请记住，JavaScript 会等到服务器响应就绪才继续执行。如果服务器繁忙或缓慢，应用程序会挂起或停止。

**注释：**当您使用` async=false` 时，请不要编写 `onreadystatechange` 函数 - 把代码放到 send() 语句后面即可：

```
xmlhttp.open("GET","test1.txt",false);
xmlhttp.send();
document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
```

### 服务器响应

如需获得来自服务器的响应，请使用 `XMLHttpRequest` 对象的 `responseText` 或 `responseXML` 属性。

| 属性           | 描述                       |
| :------------- | :------------------------- |
| `responseText` | 获得字符串形式的响应数据。 |
| `responseXML`  | 获得 XML 形式的响应数据。  |

**`responseText`属性**

如果来自服务器的响应并非 XML，请使用 `responseText` 属性。

`responseText` 属性返回字符串形式的响应，因此您可以这样使用：

**`responseXML` 属性**

如果来自服务器的响应是 XML，而且需要作为 XML 对象进行解析，请使用 `responseXML `属性：

请求 [books.xml](https://www.w3school.com.cn/example/xmle/books.xml) 文件，并解析响应：

```javascript
xmlDoc=xmlhttp.responseXML;
txt="";
x=xmlDoc.getElementsByTagName("ARTIST");
for (i=0;i<x.length;i++)
  {
  txt=txt + x[i].childNodes[0].nodeValue + "<br />";
  }
document.getElementById("myDiv").innerHTML=txt;
```

### 附录（`onreadystatechange` 事件）

当请求被发送到服务器时，我们需要执行一些基于响应的任务。

每当 `readyState` 改变时，就会触发 `onreadystatechange` 事件。

`readyState` 属性存有 `XMLHttpRequest` 的状态信息。

下面是 `XMLHttpRequest` 对象的三个重要的属性：

| 属性                 | 描述                                                         |
| :------------------- | :----------------------------------------------------------- |
| `onreadystatechange` | 存储函数（或函数名），每当 `readyState` 属性改变时，就会调用该函数。 |
| `readyState`         | 存有 `XMLHttpRequest` 的状态。从 0 到 4 发生变化。0: 请求未初始化1: 服务器连接已建立2: 请求已接收3: 请求处理中4: 请求已完成，且响应已就绪 |
| status               | 200: "OK"404: 未找到页面                                     |

在 `onreadystatechange` 事件中，我们规定当服务器响应已做好被处理的准备时所执行的任务。

当 `readyState` 等于 4 且状态为 200 时，表示响应已就绪：

```
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
```

> **注释：**`onreadystatechange` 事件被触发 5 次（0 - 4），对应着 `readyState `的每个变化。

> 来源：
>
> [w3school](https://www.w3school.com.cn/ajax/ajax_intro.asp)