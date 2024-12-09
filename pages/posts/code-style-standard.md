---
title: 统一代码风格和规范项目代码
date: 2023-11-27
duration: 22min
art: random
---

[[toc]]

> [!WARNING]
> 建议阅读新的文章 [统一代码风格和规范项目代码 - 新](/workflow/code-style-standard-new)

本来是想着搭个完整的项目框架的，记录完规范这节后，代码那些配置就已经懒得更新了。心想着那些东西新建项目的时候，脚手架都会弄好。索性就把之前的第二节停掉删了，只留下这一节。因为我当初新建一个项目时，这些规范我也不知道怎么搞，记录以下以后也能参考参考。

::: info
在公司每次有新项目时，我都得重新搭建项目框架。并且后端的一般也是复用在新项目中，例如登录授权以及返回数据格式基本上每个项目都是一样的。所以决定还是搭建一个项目框架(其实是两个，一个 Admin、一个 Mobile)，一劳永逸！

由于文章太长所以分为两篇文章，第一篇是配置规范化，第二篇是配置对应必要的库和初始化代码
:::

## 介绍

本文将记录新建完一个项目后的代码规范配置等，包括 eslint, prettier, stylelint, husky, lint-stage, commitlint, cz-git, editorconfig

## 创建项目

![创建项目](/images/init-vite.png)

## ESLint

### 安装和初始化

```shell
# 创建项目后先安装依赖
pnpm install

# 安装eslint
pnpm install eslint -D

# 初始化eslint
pnpm eslint --init
```

<br />

![初始化ESLint](/images/init-eslint.png)

### 添加脚本命令

在`package.json`中`script`添加命令：

```json
{
  "scripts": {
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix"
  }
}
```

添加完脚本命令后`pnpm lint`执行一次

::: tip
eslint fix 时可能会对不相关的文件进行修复，所以需要在根目录新建`.eslintignore`来排除不相关的文件

```text
dist
node_modules
public
.husky
.vscode
.idea
*.sh
*.md

src/assets

.eslintrc.cjs
.prettierrc.cjs
.stylelintrc.cjs
```
:::

## Prettier

### 安装

```shell
# 安装eslint
pnpm install prettier -D
```

### .prettierrc.cjs

在根目录创建`.prettierrc.cjs`，并使用以下配置:

```js
module.exports = {
  // 一行的字符数，如果超过会进行换行，默认为80
  printWidth: 80,
  // 一个tab代表几个空格数，默认为2
  tabWidth: 2,
  // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  useTabs: false,
  // 字符串是否使用单引号，默认为false，使用双引号
  singleQuote: true,
  // 行位是否使用分号，默认为true
  semi: false,
  // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  trailingComma: 'none',
  // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  bracketSpacing: true,
  // 是否只格式化在文件顶部包含特定注释(@prettier| @format)的文件，默认false
  requirePragma: false,
  // 是否格式化一些文件中被嵌入的代码片段的风格(auto|off;默认auto)
  embeddedLanguageFormatting: 'auto',
  // 指定 HTML 文件的空格敏感度 (css|strict|ignore;默认css)
  htmlWhitespaceSensitivity: 'css'
}
```

::: tip
eslint fix 时可能会对不相关的文件进行修复，所以需要在根目录新建`.prettierignore`来排除不相关的文件

```text
dist
node_modules
public
.husky
.vscode
.idea
*.sh
*.md
src/assets
```
:::

### 添加脚本命令

在`package.json`中`script`添加命令：

```json
{
  "scripts": {
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\""
  }
}
```

## ESLint 和 Prettier 的冲突

在使用的过程中会发现，由于我们开启了自动化的 eslint 修复与自动化的根据 prettier 来格式化代码。所以我们已保存代码，会出现屏幕闪一起后又恢复到了报错的状态。

这其中的根本原因就是 eslint 有部分规则与 prettier 冲突了，所以保存的时候显示运行了 eslint 的修复命令，然后再运行 prettier 格式化，所以就会出现屏幕闪一下然后又恢复到报错的现象。这时候你可以检查一下是否存在冲突的规则。

### 安装依赖

```shell
pnpm install eslint-config-prettier eslint-plugin-prettier -D
```

### 解决冲突

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended" // [!code ++]
  ]
}
```

最后重启一遍 VSCode。

## Stylelint

### 安装依赖

```shell
pnpm install stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order -D
```

<br />

::: info 依赖说明

安装的依赖是以 scss 为基础安装的，若不需要可去掉相关 scss 的依赖

- `stylelint`: css 样式 lint 工具
- `postcss`: 转换 css 代码工具
- `postcss-scss`: 识别 scss 语法
- `postcss-html`: 识别 html/vue 中的`<style></style>`标签中的样式
- `stylelint-config-standard`: Stylelint 的标准可共享配置规则，详细可查看官方文档
- `stylelint-config-prettier`: 关闭所有不必要或可能与 Prettier 冲突的规则
- `stylelint-config-recommended-less`: scss 的推荐可共享配置规则，详细可查看官方文档
- `stylelint-config-standard-vue`: lint.vue 文件的样式配置
- `stylelint-scss`: stylelint-config-recommended-scss 的依赖，scss 的 stylelint 规则集合
- `stylelint-order`: 指定样式书写的顺序，在.stylelintrc.js 中 order/properties-order 指定顺序

:::

### .stylelintrc.cjs

在根目录创建`.stylelintrc.cjs`，并使用以下配置:

```js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended-scss',
    'stylelint-config-standard-vue'
  ],
  plugins: ['stylelint-order'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html'
    }
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml'
  ],
  rules: {
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'selector-class-pattern': null, // 选择器类名命名规则
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep']
      }
    ],
    // 指定样式的排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition'
    ]
  }
}
```

::: tip .stylelintignore
eslint fix 时可能会对不相关的文件进行修复，所以需要在根目录新建`.stylelintignore`来排除不相关的文件

```text
dist
node_modules
public
.husky
.vscode
.idea
*.sh
*.md

src/assets
```

:::

### 添加脚本命令

在`package.json`中`script`添加命令：

```json
{
  "scripts": {
    "lint:style": "stylelint \"./**/*.{css,less,vue,html}\" --fix"
  }
}
```

::: tip
如果安装的 stylelint 版本时>=15.0，使用脚本命令时会出现 bug，请查看文章[stylelint v15 导致的报错](/notes/pit/others#stylelint-v15)
:::

## husky

虽然我们在上面配置了`eslint prettier stylelint`，但是对于有些不适用 vscode，或者没有安装对应插件，且没有配置自动保存时，就不能实现修复和格式化代码。

未修复和格式化的代码提交到`git`是不符合要求的。因此需要`husky`来强制验证提交的代码是否通过验证。

### 安装依赖

```shell
pnpm install husky -D
```

### 添加脚本命令

在`package.json`中`script`添加命令：

```
"scripts": {
  "prepare": "husky install"
}
```

该命令会在 pnpm install 之后运行，这样其他克隆该项目的同学就在安装依赖的时候就会自动执行该命令来安装 husky。这里我们就不重新执行 pnpm install 了，直接执行 pnpm prepare，这个时候你会发现多了一个.husky 目录。

运行`husky`生成`pre-commit`钩子

```shell
pnpm husky add .husky/pre-commit "pnpm lint && pnpm format && pnpm lint:style"
```

当我们执行 git commit 的时候就会执行 pnpm lint 与 pnpm format，当这两条命令出现报错，就不会提交成功。

::: tip
如果你也是跟我一样一步一步搭建框架，那你会碰到以下问题：

- 在执行运行`husky`时会出现
  > husky - can't create hook, .husky directory doesn't exist (try running husky install)
  > 因为一步一步搭建是已经安装过依赖，所以并不会执行`pnpm prepare`，我们需要手动执行这个命令来生成`.husky`文件夹
- 执行`husky`时也会出现另一个问题
  > husky - git command not found, skipping install
  > 原因是没有初始化项目的`git`仓库，执行`git init`后再执行命令即可

:::

## lint-staged

lint-staged 是什么？

- 一个仅仅过滤出 Git 代码暂存区文件(被 git add 的文件)的工具
- 对个人要提交的代码的一个规范和约束
- 是一个在 git 暂存文件上（也就是被 git add 的文件）运行已配置的 linter（或其他）任务。lint-staged 总是将所有暂存文件的列表传递给任务。

### 安装依赖

```shell
pnpm install lint-staged -D
```

### 添加 lint-staged 配置

在`package.json`中新建`lint-staged`：

```json
{
  "scripts": {

  },
  "lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{cjs,json}": [
      "prettier --write"
    ],
    "*.{vue,html}": [
      "eslint --fix",
      "prettier --write",
      "stylelint --fix"
    ],
    "*.{scss,css}": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.md": [
      "prettier --write"
    ]
  }
}
```

### 添加脚本命令

在`package.json`中`script`添加命令：

```json
{
  "scripts": {
    "lint-staged": "lint-staged"
  }
}
```

### 修改 `.husky/pre-commit`

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint && pnpm format && pnpm lint:style // [!code --]
pnpm lint-staged // [!code ++]
```

## commitlint

### 安装依赖

```shell
pnpm install @commitlint/cli @commitlint/config-conventional -D
```

### commitlint.config.js

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > .commitlintrc.cjs
```

### 添加 githook

```shell
pnpm husky add .husky/commit-msg 'npx --no --commitint --edit "${1}"'
```

## 标准化规范化 commit message

`commitizen`和`cz-git`来实现标准和规范化的 commit message

> 什么是 commitizen：基于 Node.js 的 git commit 命令行工具，辅助生成标准化规范化的 commit message。
> 什么是适配器（cz-git）：更换 commitizen 命令行工具的 交互方式 插件。

### 安装依赖

```shell
pnpm install commitizen cz-git -D
```

### 添加 config 指定使用的适配器

在`package.json`中添加`config`配置：

```json
{
  "scripts": {

  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

### 更改.commitlintrc.cjs 配置

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
    // prettier-ignore
    types: [
      { value: 'feat', name: 'feat:     ✨  A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  A bug fix', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     📝  Documentation only changes', emoji: ':memo:' },
      { value: 'style', name: 'style:    💄  Markup, white-space, formatting, missing semi-colons...', emoji: ':lipstick:' },
      { value: 'refactor', name: 'refactor: ♻️  A code change that neither fixes a bug or adds a feature', emoji: ':recycle:' },
      { value: 'perf', name: 'pref:     ⚡️  A code change that improves performance', emoji: ':zap:' },
      { value: 'test', name: 'test:     ✅  Adding missing tests or correcting existing tests', emoji: ':white_check_mark:' },
      { value: 'build', name: 'build:    📦️  Changes that affect the build system or external dependencies', emoji: ':package:' },
      { value: 'ci', name: 'ci:       🎡  Changes to our CI configuration files and scripts', emoji: ':ferris_wheel:' },
      { value: 'revert', name: 'revert:   ⏪️  Reverts a previous commit', emoji: ':rewind:' },
      { value: 'chore', name: 'chore:    🔨  Other changes that don\'t modify src or test files', emoji: ':hammer:' },
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

### 添加脚本命令

在`package.json`中`script`添加命令：

```json
{
  "scripts": {
    "commit": "git-cz"
  }
}
```

## editorconfig

完成上面的配置后，有可能会出现莫名其妙的报错，如:

`Delete `␍`eslint(prettier/prettier) `

新建`.editorconfig`:

```
# http://editorconfig.org
root = true

# 表示所有文件适用
[*]
charset = utf-8 # 设置文件字符集为 utf-8
end_of_line = lf # 控制换行类型(lf | cr | crlf)
indent_style = space # 缩进风格（tab | space）
insert_final_newline = true # 始终在文件末尾插入一个新行

# 表示仅 md 文件适用以下规则
[*.md]
max_line_length = off # 关闭最大行长度限制
trim_trailing_whitespace = false # 关闭末尾空格修剪

```
