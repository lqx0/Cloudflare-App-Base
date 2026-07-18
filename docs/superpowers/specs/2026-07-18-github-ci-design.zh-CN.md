# GitHub CI 基础设计

添加最小 GitHub Actions 工作流，在 push 到 `main` 和 pull request 时使用 Node 22 运行 `npm ci`、项目聚焦测试、`npm run lint` 与 `npm run build`。

不运行 `npm run check`，因为它包含 Wrangler dry-run；工作流不部署、不需要 Cloudflare 凭据、不读取 Secret、不访问 D1。

工作流只验证可重复的本地构建质量，保留现有部署脚本供以后获得明确授权后使用。
