<script setup lang="ts">
defineProps<{ links: any[] }>()
</script>

<template>
  <div>
    <div
      class="links-grid py-2 w-max mx-auto"
      grid="~ cols-1 md:cols-2 gap-4 lg:cols-3"
    >
      <a
        v-for="item, idx in links"
        :key="idx"
        class="item relative flex items-center"
        :href="item.link"
        target="_blank"
        :title="item.name"
      >
        <div v-if="item.logo" class="pt-2 pr-5 flex-shrink-0">
          <img :src="item.logo" onerror="this.parentElement.style.display='none'" class="w-8 h-8 important-my-4">
        </div>
        <div class="flex-auto">
          <div class="text-normal">{{ item.title }}</div>
          <div class="desc text-sm opacity-50 font-normal line-clamp-2">{{ item.subtitle }}</div>
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
