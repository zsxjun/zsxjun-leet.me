<script setup lang="ts">
import { onMounted, ref } from 'vue'

/* ---------- 类型 ---------- */
interface Label { name: string, color: string }
interface Post { title: string, link: string, published: string }
interface RawFriend {
  title: string
  url: string
  icon: string
  description: string
  posts?: Post[]
  labels?: Label[]
}

/* ---------- 数据 ---------- */
const links = ref<any[]>([])
const loading = ref(true)
const error = ref('')

/* ---------- 拉数据 ---------- */
async function load() {
  try {
    loading.value = true
    const res = await fetch('https://friends-api.kemeow.top/v2/data.json')
    if (!res.ok)
      throw new Error(`HTTP ${res.status}`)
    const raw: { content: RawFriend[] } = await res.json()
    links.value = raw.content.map(f => ({
      title: f.title,
      subtitle: f.description,
      link: f.url,
      logo: f.icon,
    }))
  }
  catch (e: any) {
    error.value = e.message || '网络错误'
  }
  finally {
    loading.value = false
  }
}

/* ---------- 客户端再请求（避免 SSR 时 fetch 报错） ---------- */
onMounted(() => load())
</script>

<template>
  <div>
    <!-- 加载 / 错误 -->
    <div v-if="loading" class="text-center py-4 text-sm text-gray-500">
      加载友链中…
    </div>
    <div v-else-if="error" class="text-center py-4 text-sm text-red-500">
      ❌ {{ error }}
    </div>

    <!-- 列表 -->
    <div
      v-else
      class="links-grid py-2 w-max mx-auto"
      grid="~ cols-1 md:cols-2 gap-4 lg:cols-3"
    >
      <a
        v-for="(item, idx) in links"
        :key="idx"
        class="item relative flex items-center"
        :href="item.link"
        target="_blank"
        :title="item.title"
      >
        <div v-if="item.logo" class="pt-2 pr-5 flex-shrink-0">
          <img
            :src="item.logo"
            onerror="this.parentElement.style.display='none'"
            class="w-8 h-8 important-my-4"
          >
        </div>
        <div class="flex-auto">
          <div class="text-normal">{{ item.title }}</div>
          <div class="desc text-sm opacity-50 font-normal line-clamp-2">
            {{ item.subtitle }}
          </div>
        </div>
      </a>
    </div>
    <hr>
  </div>
</template>

<style>
.links {
  max-width: 90ch !important;
}
</style>

<style scoped>
.links-grid a.item {
  background: transparent;
  font-size: 1.1rem;
  width: 300px;
  max-width: 100%;
  padding: 0.5rem 0.875rem 0.875rem;
  border-radius: 6px;
}
.links-grid a.item:hover {
  background: #88888811;
}
</style>
