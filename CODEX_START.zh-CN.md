# Codex 启动指令

使用以下项目创建你自己的项目仓库后，再使用本指令：

```text
https://github.com/lqx0/cloudflare-fullstack-starter
```

除非明确把上游仓库本身作为项目仓库，否则不要直接在上游 Starter 仓库中开发。

## 给 Codex 的提示词

你现在开始 Cloudflare-Ankit 项目。

首先阅读：

1. `AGENTS.zh-CN.md`
2. `AGENTS.md`
3. `SPEC.zh-CN.md`
4. `SPEC.md`
5. `ARCHITECTURE.zh-CN.md`
6. `ARCHITECTURE.md`
7. `TASKS.zh-CN.md`
8. `TASKS.md`
9. `README.zh-CN.md`
10. `README.md`
11. Starter 原始安装、README 和 Agent 文档

规则：

- 只要没有重大冲突、安全或隐私问题、交付阻碍或明确要求，就保留 Starter 正常行为。
- 不要因为暂时禁止执行，就删除远程功能。
- 第一次执行只限本地。
- 不要部署或修改远程 Cloudflare。
- 不要运行 Preview/Production 迁移或同步远程 Secret。
- 不要创建 Google OAuth 凭据。
- 不要修改 GoDaddy 或 Cloudflare DNS。
- 不要配置域名邮箱。
- 不要创建付费资源。
- 不要实现第二阶段或网店。
- 中英文文档必须同步。
- 先确认中文语义，再同步英文。

只完成里程碑 0 和 1。

修改代码前：

1. 输出目录树，排除依赖和构建目录。
2. 显示 Git 状态、当前分支和 Remote。
3. 判断是干净 Starter、Template 生成还是已修改仓库。
4. 阅读包脚本、Node 要求、锁文件、Cloudflare、迁移、Better Auth、邮件 Adapter、CLI 和现有文档。
5. 识别仓库与项目文档差异。
6. 谨慎合并，不盲目覆盖。

允许本地工作：

- 安装依赖
- 审查并运行本地初始化
- 创建仅本地环境文件和 Secret
- 应用本地 D1 迁移
- 启动本地应用
- 验证邮箱密码注册、登录、退出、受保护路由和资料修改
- 确认缺少凭据时 Google OAuth 可选
- 确认邮箱验证根据邮件 Provider 条件启用
- 运行 `npm run lint`、`npm run build`、`npm run check`
- 根据已验证事实更新配套文档

里程碑 1 后停止并报告：

- 仓库状态
- 已阅读和修改文件
- 已确认 Starter 功能
- 包管理器和 Node 版本
- 运行命令
- 迁移、开发服务器、认证、Lint、Build、Check 结果
- 确认没有远程操作
- 冲突或偏离
- 下一项未完成任务

未经明确指令不得继续。
