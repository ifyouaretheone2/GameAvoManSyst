const express = require('express');
const router = express.Router();
const gameplayController = require('../controllers/gameplayController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateGameplay } = require('../middleware/validation');

// 获取玩法列表（公开接口，前端展示用）
router.get('/', validateGameplay.getList, gameplayController.getGameplays);

// 获取单个玩法详情（公开接口）
router.get('/:id', validateGameplay.getById, gameplayController.getGameplayById);

// 以下接口需要管理员认证
router.post('/', authenticate, requireAdmin, gameplayController.createGameplay);
router.put('/:id', authenticate, requireAdmin, gameplayController.updateGameplay);
router.delete('/:id', authenticate, requireAdmin, gameplayController.deleteGameplay);

module.exports = router;

