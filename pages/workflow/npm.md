---
title: npm 常用命令
date: 2024-07-25
duration: 3min
type: workflow
art: random
---

::: demo
/examples/button
:::

## 镜像管理

查看镜像源

```shell
npm config get registry
```

设置镜像源

```shell
npm config set registry https://registry.npmjs.org/
```

::: tip 可用镜像源

- npm 官方 https://registry.npmjs.org/
- yarn https://registry.yarnpkg.com/
- cnpm https://r.cnpmjs.org/
- 淘宝 https://registry.npmmirror.com/ (https://registry.npm.taobao.org 已过期)
- 腾讯云 https://mirrors.cloud.tencent.com/npm/
- 华为云 https://mirrors.huaweicloud.com/repository/npm/

:::

nrm 镜像管理

```shell
npm i -g nrm

# 查看 nrm 支持的源
nrm ls
# npm ---------- https://registry.npmjs.org/
# yarn --------- https://registry.yarnpkg.com/
# tencent ------ https://mirrors.cloud.tencent.com/npm/
# cnpm --------- https://r.cnpmjs.org/
# taobao ------- https://registry.npmmirror.com/
# npmMirror ---- https://skimdb.npmjs.com/registry/

# 切换源
nrm use cnpm
```

设置项目源

只能在项目中生效，需要在项目根目录新建 `.npmrc` 并写入:

```txt
registry=https://registry.npmmirror.com/
```

## 发布 npm 包

1. 初始化项目

具体的 `package.json` 内容自行调整填写

```shell
npm init -y
```

2. 登录 npm

```shell
npm login
```

::: warning
请确保正在使用的镜像是 npm 官方源

切换到官方源: `npm config set registry https://registry.npmjs.org/`

或者使用nrm切换源: `nrm use npm`
:::

3. 发布

记得在 `package.json version` 进行版本迭代

```shell
npm publish

# 如果没有切换镜像到 npm 官方源可以使用以下方式
npm publish --registry https://registry.npmjs.org/
```
