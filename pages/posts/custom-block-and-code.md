---
title: 实现md自定义块block和代码块组code-group
date: 2024-07-22
duration: 50min
art: random
---

[[toc]]

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

## custom-block

### 实现之前

ok，你现在有了一点点了解了，应该也知道我们可以怎么下手了：拿到解析后的tokens，筛选出对应的token并且重新渲染它。

然后在 markdown-it demo 中写了这个语法发现渲染后的 HTML 并非和预想中的一样，它会被渲染成 `<p></p>`, 而我需要的是渲染成 `<div></div>` 并且带上一些属性。

那能不能筛选出 token 的 `type="paragraph_open/close" && tag="p"`，然后查找在这之中 content 包含了 `::: tip :::` 的token，然后再处理？想了想后要从非常庞大的tokens中去逐一查找就不太可取，而且从content查找关键字，那我这样写的文字（abcd::: tip :::efg）那也能会匹配上。

其实还需要另外一个库 [markdown-it-container](https://github.com/markdown-it/markdown-it-container)，它已经帮我们处理好并筛选出包含关键字的token了。

```
var md = require('markdown-it')()
            .use(require('markdown-it-container'), name [, options]);
```

通过 name 定义 ::: 后的关键字，然后 使用 options 中的 render 去渲染。详细的文档可以去它的仓库查看。

首先下载需要使用到的库:

```shell
pnpm install markdown-it markdown-it-container -D
```

### createContainer

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

### render

在上面我们已经知道了 Markdown-It 的大概原理，在这里我们就是需要通过 render 来渲染。

由于 Markdown-It-container 已经帮我们处理过了 tokens, 所以我们 tokens[idx] 所得到的就只会是 `:::` 开头结尾的段落。

::: details 被container解析后的token

```js
Token = {
  type: 'container_tip_open',
  tag: 'div',
  attrs: null,
  map: [158, 169],
  nesting: 1,
  level: 0,
  children: null,
  content: '',
  markup: ':::',
  info: ' tip',
  meta: null,
  block: true,
  hidden: false
}
Token = {
  type: 'container_tip_close',
  tag: 'div',
  attrs: null,
  map: null,
  nesting: -1,
  level: 0,
  children: null,
  content: '',
  markup: ':::',
  info: '',
  meta: null,
  block: true,
  hidden: false
}
```

可以看出被解析后并且赋予了 `type`，并将 `info` 中的 `:::` 解析到 `markup` 中，而 `info` 为 `:::` 后跟的文本。

另外`nesting`这个字段代表标签的类型，后面会用到:

- 1 代表标签的开始
- -1 代表标签的闭合
- 0 代表自闭合标签

:::

```ts
function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt
): ContainerArgs {
  return [
    container,
    klass,
    {
      /**
       * tokens 为解析的所有的标签
       * idx 为 markdown-it-container 解析后的包含 ::: 的索引
       * _options 为创建新的markdown-it对象时定义的选项
       * env 可以和 tokens 一起使用，将外部变量注入到解析器和渲染器中
       */
      render(tokens, idx, _options, env: { references?: any }) {
        // 拿到 `:::` 的token
        const token = tokens[idx]
        // 解析 token 中 info 的文本，slice的作用是文本后面还可能有其他文本，这里截取掉前面固有的关键字，获得后面的文本，如果没有则是''
        const info = token.info.trim().slice(klass.length).trim()
        // 获取标签的属性
        const attrs = md.renderAttrs(token)
        /**
         * 判断是否标签开始，否则一定为标签结束，不可能为自闭合标签，因为渲染的结果为div。
         * 获取title，就是 ::: 加上关键字后面的部分，还需看是否有链接引用
         * 如果是details则为可展开的标签`<details><summary></summary></details>`
         */
        if (token.nesting === 1) {
          const title = md.renderInline(info || defailtTitle, {
            references: env.references,
          })

          if (klass === 'details') {
            return `<details class="${klass} custom-block"${attrs}><summary>${title}</summary>\n`
          }
          return `<div class="${klass} custom-block"${attrs}><p class="custom-block-title">${title}</p>\n`
        }
        else {
          return klass === 'details' ? '</details>\n' : '</div>\n'
        }
      }
    }
  ]
}
```

::: tip
`env` 用于在分布式规则之间传递数据并返回附加的渲染器所需的 metadata, 例如reference。它也可以用来在特定情况下注入数据。通常，你可以通过 `{}` 空对象，然后将更新后的对象传递给渲染器。

`references` 在 MarkdownIt 渲染过程中用于存储和查找 Markdown 文档中的引用链接信息。它会使用 `references` 对象中的数据来生成正确的链接。

```md
[link text][ref]

[ref]: http://example.com 'Optional Title'
```

:::

### 使用

这时核心的逻辑就已经写好了，接下来就是使用了。如果你是直接使用的 markdown-it 库，那就是直接使用 `MarkdownIt.use(...createContainer('tip', 'TIP', md))` 即可。

我是使用了 `unplugin-vue-markdown` 在 vue 中可以使用 markdown 当作页面:

```ts
import Markdown from 'unplugin-vue-markdown/vite'

export default defineConfig({
  plugins: [
    Markdown({
      async markdownItSetup(md) {
        md.use(...createContainer('tip', 'TIP', md))
        md.use(...createContainer('warning', 'WARNING', md))
        md.use(...createContainer('danger', 'DANGER', md))
        md.use(...createContainer('info', 'INFO', md))
        md.use(...createContainer('details', 'Details', md))
      }
    })
  ]
})
```

这样引入五次比较麻烦，并且写死了title，优化一下会更灵活:

::: code-group

```ts [containers.ts]
// 定义一个ContainerOptions
export interface ContainerOptions {
  infoLabel?: string
  tipLabel?: string
  warningLabel?: string
  dangerLabel?: string
  detailsLabel?: string
}

// 创建一个plugin方法
export function containerPlugin(
  md: MarkdownIt,
  options: Options,
  containerOptions?: ContainerOptions
) {
  md.use(...createContainer('tip', containerOptions?.tipLabel || 'TIP', md))
  md.use(...createContainer('warning', containerOptions?.warningLabel || 'WARNING', md))
  md.use(...createContainer('danger', containerOptions?.dangerLabel || 'DANGER', md))
  md.use(...createContainer('info', containerOptions?.infoLabel || 'INFO', md))
  md.use(...createContainer('details', containerOptions?.detailsLabel || 'Details', md))
}
```

```ts [vite.config.ts]
export default defineConfig({
  plugins: [
    Markdown({
      async markdownItSetup(md) {
        md.use(containerPlugin)
      }
    })
  ]
})
```

:::

### 样式

这时候算是已经完成了80%了，你能看到没有自定义样式的这些 custom-block 了，接下来就要加上样式。

> [!WARNING]
> 这是我自己定义的样式，如果你想自定义样式，请自行修改；前提要求你也经给 markdown 设置过样式，否则可能样式会有问题。

```css
:root {
  --c-text: inherit;
  --c-code: rgba(59, 130, 246, 0.72);
  /* bg */
  --c-info-bg: rgba(107, 114, 128, 0.1);
  --c-tip-bg: rgba(34, 197, 94, 0.08);
  --c-warning-bg: rgba(234, 179, 8, 0.1);
  --c-details-bg: rgba(107, 114, 128, 0.1);
  --c-danger-bg: rgba(239, 68, 68, 0.08);
  /* text */
}

html.dark {
  /* bg */
  --c-info-bg: rgba(107, 114, 128, 0.24);
  --c-tip-bg: rgba(34, 197, 94, 0.1);
  --c-warning-bg: rgba(234, 179, 8, 0.12);
  --c-details-bg: rgba(107, 114, 128, 0.24);
  --c-danger-bg: rgba(239, 68, 68, 0.12);
}

.custom-block {
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 16px 16px 8px;
  margin: 24px 0;
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text);
}

.custom-block.info {
  background-color: var(--c-info-bg);
}

.custom-block.info a,
.custom-block.info code {
  color: var(--c-code);
}

.custom-block.info a:hover,
.custom-block.info a:hover > code {
  color: var(--c-text);
}

.custom-block.tip {
  background-color: var(--c-tip-bg);
}

.custom-block.tip a,
.custom-block.tip code {
  color: var(--c-code);
}

.custom-block.tip a:hover,
.custom-block.tip a:hover > code {
  color: var(--c-text);
}

.custom-block.warning {
  background-color: var(--c-warning-bg);
}

.custom-block.warning a,
.custom-block.warning code {
  color: var(--c-code);
}

.custom-block.warning a:hover,
.custom-block.warning a:hover > code {
  color: var(--c-text);
}

.custom-block.danger {
  background-color: var(--c-danger-bg);
}

.custom-block.danger a,
.custom-block.danger code {
  color: var(--c-code);
}

.custom-block.danger a:hover,
.custom-block.danger a:hover > code {
  color: var(--c-text);
}

.custom-block.details {
  background-color: var(--c-details-bg);
}

.custom-block.details a,
.custom-block.details code {
  color: var(--c-code);
}

.custom-block.details a:hover,
.custom-block.details a:hover > code {
  color: var(--c-text);
}

.custom-block-title {
  font-weight: 600;
}

.custom-block p + p {
  margin: 8px 0;
}

.custom-block.details summary {
  margin: 0 0 8px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.custom-block.details summary + p {
  margin: 8px 0;
}

.custom-block a {
  color: inherit;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: opacity 0.25s;
}

.custom-block a:hover {
  opacity: 0.75;
}

.custom-block code {
  font-size: 14px;
}

.custom-block.custom-block th,
.custom-block.custom-block blockquote > p {
  font-size: 14px;
  color: inherit;
}
```

## code-group

### 实现之前

首先下载需要使用到的库:

```shell
pnpm install nanoid -D
```

那这个应该怎么实现呢？看效果我们知道它是一个切换的tabs，使用dom操作实现在这里貌似不太现实，那如何使用纯css去实现tabs呢？

我们可以通过 `radio` 的特性配合 `label` 来控制，点击 label 时，对应的代码块显示。你可以自己试试怎么实现tabs。不要忘记css中的伪元素选择器，通过判断`input:checked`状态去处理。

那么现在就该想想怎样去渲染HTML了，原本的两段代码块渲染后会是这样的:

```html
<p>::: code-group</p>

<pre>
  <code></code>
</pre>

<pre>
  <code></code>
</pre>

<p>:::</p>
```

我们现在需要的HTML大概是这样的，还需要识别代码块后面的文本来渲染成label:

```html
<div class="code-group">
  <div class="tabs">
    <input type="radio" id="" checked />
    <label for=""></label>
    <input type="radio" id=""/>
    <label for=""></label>
  </div>
  <div>
    <pre><code></code></pre>
    <pre><code></code></pre>
  </div>
</div>
```

知道需要渲染的内容后，思路就清晰多了。同样的我们需要获取`type === 'container_code-group_start'` 和 `type === container_code-group_close` 来处理标签的开始和结束:

```html
<!-- 开始标签 -->
<div class="code-group">
  <div class="tabs">
    <input type="radio" id="" checked />
    <label for=""></label>
    <input type="radio" id=""/>
    <label for=""></label>
  </div>
  <div>

<!-- 代码块部分 -->
<pre><code></code></pre>
<pre><code></code></pre>

<!-- 结束标签 -->
  </div>
</div>
```

在上面所了解到的 `token` 的结构，我们从 `markdown-it demo`可以知道代码块部分的 `type` 都是 `fence`，我们需要拿到代码块定义的标题，就需要知道 `type === fence`。

那么就开始实现吧。

### createCodeGroup

code-group 和 custom-block 类似，固定了 name 为 `code-group`，并且 render 的逻辑也不相同。

```ts
function createCodeGroup(): ContainerArgs {
  return [
    container,
    'code-group',
    {
      render() {
        return ''
      }
    }
  ]
}
```

### render

```ts
function createCodeGroup(): ContainerArgs {
  return [
    container,
    'code-group',
    {
      render(tokens, idx) {
        // 以防忘记，这里判断的是带有 code-group 的 token 的标签是否是开始标签，而不是判断所有的 tokens
        if (tokens[idx].nesting === 1) {
          const name = nanoid(5) // radio 唯一 name，才能实现单选
          const tabs = '' // tabs html
          const checked = 'checked'

          /**
           * 这里除了要处理渲染开始和结束标签的HTML,还要拿到其中代码片段的 title
           * 这里的循环时查找 code-group 之内的其他标签
           */
          for (
            let i = idx + 1;
            !(
              tokens[i].nesting === -1
              && tokens[i].type === 'container_code-group_close'
            );
            i++
          ) {
            // 兼容在md中直接使用 <pre><code></code></pre> 编写代码块，并包含属性data-title=""，那么也可以识别出来
            const isHtml = tokens[i].type === 'html_block'

            if ((tokens[i].type === 'fence' && tokens[i].tag === 'code') || isHtml) {
              // 获取 title
              const title = extractTitle(isHtml ? tokens[i].content : tokens[i].info, isHtml)

              if (title) {
                const id = nanoid(7) // radio 中 id 和 label 中 for 对应
                tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${checked}><label for="tab-${id}">${title}</label>`

                // 给第一个代码块 token.info 加上 active 属性
                if (checked && !isHtml)
                  tokens[i].info += ' active'
                checked = ''
              }
            }
          }

          return `<div class="code-group"><div class="tabs">${tabs}</div><div class="blocks">\n`
        }
        return `</div></div>\n`
      }
    }
  ]
}
```

::: details render中使用到的工具
```ts
/**
 * 去除块内注释并提取data-title属性值
 */
export function extractTitle(info: string, html = false) {
  if (html) {
    return (
      info.replace(/<!--[\s\S]*?-->/g, '').match(/data-title="(.*?)"/)?.[1] || ''
    )
  }
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}
```

```ts
/**
 * 提取代码块的语言，```js = js
 */
export function extractLang(info: string) {
  return info
    .trim()
    .replace(/=(\d*)/, '')
    // eslint-disable-next-line regexp/optimal-quantifier-concatenation
    .replace(/:(no-)?line-numbers(\{| |$|=\d*).*/, '')
    .replace(/(-vue|\{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
    .replace(/^ansi$/, '')
}
```
:::

### 使用

在containerPlugin中直接加上 `md.use(...createCodeGroup())` 即可。

然后我们测试一下，会发现虽然HTML结果没问题，但是功能有问题。虽然没有样式，但是我们也能发现问题，看看HTML你会发现，我们在代码中加上的 `active` 只是在 token 中加上而已，并没有使用到。我们需要 `active` 来控制代码块的显隐。

那能不能不通过 `active` 来控制呢。实现tabs确实可以，通过给 `tab panel` 也设置特定的属性值，然后通过属性选择器去控制。但是怎么给它加上属性值呢？好像没有办法，`markdown-it-container` 只返回开始和结束的标签。

在 `markdown-it` 代码中的 [renderer.mjs描述](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs#L4), 可以知道：从解析的 token 流 生成HTML。每个实例都有独立的 rules 副本。这些可以轻松重写。此外，如果您创建插件并添加新的令牌类型，则可以添加新的 rules。

现在我们知道我们可以编写一个新的插件来处理这个情况。因为都是代码块，所以它的 token 流的 `type === 'fence'`。

### 处理代码块的 active

可以直接把 `active` 加在代码块 `<pre class="active"></pre>` 上，但是我选择用一层 `div` 包裹，显得层次清晰一点，更能看清修改痕迹。并且需要加上其他属性也不会混乱。

我们新建一个插件:

```ts
export function preWrapperPlugin(md: MarkdownIt) {
  // fence本身就是render，但是我们需要重写它
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    // 拿到所有 fence 的 token
    const token = tokens[idx]

    // 移除代码块定义的 title，eg: [index.js]会被整个移除
    token.info = token.info.replace(/\[.*\]/, '')

    // 判断 info 中是否有 `active`
    // eslint-disable-next-line regexp/no-unused-capturing-group
    const active = / active( |$)/.test(token.info) ? ' active' : ''

    // 移除 active
    token.info = token.info.replace(/ active$/, '').replace(/ active /, ' ')

    // 获取定义代码块的语言, 这个方法在上面有定义过 `render中使用到的工具`
    const lang = extractLang(token.info)

    // 自定义包裹后渲染原来的 fence即可
    return (
      `<div class="language-${lang}${active}">${fence(...args)}</div>`
    )
  }
}
```

在 `vite.config.ts` 中使用这个插件:

```ts
export default defineConfig({
  plugins: [
    Markdown({
      async markdownItSetup(md) {
        md.use(preWrapperPlugin)

        // container
        md.use(containerPlugin)
      }
    })
  ]
})
```

现在再看看HTML，它已经正确显示了，接下来我们只需要加上样式就可以了。

### 样式

> [!WARNING]
> 这是我自己定义的样式，如果你想自定义样式，请自行修改；前提要求你也经给 markdown 设置过样式，否则可能样式会有问题。

```css
.code-group {
  margin-top: 16px;
}

.code-group .tabs {
  position: relative;
  display: flex;
  padding: 0 12px;
  background-color: #fafafa;
  overflow-x: auto;
  overflow-y: hidden;
  box-shadow: inset 0 -1px #ffffff;
  border-radius: 6px 6px 0 0;
}

html.dark .code-group .tabs {
  background-color: #0e0e0e;
  box-shadow: inset 0 -1px #000000;
}

.code-group .tabs input {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

.code-group .tabs label {
  position: relative;
  display: inline-block;
  border-bottom: 1px solid transparent;
  padding: 0 12px;
  line-height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
  opacity: 0.6;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.25s;
}

.code-group .tabs label::after {
  position: absolute;
  right: 8px;
  bottom: -1px;
  left: 8px;
  z-index: 1;
  height: 2px;
  border-radius: 2px;
  content: '';
  background-color: transparent;
  transition: background-color 0.25s;
}

.code-group label:hover {
  opacity: 1;
}

.code-group input:checked + label {
  opacity: 1;
}

.code-group input:checked + label::after {
  background: #000000;
  opacity: 0.6;
}

html.dark .code-group input:checked + label::after {
  background: #ffffff;
}

.code-group div[class*='language-'] {
  display: none;
  margin-top: 0 !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.code-group div[class*='language-'].active {
  display: block;
}
```

### 切换 tab 失效

这时候加上样式，会发现点击 tab 还是无法切换，因为之前只是默认给第一个 tab 加上了 active，但是没有处理切换时 active 也切换的逻辑。

我们需要处理监听点击 tab 的逻辑:

```ts
export function useCodeGroups() {
  const initializeCodeGroups = () => {
    document.querySelectorAll('.code-group > .blocks').forEach((el) => {
      Array.from(el.children).forEach((child) => {
        child.classList.remove('active')
      })
      el.children[0]?.classList.add('active')
    })
  }

  onMounted(() => {
    if (import.meta.env.DEV) {
      initializeCodeGroups()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('click', (e) => {
        const el = e.target as HTMLInputElement

        if (el.matches('.code-group input')) {
          const group = el.parentElement?.parentElement
          if (!group)
            return

          // 获取点击的 tab 索引
          const i = Array.from(group.querySelectorAll('input')).indexOf(el)
          if (i < 0)
            return

          const blocks = group.querySelector('.blocks')
          if (!blocks)
            return

          const current = Array.from(blocks.children).find(child =>
            child.classList.contains('active'),
          )
          if (!current)
            return

          // 获取点击的 tab 对应的代码块
          const next = blocks.children[i]
          if (!next || current === next)
            return

          current.classList.remove('active')
          next.classList.add('active')

          const label = group.querySelector(`label[for="${el.id}"]`)
          label?.scrollIntoView({ block: 'nearest' })
        }
      })
    }
  })

  onUpdated(() => {
    if (import.meta.env.DEV) {
      initializeCodeGroups()
    }
  })
}
```

最后在 App 中使用即可：

```vue
<script setup lang="ts">
useCodeGroups()
</script>
```
