/**
 * 初始化管理员账号脚本
 * 使用方法: node scripts/initAdmin.js <username> <password> <nickname>
 * 示例: node scripts/initAdmin.js admin 123456 管理员
 */

const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('使用方法: node scripts/initAdmin.js <username> <password> <nickname>');
    console.error('示例: node scripts/initAdmin.js admin 123456 管理员');
    process.exit(1);
  }

  const [username, password, nickname] = args;

  try {
    // 连接数据库
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'zzz_style_website'
    });

    // 检查用户名是否已存在
    const [existing] = await connection.execute(
      'SELECT id FROM admin WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      console.error(`错误: 用户名 "${username}" 已存在`);
      await connection.end();
      process.exit(1);
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 插入管理员
    await connection.execute(
      'INSERT INTO admin (username, password, nickname, role) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, nickname, 'admin']
    );

    console.log('✓ 管理员账号创建成功!');
    console.log(`  用户名: ${username}`);
    console.log(`  昵称: ${nickname}`);
    console.log(`  密码: ${password} (已加密存储)`);

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('创建管理员失败:', error.message);
    process.exit(1);
  }
}

initAdmin();

