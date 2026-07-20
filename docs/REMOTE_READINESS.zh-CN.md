# 远程启用准备

本文件把两个需要所有者明确授权的工作提升为下一阶段最高优先级。它只记录本地准备状态和执行前置条件，不授权任何远程操作。

## 优先级 1：Google OAuth 凭据与启用

### 已具备的本地实现

- `config.auth.enableGoogleAuth` 已启用。
- Worker 只有在 `GOOGLE_CLIENT_ID` 和 `GOOGLE_CLIENT_SECRET` 都存在时才注册 Google provider；缺少任一值时，邮箱密码登录继续可用。
- `/api/auth/capabilities` 驱动登录页是否显示 Google 按钮。
- Better Auth 的默认回调路径是 `/api/auth/callback/google`；回调基址来自 `APP_BASE_URL`。

### 执行前必须由所有者提供或确认

1. Google Cloud 项目所有权，以及已完成的 OAuth consent screen 决定。
2. Web application 类型的 OAuth Client ID 和 Client Secret。机密只能经批准的安全渠道写入环境文件或 Cloudflare Secret，不能粘贴到 Git、任务文档或聊天记录。
3. 每个要启用环境的精确授权回调 URI：
   - Preview：`https://cloudflare-ankit-preview.lqixv.workers.dev/api/auth/callback/google`
   - Production：`https://<已确认规范域名>/api/auth/callback/google`
4. 是否要启用 Preview OAuth、Production OAuth，或两者；以及是否允许来自任何 Google 账户的注册。默认不增加 Workspace 限制或额外 Google scopes。
5. 对相应环境同步 `GOOGLE_CLIENT_ID` 与 `GOOGLE_CLIENT_SECRET` 的明确授权。

### 获批后的验证

1. 确认 Worker 身份和目标环境，且只使用获批环境。
2. 安全同步凭据，不在输出中保留值。
3. 验证 capabilities API 显示 Google 可用，并从登录页发起一次完整回调。
4. 确认新用户或已验证同邮箱用户的账户连接符合现有 Better Auth 行为，且邮箱密码登录没有回归。
5. 运行全量测试、lint、构建，并记录部署 URL、命令结果和 Git 状态。

## 优先级 2：域名、邮箱、Preview/Production 配置与部署

### 当前本地状态

- Preview 已配置独立 Worker、D1 数据库和 `APP_BASE_URL`；现有地址为 `https://cloudflare-ankit-preview.lqixv.workers.dev`。
- Production 的 D1 ID 仍是占位符，且没有 `APP_BASE_URL`。在获得真实规范域名与既有/新建数据库决定前，Production 不可部署。
- 发件人仍是 `noreply@example.com` 占位符。认证邮件在 Preview 中明确禁用；在没有可验证发件域名和邮件方案前不得启用。
- 现有 CI 在 `main` 分支检查通过后部署 Preview；任何合并到 `main` 的变更都必须先被视为可能触发该部署。

### 执行前必须由所有者提供或确认

1. 规范 Production 域名、是否将 `www` 永久重定向到规范域名，以及域名是否已在目标 Cloudflare 帐户中作为活动 zone。
2. Production D1 的处理方式：提供现有数据库 ID，或单独授权创建一个数据库。不得猜测或复用 Preview ID。
3. Preview 与 Production 的准确 `APP_BASE_URL`，以及每个环境允许的 Worker、D1 和域名范围。
4. 企业邮箱方案：完整邮箱服务或仅收件转发；认证邮件发送服务、经验证发件域名和发件地址。任何 DNS、Email Routing、Email Sending 或付费方案都需要独立明确授权。
5. 是否允许部署 Preview、Production，或两者；各自的迁移、Secret 同步、CI 变量和回滚边界也必须分别授权。

### 获批后的执行顺序

1. 先核对帐户身份、目标 Worker、D1 和 zone，不作修改。
2. 在 Preview 先完成域名/邮箱/OAuth 的获批子集，验证健康检查、登录、注册、OAuth 回调和邮件的实际行为。
3. 仅在 Preview 验证和 Production 的独立书面授权后，填入 Production 配置并部署。
4. 使用 Worker Custom Domain 连接以 Worker 为源站的规范域名；`www` 重定向需要独立 DNS/重定向规则决定。
5. 发布后记录实际 URL、环境、迁移状态、验证结果和 Git 状态；不在输出或提交中披露 Secret。

## 不在本文件授权的事项

- 创建 Google OAuth 客户端或 Cloudflare 资源。
- 写入或同步 Secret。
- 变更 D1、DNS、Email Routing、Email Sending、域名或付费订阅。
- Preview 或 Production 部署、远程迁移、删除或回滚。

## 已批准的 Preview 数据重置规则

- 所有 Preview 数据均为测试数据，随时可能清除。
- 清除时不发送任何通知。
- 可根据测试功能的需要清除部分或全部 Preview 数据。
- 清除前默认不做任何备份。
- 不安排定时或自动清除。每一次破坏性清除都必须由所有者明确授权，并说明目标范围；之后可由 AI 执行。
