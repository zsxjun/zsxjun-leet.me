<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

/* ----------  类型定义  ---------- */
interface Location { name: string, province: string, city: string, county: string }
interface Weather {
  condition: string
  condition_code: string
  temperature: number
  humidity: number
  wind_power: string
  updated_at: number
}
interface AirQuality {
  level: number
  quality: string
  aqi: number
}
interface LifeIndex { key: string, name: string, level: string, description: string }
interface WeatherData {
  location: Location
  weather: Weather
  air_quality: AirQuality
  life_indices: LifeIndex[]
}

/* ----------  emoji 映射  ---------- */
const emojiMap: Record<string, string> = {
  '01': '☁️', // 多云
  '02': '☀️', // 晴
  '03': '⛅', // 晴间多云
  '04': '☁️', // 阴
  '05': '🌫️', // 雾
  '06': '🌧️', // 小雨
  '07': '🌦️', // 中雨
  '08': '⛈️', // 大雨/暴雨
  '09': '🌨️', // 小雪
  '10': '❄️', // 中雪
  '11': '🌨️', // 大雪
  '12': '🌩️', // 雷暴
  '13': '🌪️', // 龙卷风
  '14': '🌫️', // 沙尘
  '15': '🌫️', // 浮尘
  '16': '🌫️', // 扬沙
  '17': '🌫️', // 强沙尘暴
  '18': '🌧️', // 阵雨
  '19': '🌧️', // 雷阵雨
  '20': '🌧️', // 雷阵雨伴有冰雹
  '21': '🌨️', // 雨夹雪
  '22': '🌨️', // 阵雪
  '23': '🌨️', // 暴雪
  '24': '🌫️', // 霾
}

/* ----------  默认数据  ---------- */
const weatherData = ref<WeatherData>({
  location: { name: '江苏南京', province: '江苏省', city: '南京市', county: '' },
  weather: {
    condition: '多云',
    condition_code: '01',
    temperature: 25,
    humidity: 89,
    wind_power: '3-4',
    updated_at: Date.now(),
  },
  air_quality: { level: 1, quality: '优', aqi: 46 },
  life_indices: [],
})

const displayedIndices = computed(() => (weatherData.value.life_indices || []).slice(0, 6))

function formatTime(ts: number) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
}

/* ----------  获取远程数据  ---------- */
async function fetchWeather() {
  const city = encodeURIComponent('南京市')
  const url = `https://60s.kemeow.top/v2/weather?query=${city}`
  try {
    const res = await fetch(url)
    const json = await res.json()
    if (json.code === 200 && json.data)
      weatherData.value = json.data
  }
  catch (e) { console.error('天气接口失败', e) }
}

onMounted(() => {
  fetchWeather()
  setInterval(fetchWeather, 10 * 60 * 1000)
})
</script>

<template>
  <section class="weather-widget">
    <div class="weather-card">
      <div class="weather-header">
        <span class="city">{{ weatherData.location.name }}</span>
        <span class="update-time">{{ formatTime(weatherData.weather.updated_at) }}</span>
      </div>

      <div class="weather-main">
        <!-- 关键：emoji 图标，无跨域 -->
        <div class="weather-emoji">
          {{ emojiMap[weatherData.weather.condition_code] || '🌈' }}
        </div>
        <div class="weather-info">
          <div class="temperature">
            {{ weatherData.weather.temperature }}°
          </div>
          <div class="condition">
            {{ weatherData.weather.condition }}
          </div>
          <div class="details">
            <span>湿度: {{ weatherData.weather.humidity }}%</span>
            <span>风速: {{ weatherData.weather.wind_power }}</span>
          </div>
        </div>
      </div>

      <div class="weather-footer">
        <div class="air-quality">
          <span class="aqi-label">空气质量</span>
          <span class="aqi-value" :class="`level-${weatherData.air_quality.level}`">
            {{ weatherData.air_quality.quality }} {{ weatherData.air_quality.aqi }}
          </span>
        </div>

        <div class="life-indices">
          <div
            v-for="index in displayedIndices" :key="index.key"
            class="life-index" :title="index.description"
          >
            <span class="index-name">{{ index.name }}</span>
            <span class="index-level">{{ index.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.weather-widget {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.weather-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}
.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  opacity: 0.9;
}
.city { font-weight: 600; font-size: 18px; }
.update-time { font-size: 12px; }
.weather-main {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}
.weather-emoji {
  font-size: 64px;
  margin-right: 20px;
  line-height: 1;
}
.weather-info { flex: 1; }
.temperature {
  font-size: 48px;
  font-weight: 300;
  line-height: 1;
  margin-bottom: 5px;
}
.condition {
  font-size: 20px;
  margin-bottom: 10px;
  opacity: 0.9;
}
.details {
  display: flex;
  gap: 15px;
  font-size: 14px;
  opacity: 0.8;
}
.weather-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 15px;
}
.air-quality {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.aqi-label { font-size: 14px; opacity: 0.8; }
.aqi-value {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}
.level-1 { background: #00e400; }
.level-2 { background: #ffff00; color: #333; }
.level-3 { background: #ff7e00; }
.level-4 { background: #ff0000; }
.level-5 { background: #99004c; }
.level-6 { background: #7e0023; }
.life-indices {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.life-index {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}
.life-index:hover { background: rgba(255, 255, 255, 0.2); }
.index-name { display: block; font-size: 12px; opacity: 0.8; margin-bottom: 5px; }
.index-level { display: block; font-size: 14px; font-weight: 600; }

@media (max-width: 768px) {
  .weather-card { padding: 15px; }
  .weather-emoji { font-size: 48px; margin-right: 15px; }
  .temperature { font-size: 36px; }
  .condition { font-size: 18px; }
  .details { font-size: 12px; gap: 10px; }
  .life-indices { grid-template-columns: repeat(2, 1fr); }
}

@media (prefers-color-scheme: dark) {
  .weather-card { background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); }
}
@media (prefers-color-scheme: light) {
  .weather-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
}
</style>
