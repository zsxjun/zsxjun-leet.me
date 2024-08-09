<script setup>
const text
  = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
</script>

<template>
  <div class="rounded p-2.5 text-gray-500 dark:text-white dark:bg-black">
    <div class="relative mt-3">
      <div>
        {{ text }}
      </div>
      <div class="absolute inset-0">
        <span class="reveal">
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reveal {
  color: transparent;
  background: linear-gradient(to right, transparent var(--p), #fff calc(var(--p) + 3em));
  animation: reveal 6s linear infinite forwards;
}
html.dark .reveal {
  background: linear-gradient(to right, transparent var(--p), #000 calc(var(--p) + 3em));
}

/* Houdini API */
@property --p {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

@keyframes reveal {
  to {
    --p: 100%;
  }
}
</style>
