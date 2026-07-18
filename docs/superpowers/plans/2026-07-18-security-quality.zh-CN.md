# 安全与质量实施计划

> **供代理执行：** 必须使用 `superpowers:executing-plans` 逐任务实施。

**目标：** 添加分环境响应头并完成本地安全质量检查。

**架构：** Worker 中间件负责响应头；聚焦测试断言策略行为。审查发现只记录本地事实，不修改远程。

**技术栈：** Hono、TypeScript、Node `tsx --test`、npm audit。

## 全局约束

- 不进行远程配置、部署或暴露 Secret。
- 开发 CSP 允许 Vite WebSocket；生产 CSP 默认同源。
- 每个验证任务必须在下一个任务前独立本地提交。

### 任务 1：安全响应头

**文件：** 新建 `src/worker/middleware/security.ts`；修改 `src/worker/index.ts`；新建 `tests/security-headers.test.ts`。

- [ ] 为 `buildSecurityHeaders("local")` 与 `buildSecurityHeaders("production")` 编写失败测试。
- [ ] 运行测试并确认模块不存在失败。
- [ ] 实现 CSP、`X-Content-Type-Options`、`Referrer-Policy`、`X-Frame-Options` 和 Permissions-Policy，并挂载 Hono 中间件。
- [ ] 运行聚焦测试和 lint；提交 `feat: add security response headers`。

### 任务 2：审查与验证

**文件：** 修改 `TASKS.md`、`TASKS.zh-CN.md`、`README.md`、`README.zh-CN.md`。

- [ ] 运行 `npm audit`，检查受追踪环境文件、CLI/Auth 日志并记录本地事实。
- [ ] 添加简洁审查记录，仅在有证据时勾选里程碑 6。
- [ ] 运行全部测试、lint、build、本地头检查和 `git diff --check`；提交 `docs: record security quality review`。
