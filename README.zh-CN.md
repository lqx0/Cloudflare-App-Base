# Cloudflare-App-Base

Cloudflare-App-Base 是基于 Cloudflare 全栈 Starter 整理的可复用应用基础。目标是为未来不同项目保留共同的认证、数据库、邮件、环境、CLI、测试和部署准备能力。

项目目的、愿景和分支规则见 [VISION.zh-CN.md](VISION.zh-CN.md)。

## 技术基础

- React 19、TypeScript、Vite、React Router
- Tailwind CSS 和 shadcn/ui
- Hono on Cloudflare Workers
- Cloudflare D1、Kysely 和 `kysely-d1`
- Better Auth 邮箱密码认证和 Google OAuth 能力
- 邮件 Provider Adapter
- Local、Preview、Production 配置和 Wrangler 工具
- 数据库迁移、备份、恢复、Seed、Time Travel 和用户管理 CLI

Node.js 要求：`>=22.15.0 <23`。

## 使用方式

1. 保持 `main` 为通用、稳定基础。
2. 从 `main` 创建 `project/<name>`。
3. 在项目分支中替换品牌、域名、页面、法律内容、数据模型和远程资源名。
4. 将真正通用的修复和改进回合到 `main`。

## 本地开发

```bash
npm install
npm run init
npm run db:migrate
npm run dev
npm run lint
npm run build
npm run check
```

运行初始化前必须审查提示。本地开发不得默认连接 Production。

## 主分支边界

- 不包含具体客户或项目需求。
- 不添加推测性业务数据模型。
- 保留 Starter 正常工作的基础设施。
- 不因当前没有授权执行，就删除部署、Secret、远程数据库、邮件或 CLI 能力。
- 未经具体授权，不执行远程部署、迁移、Secret 同步、OAuth、DNS、邮件、付费或破坏性操作。

## 文档

`README`、`VISION`、`SPEC`、`ARCHITECTURE`、`TASKS` 和 `AGENTS` 使用中英文配套文件。先确认中文语义，再同步英文，并检查两者结构和含义一致。

## 历史

旧 Cloudflare-Ankit 状态保存在 `archive/cloudflare-ankit-20260801`。历史设计和计划文件保持原样，作为当时工作的真实记录。

## 许可证

上游 Starter 使用 MIT 许可证。发布源码或主要副本时保留相应版权和许可声明。
