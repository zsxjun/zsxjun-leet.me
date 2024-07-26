---
title: 编程规范
date: 2023-11-22
duration: 12min
type: workflow
---

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
这个基本上是公认的最标准的 CSS 命名规范。需要先讲一讲 BEM 这个规范命名是怎样构成的。

1. **Block**

<!-- <ZoomImg
  src="/assets/workflow/programming-standard/css-block.png"
  desc="图片来源：https://en.bem.info/methodology/key-concepts/"
/> -->

Block 意为网页中看到的不同的区块，例如：搜索栏，侧边栏，菜单等。其特性有：

- 独立性: 可以在开发中重复利用，降低代码的重写率，提升开发速度
- 弹性高： 可以放在页面任一位置，也可以互相嵌入

_选择器的特色和命名_

- Block name 的描述它的功能、块的目的，而非状态
  > header, container, menu, input, footer
- 不会添加样式在里面
- 使用 BEM 的同时，不会使用 CSS 标签选择器和 ID 选择器
- 命名方式：为`block`或多单词用短横线命名

Block 之间可以相互嵌入

2. **_Element_**

<!-- <ZoomImg
  src="/assets/workflow/programming-standard/css-element.png"
  desc="图片来源：https://en.bem.info/methodology/key-concepts/"
/> -->

Element 是 Block 的组成成分，不能脱离 Block 单独使用

_选择器的特色和命名_

- Element name 如同 Block name 描述的是目的而非状态
- 命名的完整结构是`block-name__element-name`
- 命名方式：使用双下划线把 Block name 名称分隔

3. **_Modifier_**

<!-- <ZoomImg
  src="/assets/workflow/programming-standard/css-modifier.png"
  desc="图片来源：https://en.bem.info/methodology/key-concepts/"
/> -->

Modifier name 定义了 Block 或 Element 的外观，状态或行为的实体。

- 外观：例如尺寸或主题 size-xl, theme-light
- 状态：于通常状态有什么不同，disabled, focused
- 行为：对该元素产生什么影响，right-bottom

_选择器的特色和命名_

- 同一个 Block name 或 Element name 可以允许多组 Modifier name。
- 命名方式：双短横线--与 Block name 或 Element name 分隔`block-name__element--modifier`。
- 原本的命名方式为单下划线，但因为可读性原因而改为现在的方式。

**_使用_**

```
<!-- `header` block -->
<div class="header">
  <div class="search-form header__search-form"></div>
  <div class="btn--primary btn--danger btn--outline"></div>
</div>

```

**_个人习惯命名_**

BEM 的好处就是足够规范，在团队中使用能更有效的阅读代码。但是对于较小团队或者个人而言，BEM 的优势就没有那么大了，反而会影响开发速度。所以我是通过个人习惯简化 BEM 的规范而得出的个人习惯命名。

对于`Block` `Element`就没有那么多要求。就是除了`Modifier`之外，其他的部分都是通过单下划线连接，多个单词用单短横线连接，`Modifier`还是遵循 BEM 使用双短横线连接。

```
.sidebar_title {
}

.user-form_label {
}

.user-form_label--error {
}

```

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

## 引入规范 ~new

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
