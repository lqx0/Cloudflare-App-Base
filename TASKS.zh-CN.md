# Cloudflare-Ankit 任务

状态：

```text
[ ] 尚未开始
[-] 进行中
[x] 已完成并验证
[!] 被阻塞
```

## 里程碑 0 — 仓库调查

- [x] 检查 Git 状态、分支、Remote 和目录树。
- [x] 判断仓库是干净 Starter、Template 生成还是已修改。
- [x] 阅读上游 README、AGENTS、安装文档、包脚本、锁文件、Wrangler、迁移、Auth、邮件 Adapter 和 CLI。
- [x] 确认 Node.js 和包管理器要求。
- [x] 识别正常 Starter 功能。
- [x] 识别远程和破坏性脚本。
- [x] 保留但不执行。
- [x] 创建或合并中英文文档配对。
- [x] 确认没有提交 Secret。
- [x] 确认里程碑 0–1 的改动尚未提交，因此当前不适合创建基线 Commit 或 Tag。

## 里程碑 1 — 本地 Starter 验证

- [x] 使用 Node.js `>=22.15.0 <23`。
- [x] 安装依赖。
- [x] 运行 `npm run init` 前审查初始化问题。
- [x] 只配置本地环境文件。
- [x] 必要时生成本地 Secret。
- [x] 只应用本地迁移。
- [x] 启动本地应用。
- [x] 验证邮箱密码注册和登录。
- [x] 验证受保护账户访问。
- [x] 验证资料修改。
- [x] 确认没有凭据时 Google OAuth 可选。
- [x] 确认验证邮件根据 Provider 条件启用。
- [x] 确认远程脚本保留但未执行。
- [x] 运行 `npm run lint`。
- [x] 运行 `npm run build`。
- [x] 运行 `npm run check`。

里程碑 1 后停止并报告。

## 里程碑 2 — Cloudflare-Ankit 公开框架

- [x] 将可见 Starter 品牌改为临时 Cloudflare-Ankit。
- [x] 保留许可证声明。
- [x] 添加公开导航和页脚。
- [x] 添加 Home、About、Products/Services、Contact、Privacy、Terms 和 Not Found。
- [x] 添加 Login、Register 和 Account 入口。
- [x] 无问题时保留 Starter 主题。
- [x] 使用简单临时内容。

## 里程碑 3 — 认证调整

- [x] 保留 Better Auth 邮箱密码。
- [x] 保留 Session 和受保护路由。
- [x] 保留 Google OAuth 配置。
- [x] 必要时未配置时干净隐藏 Google 登录。
- [x] 保留验证链接和密码重置 Hook。
- [x] 不实现数字 OTP。
- [x] 隐藏或禁用普通用户删除账户。
- [x] 保留底层删除和 CLI 管理。
- [x] 审查 Auth 错误暴露。

## 里程碑 4 — 法律和数据规则

- [x] 添加临时 Privacy 和 Terms。
- [x] 描述收集字段。
- [x] 描述保存到授权删除或政策改变。
- [x] 添加隐私联系人占位符。
- [x] 说明访问、更正和删除请求渠道。
- [x] 标记法律内容需要所有者批准。

## 里程碑 5 — SEO

- [x] 添加路由独立标题和描述。
- [x] 添加 Canonical 和 Open Graph。
- [x] 添加社交图片、`robots.txt`、`sitemap.xml`。
- [x] 添加语义标题、Alt、站内链接和 Not Found。
- [x] 记录 SPA 限制。
- [x] 不添加 Astro。

## 里程碑 6 — 质量和安全

- [x] 审查 Auth 错误。
- [x] 审查安全响应头和 CSP。
- [x] 审查日志个人数据。
- [x] 审查 CLI Endpoint 保护。
- [x] 审查 `.gitignore` 和 Secret 文件。
- [x] 审查依赖漏洞。
- [x] 为修改行为添加聚焦测试。
- [x] 检查无障碍和响应式。

## 后续里程碑 — 远端就绪状态

已完成的 Preview 工作记录在 `docs/REMOTE_READINESS.zh-CN.md`。之后的远端工作仍须针对目标环境取得明确授权。

- [x] 优先级 1：Google OAuth 凭据与 Preview 启用。已验证本地与 Preview 回调流程，Google OAuth 凭据已作为 Preview Worker Secret 保存。
- [x] 优先级 2a：Preview 配置与部署。Preview D1 已应用 Better Auth OAuth schema migration，Preview Worker 已部署并验证。
- [x] 优先级 2b：OAuth 应用发布后，已使用第二个非所有者的外部 Google 账号验证注册和登录。
- [!] 优先级 2c：在向客户承诺清空数据前，决定并实现真实的 Preview 数据重置规则。此项需要所有者明确时间、范围、备份处理和客户告知方式。
- [!] 优先级 2d：规范域名、邮件服务配置、Production D1 与 Production 部署仍不在范围内，须另行授权。

仍需单独批准：

- 域名/DNS/Email Routing/Email Sending 配置
- Production D1 migration 或部署
- 任何付费或破坏性操作

## 第二阶段待办

- 真实业务需求
- 产品数据和管理
- 购物车和结账
- 支付
- 订单和库存
- 商家后台
- 根据证据重新评估 Astro
