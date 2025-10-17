<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { isDark } from '~/logics' // ✅ 使用你博客的深色模式逻辑

const props = defineProps<{
  word?: string
}>()

const word = props.word || '欢迎来到ZSXの小站'

const loading = ref(true)
const error = ref('')
const imageData = ref('')

const imageSrc = computed(() => {
  if (!imageData.value)
    return ''
  const theme = isDark.value ? 'dark' : 'light'
  return `${imageData.value}&theme=${theme}`
})

async function fetchData() {
  try {
    loading.value = true
    error.value = ''
    const res = await fetch(`https://api.szfx.top/info-card/?word=${encodeURIComponent(word)}`)
    if (!res.ok)
      throw new Error('请求失败')
    const data = await res.json()
    if (data.image) {
      imageData.value = data.image
    }
    else {
      throw new Error('未返回图片地址')
    }
  }
  catch (err: any) {
    error.value = err.message || '加载失败'
  }
  finally {
    loading.value = false
  }
}

function handleImageError() {
  error.value = '图片加载失败'
}

watch(isDark, () => {
  fetchData()
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="hello-component">
    <div v-if="loading" class="loading">
      加载中...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="info-card">
      <img
        :src="imageSrc"
        :alt="word"
        @error="handleImageError"
      >
    </div>
  </div>
</template>

<style scoped>
.hello-component {
  margin: 1rem 0;
}

.loading, .error {
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
}

.error {
  color: red;
}

.info-card img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
