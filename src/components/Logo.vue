<script setup lang="ts">
const isDark = useDark()
</script>

<template>
  <img v-if="isDark" src="https://img.314926.xyz/images/2025/09/20/zsx-avatar.webp" title="钟神秀 @ zhzsx.cn">
  <img v-else src="https://img.314926.xyz/images/2025/09/20/zsx-avatar.webp" title="钟神秀 @ zhzsx.cn">
</template>
