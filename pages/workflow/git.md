---
title: git 常用命令
date: 2024-07-26
duration: 4min
type: workflow
art: random
---

[[toc]]

## 管理和使用远程仓库

### 查看所有仓库

```bash
# 查看远程仓库的简写名
git remote

# 查看远程仓库的简写名和 URL
git remote -v

# 查看某个仓库 git remote show <remote>
git remote show origin
```

### 添加仓库

```bash
# git remote add <shortname> <url>
git remote add origin xxx.git
```

### 修改仓库地址

```bash
# git remote set-url <remote> <new url>
git remote set-url origin xxx2.git
```

### 抓取和拉取仓库

`fetch`会访问远程仓库并从中拉取所有你还没有的数据，包括所有分值的引用。

如果你是 `clone` 项目，那么会自动添加为远程仓库并默认为 `origin`。

> [!TIP]
> `git fetch` 只会拉取数据到本地仓库，并不会合并或修改你当前的工作

```bash
# git fetch <remote> 来抓取远程仓库的新数据
git fetch origin

# git pull <remote> 拉取远程仓库的新数据(会尝试自动合并)
git pull origin
```

如果未指定简写名，将默认识别最初设置的服务器

### 推送到远程仓库

```bash
# git push <remote> <branch>
git push origin master
```

### 仓库重命名和删除

```bash
# git remote rename <old remote> <new remote> 重命名仓库
git remote rename origin pb
```

```bash
# git remote remove <remote> 删除仓库
git remote remove origin
```
