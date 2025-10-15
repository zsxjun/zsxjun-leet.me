<script>
/* 深色状态：跟随 leet.me（localStorage.theme + <html class="dark">） */
const isLeetDark = ref(localStorage.getItem('theme') === 'dark')
const mo = new MutationObserver(() => isLeetDark.value = localStorage.getItem('theme') === 'dark')
onMounted(() => mo.observe(document.documentElement, { attributeFilter: ['class'] }))
onUnmounted(() => mo.disconnect())

export default {
  name: 'HelloCard',
  props: {
    word: { type: String, default: '欢迎来到ZSXの小站' },
    apiUrl: { type: String, default: 'https://api.szfx.top/info-card/' },
    refreshInterval: { type: Number, default: 0 },
  },
  data() {
    return {
      cardData: null,
      loading: true,
      error: null,
      contentType: 'unknown',
      imageUrl: '',
      refreshTimer: null,
    }
  },
  computed: {
    isDark() { return isLeetDark.value },
  },
  mounted() {
    this.fetchData()
    if (this.refreshInterval > 0)
      this.startAutoRefresh()
  },
  beforeUnmount() {
    if (this.refreshTimer)
      clearInterval(this.refreshTimer)
  },
  methods: {
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        const url = `${this.apiUrl}?word=${encodeURIComponent(this.word)}`
        const res = await fetch(url)
        if (!res.ok)
          throw new Error(`HTTP ${res.status}`)
        const ct = res.headers.get('content-type') || ''

        if (ct.includes('image/')) {
          this.contentType = 'image'
          this.imageUrl = url
        }
        else if (ct.includes('application/json')) {
          this.contentType = 'json'
          this.cardData = this.processApiData(await res.json())
        }
        else {
          const text = await res.text()
          try {
            this.cardData = this.processApiData(JSON.parse(text))
            this.contentType = 'json'
          }
          catch {
            if (text.startsWith('GIF') || text.startsWith('\x89PNG')) {
              this.contentType = 'image'
              this.imageUrl = url
            }
            else {
              this.contentType = 'text'
              this.cardData = { content: text }
            }
          }
        }
      }
      // eslint-disable-next-line unused-imports/no-unused-vars
      catch (e) {
        // 移除未使用变量，eslint 不再报错
        this.error = '获取数据失败，请稍后重试'
        this.contentType = 'fallback'
        this.cardData = this.getMockData()
      }
      finally {
        this.loading = false
      }
    },
    processApiData(data) {
      if (!data || typeof data !== 'object')
        return null
      return {
        title: data.title || data.name || '信息卡片',
        content: data.content || data.text || data.message,
        description: data.description || data.desc,
        image: data.image || data.img || data.icon,
        timestamp: data.timestamp || data.time || Date.now(),
      }
    },
    getMockData() {
      return {
        title: '欢迎来到ZSXの小站',
        content: '这是一个动态信息卡片组件，用于展示API返回的数据。',
        description: '组件会自动检测内容类型并相应展示。',
        timestamp: Date.now(),
      }
    },
    onImageLoad() { /* 空实现，保留钩子 */ },
    onImageError() {
      this.contentType = 'fallback'
    },
    refreshData() {
      this.fetchData()
    },
    startAutoRefresh() {
      this.refreshTimer = setInterval(() => this.fetchData(), this.refreshInterval)
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString('zh-CN')
    },
  },
}
</script>

<template>
  <div class="hello-card" :class="{ dark: isLeetDark }">
    <div v-if="loading" class="loading">
      <div class="spinner" />
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchData">
        重试
      </button>
    </div>

    <div v-else class="content-container">
      <!-- 图片 -->
      <div v-if="contentType === 'image'" class="image-container">
        <img :src="imageUrl" alt="API返回的图片" @load="onImageLoad" @error="onImageError">
        <p class="image-caption">
          {{ decodeURIComponent(word) }}
        </p>
      </div>

      <!-- JSON -->
      <div v-else-if="contentType === 'json'" class="info-card">
        <div class="card-header">
          <h2>{{ cardData.title || '信息卡片' }}</h2>
        </div>
        <div class="card-content">
          <p class="main-text">
            {{ decodeURIComponent(word) }}
          </p>
          <div v-if="cardData.content" class="content-detail">
            {{ cardData.content }}
          </div>
          <div v-if="cardData.description" class="description">
            {{ cardData.description }}
          </div>
          <div v-if="cardData.image" class="card-image">
            <img :src="cardData.image" :alt="cardData.title">
          </div>
        </div>
        <div class="card-footer">
          <span v-if="cardData.timestamp" class="timestamp">{{ formatDate(cardData.timestamp) }}</span>
          <button class="refresh-btn" @click="refreshData">
            刷新
          </button>
        </div>
      </div>

      <!-- Fallback -->
      <div v-else class="fallback-card">
        <div class="card-header">
          <h2>{{ decodeURIComponent(word) }}</h2>
        </div>
        <div class="card-content">
          <p class="welcome-text">
            欢迎来到ZSXの小站
          </p>
          <p class="subtitle">
            API返回了非JSON数据，显示欢迎信息
          </p>
        </div>
        <div class="card-footer">
          <button class="refresh-btn" @click="refreshData">
            刷新
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ========== 亮色默认 ========== */
.hello-card {
  max-width: 600px;
  margin: 20px auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background 0.3s, color 0.3s;
}

/* 图片容器 */
.image-container {
  text-align: center;
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,.1);
  transition: background 0.3s;
}
.image-container img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,.2);
}
.image-caption {
  margin-top: 15px;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  transition: color 0.3s;
}

/* JSON 卡片 */
.info-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  color: #fff;
  text-align: center;
  animation: fadeIn 0.5s ease-in;
  transition: background 0.3s;
}
.fallback-card {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  color: #333;
  text-align: center;
  animation: fadeIn 0.5s ease-in;
  transition: background 0.3s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.card-header h2 {
  margin: 0 0 20px 0;
  font-size: 24px;
  font-weight: 600;
}
.main-text {
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0;
  padding: 15px;
  background: rgba(255,255,255,.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}
.content-detail {
  font-size: 16px;
  margin: 15px 0;
  line-height: 1.6;
}
.description {
  font-size: 14px;
  opacity: 0.9;
  margin: 10px 0;
  font-style: italic;
}
.card-image {
  margin: 20px 0;
}
.card-image img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,.3);
}
.card-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.timestamp {
  font-size: 12px;
  opacity: 0.8;
}
.refresh-btn {
  background: rgba(255,255,255,.2);
  border: 1px solid rgba(255,255,255,.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.refresh-btn:hover {
  background: rgba(255,255,255,.3);
  transform: translateY(-2px);
}

/* 加载 & 错误 */
.loading {
  text-align: center;
  padding: 50px;
  color: #667eea;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.error {
  text-align: center;
  padding: 30px;
  color: #e74c3c;
  background: #fdf2f2;
  border-radius: 10px;
  border: 1px solid #e74c3c;
}
.error button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}
.error button:hover {
  background: #c0392b;
}

/* ========== 深色适配（跟随 leet.me） ========== */
.dark .hello-card {
  background: #121212;
  color: #e0e0e0;
}
.dark .image-container {
  background: #1e1e1e;
  box-shadow: 0 5px 15px rgba(0,0,0,.4);
}
.dark .image-caption {
  color: #cfd8dc;
}
.dark .info-card {
  background: linear-gradient(135deg, #3a3a5c 0%, #2a2a4a 100%);
}
.dark .fallback-card {
  background: linear-gradient(135deg, #5a2a2a 0%, #4a1e1e 100%);
  color: #f5f5f5;
}
.dark .main-text {
  background: rgba(255,255,255,.05);
}
.dark .timestamp {
  opacity: 0.7;
  color: #90a4ae;
}
.dark .refresh-btn {
  background: rgba(255,255,255,.1);
  border-color: rgba(255,255,255,.2);
  color: #e0e0e0;
}
.dark .refresh-btn:hover {
  background: rgba(255,255,255,.2);
}
.dark .error {
  background: #2e1e1e;
  border-color: #e74c3c;
}
.dark .loading {
  color: #90a4ae;
}
.dark .spinner {
  border-color: #444;
  border-top-color: #90a4ae;
}

/* 响应式 */
@media (max-width: 600px) {
  .info-card, .fallback-card, .image-container {
    padding: 20px;
    margin: 10px;
  }
  .main-text, .welcome-text {
    font-size: 20px;
  }
  .card-header h2 {
    font-size: 20px;
  }
}
</style>
