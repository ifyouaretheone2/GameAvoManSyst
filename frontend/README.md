# 游戏风格网站 - 前端项目

基于 Vue 3 + Vite 开发的前端应用。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理库
- **Axios** - HTTP 客户端

## 项目结构

```
frontend/
├── src/
│   ├── api/           # API接口定义
│   ├── assets/       # 静态资源
│   ├── components/   # 公共组件
│   ├── router/       # 路由配置
│   ├── stores/       # Pinia状态管理
│   ├── utils/        # 工具函数
│   ├── views/        # 页面组件
│   │   ├── admin/    # 管理后台页面
│   │   └── ...       # 前端展示页面
│   ├── App.vue       # 根组件
│   └── main.js       # 入口文件
├── public/           # 公共静态文件
└── vite.config.js    # Vite配置
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:5173` 启动。

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产构建

```bash
npm run preview
```

## 功能模块

### 前端展示页面

- **首页** (`/`) - 网站首页
- **角色** (`/characters`) - 角色列表和详情
- **新闻** (`/news`) - 新闻公告列表和详情
- **玩法** (`/gameplay`) - 玩法资料
- **商品** (`/products`) - 商品周边

### 管理后台

- **登录** (`/login`) - 管理员登录
- **仪表盘** (`/admin/dashboard`) - 数据统计
- **角色管理** (`/admin/characters`) - 角色的增删改查
- **新闻管理** (`/admin/news`) - 新闻的增删改查
- **玩法管理** (`/admin/gameplay`) - 玩法的增删改查
- **商品管理** (`/admin/products`) - 商品的增删改查

## API 配置

前端通过代理访问后端API，配置在 `vite.config.js` 中：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}
```

## 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

## 开发说明

1. 确保后端服务已启动（`http://localhost:3000`）
2. 前端开发服务器会自动代理 `/api` 请求到后端
3. 使用 Pinia 管理用户登录状态
4. 路由守卫会自动检查登录状态，未登录用户访问管理后台会跳转到登录页

## 默认管理员账号

- 用户名: `admin`
- 密码: `123456`
