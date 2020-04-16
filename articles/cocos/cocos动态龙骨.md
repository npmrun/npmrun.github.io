---
typora-root-url: cocos动态龙骨
title: cocos动态龙骨
date: 2020-04-14 11:22:52
tags: cocos
categories: cocos
comments: true
---



> 在cocos中有关动态的，都离不开`resources`这个目录，同时，这个目录使用的是`loader`模块加载。在游戏的开发过程中，对于一些节点有着十分多的动画资源的时候，比如换装之类的，这样的话全部挂载在一个节点上的话会造成游戏加载时间过长，玩家的耐心会消磨完。因此就有了动态的需求，主要的目的就是使得用户能够尽快的进去。

<!--more-->

### 资源位置

在`cocos`中，动态资源都是放在`resources`中的，

示例目录如下：

![image-20200414112831540](/images/image-20200414112831540.png)

然后我们采用`loadResDir`的方式加载`eatting`下的三个龙骨资源，因为这三个都是必须的，必须同时加载。

```
loadDragonBones(
    path: string,
    cb?: (bone: IDragonAssets) => void
): Promise<IDragonAssets> {
    let that = this;
    let allAssets: IDragonAssets = {
        dragonAsset: null,
        dragonAtlasAsset: null
    }
    return new Promise((resolve, reject) => {
        //动态加载龙骨

        if (this.cacheAssets[path]) {
            allAssets = this.cacheAssets[path]
            cb && cb(allAssets);
            resolve(allAssets);
            return;
        }
        let ac = cc.loader.loadResDir(path, function (err, assets) {
            if (err || assets.length <= 0) {
                err && console.error(err)
                assets.length <= 0 && console.error("该目录下没有资源:" + path)
                // reject();
                return;
            }

            assets.forEach(asset => {
                if (asset instanceof dragonBones.DragonBonesAsset) {
                    allAssets.dragonAsset = asset;
                }
                if (asset instanceof dragonBones.DragonBonesAtlasAsset) {
                    allAssets.dragonAtlasAsset = asset;
                }
            });
            cb && cb(allAssets);
            resolve(allAssets);
            that.cacheAssets[path] = allAssets
        });
    })
}
```

导出`DragonBonesAsset`和`DragonBonesAtlasAsset`后，动态赋值到节点的龙骨组件上就行了。

```
loadingNodeDragon(
    node: cc.Node,
    bones: IDragonAssets,
    armatureName?: string
) {
    let animationDisplay = node.getComponent(dragonBones.ArmatureDisplay);
    if (!animationDisplay) {
        animationDisplay = node.addComponent(dragonBones.ArmatureDisplay);
    }
    if (bones.dragonAsset instanceof dragonBones.DragonBonesAsset) {
        animationDisplay.dragonAsset = bones.dragonAsset;
    }
    if (bones.dragonAtlasAsset instanceof dragonBones.DragonBonesAtlasAsset) {
        animationDisplay.dragonAtlasAsset = bones.dragonAtlasAsset;
    }
    if (armatureName) {
        animationDisplay.armatureName = armatureName;
    }
    return animationDisplay
};
```

接下来只要正常播放就行了。