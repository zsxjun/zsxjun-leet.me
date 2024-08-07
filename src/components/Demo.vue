<script setup lang="ts">
const props = defineProps<{
  source: string
  rawSource: string
}>()

const decodedSource = computed(() => decodeURIComponent(props.source))
const decodedRawSource = computed(() => decodeURIComponent(props.rawSource))
</script>

<template>
  <div>
    <div v-html="decodedRawSource" />
    <div v-html="decodedSource" />
  </div>
</template>
