---
title: 统一代码风格和规范项目代码 - 新
date: 2024-04-28
duration: 18min
type: workflow
---

[[toc]]

上一篇[规范代码的文章](/workflow/code-style-standard.md)，由于安装需要用到的库版本比较新，可能会导致旧版的库的一些功能的废弃等等问题，比如在规范 stylelint 时因为 v15 版本原因废弃了`stylelint-config-prettier`插件；还有在 `eslint: ^9.0.0` 之前的版本，使用的文件格式一般都是 `.xxxrc.{js,cjs,mjs}`，在 eslint v9 中官方已经明确废弃了这种写法，改成使用`eslint.config.js`。所以还是更建议阅读这篇文章。

> [!TIP]
> 如果你是修改以前项目的提交规范和代码规范，请注意安装的库版本！

所以请注意你安装的三方插件的版本，没注意可能会导致一些难以察觉的 bug。

另外最近我比较关注前端开源人[`Anthony Fu`](https://antfu.me/)，他不仅是`Vue`, `Nuxt`, `Vite`团队核心成员，而且我们使用的很多在工作中用到的工具都是出自他的手中，例如:
`Vitese`, `Slidev`, `VueUse`, `UnoCSS`。而且他还有很多用于我们便捷开发使用的工具: 通用模板`Vitesse`系列, `@antfu/eslint-config`, 开发调试工具等等。

这期我们就要使用便于我们规范代码的工具[`@antfu/eslint-config`](https://github.com/antfu/eslint-config)，并且我并不打算使用`prettier`，我很赞同他这篇文章所说的[为什么我不使用 Prettier](https://antfu.me/posts/why-not-prettier-zh)。

## 介绍

其实想重复使用一个通用的模板完全可以使用[`Vitesse`](https://github.com/antfu-collective/vitesse)系列产品的。但是还是会有人更喜欢自己从零开始、不使用现成的、完全自定义的创建一个模板。

## 创建项目

::: code-group

```bash [pnpm]
pnpm create vite my-app --template vue-ts
```

```bash [npm]
npm create vite my-app -- --template vue-ts
```

```bash [yarn]
yarn create vite my-app -- --template vue-ts
```

:::

<img src="/images/init-app.png" />

```bash
# 进入文件夹
cd my-app

# 打开编辑器
code .

# 安装依赖
pnpm install

# 启动项目
pnpm dev
```

## ESLint

> [!TIP]
> 建议使用 `v9.0.0` 及以上版本。

```bash
pnpm i -D eslint @antfu/eslint-config
```

在你的项目中新建`eslint.config.{js,mjs,cjs}`:

```js
// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  // 如果项目使用了unocss，添加以下配置能格式化class
  // {
  //   unocss: true,
  //   formatters: true,
  // },
})
```

::: tip
集成旧配置: 如果您仍然使用旧版 eslintrc 格式中的一些配置，则可以使用 @eslint/eslintrc 包将它们转换为平面配置。

```js
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    ignores: []
  },
  // Legacy config
  ...compat.config({
    extends: [
      'eslint:recommended'
      // Other extends...
    ]
  })

  // other flat configs
)
```
:::

添加脚本配置:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

::: details 推荐使用vscode配置
VS Code 配置，在`.vscode/settings.json`中添加

```json
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "format/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "gql",
    "graphql"
  ]
}
```

:::

## husky

1. 安装

```bash
pnpm i -D husky
```

2. 添加脚本命令并运行

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

```shell
pnpm prepare
```

3. 配置文件

```bash
echo "pnpm lint:fix" > .husky/pre-commit
```

## lint-staged

1. 安装

```bash
pnpm i -D lint-staged
```

2. 在`package.json`中添加

```json
{
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

3. 添加脚本

```json
{
  "scripts": {
    "lint-staged": "lint-staged"
  }
}
```

4. 修改 husky 配置文件

```bash
echo "pnpm lint-staged" > .husky/pre-commit
```

## 提交规范

1. 安装

```bash
pnpm i -D commitizen cz-git
```

2. 在`package.json`中添加

```json
{
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

3. 添加提交命令

在`package.json`中`script`添加命令:

```json
{
  "scripts": {
    "commit": "git-cz"
  }
}
```

使用了这两个插件后，你可以通过 `pnpm commit` 进行规范化的提交，但是还是可能会出现会有通过 `git bash` 去提交代码的情况，这种情况下如果没有规范化提交那也能提交成功，那么就没有完全实现规范提交，这时就需要用到其他插件: `pnpm install @commitlint/cli @commitlint/config-conventional -D`.

4. 添加 `commitlint.config.js`

```shell
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

5. 添加 husky githook

```shell
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

## editorconfig

为了统一每个人编辑器不同的编写格式推荐添加以下配置

新建`.editorconfig`:

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

## 提交错误记录

```shell
pnpm commit
```

之后会有一系列选项和input需要填写，提交时有可能会报错 `Cannot execute binary file: Exec format error`，这时需要来到 `.husky/pre-commit` 脚本文件中，查看编辑器右下角该文件的编码格式，如果是 `UTF-16` 之类的需要改成 `UTF-8` 即可。

同样的错误也可能出现在 `.husky/commit-msg` 和 `commitlint.config.js` 文件中，只需跟上面一样修改即可
