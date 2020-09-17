---
typora-root-url: html5plus分享模板
title: html5plus分享模板
date: 2020-04-21 15:27:38
tags:
categories: 
comments: true
---

微信公众号的分享链接在vue，hash模式下不要带/#/，会有问题

> 提供参考

```
var shares = null

function updateSerivces () {
  // eslint-disable-next-line no-undef
  plus.share.getServices(function (s) {
    shares = {}
    for (var i in s) {
      var t = s[i]
      shares[t.id] = t
    }
    console.log('获取分享服务列表成功')
  }, function (e) {
    console.log('获取分享服务列表失败：' + e.message)
  })
}
/**
 * 分享操作
 */
function shareAction (id, ex) {
  var s = null
  if (!id || !(s = shares[id])) {
    console.log('无效的分享服务！')
    return
  }
  if (s.authenticated) {
    console.log('---已授权---')
    shareMessage(s, ex)
  } else {
    console.log('---未授权---')
    s.authorize(function () {
      shareMessage(s, ex)
    }, function (e) {
      console.log('认证授权失败')
    })
  }
}
/**
 * 发送分享消息
 */
function shareMessage (s, ex) {
  var msg = {
    href: 'http://blog.csdn.net/zhuming3834',
    title: 'HGDQ-分享测试-title',
    content: 'HGDQ-分享测试-content',
    thumbs: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
    pictures: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
    extra: {
      scene: ex
    }
  }
  s.send(msg, function () {
    console.log('分享成功!')
  }, function (e) {
    console.log('分享失败!')
  })
}
/**
 * 分享按钮点击事件
 */
// eslint-disable-next-line no-unused-vars
function shareHref () {
  // eslint-disable-next-line one-var
  var ids = [{
      id: 'weixin',
      ex: 'WXSceneSession' /* 微信好友 */
    }, {
      id: 'weixin',
      ex: 'WXSceneTimeline' /* 微信朋友圈 */
    }, {
      id: 'qq' /* QQ好友 */
    }, {
      id: 'tencentweibo' /* 腾讯微博 */
    }, {
      id: 'sinaweibo' /* 新浪微博 */
    }],
    bts = [{
      title: '发送给微信好友'
    }, {
      title: '分享到微信朋友圈'
    }, {
      title: '分享到QQ'
    }, {
      title: '分享到腾讯微博'
    }, {
      title: '分享到新浪微博'
    }]
  // eslint-disable-next-line no-undef
  plus.nativeUI.actionSheet({
    cancel: '取消',
    buttons: bts
  },
  function (e) {
    var i = e.index
    if (i > 0) {
      shareAction(ids[i - 1].id, ids[i - 1].ex)
    }
  }
  )
}
console.log('---->', 'start')
console.log(document)
document.addEventListener('plusready', () => {
  updateSerivces()
  console.log('---->', 'success')
})

export default shareHref
```

