<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { isDark } from '~/logics'

const props = defineProps<{
  word?: string
}>()

const word = props.word || '欢迎来到ZSXの小站'

const loading = ref(true)
const error = ref('')
const imageSrc = ref('')

async function fetchData() {
  try {
    loading.value = true
    error.value = ''

    const params = new URLSearchParams({
      apikey: 'efdab9ee-7e6d-87e5-677a-bcb87ca53d2643e8805e',
      type: 'svg',
      width: '300',
      height: '350',
      word: word || '欢迎来到ZSXの小站',
      // 如果后端支持 theme 就留，不支持可删掉
      theme: isDark.value ? 'dark' : 'light',
    })

    imageSrc.value = `https://v.xapi.chat/api/ip-card/api.php?${params}`
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

watch(isDark, fetchData)
onMounted(fetchData)
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
  transition: filter 0.3s ease;
}

:global(.dark) .info-card img {
  filter: brightness(0.9) contrast(1.1);
}
</style>
