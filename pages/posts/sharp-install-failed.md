---
title: 安装sharp导致的问题
date: 2024-07-15
duration: 34min
---

[[toc]]

## 问题发现

之前看到了[antfu.me](https://antfu.me/)这个博客，很符合我对博客心目中的样子。看了下仓库，发现代码是MIT协议后，我决定要弄一个这样的博客，并改成对自己来说更好的样子。前两天心血来潮果断拉取了项目代码就开始了一顿操作。

然而我今天在公司也想 pull 来看看，却发现 `pnpm install` 后有报错:

<img src="/images/sharp-install-failed.png" />

图中显示 sharp 包所需要的 `sharp-libvips` 安装不了。sharp版本为0.32.6

## 解决问题

我来到 github 查看了`sharp`仓库，这是一个高性能 Node.js 图像处理，调整 JPEG、PNG、WebP、AVIF 和 TIFF 图像大小的最快模块。使用 libvips 库。它是基于`libvips`的，所有我又找到了`sharp-libvips`这个库。有了一点点了解后我开始利用搜索引擎查找`安装sharp失败`，得到的结果有：

- npm，单独给sharp和sharp-libvips设置源
- npm，手动下载sharp-libvips包，然后放到npm cache中
- npm，让我`npm i -g windows-build-tools`，没发现有用

得到的其他结果都是使用npm，我使用的是pnpm，也试过了这些方法都没有解决。

于是回到我自己电脑上看能跑起来的博客，在node_modules看了sharp文件夹，和现在下载失败的sharp文件对比了一下，刚好就少了`sharp-libvips`包和通过`sharp-libvips`打包后的产物`build`。

```
├── noed_modules
│   └── sharp
│       ├── build
│       │   └── Release
│       ├── vendor
│       │   └── 8.14.5
│       │       └── win32-x64
```

我就想着能不能下载这个包，我从上面错误信息中下载了这个包 [sharp-libvips](https://github.com/lovell/sharp-libvips/releases/download/v8.14.5/libvips-8.14.5-win32-x64.tar.br)，我却发现解压不了，顺便怀疑了是不是下载依赖无法解压这个tar.br包，我来到其github仓库，找到release找到对应版本下载了tar.gz的压缩包，解压后得到的产物和自己电脑上的相同，于是我就粘贴到`win320x64`文件夹下了。

再次`pnpm install`, 上次的错误消失了，但是有了新的报错:

<details>
<summary>点击展开代码</summary>
```
PS E:\personal\leet.me> pnpm install
Lockfile is up to date, resolution step is skipped
Packages: +763
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 763, reused 763, downloaded 0, added 0, done
node_modules/.pnpm/sharp@0.32.6/node_modules/sharp: Running install script, failed in 11.6s
.../sharp@0.32.6/node_modules/sharp install$ (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)
│ sharp: Using existing vendored libvips v8.14.5
│ sharp: Creating E:\personal\leet.me\node_modules\.pnpm\sharp@0.32.6\node_modules\sharp\build\Release
│ sharp: Copying DLLs from E:\personal\leet.me\node_modules\.pnpm\sharp@0.32.6\node_modules\sharp\vendor\8.14.5\win32-x64\lib to E:\personal\leet.me\node_modules\.pnpm\sharp@0.32.6\node_modules\sharp\build\Rel…
│ prebuild-install warn install aborted
│ E:\personal\leet.me\node_modules\.pnpm\sharp@0.32.6\node_modules\sharp>if not defined npm_config_node_gyp (node "C:\Users\Admin\AppData\Roaming\npm\node_modules\pnpm\dist\node-gyp-bin\\..\node_modules\node-g…
│ gyp info it worked if it ends with ok
│ gyp info using node-gyp@9.4.1
│ gyp info using node@20.10.0 | win32 | x64
│ gyp ERR! find Python
│ gyp ERR! find Python Python is not set from command line or npm configuration
│ gyp ERR! find Python Python is not set from environment variable PYTHON
│ gyp ERR! find Python checking if "python3" can be used
│ gyp ERR! find Python - "python3" is not in PATH or produced an error
│ gyp ERR! find Python checking if "python" can be used
│ gyp ERR! find Python - "python" is not in PATH or produced an error
│ gyp ERR! find Python checking if Python is

...

</details>
```

它要进行打包生成build中的产物，在这里出错了，应该是需要python环境才能进行打包。我看了自己电脑上确实有python，所以我就安装了一个python 3.12。再次`pnpm install`，还是同样的错误，原来是忘了设置pnpm的python路径，可以在系统搜索到后打开文件所在位置就能得到路径。

```
pnpm config set python <python路径>
```

再次`pnpm install`，这次发现依赖已经下载成功了。我以为已经解决问题了，于是`pnpm dev`启动项目时又有报错:

<img src="/images/sharp-start-failed.png" />

我用了提示中的命令都不行。

```
npm install --ignore-scripts=false --foreground-scripts --verbose sharp

npm install --platform=win32 --arch=x64 sharp
```

后面我又去对比了下我的电脑和现在电脑的build的文件，发现少了三个文件，只有最后两个文件。

```
├── build
│   └── Release
│       ├── libglib-2.0-0.dll
│       │── libgobject-2.0-0.dll
│       ├── libvips-42.dll
│       │── libvips-cpp.dll
│       │── sharp-win32-x64.node
```

于是我就把另外三个文件粘贴过来，再次`pnpm dev`，启动成功！

但是这种
