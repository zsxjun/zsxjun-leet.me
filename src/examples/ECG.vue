<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const dataSource = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0.01,
  0.017,
  0.025,
  0.032,
  0.039,
  0.047,
  0.059,
  0.066,
  0.072,
  0.079,
  0.085,
  0.092,
  0.1,
  0.115,
  0.12,
  0.115,
  0.1,
  0.09,
  0.072,
  0.054,
  0.032,
  0.014,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -0.015,
  -0.04,
  -0.075,
  -0.1,
  0,
  0.11,
  0.25,
  0.36,
  0.47,
  0.58,
  0.69,
  0.78,
  0.64,
  0.48,
  0.40,
  0.32,
  0.26,
  0.18,
  0.09,
  0,
  -0.05,
  -0.1,
  -0.15,
  -0.2,
  -0.16,
  -0.12,
  -0.08,
  -0.04,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0.01,
  0.015,
  0.02,
  0.024,
  0.029,
  0.033,
  0.036,
  0.039,
  0.042,
  0.046,
  0.05,
  0.055,
  0.06,
  0.065,
  0.07,
  0.075,
  0.08,
  0.085,
  0.09,
  0.095,
  0.1,
  0.105,
  0.11,
  0.115,
  0.12,
  0.125,
  0.13,
  0.135,
  0.14,
  0.145,
  0.15,
  0.153,
  0.158,
  0.163,
  0.167,
  0.161,
  0.151,
  0.142,
  0.133,
  0.122,
  0.11,
  0.09,
  0.08,
  0.07,
  0.06,
  0.05,
  0.04,
  0.03,
  0.02,
  0.01,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0.012,
  0.014,
  0.018,
  0.023,
  0.024,
  0.025,
  0.024,
  0.021,
  0.016,
  0.013,
  0.009,
  0.006,
  0.003,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
]

const canvasRef = ref(null) // Main canvas
const bufferCanvasRef = ref(null) // Buffer canvas
const gridCanvasRef = ref(null) // Grid canvas
const roundCanvasRef = ref(null) // Round point canvas
const beatArray = ref([]) // Buffered data
const indexRef = ref(0)
const xPos = ref(0)
const endPoint = ref(0) // Last drawn point y-coordinate
const animate = ref(null) // Animation instance
const timer = ref(null) // Timer for generating data

function handleResize() {
  const canvas = canvasRef.value
  const gridCanvas = gridCanvasRef.value
  if (!canvas && !gridCanvas)
    return

  const gridCtx = gridCanvas.getContext('2d', { willReadFrequently: true })
  initialGrid(gridCtx, canvas.width, canvas.height)
  initBufferCanvas(canvas.width, canvas.height)
}

function generateData() {
  beatArray.value.push(...dataSource.slice(indexRef.value, indexRef.value + 4))
  indexRef.value += 4

  if (indexRef.value >= dataSource.length)
    indexRef.value = 0
}

function initialGrid(ctx, width, height) {
  drawSmallGrid(ctx, width, height)
  drawMainGrid(ctx, width, height)
}

function initBufferCanvas(width, height) {
  const bufferCanvas = document.createElement('canvas')

  bufferCanvas.width = width
  bufferCanvas.height = height
  bufferCanvasRef.value = bufferCanvas

  endPoint.value = height / 2

  const bufferCtx = bufferCanvas.getContext('2d', { willReadFrequently: true })

  bufferCtx.clearRect(0, 0, width, height)
}

function drawSmallGrid(ctx, width, height) {
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

function drawMainGrid(ctx, width, height) {
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

function excute() {
  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if (animate.value)
    cancelAnimationFrame(animate.value)
  if (timer.value)
    clearInterval(timer.value)

  beatArray.value = []
  indexRef.value = 0

  timer.value = setInterval(generateData, 20)

  animate.value = requestAnimationFrame(draw)
}

function stopAnimation() {
  if (animate.value)
    cancelAnimationFrame(animate.value)
  if (timer.value)
    clearInterval(timer.value)
}

function draw() {
  const canvas = canvasRef.value
  const bufferCanvas = bufferCanvasRef.value
  const roundCanvas = roundCanvasRef.value
  if (!canvas || !bufferCanvas || !roundCanvas)
    return

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const bufferCtx = bufferCanvas.getContext('2d', { willReadFrequently: true })
  const roundCtx = roundCanvas.getContext('2d', { willReadFrequently: true })

  const width = canvas.width
  const height = canvas.height

  const startPoint = height / 2
  const offset = 10

  if (xPos.value >= width - offset) {
    const imageData = bufferCtx.getImageData(1, 0, width - 1 - offset, height)
    bufferCtx.putImageData(imageData, 0, 0)

    bufferCtx.clearRect(width - 1 - offset, 0, 1, height)
  }

  roundCtx.clearRect(0, 0, width, height)
  roundCtx.beginPath()
  roundCtx.fillStyle = 'red'

  bufferCtx.lineWidth = 2
  bufferCtx.strokeStyle = 'red'

  bufferCtx.beginPath()
  if (xPos.value >= width - offset)
    bufferCtx.moveTo(width - 2 - offset, endPoint.value)
  else bufferCtx.moveTo(xPos.value, endPoint.value)

  // Calculate next point's y-position
  if (beatArray.value.length > 0) {
    endPoint.value = startPoint - beatArray.value[0] * 100
    beatArray.value.shift()
  }

  if (xPos.value >= width - offset) {
    roundCtx.arc(width - 1 - offset, endPoint.value, 3, 0, Math.PI * 2)
    bufferCtx.lineTo(width - 1 - offset, endPoint.value)
  }
  else {
    roundCtx.arc(xPos.value + 1, endPoint.value, 3, 0, Math.PI * 2)
    bufferCtx.lineTo(xPos.value + 1, endPoint.value)
  }

  roundCtx.fill()
  roundCtx.closePath()
  bufferCtx.stroke()

  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(bufferCanvas, 0, 0)

  if (xPos.value < width - offset)
    xPos.value += 1

  animate.value = requestAnimationFrame(draw)
}

onMounted(() => {
  if (!canvasRef.value)
    return

  handleResize()
  window.addEventListener('resize', handleResize)
  excute()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  stopAnimation()
})
</script>

<template>
  <div>
    <div class="wrapper">
      <canvas ref="canvasRef" width="650" height="200" />
      <canvas ref="roundCanvasRef" width="650" height="200" style="position: absolute; left: 0; top: 0;" />
      <canvas ref="gridCanvasRef" width="650" height="200" style="position: absolute; left: 0; top: 0;" />
    </div>
    <div>
      <span @click="excute">excute</span> /
      <span @click="stopAnimation">stop</span>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
}
</style>
