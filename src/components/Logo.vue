<script setup lang="ts">
const isDark = useDark()
</script>

<template>
  <img v-if="isDark" src="/logo-dark.svg" title="Leet @ leet.me">
  <img v-else src="/logo.svg" title="Leet @ leet.me">
</template>
