## Context

项目为 Vue 3 + Vue Router 的前后端分离站点。首页 `Home.vue` 使用多段区块与较多自定义 CSS。玩法列表 `Gameplay.vue` 在卡片点击时使用 `$router.push(\`/gameplay/${item.id}\`)`，但 `router/index.js` 中仅有 `/gameplay`，缺少动态段路由与详情组件，导致 `router-view` 无匹配组件，用户仅见 `App.vue`/`body` 上的全局渐变背景。后端已提供 `GET /gameplay/:id`（前端 `gameplayApi.getById` 已封装）。

## Goals / Non-Goals

**Goals:**

- 首页主要区块在桌面常见宽度下对齐清晰、无意外重叠或裁切，Hero 与功能卡片区视觉层级稳定。
- 用户从玩法列表进入详情时，路由可解析、页面展示完整内容与导航返回路径。

**Non-Goals:**

- 重做整站设计系统或更换 UI 框架。
- 修改玩法数据模型或后台管理 CRUD 流程（除非发现与公开 API 不一致的缺陷）。
- 全面移动端适配（可在设计中注明后续迭代；本次以修复当前报告的「乱」与详情空白为主）。

## Decisions

1. **玩法详情实现方式**：新增独立视图组件（命名建议 `GameplayDetail.vue`），模式对齐 `NewsDetail.vue`（Layout 包裹、加载/错误/返回、`v-html` 或统一的内容格式化函数）。**理由**：复用团队已熟悉的新闻详情模式，降低维护成本。**备选**：弹窗抽屉展示详情；否决，因当前列表已用路由跳转语意。

2. **路由注册**：在 `router/index.js` 增加 `path: '/gameplay/:id'`，`name` 建议 `GameplayDetail`，懒加载详情组件，`meta.title` 可设为「玩法详情」或加载后动态设置（若实现成本低可后续优化）。**理由**：与现有列表 `push` 路径一致，无需改 API。

3. **首页布局修复策略**：优先用布局容器（max-width、grid/flex gap、必要时 `flex-wrap`）与局部 `min-width: 0` 防止 flex 子项溢出，避免引入与 `body { min-width: 1200px }` 冲突的横向滚动条叠加。**理由**：改动面可控；**备选**：移除全局 `min-width`；暂缓除非确认其为乱版主因。

## Risks / Trade-offs

- **[Risk] 仅调 CSS 未触及根因** → 在实现前用浏览器开发者工具确认重叠节点（z-index、负 margin、绝对定位）。  
- **[Risk] 详情正文含 HTML 的 XSS** → 与新闻详情一致：若后端内容为可信管理员录入则维持 `v-html`；若未来有用户生成内容需统一消毒策略（本变更非目标，可在 Open Questions 记录）。  
- **[Trade-off] 响应式范围** → 本次以 PC 为主；窄屏可能仍不完美。

## Migration Plan

- 纯前端发布：无数据迁移。部署后验证 `/gameplay` 列表与 `/gameplay/:id` 详情及返回行为。

## Open Questions

- 首页「乱」的具体视口宽度与浏览器是否需作为验收标准写入任务（例如 1280px、1920px）。
