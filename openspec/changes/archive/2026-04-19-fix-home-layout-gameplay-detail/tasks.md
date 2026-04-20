## 1. 玩法详情路由与页面

- [x] 1.1 在 `frontend/src/router/index.js` 注册 `/gameplay/:id` 路由，懒加载玩法详情组件，并设置合适的 `meta.title`
- [x] 1.2 新增 `GameplayDetail.vue`（或与设计一致的命名），使用 `Layout`、`useRoute`、`gameplayApi.getById`，实现加载中、成功展示（标题、类型、封面、正文）、失败与重试、返回按钮
- [x] 1.3 手动验证：从 `/gameplay` 点击卡片进入详情、刷新详情 URL、返回列表均正常，且主内容区不再仅显示全局背景

## 2. 首页布局修复

- [x] 2.1 在 1280px 与 1920px 视口下检查 `Home.vue` Hero、按钮组、统计区与 `hero-visual` 是否存在重叠、溢出或错位，调整相关 CSS（flex/grid、`min-width: 0`、间距与换行）直至主区块可读对齐
- [x] 2.2 检查「核心功能」等卡片栅格区域的对齐与内边距，修复卡片内文字裁切或栅格断裂问题
- [x] 2.3 若全局 `min-width: 1200px` 与首页内部宽度策略冲突，按 `design.md` 决策收敛（优先局部修复，必要时再调整全局策略）

## 3. 验收与一致性

- [x] 3.1 对照 `specs/frontend-home-layout/spec.md` 与 `specs/frontend-gameplay-pages/spec.md` 中的场景逐条自测并勾选对应实现
- [x] 3.2 确认玩法列表在空列表时仍显示空状态（样式对比度可读），必要时微调列表页样式
