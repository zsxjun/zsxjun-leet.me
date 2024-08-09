<script setup lang="ts">
const props = defineProps<{
  demos: object
  source: string
  rawSource: string
  path: string
}>()

const decodedSource = computed(() => decodeURIComponent(props.source))
const decodedRawSource = computed(() => decodeURIComponent(props.rawSource))

const isExpand = ref(false)

const { copy, copied, isSupported } = useClipboard({
  source: decodedRawSource,
  read: false,
  copiedDuring: 3000,
})

async function copyCode() {
  if (!isSupported)
    return
  await copy()
}

const formatPathDemos = computed(() => {
  const demos: any = {}

  Object.keys(props.demos).forEach((key) => {
    demos[key.replace('../../src', '').replace('.vue', '')] = props.demos[key].default
  })

  return demos
})
</script>

<template>
  <div>
    <div p-6 rounded-md border="~ base">
      <component :is="formatPathDemos[path]" />
    </div>
    <!-- <div border="~ base" rounded-md p-6 v-html="decodedRawSource" /> -->
    <div flex="~ justify-end items-center gap-x-3" py-2 px-1 mb--6px>
      <div v-if="!copied" i-ri-file-copy-line op60 hover:op80 transition cursor-pointer @click="copyCode" />
      <div v-else i-ri-check-line text-green-500 transition />
      <div i-ri-code-s-line op60 hover:op80 transition cursor-pointer @click="isExpand = !isExpand" />
    </div>
    <div v-show="isExpand" class="slide-enter-content" v-html="decodedSource" />
  </div>
</template>
