# Cloudflare-Ankit 架构说明

## 1. 基线

Cloudflare-Ankit 基于 `lqx0/cloudflare-fullstack-starter`。

应遵循 Starter 架构，而不是替换它。

当前基线：

- React 19、TypeScript、Vite、React Router
- Tailwind CSS、shadcn/ui
- Hono、Cloudflare Workers、Cloudflare Vite Plugin
- Cloudflare D1
- Kysely 和 `kysely-d1`
- Better Auth 和 bcryptjs
- 邮件 Provider Adapter
- Wrangler 和多环境工具
- Node.js `>=22.15.0 <23`

## 2. 高层设计

```text
浏览器
  |
  v
Cloudflare Worker + Static Assets
  |
  +-- React 公开页面
  +-- React 登录后账户页面
  +-- Hono /api/*
          |
          +-- Better Auth
          +-- Auth Middleware
          +-- Kysely
          +-- D1
          +-- 可选邮件 Adapter
```

使用单应用和同源路由。

第一阶段不拆分公开网站和账户应用。

## 3. 优先保留流程

1. 运行并理解原始 Starter。
2. 记录正常行为。
3. 适当时创建基线 Commit 或 Tag。
4. 进行聚焦修改。
5. 不因为功能当前隐藏就删除正常功能。
6. 没有证据时不重写 Auth 或数据库基础设施。

## 4. 前端边界

先遵循当前结构。只有真实代码需要时才增加 Feature 目录。

可能方向：

```text
src/react-app/
├── app/
├── features/
│   ├── public-site/
│   ├── auth/
│   ├── account/
│   └── products/
├── shared/
└── main.tsx
```

Public Site：Home、About、Products/Services、Contact、Privacy、Terms、SEO、导航、页脚。

Auth：注册、登录、可选 Google 按钮、密码重置、验证链接 UI、路由保护。

Account：资料展示和安全修改。隐藏或禁用第一阶段删除账户入口。

## 5. Worker 边界

保留 Starter 的 Hono 和 Better Auth 集成。

只有真实复杂度需要时才拆分 Route、Service、Repository、Schema。

第一次设置不要进行无关重构。

## 6. 认证流程

邮箱密码：

```text
凭据 -> Better Auth -> 哈希/验证 -> D1 -> Session Cookie -> Account
```

Google：

```text
选择 Google -> Better Auth Provider -> Callback -> 创建/关联账户 -> Session
```

验证：

```text
无邮件服务 -> 保留 Starter 本地回退
已配置邮件 -> 现有验证 URL -> 邮件 Adapter -> 账户验证
```

第一阶段不把验证链接改成数字 OTP。

## 7. 数据库

保留 Starter Better Auth 表和迁移。

典型模型：

- users
- accounts
- sessions
- verifications

邮箱作为账户身份唯一。

不创建独立 `registrations` 表。

不添加产品、订单、库存、支付或地址模型。

## 8. CLI 和管理

保留现有用户和数据库 CLI，包括列表、查看、创建、修改、角色、删除、迁移、备份、恢复、Seed 和 Time Travel。

不得削弱 CLI 认证。

未经批准不得执行远程命令。

第一阶段不添加网页管理后台。

## 9. SEO

保留 React/Vite。

使用 Starter 兼容的最简单路由元数据或构建时方式。关键元数据不能依赖延迟 API。

第一阶段不引入 Astro、Next.js 或第二个应用。

## 10. 邮件

人工企业邮箱和认证邮件是两个问题。

- 人工邮箱：优先评估 Zoho Mail 免费自定义域名。
- 收件转发备选：Cloudflare Email Routing。
- 认证邮件：保留 Starter Adapter，Provider 获批后再启用。

## 11. 环境

保留 Local、Preview、Production，以及支持时的 Test。

本地不得默认连接生产资源。

Codex 第一次执行只限本地。

## 12. 文档流程

英文默认文件和中文配套文件结构保持一致。

流程：

1. 先确认中文语义。
2. 更新中文。
3. 同步英文。
4. 检查语义一致。
5. 不在公开文档中加入语言优先级声明。

## 13. 未来扩展

以后确有需要时可以加入产品模型、R2 图片、购物车、结账、支付、Webhook、订单、库存、商家后台、Queues 或 Durable Objects。

第一阶段不得提前实现。
