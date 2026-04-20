# 游戏风格网站

基于 Node.js + Express + MySQL 开发得网站。

## 项目结构

```
.
├── config/           # 配置文件
│   └── database.js   # 数据库连接配置
├── controllers/      # 控制器
│   ├── adminController.js
│   ├── characterController.js
│   ├── newsController.js
│   ├── gameplayController.js
│   └── productController.js
├── middleware/       # 中间件
│   └── auth.js      # JWT认证中间件
├── routes/          # 路由
│   ├── adminRoutes.js
│   ├── characterRoutes.js
│   ├── newsRoutes.js
│   ├── gameplayRoutes.js
│   └── productRoutes.js
├── utils/           # 工具函数
│   └── response.js  # 统一响应格式
├── .env            # 环境变量配置
├── server.js       # 服务器入口文件
└── package.json    # 项目依赖
```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

确保 `.env` 文件中的数据库配置正确：
- DB_HOST: 数据库主机（默认 localhost）
- DB_PORT: 数据库端口（默认 3306）
- DB_USER: 数据库用户名（默认 root）
- DB_PASSWORD: 数据库密码（默认 123456）
- DB_NAME: 数据库名称（默认 zzz_style_website）
- JWT_SECRET: JWT密钥（生产环境请修改）
- PORT: 服务器端口（默认 3000）

### 3. 启动服务器

```bash
# 开发模式（使用nodemon自动重启）
npm run dev

# 生产模式
npm start
```

服务器将在 `http://localhost:3000` 启动。

## API接口文档

### 基础信息

- 基础URL: `http://localhost:3000/api`
- 响应格式: JSON
- 统一响应结构:
  ```json
  {
    "code": 200,
    "message": "操作成功",
    "data": {}
  }
  ```

### 认证说明

需要认证的接口需要在请求头中添加：
```
Authorization: Bearer <token>
```

### 1. 管理员接口

#### 管理员登录
- **URL**: `/api/admin/login`
- **方法**: `POST`
- **认证**: 不需要
- **请求体**:
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
- **响应**:
  ```json
  {
    "code": 200,
    "message": "登录成功",
    "data": {
      "token": "jwt_token_here",
      "admin": {
        "id": 1,
        "username": "admin",
        "nickname": "管理员"
      }
    }
  }
  ```

#### 获取当前管理员信息
- **URL**: `/api/admin/me`
- **方法**: `GET`
- **认证**: 需要

### 2. 角色管理接口

#### 获取角色列表
- **URL**: `/api/characters`
- **方法**: `GET`
- **认证**: 不需要
- **查询参数**:
  - `page`: 页码（默认1）
  - `pageSize`: 每页数量（默认10）
  - `keyword`: 搜索关键词（可选）

#### 获取角色详情
- **URL**: `/api/characters/:id`
- **方法**: `GET`
- **认证**: 不需要

#### 创建角色
- **URL**: `/api/characters`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "name": "角色名称",
    "title": "角色头衔",
    "intro": "角色简介",
    "avatar_url": "头像URL",
    "cover_url": "封面URL",
    "attribute": "属性"
  }
  ```

#### 更新角色
- **URL**: `/api/characters/:id`
- **方法**: `PUT`
- **认证**: 需要

#### 删除角色
- **URL**: `/api/characters/:id`
- **方法**: `DELETE`
- **认证**: 需要

### 3. 新闻管理接口

#### 获取新闻列表
- **URL**: `/api/news`
- **方法**: `GET`
- **认证**: 不需要
- **查询参数**:
  - `page`: 页码
  - `pageSize`: 每页数量
  - `keyword`: 搜索关键词
  - `category`: 新闻分类

#### 获取新闻详情
- **URL**: `/api/news/:id`
- **方法**: `GET`
- **认证**: 不需要

#### 创建新闻
- **URL**: `/api/news`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "title": "新闻标题",
    "category": "新闻分类",
    "content": "新闻内容",
    "cover_url": "封面URL",
    "author": "发布人"
  }
  ```

#### 更新新闻
- **URL**: `/api/news/:id`
- **方法**: `PUT`
- **认证**: 需要

#### 删除新闻
- **URL**: `/api/news/:id`
- **方法**: `DELETE`
- **认证**: 需要

### 4. 玩法管理接口

#### 获取玩法列表
- **URL**: `/api/gameplay`
- **方法**: `GET`
- **认证**: 不需要
- **查询参数**:
  - `page`: 页码
  - `pageSize`: 每页数量
  - `keyword`: 搜索关键词
  - `type`: 玩法类型

#### 获取玩法详情
- **URL**: `/api/gameplay/:id`
- **方法**: `GET`
- **认证**: 不需要

#### 创建玩法
- **URL**: `/api/gameplay`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "title": "玩法标题",
    "type": "玩法类型",
    "content": "玩法说明",
    "cover_url": "示意图URL"
  }
  ```

#### 更新玩法
- **URL**: `/api/gameplay/:id`
- **方法**: `PUT`
- **认证**: 需要

#### 删除玩法
- **URL**: `/api/gameplay/:id`
- **方法**: `DELETE`
- **认证**: 需要

### 5. 商品管理接口

#### 获取商品列表
- **URL**: `/api/products`
- **方法**: `GET`
- **认证**: 不需要
- **查询参数**:
  - `page`: 页码
  - `pageSize`: 每页数量
  - `keyword`: 搜索关键词

#### 获取商品详情
- **URL**: `/api/products/:id`
- **方法**: `GET`
- **认证**: 不需要

#### 创建商品
- **URL**: `/api/products`
- **方法**: `POST`
- **认证**: 需要
- **请求体**:
  ```json
  {
    "name": "商品名称",
    "price": 99.99,
    "intro": "商品简介",
    "cover_url": "商品图片URL",
    "stock": 100
  }
  ```

#### 更新商品
- **URL**: `/api/products/:id`
- **方法**: `PUT`
- **认证**: 需要

#### 删除商品
- **URL**: `/api/products/:id`
- **方法**: `DELETE`
- **认证**: 需要

## 使用 Postman 测试 API

### 第一步：创建管理员账号

在运行服务器之前，需要先创建管理员账号：

```bash
node scripts/initAdmin.js admin 123456 管理员
```

默认管理员账号：
- 用户名: `admin`
- 密码: `123456`
- 昵称: `管理员`

### 第二步：启动服务器

```bash
npm run dev
```

服务器启动后，访问 `http://localhost:3000/api/health` 确认服务正常运行。

### 第三步：配置 Postman 环境

1. **创建环境**
   - 打开 Postman，点击右上角的 "Environments" 或 "环境"
   - 点击 "+" 创建新环境，命名为 "ZZZ API"
   - 添加以下环境变量：
     - `base_url`: `http://localhost:3000/api`
     - `token`: (留空，登录后自动填充)

2. **选择环境**
   - 在右上角环境下拉菜单中选择 "ZZZ API"

### 第四步：测试管理员接口

#### 1. 管理员登录

**请求配置：**
- **Method**: `POST`
- **URL**: `{{base_url}}/admin/login`
- **Headers**: 
  - `Content-Type: application/json`
- **Body** (选择 raw -> JSON):
  ```json
  {
    "username": "admin",
    "password": "123456"
  }
  ```

**测试脚本（Tests标签页）：**
```javascript
// 检查响应状态码
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

// 检查响应结构
pm.test("响应包含 token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('code', 200);
    pm.expect(jsonData.data).to.have.property('token');
    
    // 自动保存 token 到环境变量
    pm.environment.set("token", jsonData.data.token);
    console.log("Token 已保存:", jsonData.data.token);
});
```

**预期响应：**
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

#### 2. 获取当前管理员信息

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/admin/me`
- **Headers**: 
  - `Authorization: Bearer {{token}}`

**测试脚本：**
```javascript
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

pm.test("返回管理员信息", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('username');
    pm.expect(jsonData.data).to.have.property('nickname');
});
```

### 第五步：测试角色管理接口

#### 1. 创建角色

**请求配置：**
- **Method**: `POST`
- **URL**: `{{base_url}}/characters`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "name": "妮可·德玛拉",
    "title": "狡兔屋首领",
    "intro": "狡兔屋的创始人兼现任首领，性格豪爽，行动力强。",
    "avatar_url": "https://example.com/avatar/nico.jpg",
    "cover_url": "https://example.com/cover/nico.jpg",
    "attribute": "物理"
  }
  ```

**测试脚本：**
```javascript
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

pm.test("创建成功", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.code).to.eql(200);
    pm.expect(jsonData.data).to.have.property('id');
    
    // 保存角色ID供后续测试使用
    pm.environment.set("character_id", jsonData.data.id);
});
```

#### 2. 获取角色列表

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/characters?page=1&pageSize=10`
- **Headers**: 无需认证

**测试脚本：**
```javascript
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

pm.test("返回列表数据", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('list');
    pm.expect(jsonData.data).to.have.property('total');
});
```

#### 3. 获取角色详情

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/characters/{{character_id}}`
- **Headers**: 无需认证

**测试脚本：**
```javascript
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

pm.test("返回角色详情", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('name');
    pm.expect(jsonData.data).to.have.property('title');
});
```

#### 4. 更新角色

**请求配置：**
- **Method**: `PUT`
- **URL**: `{{base_url}}/characters/{{character_id}}`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "name": "妮可·德玛拉（更新）",
    "title": "狡兔屋首领（更新）"
  }
  ```

**测试脚本：**
```javascript
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

pm.test("更新成功", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.code).to.eql(200);
});
```

#### 5. 删除角色（软删除）

**请求配置：**
- **Method**: `DELETE`
- **URL**: `{{base_url}}/characters/{{character_id}}`
- **Headers**: 
  - `Authorization: Bearer {{token}}`

**测试脚本：**
```javascript
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

pm.test("删除成功", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.code).to.eql(200);
});
```

### 第六步：测试新闻管理接口

#### 1. 创建新闻

**请求配置：**
- **Method**: `POST`
- **URL**: `{{base_url}}/news`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "title": "版本更新公告 v1.0",
    "category": "公告",
    "content": "本次更新包含以下内容：\n1. 新增角色系统\n2. 优化战斗体验\n3. 修复已知bug",
    "cover_url": "https://example.com/news/update.jpg",
    "author": "管理员"
  }
  ```

**测试脚本：**
```javascript
pm.test("状态码为 200", function () {
    pm.response.to.have.status(200);
});

pm.test("创建成功", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('id');
    pm.environment.set("news_id", jsonData.data.id);
});
```

#### 2. 获取新闻列表

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/news?page=1&pageSize=10&category=公告`
- **Headers**: 无需认证

#### 3. 获取新闻详情

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/news/{{news_id}}`
- **Headers**: 无需认证

#### 4. 更新新闻

**请求配置：**
- **Method**: `PUT`
- **URL**: `{{base_url}}/news/{{news_id}}`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "title": "版本更新公告 v1.1（已更新）",
    "content": "更新后的内容..."
  }
  ```

#### 5. 删除新闻

**请求配置：**
- **Method**: `DELETE`
- **URL**: `{{base_url}}/news/{{news_id}}`
- **Headers**: 
  - `Authorization: Bearer {{token}}`

### 第七步：测试玩法管理接口

#### 1. 创建玩法

**请求配置：**
- **Method**: `POST`
- **URL**: `{{base_url}}/gameplay`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "title": "战斗系统详解",
    "type": "战斗",
    "content": "战斗系统采用回合制策略，玩家需要合理搭配角色技能...",
    "cover_url": "https://example.com/gameplay/battle.jpg"
  }
  ```

**测试脚本：**
```javascript
pm.test("创建成功", function () {
    var jsonData = pm.response.json();
    if (jsonData.code === 200) {
        pm.environment.set("gameplay_id", jsonData.data.id);
    }
});
```

#### 2. 获取玩法列表

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/gameplay?page=1&pageSize=10&type=战斗`
- **Headers**: 无需认证

#### 3. 获取玩法详情

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/gameplay/{{gameplay_id}}`
- **Headers**: 无需认证

#### 4. 更新玩法

**请求配置：**
- **Method**: `PUT`
- **URL**: `{{base_url}}/gameplay/{{gameplay_id}}`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "title": "战斗系统详解（已更新）",
    "content": "更新后的玩法说明..."
  }
  ```

#### 5. 删除玩法

**请求配置：**
- **Method**: `DELETE`
- **URL**: `{{base_url}}/gameplay/{{gameplay_id}}`
- **Headers**: 
  - `Authorization: Bearer {{token}}`

### 第八步：测试商品管理接口

#### 1. 创建商品

**请求配置：**
- **Method**: `POST`
- **URL**: `{{base_url}}/products`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "name": "妮可角色手办",
    "price": 299.99,
    "intro": "精美手办模型，高度还原角色形象",
    "cover_url": "https://example.com/products/nico-figure.jpg",
    "stock": 100
  }
  ```

**测试脚本：**
```javascript
pm.test("创建成功", function () {
    var jsonData = pm.response.json();
    if (jsonData.code === 200) {
        pm.environment.set("product_id", jsonData.data.id);
    }
});
```

#### 2. 获取商品列表

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/products?page=1&pageSize=10&keyword=手办`
- **Headers**: 无需认证

#### 3. 获取商品详情

**请求配置：**
- **Method**: `GET`
- **URL**: `{{base_url}}/products/{{product_id}}`
- **Headers**: 无需认证

#### 4. 更新商品

**请求配置：**
- **Method**: `PUT`
- **URL**: `{{base_url}}/products/{{product_id}}`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {{token}}`
- **Body** (raw -> JSON):
  ```json
  {
    "price": 249.99,
    "stock": 80
  }
  ```

#### 5. 删除商品

**请求配置：**
- **Method**: `DELETE`
- **URL**: `{{base_url}}/products/{{product_id}}`
- **Headers**: 
  - `Authorization: Bearer {{token}}`

### Postman 测试技巧

1. **使用 Collection（集合）**
   - 创建 Collection 组织所有请求
   - 在 Collection 级别设置通用 Headers（如 `Content-Type: application/json`）
   - 使用 Collection Runner 批量运行测试

2. **环境变量管理**
   - 登录后 token 会自动保存到环境变量
   - 创建的资源ID也会自动保存，方便后续测试

3. **Pre-request Script（预请求脚本）**
   - 可以在请求前自动设置变量
   - 例如：自动生成时间戳、随机数等

4. **测试脚本示例（通用）**
   ```javascript
   // 检查响应时间
   pm.test("响应时间小于 500ms", function () {
       pm.expect(pm.response.responseTime).to.be.below(500);
   });
   
   // 检查响应格式
   pm.test("响应格式正确", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData).to.have.property('code');
       pm.expect(jsonData).to.have.property('message');
       pm.expect(jsonData).to.have.property('data');
   });
   ```

5. **错误处理测试**
   - 测试未认证访问（不传 token）
   - 测试无效 token
   - 测试必填字段缺失
   - 测试不存在的资源ID

## 注意事项

1. **管理员账号**: 使用脚本创建管理员账号：`node scripts/initAdmin.js admin 123456 管理员`

2. **JWT密钥**: 生产环境请务必修改 `.env` 文件中的 `JWT_SECRET`。

3. **软删除**: 所有删除操作都是软删除（设置 `is_deleted = 1`），数据不会真正从数据库中删除。

4. **文件上传**: 当前版本中，图片URL需要前端上传后提供。如需后端处理文件上传，可以集成 multer 中间件。

5. **Token过期**: Token默认有效期为7天，过期后需要重新登录获取新token。

6. **环境变量**: 确保 Postman 环境变量已正确配置，特别是 `base_url` 和 `token`。

## 开发建议

1. 使用 Postman Collection 组织和管理所有API请求
2. 建议添加输入验证（如使用 express-validator）
3. 生产环境建议添加日志记录（如 winston）
4. 建议添加API限流和错误监控
5. 定期备份数据库

