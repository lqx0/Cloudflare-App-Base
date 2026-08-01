# aDaptQuiz 架构

## 1. 高层设计

```text
浏览器 React/Vite
  |-- 公开首页与 Better Auth 页面
  |-- /quiz 页面内存状态
  |-- /admin/questions
  `-- /admin/submissions 提示页
          |
          v
Hono Worker /api/*
  |-- Better Auth Session
  |-- Admin Role Middleware
  |-- Quiz Routes / Service
  |-- Question Repository --> D1 quiz_questions
  `-- Quiz Email Service --> Resend
```

前端不得直接访问 D1。所有题库、判题、权限和邮件行为都通过同源 Worker API。

## 2. 数据边界

D1 只新增 `quiz_questions`：

- `id`
- `type`: `multiple_choice | true_false | free_text`
- `prompt`
- `optionsJson`: 仅选择题使用
- `correctAnswer`: 正确答案或问答题参考指导
- `createdByUserId`
- `createdAt`

当前版本不创建 attempt、answer、history 或 email submission 表。React 页面状态保存当前问题、用户答案、提交结果和发送状态；刷新或离开页面即丢失。

## 3. 前端单元

- `QuizPage`：状态机与流程容器。
- `QuizIntroduction`：测试、隐私和正式版本说明。
- `QuizQuestionCard`：三种题型输入。
- `QuizResults`：用户答案和权威答案。
- `SendQuizCopyDialog`：披露确认和发送状态。
- `QuestionBankPage`：管理员页面容器。
- `QuestionForm`：题型相关新增表单。
- `QuestionList`：只读题库列表。
- `AdminSubmissionsNotice`：邮箱查看与正式版本提示。
- `quiz-api.ts`、`admin-questions-api.ts`：前端 API 边界。

不增加全局状态库。页面使用局部 React 状态。

## 4. Worker 单元

- `quiz/routes.ts`：状态、开始、提交和发送 API。
- `quiz/admin-routes.ts`：管理员题库 API。
- `quiz/schema.ts`：输入、题型和长度校验。
- `quiz/repository.ts`：唯一 D1 题库访问层。
- `quiz/service.ts`：随机组卷和结果组装。
- `quiz/email.ts`：HTML/纯文本模板及 Provider 调用。
- `middleware/admin.ts`：根据 Session 用户 ID 查询 `users.role`。

## 5. API

- `GET /api/quiz/status`：题库完整性和邮件可用状态。
- `POST /api/quiz/round`：每种题型随机返回一题，不返回答案。
- `POST /api/quiz/submit`：重新读取三题并返回权威答案，不持久化。
- `POST /api/quiz/send-copy`：重新读取题目和 Session 身份后主动发送，不持久化。
- `GET /api/admin/questions`：管理员只读列表。
- `POST /api/admin/questions`：管理员校验后新增。

## 6. 数据流

开始：Session → 检查三种题型 → D1 分别随机选题 → 返回不含答案的三题 → React 内存。

提交：题目 ID + 用户答案 → Session → D1 重新读取 → 验证恰好三种题型 → 返回权威答案 → 不写 D1。

发送：明确确认 → Session 身份 → D1 权威题目和答案 → 转义 HTML + 纯文本 → Resend → 返回真实结果 → 不写 D1。

## 7. 邮件

首选现有 Resend Provider：

- `EMAIL_PROVIDER=resend`
- `EMAIL_API_KEY` Secret
- 建议发件地址 `aDaptQuiz <quiz@mail.fitoa.net>`
- `RECRUIT_QUIZ_RECIPIENT_EMAIL`

只有全部配置可用时，`status` 才返回邮件可用。前端不获取地址或 Secret。Cloudflare Email binding 继续保留。

## 8. 安全和隐私

- 所有 quiz API 要求 Better Auth Session。
- 所有 admin API 额外要求服务端 `admin` 角色检查。
- 服务端忽略客户端身份、收件人、发件人和正确答案。
- 用户和题库文本在进入 HTML 邮件前必须转义。
- 日志不得包含身份、题目或答案。
- Provider 错误映射为通用响应。
- 当前产品是自测工具，不增加签名 attempt、防切屏、倒计时或复杂反作弊。

## 9. 失败处理

- 题库不足：禁止开始并列出缺失题型。
- Session 失效：不提交、不发送，要求登录。
- 题目不存在或题型组合错误：保留页面输入并提示重新开始。
- 邮件未配置：禁用发送，但允许新一轮。
- Provider 失败：保留结果，允许重试或新一轮。
- 普通用户访问管理员 API：`403`。

## 10. 环境边界

本地实现和测试不得默认连接远程资源。GoDaddy DNS、Resend、远程 Secret 和部署需要后续独立授权。不得修改 legacy Worker/D1。

唯一远程环境是非正式上线的测试环境。仓库脚本仍使用 `preview` 作为命令标签，但不会另建 Production 资源：

- Worker 名称：`adaptquiz`；
- D1 名称：`adaptquiz`；
- 邮件 Provider：`resend`；
- D1 ID：`62af6701-0b32-48b8-a176-c8112de967f7`；
- 应用 URL：`https://adaptquiz.lqixv.workers.dev`。

`bin/preview-remote-config.ts` 继续作为 fail-closed 前置门禁。D1 ID 不是实际 UUID、URL 不是 `adaptquiz.<account>.workers.dev`，或配置重新引用共享基础资源时，远程测试部署、Secret 同步和 D1 命令都会在调用 Wrangler 前停止。仓库中的 Production 占位配置明确不使用，Production 命令不在本项目范围内。
