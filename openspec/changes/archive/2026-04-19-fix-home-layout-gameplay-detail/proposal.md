## Why

首页在常见视口下出现区块挤压、对齐不一致或视觉层级混乱，影响第一印象与信息扫描。玩法列表点击卡片后进入的详情路径在路由中未注册，也没有对应页面组件，用户只看到站点全局背景，误以为「没有内容」。

## What Changes

- 梳理并修正首页（`Home.vue`）主要区块的布局：栅格/间距、标题与按钮组、统计区与视觉卡片的对齐与换行，避免元素重叠或横向溢出。
- 为玩法资料增加与新闻详情类似的「详情页」体验：注册 `/gameplay/:id` 路由，新增详情视图，通过已有 `gameplayApi.getById` 拉取并展示标题、类型、封面与正文（含加载、错误、返回）。
- 确认列表页在空数据、接口失败时仍有可读的空状态（已有逻辑可保留，仅在样式可读性上必要时微调）。

## Capabilities

### New Capabilities

- `frontend-home-layout`: 首页公开区域的布局与可读性要求（Hero、功能卡片区、页内间距与断行）。
- `frontend-gameplay-pages`: 玩法列表与详情在路由、导航与内容展示上的行为要求（含从列表进入详情的完整路径）。

### Modified Capabilities

- （无）当前 `openspec/specs/` 下无与前端页面布局或玩法浏览相关的既有能力说明，本次以新增能力规格为主。

## Impact

- 前端：`frontend/src/views/Home.vue` 样式与模板结构；`frontend/src/router/index.js`；新增 `frontend/src/views/GameplayDetail.vue`（或等价命名）；可能微调 `frontend/src/views/Gameplay.vue` 与全局/布局样式（`Layout.vue`、`style.css`/`App.vue`）以保持层级一致。
- 后端：沿用现有 `/gameplay` 与 `/gameplay/:id` 接口，无契约变更。
- 依赖：无新增 npm 包预期。
