<template>
  <Layout>
    <div class="characters-page">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">角色列表</h1>
          <p class="page-subtitle">探索丰富的角色世界，了解每个角色的故事</p>
        </div>
      </div>

      <div class="container">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="characters.length === 0" class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>暂无角色</h3>
          <p>角色数据正在更新中</p>
        </div>

        <div v-else class="characters-grid">
          <div 
            v-for="character in characters" 
            :key="character.id" 
            class="character-card"
            @click="$router.push(`/characters/${character.id}`)"
          >
            <div class="card-image-wrapper">
              <img 
                :src="character.avatar_url || '/placeholder.jpg'" 
                :alt="character.name"
                @error="handleImageError"
              />
              <div class="card-overlay">
                <span class="view-btn">查看详情</span>
              </div>
              <div v-if="character.attribute" class="attribute-badge">
                {{ character.attribute }}
              </div>
            </div>
            <div class="card-content">
              <h3 class="character-name">{{ character.name }}</h3>
              <p class="character-title">{{ character.title }}</p>
              <p v-if="character.intro" class="character-intro">
                {{ character.intro.substring(0, 60) }}{{ character.intro.length > 60 ? '...' : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Layout from '@/components/Layout.vue'
import { characterApi } from '@/api'

const characters = ref([])
const loading = ref(true)

const loadCharacters = async () => {
  try {
    loading.value = true
    const res = await characterApi.getList({ page: 1, pageSize: 20 })
    characters.value = res.data.list || []
  } catch (error) {
    console.error('加载角色失败:', error)
    characters.value = []
  } finally {
    loading.value = false
  }
}

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect fill="%231a1a1a" width="300" height="400"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3E暂无图片%3C/text%3E%3C/svg%3E'
}

onMounted(() => {
  loadCharacters()
})
</script>

<style scoped>
.characters-page {
  min-height: calc(100vh - 200px);
  padding-top: 2rem;
}

.page-header {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
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

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.character-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.character-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: #1a1a1a;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.character-card:hover .card-image-wrapper img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.character-card:hover .card-overlay {
  opacity: 1;
}

.view-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 25px;
  font-weight: 600;
}

.attribute-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.9);
  backdrop-filter: blur(10px);
  color: #fff;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.card-content {
  padding: 1.5rem;
}

.character-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.character-title {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.character-intro {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .characters-grid {
    grid-template-columns: 1fr;
  }
}
</style>
