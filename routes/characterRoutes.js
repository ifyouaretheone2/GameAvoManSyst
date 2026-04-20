const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { validateCharacter } = require('../middleware/validation');

// 获取角色列表（公开接口，前端展示用）
router.get('/', validateCharacter.getList, characterController.getCharacters);

// 获取单个角色详情（公开接口）
router.get('/:id', validateCharacter.getById, characterController.getCharacterById);

// 以下接口需要管理员认证
router.post('/', authenticate, requireAdmin, characterController.createCharacter);
router.put('/:id', authenticate, requireAdmin, characterController.updateCharacter);
router.delete('/:id', authenticate, requireAdmin, characterController.deleteCharacter);

module.exports = router;

