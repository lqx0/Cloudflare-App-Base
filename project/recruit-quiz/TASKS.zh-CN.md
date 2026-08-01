# aDaptQuiz 任务

状态：`[ ]` 未开始，`[-]` 进行中，`[x]` 已完成，`[!]` 阻塞。

## 需求与设计

- [x] 从 `main` 基线 `1b094d6` 建立隔离项目分支。
- [x] 完整阅读 AGENTS 和五组中英文基础文档。
- [x] 确认英文界面、产品名、题型、隐私、管理员和邮件边界。
- [x] 比较架构方案并选择 D1 题库 + React 内存答题状态。
- [x] 确认页面、API、数据、邮件、安全和测试设计。
- [x] 完成中英文项目文档和正式设计规格。
- [x] 用户批准书面规格。
- [x] 编写并批准 TDD 实施计划。

## 当前版本实施

- [x] 用失败测试定义 aDaptQuiz 身份、职位内容和正式版提示。
- [x] 新增 `quiz_questions` 本地迁移和 Kysely 类型。
- [x] 实现题型 Schema 和长度验证。
- [x] 实现服务端管理员角色中间件。
- [x] 实现管理员新增和查看题库 API。
- [x] 实现管理员题库页面及正式版提示。
- [x] 实现题库状态和三类型随机组卷 API。
- [x] 实现英文测试开始和作答页面。
- [x] 实现即时提交、权威答案和问答参考指导。
- [x] 实现真正可用的新一轮。
- [x] 扩展邮件 Adapter 支持 HTML 和纯文本通用发送。
- [x] 实现 Resend 答卷邮件模板和发送 API。
- [x] 实现发送确认、成功、失败和未配置状态。
- [x] 实现管理员答卷邮箱提示页。
- [x] 更新 Privacy、导航、SEO 和认证条件显示。

## 验证

- [x] 运行所有聚焦测试。
- [x] 运行完整 TypeScript 测试。
- [x] 运行 Lint。
- [x] 运行 TypeScript 类型检查。
- [x] 运行 Build。
- [x] 运行 `git diff --check` 并审查 Git 差异。
- [x] 记录本地与远程验证结果及仍未执行的边界。

## 正式版本提示，不在当前版本实施

- [ ] 保存和查看用户自己的测试历史。
- [ ] 管理员后台查看用户主动发送的答卷。
- [ ] 题目编辑、删除和停用。
- [ ] 管理员 UI 设置答卷接收邮箱。

## 远程启用，必须另行授权

- [x] 将唯一远程测试目标配置为 `adaptquiz`，记录其 D1 ID，选择 Resend，并保留 fail-closed 远程前置门禁。
- [x] 创建远程 `adaptquiz` D1，并在备份后应用全部项目迁移。
- [x] 创建或配置 Resend 账户和仅发送权限的受限 API Key。
- [x] 为 `mail.fitoa.net` 配置 Resend DNS，并以 `quiz@mail.fitoa.net` 成功投递验证域名邮件链路。
- [x] 配置目标环境发件地址、`daxuyouran@gmail.com` 收件地址及所需 Secret。
- [x] 部署唯一 `adaptquiz` 测试 Worker 到 `https://adaptquiz.tom0.workers.dev`。
- [x] 将 `lqixv@hotmail.com` 设置为远程管理员，录入三类题目，并完成登录、答题、提交、新一轮和主动发送副本的浏览器端到端验证。
- [x] 确认真实答卷副本送达，并将邮件中的答题人标签修正为 `Quiz taker's answer`。
- [x] 推送 `project/adapt-quiz`，并停用远程 `project/recruit-quiz` 分支。
- [!] 将误部署的 `cloudflare-app-base` Worker 从版本 `bddedbcc-d2f8-422a-bbe6-cc4fcab8167c` 回滚到原版本 `bcd57414-5aee-4144-8c73-911ccffc73b1`；等待单独的破坏性远程操作授权。

当前远程配置边界：

- `.env.preview` 使用 `https://adaptquiz.tom0.workers.dev` 作为 `APP_BASE_URL`／`CLI_API_URL_PREVIEW`，并保持 Git 忽略；
- `EMAIL_API_KEY`、`RECRUIT_QUIZ_RECIPIENT_EMAIL`、`CLI_API_KEY` 和 `BETTER_AUTH_SECRET` 已同步到 `adaptquiz`；
- Google OAuth 凭据仍未配置，Preview 邮箱验证邮件仍保持关闭。
