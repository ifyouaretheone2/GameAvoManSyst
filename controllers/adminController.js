const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { success, error } = require('../utils/response');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

function issueToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function mapAccount(row) {
  if (!row) return null;
  return {
    id: row.id,
    username: row.username,
    nickname: row.nickname,
    role: row.role || 'admin',
    create_time: row.create_time
  };
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return error(res, '用户名和密码不能为空', 400);
    }

    const [admins] = await pool.execute(
      'SELECT * FROM admin WHERE username = ? AND is_deleted = 0',
      [username]
    );

    if (admins.length === 0) {
      return error(res, '用户名或密码错误', 401);
    }

    const account = admins[0];
    const role = account.role || 'admin';

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return error(res, '用户名或密码错误', 401);
    }

    const token = issueToken({
      id: account.id,
      username: account.username,
      role
    });

    success(res, {
      token,
      admin: mapAccount(account)
    }, '登录成功');
  } catch (err) {
    console.error('登录错误:', err);
    error(res, '登录失败，服务器错误', 500);
  }
};

const register = async (req, res) => {
  try {
    if (process.env.ALLOW_REGISTRATION === 'false') {
      return error(res, '当前已关闭自助注册', 403);
    }

    const { username, password, nickname } = req.body;

    if (!username || !password) {
      return error(res, '用户名和密码不能为空', 400);
    }

    const trimmedUser = String(username).trim();
    if (trimmedUser.length < 3 || trimmedUser.length > 64) {
      return error(res, '用户名长度应为 3–64 个字符', 400);
    }

    if (password.length < 6) {
      return error(res, '密码长度至少 6 位', 400);
    }

    const [existing] = await pool.execute(
      'SELECT id FROM admin WHERE username = ? AND is_deleted = 0',
      [trimmedUser]
    );

    if (existing.length > 0) {
      return error(res, '用户名已被使用', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nick = nickname != null && String(nickname).trim() !== '' ? String(nickname).trim() : trimmedUser;

    await pool.execute(
      'INSERT INTO admin (username, password, nickname, role) VALUES (?, ?, ?, ?)',
      [trimmedUser, hashedPassword, nick, 'user']
    );

    success(res, { username: trimmedUser, nickname: nick, role: 'user' }, '注册成功');
  } catch (err) {
    console.error('注册错误:', err);
    if (err.code === 'ER_BAD_FIELD_ERROR' || err.message?.includes('Unknown column')) {
      return error(res, '数据库未迁移：请先执行 node scripts/migrateAdminRole.js', 500);
    }
    error(res, '注册失败，服务器错误', 500);
  }
};

const getCurrentAdmin = async (req, res) => {
  try {
    const [admins] = await pool.execute(
      'SELECT id, username, nickname, role, create_time FROM admin WHERE id = ? AND is_deleted = 0',
      [req.user.id]
    );

    if (admins.length === 0) {
      return error(res, '用户不存在', 404);
    }

    const row = admins[0];
    if (!row.role) {
      row.role = 'admin';
    }

    success(res, mapAccount(row), '获取成功');
  } catch (err) {
    console.error('获取当前用户信息错误:', err);
    if (err.code === 'ER_BAD_FIELD_ERROR' || err.message?.includes('Unknown column')) {
      return error(res, '数据库未迁移：请先执行 node scripts/migrateAdminRole.js', 500);
    }
    error(res, '获取失败，服务器错误', 500);
  }
};

const listAccounts = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT id, username, nickname, role, create_time
       FROM admin WHERE is_deleted = 0 ORDER BY id ASC`
    );

    success(res, rows.map((r) => mapAccount(r)), '获取成功');
  } catch (err) {
    console.error('列出用户错误:', err);
    if (err.code === 'ER_BAD_FIELD_ERROR' || err.message?.includes('Unknown column')) {
      return error(res, '数据库未迁移：请先执行 node scripts/migrateAdminRole.js', 500);
    }
    error(res, '获取失败，服务器错误', 500);
  }
};

const promoteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id) || id < 1) {
      return error(res, '无效的用户 ID', 400);
    }

    const [rows] = await pool.execute(
      'SELECT id, username, nickname, role FROM admin WHERE id = ? AND is_deleted = 0',
      [id]
    );

    if (rows.length === 0) {
      return error(res, '用户不存在', 404);
    }

    const target = rows[0];
    const role = target.role || 'admin';

    if (role === 'admin') {
      return error(res, '该用户已是管理员', 400);
    }

    if (role !== 'user') {
      return error(res, '无法提升该账号', 400);
    }

    await pool.execute('UPDATE admin SET role = ? WHERE id = ? AND is_deleted = 0', ['admin', id]);

    success(res, { id, username: target.username, role: 'admin' }, '已提升为管理员');
  } catch (err) {
    console.error('提升管理员错误:', err);
    error(res, '操作失败，服务器错误', 500);
  }
};

module.exports = {
  login,
  register,
  getCurrentAdmin,
  listAccounts,
  promoteUser
};
