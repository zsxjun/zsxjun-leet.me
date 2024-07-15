---
title: 包管理器
date: 2023-12-20
duration: 34min
art: random
---

[[toc]]

现如今创建的项目基本上都是基于`React`，`Vue`。所以必然离不开`npm`这个包管理器，其优秀的 包版本管理机制承载了整个繁荣发展的Node.js社区，理解其内部机制非常有利于加深我们对模块开发的理解、各项前端工程化的配置以加快我们排查问题（相信不少同学收到过各种依赖问题的困扰）的速度。

## package.json

在 node.js 中，模块是一个库或者框架，也是一个 node.js 项目。node.js 项目遵循模块化的架构，当我们创建了一个项目，意味着创建了一个模块，而这个模块必须有一个描述文件，即`package.json`。一个合理的`package.json`配置文件能直接决定我们项目的质量。

### 必备属性

`package.json`中有多个属性，其中`name`, `version`是必填的，这两个属性组成一个`npm`模块的唯一标识。

#### npm 包命名规范

`name`在命名时需要遵循官方的规范和建议:

- 包名会成为模块 url、命令行中的参数或者一个文件夹名称，所以非 url 安全的字符都不能使用，我们可以使用`validate-npm-package-name`包来检测名称是否合法
- 语义化，能帮助开发者更快找到包
- 若包名存在一些符号，将符号去除后不得与现有包名重复
  > `react-native`存在即不能创建`reactnative`
- 如果包名和现有的包名太相近导致不能发布，你可以发布到自己的作用域下
  > 比如`leet`, 那么发布的包可以说`@leet/hooks`

#### 查看包是否被占用

控制台执行`npm view [packageName]`可查看包是否被占用，若不存在被占用则会显示`404`。

### 描述信息

<br/>

#### 基本描述

```json
{
  "description": "Some descriptions of the module",
  "keywords": ["component", "design", "framework", "frontend", "react", "ui"]
}
```

基本描述有利于其他人了解你的模块，并且有助于检索模块。当你使用`npm search`时会和 `description` 和 `keywords` 进行匹配。有点类似于`html`的`<meta name="description">`和`<meta name="keyword">`，有利于搜索引擎的检索。

#### 开发人员

包含`author`和`contributors`，字面意思就是作者和贡献者，作者只有一个人，贡献者包含多个人。

```json
// 每个人员信息包含下面三个字段或者时一个字符串描述
{
  "author": {
    "name": "Leet",
    "email": "1414395519@qq.com",
    "url": "https://github.com/skyline523"
  },
  "contributors": [
    "a contributor ......",
    {
      "name": "Leet",
      "email": "1414395519@qq.com",
      "url": "https://github.com/skyline523"
    }
  ]
}
```

#### 地址

```json
{
  // 指定模块的主页
  "homepage": "https://react.dev/",
  // 指定一个地址或邮箱，其他开发者可以向你提问
  "bugs": {
    "url": "https://github.com/facebook/react/issues"
  },
  // 指定模块的代码仓库
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react"
  }
}
```

### 依赖配置

我们的项目可能会依赖其他多个外部依赖包，根据依赖包的不同途径可分为以下几个:

- dependencies
- devDependencies
- peerDependencies
- bundleDependencies
- optionalDependencies

#### 配置规则

你看到的依赖包配置可能有以下几种情况：

```json
{
  "axios": "^1.2.0",
  "antd": "ant-design/ant-design#4.0.0-alpha.8",
  "test-js": "file:../test",
  "test2-js": "http://cdn.com/test2-js.tar.gz",
  "core-js": "^1.1.5"
}
```

- `NAME:VERSION` 是一个遵循 [SemVer 规范](https://semver.org/lang/zh-CN/) 的版本号配置，`npm install` 时将到 npm 服务器下载符合指定版本范围的包
- `NAME:DOWNLOAD_URL` 是一个可下载的 `tarball` 压缩包地址，模块安装时会把这个 `.tar` 安装到本地
- `NAME:LOCAL_PATH` 是一个本地的依赖包路径，适用于在本地测试一个 npm 包，但不适用于线上
- `NAME:GITHUB_URL` 即 github 的 `username/module_name` 的写法，比如 `ant-design/ant-design`, 你还可以在后面指定 tag 和 commit_id
- `NAME:GIT_URL` 即通过`git clone [url]`克隆代码的url

::: tip
`tarball` 是一组打包成单个文件的文件，然后使用 `gzip` 压缩程序进行压缩。

`git clone [url]` 中的 url 遵循以下形式:

```
<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]

比如：

git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+ssh://user@hostname/project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish
```

:::

#### `dependencies`

`dependencies`字段指定了项目运行所需依赖的模块。安装依赖是使用`--save`参数可将该模块写入到 dependencies 属性，安装依赖是默认安装到 dependencies，故可不用添加该参数。

```
"dependencies": {
  "vite": "^3.3.2"
}
```

::: tip 版本说明
上面有说过版本号是遵循 [SemVer 规范](https://semver.org/lang/zh-CN/) 的，这里还是提出几个常用写法的意思：

- `3.3.2`: 只安装指定版本
- `~3.3.2`: 表示安装 3.3.x 的最新版本
- `^3.3.2`: 表示安装 3.x.x 的最新版本
- `latest`: 表示安装最新版本

:::

#### `devDependencies`

`devDependencies` 字段指定了项目开发所需依赖的模块。有一些包有可能你只是在开发环境中用到，例如拟用于检测代码规范的 `eslint`, 用于进行测试的 `vitest`。 用户不安装这些依赖也能正常运行项目。安装依赖是使用 `--save-dev` 或 `-D` 参数可将该模块写入到 `devDependencies`属性

```
"devDependencies": {
  "eslint": "^8.56.0",
  "vitest": "latest"
}
```

#### `peerDependencies`

当我们开发一个模块的时候，如果当前模块与所依赖的模块同时依赖一个第三方模块，并且依赖的是两个不兼容的版本时就会出现问题。`peerDependencies`用于指定你正在开发的模块所依赖的版本以及用户安装的依赖包版本的兼容性。这部分虽然平时开发项目不常用，但开发需要发布的 npm 包可能需要用上，而且并不太好理解。

它的几个作用点：

- 插件正确运行的前提是，核心依赖库必须先下载安装，不能脱离核心依赖库而被单独依赖并引用
- 插件入口 api 的设计必须要符合核心依赖库的规范
- 插件的核心逻辑运行在依赖库的调用中
- 在项目实践中，同一插件体系下，核心依赖库版本最好是相同的

假设现在有一个`工程A`，已经在其`package.json`的`dependencies`中声明了`packageA`， 有两个插件`插件1`和`插件2`他们也依赖`packageA`，如果在插件中使用`dependencies`而不是`peerDependencies`来声明`packageA`，那么在安装完依赖后的依赖图是这样的：

```
├── 工程A
│   └── node_modules
│       ├── packageA
│       ├── 插件1
│       │   └── nodule_modules
│       │       └── packageA
│       └── 插件2
│       │   └── nodule_modules
│       │       └── packageA
```

显而易见，`packageA`安装了三次，有两次安装是冗余的。

如果使用`peerDependencies`来声明`插件1`和`插件2`的依赖:

```json
{
  "peerDependencies": {
    "packageA": "1.0.1"
  }
}
```

那么在安装完依赖后的依赖图是这样的：

```
├── 工程A
│   └── node_modules
│       ├── packageA
│       ├── 插件1
│       └── 插件2
```

- 如果用户显式依赖了核心库，则可以忽略各插件的 `peerDependency` 声明
- 如果用户没有显式依赖核心库，则按照插件 `peerDependencies` 中声明的版本将库安装到项目根目录中
- 当用户依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复

#### `optionalDependencies`

在某些场景下，依赖包可能不是强依赖，这个依赖包可有可无，当这个依赖包无法被获取时，你希望`npm install`继续运行，而不会导致失败，你可以将依赖放到`optionalDependencies`中。

::: tip
`optionalDependencies`中的配置将会覆盖掉`dependencies`，所以只需在一个地方进行配置

引用了`optionalDependencies`中安装的依赖时，需要做好异常处理，否者在模块获取不到时会报错
:::

#### `bundledDependencies`

`bundledDependencies` 的值是一个数组，数组里可以指定一些模块，这些模块将在这个包发布时被一起打包。

```
"bundledDependencies": ["package1" , "package2"]
```

### 协议

```json
{
  "license": "MIT"
}
```

`license` 字段用于指定软件的开源协议，开源协议里面详尽表述了其他人获得你代码后拥有的权利，可以对你的的代码进行何种操作，何种操作又是被禁止的。同一款协议有很多变种，协议太宽松会导致作者丧失对作品的很多权利，太严格又不便于使用者使用及作品的传播，所以开源作者要考虑自己对作品想保留哪些权利，放开哪些限制。

> 软件协议可分为开源和商业两类，对于商业协议，或者叫法律声明、许可协议，每个软件会有自己的一套行文，由软件作者或专门律师撰写，对于大多数人来说不必自己花时间和精力去写繁长的许可协议，选择一份广为流传的开源协议就是个不错的选择。

- `MIT` 只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任
- `Apache` 类似于 `MIT`，同时还包含了贡献者向用户提供专利授权相关的条款
- `GPL` 修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改

### 目录、文件相关

#### `main`

```json
{
  "main": "lib/index.js"
}
```

`main`可以指定程序的主入口文件，例如`element-plus`的模块入口是`lib/index.js`，当我们引入`import { el-button } from 'element-plus`，实际上就是`lib/index.js`中暴露出去的模块。

#### `bin`

许多`package`都有一个或多个可执行文件，它们希望将其安装到 `PATH` 中。npm 使这变得非常简单（事实上，它使用此功能来安装“npm”可执行文件。）

要使用它，请在 `package.json` 中提供一个 `bin` 字段，它是命令名到本地文件名的映射。当此软件包全局安装时，该文件将链接到全局 bins 目录内，或者将创建一个 cmd（Windows 命令文件）来执行 `bin` 字段中的指定文件，因此可以按`name`或`name.cmd`（在 Windows PowerShell 上）运行。当此包作为另一个包中的依赖项安装时，该文件将被链接到该包可以直接通过 `npm exec` 或通过 `npm run-script` 调用其他脚本时通过名称来访问该文件。

```json
{
  "bin": {
    "myapp": "./cli.js"
  }
}
```

因此，当您安装 myapp 时，如果是类 Unix 操作系统，它将创建一个从 cli.js 脚本到 `/usr/local/bin/myapp` 的符号链接，如果是 Windows，它将创建一个 cmd 文件，通常位于 `C:\Users\{username}\AppData\Roaming\npm\myapp.cmd` 运行 cli.js 脚本。

如果您有一个可执行文件，并且其名称应该是包的名称，那么您可以将其作为字符串提供。例如：

```
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": "./path/to/program"
}

// 等同于
{
  "name": "my-program",
  "version": "1.2.5",
  "bin": {
    "my-program": "./path/to/program"
  }
}
```

请确保 `bin` 中引用的文件以 `#!/usr/bin/env` 节点开头，否则脚本将在没有节点可执行文件的情况下启动！

#### `files`

```json
{
  "files": ["dist", "lib", "es"]
}
```

可选`files`字段是一个数组，描述当您的包作为依赖项 `npm publish` 推送到`npm`服务器文件列表。`files`遵循与 .gitignore 类似的语法，但相反：包含文件、目录或glob模式（_、\*\*/_ 等）将使文件在打包时包含在tarball中。省略该字段将使其默认为 ["*"]，这意味着它将包含所有文件。

一些特殊的文件和目录也会被包含或排除，无论它们是否存在于文件数组中（见下文）。

您还可以在包的根目录或子目录中提供 .npmignore 文件，这将防止包含文件。在包的根目录中，它不会覆盖“文件”字段，但在子目录中它会覆盖。 .npmignore 文件的工作方式与 .gitignore 类似。如果存在 .gitignore 文件，并且缺少 .npmignore，则将使用 .gitignore 的内容。

始终包含的文件:

- `package.json`
- `README`
- `LICENSE` / `LICENCE`
- The file in the "main" field
- The file(s) in the "bin" field

始终不包含的文件:

- \*.orig
- .\*.swp
- .DS_Store
- .\_\*
- .git
- .npmrc
- .hg
- .lock-wscript
- .npmrc
- .svn
- .wafpickle-N
- CVS
- config.gypi
- node_modules
- npm-debug.log
- package-lock.json (如果你希望发布，请使用`npm-shrinkwrap.json`)
- pnpm-lock.yaml
- yarn.lock

#### `man`

`man` 命令是 Linux 下的帮助指令, 通过 `man` 指令可以查看 Linux 中的指令帮助、配置文件帮助和编程帮助等信息。

> 这个配置在通常开发下使用较少，不过多赘述，可以前往 [npm pacakge.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#man) 查看文档

#### `directories`

CommonJS 规范详细介绍了几种使用目录对象指示包结构的方法。如果你查看 npm 的 package.json，你会发现它有 doc、lib 和 man 目录。

将来，这些信息可能会以其他创造性的方式使用。

> 目前作用不大也不过多赘述

### 脚本配置

#### `scripts`

package.json 文件的`scripts`属性支持许多内置脚本及其预设生命周期事件以及任意脚本。这些都可以通过运行 `npm run-script <stage>` 或简称 `npm run <stage>` 来执行。具有匹配名称的前置和后置命令也将为这些命令运行（例如 premyscript、myscript、postmyscript）。依赖项中的脚本可以使用 `npm explore <pkg> -- npm run <stage>` 运行。

```json
{
  "scripts": {
    "test": "jest --config .jest.js --no-cache",
    "dist": "antd-tools run dist",
    "compile": "antd-tools run compile",
    "build": "npm run compile && npm run dist"
  }
}
```

#### `config`

`config` 字段用于配置脚本中使用的环境变量，例如下面的配置，可以在脚本中使用 `process.env.npm_package_config_port` 进行获取。

```json
{
  "config": {
    "port": "8080"
  }
}
```

### 发布配置

#### `preferGlobal`

如果你的 node.js 模块主要用于安装到全局的命令行工具，那么该值设置为`true`，当用户将该模块安装到本地时，将得到一个警告。这个配置并不会阻止用户安装，而是会提示用户防止错误使用而引发一些问题。

#### `private`

如果将 private 属性设置为 `true`，npm将拒绝发布它，这是为了防止一个私有模块被无意间发布出去。

#### `publishConfig`

发布模块时更详细的配置，例如你可以配置只发布某个`tag`、配置发布到的私有`npm`源。更详细的配置可以参考[npm-config](https://docs.npmjs.com/cli/v10/using-npm/config)

#### `os`

假如你开发了一个模块，只能跑在`darwin`系统下，你需要保证`windows`用户不会安装到你的模块，从而避免发生不必要的错误。

使用`os`属性可以帮助你完成以上的需求，你可以指定你的模块只能被安装在某些系统下，或者指定一个不能安装的系统黑名单：

```
"os" : [ "darwin", "linux" ]
"os" : [ "!win32" ]
```

> 在 node 环境下可以使用 process.platform 来判断操作系统

#### `cpu`

和上面的`os`类似，我们可以用`cpu`属性更精准的限制用户安装环境：

```
"cpu" : [ "x64", "ia32" ]
"cpu" : [ "!arm", "!mips" ]
```

> 在 node 环境下可以使用 process.arch 来判断 cpu 架构

## 包版本管理机制

`nodejs`离不开`npm`优秀的依赖管理系统。在介绍整个依赖系统之前，必须要了解 npm 如何管理依赖包的版本。

### 查看 npm 包版本

- `npm view <pkg> version`查看`<pkg>`的最新版本
- `npm view <pkg> versions`查看`<pkg>`在 npm 服务器上所有发布过的版本
- `npm ls`查看当前仓库依赖树上所有包的版本信息

### SemVer 规范

npm 包中的模块版本都需要遵循`SemVer`规范，是由`Github`起草的一个具有指定意义的，统一的版本号表示规则。（Sem[antic] Ver[sion]）语义化版本的缩写。

> 详细规范请查看[SemVer 规范官网](https://semver.org/)

#### 标准版本

`SemVer`规范的标准版本号采用`x.y.z`的格式，每位都是非负的整数，且禁止在数字前方补零。

- `x`: 主版本号(major)，当你做了不兼容的 API 修改
- `y`: 次版本号(minor)，当你做了向下兼容的功能新新增
- `z`: 修订号(patch)，当你做了向下兼容的问题修正

#### 先行版本

当某个版本改动比较大，并非稳定且可能无法满足预期的兼容性需求时，你可能要先发布一个现行版本。

现行版本号可以加到标准版本号的后面，先加上一个连接号再加上一连串以句点分割的标识符和版本编译信息。

比如`vitepress`的版本号：

<!-- <ZoomImg
  src="/assets/articles/engineering/vitepress_versions.png"
  desc="vitepress部分版本号"
/> -->

能看出常用的关键字:

- `alpha`内部版本
- `draft`草稿版本
- `beta`公测版本
- `rc(release candidate)`正式版本的候选版本

#### 发布版本

在修改`npm`包某些功能后通常需要发布一个新的版本，我们通常的做法就是直接修改`package.json`到指定版本。如果操作失误，很容易造成版本号混乱，我们可以借助符合`SemVer`规范的命令来完成这一操作:

- `npm version patch`: 升级修订版本号
- `npm version minor`: 升级次版本号
- `npm version major`: 升级主版本号

### 版本工具使用

如果需要对一些版本号的操作，如果这些版本号符合`SemVer`规范，我们可以借助`semver`包来帮助我们进行一些操作

> npm 也使用了该工具来处理版本相关的工作

```shell
npm install semver
```

其用法可以查看文档 [node-semver](https://github.com/npm/node-semver)

### 依赖版本管理

你能看懂下面这些依赖版本的关系吗？

```
"dependencies": {
  "@bassist/utils": "^0.14.0"
},
"devDependencies": {
  "@mdit-vue/shared": "^1.0.0",
  "@types/node": "^20.9.0",
  "feed": "^4.2.2",
  "medium-zoom": "^1.0.8",
  "sass": "^1.69.5",
  "vitepress": "1.0.0-rc.25",
  "vue": "^3.3.8"
}
```

除了上面三种版本的写法还包含另外一种写法: `*`。

- 固定版本号: `只有版本号`
- 任意版本: `*`
- 匹配主要版本: `^`
  > `x.y.z`，只保持主版本号`x`不变，`y`和`z`保持最新版本
- 匹配主要版本和次要版本: `~`
  > `x.y.z`，只保持修订版本号`z`为最新版本，`y`和`z`保持不变

::: tip
当主版本号为`0`的情况，会被认定为不稳定版本，情况有所不同:

- 主版本号和次版本号都为`0`: `~0.0.z`, `^0.0.z`都会被当作固定版本，安装依赖时均不会发生改变
- 主版本号为`0`: `^0.y.z`表现和`~0.y.z`相同，只保持修订号为最新版本

:::

### 锁定依赖版本

<br />

#### `package-lock.json`

> 项目中使用其他包管理器，`lock`文件和文件后缀会有所不同，但都是以`lock`结尾的文件。

实际开发中，经常会因为各种依赖不一致而产生奇怪的问题，或在某些场景下，不希望依赖被更新，建议在开发中使用`package-lock.json`。

锁定依赖版本意味着在我们不动手执行更新的情况下，每次安装依赖都会安装固定版本。保证整个团队使用版本号一致的依赖。

每次安装固定版本，无需计算依赖版本范围，大部分场景下能大大加速依赖安装时间。

> 使用 package-lock.json 要确保 npm 的版本在 5.6 以上，因为在 5.0 - 5.6 中间，对 package-lock.json 的处理逻辑进行过几次更新，5.6 版本后处理逻辑逐渐稳定。

> 详细结束跳转到[Lock 文件](/articles/engineering/package-manager#lock-文件)

#### 定期更新依赖

我们的目的是保证团队中使用的依赖一致或者稳定，而不是永远不去更新这些依赖。实际开发场景中，我们虽然不需要每次都去安装新版本，但仍然需要定时去升级依赖版本，来让我们享受依赖包升级带来的问题修复、性能提升、新特新更新等。

<!-- <ZoomImg
  src="/assets/articles/engineering/npm-outdated.png"
  desc="npm outdated查看依赖需要更新的列表"
/> -->

`npm outdated` 可以帮助列出有哪些没有升级到最新版本的依赖:

- 黄色表示不符合我们指定的语意化版本范围 - 不需要升级
- 红色表示符合指定的语意化版本范围 - 需要升级

`npm update`会升级所有红色依赖

::: tip
当你的项目选择了其他包管理器时，对应的命令也可能会改变，比如`pnpm`使用的升级依赖为`pnpm up`。不知道其他包管理器对应的命令时，请上对应官方文档查看。
:::

### 依赖版本选择的最佳实践

<br />

#### 版本发布

- 对外发布一个正式版本的 npm 包时，把它的版本标为`1.0.0`
- 某个包版本发行后，任何修改都必须以新版本发行
- 版本号严格按照`主版本.此版本.修订号`格式
- 版本号发布必须时严格递增的
- 发布重大版本或版本改动较大时，先发布`alpha\beta\rc`等先行版本

<br />

#### 依赖范围选择

- 主工程依赖了很多子模块，都是团队成员开发的`npm`包，此时建议把版本前缀改为`~`，如果锁定的话每次子依赖更新都要对主工程的依赖进行升级，非常繁琐，如果对子依赖完全信任，直接开启`^`每次升级到最新版本
- 主工程跑在`docker`线上，本地还在进行子依赖开发和升级，在`docker`版本发布前要锁定所有依赖版本，确保本地子依赖发布后线上不会出问题

<br />

#### 保持依赖一致

- 确保`npm`的版本在`5.6`以上，确保默认开启 `package-lock.json` 文件
- 由初始化成员执行 `npm inatall` 后，将 `package-lock.json` 提交到远程仓库。不要直接提交 `node_modules` 到远程仓库
- 定期执行 `npm update` 升级依赖，并提交 `lock` 文件确保其他成员同步更新依赖，不要手动更改 `lock` 文件

#### 依赖变更

- 升级依赖: 修改 `package.json` 文件的依赖版本，执行 `npm install`
- 降级依赖: 直接执行 `npm install package@version`(改动`package.json`不会对依赖进行降级)
- 注意改动依赖后提交`lock`文件

## `npm install` 原理 ~new

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef327ccaba5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="npm install流程"
/> -->

### 嵌套结构

执行`npm install`后，依赖包被安装到`node_modules`。在`npm`的早期版本，`npm`处理依赖的方式简单粗暴，以递归的形式，严格按照`package.json`结构以及子依赖包的`package.json`结构将依赖安装到它们各自的`node_modules`中。直到有子依赖包不再依赖其他模块。

比如现在有个模块`my-app`依赖了两个模块: `buffer`和`ignore`，其中`ignore`不依赖其他模块，`buffer`依赖`base64-js`和`ieee754`:

::: code-group

```json [my-app package.json]
{
  "name": "my-app",
  "dependencies": {
    "buffer": "^5.4.3",
    "ignore": "^5.1.4"
  }
}
```

```json [buffer package.json]
{
  "name": "buffer",
  "dependencies": {
    "base64-js": "^1.0.2",
    "ieee754": "^1.1.4"
  }
}
```

:::

那么执行`npm install`后得到的`node_modules`中模块目录结构是这样的:

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef33997d7f2~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="嵌套的模块目录结构"
/> -->

如果依赖的模块非常多就会出现这种情况:

- 在不同层级的依赖中，可能引用同一个模块，导致大量冗余
- 在 `Windows` 系统中，文件路径最大长度为 260 个字符，嵌套层级过深可能导致不可预知的问题

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef33d822969~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="多层嵌套的模块目录结构"
/> -->

### 扁平结构

为了解决上面的问题，`NPM`在`3.x`版本做了一次较大更新，将嵌套结构改为扁平结构: 不管是直接依赖还是子依赖都优先安装在`node_modules`根目录。

现在扁平结构下的目录是这样的:

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3518941f2~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
/> -->

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3519475d1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="扁平的模块目录结构"
/> -->

如果我们在`my-app`中又依赖了`base64-js@1.0.1`版本:

```json
{
  "name": "my-app",
  "dependencies": {
    "buffer": "^5.4.3",
    "ignore": "^5.1.4",
    "base64-js": "1.0.1"
  }
}
```

**_当安装到相同模块时，判断已安装的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的`node_modules`下安装该模块_**

此时的目录结构为:

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef355ae3b37~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
/> -->

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef35ae17872~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="根模块和子模块都包含同一模块的扁平模块目录结构"
/> -->

如果我们在项目中引用了一个模块，模块的查找流程从最里层找到最外层:

- 在当前模块路径下搜索
- 在当前模块`node_modules`路径下搜索
- 在上级模块的`node_modules`路径下搜索
- ...
- 直到搜索到全局路径中的`node_modules`

假设我们又依赖了一个包 buffer2@^5.4.3，而它依赖了包 base64-js@1.0.3，则此时的安装结构是下面这样的：

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef377260d67~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
/> -->

所以`npm 3.x`并未解决模块冗余问题，甚至会带来新的问题。

假设`my-app`没有依赖 `base64-js@1.0.1` 版本，而你同时依赖了依赖不同 `base64-js` 版本的 `buffer` 和 `buffer2`。由于在执行 `npm install` 的时候，按照 `package.json` 里依赖的顺序依次解析，则 `buffer` 和 `buffer2` 在 `package.json` 的放置顺序则决定了 `node_modules` 的依赖结构。

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3824eba10~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="先安装buffer2的模块目录结构"
/> -->

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef38a55f11e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="先安装buffer的模块目录结构"
/> -->

> 如果还没理解这两个结构是怎么形成的，仔细阅读: **_当安装到相同模块时，判断已安装的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的`node_modules`下安装该模块_**

另外，为了让开发者在安全的前提下使用最新的依赖包，我们在`pacakge.json`通常只会锁定大版本即`^x.y.z`，这意味着在某些依赖包小版本更新后，同样可能造成依赖结构的改动，依赖结构的不确定性可能会给程序带来不可预知的问题。

### Lock 文件

为了解决`npm install`的不确定性，在`5.x`版本新增了`package-lock.json`文件，而安装方式继续沿用扁平化的方式。

`package-lock.json`的作用时锁定依赖结构，即只要目录下有`package-lock.json`文件，那么每次执行`npm install`后生成的`node_modules`目录结构一定是完全相同的。

以下的依赖结构通过安装依赖后生成的`package-lock.json`如下:

::: code-group

```json [package.json]
{
  "name": "my-app",
  "dependencies": {
    "buffer": "^5.4.3",
    "ignore": "^5.1.4",
    "base64-js": "1.0.1"
  }
}
```

```json [package-lock.json]
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "base64-js": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.0.1.tgz",
      "integrity": "sha1-aSbRsZT7xze47tUTdW3i/Np+pAg="
    },
    "buffer": {
      "version": "5.4.3",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-5.4.3.tgz",
      "integrity": "sha512-zvj65TkFeIt3i6aj5bIvJDzjjQQGs4o/sNoezg1F1kYap9Nu2jcUdpwzRSJTHMMzG0H7bZkn4rNQpImhuxWX2A==",
      "requires": {
        "base64-js": "^1.0.2",
        "ieee754": "^1.1.4"
      },
      "dependencies": {
        "base64-js": {
          "version": "1.3.1",
          "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.3.1.tgz",
          "integrity": "sha512-mLQ4i2QO1ytvGWFWmcngKO//JXAQueZvwEKtjgQFM4jIK0kU+ytMfplL8j+n5mspOfjHwoAg+9yhb7BwAHm36g=="
        }
      }
    },
    "ieee754": {
      "version": "1.1.13",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.1.13.tgz",
      "integrity": "sha512-4vf7I2LYV/HaWerSo3XmlMkp5eZ83i+/CDluXi/IGTs/O1sejBNhTtnxzmRZfvOUqj7lZjqHkeTvpgSFDlWZTg=="
    },
    "ignore": {
      "version": "5.1.4",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.1.4.tgz",
      "integrity": "sha512-MzbUSahkTW1u7JpKKjY7LCARd1fU5W2rLdxlM4kdkayuCwZImjkpluF9CM1aLewYJguPDqewLam18Y6AU69A8A=="
    }
  }
}
```

:::

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3a81eb51f~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="package-lock.json结构"
/> -->

最外面的两个属性`name`、`version`同`package.json`中的，用以描述当前包名和版本。

`dependencies`是一个对象，对象和`node_modules`中的包结构一一对应，对象的`key`为包名，值为包的一些描述信息:

- `version`: 包版本，当前安装在 node_modules 中的版本
- `resolved`: 包具体的安装来源
- `integrity`: 包`hash`值，基于`Subresource Integrity`来验证已安装的软件包是否被改动过、是否已失效
- `requires`: 对应子依赖的依赖，与子依赖的`package.json`中`dependencies`的依赖项相同
- `dependencies`: 结构和外层的`dependencies`结构相同，安装在子依赖 node_modules 中的依赖包

> 并不是所有的子依赖都有`dependencies`属性，只有子依赖的依赖和当前安装在根目录的`node_modules`中的依赖冲突之后，才会有这个属性。

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef35ae17872~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="根模块和子模块都包含同一模块的扁平模块目录结构"
/> -->

我们在`my-app`中依赖的`base64-js@1.0.1`与`buffer`中依赖的`base64-js@1.0.2`发生冲突，所以`base64-js@1.0.1`需要安装在`buffer`包的`node_modules`中，对应了`package-lock.json`中`buffer`的`dependencies`属性。这也对应了`npm`对依赖的扁平化处理方式

所以，根据上面的分析， `package-lock.json` 文件 和 `node_modules` 目录结构是一一对应的，即项目目录下存在 `package-lock.json` 可以让每次安装生成的依赖目录结构保持相同。

另外，项目中使用了 `package-lock.json` 可以显著加速依赖安装时间。

我们使用` npm i --timing=true --loglevel=verbose` 命令可以看到 `npm install` 的完整过程，下面我们来对比下使用 `lock` 文件和不使用 `lock` 文件的差别。在对比前先清理下`npm`缓存。

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef39713273a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="不使用lock文件"
/> -->

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3b5e532e0~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="使用lock文件"
/> -->

可见， `package-lock.json` 中已经缓存了每个包的具体版本和下载链接，不需要再去远程仓库进行查询，然后直接进入文件完整性校验环节，减少了大量网络请求。

::: info 使用建议

在开发系统应用时，建议把`package-lock.json`文件提交到代码仓库，从而保证团队开发者以及`CI`环节可以执行`npm install`时安装的依赖版本都是一致的。

在开发一个`npm`包 时，你的`npm`包 是需要被其他仓库依赖的，由于上面我们讲到的扁平安装机制，如果你锁定了依赖包版本，你的依赖包就不能和其他依赖包共享同一 `semver` 范围内的依赖包，这样会造成不必要的冗余。所以我们不应该把`package-lock.json`文件发布出去（`npm`默认也不会把`package-lock.json`文件发布出去）。

:::

### 缓存

在执行`npm install`或`npm update`下载依赖后，除了将安装包安装在`node_modules`目录下，还会在本地缓存一份。

通过 `npm config get cache` 命令可以查询到：在 Linux 或 Mac 默认是用户主目录下的 `.npm/_cacache` 目录。

在这个目录下又存在两个目录：`content-v2`、`index-v5`，`content-v2`目录用于存储`tar`包的缓存，而`index-v5`目录用于存储`tar`包的`hash`。

npm 在执行安装时，可以根据 `package-lock.json` 中存储的 `integrity`、`version`、`name` 生成一个唯一的 `key` 对应到 `index-v5` 目录下的缓存记录，从而找到`tar`包的 `hash`，然后根据 `hash` 再去找缓存的 `tar` 包直接使用。

```shell
grep "https://registry.npmjs.org/base64-js/-/base64-js-1.0.1.tgz" -r index-v5
```

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3b8fb68f5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
/> -->

```json
{
  "key": "pacote:version-manifest:https://registry.npmjs.org/base64-js/-/base64-js-1.0.1.tgz:sha1-aSbRsZT7xze47tUTdW3i/Np+pAg=",
  "integrity": "sha512-C2EkHXwXvLsbrucJTRS3xFHv7Mf/y9klmKDxPTE8yevCoH5h8Ae69Y+/lP+ahpW91crnzgO78elOk2E6APJfIQ==",
  "time": 1575554308857,
  "size": 1,
  "metadata": {
    "id": "base64-js@1.0.1",
    "manifest": {
      "name": "base64-js",
      "version": "1.0.1",
      "engines": {
        "node": ">= 0.4"
      },
      "dependencies": {},
      "optionalDependencies": {},
      "devDependencies": {
        "standard": "^5.2.2",
        "tape": "4.x"
      },
      "bundleDependencies": false,
      "peerDependencies": {},
      "deprecated": false,
      "_resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.0.1.tgz",
      "_integrity": "sha1-aSbRsZT7xze47tUTdW3i/Np+pAg=",
      "_shasum": "6926d1b194fbc737b8eed513756de2fcda7ea408",
      "_shrinkwrap": null,
      "bin": null,
      "_id": "base64-js@1.0.1"
    },
    "type": "finalized-manifest"
  }
}
```

上面的 `_shasum` 属性 `6926d1b194fbc737b8eed513756de2fcda7ea408` 即为 `tar` 包的 `hash`， `hash`的前几位 `6926` 即为缓存的前两层目录，我们进去这个目录果然找到的压缩后的依赖包：

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3bc635b03~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
/> -->

> 以上的缓存策略是从 npm v5 版本开始的，在 npm v5 版本之前，每个缓存的模块在 ~/.npm 文件夹中以模块名的形式直接存储，储存结构是{cache}/{name}/{version}。

`npm` 提供了几个命令来管理缓存数据：

- `npm cache add`：官方解释说这个命令主要是 npm 内部使用，但是也可以用来手动给一个指定的 `package` 添加缓存。
- `npm cache clean`：删除缓存目录下的所有数据，为了保证缓存数据的完整性，需要加上 `--force` 参数。
- `npm cache verify`：验证缓存数据的有效性和完整性，清理垃圾数据。

基于缓存数据，`npm` 提供了离线安装模式，分别有以下几种：

- `--prefer-offline`： 优先使用缓存数据，如果没有匹配的缓存数据，则从远程仓库下载。
- `--prefer-online`： 优先使用网络数据，如果网络数据请求失败，再去请求缓存数据，这种模式可以及时获取最新的模块。
- `--offline`： 不请求网络，直接使用缓存数据，一旦缓存数据不存在，则安装失败。

### 文件完整性

在下载依赖包之前，我们一般就能拿到 npm 对该依赖包计算的`hash`值，执行`npm info <pkg>`，`shasum`就是`hash`。

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef3c2a2dac0~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="npm info express"
/> -->

用户下载依赖包到本地后，需要确定在下载过程中没有出现错误，所以在下载完成之后需要在本地再计算一次文件的 `hash` 值，如果两个 `hash` 值是相同的，则确保下载的依赖是完整的，如果不同，则进行重新下载。

### 整体流程

- 检查`.npmrc`文件: 优先级为: 项目级的`.npmrc`文件 > 用户级的`.npmrc`文件 > 全局级的`.npmrc`文件 > npm 内置的`.npmrc`文件
- 检查项目中有无`lock`文件
- 无`lock`文件
  - 从 npm 远程仓库获取包信息
  - 根据`package.json`构建依赖书，构建过程:
    1. 构建依赖树时，不管其是直接依赖还是子依赖的依赖，优先将其放置在`node_modules`根目录。
    2. 当遇到相同模块时，判断已放置在依赖树的模块版本是否符合新模块的版本范围，如果符合则跳过，不符合则在当前模块的`node_modules`下放置该模块。
    3. 注意这一步只是确定逻辑上的依赖树，并非真正的安装，后面会根据这个以来结构去下载或者拿到缓存中的依赖包
  - 在缓存中依次查找依赖树中的每个包
    - 不存在缓存:
      1. 从 npm 远程仓库下载包
      2. 校验包的完整性
      3. 校验不通过:
         - 重新下载
      4. 校验通过:
         - 将下载的包复制到 npm 缓存目录
         - 将下载的包按照依赖结构解压到`node_modules`
    - 存在缓存: 将缓存按照依赖结构解压到`node_modules`
  - 将包解压到`node_modules`
  - 生成`lock`文件
- 有`lock`文件
  - 检查`package.json`中的依赖版本是否和`package-lock.json`中的依赖有冲突
  - 如果没有冲突，直接跳过获取包信息、构建依赖树过程，开始在缓存中查找包信息，后续过程相同从检查缓存开始

<!-- <ZoomImg
  src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/16/16f0eef327ccaba5~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png"
  desc="npm install流程"
/> -->

这个过程还包含了一些其他的操作，例如执行你定义的一些生命周期函数，你可以执行 `npm install package --timing=true --loglevel=verbose` 来查看某个包具体的安装流程和细节。

## 参考

[package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
[前端工程化 - 剖析 npm 的包管理机制](https://juejin.cn/post/6844904022080667661)
[一文搞懂 peerDependencies](https://segmentfault.com/a/1190000022435060)
