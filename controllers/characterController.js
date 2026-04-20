const pool = require('../config/database');
const { success, error } = require('../utils/response');
const logger = require('../utils/logger');

// 获取角色列表（支持分页和搜索）
const getCharacters = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword = '' } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSizeNum = Math.max(1, Math.min(100, parseInt(pageSize) || 10));
    const offset = (pageNum - 1) * pageSizeNum;

    let query = 'SELECT * FROM `character` WHERE is_deleted = 0';
    let params = [];

    if (keyword) {
      query += ' AND (name LIKE ? OR title LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    // mysql2 prepared LIMIT/OFFSET 与部分 MySQL 组合会报 Incorrect arguments；此处分页已数值化，直接拼接
    query += ` ORDER BY create_time DESC LIMIT ${pageSizeNum} OFFSET ${offset}`;

    const [characters] = await pool.execute(query, params);

    // 获取总数
    let countQuery = 'SELECT COUNT(*) as total FROM `character` WHERE is_deleted = 0';
    let countParams = [];
    if (keyword) {
      countQuery += ' AND (name LIKE ? OR title LIKE ?)';
      countParams.push(`%${keyword}%`, `%${keyword}%`);
    }
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    success(res, {
      list: characters,
      total,
      page: pageNum,
      pageSize: pageSizeNum
    }, '获取成功');
  } catch (err) {
    logger.error('获取角色列表错误:', {
      error: err.message,
      stack: err.stack,
      query: req.query
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 获取单个角色详情
const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;

    const [characters] = await pool.execute(
      'SELECT * FROM `character` WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (characters.length === 0) {
      return error(res, '角色不存在', 404);
    }

    success(res, characters[0], '获取成功');
  } catch (err) {
    logger.error('获取角色详情错误:', {
      error: err.message,
      stack: err.stack,
      id: req.params.id
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 创建角色
const createCharacter = async (req, res) => {
  try {
    const { name, title, intro, avatar_url, cover_url, attribute } = req.body;

    if (!name || !title || !avatar_url) {
      return error(res, '角色名称、头衔和头像为必填项', 400);
    }

    const [result] = await pool.execute(
      'INSERT INTO `character` (name, title, intro, avatar_url, cover_url, attribute) VALUES (?, ?, ?, ?, ?, ?)',
      [name, title, intro || null, avatar_url, cover_url || null, attribute || null]
    );

    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    console.error('创建角色错误:', err);
    error(res, '创建失败，服务器错误', 500);
  }
};

// 更新角色
const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, intro, avatar_url, cover_url, attribute } = req.body;

    // 检查角色是否存在
    const [characters] = await pool.execute(
      'SELECT id FROM `character` WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (characters.length === 0) {
      return error(res, '角色不存在', 404);
    }

    // 构建更新字段
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (intro !== undefined) {
      updateFields.push('intro = ?');
      updateValues.push(intro);
    }
    if (avatar_url !== undefined) {
      updateFields.push('avatar_url = ?');
      updateValues.push(avatar_url);
    }
    if (cover_url !== undefined) {
      updateFields.push('cover_url = ?');
      updateValues.push(cover_url);
    }
    if (attribute !== undefined) {
      updateFields.push('attribute = ?');
      updateValues.push(attribute);
    }

    if (updateFields.length === 0) {
      return error(res, '没有要更新的字段', 400);
    }

    updateValues.push(id);
    await pool.execute(
      `UPDATE \`character\` SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    success(res, null, '更新成功');
  } catch (err) {
    console.error('更新角色错误:', err);
    error(res, '更新失败，服务器错误', 500);
  }
};

// 删除角色（软删除）
const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE `character` SET is_deleted = 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return error(res, '角色不存在', 404);
    }

    success(res, null, '删除成功');
  } catch (err) {
    console.error('删除角色错误:', err);
    error(res, '删除失败，服务器错误', 500);
  }
};

module.exports = {
  getCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter
};
