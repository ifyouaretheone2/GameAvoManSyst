<template>
  <Layout>
    <div class="gameplay-page">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">玩法资料</h1>
          <p class="page-subtitle">深入了解游戏机制和策略指南</p>
        </div>
      </div>

      <div class="container">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="gameplays.length === 0" class="empty-state">
          <div class="empty-icon">🎮</div>
          <h3>暂无玩法资料</h3>
          <p>玩法资料正在更新中</p>
        </div>

        <div v-else class="gameplay-grid">
          <div 
            v-for="item in gameplays" 
            :key="item.id" 
            class="gameplay-card"
            @click="$router.push(`/gameplay/${item.id}`)"
          >
            <div v-if="item.cover_url" class="gameplay-image">
              <img :src="item.cover_url" :alt="item.title" @error="handleImageError" />
            </div>
            <div class="gameplay-content">
              <div class="type-badge">{{ item.type }}</div>
              <h3 class="gameplay-title">{{ item.title }}</h3>
              <p class="gameplay-excerpt">{{ getExcerpt(item.content) }}</p>
              <div class="gameplay-footer">
                <span class="read-more">查看详情 →</span>
              </div>
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
import { gameplayApi } from '@/api'

const gameplays = ref([])
const loading = ref(true)

const loadGameplays = async () => {
  try {
    loading.value = true
    const res = await gameplayApi.getList({ page: 1, pageSize: 20 })
    gameplays.value = res.data.list || []
  } catch (error) {
    console.error('加载玩法失败:', error)
    gameplays.value = []
  } finally {
    loading.value = false
  }
}

const getExcerpt = (content) => {
  if (!content) return '暂无内容'
  const text = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')
  return text.length > 120 ? text.substring(0, 120) + '...' : text
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
}

onMounted(() => {
  loadGameplays()
})
</script>

<style scoped>
.gameplay-page {
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
  color: rgba(255, 255, 255, 0.88);
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

.empty-state p {
  color: rgba(255, 255, 255, 0.85);
  max-width: 28rem;
  margin: 0 auto;
  line-height: 1.7;
}

.gameplay-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.gameplay-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.gameplay-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
}

.gameplay-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #1a1a1a;
}

.gameplay-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gameplay-card:hover .gameplay-image img {
  transform: scale(1.1);
}

.gameplay-content {
  padding: 2rem;
}

.type-badge {
  display: inline-block;
  padding: 0.4rem 1rem;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.5);
  border-radius: 20px;
  color: #667eea;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.gameplay-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.gameplay-excerpt {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.gameplay-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more {
  color: #667eea;
  font-weight: 600;
  transition: transform 0.3s;
}

.gameplay-card:hover .read-more {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .gameplay-grid {
    grid-template-columns: 1fr;
  }
}
</style>
