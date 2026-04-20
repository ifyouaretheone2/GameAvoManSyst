/**
 * 为 admin 表增加 role 字段（admin | user），并在首次迁移时将已有账号全部设为 admin。
 * 幂等：已存在 role 列时跳过 ALTER，不再批量改角色。
 *
 * 用法: node scripts/migrateAdminRole.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const dbName = process.env.DB_NAME || 'zzz_style_website';
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: dbName
  });

  try {
    const [cols] = await connection.execute(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'admin' AND COLUMN_NAME = 'role'`,
      [dbName]
    );

    if (cols.length === 0) {
      await connection.execute(
        `ALTER TABLE admin ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user' COMMENT 'admin or user'`
      );
      await connection.execute(`UPDATE admin SET role = 'admin'`);
      console.log('✓ 已添加 role 列并将现有账号设为 admin');
    } else {
      console.log('✓ role 列已存在，跳过 ALTER');
    }

    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('迁移失败:', err.message);
    await connection.end().catch(() => {});
    process.exit(1);
  }
}

migrate();
