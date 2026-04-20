<template>
  <Layout>
    <div class="products-page">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">商品周边</h1>
          <p class="page-subtitle">精选游戏周边，收藏你喜爱的角色</p>
        </div>
      </div>

      <div class="container">
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="products.length === 0" class="empty-state">
          <div class="empty-icon">🛍️</div>
          <h3>暂无商品</h3>
          <p>商品正在上架中，敬请期待</p>
        </div>

        <div v-else class="products-grid">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="product-card"
            @click="viewProduct(product)"
          >
            <div class="product-image-wrapper">
              <img 
                :src="product.cover_url || '/placeholder.jpg'" 
                :alt="product.name"
                @error="handleImageError"
              />
              <div class="product-overlay">
                <span class="view-btn">查看详情</span>
              </div>
            </div>
            <div class="product-content">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-intro">{{ product.intro || '暂无简介' }}</p>
              <div class="product-footer">
                <div class="price-wrapper">
                  <span class="currency">¥</span>
                  <span class="price">{{ product.price }}</span>
                </div>
                <div class="stock-info" :class="{ 'low-stock': product.stock < 10 }">
                  <span class="stock-label">库存:</span>
                  <span class="stock-value">{{ product.stock }}</span>
                </div>
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
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { productApi } from '@/api'

const router = useRouter()
const products = ref([])
const loading = ref(true)

const loadProducts = async () => {
  try {
    loading.value = true
    const res = await productApi.getList({ page: 1, pageSize: 20 })
    products.value = res.data.list || []
  } catch (error) {
    console.error('加载商品失败:', error)
    products.value = []
  } finally {
    loading.value = false
  }
}

const viewProduct = (product) => {
  // 可以添加商品详情页路由
  console.log('查看商品:', product)
}

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%231a1a1a" width="300" height="300"/%3E%3Ctext fill="%23666" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="20"%3E暂无图片%3C/text%3E%3C/svg%3E'
}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.products-page {
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
  border-color: rgba(102, 126, 234, 0.5);
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #1a1a1a;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image-wrapper img {
  transform: scale(1.1);
}

.product-overlay {
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

.product-card:hover .product-overlay {
  opacity: 1;
}

.view-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 25px;
  font-weight: 600;
}

.product-content {
  padding: 1.5rem;
}

.product-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.product-intro {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-wrapper {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.currency {
  font-size: 1rem;
  color: #667eea;
  font-weight: 600;
}

.price {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.stock-label {
  color: rgba(255, 255, 255, 0.6);
}

.stock-value {
  color: #4ade80;
  font-weight: 600;
}

.stock-info.low-stock .stock-value {
  color: #f87171;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
