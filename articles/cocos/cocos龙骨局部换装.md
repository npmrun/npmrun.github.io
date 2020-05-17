---
typora-root-url: cocos龙骨局部换装
title: cocos龙骨局部换装
date: 2020-05-16 17:43:07
tags:
categories: cocos
comments: true
top: false
---

> 在cocos中，动画是必不可少的，一个细腻的动画可能就是决定一款游戏的成败。对于一些没钱的开发者来说，龙骨动画是一个不错的选择，但是cocos对其的支持并不是十分的友好。这次我们需要解决的是换装的问题。
>
> 案例：v2.2.2编辑器，[龙骨插槽替换.zip](/files/龙骨插槽替换.zip)

## 需要实现的效果

![image-20200517143013713](/images/image-20200517143013713.png)

上面是原始效果，可以看到有两个插槽,一个是`fish`,一个是`number`。这个时候cocos并不能替换，因为是空的，因此就需要随便添加两个资源。

![image-20200517143122750](/images/image-20200517143122750.png)

这里我就添加`fish`插槽，那个`number`感觉太麻烦了，是一个滚动的数字。这样的话就能够使用cocos官方提供的方式进行换装替换 了。

### 制作龙骨模型替换资源

![image-20200517143330120](/images/image-20200517143330120.png)

> * `Armature`表示 部件名称
> * `killboss_bx`表示 插槽名称
> * `kypy_killboss_hjcts`表示 插槽中的显示资源名称

接下来对两个资源进行导出，根据论坛中引擎开发人员的建议，将`_tex.json`后缀的改成了`_atlas.json`的。类似于

![image-20200517143824254](/images/image-20200517143824254.png)

这样的话准备条件就做好了。不过仍有两种方式。

### 挂载节点替换

总代码：

```
cc.Class({
    extends: cc.Component,

    properties: {
        b: {
            type: dragonBones.ArmatureDisplay,
            default: null,
        },
        c: {
            type: dragonBones.ArmatureDisplay,
            default: null,
        }
    },
    start () {
    	// 需要被替换的fish插槽
        let robotSlot = this.b.armature().getSlot("fish");
        let factory = dragonBones.CCFactory.getInstance();
        factory.replaceSlotDisplay(
            this.c.getArmatureKey(), 
            "Armature", //  部件名称
            "killboss_bx", // 插槽名称
            "kypy_killboss_mgy",  // 显示资源名称
            robotSlot
        );
        this.b.playAnimation("animation", 500);  
    },
});
```

上面的`b`表示需要被替换资源的龙骨动画节点组件,`c`表示将要拿去替换的龙骨节点组件。

这里要保证`c`中的资源已经加载完毕，在我测试的时候，c节点必须处于激活状态，这样才保证了c节点中龙骨资源的加载。

### loader动态加载（推荐）

```
cc.Class({
    extends: cc.Component,

    properties: {
        b: {
            type: dragonBones.ArmatureDisplay,
            default: null,
        },
        c: {
            type: dragonBones.ArmatureDisplay,
            default: null,
        }
    },
    loadBones(cb) {
        let name = "NewProject"
        const resources = [
            cc.url.raw(`resources/${name}_ske.json`),
            cc.url.raw(`resources/${name}_atlas.json`),
            cc.url.raw(`resources/${name}_tex.png`),
        ];

        cc.loader.load(resources, (err, assets) => {
            let factory = dragonBones.CCFactory.getInstance();
            let data = JSON.parse(cc.loader.getRes(resources[0])._dragonBonesJson);
            factory.parseDragonBonesData(data);

            let atlasData = JSON.parse(cc.loader.getRes(resources[1])._atlasJson);
            factory.parseTextureAtlasData(atlasData, cc.loader.getRes(resources[2]));
            console.log(cc.loader.getRes(resources[1])._atlasJson);
            
            cb&&cb()
        });
    },
    start () {
        this.loadBones(()=>{
            let robotSlot = this.b.armature().getSlot("fish");
            let factory = dragonBones.CCFactory.getInstance();
            factory.replaceSlotDisplay(
                "NewProject",  // 跟上面的一样就行了。
                "Armature", 
                "killboss_bx", 
                "kypy_killboss_mgy", 
                robotSlot
            );
            this.b.playAnimation("animation", 500); 
        })
        // this.b.playAnimation("animation", 500);   
    },
});
```

这里我用的是`cc.loader.load`方式，这样就能保证资源已经加载完毕了。同时也减少了节点的创建。推荐使用这种方式。

### 坑点

1. 被换装的插槽里必须有资源才行，空的一个插槽并不能替换。
2. 换装的资源必须加载。如果挂载在节点上必须保证这个节点是激活状态而证明资源是加载过的。

> 参考资料
>
> https://forum.cocos.org/t/topic/89037
>
> [https://docs.cocos.com/creator/manual/zh/components/dragonbones.html?h=%E6%8F%92%E6%A7%BD](https://docs.cocos.com/creator/manual/zh/components/dragonbones.html?h=插槽)

