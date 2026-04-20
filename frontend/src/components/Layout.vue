<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <div class="nav-container">
          <router-link to="/home" class="logo">
            <div class="logo-icon">🎮</div>
            <span class="logo-text">游戏风格网站</span>
          </router-link>
          
          <div class="nav-center">
            <div class="nav-links">
              <router-link to="/home" class="nav-link">
                <span class="nav-icon">🏠</span>
                <span>首页</span>
              </router-link>
              <router-link to="/characters" class="nav-link">
                <span class="nav-icon">👤</span>
                <span>角色</span>
              </router-link>
              <router-link to="/news" class="nav-link">
                <span class="nav-icon">📰</span>
                <span>新闻</span>
              </router-link>
              <router-link to="/gameplay" class="nav-link">
                <span class="nav-icon">🎮</span>
                <span>玩法</span>
              </router-link>
              <router-link to="/products" class="nav-link">
                <span class="nav-icon">🛍️</span>
                <span>商品</span>
              </router-link>
            </div>
          </div>
          
          <div class="nav-actions">
            <div class="search-box">
              <input type="text" placeholder="搜索..." class="search-input">
              <button class="search-btn">🔍</button>
            </div>
            <router-link v-if="!userStore.isLoggedIn" to="/login" class="btn-login">
              <span>登录</span>
            </router-link>
            <div v-else class="user-menu">
              <router-link v-if="userStore.isAdmin" to="/admin" class="btn-admin">
                <span>管理后台</span>
              </router-link>
              <button @click="logout" class="btn-logout">
                <span>退出</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
    
    <main class="main-content">
      <slot />
    </main>
    
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>游戏风格网站</h3>
            <p>探索角色、新闻、玩法和周边商品，体验全新的游戏世界</p>
            <div class="social-links">
              <a href="#" class="social-link">📱</a>
              <a href="#" class="social-link">🐦</a>
              <a href="#" class="social-link">📺</a>
              <a href="#" class="social-link">💬</a>
            </div>
          </div>
          
          <div class="footer-section">
            <h4>快速导航</h4>
            <ul class="footer-links">
              <li><router-link to="/characters">角色列表</router-link></li>
              <li><router-link to="/news">最新新闻</router-link></li>
              <li><router-link to="/gameplay">玩法指南</router-link></li>
              <li><router-link to="/products">周边商城</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>帮助支持</h4>
            <ul class="footer-links">
              <li><a href="#">用户指南</a></li>
              <li><a href="#">常见问题</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">意见反馈</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>关于我们</h4>
            <ul class="footer-links">
              <li><a href="#">公司介绍</a></li>
              <li><a href="#">加入我们</a></li>
              <li><a href="#">隐私政策</a></li>
              <li><a href="#">服务条款</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 游戏风格网站. All rights reserved.</p>
          <p>Powered by Vue.js & Node.js</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;
  height: 80px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.5));
}

.logo-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-center {
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius-md);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--primary-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link:hover::before,
.nav-link.router-link-active::before {
  opacity: 0.2;
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  padding: 0.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  width: 200px;
  font-size: 0.9rem;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s ease;
}

.search-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-login,
.btn-admin,
.btn-logout {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
}

.btn-login,
.btn-admin {
  background: var(--primary-gradient);
  color: #fff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-login:hover,
.btn-admin:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-logout {
  background: rgba(245, 87, 108, 0.2);
  color: #f5576c;
  border: 1px solid rgba(245, 87, 108, 0.3);
}

.btn-logout:hover {
  background: rgba(245, 87, 108, 0.3);
  transform: translateY(-2px);
}

/* Main Content */
.main-content {
  flex: 1;
  width: 100%;
}

/* Footer Styles */
.footer {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 4rem;
}

.footer-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-section h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.footer-section p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary-gradient);
  transform: translateY(-2px);
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .nav-container {
    max-width: 1200px;
    gap: 1.5rem;
  }
  
  .footer-container {
    max-width: 1200px;
  }
  
  .nav-links {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .search-input {
    width: 160px;
  }
}

@media (max-width: 1200px) {
  .nav-container {
    grid-template-columns: auto 1fr auto;
    gap: 1rem;
  }
  
  .nav-center {
    justify-content: center;
  }
  
  .nav-links {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
  
  .nav-icon {
    font-size: 1rem;
  }
  
  .search-input {
    width: 120px;
    font-size: 0.85rem;
  }
  
  .btn-login,
  .btn-admin,
  .btn-logout {
    padding: 0.6rem 1.25rem;
    font-size: 0.85rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 992px) {
  .nav-container {
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }
  
  .nav-actions {
    grid-column: 1 / -1;
    justify-content: center;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-center {
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .nav-container {
    grid-template-columns: 1fr;
    text-align: center;
    height: auto;
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .nav-center {
    justify-content: center;
    order: 2;
  }
  
  .nav-actions {
    order: 3;
    grid-column: auto;
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
  
  .logo {
    order: 1;
    justify-content: center;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .search-input {
    width: 140px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>

