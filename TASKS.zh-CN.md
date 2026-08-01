# Cloudflare-App-Base 任务

状态：`[ ]` 未开始，`[-]` 进行中，`[x]` 已完成，`[!]` 阻塞。

## 基础建立

- [x] 验证 React/Vite + Hono 单服务器架构。
- [x] 验证 Better Auth 邮箱密码、Session 和受保护账户页面。
- [x] 保留 Google OAuth、验证链接和密码重置能力。
- [x] 验证 D1、迁移、备份、恢复、Seed、Time Travel 和 CLI 工具。
- [x] 建立 Local、Preview 和 Production 配置。
- [x] 建立共享网站布局、基础 SEO、安全响应头和聚焦测试。

## Cloudflare-App-Base 定位

- [x] 保存旧 Cloudflare-Ankit 快照到 `archive/cloudflare-ankit-20260801`。
- [x] 将本地 `main` 安全快进到 `origin/main`。
- [x] 定义可复用基础的目的、愿景和原则。
- [x] 定义 `main`、`project/<name>` 和 `archive/<name>-<date>` 分支职责。
- [x] 将 README、SPEC、ARCHITECTURE 和 TASKS 改为中立基础文档。
- [x] 将本地应用和包身份改为 Cloudflare-App-Base。
- [x] 建立独立的 `cloudflare-app-base` Preview Worker 和 D1，保留旧 Worker/D1 不变。
- [x] 运行测试、Lint 和 Build，审查差异并提交推送。

## 后续基础任务

- [x] 将 GitHub 仓库重命名为 `Cloudflare-App-Base`。
- [ ] 为从 `main` 创建新项目提供检查清单或脚本。
- [ ] 将公开演示页面改为完全中立的基础示例。
- [ ] 为项目分支提供远程资源重命名和隔离指南。
- [ ] 评估将成熟项目迁移为独立仓库的流程。
- [ ] 为旧 `legacy/cloudflare-ankit` 分支配置旧 Worker 自动部署。

## 每个项目分支必须完成

- [ ] 建立项目愿景、规格、架构、任务和实施计划。
- [ ] 替换品牌、域名、法律内容和联系方式。
- [ ] 定义业务数据、隐私、保留、角色和授权。
- [ ] 定义 Worker、D1、Secret、OAuth、DNS 和邮件资源。
- [ ] 先本地验证，再针对具体远程操作获得授权。
