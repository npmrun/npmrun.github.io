---
typora-root-url: scss主题切换功能
title: scss主题切换功能
date: 2020-05-14 14:01:07
tags:
categories:
comments: true
---

> 主题：scss主题切换功能
> 概述：该文章主要为了实现css切换主题的功能，这只是一种方法，别的方式也可以实现。

<!--正文-->
<!--more-->



结构类似下面这样：

![image-20200514140159247](/images/image-20200514140159247.png)

**`index.html`**

```
<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./index.css">
</head>

<body data-theme="light">
    <div class="app-home">
        dsakdjsafs
    </div>
</body>
</html>

```

**`index.scss`**

```
@import './_themeify.scss';

.app-home {
  font-size: 18px;
  @include themeify {
    color: themed('text-color-primary');
  }
}
```

**`_themeify.scss`**

```
@import './_themes.scss';

@mixin themeify {
  @each $theme-name, $theme-map in $themes {
    $theme-map: $theme-map !global;
    body[data-theme=#{$theme-name}] & {
      @content;
    }
  }
}

@function themed($key) {
  @return map-get($theme-map, $key);
}
```

**`_themes.scss`**

```
$themes: (
        default: (
          /* font-size */
                font-size-default: 14px,
                font-size-lg: 16px,
                font-size-sm: 12px,
                color-white: #FFF,
          /* Color */
                color-success: #13CE66,
                color-error: #FF4949,
                color-warning: #FFC82C,
                color-info: #78A4FA,
          // Text Color
                text-color-primary: #dc2b34,
                text-color-white: #ffffff,
                text-color-black: #000000,
                text-color-default: #4a4a4a,
                text-color-placeholder: #C9C9C9,
                text-color-disabled: #CCCCCC,
          // Background Color
                bg-color-primary: #d91720,
                bg-color-primary-light: #b51d29,
                bg-color-white: #ffffff,
                bg-color-grey: #F7F7F7,
                bg-color-light: #ECF5FD,
                bg-color-verifycode: #cfcfcf,
          // Border Color
                borer-color-primary: #e64644,
                borer-color-primary-light: #dc2b34,
                borer-color-white: #ffffff,
                borer-color-default: #CCCCCC,
          // Link Color
                link-color-primary: #d91721,
                link-color-primary-light: #b51d29,
                link-color: #6190E8,
                link-color-light: #79A1EB,
                link-color-disabled: #BFBFBF,
          // Icon Color
                icon-color-base: #CCC,
        ),
        light: (
          /* font-size */
                font-size-default: 14px,
                font-size-lg: 16px,
                font-size-sm: 12px,
                color-white: #FFF,
          /* Color */
                color-success: #13CE66,
                color-error: #FF4949,
                color-warning: #FFC82C,
                color-info: #78A4FA,
          // Text Color
                text-color-primary: #78A4FA,
                text-color-white: #ffffff,
                text-color-black: #000000,
                text-color-default: #4a4a4a,
                text-color-placeholder: #C9C9C9,
                text-color-disabled: #CCCCCC,
          // Background Color
                bg-color-primary: #d91720,
                bg-color-primary-light: #b51d29,
                bg-color-white: #ffffff,
                bg-color-grey: #F7F7F7,
                bg-color-light: #ECF5FD,
                bg-color-verifycode: #cfcfcf,
          // Border Color
                borer-color-primary: #e64644,
                borer-color-primary-light: #dc2b34,
                borer-color-white: #ffffff,
                borer-color-default: #CCCCCC,
          // Link Color
                link-color-primary: #d91721,
                link-color-primary-light: #b51d29,
                link-color: #6190E8,
                link-color-light: #79A1EB,
                link-color-disabled: #BFBFBF,
          // Icon Color
                icon-color-base: #CCC,
        ),
);

```

> 上面只需要切换`data-theme`的名字就行了，一共内置了两套主题。

**编译过后的css**

```
@charset "UTF-8";
.app-home {
  font-size: 18px; }
  body[data-theme=default] .app-home {
    color: #dc2b34; }
  body[data-theme=light] .app-home {
    color: #78A4FA; }

```

可以看出就是做了两套兼容而已。

