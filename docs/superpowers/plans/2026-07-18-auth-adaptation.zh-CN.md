# Cloudflare-Ankit 认证调整实施计划

**目标：** 完成里程碑 3 的认证体验调整，同时保留 Starter 的 Better Auth、邮箱密码、Session、Google Provider、验证链接、密码重置、CLI 管理和底层删除能力。

## 约束

- 不创建 Google OAuth 凭据，不部署，也不修改远程资源。
- 前端只通过 HTTP API 获取认证能力状态；不得直接访问 D1。
- 普通用户界面不显示删除账号入口，但 `/api/profile` 与 CLI 删除端点继续保留。

## 任务

1. 新增只读认证能力 API，返回 Google 登录是否由有效凭据启用；前端据此条件显示 Google 按钮。
2. 移除 Profile 页面中的普通用户删除账号 UI 与相关状态；保留 Worker 删除端点和 CLI 代码。
3. 将认证请求异常统一为通用客户端错误，详细错误只写入 Worker 日志。
4. 对能力状态与公开认证路径添加聚焦测试，运行本地认证回归、lint、build 与 check。
5. 同步更新中英文 TASKS，只标记验证通过的里程碑 3 条目。
