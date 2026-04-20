const pool = require('../config/database');
const { success, error } = require('../utils/response');
const logger = require('../utils/logger');

// 获取新闻列表（支持分页和搜索）
const getNews = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword = '', category = '' } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSizeNum = Math.max(1, Math.min(100, parseInt(pageSize) || 10));
    const offset = (pageNum - 1) * pageSizeNum;

    let query = 'SELECT * FROM news WHERE is_deleted = 0';
    let params = [];

    if (keyword) {
      query += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ` ORDER BY publish_time DESC LIMIT ${pageSizeNum} OFFSET ${offset}`;

    const [news] = await pool.execute(query, params);

    // 获取总数
    let countQuery = 'SELECT COUNT(*) as total FROM news WHERE is_deleted = 0';
    let countParams = [];
    if (keyword) {
      countQuery += ' AND (title LIKE ? OR content LIKE ?)';
      countParams.push(`%${keyword}%`, `%${keyword}%`);
    }
    if (category) {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    success(res, {
      list: news,
      total,
      page: pageNum,
      pageSize: pageSizeNum
    }, '获取成功');
  } catch (err) {
    logger.error('获取新闻列表错误:', {
      error: err.message,
      stack: err.stack,
      query: req.query
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 获取单个新闻详情
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const [news] = await pool.execute(
      'SELECT * FROM news WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (news.length === 0) {
      return error(res, '新闻不存在', 404);
    }

    success(res, news[0], '获取成功');
  } catch (err) {
    logger.error('获取新闻详情错误:', {
      error: err.message,
      stack: err.stack,
      id: req.params.id
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 创建新闻
const createNews = async (req, res) => {
  try {
    const { title, category, content, cover_url, author } = req.body;

    if (!title || !category || !content || !author) {
      return error(res, '标题、分类、内容和发布人为必填项', 400);
    }

    const [result] = await pool.execute(
      'INSERT INTO news (title, category, content, cover_url, author) VALUES (?, ?, ?, ?, ?)',
      [title, category, content, cover_url || null, author]
    );

    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    console.error('创建新闻错误:', err);
    error(res, '创建失败，服务器错误', 500);
  }
};

// 更新新闻
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content, cover_url, author } = req.body;

    // 检查新闻是否存在
    const [news] = await pool.execute(
      'SELECT id FROM news WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (news.length === 0) {
      return error(res, '新闻不存在', 404);
    }

    // 构建更新字段
    const updateFields = [];
    const updateValues = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (category !== undefined) {
      updateFields.push('category = ?');
      updateValues.push(category);
    }
    if (content !== undefined) {
      updateFields.push('content = ?');
      updateValues.push(content);
    }
    if (cover_url !== undefined) {
      updateFields.push('cover_url = ?');
      updateValues.push(cover_url);
    }
    if (author !== undefined) {
      updateFields.push('author = ?');
      updateValues.push(author);
    }

    if (updateFields.length === 0) {
      return error(res, '没有要更新的字段', 400);
    }

    updateValues.push(id);
    await pool.execute(
      `UPDATE news SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    success(res, null, '更新成功');
  } catch (err) {
    console.error('更新新闻错误:', err);
    error(res, '更新失败，服务器错误', 500);
  }
};

// 删除新闻（软删除）
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE news SET is_deleted = 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return error(res, '新闻不存在', 404);
    }

    success(res, null, '删除成功');
  } catch (err) {
    console.error('删除新闻错误:', err);
    error(res, '删除失败，服务器错误', 500);
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
};

