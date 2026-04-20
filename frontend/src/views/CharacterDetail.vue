<template>
  <Layout>
    <div class="character-detail">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
      
      <div v-else-if="character" class="detail-container">
        <div class="detail-header">
          <button @click="$router.back()" class="back-btn">← 返回</button>
        </div>
        
        <div class="character-hero">
          <div class="hero-image">
            <img 
              :src="character.cover_url || character.avatar_url" 
              :alt="character.name"
              @error="handleImageError"
            />
          </div>
          <div class="hero-info">
            <h1 class="character-name">{{ character.name }}</h1>
            <p class="character-title">{{ character.title }}</p>
            <div v-if="character.attribute" class="attribute-badge">
              <span class="badge-label">属性</span>
              <span class="badge-value">{{ character.attribute }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="character.intro" class="detail-content">
          <div class="content-section">
            <h2 class="section-title">角色简介</h2>
            <div class="intro-text">{{ character.intro }}</div>
          </div>
        </div>
      </div>
      
      <div v-else class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>加载失败</h3>
        <p>无法加载角色信息，请稍后重试</p>
        <button @click="loadCharacter" class="retry-btn">重试</button>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { characterApi } from '@/api'

const route = useRoute()
const character = ref(null)
const loading = ref(true)

const loadCharacter = async () => {
  try {
    loading.value = true
    const res = await characterApi.getById(route.params.id)
    character.value = res.data
  } catch (error) {
    console.error('加载角色详情失败:', error)
    character.value = null
  } finally {
    loading.value = false
  }
}

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="800"%3E%3Crect fill="%231a1a1a" width="600" height="800"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3E暂无图片%3C/text%3E%3C/svg%3E'
}

onMounted(() => {
  loadCharacter()
})
</script>

<style scoped>
.character-detail {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.detail-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.detail-header {
  margin-bottom: 2rem;
}

.back-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

.character-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 3rem;
}

.hero-image {
  width: 100%;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  background: #1a1a1a;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.character-name {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.character-title {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  font-weight: 500;
}

.attribute-badge {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(102, 126, 234, 0.2);
  border: 2px solid rgba(102, 126, 234, 0.5);
  border-radius: 15px;
}

.badge-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.badge-value {
  color: #667eea;
  font-size: 1.2rem;
  font-weight: 700;
}

.detail-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 3rem;
}

.content-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.8);
  white-space: pre-wrap;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 6rem 2rem;
  color: rgba(255, 255, 255, 0.7);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.retry-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
}

.retry-btn:hover {
  transform: scale(1.05);
}

@media (max-width: 968px) {
  .character-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
  
  .hero-image {
    height: 400px;
  }
  
  .character-name {
    font-size: 2.5rem;
  }
}
</style>
