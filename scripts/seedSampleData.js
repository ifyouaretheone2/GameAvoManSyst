/**
 * 开发环境示例数据（幂等：固定主键段内先删后插）
 *
 * 表与字段（由现有 controller INSERT / SELECT 推断，供维护参考）：
 * - `character`: id, name, title, intro, avatar_url, cover_url, attribute, is_deleted
 * - news: id, title, category, content, cover_url, author, is_deleted, publish_time
 * - gameplay: id, title, type, content, cover_url, is_deleted, create_time
 * - product: id, name, price, intro, cover_url, stock, is_deleted, create_time
 *
 * 保留主键区间 100001–100099 专用于本脚本示例行；重复执行会先删除该区间内本脚本使用的 id 再插入。
 */

require('dotenv').config();

if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DANGEROUS_SEED !== 'true') {
  console.error(
    '拒绝执行：生产环境 NODE_ENV=production。若确有必要（不推荐），请设置环境变量 ALLOW_DANGEROUS_SEED=true 后重试。'
  );
  process.exit(1);
}

const pool = require('../config/database');

const SEED = {
  characterIds: [100001, 100002, 100003],
  newsIds: [100011, 100012],
  gameplayIds: [100021],
  productIds: [100031, 100032]
};

const placeholderImg = (seed) => `https://picsum.photos/seed/${seed}/400/500`;

async function seed() {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.execute(
      'DELETE FROM product WHERE id IN (' + SEED.productIds.map(() => '?').join(',') + ')',
      SEED.productIds
    );
    await conn.execute(
      'DELETE FROM gameplay WHERE id IN (' + SEED.gameplayIds.map(() => '?').join(',') + ')',
      SEED.gameplayIds
    );
    await conn.execute(
      'DELETE FROM news WHERE id IN (' + SEED.newsIds.map(() => '?').join(',') + ')',
      SEED.newsIds
    );
    await conn.execute(
      'DELETE FROM `character` WHERE id IN (' + SEED.characterIds.map(() => '?').join(',') + ')',
      SEED.characterIds
    );

    for (const row of [
      {
        id: 100001,
        name: '示例代理人 · 铃',
        title: '狡兔屋',
        intro: '这是一条用于本地开发的示例角色简介，方便列表与详情页联调展示。',
        avatar_url: placeholderImg('char-a'),
        cover_url: placeholderImg('char-cover-a'),
        attribute: '击破'
      },
      {
        id: 100002,
        name: '示例代理人 · 哲',
        title: 'Random Play',
        intro: '另一条示例数据，用于验证搜索与分页接口。',
        avatar_url: placeholderImg('char-b'),
        cover_url: null,
        attribute: '支援'
      },
      {
        id: 100003,
        name: '示例代理人 · 比利',
        title: '狡兔屋',
        intro: '占位用角色，可直接替换为正式运营数据。',
        avatar_url: placeholderImg('char-c'),
        cover_url: placeholderImg('char-cover-c'),
        attribute: '强攻'
      }
    ]) {
      await conn.execute(
        'INSERT INTO `character` (id, name, title, intro, avatar_url, cover_url, attribute, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
        [row.id, row.name, row.title, row.intro, row.avatar_url, row.cover_url, row.attribute]
      );
    }

    for (const row of [
      {
        id: 100011,
        title: '【示例】新版本活动预告',
        category: '活动',
        content: '<p>这是一条示例新闻正文，用于本地开发演示。</p>',
        cover_url: placeholderImg('news-a'),
        author: '示例编辑'
      },
      {
        id: 100012,
        title: '【示例】攻略：空洞探索入门',
        category: '攻略',
        content: '<p>示例攻略内容，可删除后通过管理后台重新发布。</p>',
        cover_url: null,
        author: '示例作者'
      }
    ]) {
      await conn.execute(
        'INSERT INTO news (id, title, category, content, cover_url, author, is_deleted, publish_time) VALUES (?, ?, ?, ?, ?, ?, 0, NOW())',
        [row.id, row.title, row.category, row.content, row.cover_url, row.author]
      );
    }

    for (const row of [
      {
        id: 100021,
        title: '【示例】零号空洞玩法说明',
        type: '战斗',
        content: '<p>示例玩法说明文本。</p>',
        cover_url: placeholderImg('gp-a')
      }
    ]) {
      await conn.execute(
        'INSERT INTO gameplay (id, title, type, content, cover_url, is_deleted, create_time) VALUES (?, ?, ?, ?, ?, 0, NOW())',
        [row.id, row.title, row.type, row.content, row.cover_url]
      );
    }

    for (const row of [
      {
        id: 100031,
        name: '【示例】调律驱动盘（占位）',
        price: 68.0,
        intro: '示例商品，仅用于前端商品列表与详情展示。',
        cover_url: placeholderImg('prod-a'),
        stock: 120
      },
      {
        id: 100032,
        name: '【示例】音擎周边（占位）',
        price: 128.5,
        intro: '第二条示例商品数据。',
        cover_url: placeholderImg('prod-b'),
        stock: 45
      }
    ]) {
      await conn.execute(
        'INSERT INTO product (id, name, price, intro, cover_url, stock, is_deleted, create_time) VALUES (?, ?, ?, ?, ?, ?, 0, NOW())',
        [row.id, row.name, row.price, row.intro, row.cover_url, row.stock]
      );
    }

    await conn.commit();
    console.log('✓ 示例数据写入完成（主键段 100001–100032）。');
    console.log('  角色 ID:', SEED.characterIds.join(', '));
    console.log('  新闻 ID:', SEED.newsIds.join(', '));
    console.log('  玩法 ID:', SEED.gameplayIds.join(', '));
    console.log('  商品 ID:', SEED.productIds.join(', '));
  } catch (e) {
    await conn.rollback();
    console.error('示例数据写入失败:', e.message);
    process.exitCode = 1;
    throw e;
  } finally {
    conn.release();
    await pool.end().catch(() => {});
  }
}

seed()
  .then(() => process.exit(process.exitCode || 0))
  .catch(() => process.exit(1));
