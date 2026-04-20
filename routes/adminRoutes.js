const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.post('/login', adminController.login);
router.post('/register', adminController.register);

router.get('/me', authenticate, adminController.getCurrentAdmin);

router.get('/users', authenticate, requireAdmin, adminController.listAccounts);
router.post('/users/:id/promote', authenticate, requireAdmin, adminController.promoteUser);

module.exports = router;
