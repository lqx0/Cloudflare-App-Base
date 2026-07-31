# Cloudflare-App-Base 愿景

## 目的

Cloudflare-App-Base 是一套可复用的 Cloudflare 全栈应用基础。它集中维护每个新项目都会重复需要的工程能力，让具体项目从可靠基线开始，而不是重复搭建认证、数据库、邮件、环境和部署工具。

## 愿景

未来以 Cloudflare 为运行基础的应用，可以从本仓库的稳定 `main` 创建项目分支，快速加入各自业务需求，同时继续继承经过验证的安全、质量和运维能力。

## 主分支职责

`main` 只保存通用能力：

- React、TypeScript、Vite、Tailwind CSS 和 shadcn/ui；
- Hono on Cloudflare Workers；
- Cloudflare D1、Kysely 和迁移工具；
- Better Auth 邮箱密码认证、Google OAuth 能力和受保护路由；
- 邮件 Provider Adapter；
- Local、Preview、Production 环境工具；
- 数据库备份、恢复、Seed、Time Travel 和 CLI 管理；
- 测试、Lint、Build、安全基线和中英文文档规则。

`main` 不包含具体客户的品牌、域名、业务文案、数据模型或交付承诺。

## 分支策略

- `main`：稳定、可复用的基础。
- `project/<name>`：具体项目的需求和实现。
- `archive/<name>-<date>`：需要长期保留的历史快照。

项目分支必须先记录自己的范围、数据政策、远程资源和验收标准。成熟并独立交付的项目应考虑迁移到独立仓库，避免长期分支分歧和权限混杂。

## 原则

1. 优先保留已验证的 Starter 能力。
2. 通用改进回到 `main`；客户专属改动留在项目分支。
3. 不在基础分支编造客户身份、域名、法律文本或产品事实。
4. 远程部署、Secret、数据库、DNS、OAuth、邮件、付费和破坏性操作必须单独授权。
5. 基础变更必须有聚焦测试和可复现验证。
