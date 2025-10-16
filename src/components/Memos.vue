<script setup lang="ts">
import { computed, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import VueEasyLightbox from 'vue-easy-lightbox'

interface Label {
  id: number
  name: string
  color: string
}
interface MemosItem {
  title: string
  body: string | null
  created_at: string
  html_url: string
  user: { avatar_url: string, login: string }
  labels: Label[]
}

/* ---------------- 数据 & 分页 ---------------- */
const list = ref<MemosItem[]>([])
const page = ref(1)
const pageSize = 10
const error = ref('')

const total = computed(() => list.value.length)
const maxPage = computed(() => Math.ceil(total.value / pageSize))
const pagedList = computed(() =>
  list.value.slice((page.value - 1) * pageSize, page.value * pageSize),
)

/* ---------------- Markdown 渲染 ---------------- */
const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
const renderMD = (src: string | null) => (src ? md.render(src) : '')

/* ---------------- Lightbox 状态 ---------------- */
const visible = ref(false)
const index = ref(0)
const imgs = ref<string[]>([])

/* ---------------- 获取数据 + 兜底 ---------------- */
async function load() {
  try {
    error.value = ''
    const url = 'https://gh-api.zhzsx.cn/v2/repos/zsxjun/github-issues-moments/issues%3Fper_page%3D20/data.json'
    const res = await fetch(url)
    if (!res.ok)
      throw new Error(`HTTP ${res.status} ${res.statusText}`)
    const text = await res.text()
    if (!text)
      throw new Error('接口返回空 body')
    const raw: MemosItem[] = JSON.parse(text)
    list.value = raw
  }
  catch (e: any) {
    console.error(e)
    error.value = e.message || '未知错误'
    list.value = [] // 兜底空数组，防止白屏
  }
}
load()

/* ---------------- 图片点击处理 ---------------- */
function handleImageClick(e: Event) {
  const target = e.target as HTMLElement
  if (target.tagName === 'IMG') {
    e.preventDefault()
    const imgSrc = (target as HTMLImageElement).src

    // 收集当前微语中的所有图片
    const container = target.closest('.memos-body')
    if (container) {
      const allImages = Array.from(container.querySelectorAll('img'))
      imgs.value = allImages.map(img => img.src)
      index.value = allImages.findIndex(img => img.src === imgSrc)
      visible.value = true
    }
  }
}
</script>

<template>
  <section class="memos-wrap">
    <h2 class="memos-title">
      🎤 微语
    </h2>

    <!-- 加载 / 错误 -->
    <div v-if="!list.length && !error" class="memos-loading">
      加载中…
    </div>
    <div v-if="error" class="memos-error">
      加载失败：{{ error }}
      <button class="retry" @click="load">
        重试
      </button>
    </div>

    <!-- 列表 -->
    <ul v-else class="memos-list">
      <li v-for="m in pagedList" :key="m.html_url" class="memos-item">
        <header class="memos-hd">
          <img :src="m.user.avatar_url" class="avatar">
          <div class="meta">
            <span class="name">{{ m.user.login }}</span>
            <time class="date">{{ new Date(m.created_at).toLocaleString() }}</time>
          </div>
          <a :href="m.html_url" target="_blank" class="link" title="查看原文">#</a>
        </header>

        <h3 class="memos-title-small">
          {{ m.title }}
        </h3>

        <!-- 正文：Markdown + 图片灯箱 -->
        <div
          class="memos-body markdown-body"
          @click="handleImageClick"
          v-html="renderMD(m.body)"
        />

        <!-- 标签 -->
        <div v-if="m.labels.length" class="memos-tags">
          <span
            v-for="tag in m.labels"
            :key="tag.id"
            class="tag"
            :style="{
              background: `#${tag.color}`,
              color: parseInt(tag.color, 16) > 0xFFFFFF / 2 ? '#000' : '#fff',
            }"
          >
            {{ tag.name }}
          </span>
        </div>
      </li>
    </ul>

    <!-- 分页 -->
    <nav v-if="maxPage > 1" class="memos-pager">
      <button :disabled="page === 1" @click="page--">
        ‹
      </button>
      <button
        v-for="p in maxPage"
        :key="p"
        :class="{ active: p === page }"
        @click="page = p"
      >
        {{ p }}
      </button>
      <button :disabled="page === maxPage" @click="page++">
        ›
      </button>
    </nav>

    <!-- Vue Easy Lightbox 组件 -->
    <VueEasyLightbox
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="visible = false"
    />
  </section>
</template>

<style>
/* ---------------- 主题变量（跟随 leet.me） ---------------- */
:root {
  --bg-color: #ffffff;
  --card-bg: #f6f8fa;
  --text-color: #24292f;
  --text-color-secondary: #656d76;
  --border-color: #d1d9e0;
  --shadow: 0 2px 8px rgba(0,0,0,.06);
  --radius: 10px;
}
.dark {
  --bg-color: #0d1117;
  --card-bg: #161b22;
  --text-color: #c9d1d9;
  --text-color-secondary: #8b949e;
  --border-color: #30363d;
  --shadow: 0 2px 8px rgba(0,0,0,.2);
}
</style>

<style scoped>
.memos-wrap {
  max-width: 800px800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  color: var(--text-color);
  transition: background .3s;
}
.memos-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 1.2rem;
  padding-left: .6rem;
  border-left: 4px solid #667eea;
}
.memos-loading,
.memos-error {
  text-align: center;
  color: var(--text-color-secondary);
  font-size: .9rem;
}
.memos-error .retry {
  margin-top: .5rem;
  padding: .3rem .8rem;
  border: 1px solid #f87171;
  background: transparent;
  color: #f87171;
  border-radius: 4px;
  cursor: pointer;
}
.memos-error .retry:hover {
  background: #f87171;
  color: #fff;
}
.memos-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.memos-item {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1rem 1.2rem;
  transition: transform .2s;
}
.memos-item:hover {
  transform: translateY(-2px);
}
.memos-hd {
  display: flex;
  align-items: center;
  gap: .6rem;
  margin-bottom: .6rem;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.meta {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: .9rem;
  font-weight: 600;
}
.date {
  font-size: .75rem;
  color: var(--text-color-secondary);
}
.link {
  font-size: 1rem;
  color: var(--text-color-secondary);
  text-decoration: none;
}
.memos-title-small {
  font-size: 1rem;
  font-weight: 600;
  margin: .4rem 0;
}
.memos-body {
  font-size: .95rem;
  line-height: 1.6;
  color: var(--text-color);
  word-break: break-word;
}
.memos-body img {
  max-width: 100%;
  margin-top: .6rem;
  border-radius: 6px;
  cursor: zoom-in;
}
.memos-tags {
  margin-top: .6rem;
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
}
.tag {
  font-size: .75rem;
  padding: .2rem .5rem;
  border-radius: 999px;
  font-weight: 500;
}

/* ---------- 分页 ---------- */
.memos-pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  margin-top: 1.5rem;
}
.memos-pager button {
  min-width: 2rem;
  height: 2rem;
  border: 1px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-color);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.memos-pager button:hover:not(:disabled) {
  background: #667eea;
  color: #fff;
  border-color: #667eea;
}
.memos-pager button.active {
  background: #667eea;
  color: #fff;
  border-color: #667eea;
}
.memos-pager button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

/* ---------- 移动端 ---------- */
@media (max-width: 640px) {
  .memos-wrap {
    margin: 1rem;
    padding: 1rem;
  }
  .memos-list {
    gap: .8rem;
  }
  .memos-item {
    padding: .8rem 1rem;
  }
}
</style>
