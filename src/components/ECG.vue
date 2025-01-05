<script setup lang="ts">
defineOptions({
  name: 'ECG',
})

const props = withDefaults(defineProps<{
  width?: number
  height?: number
}>(), {
  width: 650,
  height: 150,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const animate = ref()
const pointX = ref(0)

onMounted(() => {
  initCanvas()

  animate.value = requestAnimationFrame(draw)
})

onBeforeUnmount(() => {
  if (animate.value) {
    cancelAnimationFrame(animate.value)
  }
})

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  if (!ctx)
    return

  drawSmallGrid(ctx, width, height)
  drawMainGrid(ctx, width, height)
}

function drawSmallGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
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
}

function drawMainGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = '#f87171'
  ctx.lineWidth = 0.5
  ctx.beginPath()

  // 竖线
  for (let x = 0; x <= width; x += 25) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
  }
  // 横线
  for (let y = 0; y <= height; y += 25) {
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
  }

  ctx.stroke()
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  if (!ctx)
    return

  // 清除画布
  ctx.clearRect(0, 0, width, height)

  // 重绘网格
  drawSmallGrid(ctx, width, height)
  drawMainGrid(ctx, width, height)

  const pointY = height / 2 + 20

  const points = generateECGPoints()

  ctx.strokeStyle = '#172554'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(pointX.value, pointY - points[0])

  for (let i = 0; i < points.length; i++) {
    ctx.lineTo(pointX.value + i * 5, pointY - points[i])
  }

  ctx.stroke()

  pointX.value += 5
  if (pointX.value >= width) {
    pointX.value = 0
  }

  animate.value = requestAnimationFrame(draw)
}

function generateECGPoints() {
  // 波形参数配置
  const config = {
    pWaveHeight: 10, // P波高度
    qWaveHeight: -15, // Q波高度
    rWaveHeight: 70, // R波高度
    sWaveHeight: -20, // S波高度
    tWaveHeight: 15, // T波高度
    baselineHeight: 0, // 基线高度
    totalPoints: 100, // 一个完整周期的采样点数
  }

  const points = []

  for (let i = 0; i < config.totalPoints; i++) {
    const x = i / config.totalPoints
    let y = config.baselineHeight

    // P波 (0-10)
    if (x < 0.1) {
      y += config.pWaveHeight * Math.sin(x * Math.PI / 0.1)
    }

    // PR段 (10-30)
    else if (x < 0.3) {
      y += 0
    }

    // QRS波群 (30-35)
    else if (x < 0.35) {
      const qrsX = (x - 0.3) / 0.05
      if (qrsX < 0.2) {
        // Q波
        y += config.qWaveHeight * (qrsX / 0.2)
      }
      else if (qrsX < 0.6) {
        // R波
        y += config.rWaveHeight * Math.sin((qrsX - 0.2) * Math.PI / 0.4)
      }
      else {
        // S波
        y += config.sWaveHeight * (1 - (qrsX - 0.6) / 0.4)
      }
    }

    // ST段 (35-45)
    else if (x < 0.45) {
      y += 0
    }

    // T波 (45-65)
    else if (x < 0.65) {
      y += config.tWaveHeight * Math.sin((x - 0.45) * Math.PI / 0.2)
    }

    points.push(y)
  }

  return points
}
</script>

<template>
  <canvas ref="canvasRef" :width="props.width" :height="props.height" />
</template>
