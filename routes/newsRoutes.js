const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateNews } = require('../middleware/validation');

// 获取新闻列表（公开接口，前端展示用）
router.get('/', validateNews.getList, newsController.getNews);

// 获取单个新闻详情（公开接口）
router.get('/:id', validateNews.getById, newsController.getNewsById);

// 以下接口需要管理员认证
router.post('/', authenticate, requireAdmin, newsController.createNews);
router.put('/:id', authenticate, requireAdmin, newsController.updateNews);
router.delete('/:id', authenticate, requireAdmin, newsController.deleteNews);

module.exports = router;

