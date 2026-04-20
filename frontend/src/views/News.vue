<template>
  <Layout>
    <div class="news-page">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">新闻公告</h1>
          <p class="page-subtitle">获取最新的游戏资讯和重要公告</p>
        </div>
      </div>

      <div class="container">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="news.length === 0" class="empty-state">
          <div class="empty-icon">📰</div>
          <h3>暂无新闻</h3>
          <p>新闻正在更新中，敬请期待</p>
        </div>

        <div v-else class="news-list">
          <article 
            v-for="item in news" 
            :key="item.id" 
            class="news-card"
            @click="$router.push(`/news/${item.id}`)"
          >
            <div v-if="item.cover_url" class="news-image">
              <img :src="item.cover_url" :alt="item.title" @error="handleImageError" />
            </div>
            <div class="news-content">
              <div class="news-meta">
                <span class="category-badge" :style="getCategoryColor(item.category)">
                  {{ item.category }}
                </span>
                <span class="date">{{ formatDate(item.publish_time) }}</span>
              </div>
              <h2 class="news-title">{{ item.title }}</h2>
              <p class="news-excerpt">{{ getExcerpt(item.content) }}</p>
              <div class="news-footer">
                <span class="author">发布人: {{ item.author }}</span>
                <span class="read-more">阅读更多 →</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Layout from '@/components/Layout.vue'
import { newsApi } from '@/api'

const news = ref([])
const loading = ref(true)

const loadNews = async () => {
  try {
    loading.value = true
    const res = await newsApi.getList({ page: 1, pageSize: 20 })
    news.value = res.data.list || []
  } catch (error) {
    console.error('加载新闻失败:', error)
    news.value = []
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const getExcerpt = (content) => {
  if (!content) return '暂无内容'
  const text = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ')
  return text.length > 150 ? text.substring(0, 150) + '...' : text
}

const getCategoryColor = (category) => {
  const colors = {
    '公告': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '活动': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    '更新': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    '新闻': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }
  return { background: colors[category] || colors['新闻'] }
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
}

onMounted(() => {
  loadNews()
})
</script>

<style scoped>
.news-page {
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
  max-width: 1200px;
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

.news-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.news-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  gap: 2rem;
  transition: all 0.3s;
  cursor: pointer;
}

.news-card:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
}

.news-image {
  width: 300px;
  min-width: 300px;
  height: 200px;
  overflow: hidden;
  background: #1a1a1a;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.news-card:hover .news-image img {
  transform: scale(1.1);
}

.news-content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.category-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
}

.date {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.news-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.news-excerpt {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  flex: 1;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.read-more {
  color: #667eea;
  font-weight: 600;
  transition: transform 0.3s;
}

.news-card:hover .read-more {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .news-card {
    flex-direction: column;
  }
  
  .news-image {
    width: 100%;
    min-width: auto;
    height: 200px;
  }
}
</style>
