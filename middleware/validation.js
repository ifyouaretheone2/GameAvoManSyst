const { body, param, query, validationResult } = require('express-validator');
const logger = require('../utils/logger');

// 处理验证错误的中间件
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    logger.warn('输入验证失败:', { errors: errorMessages, url: req.url, method: req.method });
    return res.status(400).json({
      code: 400,
      message: '输入验证失败',
      data: errorMessages
    });
  }
  next();
};

// 角色验证规则
const validateCharacter = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('角色名称长度必须在1-100字符之间'),
    body('title')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('角色头衔长度必须在1-200字符之间'),
    body('intro')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('角色简介不能超过2000字符'),
    body('avatar_url')
      .isURL()
      .withMessage('头像URL格式不正确'),
    body('cover_url')
      .optional()
      .isURL()
      .withMessage('封面URL格式不正确'),
    body('attribute')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('属性不能超过100字符'),
    handleValidationErrors
  ],
  update: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('角色ID必须是正整数'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('角色名称长度必须在1-100字符之间'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('角色头衔长度必须在1-200字符之间'),
    body('intro')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('角色简介不能超过2000字符'),
    body('avatar_url')
      .optional()
      .isURL()
      .withMessage('头像URL格式不正确'),
    body('cover_url')
      .optional()
      .isURL()
      .withMessage('封面URL格式不正确'),
    body('attribute')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('属性不能超过100字符'),
    handleValidationErrors
  ],
  getById: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('角色ID必须是正整数'),
    handleValidationErrors
  ],
  getList: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('页码必须是正整数'),
    query('pageSize')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('每页数量必须在1-100之间'),
    query('keyword')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('搜索关键词不能超过100字符'),
    handleValidationErrors
  ],
  delete: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('角色ID必须是正整数'),
    handleValidationErrors
  ]
};

// 管理员验证规则
const validateAdmin = {
  login: [
    body('username')
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('用户名长度必须在1-50字符之间'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('密码长度至少6位'),
    handleValidationErrors
  ]
};

// 新闻验证规则
const validateNews = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('新闻标题长度必须在1-200字符之间'),
    body('content')
      .trim()
      .isLength({ min: 1 })
      .withMessage('新闻内容不能为空'),
    body('summary')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('新闻摘要不能超过500字符'),
    body('cover_url')
      .optional()
      .isURL()
      .withMessage('封面URL格式不正确'),
    handleValidationErrors
  ],
  getList: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('页码必须是正整数'),
    query('pageSize')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('每页数量必须在1-100之间'),
    query('keyword')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('搜索关键词不能超过200字符'),
    query('category')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('分类不能超过100字符'),
    handleValidationErrors
  ],
  getById: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('新闻ID必须是正整数'),
    handleValidationErrors
  ],
  update: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('新闻ID必须是正整数'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('新闻标题长度必须在1-200字符之间'),
    body('content')
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage('新闻内容不能为空'),
    body('summary')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('新闻摘要不能超过500字符'),
    body('cover_url')
      .optional()
      .isURL()
      .withMessage('封面URL格式不正确'),
    handleValidationErrors
  ]
};

// 玩法验证（公开列表 / 详情）
const validateGameplay = {
  getList: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('页码必须是正整数'),
    query('pageSize')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('每页数量必须在1-100之间'),
    query('keyword')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('搜索关键词不能超过200字符'),
    query('type')
      .optional()
      .trim()
      .isLength({ max: 100 })
      .withMessage('类型不能超过100字符'),
    handleValidationErrors
  ],
  getById: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('玩法ID必须是正整数'),
    handleValidationErrors
  ]
};

// 商品验证（公开列表 / 详情）
const validateProduct = {
  getList: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('页码必须是正整数'),
    query('pageSize')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('每页数量必须在1-100之间'),
    query('keyword')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('搜索关键词不能超过200字符'),
    handleValidationErrors
  ],
  getById: [
    param('id')
      .isInt({ min: 1 })
      .withMessage('商品ID必须是正整数'),
    handleValidationErrors
  ]
};

module.exports = {
  validateCharacter,
  validateAdmin,
  validateNews,
  validateGameplay,
  validateProduct,
  handleValidationErrors
};
