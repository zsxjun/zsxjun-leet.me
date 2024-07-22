---
title: 实现md自定义块block和代码块组code-group
date: 2024-07-22
duration: 26min
art: random
draft: true
---

先看看block和code-group的效果:

::: info
123 `script` [baidu](https://www.baidu.com)
:::

::: tip
123 `script` [baidu](https://www.baidu.com)
:::

::: warning
123 `script` [baidu](https://www.baidu.com)
:::

::: danger
123 `script` [baidu](https://www.baidu.com)
:::

::: details
123 `script` [baidu](https://www.baidu.com)
:::

::: code-group

```js [index.js]
const foo = 'foo'
```

```ts [index.ts]
const foo: string = 'foo'
```

:::

## 发现

在 markdown 中无法做到这种功能，我之前的博客是使用 vitepress 写的，vitepress 扩展了 markdown 的语法，其中就包括了 `custom-block` 和 `code-group`.

在现在的博客中，我从之前的博客迁移文章过来才发现使用了大量的 vitepress 扩展的 markdown 语法，这就导致如果我要修改得花大量的时间去查找。这样做既没有效率，之后也无法使用这种语法，那就想着能不能在现在的博客去实现一个相同的功能？

## Markdown-It

在实现之前还需要了解下 [Markdown-It](https://github.com/markdown-it/markdown-it)，这是一个 Markdown 解析器，并且支持扩展和语法插件。

Markdown-It 的原来总的来说可以分为两个步骤: `parse` 和 `render`，解析和渲染。要实现 custom-block 和 code-group 主要在于 `render` 过程，我们不太需要关心 `parse` 的过程，但是还是会用到一点点 `parse` 的知识。

看看 [`render`](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs#L114)，解析后的内容是一个 tokens，renderer 函数接收 tokens 和其他参数，在这里我们就可以处理得到最后渲染的 html 了。

::: tip tokens
官方对于 [tokens](https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md?plain=1#L41) 的解释大概就是:

我们使用更底层的数据表示 -- tokens，而不是传统的AST( 抽象语法树(Abstract Syntax Tree，AST)，是源代码语法结构的一种抽象表示。 以树状的形式表现编程语言的语法结构，每个节点都表示源代码中的一种结构)

- tokens是一个简单是序列数组
- 开始和结束标签是分开的
- 有一些特殊的标记对象，即内联容器，他们具有嵌套标记。这些带有内联标记的序列，例如粗体、斜体、文本等。

总的来说，token流是:

- 在顶层一一成对或单个块标记的数组:
  - 开始/结束的标题、列表、块引用、段落等。
  - code blocks, fenced blocks, 水平线，HTML 块，内联容器
- 每个内联token都有一个children属性，其中包含用于内联内容的嵌套token流:
  - 开始/结束的粗体、斜体、链接、内联代码等。
  - 文本，换行符

:::

你可以通过 [markdown-it demo](https://markdown-it.github.io/) 中的debug来查看内容转换成 token 后是什么样子。

## 实现之前

ok，你现在有了一点点了解了，应该也知道我们可以怎么下手了：拿到解析后的tokens，筛选出对应的token并且重新渲染它。

然后在 markdown-it demo 中写了这个语法发现渲染后的 HTML 并非和预想中的一样，它会被渲染成 `<p></p>`, 而我需要的是渲染成 `<div></div>` 并且带上一些属性。

那能不能筛选出 token 的 `type="paragraph_open/close" && tag="p"`，然后查找在这之中 content 包含了 `::: tip :::` 的token，然后再处理？想了想后要从非常庞大的tokens中去逐一查找就不太可取，而且从content查找关键字，那我这样写的文字（abcd::: tip :::efg）那也能会匹配上。

其实还需要另外一个库 [markdown-it-container](https://github.com/markdown-it/markdown-it-container)，它已经帮我们处理好并筛选出包含关键字的token了。

```
var md = require('markdown-it')()
            .use(require('markdown-it-container'), name [, options]);
```

通过 name 定义 ::: 后的关键字，然后 使用 options 中的 render 去渲染。详细的文档可以去它的仓库查看。

## custom-block

首先下载需要使用到的库:

```shell
pnpm install markdown-it markdown-it-container -D
```

### 渲染对应的HTML

```ts
import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import container from 'markdown-it-container'

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt
): ContainerArgs {
  return [
    container,
    klass,
    {
      render() {
        return ''
      }
    }
  ]
}
```

编写一个通用的 container，之后我们就能在使用插件时直接使用:

```ts
md.use(...createContainer('tip', 'TIP', md))
```
