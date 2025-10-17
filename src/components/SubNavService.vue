<script setup lang="ts">
import { useRoute } from 'vue-router'

const inactiveStyle = 'opacity-20 hover:opacity-50'
const activeStyle = 'opacity-100 underline'

const route = useRoute()
</script>

<template>
  <div class="prose m-auto mb-8 select-none animate-none! op100!">
    <div mb-0 flex="~ col gap-1 sm:row sm:gap-3 wrap" text-3xl>
      <RouterLink to="/news" class="!border-none" :class="route.path === '/news' ? activeStyle : inactiveStyle">
        60s看世界
      </RouterLink>
      <!-- <RouterLink to="/bugs" class="!border-none" :class="route.path === '/bugs' ? activeStyle : inactiveStyle">
        Bugs
      </RouterLink>
      <RouterLink to="/notes" class="!border-none" :class="route.path === '/notes' ? activeStyle : inactiveStyle">
        Notes
      </RouterLink> -->
      <RouterLink to="/weather" class="!border-none" :class="route.path === '/weather' ? activeStyle : inactiveStyle">
        实时天气
      </RouterLink>
    </div>
  </div>
</template>
