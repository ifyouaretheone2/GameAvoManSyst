import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    // 如果返回的状态码为200，说明接口请求成功
    if (res.code === 200) {
      return res
    } else {
      // 其他状态码，抛出错误
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    if (error.response) {
      const data = error.response.data
      const msg = data?.message || error.message || '请求失败'
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token')
          localStorage.removeItem('adminInfo')
          window.location.href = '/login'
          break
        case 403:
          console.error('没有权限访问')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error('请求失败')
      }
      return Promise.reject(new Error(msg))
    }
    return Promise.reject(error)
  }
)

export default request

