# Cloudflare-Ankit 公开网站框架实施计划

> **供代理执行：** 按任务逐项内联实施，并在每项完成后进行聚焦审查。

**目标：** 在只限本地的前提下完成里程碑 2 的公开网站框架，同时不删除或削弱 Starter 的认证与远程工具能力。

**架构：** 保留现有 React Router 应用与 Better Auth 路由。新增公开页面组件和共享公开布局；现有登录后的 TopBar/Profile 流程保持不变。

**技术栈：** React 19、TypeScript、React Router、Tailwind CSS、shadcn/ui、现有 Vite/Hono Starter。

## 全局约束

- 不部署，也不修改 Cloudflare、D1、OAuth、DNS、GoDaddy 或邮箱配置。
- 保留现有 Better Auth、CLI、迁移、备份和部署代码。
- 可见临时品牌使用 Cloudflare-Ankit；`fitoa.net` 仅作为已经确认的开发域名引用。
- 不编造业务承诺、定价、推荐语、法律主体、联系方式或其他事实。
- 文档修改时，同步维护中英文项目资料；中文语义为审核依据。

---

### 任务 1：建立公开路由与布局

**文件：**
- 新建：`src/react-app/components/PublicLayout.tsx`
- 修改：`src/react-app/App.tsx`

- [ ] 为 `/`、`/about`、`/services`、`/contact`、`/privacy`、`/terms`、`/login`、`/signup` 与 `/account` 建立公开或既有认证布局路由。
- [ ] 在专门里程碑开始前，保留 `/profile`、密码重置、邮箱验证、API 与通配路由现有行为。
- [ ] 使用 `npm run build` 验证。

### 任务 2：添加临时公开页面

**文件：**
- 新建：`src/react-app/pages/public/{Home,About,Services,Contact,Privacy,Terms,NotFound}.tsx`

- [ ] 添加无障碍标题、简洁的临时文案和明确的站内导航链接。
- [ ] 不写入超出已批准范围的业务声明。
- [ ] 使用本地 Vite/Worker 服务验证公开路由。

### 任务 3：保留 Starter 账户入口

**文件：**
- 仅在确有需要时修改：`src/react-app/components/TopBar.tsx`
- 修改：`src/react-app/App.tsx`

- [ ] 保留邮箱密码认证、资料修改、退出登录、Google 配置与受保护路由。
- [ ] 将 Account 链接指向既有受保护资料路由。
- [ ] 重新运行本地邮箱密码与受保护路由检查。

### 任务 4：记录完成状态并验证

**文件：**
- 修改：`TASKS.zh-CN.md`
- 修改：`TASKS.md`

- [ ] 仅将已验证的里程碑 2 项目标记为完成。
- [ ] 运行 `npm run lint`、`npm run build` 和 `npm run check`。
- [ ] 检查 `git diff --check`，并报告保留的警告或偏离。
