<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const s = document.createElement('script')
  s.defer = true
  s.src = 'https://umami.zhzsx.cn/script.js'
  s.setAttribute('data-website-id', 'aaf33c92-2a62-4ff8-bf13-71e72fbcb8e5')
  document.body.appendChild(s)
})
</script>

<template>
  <div class="mt-10 mb-6 prose m-auto flex slide-enter animate-delay-1200!">
    <span class="text-sm op50"><a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style="color:inherit">CC BY-NC-SA 4.0</a> 2025-PRESENT © 「钟神秀」@ZSX</span>
    <div class="flex-auto" />
  </div>
</template>
