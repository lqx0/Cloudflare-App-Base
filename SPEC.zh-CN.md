# Cloudflare-Ankit 产品规格

## 1. 目的

本文档定义 Cloudflare-Ankit 第一阶段已批准范围。

Cloudflare-Ankit 和 `fitoa.net` 都是临时开发标识。正式企业身份、文案、品牌、产品和服务仍未确定。

## 2. 项目基础

使用 `lqx0/cloudflare-fullstack-starter`。

默认保留 Starter 已经正常工作的实现。只有发生重大需求冲突、安全或隐私问题、交付阻碍，或用户明确要求时才修改。

## 3. 第一阶段目标

第一阶段必须提供：

1. 简单专业的企业网站。
2. 公开企业信息页面。
3. 产品或服务展示。
4. 邮箱密码注册和登录。
5. 使用 Starter 现有集成支持 Google 登录。
6. 受保护账户区域。
7. 基础资料查看和修改。
8. Privacy 和 Terms。
9. 基础 SEO。
10. 响应式和无障碍展示。
11. 为未来网店扩展保留清晰路径。
12. 不依赖未经许可远程修改的本地开发。

## 4. 非目标

不得实现商品管理、购物车、结账、支付、订单、库存、配送、预约、商家后台、用户列表后台、数据导出、多租户、Astro 或提前建立网店数据模型。

## 5. 公开页面

初始路由：

- Home
- About
- Products 或 Services
- 可选详情页
- Contact
- Login
- Register
- Account/Profile
- Privacy
- Terms
- Not Found

客户提供最终内容前，使用简单临时 Cloudflare-Ankit 内容。

不得编造推荐语、奖项、认证、客户数量、保证、价格、地址或法律声明。

## 6. 身份验证

### 邮箱密码

保留 Starter 的 Better Auth、密码哈希、Session、受保护路由、密码重置 Hook 和验证链接 Hook。

邮箱作为唯一用户身份。

### 邮箱验证

- 初始本地开发不要求邮件 Provider。
- 未配置邮件时保留 Starter 条件式行为。
- 以后配置 Provider 时使用现有验证链接。
- 第一阶段不实现数字 OTP。

### Google OAuth

- 保留现有集成。
- 只有存在有效凭据时启用。
- 缺少凭据不能影响邮箱密码登录。
- 未经明确批准不得创建 Google OAuth Client。
- 不自定义不安全账户关联。

### 删除账户

- 保留底层删除和管理员/CLI 能力。
- 第一阶段隐藏或禁用普通用户删除账户操作。
- 未经明确授权不得删除用户。

## 7. 用户资料

最少资料：

- 姓名
- 邮箱
- 可选头像
- 验证状态
- 创建和更新时间

推荐初始可编辑字段：姓名。

现有邮箱和密码修改如果正常，可以保留，但不要无必要扩展。

## 8. 数据保留和管理

账户资料保存到授权删除、有效隐私或法律请求，或者批准的政策变更。

第一阶段不包含网页用户列表、导出、公开查询或管理后台。

保留 CLI 管理，但未经批准不得执行远程命令。

## 9. SEO

每个公开页面应支持 Title、Description、Canonical、Open Graph、社交图片、语义标题、Alt、站内链接、`robots.txt`、`sitemap.xml` 和正确 Not Found。

不添加不准确结构化数据。

第一阶段保留 React/Vite，并诚实记录 SPA 限制。

## 10. 域名和邮箱

临时域名：`fitoa.net`。

推荐规范 URL：`https://fitoa.net`。

未来把 `https://www.fitoa.net` 重定向到 `https://fitoa.net`。

期望企业邮箱：`info@fitoa.net`。

先评估 Zoho Mail 免费自定义域名。Cloudflare Email Routing 只作为收件转发备选。未经批准不得配置 DNS 或邮箱。

## 11. 远程规则

保留已有远程脚本，但任何部署、远程 D1、远程迁移、Secret 同步、OAuth、DNS、邮箱、付费资源或破坏性操作都必须先获得明确批准。

Codex 第一次执行只限本地。

## 12. 文档

维护：

```text
README.md / README.zh-CN.md
SPEC.md / SPEC.zh-CN.md
ARCHITECTURE.md / ARCHITECTURE.zh-CN.md
TASKS.md / TASKS.zh-CN.md
AGENTS.md / AGENTS.zh-CN.md
```

先确认中文语义，再同步英文。不要在公开文档中加入语言优先级声明。

## 13. 第一次执行验收

Codex 第一次执行完成条件：已检查仓库、理解 Starter、本地文档配对存在、依赖可安装、本地设置已验证、现有认证已测试、已运行 lint/build/check、未修改远程资源，并报告下一项本地任务。
