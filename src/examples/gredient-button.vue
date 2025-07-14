<template>
  <div class="bg-black h-80 w-full flex items-center justify-center relative -z-2">
    <button class="gredient relative text-white bg-transparent p-2px rounded-4px overflow-hidden">
      <span class="block px-6 py-1 rounded-2px bg-black">EXAMPLE</span>
    </button>
  </div>
</template>

<style scoped>
.gredient::after {
  content: "";
  position: absolute;
  top: -100px;
  left: -100px;
  right: -100px;
  bottom: -100px;
  z-index: -1;
  background-image: conic-gradient(
      from 0deg at 50% 50%,
      #1e3a8a,      /* 深蓝色 */
      #3b82f6,      /* 蓝色 */
      #6366f1,      /* 靛蓝色 */
      #8b5cf6,      /* 紫色 */
      #a855f7,      /* 紫罗兰色 */
      #d946ef,      /* 品红色 */
      #ec4899,      /* 粉红色 */
      #6366f1,      /* 靛蓝色 */
      #3b82f6,      /* 蓝色 */
      #1e3a8a       /* 深蓝色 */
  );
  animation: 3s rotate linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
