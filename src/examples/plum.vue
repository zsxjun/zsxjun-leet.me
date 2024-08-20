<script setup lang="ts">
import type { Fn } from '@vueuse/core'

const el = ref<HTMLCanvasElement>()
const ctx = computed(() => el.value!.getContext('2d')!)

const WIDTH = 300
const HEIGHT = 300

const key = 1

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point // 画线开始坐标
  length: number // 画线长度(斜边)
  theta: number // 画线的夹角大小，用于偏移垂直或水平
}

function init() {
  ctx.value.strokeStyle = '#88888850'

  const branch = {
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 3,
    theta: -Math.PI / 2,
  }
  step(branch)
}

const pendingTasks: Fn[] = []

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b)
  drawBranch(b)

  if (depth < 6 || Math.random() < 0.5) {
    pendingTasks.push(() => {
      step({
        start: end,
        length: 1,
        theta: b.theta - 0.3 * Math.random(),
      }, depth + 1)
    })
  }
  if (depth < 6 || Math.random() < 0.5) {
    pendingTasks.push(() => {
      step({
        start: end,
        length: 1,
        theta: b.theta + 0.3 * Math.random(),
      }, depth + 1)
    })
  }
}

function frame() {
  const tasks = [...pendingTasks]
  pendingTasks.length = 0
  tasks.forEach(task => task())
}

let lastTime = performance.now()
const interval = 1000 / 40 // 50fps
function startFrame() {
  requestAnimationFrame(() => {
    if (performance.now() - lastTime > interval)
      frame()
    lastTime = performance.now()
    startFrame()
  })
}

startFrame()

function lineTo(p1: Point, p2: Point) {
  ctx.value.beginPath()
  ctx.value.moveTo(p1.x, p1.y)
  ctx.value.lineTo(p2.x, p2.y)
  ctx.value.stroke()
}

function getEndPoint(b: Branch) {
  return {
    x: b.start.x + b.length * Math.cos(b.theta), // 邻边 = 夹角余弦 * 斜边
    y: b.start.y + b.length * Math.sin(b.theta), // 对边 = 夹角正弦 * 斜边
  }
}

function drawBranch(l: Branch) {
  lineTo(l.start, getEndPoint(l))
}

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <canvas :key="key" ref="el" width="300" height="300" border />
  </div>
</template>
