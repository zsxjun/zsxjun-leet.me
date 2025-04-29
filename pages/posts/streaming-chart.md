---
title: 如何做一个动态心电图
date: 2025-04-29
duration: 12min
art: random
draft: true
---

[[toc]]

## 前言

我之前写了一个 [Canvas 实现动态心电图](./canvas-ecg.md) 文章。它确实能实现需求，但是，面对奇特的需求，它已经不够用了，我能力有限实在做不了更多优化。所以我还是另寻其他方法。

自从收到用来测试的模拟数据后，我就发现不对劲，数据每秒发送几百条，虽然发现了之前的功能面临的问题（画不过来、性能等），但是我就是不想解决，我就是摆。反正公司有时间给我做，我就干脆再找个更加完美的解决方案。

就吐槽这么多，算球。

## 寻找方案

对于这些具体的小众的需求，网上很难找到合适的办法，谷歌都快被我搜烂了，也找不到一个和我的需求相似的例子。

贴几个在搜寻过程中看到的几个例子：

- [Canvas如何做个心电图动画](https://juejin.cn/post/7002038619229650958)

- [如何在react中使用canvas画动态心电图](https://juejin.cn/post/6966136983391305764)

- 一个数据流图形库 [smoothie charts](http://smoothiecharts.org/)

- 还有两个库密码的要买的
  - [SciChart](https://demo.scichart.com/react/vital-signs-ecg-medical-chart-example)
  - [LightningChart](https://lightningchart.com/js-charts/interactive-examples/edit/lcjs-example-0150-ecg.html)

后来灵感在于我想 `echarts` 能不能做，封装太高了，不是很合适，我就开始寻找其他类似于 `echarts` 的图表库。

看到 [D3.js](https://d3js.org/) 这个库，感觉它的自由度很高，应该能实现我的需求，但是学习路线挺陡的。看到这是个非常火的库（Github 一百多k star），我觉得只有他能救我命了。于是就开始了我的探索之旅。
