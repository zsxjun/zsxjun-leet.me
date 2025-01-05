---
title: Canvas实现动态心电图（ECG）
date: 2025-01-05
duration: 18min
art: random
draft: true
---

[[toc]]

## 开始之前...

最近接到一个需求，用于观测病人数据的心电图功能。当时看到这个功能以为只是一个图形，用 `echarts` 就能解决了，后来感觉比较难实现（我也不确定一定不能实现，至少会感觉很麻烦我就没有考虑这个方法）。

第一时间问了几个大模型（GPT, Claude, Gemini）给出了一致的答案，都是用 `canvas` 实现。

那么就开始吧。

## Canvas

这个东西不熟悉也挺熟悉的，说熟悉也感觉又不太熟悉；就是知道这个东西，但是里面的用法都不太会。

> 可以看看 MDN 文档里的 [Canvas 介绍和教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)，完全够用了。

主要用到的是 `HTMLCanvasElement` 这个实例，通过实例的 `getContext` 返回 `canvas` 的上下文(`CanvasRenderingContext2D`)，然后通过这个 `ctx` 来。

在画图方面就主要用到以下几个上下文的属性和方法：

| 名称 | 介绍 |
| ------------- | :-----------: |
| strokeStyle  | 形状描边的颜色 |
| lineWidth  | 线宽 |
| beginPath()  | 创建一个新路径 |
| moveTo()  | 在给定的 (x，y) 坐标处开始一个新的子路径 |
| lineTo()  | 将当前子路径的最后一个点与指定的 (x, y) 坐标用直线段相连 |
| stroke()  | 绘制当前或指定的路径 |
| getImageData()  | 返回一个 ImageData 对象，用于描述 canvas 指定区域的隐含像素数据 |
| putImageData()  | 将数据从已有的 ImageData 对象绘制到画布上 |
| drawImage()  | 在画布（Canvas）上绘制图像的方式 |

## 心电图

这是个常规的心电图的样子：

![心电图示例](/images/ecg-basic.webp)

可以看到它的背景是由很多个格子组成的：每个小格代表一个单位，每五个小格组成一个大格。

每个小格代表0.04秒，每个大格代表0.2秒。

## 辅助线绘制

我这里将每个小格按照5px的宽高进行绘制。

通过遍历宽高，将累加值进行 +5 和 +25 绘制大小格：

```js
ctx.strokeStyle = '#fecaca'
ctx.lineWidth = 0.5
ctx.beginPath()

// 竖线
for (let x = 0; x <= width; x += 5) {
  ctx.moveTo(x, 0)
  ctx.lineTo(x, height)
}
// 横线
for (let y = 0; y <= height; y += 5) {
  ctx.moveTo(0, y)
  ctx.lineTo(width, y)
}

ctx.stroke()
```

就得到了下面的效果：

::: demo
/examples/ecg-grid
:::

## 心电图绘制

<ECG />

首先我们需要一组数据
