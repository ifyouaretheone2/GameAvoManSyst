# API 测试文档

本文档提供了使用 Postman 或 curl 测试 API 的示例。

## 前置准备

1. 确保数据库已创建并运行
2. 确保已安装依赖: `npm install`
3. 创建 `.env` 文件（参考 README.md）
4. 启动服务器: `npm start` 或 `npm run dev`
5. 创建管理员账号: `node scripts/initAdmin.js admin 123456 管理员`

## 测试步骤

### 1. 管理员登录

```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "123456"
  }'
```

**响应示例:**
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "username": "admin",
      "nickname": "管理员"
    }
  }
}
```

**保存返回的 token，后续请求需要用到！**

### 2. 创建角色

```bash
curl -X POST http://localhost:3000/api/characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "妮可",
    "title": "狡兔屋",
    "intro": "角色简介内容",
    "avatar_url": "https://example.com/avatar.jpg",
    "cover_url": "https://example.com/cover.jpg",
    "attribute": "物理"
  }'
```

### 3. 获取角色列表

```bash
curl -X GET "http://localhost:3000/api/characters?page=1&pageSize=10"
```

### 4. 获取角色详情

```bash
curl -X GET http://localhost:3000/api/characters/1
```

### 5. 更新角色

```bash
curl -X PUT http://localhost:3000/api/characters/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "妮可·德玛拉",
    "title": "狡兔屋首领"
  }'
```

### 6. 删除角色

```bash
curl -X DELETE http://localhost:3000/api/characters/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 7. 创建新闻

```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "版本更新公告",
    "category": "公告",
    "content": "新闻正文内容...",
    "cover_url": "https://example.com/news-cover.jpg",
    "author": "管理员"
  }'
```

### 8. 创建玩法

```bash
curl -X POST http://localhost:3000/api/gameplay \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "战斗系统",
    "type": "战斗",
    "content": "玩法详细说明...",
    "cover_url": "https://example.com/gameplay.jpg"
  }'
```

### 9. 创建商品

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "角色手办",
    "price": 299.99,
    "intro": "精美手办模型",
    "cover_url": "https://example.com/product.jpg",
    "stock": 100
  }'
```

## Postman 测试集合

### 环境变量设置

在 Postman 中创建环境变量:
- `base_url`: `http://localhost:3000/api`
- `token`: (登录后自动设置)

### 请求示例

1. **登录请求**
   - Method: POST
   - URL: `{{base_url}}/admin/login`
   - Body (raw JSON):
     ```json
     {
       "username": "admin",
       "password": "123456"
     }
     ```
   - Tests (自动保存token):
     ```javascript
     if (pm.response.code === 200) {
       const jsonData = pm.response.json();
       pm.environment.set("token", jsonData.data.token);
     }
     ```

2. **需要认证的请求**
   - 在 Headers 中添加:
     - Key: `Authorization`
     - Value: `Bearer {{token}}`

## 注意事项

1. 所有需要认证的接口都需要在请求头中添加 `Authorization: Bearer <token>`
2. token 有效期为 7 天（可在 .env 中配置）
3. 删除操作是软删除，数据不会真正从数据库删除
4. 所有列表接口都支持分页和搜索

