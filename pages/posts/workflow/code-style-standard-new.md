---
title: 统一代码风格和规范项目代码 - 新
date: 2024-04-28
duration: 18min
type: workflow
---

之前那篇[规范代码的文章](/workflow/code-style-standard.md)，已经算是比较旧的了，比如在规范 stylelint 时因为 v15 版本原因废弃了`stylelint-config-prettier`插件；还有就是那篇文章中都是使用的这种文件格式`.xxxrc.{js,cjs,mjs}`，在 eslint v9 中官方又废弃了这种写法，改成使用`eslint.config.js`。

> 我们正在过渡到 ESLint v9.0.0 中的新配置系统。但在 v9.0.0 中将被弃用。

所以请注意你安装的三方插件的版本，没注意可能会导致一些难以察觉的 bug。

另外最近我比较关注前端开源人[`Anthony Fu`](https://antfu.me/)，他不仅是`Vue`, `Nuxt`, `Vite`团队核心成员，而且我们使用的很多在工作中用到的工具都是出自他的手中，例如:
`Vitese`, `Slidev`, `VueUse`, `UnoCSS`。而且他还有很多用于我们便捷开发使用的工具: 通用模板`Vitesse`系列, `@antfu/eslint-config`, 开发调试工具等等。

这期我们就要使用便于我们规范代码的工具[`@antfu/eslint-config`](https://github.com/antfu/eslint-config)，并且我并不打算使用`prettier`，我很赞同他这篇文章所说的[为什么我不使用 Prettier](https://antfu.me/posts/why-not-prettier-zh)。

## 介绍

其实想重复使用一个通用的模板完全可以使用[`Vitesse`](https://github.com/antfu-collective/vitesse)系列产品的。但是还是会有人更喜欢自己从零开始、不使用现成的、完全自定义的创建一个模板。

本文会包含两条线，其中会有一点点不一样：模板一般用于自己个人开发使用，可能对提交规范上的约束没有那么强硬就可以选择更简单一点的`simple-git-hooks`；如果更倾向于团队使用，那对于提交规范约束会强很多，那就可以采用`husky`.

## 创建项目

```bash
pnpm create vite my-app --template vue-ts
```

```bash
npm create vite my-app -- --template vue-ts
```

```bash
yarn create vite my-app -- --template vue-ts
```

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

> 集成旧配置: 如果您仍然使用旧版 eslintrc 格式中的一些配置，则可以使用 @eslint/eslintrc 包将它们转换为平面配置。
>
> ```js
> import antfu from '@antfu/eslint-config'
> import { FlatCompat } from '@eslint/eslintrc'
>
> const compat = new FlatCompat()
>
> export default antfu(
>   {
>     ignores: []
>   },
>   // Legacy config
>   ...compat.config({
>     extends: [
>       'eslint:recommended'
>       // Other extends...
>     ]
>   })
>
>   // other flat configs
> )
> ```

添加脚本配置:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

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

## simple-git-hooks

选择使用这个工具那就避免使用下一节中的`husky`. 到`lint-staged`这节之后就结束了，对应个人而已，规范化的提交语句可以很好的控制，所以并不需要 commitlint 这些来约束。

`simple-git-hooks`的好处在于:

- 0 依赖
- 低配置
- 轻量

1. 安装

```bash
pnpm i -D simple-git-hooks
```

2. 在`package.json`中添加:

```json
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  }
}
```

3. 运行 CLI 脚本以使用配置中的命令更新 git hooks:

```bash
npx simple-git-hooks
```

## husky

选择使用这个工具那就避免使用下一节中的`simple-git-hooks`.

1. 安装

```bash
pnpm i -D husky
```

2. 初始化

```bash
pnpm exec husky init
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

3. 修改在`package.json`中的`simple-git-hooks`

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
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

## commitlint

1. 安装

```bash
pnpm i -D @commitlint/cli @commitlint/config-conventional
```

2. 配置 commitlint 以使用常规配置

```bash
echo "export default { extends: ['@commitlint/config-conventional'] }" > commitlint.config.js
```

3. 标准化规范化 commit message

安装:

```bash
pnpm i -D commitizen cz-git git-cz
```

在`package.json`中添加`config`:

```json
{
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

更改`commitlint.config.js`:

```js
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 自定义规则
  rules: {
    // @see https://commitlint.js.org/#/reference-rules

    // 提交类型枚举，git提交type必须是以下类型
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新增功能
        'fix', // 修复缺陷
        'docs', // 文档变更
        'style', // 代码格式（不影响功能，例如空格、分号等格式修正）
        'refactor', // 代码重构（不包括 bug 修复、功能新增）
        'perf', // 性能优化
        'test', // 添加疏漏测试或已有测试改动
        'build', // 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
        'ci', // 修改 CI 配置、脚本
        'revert', // 回滚 commit
        'chore' // 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）
      ]
    ],
    'subject-case': [0] // subject大小写不做校验
  },

  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      generatingByAI: '正在通过 AI 生成你的提交简短描述...',
      generatedSelectByAI: '选择一个 AI 生成的简短描述:',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      {
        value: 'feat',
        name: 'feat:     ✨  A new feature',
        emoji: ':sparkles:'
      },
      { value: 'fix', name: 'fix:      🐛  A bug fix', emoji: ':bug:' },
      {
        value: 'docs',
        name: 'docs:     📝  Documentation only changes',
        emoji: ':memo:'
      },
      {
        value: 'style',
        name: 'style:    💄  Markup, white-space, formatting, missing semi-colons...',
        emoji: ':lipstick:'
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️  A code change that neither fixes a bug or adds a feature',
        emoji: ':recycle:'
      },
      {
        value: 'perf',
        name: 'pref:     ⚡️  A code change that improves performance',
        emoji: ':zap:'
      },
      {
        value: 'test',
        name: 'test:     ✅  Adding missing tests or correcting existing tests',
        emoji: ':white_check_mark:'
      },
      {
        value: 'build',
        name: 'build:    📦️  Changes that affect the build system or external dependencies',
        emoji: ':package:'
      },
      {
        value: 'ci',
        name: 'ci:       🎡  Changes to our CI configuration files and scripts',
        emoji: ':ferris_wheel:'
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️  Reverts a previous commit',
        emoji: ':rewind:'
      },
      {
        value: 'chore',
        name: 'chore:    🔨  Other changes that don\'t modify src or test files',
        emoji: ':hammer:'
      }
    ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [
      { value: 'closed', name: 'closed:   ISSUES has been processed' }
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
```

添加 githook:

```bash
echo 'npx --no --commitint --edit "${1}"' > .husky/commit-msg
```

在`package.json`中`script`添加命令:

```json
{
  "scripts": {
    "commit": "git-cz"
  }
}
```

## editorconfig

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
