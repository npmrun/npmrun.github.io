---
typora-root-url: CSS可替换元素
title: CSS可替换元素
date: 2020-06-14 18:34:12
tags:
categories:
comments: true
top: false
---

## 解释

在 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 中，**可替换元素**（**replaced element**）的展现效果不是由 CSS 来控制的。这些元素是一种外部对象，它们外观的渲染，是独立于 CSS 的。

<!--more-->

简单来说，它们的内容不受当前文档的样式的影响。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。某些可替换元素，例如 `[<iframe>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe) `元素，可能具有自己的样式表，但它们不会继承父文档的样式。

CSS 能对可替换元素产生的唯一影响在于，部分属性支持控制元素内容在其框中的位置或定位方式。有关详细信息，请参阅本文下面的[控制内容框中的对象位置](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element#控制内容框中的对象位置)。

## 可替换元素

典型的可替换元素有：

* `<iframe>` https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe

* `<video>` https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video

* `<embed>` https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed

* `<img>` https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img

有些元素仅在特定情况下被作为可替换元素处理，例如：

- [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option)
- [`audio`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)
- [`canvas`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)
- [`object`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object)
- [`applet`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/applet)

HTML 规范也说了 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素可替换，因为 `"image"` 类型的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素就像[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)一样被替换。但是其他形式的控制元素，包括其他类型的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素，被明确地列为非可替换元素（non-replaced elements）。该规范用术语小挂件（Widgets）来描述它们默认的限定平台的渲染行为。

用 CSS [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性插入的对象是匿名的可替换元素。它们并不存在于 HTML 标记中，因此是“匿名的”。

## CSS 与可替换元素

CSS 在某些情况下会对可替换元素做一些特殊处理，比如计算外边距（[`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin)）和一些 `auto` 的具体值。

需要注意的是，一部分（并非全部）可替换元素，其本身具有的尺寸和基线（baseline）会被一些 CSS 属性用到，加入计算之中，例如 [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)。只有可替换元素才能具有这种自带值。

>  控制内容框中的对象位置

某些CSS属性可用于指定 可替换元素中包含的内容对象 在该元素的盒区域内的位置或定位方式。这些属性的具体定义可以在 [CSS Images Module Level 3](https://drafts.csswg.org/css-images-3/) 和 [CSS Images Module Level 4](https://drafts.csswg.org/css-images-4/) 规范中找到：

[`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

指定可替换元素的内容对象在元素盒区域中的填充方式。（有些类似于 [`background-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size) ）

[`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)

指定可替换元素的内容对象在元素盒区域中的位置。（类似于 [`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position) ）

> ## 参见
>
> - https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element
> - 可替换元素的 [HTML 规范](https://html.spec.whatwg.org/multipage/rendering.html#replaced-elements)
> - CSS Key Concepts: [CSS 语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Syntax), [@规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule), [注释](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Comments), [优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)和[继承](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inheritance), the [盒模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model), [布局模式](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Layout_mode)和[视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)，以及[外边距合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)，或者[初始](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial_value)、[计算](https://developer.mozilla.org/zh-CN/docs/Web/CSS/computed_value)、[解析](https://developer.mozilla.org/zh-CN/docs/Web/CSS/resolved_value)、[指定](https://developer.mozilla.org/zh-CN/docs/Web/CSS/specified_value)、[使用](https://developer.mozilla.org/zh-CN/docs/Web/CSS/used_value)和[实际](https://developer.mozilla.org/zh-CN/docs/Web/CSS/actual_value)值。 Definitions of [值语法](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Value_definition_syntax)、[简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)和[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)。