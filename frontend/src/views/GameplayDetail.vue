<template>
  <Layout>
    <div class="gameplay-detail">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <div v-else-if="item" class="detail-container">
        <div class="detail-header">
          <button type="button" @click="goBack" class="back-btn">← 返回</button>
        </div>

        <article class="article-panel">
          <div class="article-header">
            <div class="article-meta">
              <span class="type-badge">{{ item.type || '玩法' }}</span>
            </div>
            <h1 class="article-title">{{ item.title }}</h1>
          </div>

          <div v-if="item.cover_url" class="article-cover">
            <img :src="item.cover_url" :alt="item.title" @error="handleImageError" />
          </div>

          <div class="article-content">
            <div class="content-text" v-html="formatContent(item.content)"></div>
          </div>
        </article>
      </div>

      <div v-else class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>加载失败</h3>
        <p>无法加载玩法内容，请稍后重试</p>
        <button type="button" @click="loadGameplay" class="retry-btn">重试</button>
        <button type="button" @click="$router.push('/gameplay')" class="retry-btn secondary">
          返回列表
        </button>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { gameplayApi } from '@/api'

const route = useRoute()
const router = useRouter()
const item = ref(null)
const loading = ref(true)

const loadGameplay = async () => {
  try {
    loading.value = true
    const res = await gameplayApi.getById(route.params.id)
    item.value = res.data || null
  } catch (error) {
    console.error('加载玩法详情失败:', error)
    item.value = null
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/gameplay')
  }
}

const formatContent = (content) => {
  if (!content) return '<p>暂无内容</p>'
  return content.replace(/\n/g, '<br>')
}

const handleImageError = (e) => {
  e.target.style.display = 'none'
}

watch(
  () => route.params.id,
  () => {
    loadGameplay()
  }
)

loadGameplay()
</script>

<style scoped>
.gameplay-detail {
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

.article-panel {
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

.type-badge {
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
  color: rgba(255, 255, 255, 0.92);
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
  to {
    transform: rotate(360deg);
  }
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
  margin: 0.75rem 0.5rem 0;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
}

.retry-btn.secondary {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.retry-btn:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .article-panel {
    padding: 2rem;
  }

  .article-title {
    font-size: 2rem;
  }
}
</style>
