<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-section">
          <div class="logo-icon">⚡</div>
          <h2 class="logo-text">管理后台</h2>
        </div>
        <div class="user-info">
          <div class="user-avatar">
            <span>{{ (userStore.nickname || '管理员').charAt(0) }}</span>
          </div>
          <div class="user-details">
            <span class="user-name">{{ userStore.nickname || '管理员' }}</span>
            <span class="user-role">{{ userStore.isAdmin ? '管理员' : '用户' }}</span>
          </div>
          <button @click="handleLogout" class="logout-btn" title="退出登录">
            <span class="logout-icon">🚪</span>
          </button>
        </div>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="nav-item">
          <span class="nav-icon">📊</span>
          <span class="nav-text">仪表盘</span>
        </router-link>
        <router-link to="/admin/users" class="nav-item">
          <span class="nav-icon">👥</span>
          <span class="nav-text">用户与权限</span>
        </router-link>
        <router-link to="/admin/characters" class="nav-item">
          <span class="nav-icon">👤</span>
          <span class="nav-text">角色管理</span>
        </router-link>
        <router-link to="/admin/news" class="nav-item">
          <span class="nav-icon">📰</span>
          <span class="nav-text">新闻管理</span>
        </router-link>
        <router-link to="/admin/gameplay" class="nav-item">
          <span class="nav-icon">🎮</span>
          <span class="nav-text">玩法管理</span>
        </router-link>
        <router-link to="/admin/products" class="nav-item">
          <span class="nav-icon">🛍️</span>
          <span class="nav-text">商品管理</span>
        </router-link>
      </nav>
    </aside>
    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

.sidebar {
  width: 280px;
  background: rgba(20, 20, 20, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
}

.sidebar-header {
  padding: 0 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.logo-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
}

.user-role {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

.logout-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 107, 107, 0.2);
  border: 1px solid rgba(255, 107, 107, 0.3);
  color: #ff6b6b;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logout-btn:hover {
  background: rgba(255, 107, 107, 0.3);
  transform: scale(1.1);
}

.logout-icon {
  font-size: 1.2rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transform: translateX(5px);
}

.nav-item.router-link-active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border: 1px solid rgba(102, 126, 234, 0.3);
  color: #fff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.nav-item.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 4px 4px 0;
}

.nav-icon {
  font-size: 1.3rem;
  width: 24px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
  font-size: 0.95rem;
}

.admin-content {
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }
  
  .logo-text,
  .user-details,
  .nav-text {
    display: none;
  }
  
  .logo-section,
  .user-info {
    justify-content: center;
  }
}
</style>
