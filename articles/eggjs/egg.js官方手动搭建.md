---
typora-root-url: egg.js官方手动搭建
title: egg.js官方手动搭建
date: 2020-04-14 17:04:09
tags:
categories: eggjs
comments: true
---



## 初始化项目

先按以下步骤一步步初始化

```
$ mkdir egg-example
$ cd egg-example
$ npm init
$ npm i egg --save
$ npm i egg-bin --save-dev
```

<!--more-->

添加 `npm scripts` 到 `package.json`：

```
{
  "name": "egg-example",
  "scripts": {
    "dev": "egg-bin dev"
  }
}
```

### 编写 Controller

如果你熟悉 Web 开发或 MVC，肯定猜到我们第一步需要编写的是 [Controller](https://eggjs.org/zh-cn/basics/controller.html) 和 [Router](https://eggjs.org/zh-cn/basics/router.html)。

```
// app/controller/home.js
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Hello world';
  }
}

module.exports = HomeController;
```

配置路由映射：

```
// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
```

加一个[配置文件](https://eggjs.org/zh-cn/basics/config.html)：

```
// config/config.default.js
exports.keys = <此处改为你自己的 Cookie 安全字符串>;
```

此时目录结构如下：

```
egg-example
├── app
│   ├── controller
│   │   └── home.js
│   └── router.js
├── config
│   └── config.default.js
└── package.json
```

完整的目录结构规范参见[目录结构](https://eggjs.org/zh-cn/basics/structure.html)。

好，现在可以启动应用来体验下

```
$ npm run dev
$ open http://localhost:7001
```

>注意：
>
>- Controller 有 `class` 和 `exports` 两种编写方式，本文示范的是前者，你可能需要参考 [Controller](https://eggjs.org/zh-cn/basics/controller.html) 文档。
>- Config 也有 `module.exports` 和 `exports` 的写法，具体参考 [Node.js modules 文档](https://nodejs.org/api/modules.html#modules_exports_shortcut)。

### 静态资源

Egg 内置了 [static](https://github.com/eggjs/egg-static) 插件，线上环境建议部署到 CDN，无需该插件。

static 插件默认映射 `/public/* -> app/public/*` 目录

此处，我们把静态资源都放到 `app/public` 目录即可：

```
app/public
├── css
│   └── news.css
└── js
    ├── lib.js
    └── news.js
```

### 模板渲染

绝大多数情况，我们都需要读取数据后渲染模板，然后呈现给用户。故我们需要引入对应的模板引擎。

框架并不强制你使用某种模板引擎，只是约定了 [View 插件开发规范](https://eggjs.org/zh-cn/advanced/view-plugin.html)，开发者可以引入不同的插件来实现差异化定制。

更多用法参见 [View](https://eggjs.org/zh-cn/core/view.html)。

在本例中，我们使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 来渲染，先安装对应的插件 [egg-view-nunjucks](https://github.com/eggjs/egg-view-nunjucks) ：

```
$ npm i egg-view-nunjucks --save
```

开启插件：

```
// config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
};
```

```
// config/config.default.js
exports.keys = <此处改为你自己的 Cookie 安全字符串>;
// 添加 view 配置
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
```

**注意：是 `config` 目录，不是 `app/config`!**

为列表页编写模板文件，一般放置在 `app/view` 目录下

```
<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
```

添加 Controller 和 Router

```
// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const dataList = {
      list: [
        { id: 1, title: 'this is news 1', url: '/news/1' },
        { id: 2, title: 'this is news 2', url: '/news/2' }
      ]
    };
    await this.ctx.render('news/list.tpl', dataList);
  }
}

module.exports = NewsController;

// app/router.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
};
```

启动浏览器，访问 http://localhost:7001/news 即可看到渲染后的页面。

**提示：开发期默认开启了 [development](https://github.com/eggjs/egg-development) 插件，修改后端代码后，会自动重启 Worker 进程。**

### 编写 service

在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 [Service](https://eggjs.org/zh-cn/basics/service.html)。

我们来添加一个 Service 抓取 [Hacker News](https://github.com/HackerNews/API) 的数据 ，如下：

```
// app/service/news.js
const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map(res => res.data);
  }
}

module.exports = NewsService;
```

> 框架提供了内置的 [HttpClient](https://eggjs.org/zh-cn/core/httpclient.html) 来方便开发者使用 HTTP 请求。

然后稍微修改下之前的 Controller：

```
// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
```

还需增加 `app/service/news.js` 中读取到的配置：

```
// config/config.default.js
// 添加 news 的配置项
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};
```

### 编写扩展

遇到一个小问题，我们的资讯时间的数据是 UnixTime 格式的，我们希望显示为便于阅读的格式。

框架提供了一种快速扩展的方式，只需在 `app/extend` 目录下提供扩展脚本即可，具体参见[扩展](https://eggjs.org/zh-cn/basics/extend.html)。

在这里，我们可以使用 View 插件支持的 Helper 来实现：

```
$ npm i moment --save
```

```
// app/extend/helper.js
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
```

在模板里面使用：

```
<!-- app/view/news/list.tpl -->
{{ helper.relativeTime(item.time) }}
```

### 编写 Middleware

假设有个需求：我们的新闻站点，禁止百度爬虫访问。

聪明的同学们一定很快能想到可以通过 [Middleware](https://eggjs.org/zh-cn/basics/middleware.html) 判断 User-Agent，如下：

```
// app/middleware/robot.js
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  }
};

// config/config.default.js
// add middleware robot
exports.middleware = [
  'robot'
];
// robot's configurations
exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};
```

现在可以使用 `curl http://localhost:7001/news -A "Baiduspider"` 看看效果。

更多参见[中间件](https://eggjs.org/zh-cn/basics/middleware.html)文档。

### 配置文件

写业务的时候，不可避免的需要有配置文件，框架提供了强大的配置合并管理功能：

- 支持按环境变量加载不同的配置文件，如 `config.local.js`， `config.prod.js` 等等。
- 应用/插件/框架都可以配置自己的配置文件，框架将按顺序合并加载。
- 具体合并逻辑可参见[配置文件](https://eggjs.org/zh-cn/basics/config.html#配置加载顺序)。

```
// config/config.default.js
exports.robot = {
  ua: [
    /curl/i,
    /Baiduspider/i,
  ],
};

// config/config.local.js
// only read at development mode, will override default
exports.robot = {
  ua: [
    /Baiduspider/i,
  ],
};

// app/service/some.js
const Service = require('egg').Service;

class SomeService extends Service {
  async list() {
    const rule = this.config.robot.ua;
  }
}

module.exports = SomeService;
```

### 单元测试

单元测试非常重要，框架也提供了 [egg-bin](https://github.com/eggjs/egg-bin) 来帮开发者无痛的编写测试。

测试文件应该放在项目根目录下的 test 目录下，并以 `test.js` 为后缀名，即 `{app_root}/test/**/*.test.js`。

```
// test/app/middleware/robot.test.js
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/middleware/robot.test.js', () => {
  it('should block robot', () => {
    return app.httpRequest()
      .get('/')
      .set('User-Agent', "Baiduspider")
      .expect(403);
  });
});
```

然后配置依赖和 `npm scripts`：

```
{
  "scripts": {
    "test": "egg-bin test",
    "cov": "egg-bin cov"
  }
}
```

```
$ npm i egg-mock --save-dev
```

执行测试:

```
$ npm test
```

就这么简单，更多请参见 [单元测试](https://eggjs.org/zh-cn/core/unittest.html)。

## 后记

短短几章内容，只能讲 Egg 的冰山一角，我们建议开发者继续阅读其他章节：

- 关于骨架类型，参见[骨架说明](https://eggjs.org/zh-cn/tutorials/index.html)
- 提供了强大的扩展机制，参见[插件](https://eggjs.org/zh-cn/basics/plugin.html)。
- 一个大规模的团队需要遵循一定的约束和约定，在 Egg 里我们建议封装适合自己团队的上层框架，参见 [框架开发](https://eggjs.org/zh-cn/advanced/framework.html)。
- 这是一个渐进式的框架，代码的共建，复用和下沉，竟然可以这么的无痛，建议阅读 [渐进式开发](https://eggjs.org/zh-cn/tutorials/progressive.html)。
- 写单元测试其实很简单的事，Egg 也提供了非常多的配套辅助，我们强烈建议大家测试驱动开发，具体参见 [单元测试](https://eggjs.org/zh-cn/core/unittest.html)。