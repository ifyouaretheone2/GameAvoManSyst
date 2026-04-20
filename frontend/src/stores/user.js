import { defineStore } from 'pinia'
import { adminApi } from '@/api'

function readStoredAdminInfo() {
  try {
    const raw = localStorage.getItem('adminInfo')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    adminInfo: readStoredAdminInfo()
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    nickname: (state) => state.adminInfo?.nickname || '',
    role: (state) => state.adminInfo?.role || '',
    isAdmin: (state) => state.adminInfo?.role === 'admin'
  },

  actions: {
    persistSession() {
      if (this.token) {
        localStorage.setItem('token', this.token)
      } else {
        localStorage.removeItem('token')
      }
      if (this.adminInfo) {
        localStorage.setItem('adminInfo', JSON.stringify(this.adminInfo))
      } else {
        localStorage.removeItem('adminInfo')
      }
    },

    async login(username, password) {
      const res = await adminApi.login({ username, password })
      this.token = res.data.token
      this.adminInfo = res.data.admin
      this.persistSession()
      return res
    },

    async register(payload) {
      await adminApi.register(payload)
    },

    async getAdminInfo() {
      const res = await adminApi.getCurrentAdmin()
      this.adminInfo = res.data
      this.persistSession()
      return res
    },

    logout() {
      this.token = ''
      this.adminInfo = null
      localStorage.removeItem('token')
      localStorage.removeItem('adminInfo')
    }
  }
})
