---
typora-root-url: hexo在github上的自动化部署
title: hexo在github上的自动化部署
date: 2020-04-17 00:03:50
tags:
categories: hexo
comments: true
---



> 这几天被GithubActions和git-lfs坑的不轻啊，在使用Actions进行自动化部署的时候，我用的百度出来的那个Actions部署库，由于不支持lfs的功能，一直就失败。经过多次尝试，我终于找到了一个能够用的库了。谢天谢地，不然真得抑郁死。

<!--more-->

# 起因

我是添加了对仓库的`git-lfs`的支持，使得能够存储大文件，而且`.git`文件也会小很多。

`git lfs track "*.zip"`,执行这个命令之后提交的`zip`文件才会被记录。



### 原有`Actions`

```
name: GitHub Actions Build and Deploy Hexo
on:
  push:
    branches:
      - source
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master
      with:
        ref: source
        lfs: true
    - name: Install and Build 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
      run: |
        npm install
        npx gulp clean
        npx gulp
        npx hexo clean
        npx hexo generate
    - name: Build and Deploy
      uses: JamesIves/github-pages-deploy-action@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BASE_BRANCH: source
        BRANCH: master
        FOLDER: public
```

上面的`JamesIves/github-pages-deploy-action@master`根本不支持`lfs`

，结果我傻傻的搞了差不多一天。

### 改变之后的`Action`

```
name: GitHub Actions Build and Deploy Hexo
on:
  push:
    branches:
      - source
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master
      with:
        submodules: true
        lfs: true
    - name: Install and BuildA 🔧 # This example project is built using npm and outputs the result to the 'build' folder. Replace with the commands required to build your project, or remove this step entirely if your site is pre-built.
      run: |
        npm install
        npx gulp clean
        npx gulp
        npx hexo clean
        npx hexo generate
    - name: Deploy
      uses: alex-page/blazing-fast-gh-pages-deploy@v1.1.0
      with:
        repo-token: ${{ secrets.ACCESS_TOKEN }}
        site-directory: ./public
        commit-message: fuck
        deploy-branch: master
```

Fuck,齐活！！！