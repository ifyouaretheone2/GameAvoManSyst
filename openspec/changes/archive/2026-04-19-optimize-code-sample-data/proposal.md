## Why

本地开发与演示时，页面与接口常因空库显得“不可用”；同时控制器与校验逻辑分散，重复与边界处理不一致会增加维护成本。本次在不大改对外契约的前提下，补齐可重复的示例数据入口，并收敛后端常见路径的质量（校验、错误处理、可观测性）。

## What Changes

- 增加**可重复执行**的示例数据脚本（或 SQL + Node 封装），覆盖角色、新闻、玩法、商品等核心业务表，与现有 `scripts/initAdmin.js` 风格一致。
- 优化后端：在已有 `middleware/validation.js` 等基础上，统一列表/详情分页与错误响应、减少重复 SQL 片段、避免明显 N+1 或冗余查询（仅在已识别处小步调整）。
- 文档：在 `QUICKSTART.md` 或等价位置增加“一键种子数据”步骤（不新建用户未要求的独立大文档时，优先扩展现有快速启动说明）。
- **BREAKING**：无计划中的破坏性 API 变更；若种子脚本使用 `DELETE`/`TRUNCATE` 再插入，仅作用于开发约定表，需在文档中明确“仅开发环境”。

## Capabilities

### New Capabilities

- `sample-data-seeding`: 定义开发环境示例数据的来源、幂等策略、涉及表与字段约定，以及如何与 `initAdmin` 配合使用。
- `backend-code-quality`: 定义对外行为保持兼容前提下，校验、分页、日志与控制器层面的质量基线（可测、可重复）。

### Modified Capabilities

- （无）`openspec/specs/` 下尚无既有规范；本次全部为新增能力说明。

## Impact

- **代码**：`scripts/`（新种子脚本）、`controllers/*`、`middleware/validation.js`、`server.js`（若需挂载健康检查或路由顺序）、`package.json`（可选 `npm run seed`）。
- **数据**：MySQL 表 `character`、`news`、`gameplay`、`product`（及已有 `admin`）；生产环境默认不自动执行种子。
- **依赖**：沿用现有 `mysql2`、`dotenv`；不引入新的重型依赖除非任务阶段明确需要。
