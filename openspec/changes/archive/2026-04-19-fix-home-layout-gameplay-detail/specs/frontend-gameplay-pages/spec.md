## ADDED Requirements

### Requirement: 玩法详情路由可解析

系统 SHALL 为玩法资料提供与列表中卡片 `id` 一致的动态路由，使得从列表进入详情时 `router-view` SHALL 渲染玩法详情页面组件。

#### Scenario: 列表卡片进入详情

- **WHEN** 玩法列表已加载且至少有一条记录，用户点击某条卡片
- **THEN** 浏览器地址栏 SHALL 变为 `/gameplay/<该条 id>`，且页面 SHALL 渲染玩法详情视图（SHALL NOT 仅显示无组件匹配时的空白主区域）

### Requirement: 玩法详情展示内容与状态

玩法详情页 SHALL 根据路由参数请求单条玩法数据，并 SHALL 在加载中、成功、失败时分别展示加载指示、文章主体或错误提示与重试入口。

#### Scenario: 成功加载详情

- **WHEN** 接口对给定 `id` 返回有效玩法对象
- **THEN** 页面 SHALL 展示标题（及类型、封面若存在）与正文内容，且 SHALL 提供返回上一页的明确控件

#### Scenario: 加载失败

- **WHEN** 接口请求失败或返回无有效数据
- **THEN** 页面 SHALL 展示错误说明，且 SHALL 提供重试或返回列表的可用操作

### Requirement: 玩法列表空数据可读

当玩法列表为空或接口返回空列表时，列表页 SHALL 展示空状态文案或图示，且文字与背景对比度 SHALL 足以阅读。

#### Scenario: 无玩法数据

- **WHEN** 列表接口返回空数组且不在加载中
- **THEN** 页面 SHALL 展示「暂无」类提示，且 SHALL NOT 呈现仅背景无提示的空白主内容区
