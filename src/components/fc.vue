<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

export interface CircleConfig {
  privateApiUrl?: string
  pageTurningNumber?: number
  errorImg?: string
}

const props = withDefaults(defineProps<CircleConfig>(), {
  privateApiUrl: 'https://fc.kemeow.top/',
  pageTurningNumber: 24,
  errorImg: 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg',
})

/* 资源地址 */
const CSS_URL = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css'
const JS_URL = 'https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js'

/* 注入全局配置 */
function injectConfig() {
  if (typeof (window as any).UserConfig === 'undefined') {
    (window as any).UserConfig = {
      private_api_url: props.privateApiUrl,
      page_turning_number: props.pageTurningNumber,
      error_img: props.errorImg,
    }
  }
}

/* 加载 CSS */
function loadCSS(href: string) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
  return link
}

/* 加载 JS（带 async，不阻塞） */
function loadJS(src: string) {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  document.body.appendChild(script)
  return script
}

let cssLink: HTMLLinkElement | null = null
let jsScript: HTMLScriptElement | null = null

onMounted(() => {
  injectConfig()
  cssLink = loadCSS(CSS_URL)
  jsScript = loadJS(JS_URL)
})

onUnmounted(() => {
  /* 移除资源，防止重复初始化 */
  cssLink?.remove()
  jsScript?.remove()
  delete (window as any).UserConfig
})
</script>

<template>
  <!-- 容器：Friend-Circle-Lite 的根节点 -->
  <div id="friend-circle-lite-root" />
</template>

<style scoped>
/* 让容器宽度自适应主题区域 */
#friend-circle-lite-root {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
