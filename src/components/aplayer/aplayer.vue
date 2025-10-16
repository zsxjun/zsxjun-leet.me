<script setup>
/* ---------------- 参数 ---------------- */
import { onUnmounted, ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  server: { type: String, default: 'netease' },
  type: { type: String, default: 'playlist' },
  id: { type: String, required: true },
  autoplay: { type: Boolean, default: false },
  theme: { type: String, default: '#25CCF7' },
  volume: { type: Number, default: 0.7 },
})

/* ---------------- 状态 ---------------- */
const loading = ref(true)
const error = ref('')
const aplayerRef = ref(null)
let player = null

/* ---------------- 获取歌单 ---------------- */
async function fetchSongs() {
  // ① 用完整地址，避免 baseURL 多斜杠
  const { data } = await axios.get('https://meting.kemiaosw.top/api', {
    params: {
      server: props.server,
      type: props.type,
      id: props.id,
    },
  })

  console.warn('Meting 原始返回:', data)
  if (!Array.isArray(data) || !data.length)
    throw new Error('空列表')
  return data.map(item => ({
    name: item.name || item.title,
    artist: item.artist || item.author,
    url: item.url || item.src,
    cover: item.pic || item.cover,
    lrc: item.lrc || item.lyric,
  }))
}

/* ---------------- 初始化 ---------------- */
async function init() {
  loading.value = true
  error.value = ''
  try {
    const songs = await fetchSongs()
    await loadAPlayerCSS()
    await loadAPlayerJS()
    createPlayer(songs)
    restoreState()
  }
  catch (e) {
    error.value = e.message || '网络错误'
  }
  finally {
    loading.value = false
  }
}

/* 动态加载 APlayer 资源 */
function loadAPlayerCSS() {
  if (document.querySelector('#aplayer-css'))
    return Promise.resolve()
  const link = document.createElement('link')
  link.id = 'aplayer-css'
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
  document.head.appendChild(link)
  return new Promise(res => link.onload = res)
}

function loadAPlayerJS() {
  if (window.APlayer)
    return Promise.resolve()
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
  document.head.appendChild(script)
  return new Promise(res => script.onload = res)
}

/* 创建播放器实例 */
function createPlayer(list) {
  player = new window.APlayer({
    container: aplayerRef.value,
    audio: list,
    autoplay: props.autoplay,
    volume: props.volume,
    theme: props.theme,
    lrcType: 3,
  })
  player.on('play', save)
  player.on('pause', save)
  player.on('listswitch', save)
}

/* ---------------- 状态持久化 ---------------- */
const STATE_KEY = 'aplayer-state'
function save() {
  if (!player)
    return
  localStorage.setItem(STATE_KEY, JSON.stringify({
    idx: player.list.index,
    time: player.audio.currentTime,
    volume: player.audio.volume,
  }))
}
function restoreState() {
  if (!player)
    return
  try {
    const { idx, time, volume } = JSON.parse(localStorage.getItem(STATE_KEY) || '{}')
    if (typeof idx === 'number') {
      player.list.switch(idx)
      player.seek(time || 0)
      player.volume(volume ?? props.volume, true)
    }
  }
  catch {}
}

/* ---------------- 监听 ID 变化 ---------------- */
watch(() => props.id, init, { immediate: true })

/* ---------------- 卸载 ---------------- */
onUnmounted(() => player && player.destroy())

/* ---------------- 暴露方法 ---------------- */
defineExpose({ play: () => player?.play(), pause: () => player?.pause() })
</script>

<template>
  <div class="aplayer-wrap">
    <!-- 加载 / 错误 -->
    <div v-if="loading" class="state">
      加载中…
    </div>
    <div v-else-if="error" class="state err">
      {{ error }}
    </div>

    <!-- 播放器容器 -->
    <div v-show="!loading && !error" ref="aplayerRef" />
  </div>
</template>

<style scoped>
.aplayer-wrap {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
.state {
  padding: 40px;
  text-align: center;
}
.state.err {
  color: crimson;
}
</style>
