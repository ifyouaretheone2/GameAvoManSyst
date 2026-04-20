const pool = require('../config/database');
const { success, error } = require('../utils/response');
const logger = require('../utils/logger');

// 获取商品列表（支持分页和搜索）
const getProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword = '' } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSizeNum = Math.max(1, Math.min(100, parseInt(pageSize) || 10));
    const offset = (pageNum - 1) * pageSizeNum;

    let query = 'SELECT * FROM product WHERE is_deleted = 0';
    let params = [];

    if (keyword) {
      query += ' AND (name LIKE ? OR intro LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }

    query += ` ORDER BY create_time DESC LIMIT ${pageSizeNum} OFFSET ${offset}`;

    const [products] = await pool.execute(query, params);

    // 获取总数
    let countQuery = 'SELECT COUNT(*) as total FROM product WHERE is_deleted = 0';
    let countParams = [];
    if (keyword) {
      countQuery += ' AND (name LIKE ? OR intro LIKE ?)';
      countParams.push(`%${keyword}%`, `%${keyword}%`);
    }
    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    success(res, {
      list: products,
      total,
      page: pageNum,
      pageSize: pageSizeNum
    }, '获取成功');
  } catch (err) {
    logger.error('获取商品列表错误:', {
      error: err.message,
      stack: err.stack,
      query: req.query
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 获取单个商品详情
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await pool.execute(
      'SELECT * FROM product WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (products.length === 0) {
      return error(res, '商品不存在', 404);
    }

    success(res, products[0], '获取成功');
  } catch (err) {
    logger.error('获取商品详情错误:', {
      error: err.message,
      stack: err.stack,
      id: req.params.id
    });
    error(res, '获取失败，服务器错误', 500);
  }
};

// 创建商品
const createProduct = async (req, res) => {
  try {
    const { name, price, intro, cover_url, stock } = req.body;

    if (!name || price === undefined || !cover_url) {
      return error(res, '商品名称、价格和图片为必填项', 400);
    }

    const [result] = await pool.execute(
      'INSERT INTO product (name, price, intro, cover_url, stock) VALUES (?, ?, ?, ?, ?)',
      [name, price, intro || null, cover_url, stock || 0]
    );

    success(res, { id: result.insertId }, '创建成功');
  } catch (err) {
    console.error('创建商品错误:', err);
    error(res, '创建失败，服务器错误', 500);
  }
};

// 更新商品
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, intro, cover_url, stock } = req.body;

    // 检查商品是否存在
    const [products] = await pool.execute(
      'SELECT id FROM product WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (products.length === 0) {
      return error(res, '商品不存在', 404);
    }

    // 构建更新字段
    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (price !== undefined) {
      updateFields.push('price = ?');
      updateValues.push(price);
    }
    if (intro !== undefined) {
      updateFields.push('intro = ?');
      updateValues.push(intro);
    }
    if (cover_url !== undefined) {
      updateFields.push('cover_url = ?');
      updateValues.push(cover_url);
    }
    if (stock !== undefined) {
      updateFields.push('stock = ?');
      updateValues.push(stock);
    }

    if (updateFields.length === 0) {
      return error(res, '没有要更新的字段', 400);
    }

    updateValues.push(id);
    await pool.execute(
      `UPDATE product SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    success(res, null, '更新成功');
  } catch (err) {
    console.error('更新商品错误:', err);
    error(res, '更新失败，服务器错误', 500);
  }
};

// 删除商品（软删除）
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE product SET is_deleted = 1 WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return error(res, '商品不存在', 404);
    }

    success(res, null, '删除成功');
  } catch (err) {
    console.error('删除商品错误:', err);
    error(res, '删除失败，服务器错误', 500);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

