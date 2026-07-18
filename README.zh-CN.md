# Cloudflare-Ankit

Cloudflare-Ankit 是本项目的临时名称。项目是一个托管在 Cloudflare 上、包含用户账户功能的企业网站。客户正式企业名称、品牌和业务内容确定后，再替换当前内容。

## SEO 限制

本 React/Vite 应用在 JavaScript 运行后才更新路由元数据。未执行 JavaScript 的爬虫可能只能看到初始 HTML；以后只在有证据和授权时再评估 SSR 或预渲染。

- 开发域名：`fitoa.net`
- 域名注册商：GoDaddy
- 项目基础：`https://github.com/lqx0/cloudflare-fullstack-starter`

## 优先保留原则

以 Starter 为基线。只要原有实现没有与已批准需求发生重大冲突、没有安全或隐私问题、不妨碍第一阶段交付，也没有用户明确要求，就应保留其原始工作方式。

不要因为远程操作当前需要许可，就删除已有部署、远程数据库、备份、恢复、OAuth、邮件、CLI 或 Secret 管理能力。

## 第一阶段

第一阶段包括：

- 企业首页
- About 页面
- 产品或服务展示
- 联系方式
- 邮箱密码注册和登录
- Google 登录能力
- 受保护的 Account/Profile 页面
- 基础资料修改
- Privacy Policy
- Terms and Conditions
- 基础 SEO
- 响应式设计
- 本地开发和部署准备

第一阶段不包括：

- 购物车、结账、支付
- 订单、库存、配送
- 商品管理
- 商家后台或用户管理后台
- 用户数据导出界面
- 预约
- 多租户
- Astro 或第二套前端

## Starter 现有技术

保留 Starter 现有技术栈和工具：

- React、TypeScript、Vite、React Router
- Tailwind CSS 和 shadcn/ui
- 运行于 Cloudflare Workers 的 Hono
- Cloudflare D1
- Kysely
- Better Auth
- 邮箱密码认证
- 邮件验证链接和密码重置 Hook
- Google OAuth 支持
- Local、Preview 和 Production 环境
- 数据库迁移、备份、恢复、Seed 和 Time Travel
- CLI 用户管理
- Cloudflare Binding 类型生成
- 部署和 Secret 同步脚本

Starter 当前要求 Node.js `>=22.15.0 <23`。

## 身份验证规则

- 保留现有 Better Auth 实现。
- 保留邮箱密码注册和登录。
- 保留安全 Session 和受保护路由。
- 保留 Google OAuth，但未经许可不得创建凭据。
- 保留验证链接和密码重置能力。
- 第一阶段不把验证链接改成自定义数字验证码。
- 未配置邮件服务时，保留 Starter 当前本地和开发行为。
- 保留账户删除底层实现和 CLI 能力，但第一阶段隐藏或禁用普通用户可见的删除账户入口。
- 未经明确授权不得删除用户。

## 用户数据

只收集最少账户资料：

- 姓名
- 邮箱
- 可选头像
- 邮箱验证状态
- 创建和更新时间

不得添加住址、出生日期、身份证明、支付数据或其他敏感资料。

邮箱作为唯一账户身份。

账户资料无限期保存，直到授权管理员删除、响应有效法律或隐私请求而删除，或者未来数据保留政策改变。

第一阶段不包含网页用户列表或数据导出界面。

## 路由

推荐路由：

```text
/
about
products
products/:slug
contact
login
register
account
privacy
terms
api/*
```

规范生产域名：

```text
https://fitoa.net
```

远程配置获得批准后，应把 `www.fitoa.net` 永久重定向到 `fitoa.net`。

## SEO

公开页面应支持：

- 每页独立标题和描述
- Canonical URL
- Open Graph
- 社交预览图片
- `robots.txt`
- `sitemap.xml`
- 语义化 HTML
- 合理标题层级
- 图片 Alt
- 站内链接
- 正确的 404/noindex 行为

不得编造最终企业宣传内容或结构化数据事实。

第一阶段保留 React/Vite。没有真实证据前不引入 Astro。

## 域名邮箱

期望地址：

```text
info@fitoa.net
```

推荐方式：

1. 先确认 Zoho Mail 免费自定义域名方案是否可用和合适。
2. 可用且获批时，作为 `info@fitoa.net` 正常收发的完整邮箱。
3. 否则 Cloudflare Email Routing 只作为免费收件转发备选。
4. Gmail 或 Outlook.com 可以接收转发邮件，但其本身不是完整自定义域名邮箱。
5. 未经明确批准不得配置邮箱或 DNS。

认证邮件和人工企业邮箱是不同需求。保留 Starter 现有邮件 Provider Adapter。

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

运行 `npm run init` 前先审查初始化问题。Codex 第一次执行只使用本地资源。

## 远程操作限制

未经针对具体操作的明确批准，不得：

- 部署 Preview 或 Production
- 创建或修改远程 Worker 或 D1
- 应用 Preview 或 Production 迁移
- 同步远程 Secret
- 创建 Google OAuth 凭据
- 修改 GoDaddy Nameserver 或 Cloudflare DNS
- 配置域名邮箱
- 创建付费资源
- 删除远程资源

保留已有能力不等于获得执行授权。

## 文档

默认 Markdown 文件名使用英文：

- `README.md`
- `SPEC.md`
- `ARCHITECTURE.md`
- `TASKS.md`
- `AGENTS.md`

中文配套文件使用 `.zh-CN.md`。

两种语言必须同步维护。内部规则是先确认中文语义，再同步英文。不要在公开文档正文中加入语言优先级声明。

## 许可证

上游 Starter 使用 MIT 许可证。发布源码或主要副本时，应保留许可证要求的版权和许可声明。无需在网站前端显示作者署名。
