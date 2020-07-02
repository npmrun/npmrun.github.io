---
typora-root-url: leetcode算法题
title: leetcode算法题
date: 2020-04-22 14:01:15
tags:
categories:
comments: true
---

### 题目

给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

**示例:**

```
输入: [1,2,3,null,5,null,4]
输出: [1, 3, 4]
解释:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
```

> 注：输入的不是数组，而是类似这种图形结构的：
>
> ```
> {
>     "val": 1,
>     "left": {"val": 2, "left": null, "right": {"val": 5, "left": null, "right": null}},
>     "right": {"val": 3, "left": null, "right": {"val": 4, "left": null, "right": null}}
> }
> ```

### 算法解析

DFS(深度优先搜索算法)

```
/**
 * 定义一个节点树结构
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var rightSideView = function(root) {
	// 传入的是空的话返回空数组
    if(!root) return [];
    let result = [];
    let run = (tree,depth)=>{
        if(!tree) return [];
        if (depth == result.length){
            result.push(tree.val)
        }
        depth += 1
        run(tree.right,depth)
        run(tree.left,depth)
    }
    run(root,0)
    return result
};
```



### 对应知识点

