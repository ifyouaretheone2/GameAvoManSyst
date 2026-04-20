## Context

项目为 Node.js + Express + MySQL 全栈站点：公开页面消费 `controllers/*` 暴露的 REST API，管理端使用 JWT。已有 `scripts/initAdmin.js` 用于管理员初始化，但业务表（角色、新闻、玩法、商品）缺少与仓库一同维护的示例数据入口。`middleware/validation.js` 与 `utils/logger.js` 等已存在，优化应与之对齐而非另起一套抽象。

## Goals / Non-Goals

**Goals:**

- 提供单一入口（推荐 `npm run seed` 或 `node scripts/seedSampleData.js`）在开发库中写入一组固定的示例记录，可安全重复执行（幂等：按业务键 upsert 或先删后插仅限开发表，并在脚本内用环境变量门禁）。
- 控制器层小步优化：列表接口统一分页参数校验、404 与 500 行为与 `utils/response.js` 一致；避免无收益的大重构。
- 种子数据与表结构字段名与现有 `INSERT` 语句一致，避免引入新列除非库中已存在。

**Non-Goals:**

- 不修改前端路由或视觉设计（除非任务阶段发现阻塞性 bug）。
- 不引入 Redis、ORM 迁移框架等新基础设施。
- 不在无明确需求时改变 JWT 载荷或登录响应形状。

## Decisions

1. **种子实现形态**：采用 Node 脚本 + `mysql2/promise` 复用 `config/database.js`（或等价连接），与 `initAdmin.js` 一致，便于 Windows/macOS/Linux 与 CI；可选附带 `scripts/sample-data.sql` 作为只读参考，但以脚本为单一事实来源避免双维护漂移。
2. **幂等策略**：优先使用 `INSERT ... ON DUPLICATE KEY UPDATE`（表需唯一键/主键）；若无合适唯一业务键，则使用固定 `id` 或固定 `slug` 式键并在文档说明；最坏情况使用 `DELETE FROM table WHERE id BETWEEN x AND y` 限定开发种子 ID 段（需在 design/tasks 中写清 ID 范围）。
3. **环境门禁**：脚本开头校验 `NODE_ENV !== 'production'` 或显式 `ALLOW_SEED=true`，否则退出并打印说明，降低误跑生产风险。
4. **代码优化范围**：仅触及与种子相关的控制器路径，以及已明确的重复校验（例如分页 `page`/`pageSize`）；不合并所有 controller 为单一巨型模块。

## Risks / Trade-offs

- **[Risk] 生产误执行种子** → **Mitigation**：环境变量门禁 + 文档醒目标注 + 脚本非交互默认拒绝。
- **[Risk] 与真实运营数据混在同一库** → **Mitigation**：文档要求使用独立开发库名；种子使用可识别前缀或固定 ID 段便于手工清理。
- **[Risk] 表结构与仓库假设不一致** → **Mitigation**：实现前对照现有 migration/SQL 或首次建表脚本核对列名；任务中包含“对照 schema”一步。

## Migration Plan

1. 合并本变更后，开发者在空库执行建表（若有）→ `node scripts/initAdmin.js` → `npm run seed`。
2. 回滚：删除种子 ID 范围内的记录或还原数据库快照；代码回滚为普通 git revert。

## Open Questions

- 仓库中是否存在权威 `schema.sql`；若无，任务阶段需从现有表或文档导出最小 DDL 片段供种子对齐（可在 `tasks.md` 首项解决）。
