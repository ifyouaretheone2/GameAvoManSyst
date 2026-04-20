<template>
  <Layout>
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-badge">
              <span>🎮 全新游戏体验</span>
            </div>
            <h1 class="hero-title">
              <span class="gradient-text">欢迎来到</span>
              <br />
              <span class="gradient-text-alt">游戏风格网站</span>
            </h1>
            <p class="hero-subtitle">
              探索丰富的角色世界，获取最新游戏资讯，掌握核心玩法技巧，收藏精美周边商品
              <br />
              体验前所未有的沉浸式游戏生态系统
            </p>
            <div class="hero-buttons">
              <router-link to="/characters" class="btn-hero-primary">
                <span class="btn-icon">👤</span>
                <span>探索角色</span>
              </router-link>
              <router-link to="/news" class="btn-hero-secondary">
                <span class="btn-icon">📰</span>
                <span>查看新闻</span>
              </router-link>
              <router-link to="/gameplay" class="btn-hero-outline">
                <span class="btn-icon">🎮</span>
                <span>玩法指南</span>
              </router-link>
            </div>
            
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">精彩角色</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">100+</div>
                <div class="stat-label">最新资讯</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">20+</div>
                <div class="stat-label">核心玩法</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">200+</div>
                <div class="stat-label">周边商品</div>
              </div>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="hero-card-stack">
              <div class="hero-card card-1">
                <div class="card-icon">👤</div>
                <div class="card-title">角色系统</div>
              </div>
              <div class="hero-card card-2">
                <div class="card-icon">📰</div>
                <div class="card-title">新闻资讯</div>
              </div>
              <div class="hero-card card-3">
                <div class="card-icon">🎮</div>
                <div class="card-title">玩法指南</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="hero-background">
          <div class="gradient-orb orb-1"></div>
          <div class="gradient-orb orb-2"></div>
          <div class="gradient-orb orb-3"></div>
          <div class="gradient-orb orb-4"></div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container-fluid">
          <div class="section-header">
            <h2 class="section-title">核心功能</h2>
            <p class="section-subtitle">全方位的游戏内容管理与展示平台</p>
          </div>
          
          <div class="features-grid">
            <div class="feature-card large-card" @click="$router.push('/characters')">
              <div class="feature-background">
                <div class="feature-pattern"></div>
              </div>
              <div class="feature-content">
                <div class="feature-icon">👤</div>
                <h3>角色管理系统</h3>
                <p>深入了解每个角色的背景故事、技能属性和成长路径，打造个性化的角色收藏</p>
                <div class="feature-tags">
                  <span class="tag">角色档案</span>
                  <span class="tag">技能树</span>
                  <span class="tag">成长系统</span>
                </div>
              </div>
            </div>
            
            <div class="feature-card" @click="$router.push('/news')">
              <div class="feature-background">
                <div class="feature-pattern"></div>
              </div>
              <div class="feature-content">
                <div class="feature-icon">📰</div>
                <h3>新闻公告</h3>
                <p>第一时间获取游戏更新、活动公告和重要资讯</p>
                <div class="feature-meta">
                  <span>实时更新</span>
                </div>
              </div>
            </div>
            
            <div class="feature-card" @click="$router.push('/gameplay')">
              <div class="feature-background">
                <div class="feature-pattern"></div>
              </div>
              <div class="feature-content">
                <div class="feature-icon">🎮</div>
                <h3>玩法资料</h3>
                <p>详细的游戏机制说明和高级策略指南</p>
                <div class="feature-meta">
                  <span>策略指南</span>
                </div>
              </div>
            </div>
            
            <div class="feature-card" @click="$router.push('/products')">
              <div class="feature-background">
                <div class="feature-pattern"></div>
              </div>
              <div class="feature-content">
                <div class="feature-icon">🛍️</div>
                <h3>周边商品</h3>
                <p>精美的游戏周边和限定收藏品</p>
                <div class="feature-meta">
                  <span>限量收藏</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Access Section -->
      <section class="quick-access">
        <div class="container-fluid">
          <div class="section-header">
            <h2 class="section-title">快速访问</h2>
            <p class="section-subtitle">一键直达您需要的内容</p>
          </div>
          
          <div class="access-grid">
            <router-link to="/characters" class="access-card characters">
              <div class="access-bg"></div>
              <div class="access-content">
                <div class="access-icon">👤</div>
                <h3>角色列表</h3>
                <p>浏览所有可用角色</p>
                <div class="access-arrow">→</div>
              </div>
            </router-link>
            
            <router-link to="/news" class="access-card news">
              <div class="access-bg"></div>
              <div class="access-content">
                <div class="access-icon">📰</div>
                <h3>最新新闻</h3>
                <p>阅读最新游戏资讯</p>
                <div class="access-arrow">→</div>
              </div>
            </router-link>
            
            <router-link to="/gameplay" class="access-card gameplay">
              <div class="access-bg"></div>
              <div class="access-content">
                <div class="access-icon">🎮</div>
                <h3>玩法指南</h3>
                <p>学习核心游戏技巧</p>
                <div class="access-arrow">→</div>
              </div>
            </router-link>
            
            <router-link to="/products" class="access-card products">
              <div class="access-bg"></div>
              <div class="access-content">
                <div class="access-icon">🛍️</div>
                <h3>周边商城</h3>
                <p>购买精美游戏周边</p>
                <div class="access-arrow">→</div>
              </div>
            </router-link>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>准备开始您的游戏之旅？</h2>
            <p>立即探索我们的游戏世界，发现无限可能</p>
            <div class="cta-buttons">
              <router-link to="/characters" class="btn-cta-primary">开始探索</router-link>
              <router-link to="/login" class="btn-cta-secondary">登录</router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '@/components/Layout.vue'
</script>

<style scoped>
.home {
  min-height: calc(100vh - 80px);
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 2rem 0;
}

.hero-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 600px;
  min-width: 0;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 50px;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: clamp(3rem, 5vw, 5rem);
  font-weight: 800;
  margin-bottom: 2rem;
  line-height: 1.1;
}

.gradient-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-alt {
  background: var(--secondary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.btn-hero-primary,
.btn-hero-secondary,
.btn-hero-outline {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-hero-primary {
  background: var(--primary-gradient);
  color: #fff;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-hero-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
}

.btn-hero-secondary {
  background: var(--secondary-gradient);
  color: #fff;
  box-shadow: 0 8px 25px rgba(240, 147, 251, 0.4);
}

.btn-hero-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(240, 147, 251, 0.6);
}

.btn-hero-outline {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.btn-hero-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-3px);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  row-gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.25rem;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
}

.hero-card-stack {
  position: relative;
  width: 300px;
  height: 400px;
}

.hero-card {
  position: absolute;
  width: 200px;
  height: 120px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-card:hover {
  transform: translateY(-10px) scale(1.05);
  background: var(--hover-glass-bg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-1 {
  top: 0;
  left: 0;
  z-index: 3;
  animation: float 6s ease-in-out infinite;
}

.card-2 {
  top: 80px;
  right: 0;
  z-index: 2;
  animation: float 6s ease-in-out infinite 2s;
}

.card-3 {
  bottom: 0;
  left: 50px;
  z-index: 1;
  animation: float 6s ease-in-out infinite 4s;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  animation: orbit 30s infinite linear;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: var(--primary-gradient);
  top: -200px;
  left: -200px;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: var(--secondary-gradient);
  bottom: -150px;
  right: -150px;
  animation-delay: 7.5s;
}

.orb-3 {
  width: 350px;
  height: 350px;
  background: var(--accent-gradient);
  top: 20%;
  right: 10%;
  animation-delay: 15s;
}

.orb-4 {
  width: 250px;
  height: 250px;
  background: var(--warm-gradient);
  bottom: 30%;
  left: 20%;
  animation-delay: 22.5s;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(50px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(50px) rotate(-360deg);
  }
}

/* Features Section */
.features {
  padding: 8rem 0;
  background: rgba(0, 0, 0, 0.2);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2rem;
  min-height: 520px;
  align-items: stretch;
}

.feature-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-xl);
  padding: 2.5rem;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  min-height: 0;
}

.large-card {
  grid-row: 1 / -1;
}

.feature-card:hover {
  transform: translateY(-8px);
  background: var(--hover-glass-bg);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
}

.feature-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.feature-card:hover .feature-background {
  opacity: 0.2;
}

.feature-pattern {
  width: 100%;
  height: 100%;
  background: var(--primary-gradient);
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
}

.feature-content {
  position: relative;
  z-index: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.feature-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.feature-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.95);
}

.feature-card p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  flex: 1;
}

.feature-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  font-size: 0.8rem;
  color: #667eea;
}

.feature-meta {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 600;
}

/* Quick Access Section */
.quick-access {
  padding: 8rem 0;
}

.access-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.access-card {
  position: relative;
  height: 250px;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s ease;
  display: flex;
  align-items: flex-end;
}

.access-card:hover {
  transform: scale(1.05) translateY(-10px);
}

.access-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.access-card:hover .access-bg {
  opacity: 1;
}

.characters .access-bg {
  background: var(--primary-gradient);
}

.news .access-bg {
  background: var(--secondary-gradient);
}

.gameplay .access-bg {
  background: var(--accent-gradient);
}

.products .access-bg {
  background: var(--warm-gradient);
}

.access-content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  width: 100%;
}

.access-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.access-card h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.access-card p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin-bottom: 1rem;
}

.access-arrow {
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.access-card:hover .access-arrow {
  transform: translateX(5px);
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  backdrop-filter: blur(20px);
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-content p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-cta-primary,
.btn-cta-secondary {
  padding: 1rem 2.5rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-cta-primary {
  background: var(--primary-gradient);
  color: #fff;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
}

.btn-cta-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px);
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .hero-container {
    max-width: 1200px;
  }
}

@media (max-width: 1200px) {
  .hero-container {
    grid-template-columns: minmax(0, 1fr);
    gap: 3rem;
    text-align: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr 1fr;
    height: auto;
  }
  
  .large-card {
    grid-row: auto;
    grid-column: 1 / -1;
  }
  
  .access-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .stat-divider {
    display: none;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .access-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
