# 快速启动指南

## 第一步：安装依赖

```bash
npm install
```

## 第二步：配置环境变量

在项目根目录创建 `.env` 文件，内容如下：

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=zzz_style_website

JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d

PORT=3000
```

## 第三步：账号表角色字段迁移（已有库必做）

若 `admin` 表尚无 `role` 列，请先执行（幂等，可重复执行）：

```bash
npm run migrate:admin-role
```

会为表增加 `role`（`admin` / `user`），并把**已有账号**全部标为 `admin`。之后新用户可通过接口自助注册，默认为 `user`。

## 第四步：创建管理员账号

在数据库中创建管理员账号（密码会自动加密）：

```bash
node scripts/initAdmin.js admin 123456 管理员
```

> 若 `initAdmin` 报错提示缺少 `role` 列，请先完成上一步迁移。

或者手动在数据库中插入（需要先加密密码）：

```sql
INSERT INTO admin (username, password, nickname, role)
VALUES ('admin', '$2a$10$加密后的密码', '管理员', 'admin');
```

**前端路由说明（破坏性变更）**：公开首页路径为 **`/home`**；**`/`** 会根据登录状态重定向到登录页或后台。收藏夹中原先指向 `/` 的首页请改为 `/home`。

可选环境变量（见根目录 `.env.example`）：将 **`ALLOW_REGISTRATION=false`** 可关闭 `POST /api/admin/register` 自助注册。

## 插入示例数据（开发库，可选）

在 **已建库建表**、已配置 `.env` 且（如需）已执行 `node scripts/initAdmin.js ...` 之后，可写入一批固定主键的示例数据，便于前端列表/详情联调：

```bash
npm run seed
```

脚本会在主键区间 `100001`–`100099` 内先删除再插入本仓库约定的示例行，重复执行不会产生重复数据。

**安全说明**：当 `NODE_ENV=production` 时脚本**默认拒绝执行**，以免误写生产库。若确有特殊需求（强烈不推荐），需同时设置环境变量 `ALLOW_DANGEROUS_SEED=true` 才会放行。

推荐顺序：**环境变量 → 数据库结构 → `migrate:admin-role` → 管理员初始化 → 示例数据 → 启动服务**。

## 第五步：启动服务器

```bash
# 开发模式（推荐，支持热重载）
npm run dev

# 或生产模式
npm start
```

服务器将在 `http://localhost:3000` 启动。

## 第六步：测试API

### 1. 测试健康检查

```bash
curl http://localhost:3000/api/health
```

### 2. 管理员登录

```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

保存返回的 `token`，后续需要认证的接口都要使用它。

### 3. 用户注册（不需要认证）

```bash
curl -X POST http://localhost:3000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"demo_user","password":"123456","nickname":"演示"}'
```

### 4. 创建角色（需要认证，且须管理员 token）

```bash
curl -X POST http://localhost:3000/api/characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "测试角色",
    "title": "测试组织",
    "intro": "这是一个测试角色",
    "avatar_url": "https://example.com/avatar.jpg",
    "cover_url": "https://example.com/cover.jpg",
    "attribute": "物理"
  }'
```

### 5. 获取角色列表（不需要认证）

```bash
curl http://localhost:3000/api/characters
```

## 常见问题

### 1. 数据库连接失败

- 检查 MySQL 服务是否运行
- 检查 `.env` 文件中的数据库配置是否正确
- 检查数据库 `zzz_style_website` 是否已创建

### 2. 端口被占用

修改 `.env` 文件中的 `PORT` 值，或关闭占用 3000 端口的程序。

### 3. 管理员登录失败

- 确保已运行 `node scripts/initAdmin.js` 创建管理员
- 检查用户名和密码是否正确
- 检查数据库中管理员记录的 `is_deleted` 是否为 0

### 4. 认证失败

- 检查请求头中是否包含 `Authorization: Bearer <token>`
- 检查 token 是否过期（默认7天）
- 重新登录获取新的 token

## 下一步

- 查看 `README.md` 了解完整的 API 文档
- 查看 `API_TEST.md` 了解详细的测试方法
- 开始开发前端界面

