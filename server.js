const express = require('express');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const logger = require('./utils/logger');
require('dotenv').config();

// 导入路由
const adminRoutes = require('./routes/adminRoutes');
const characterRoutes = require('./routes/characterRoutes');
const newsRoutes = require('./routes/newsRoutes');
const gameplayRoutes = require('./routes/gameplayRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 请求频率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: {
    code: 429,
    message: '请求过于频繁，请稍后再试',
    data: null
  }
});

// 中间件
app.use(helmet()); // 安全头设置
app.use(limiter); // 应用频率限制
app.use(compression()); // 启用gzip压缩
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' })); // 解析JSON请求体，限制大小
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // 解析URL编码请求体

// 请求日志记录
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  next();
});

// 路由配置
app.use('/api/admin', adminRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gameplay', gameplayRoutes);
app.use('/api/products', productRoutes);

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    code: 200,
    message: '服务运行正常',
    data: {
      timestamp: new Date().toISOString()
    }
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    data: null
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error('服务器错误:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    data: null
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`API文档:`);
  console.log(`  管理员登录: POST http://localhost:${PORT}/api/admin/login`);
  console.log(`  用户注册: POST http://localhost:${PORT}/api/admin/register`);
  console.log(`  角色管理: GET/POST/PUT/DELETE http://localhost:${PORT}/api/characters`);
  console.log(`  新闻管理: GET/POST/PUT/DELETE http://localhost:${PORT}/api/news`);
  console.log(`  玩法管理: GET/POST/PUT/DELETE http://localhost:${PORT}/api/gameplay`);
  console.log(`  商品管理: GET/POST/PUT/DELETE http://localhost:${PORT}/api/products`);
});
