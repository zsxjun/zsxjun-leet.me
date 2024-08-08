<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button class="text-blue-500" @click="count++">
      Click
    </button>
  </div>
</template>
