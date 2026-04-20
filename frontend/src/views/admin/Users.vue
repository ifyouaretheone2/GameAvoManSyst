<template>
  <div class="users-page">
    <header class="page-head">
      <h1>用户与权限</h1>
      <p class="hint">将普通用户提升为管理员后，对方需重新登录以获得后台权限。</p>
    </header>

    <div v-if="pageError" class="banner error">{{ pageError }}</div>

    <div v-if="loading" class="loading">加载中…</div>

    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>昵称</th>
          <th>角色</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.username }}</td>
          <td>{{ u.nickname }}</td>
          <td>
            <span :class="['badge', u.role === 'admin' ? 'admin' : 'user']">
              {{ u.role === 'admin' ? '管理员' : '普通用户' }}
            </span>
          </td>
          <td>
            <button
              v-if="u.role !== 'admin'"
              type="button"
              class="btn-promote"
              :disabled="promotingId === u.id"
              @click="promote(u)"
            >
              {{ promotingId === u.id ? '处理中…' : '提升为管理员' }}
            </button>
            <span v-else class="muted">—</span>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && users.length === 0" class="muted">暂无用户数据</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminApi } from '@/api'

const users = ref([])
const loading = ref(true)
const pageError = ref('')
const promotingId = ref(null)

async function load() {
  pageError.value = ''
  loading.value = true
  try {
    const res = await adminApi.listUsers()
    users.value = res.data || []
  } catch (e) {
    pageError.value = e.message || '加载用户列表失败'
  } finally {
    loading.value = false
  }
}

async function promote(u) {
  pageError.value = ''
  promotingId.value = u.id
  try {
    await adminApi.promoteUser(u.id)
    await load()
  } catch (e) {
    pageError.value = e.message || '提升失败'
  } finally {
    promotingId.value = null
  }
}

onMounted(load)
</script>

<style scoped>
.users-page {
  max-width: 960px;
}

.page-head {
  margin-bottom: 1.5rem;
}

.page-head h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.hint {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.9rem;
}

.banner {
  padding: 0.85rem 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.banner.error {
  background: rgba(255, 107, 107, 0.12);
  border: 1px solid rgba(255, 107, 107, 0.35);
  color: #ff8a8a;
}

.loading {
  color: rgba(255, 255, 255, 0.6);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  overflow: hidden;
}

.data-table th,
.data-table td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
}

.data-table th {
  background: rgba(0, 0, 0, 0.35);
  font-weight: 600;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-size: 0.8rem;
}

.badge.admin {
  background: rgba(102, 126, 234, 0.25);
  color: #a8b5ff;
}

.badge.user {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.75);
}

.btn-promote {
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.5);
  background: rgba(102, 126, 234, 0.15);
  color: #c5ceff;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-promote:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.28);
}

.btn-promote:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.muted {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.9rem;
}
</style>
