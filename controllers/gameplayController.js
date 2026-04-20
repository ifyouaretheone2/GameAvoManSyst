const pool = require('../config/database');
const { success, error } = require('../utils/response');
const logger = require('../utils/logger');

// 获取玩法列表（支持分页和搜索）
const getGameplays = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword = '', type = '' } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSizeNum = Math.max(1, Math.min(100, parseInt(pageSize) || 10));
    const offset = (pageNum - 1) * pageSizeNum;

    let query = 'SELECT * FROM gameplay WHERE is_deleted = 0';
    let params = [];

    if (keyword) {
      query += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ` ORDER BY create_time DESC LIMIT ${pageSizeNum} OFFSET ${offset}`;

    const [gameplays] = await pool.execute(query, params);

    // 获取总数
    let countQuery = 'SELECT COUNT(*) as total FROM gameplay WHERE is_deleted = 0';
    let countParams = [];
    if (keyword) {
      countQuery += ' AND (title LIKE ? OR content LIKE ?)';
      countParams.push(`%${keyword}%`, `%${keyword}%`);
    }
    if (type) {
      countQuery += ' AND type = ?';
      countParams.push(type);
    }
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    success(res, {
      list: gameplays,
      total,
      page: pageNum,
      pageSize: pageSizeNum
    }, '获取成功');
  } catch (err) {
    logger.error('获取玩法列表错误:', {
      error: err.message,
      stack: err.stack,
      query: req.query
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 获取单个玩法详情
const getGameplayById = async (req, res) => {
  try {
    const { id } = req.params;

    const [gameplays] = await pool.execute(
      'SELECT * FROM gameplay WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (gameplays.length === 0) {
      return error(res, '玩法不存在', 404);
    }

    success(res, gameplays[0], '获取成功');
  } catch (err) {
    logger.error('获取玩法详情错误:', {
      error: err.message,
      stack: err.stack,
      id: req.params.id
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 创建玩法
const createGameplay = async (req, res) => {
  try {
    const { title, type, content, cover_url } = req.body;

    if (!title || !type || !content) {
      return error(res, '标题、类型和内容为必填项', 400);
    }

    const [result] = await pool.execute(
      'INSERT INTO gameplay (title, type, content, cover_url) VALUES (?, ?, ?, ?)',
      [title, type, content, cover_url || null]
    );

    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    console.error('创建玩法错误:', err);
    error(res, '创建失败，服务器错误', 500);
  }
};

// 更新玩法
const updateGameplay = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, content, cover_url } = req.body;

    // 检查玩法是否存在
    const [gameplays] = await pool.execute(
      'SELECT id FROM gameplay WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (gameplays.length === 0) {
      return error(res, '玩法不存在', 404);
    }

    // 构建更新字段
    const updateFields = [];
    const updateValues = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (type !== undefined) {
      updateFields.push('type = ?');
      updateValues.push(type);
    }
    if (content !== undefined) {
      updateFields.push('content = ?');
      updateValues.push(content);
    }
    if (cover_url !== undefined) {
      updateFields.push('cover_url = ?');
      updateValues.push(cover_url);
    }

    if (updateFields.length === 0) {
      return error(res, '没有要更新的字段', 400);
    }

    updateValues.push(id);
    await pool.execute(
      `UPDATE gameplay SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    success(res, null, '更新成功');
  } catch (err) {
    console.error('更新玩法错误:', err);
    error(res, '更新失败，服务器错误', 500);
  }
};

// 删除玩法（软删除）
const deleteGameplay = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE gameplay SET is_deleted = 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return error(res, '玩法不存在', 404);
    }

    success(res, null, '删除成功');
  } catch (err) {
    console.error('删除玩法错误:', err);
    error(res, '删除失败，服务器错误', 500);
  }
};

module.exports = {
  getGameplays,
  getGameplayById,
  createGameplay,
  updateGameplay,
  deleteGameplay
};

