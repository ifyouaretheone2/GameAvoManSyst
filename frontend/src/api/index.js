import request from '@/utils/request'

// 管理员API
export const adminApi = {
  login(data) {
    return request({
      url: '/admin/login',
      method: 'post',
      data
    })
  },
  register(data) {
    return request({
      url: '/admin/register',
      method: 'post',
      data
    })
  },
  getCurrentAdmin() {
    return request({
      url: '/admin/me',
      method: 'get'
    })
  },
  listUsers() {
    return request({
      url: '/admin/users',
      method: 'get'
    })
  },
  promoteUser(id) {
    return request({
      url: `/admin/users/${id}/promote`,
      method: 'post'
    })
  }
}

// 角色API
export const characterApi = {
  // 获取角色列表
  getList(params) {
    return request({
      url: '/characters',
      method: 'get',
      params
    })
  },
  // 获取角色详情
  getById(id) {
    return request({
      url: `/characters/${id}`,
      method: 'get'
    })
  },
  // 创建角色
  create(data) {
    return request({
      url: '/characters',
      method: 'post',
      data
    })
  },
  // 更新角色
  update(id, data) {
    return request({
      url: `/characters/${id}`,
      method: 'put',
      data
    })
  },
  // 删除角色
  delete(id) {
    return request({
      url: `/characters/${id}`,
      method: 'delete'
    })
  }
}

// 新闻API
export const newsApi = {
  // 获取新闻列表
  getList(params) {
    return request({
      url: '/news',
      method: 'get',
      params
    })
  },
  // 获取新闻详情
  getById(id) {
    return request({
      url: `/news/${id}`,
      method: 'get'
    })
  },
  // 创建新闻
  create(data) {
    return request({
      url: '/news',
      method: 'post',
      data
    })
  },
  // 更新新闻
  update(id, data) {
    return request({
      url: `/news/${id}`,
      method: 'put',
      data
    })
  },
  // 删除新闻
  delete(id) {
    return request({
      url: `/news/${id}`,
      method: 'delete'
    })
  }
}

// 玩法API
export const gameplayApi = {
  // 获取玩法列表
  getList(params) {
    return request({
      url: '/gameplay',
      method: 'get',
      params
    })
  },
  // 获取玩法详情
  getById(id) {
    return request({
      url: `/gameplay/${id}`,
      method: 'get'
    })
  },
  // 创建玩法
  create(data) {
    return request({
      url: '/gameplay',
      method: 'post',
      data
    })
  },
  // 更新玩法
  update(id, data) {
    return request({
      url: `/gameplay/${id}`,
      method: 'put',
      data
    })
  },
  // 删除玩法
  delete(id) {
    return request({
      url: `/gameplay/${id}`,
      method: 'delete'
    })
  }
}

// 商品API
export const productApi = {
  // 获取商品列表
  getList(params) {
    return request({
      url: '/products',
      method: 'get',
      params
    })
  },
  // 获取商品详情
  getById(id) {
    return request({
      url: `/products/${id}`,
      method: 'get'
    })
  },
  // 创建商品
  create(data) {
    return request({
      url: '/products',
      method: 'post',
      data
    })
  },
  // 更新商品
  update(id, data) {
    return request({
      url: `/products/${id}`,
      method: 'put',
      data
    })
  },
  // 删除商品
  delete(id) {
    return request({
      url: `/products/${id}`,
      method: 'delete'
    })
  }
}

