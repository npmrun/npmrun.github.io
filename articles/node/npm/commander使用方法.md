---
typora-root-url: commander使用方法
title: commander使用方法
date: 2020-04-27 09:44:53
tags:
categories:
comments: true
---

[npm commander](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#parse-%e5%92%8c-parseasync)

## 初步使用

**安装**

```
npm i commander --save-dev
```

**Hello World**

`main.js`

```
#!/usr/bin/env node
const { Command } = require('commander');

const program = new Command();
program
  .version('0.1.0')
  .command('rmdir <dir> [otherDirs...]')
  .action(function (dir, otherDirs) {
    console.log('rmdir %s', dir);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  });

program.parse(process.argv);
```

**可执行文件**

在`package.json`中添加以下字段，确保`dist/main.js`是一个可执行文件

```
{
	***
	"bin": {
       "gamecli": "dist/main.js"
    },
    ***
}
```

在项目的根路径下执行：`npm link`,会自动添加可执行文件,等待完成之后，执行`gamecli -V`就能看到效果了。