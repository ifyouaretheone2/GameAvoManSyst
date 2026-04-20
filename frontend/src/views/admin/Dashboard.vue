<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1 class="page-title">仪表盘</h1>
      <p class="page-subtitle">数据概览和统计信息</p>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>加载中...</p>
    </div>

    <div v-else class="dashboard-content">
      <div class="stats-grid">
        <div class="stat-card" style="--gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <div class="stat-icon">👤</div>
          <div class="stat-info">
            <h3 class="stat-label">角色总数</h3>
            <p class="stat-value">{{ stats.characters || 0 }}</p>
          </div>
        </div>

        <div class="stat-card" style="--gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <div class="stat-icon">📰</div>
          <div class="stat-info">
            <h3 class="stat-label">新闻总数</h3>
            <p class="stat-value">{{ stats.news || 0 }}</p>
          </div>
        </div>

        <div class="stat-card" style="--gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <div class="stat-icon">🎮</div>
          <div class="stat-info">
            <h3 class="stat-label">玩法总数</h3>
            <p class="stat-value">{{ stats.gameplay || 0 }}</p>
          </div>
        </div>

        <div class="stat-card" style="--gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
          <div class="stat-icon">🛍️</div>
          <div class="stat-info">
            <h3 class="stat-label">商品总数</h3>
            <p class="stat-value">{{ stats.products || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2 class="section-title">快速操作</h2>
        <div class="actions-grid">
          <router-link to="/admin/characters" class="action-card">
            <span class="action-icon">➕</span>
            <span class="action-text">添加角色</span>
          </router-link>
          <router-link to="/admin/news" class="action-card">
            <span class="action-icon">➕</span>
            <span class="action-text">发布新闻</span>
          </router-link>
          <router-link to="/admin/gameplay" class="action-card">
            <span class="action-icon">➕</span>
            <span class="action-text">添加玩法</span>
          </router-link>
          <router-link to="/admin/products" class="action-card">
            <span class="action-icon">➕</span>
            <span class="action-text">添加商品</span>
          </router-link>
          <router-link to="/admin/users" class="action-card">
            <span class="action-icon">👥</span>
            <span class="action-text">用户与权限</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { characterApi, newsApi, gameplayApi, productApi } from '@/api'

const stats = ref({
  characters: 0,
  news: 0,
  gameplay: 0,
  products: 0
})

const loading = ref(true)

const loadStats = async () => {
  try {
    loading.value = true
    const [charactersRes, newsRes, gameplayRes, productsRes] = await Promise.all([
      characterApi.getList({ page: 1, pageSize: 1 }),
      newsApi.getList({ page: 1, pageSize: 1 }),
      gameplayApi.getList({ page: 1, pageSize: 1 }),
      productApi.getList({ page: 1, pageSize: 1 })
    ])
    
    stats.value = {
      characters: charactersRes.data.total || 0,
      news: newsRes.data.total || 0,
      gameplay: gameplayRes.data.total || 0,
      products: productsRes.data.total || 0
    }
  } catch (error) {
    console.error('加载统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.dashboard {
  color: #fff;
}

.dashboard-header {
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
}

.loading-state {
  text-align: center;
  padding: 4rem;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
}

.stat-icon {
  font-size: 3rem;
  width: 70px;
  height: 70px;
  border-radius: 16px;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.quick-actions {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #fff;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s;
}

.action-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.action-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-text {
  font-weight: 600;
  font-size: 0.95rem;
}
</style>
