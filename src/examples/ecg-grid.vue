<script setup lang="ts">
defineOptions({
  name: 'ECG',
})

const props = withDefaults(defineProps<{
  width?: number
  height?: number
}>(), {
  width: 600,
  height: 150,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  initCanvas()
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
</script>

<template>
  <canvas ref="canvasRef" :width="props.width" :height="props.height" />
</template>
