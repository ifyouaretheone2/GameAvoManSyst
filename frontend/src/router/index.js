import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: { render: () => h('div', { class: 'route-root-placeholder' }) }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/characters',
    name: 'Characters',
    component: () => import('@/views/Characters.vue'),
    meta: { title: '角色' }
  },
  {
    path: '/characters/:id',
    name: 'CharacterDetail',
    component: () => import('@/views/CharacterDetail.vue'),
    meta: { title: '角色详情' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('@/views/News.vue'),
    meta: { title: '新闻' }
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('@/views/NewsDetail.vue'),
    meta: { title: '新闻详情' }
  },
  {
    path: '/gameplay',
    name: 'Gameplay',
    component: () => import('@/views/Gameplay.vue'),
    meta: { title: '玩法' }
  },
  {
    path: '/gameplay/:id',
    name: 'GameplayDetail',
    component: () => import('@/views/GameplayDetail.vue'),
    meta: { title: '玩法详情' }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products.vue'),
    meta: { title: '商品' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { title: '注册', requiresAuth: false }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: { title: '管理后台' }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/Users.vue'),
        meta: { title: '用户与权限' }
      },
      {
        path: 'characters',
        name: 'AdminCharacters',
        component: () => import('@/views/admin/Characters.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: 'news',
        name: 'AdminNews',
        component: () => import('@/views/admin/News.vue'),
        meta: { title: '新闻管理' }
      },
      {
        path: 'gameplay',
        name: 'AdminGameplay',
        component: () => import('@/views/admin/Gameplay.vue'),
        meta: { title: '玩法管理' }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/Products.vue'),
        meta: { title: '商品管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  if (userStore.token && !userStore.adminInfo) {
    try {
      await userStore.getAdminInfo()
    } catch {
      userStore.logout()
    }
  }

  if (to.path === '/') {
    if (!userStore.isLoggedIn) {
      next({ name: 'Login', replace: true })
      return
    }
    if (userStore.isAdmin) {
      next({ name: 'AdminDashboard', replace: true })
      return
    }
    next({ name: 'Home', replace: true })
    return
  }

  if (to.meta.title) {
    document.title = `${to.meta.title} - 游戏风格网站`
  }

  if (to.meta.requiresAdmin) {
    if (!userStore.isLoggedIn) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
    if (!userStore.isAdmin) {
      next({ name: 'Home', replace: true })
      return
    }
    next()
    return
  }

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  if (to.name === 'Login' && userStore.isLoggedIn) {
    if (userStore.isAdmin) {
      next({ name: 'AdminDashboard' })
    } else {
      next({ name: 'Home' })
    }
    return
  }

  if (to.name === 'Register' && userStore.isLoggedIn) {
    if (userStore.isAdmin) {
      next({ name: 'AdminDashboard' })
    } else {
      next({ name: 'Home' })
    }
    return
  }

  next()
})

export default router
