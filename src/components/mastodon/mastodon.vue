<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

/* ========== props ========== */
const props = withDefaults(defineProps<{
  instance?: string
  userId?: string
  lazy?: boolean
  rootMargin?: string
  pageSize?: number
}>(), {
  instance: 'ech0.zhzsx.cn',
  userId: '115353383436994254',
  lazy: true,
  rootMargin: '100px',
  pageSize: 10,
})

/* ========== 适配 leet.me 深色模式 ========== */
const isLeetDark = ref(localStorage.getItem('theme') === 'dark')
function syncTheme() {
  isLeetDark.value = localStorage.getItem('theme') === 'dark'
}
window.addEventListener('theme-change', syncTheme)
const mo = new MutationObserver(() => syncTheme())
onMounted(() => mo.observe(document.documentElement, { attributeFilter: ['class'] }))
onBeforeUnmount(() => {
  window.removeEventListener('theme-change', syncTheme)
  mo.disconnect()
})

/* ========== 状态 ========== */
const echoContainer = ref<HTMLElement>()
const total = ref(0)
const page = ref(1)
const itemBuffer: HTMLElement[] = []

/* ========== 分页计算 ========== */
const pageTotal = computed(() => Math.ceil(total.value / props.pageSize))

/* ========== 生命周期 ========== */
const SCRIPT_SRC = 'https://mastodon.zhzsx.cn/mastodon-on-blog.js'
let scriptPromise: Promise<any> | null = null
let io: IntersectionObserver | null = null

onMounted(() => {
  if (props.lazy && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load()
          io!.disconnect()
        }
      },
      { rootMargin: props.rootMargin },
    )
    io.observe(echoContainer.value!)
  }
  else {
    load()
  }
})
onBeforeUnmount(() => io?.disconnect())

/* ========== 脚本加载 ========== */
async function load() {
  if (scriptPromise)
    return scriptPromise.then(afterRender)
  scriptPromise = injectScript()
  return scriptPromise.then(afterRender)
}

function injectScript(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      return resolve((window as any).Echo)
    }
    const s = document.createElement('script')
    s.async = true
    s.src = SCRIPT_SRC
    s.setAttribute('data-instance', props.instance)
    s.setAttribute('data-user-id', props.userId)
    s.onload = () => resolve((window as any).Echo)
    s.onerror = () => reject(new Error('Echo script load failed'))
    document.body.appendChild(s)
  })
}

/* ========== 渲染完成 → 搬内容 → 分页 ========== */
async function afterRender() {
  await nextTick()
  const nodes = Array.from(echoContainer.value!.querySelectorAll('.item'))
  itemBuffer.push(...nodes as HTMLElement[])
  total.value = itemBuffer.length
  page.value = 1
  cutPage()
}

/* 核心：只显示当前 10 条，其余隐藏 → 高度自然由 10 条撑开 */
function cutPage() {
  const start = (page.value - 1) * props.pageSize
  const end = start + props.pageSize
  itemBuffer.forEach((el, i) => {
    (el as HTMLElement).style.display = i >= start && i < end ? '' : 'none'
  })
  /* 滚动到顶部 */
  const main = echoContainer.value!.querySelector('.main') as HTMLElement
  main?.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <section class="echo-widget">
    <!-- 动态高度：由内部 10 条内容撑开，不再写死像素 -->
    <div
      id="my-mastodon-widget"
      ref="echoContainer"
      class="my-mastodon-widget"
      :class="{ dark: isLeetDark }"
    />

    <!-- 每 10 条一分页 -->
    <div v-if="total > pageSize" class="pagination">
      <button :disabled="page === 1" @click="page--">
        上一页
      </button>
      <span>{{ page }} / {{ pageTotal }}</span>
      <button :disabled="page === pageTotal" @click="page++">
        下一页
      </button>
    </div>
  </section>
</template>

<style scoped>
/* ========= 外壳：高度由内容撑开，不再固定像素 ========= */
.my-mastodon-widget {
  width: 100%;
  max-width: 100%;
  border: 1px solid #eee;
  box-sizing: border-box;
  overflow: hidden;
  background: #fcfcfc;
  font-family: 'Latin Modern Roman', 'Times New Roman', serif, '宋体';
  font-size: 13px;
  color: #343434;
}
/* 滚动容器：出现滚动条时也只占 10 条高度 */
.my-mastodon-widget .main {
  max-height: 60vh;   /* 想要多高就改这里；不需要可删掉 */
  overflow-y: auto;
  padding: 3px 8px;
  box-sizing: border-box;
}

/* ---------- 原 default.style.css（选择器已换） ---------- */
.my-mastodon-widget p { margin: 0; word-break: break-word; }
.my-mastodon-widget a { color: rgba(170, 0, 0, .5); }
.my-mastodon-widget ::-webkit-scrollbar { width: 7px; height: 7px; }
.my-mastodon-widget ::-webkit-scrollbar-thumb { background: #eee; }
.my-mastodon-widget .time { color: #aaa; }
.my-mastodon-widget .images .image-wrapper {
  margin-left: 3px; margin-top: 2px; display: inline-block; width: 60px; height: 60px; overflow: hidden;
}
.my-mastodon-widget .images img {
  min-width: 100%; min-height: 100%; max-width: 100%; object-fit: cover;
}
.my-mastodon-widget .emoji { width: 18px; }
.my-mastodon-widget .reply::before,
.my-mastodon-widget .reblog::before {
  display: inline-block; margin-bottom: 5px; background-color: #f3f3f3; padding: 3px 5px; border-radius: 3px;
}
.my-mastodon-widget .reblog::before { content: "🔁 Repost:"; }
.my-mastodon-widget .reply::before { content: "↩️ Reply:"; }
.my-mastodon-widget .item {
  padding-bottom: 5px; margin-bottom: 8px; border-bottom: 1px solid #efefef;
}
.my-mastodon-widget .content { margin-bottom: 5px; }
.my-mastodon-widget .images { margin-top: 3px; }
.my-mastodon-widget .hashtag {
  padding: 2px 3px; background-color: #f7f7f7; border-radius: 3px;
}

/* ================= 暗色全套适配 leet.me ================= */
.dark .my-mastodon-widget { background: #121212; border-color: #333; color: #e0e0e0; }
.dark .my-mastodon-widget ::-webkit-scrollbar-thumb { background: #444; }
.dark .my-mastodon-widget a { color: #ff7575; }
.dark .my-mastodon-widget .time { color: #90a4ae; }
.dark .my-mastodon-widget .reply::before,
.dark .my-mastodon-widget .reblog::before { background-color: #1e1e1e; color: #cfd8dc; }
.dark .my-mastodon-widget .item { border-bottom-color: #333; }
.dark .my-mastodon-widget .hashtag { background-color: #1e1e1e; color: #81c784; }

/* ================= 分页栏 ================= */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
  font-size: 14px;
}
.pagination button {
  padding: 4px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
.pagination button:disabled { opacity: 0.5; cursor: not-allowed; }
.dark .pagination button { background: #1e1e1e; border-color: #444; color: #e0e0e0; }
.dark .pagination button:hover:not(:disabled) { background: #333; }
</style>
