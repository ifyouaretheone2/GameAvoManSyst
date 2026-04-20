const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateProduct } = require('../middleware/validation');

// 获取商品列表（公开接口，前端展示用）
router.get('/', validateProduct.getList, productController.getProducts);

// 获取单个商品详情（公开接口）
router.get('/:id', validateProduct.getById, productController.getProductById);

// 以下接口需要管理员认证
router.post('/', authenticate, requireAdmin, productController.createProduct);
router.put('/:id', authenticate, requireAdmin, productController.updateProduct);
router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

module.exports = router;

