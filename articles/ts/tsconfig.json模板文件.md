---
typora-root-url: tsconfig.json模板文件
title: tsconfig.json模板文件
date: 2020-06-09 09:14:43
tags:
categories: ts
comments: true
top: false
---

```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./source/*"]
    }
  },
  "exclude": [
    "node_modules"
  ]
}

```

