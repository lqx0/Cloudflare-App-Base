# Cloudflare-App-Base 架构

## 1. 高层设计

```text
浏览器
  |
  v
Cloudflare Worker + Static Assets
  |-- React/Vite 前端
  |-- Hono /api/*
        |-- Better Auth
        |-- Auth Middleware
        |-- Kysely
        |-- D1
        `-- 可选邮件 Adapter
```

前后端使用一个开发服务器和同源部署。前端不得直接访问 D1；所有数据库访问通过 Worker API。

## 2. 通用边界

- `src/react-app`：共享布局、认证 UI、账户页面和项目可替换的公开页面。
- `src/worker`：Hono、Better Auth、API、数据库和邮件集成。
- `migrations`：通用账户迁移；业务迁移属于项目分支。
- `bin` 与 `src/cli`：环境、数据库和用户管理工具。
- `tests`：行为、配置、安全和文档契约。

## 3. 扩展规则

项目分支优先沿用现有模块和接口。只有真实复杂度需要时才拆分 Route、Service、Repository 或 Feature。不得在 `main` 预建推测性的业务抽象。

通用修复可以回合到 `main`；包含客户名称、域名、业务表、页面文案或专属部署资源的改动留在项目分支。

## 4. 环境边界

保留 Local、Preview 和 Production。Local 不得默认连接远程资源。Worker、D1、Secret、OAuth、DNS 和邮件配置必须使用项目自己的名称，并获得具体环境授权后才能修改。

现有 `wrangler.toml` 中的旧远程资源标识暂时保留，以避免一次文档改名意外修改已部署资源；新项目必须在自己的分支明确迁移计划。

## 5. 文档与分支

`main` 维护基础愿景、规格、架构和任务。`project/<name>` 维护业务规格和实施计划。`archive/<name>-<date>` 只保存历史快照，不继续开发。
