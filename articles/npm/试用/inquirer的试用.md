---
typora-root-url: inquirer的试用
title: inquirer的试用
date: 2020-06-23 10:31:48
tags:
categories: npm
comments: true
top: false
---

> 开始通过npm init 创建package.json的时候就有大量与用户的交互(当然也可以通过参数来忽略输入)；而现在大多数工程都是通过脚手架来创建的，使用脚手架的时候最明显的就是与命令行的交互，如果想自己做一个脚手架或者在某些时候要与用户进行交互，这个时候就不得不提到inquirer.js了。

### 介绍

由于交互的问题种类不同，`inquirer`为每个问题提供很多参数：

* type：表示提问的类型，包括：`input`, `confirm`, `list`, `rawlist`, `expand`, `checkbox`, `password`, `editor`；

* name: 存储当前问题回答的变量；

* message：问题的描述；

* default：默认值；

* choices：列表选项，在某些`type`下可用，并且包含一个分隔符(separator)；
* validate：对用户的回答进行校验；
* filter：对用户的回答进行过滤处理，返回处理后的值；
* transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
* when：根据前面问题的回答，判断当前问题是否需要被回答；
* pageSize：修改某些type类型下的渲染行数；
* prefix：修改message默认前缀；
* suffix：修改message默认后缀

> 上面的属性(除`transformer`外)在下面都有对应使用。

### 使用

#### 语法结构

```
const inquirer = require('inquirer');

const promptList = [
    // 具体交互内容
];

inquirer.prompt(promptList).then(answers => {
    console.log(answers); // 返回的结果
})
```

#### input

```
const promptList = [{
    type: 'input',
    message: '设置一个用户名:',
    name: 'name',
    default: "test_user" // 默认值
},{
    type: 'input',
    message: '请输入手机号:',
    name: 'phone',
    validate: function(val) {
        if(val.match(/\d{11}/g)) { // 校验位数
            return val;
        }
        return "请输入11位数字";
    }
}];
```

效果：

![input](/images/20180526163529495.jpg)

#### confirm

```
const promptList = [{
    type: "confirm",
    message: "是否使用监听？",
    name: "watch",
    prefix: "前缀"
},{
    type: "confirm",
    message: "是否进行文件过滤？",
    name: "filter",
    suffix: "后缀",
    when: function(answers) { // 当watch为true的时候才会提问当前问题
        return answers.watch
    }
}];
```

效果：

![confirm_y](/images/20180526171059692.jpg)

![confirm_n](/images/20180526171118828.jpg)

#### list

```
const promptList = [{
    type: 'list',
    message: '请选择一种水果:',
    name: 'fruit',
    choices: [
        "Apple",
        "Pear",
        "Banana"
    ],
    filter: function (val) { // 使用filter将回答变为小写
        return val.toLowerCase();
    }
}];
```

效果：

![list_1](/images/20180526171358697.jpg)

![list](/images/20180526171252867.jpg)

#### rawlist

```
const promptList = [{
    type: 'rawlist',
    message: '请选择一种水果:',
    name: 'fruit',
    choices: [
        "Apple",
        "Pear",
        "Banana"
    ]
}];
```

效果：

![rawlist](/images/20180526171501268.jpg)

#### expand

```
const promptList = [{
    type: "expand",
    message: "请选择一种水果：",
    name: "fruit",
    choices: [
        {
            key: "a",
            name: "Apple",
            value: "apple"
        },
        {
            key: "O",
            name: "Orange",
            value: "orange"
        },
        {
            key: "p",
            name: "Pear",
            value: "pear"
        }
    ]
}];
```

效果：

![expend_1](/images/2018052617182848.jpg)

![expend_2](/images/2018052617184757.jpg)

#### checkbox

```
const promptList = [{
    type: "checkbox",
    message: "选择颜色:",
    name: "color",
    choices: [
        {
            name: "red"
        },
        new inquirer.Separator(), // 添加分隔符
        {
            name: "blur",
            checked: true // 默认选中
        },
        {
            name: "green"
        },
        new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
        {
            name: "yellow"
        }
    ]
}];
// 或者下面这样
const promptList = [{
    type: "checkbox",
    message: "选择颜色:",
    name: "color",
    choices: [
        "red",
        "blur",
        "green",
        "yellow"
    ],
    pageSize: 2 // 设置行数
}];
```

效果：

![checkbox_sep](/images/20180526172231673.jpg)

![checkbox_size](/images/20180526172246307.jpg)

#### password

```
const promptList = [{
    type: "password", // 密码为密文输入
    message: "请输入密码：",
    name: "pwd"
}];
```

效果：

![pwd](/images/2018052617241416.jpg)

#### editor

```
const promptList = [{
    type: "editor",
    message: "请输入备注：",
    name: "editor"
}];
```

效果：

![editor_inset](/images/20180526172640212.jpg)

![editor_res](/images/20180526172652359.jpg)