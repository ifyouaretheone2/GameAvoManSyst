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
                <div class="card-content">
                  <div class="card-title">角色系统</div>
                  <div class="card-desc">探索精彩角色</div>
                </div>
              </div>
              <div class="hero-card card-2">
                <div class="card-icon">📰</div>
                <div class="card-content">
                  <div class="card-title">新闻资讯</div>
                  <div class="card-desc">获取最新动态</div>
                </div>
              </div>
              <div class="hero-card card-3">
                <div class="card-icon">🎮</div>
                <div class="card-content">
                  <div class="card-title">玩法指南</div>
                  <div class="card-desc">掌握核心技巧</div>
                </div>
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
/* ========== 基础布局变量 ========== */
.home {
  min-height: calc(100vh - 80px);
  --section-padding: 6rem;
  --section-padding-large: 8rem;
  --card-padding: 2rem;
  --grid-gap: 2rem;
  --content-gap: 1.5rem;
}

/* ========== 统一区块样式 ========== */
.section {
  padding: var(--section-padding-large) 0;
}

.section-dark {
  background: rgba(0, 0, 0, 0.2);
}

.section-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 2rem;
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
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ========== Hero Section ========== */
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
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 650px;
  min-width: 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.25rem;
  background: rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 50px;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.75rem;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.05;
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
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2.5rem;
  line-height: 1.75;
  max-width: 580px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}

.btn-hero-primary,
.btn-hero-secondary,
.btn-hero-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.75rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  white-space: nowrap;
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
  gap: 2.5rem;
  flex-wrap: wrap;
  row-gap: 1.25rem;
}

.stat-item {
  text-align: center;
  min-width: 80px;
}

.stat-number {
  font-size: 2.25rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.35rem;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.25), transparent);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  width: 100%;
}

.hero-card-stack {
  position: relative;
  width: 100%;
  max-width: 380px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.hero-card {
  position: relative;
  width: 260px;
  height: 140px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
  gap: 1.25rem;
  z-index: 1;
}

.hero-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-card:hover::before {
  opacity: 1;
}

.hero-card:hover {
  transform: translateY(-8px) translateX(10px);
  background: var(--hover-glass-bg);
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.card-1 {
  animation: float 6s ease-in-out infinite;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, var(--glass-bg) 100%);
}

.card-2 {
  margin-left: 2rem;
  animation: float 6s ease-in-out infinite 2s;
  background: linear-gradient(135deg, rgba(240, 147, 251, 0.15) 0%, var(--glass-bg) 100%);
}

.card-3 {
  margin-left: 4rem;
  animation: float 6s ease-in-out infinite 4s;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.15) 0%, var(--glass-bg) 100%);
}

.card-icon {
  font-size: 2.75rem;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.05rem;
}

.card-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
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

/* ========== Features Section ========== */
.features {
  padding: var(--section-padding-large) 0;
  background: rgba(0, 0, 0, 0.2);
}

.features-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--grid-gap);
  min-height: 480px;
}

.feature-card {
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-xl);
  padding: var(--card-padding);
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.large-card {
  grid-row: 1 / -1;
  padding: 2.5rem;
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
  flex: 1;
  display: flex;
  flex-direction: column;
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.large-card .feature-icon {
  font-size: 4.5rem;
  margin-bottom: 1.25rem;
}

.feature-card h3 {
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 700;
  line-height: 1.3;
}

.large-card h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  flex: 1;
  font-size: 0.95rem;
}

.large-card p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.feature-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  flex-wrap: wrap;
  padding-top: 0.5rem;
}

.tag {
  padding: 0.35rem 0.85rem;
  background: rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.25);
  border-radius: 20px;
  font-size: 0.8rem;
  color: #667eea;
  font-weight: 500;
}

.feature-meta {
  margin-top: auto;
  padding-top: 0.5rem;
  font-size: 0.85rem;
  color: #667eea;
  font-weight: 600;
}

/* ========== Quick Access Section ========== */
.quick-access {
  padding: var(--section-padding-large) 0;
}

.access-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--grid-gap);
}

.access-card {
  position: relative;
  height: 260px;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  text-decoration: none;
  transition: all 0.4s ease;
  display: flex;
  align-items: flex-end;
}

.access-card:hover {
  transform: scale(1.03) translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.access-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.85;
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
  padding: var(--card-padding);
  width: 100%;
  display: flex;
  flex-direction: column;
}

.access-icon {
  font-size: 2.75rem;
  margin-bottom: 0.75rem;
  display: block;
}

.access-card h3 {
  font-size: 1.35rem;
  color: #fff;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.access-card p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.access-arrow {
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  transition: transform 0.3s ease;
  margin-top: auto;
}

.access-card:hover .access-arrow {
  transform: translateX(8px);
}

/* ========== CTA Section ========== */
.cta-section {
  padding: var(--section-padding) 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  backdrop-filter: blur(20px);
}

.cta-content {
  text-align: center;
  max-width: 650px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.cta-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 2.25rem;
  line-height: 1.7;
}

.cta-buttons {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-cta-primary,
.btn-cta-secondary {
  padding: 0.95rem 2.25rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
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
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-3px);
}

/* ========== 响应式设计 ========== */
@media (max-width: 1400px) {
  .hero-container {
    max-width: 1200px;
    gap: 4rem;
  }
  
  .hero-card-stack {
    max-width: 340px;
    height: 400px;
  }
  
  .hero-card {
    width: 240px;
    height: 130px;
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .card-2 {
    margin-left: 1.5rem;
  }
  
  .card-3 {
    margin-left: 3rem;
  }
  
  .card-icon {
    font-size: 2.5rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-desc {
    font-size: 0.8rem;
  }
}

@media (max-width: 1200px) {
  .hero-container {
    grid-template-columns: minmax(0, 1fr);
    gap: 3rem;
    text-align: center;
  }
  
  .hero-content {
    max-width: 100%;
    margin: 0 auto;
  }
  
  .hero-subtitle {
    max-width: 100%;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-card-stack {
    max-width: 320px;
    height: 380px;
    gap: 0.75rem;
  }
  
  .hero-card {
    width: 240px;
    height: 120px;
  }
  
  .card-2 {
    margin-left: 1rem;
  }
  
  .card-3 {
    margin-left: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
  
  .large-card {
    grid-row: auto;
    grid-column: 1 / -1;
  }
  
  .access-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .hero-card-stack {
    max-width: 300px;
    height: 360px;
  }
  
  .hero-card {
    width: 220px;
    height: 115px;
    padding: 1rem;
    gap: 0.85rem;
  }
  
  .card-2 {
    margin-left: 0.75rem;
  }
  
  .card-3 {
    margin-left: 1.5rem;
  }
  
  .card-icon {
    font-size: 2.25rem;
  }
}

@media (max-width: 768px) {
  .home {
    --section-padding: 4rem;
    --section-padding-large: 5rem;
    --card-padding: 1.5rem;
    --grid-gap: 1.5rem;
  }
  
  .hero-container {
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: clamp(2.25rem, 8vw, 3.5rem);
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    gap: 0.75rem;
    margin-bottom: 2.5rem;
  }
  
  .btn-hero-primary,
  .btn-hero-secondary,
  .btn-hero-outline {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
    row-gap: 1rem;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
  
  .hero-card-stack {
    max-width: 280px;
    height: 340px;
    gap: 0.6rem;
  }
  
  .hero-card {
    width: 220px;
    height: 105px;
    padding: 0.85rem 1rem;
    gap: 0.75rem;
  }
  
  .card-2 {
    margin-left: 0.5rem;
  }
  
  .card-3 {
    margin-left: 1rem;
  }
  
  .card-icon {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 0.95rem;
  }
  
  .card-desc {
    font-size: 0.75rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-icon {
    font-size: 3rem;
  }
  
  .large-card .feature-icon {
    font-size: 3.5rem;
  }
  
  .feature-card h3 {
    font-size: 1.25rem;
  }
  
  .large-card h3 {
    font-size: 1.5rem;
  }
  
  .access-grid {
    grid-template-columns: 1fr;
  }
  
  .access-card {
    height: 220px;
  }
  
  .access-icon {
    font-size: 2.5rem;
  }
  
  .access-card h3 {
    font-size: 1.25rem;
  }
  
  .cta-content h2 {
    font-size: 1.85rem;
  }
  
  .cta-content p {
    font-size: 1rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .btn-cta-primary,
  .btn-cta-secondary {
    width: 100%;
    max-width: 280px;
  }
}
</style>
