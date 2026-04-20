<template>
  <Layout>
    <div class="news-detail">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
      
      <div v-else-if="newsItem" class="detail-container">
        <div class="detail-header">
          <button @click="$router.back()" class="back-btn">← 返回</button>
        </div>
        
        <article class="news-article">
          <div class="article-header">
            <div class="article-meta">
              <span class="category-badge" :style="getCategoryColor(newsItem.category)">
                {{ newsItem.category }}
              </span>
              <span class="date">{{ formatDate(newsItem.publish_time) }}</span>
              <span class="author">发布人: {{ newsItem.author }}</span>
            </div>
            <h1 class="article-title">{{ newsItem.title }}</h1>
          </div>
          
          <div v-if="newsItem.cover_url" class="article-cover">
            <img :src="newsItem.cover_url" :alt="newsItem.title" @error="handleImageError" />
          </div>
          
          <div class="article-content">
            <div class="content-text" v-html="formatContent(newsItem.content)"></div>
          </div>
        </article>
      </div>
      
      <div v-else class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>加载失败</h3>
        <p>无法加载新闻内容，请稍后重试</p>
        <button @click="loadNews" class="retry-btn">重试</button>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { newsApi } from '@/api'

const route = useRoute()
const newsItem = ref(null)
const loading = ref(true)

const loadNews = async () => {
  try {
    loading.value = true
    const res = await newsApi.getById(route.params.id)
    newsItem.value = res.data
  } catch (error) {
    console.error('加载新闻详情失败:', error)
    newsItem.value = null
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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatContent = (content) => {
  if (!content) return '<p>暂无内容</p>'
  return content.replace(/\n/g, '<br>')
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
.news-detail {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.detail-container {
  max-width: 1000px;
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

.news-article {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 3rem;
}

.article-header {
  margin-bottom: 2rem;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.category-badge {
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
}

.date,
.author {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.article-cover {
  width: 100%;
  margin-bottom: 2rem;
  border-radius: 20px;
  overflow: hidden;
  background: #1a1a1a;
}

.article-cover img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}

.article-content {
  margin-top: 2rem;
}

.content-text {
  font-size: 1.1rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.9);
}

.content-text :deep(p) {
  margin-bottom: 1.5rem;
}

.content-text :deep(h2) {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  color: #fff;
}

.content-text :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem;
  color: #fff;
}

.content-text :deep(ul),
.content-text :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content-text :deep(li) {
  margin-bottom: 0.5rem;
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

@media (max-width: 768px) {
  .news-article {
    padding: 2rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
