<script setup lang="ts">
import { ref } from 'vue'

/* 60 秒新闻接口（返回单张图片） */
const newsUrl = 'https://60s.kemeow.top/v2/60s?encoding=image-proxy'

const loadError = ref(false)

function onLoad() {
  loadError.value = false
}
function onError() {
  loadError.value = true
}
</script>

<template>
  <section class="news-widget">
    <h3 class="news-title">
      60 秒新闻
    </h3>
    <div class="img-box">
      <!-- 关键新闻图片 -->
      <img
        class="news-img"
        :src="newsUrl"
        alt="60秒新闻"
        @load="onLoad"
        @error="onError"
      >
      <!-- 加载失败占位 -->
      <div v-if="loadError" class="error-tip">
        新闻图片加载失败，稍后再试~
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-widget {
  width: 100%;
  max-width: 640px; /* 图片原宽度 1280，这里限制一半，Retina 也能看清 */
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.news-title {
  text-align: center;
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color, #333); /* 跟随博客主题变量；若无则降级 */
}

.img-box {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #f5f5f5; /* 图片未加载完时的底色 */
}

.news-img {
  display: block;
  width: 100%;
  height: auto;
  transition: opacity 0.3s;
}

.error-tip {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #999;
  background: #fafafa;
}

/* ===== 明暗自动切换 ===== */
@media (prefers-color-scheme: dark) {
  .news-title {
    color: var(--text-color-dark, #e5e5e5);
  }
  .img-box {
    background: #1e1e1e;
  }
  .error-tip {
    background: #1e1e1e;
    color: #888;
  }
}

/* ===== 手机端微调 ===== */
@media (max-width: 768px) {
  .news-title {
    font-size: 16px;
  }
}
</style>
