---
title: 编程规范
date: 2023-11-22
duration: 12min
type: workflow
art: plum
---

[[toc]]

先开一贴，今天工作发现我自己写的代码回过头去改 bug 时，代码块有点难读懂，而且很多地方也没有给必要的注释。晚点我查点资料，记录一下在 Vue3 中写业务时，编写的代码块规范。总感觉我自己写的很乱，明明用于同个功能的多个方法，写在不同的地方。

::: info
此贴的编程规范仅代表自己习惯的和遵循的规范
:::

## 命名规范

一个项目中使用得当的命名规范，会直接体现在代码整体的可读性和维护性上。常用的命名规范有以下：

- `camelCase` 小驼峰命名法
- `PascalCase` 大驼峰(帕斯卡)命名法
- `snake_case` 下划线命名法
- `kebab-case` 短横线命名法
- `UPPER_CASE` 大写命名法

### 文件命名规范

::: info
在一个项目中，大致包含了：项目文件夹、文件夹、普通文件、组件文件、资源文件等
:::

- 项目文件夹即项目名称使用短横线命名。eg: vue-start-project
- 文件夹使用短横线命名。
- 普通文件大致包含了`.html/.css/.md/.js/.ts`，使用短横线命名。
  - 普通文件可能会包含`react/vue`的页面文件`.jsx/.tsx/.vue`，同样也是用短横线命名。
- 组件文件一般都是用于页面文件中，一般使用大驼峰(帕斯卡)命名。eg: Sidebar.vue / Sidebar.jsx
- 资源文件同样使用短横线命名。

::: tip
除组件命名外，均使用短横线命名
:::

### 代码命名规范

<br />

#### JavaScript

- 常量: `const BASE_URL = 'http://www.google.com/'`
- 变量: `let baseUrl = 'http://www.google.com/'`
- 方法/函数: `function handleClick() {}` `const handleClick = () => {}`
- 类/构造函数: `class User {}` `function User() {}`
- 对象 `key`: `const user = { firseName: 'Leet' }`
- 路由 `path`: `path: '/user-info'`

::: tip
有时候要注意一下使用的英文，eg: `username`。这个单词是一个整体，并不是两个单词，所以不要写成了`userName` `user-name`。这还是需要多记记单词:sweat_smile:。
:::

#### HTML 和 CSS

这两个代码中有关联放在一起讲。

先讲 HTML 单独的，自定义的标签属性: `<div data-index="0"></div>`

---

然后就是它们关联的地方。一般都是写 CSS 时 HTML 配套的类名和 ID 名。

**_BEM 命名规范_**
这个基本上是公认的最标准的 CSS 命名规范。可以自行查找网络文章看看

## 项目结构

> 约定 > 配置

```sh
.
├── .vscode                           # VSCode 配置文件
├── public                            # 网站资源文件（favicon.ico index.html 等）
├── scripts                           # 脚本相关
├── src
│   ├── apis                          # api 接口
│   ├── assets                        # 静态资源
│   ├── components                    # 全局组件
│   ├── config                        # 项目配置文件
│   ├── constants                     # 常量
│   ├── hooks                         # 通用 hooks
│   ├── layout                        # 页面整体布局
│   ├── lib                           # 第三方或无业务依赖代码
│   ├── locales                       # i18n
│   ├── pages                         # 页面相关文件
│   │   ├── Home                      # 大驼峰规范 => 组件即是一个构造函数
│   │   │   ├── components            # 页面相关的子组件
│   │   │   ├── index.module.scss     # 根据应用的 CSS Scope 方案命名
│   │   │   └── index.tsx             # index 作为默认路径，视为根节点
│   │   └── App.tsx                   # 页面入口
│   ├── router                        # 页面路由
│   ├── store                         # 状态管理
│   ├── styles                        # 全局/基础样式
│   ├── types                         # TypeScript 类型声明
│   ├── utils                         # 工具函数
│   └── main.tsx                      # 应用启动入口
├── README.md                         # 当前项目的文档
├── package.json                      # 项目信息
└── tsconfig.json                     # TypeScript 配置文件
```

## 引入规范

不管是 vue 还是 react 组件中，还是写业务的文件中，都避免不了要使用其他库的东西或者是自己写的工具等等。这些不同功能的文件引入如果没有规范，看起来也会非常难受。

```js
// bad
import { ref } from 'vue'
import { useRequest } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { Button } from 'Element-plus'
import { request } from '@/utils/request'
import { api } from '@/api'
import { useUserStore } from '@/store/modules/user'
import '@/styles/index.scss'
import Sidebar from '@/components/Sidebar.vue'
```

```js
// good
// third library
import { useRouter } from 'vue-router'
import { useRequest } from '@vueuse/core'

// api, util
import { Button } from 'Element-plus'
import { api } from '@/api'
import { useUserStore } from '@/store/modules/user'

// components
import Sidebar from '@/components/Sidebar.vue'

// assets, style
import '@/styles/index.scss'
```

::: tip
在上面你会注意到`import { Button } from 'Element-plus'`这个即是第三方库又是组件，这时就应该按更细的分类给它分类。在每个块都可能有这种情况，但是遵循第三方库 > 本地即可。

如果在同一个文件引入超过 3 个方法(或者变量、组件等)应该分行书写。
:::

## 参考资料

[编程规范](https://notes.fe-mm.com/workflow/style-guide)

[BEM CSS 的认识与了解](https://hackmd.io/@YIHQx96xTI-K9vDjhzEfDA/S1TBmnon9)
