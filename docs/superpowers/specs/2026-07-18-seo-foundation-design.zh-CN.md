# 里程碑 5：SEO 基础设计

## 目的

为 Cloudflare-Ankit 的公开页面提供适合当前 React/Vite SPA 的基础 SEO 元数据和可爬取静态入口；不引入 Astro、SSR 或未经确认的业务声明。

## 临时域名规则

- 开发阶段规范根地址为 `https://fitoa.net`。
- 公开路由的 canonical 使用该根地址加路径。
- `www` 重定向属于未来远程 DNS/Cloudflare 配置，本里程碑不执行。

## 页面元数据

- 新增一个纯前端 SEO 路由元数据模块，按 pathname 定义英文 title、description、canonical path 和索引状态。
- 公开可索引路由：`/`、`/about`、`/services`、`/contact`、`/privacy`、`/terms`。
- 登录、注册、账户、资料、验证、重置密码和 Not Found 使用 `noindex`。
- 每次路由改变时更新 document title、description、canonical、Open Graph 和 robots meta 标签。
- 描述只使用已经确认的临时项目事实，不编造服务、价格、地点、客户或法律承诺。

## 静态搜索入口

- 添加 `public/robots.txt`，允许公开页面抓取并声明 sitemap 地址。
- 添加 `public/sitemap.xml`，仅列出六个公开可索引页面。
- 添加本地静态 Open Graph 样本图片：简洁 Cloudflare-Ankit 文字品牌图，不含业务宣传内容。

## 可访问性与站内结构

- 保留已存在的语义 `h1`、站内导航、页脚链接和 Not Found 行为。
- 不额外添加无内容的图片；社交图只供元数据引用。

## SPA 限制

在 README 和架构文档中说明：客户端在运行后才写入路由元数据，依赖未执行 JavaScript 的爬虫可能只看到初始 HTML；以后如果搜索引擎表现需要更强保障，再在有证据和授权时评估 SSR/预渲染。

## 验证

- 为路由元数据模块添加测试，覆盖首页 canonical、公开页索引和账户/Not Found 的 noindex。
- 运行 lint、build、既有测试和 `npm run check`（仅 dry-run）。
- 本地请求公开页面并确认 HTTP 200；不部署。
