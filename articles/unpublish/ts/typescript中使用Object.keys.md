---
typora-root-url: typescript中使用Object.keys
title: typescript中使用Object.keys
date: 2020-07-30 13:01:28
tags:
categories: 
comments: true
top: false
---

> 主题：开发中使用typescript的时候，经常会遇到使用 **Object.keys** 这个方法报错的情况
> 概述：同上

<!--正文-->
<!--more-->

### **错误场景1**

```
var foo = {
    a: '1',
    b: '2'
}

var getPropertyValue = Object.keys(foo).map(item => foo[item]) // 这里会有typescript的错误提示
```

![img](/images/438725-20200724142551179-1806871177.png)![img](/images/438725-20200724142633481-22886824.png)

### **错误场景2**

```
var foo = {
    a: '1',
    b: '2'
}

function getPropertyValue(obj, key) { // 这里也会提示obj会有any类型
    return obj[key]
}
```

### **场景1解决方案:**

通过 **keyof** 的方式可以获取ts 类型的属性key的值

```
var foo = {
    a: '1',
    b: '2'
}
// 这里typeof foo => foo的类型 等同于 interface Foo { a: string; b: string; }// typeof foo === Foo，这里只所以用 typeof foo，因为这样方便，对于不想写interface的直接量对象很容易获取它的类型// keyof typeof foo这里只获取 Foo的类型的key值，注意这个keyof后面一定是 typescript的类型

type FooType = keyof typeof foo;
var getPropertyValue = Object.keys(foo).map(item => foo[item as FooType])
```

### **场景2解决方案:**

```
var foo = {
    a: '1',
    b: '2'
}
// 这里声明了两个泛型 T 和 K// T 代表函数第一个参数的类型，K 代表函数第二个参数的类型这个类型指向第一个参数类型中包含的key的值function getPropertyValue<T, K extends keyof T>(obj:T, key:K):T[K] {
    return obj[key]
}
getPropertyValue(foo, 'a')
```