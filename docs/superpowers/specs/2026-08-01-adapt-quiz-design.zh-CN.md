# aDaptQuiz 设计规格

日期：2026-08-01

分支：`project/recruit-quiz`

基线：`1b094d6`

## 1. 设计目标

在 Cloudflare App Base 上制作英文界面的 `aDaptQuiz` prototype：管理员维护三类题库，登录用户每轮随机完成三题、立即查看权威答案，并可主动通过 Resend 把本轮副本发送到管理员邮箱。自测答案不持久化，未主动发送时管理员不可见。

详细需求以 [项目规格](../../../project/recruit-quiz/SPEC.zh-CN.md) 为准。

## 2. 已比较方案

### 方案 A：D1 题库 + React 内存答题状态（采用）

D1 只保存题库。Worker 随机出题和返回权威答案，React 只在当前页面保存本轮。主动发送时 Worker 重新读取题目和 Session 身份。

优点：最符合隐私要求、改动小、边界清楚、容易测试。缺点：刷新即丢失；网络重试不能保证邮件严格只发送一次。两项均已明确接受并在 UI 提示。

### 方案 B：签名的无状态测试令牌（不采用）

用签名令牌绑定题目、用户和有效期。可提高请求防篡改能力，但需要新增签名密钥、过期和错误处理，对三题自测 prototype 复杂度过高。

### 方案 C：D1 保存 attempt 和 answer（不采用）

有利于未来历史和后台答卷，但直接违反当前版本“不持久化纯自测”的边界，并引入保留、清理和授权复杂度。

## 3. 需求矩阵

| 当前版本实现 | 只提示正式版本 | 明确不做 |
|---|---|---|
| 英文首页、职位来源、prototype 声明 | 用户测试历史 | 独立账户系统 |
| Better Auth 邮箱认证和条件式 Google OAuth | 后台查看主动发送答卷 | 自动发送纯自测 |
| 管理员新增和查看三种题型 | 题目编辑、删除、停用 | AI/人工自动评分 |
| 每轮三种题型各一题 | 管理员 UI 配置收件邮箱 | attempt/answer/history 表 |
| 即时答案和真实新一轮 | — | 复杂考试、反作弊和推测功能 |
| 主动确认后 Resend 发送 | — | 当前任务的远程配置和部署 |
| 管理员邮箱查看提示页 | — | 当前版后台答卷列表 |

## 4. 页面和流程

共享 `SiteLayout` 保持现有主要视觉。公开导航包含 Home 和 Quiz；管理员额外看到 Question Bank 与 Submitted Copies。

`/quiz` 使用局部状态：Introduction → Loading → Answering → Submitting → Results → Sending/Success/Error。提交后答案锁定，结果页不显示总分，只保留 `Send a copy` 和 `Start a new quiz`。

`/admin/questions` 包含新增表单和只读列表，不渲染编辑、删除或停用控件。`/admin/submissions` 只说明当前到配置邮箱查看主动发送答卷，以及正式版本将提供后台列表。

## 5. 数据与 API

唯一业务表为 `quiz_questions(id, type, prompt, optionsJson, correctAnswer, createdByUserId, createdAt)`。

API：

- `GET /api/quiz/status`
- `POST /api/quiz/round`
- `POST /api/quiz/submit`
- `POST /api/quiz/send-copy`
- `GET /api/admin/questions`
- `POST /api/admin/questions`

开始接口绝不返回答案。提交和发送接口都根据 ID 重新读取 D1。客户端不能指定身份、收件人、发件人或正确答案。

## 6. 模块边界

前端拆分 `QuizPage`、`QuizIntroduction`、`QuizQuestionCard`、`QuizResults`、`SendQuizCopyDialog`、`QuestionBankPage`、`QuestionForm`、`QuestionList`、`AdminSubmissionsNotice` 和两个 API client。

Worker 拆分 quiz routes、admin routes、schema、repository、service、email 和 admin middleware。repository 是题库 D1 访问的唯一边界；email 单元负责转义后的 HTML/纯文本和 Provider 调用。

## 7. 邮件

首选仓库现有 Resend Provider，建议 `aDaptQuiz <quiz@mail.fitoa.net>`，管理员地址来自 `RECRUIT_QUIZ_RECIPIENT_EMAIL`。只有 Provider、API Key、非占位发件地址、收件地址全部配置时前端才显示可用。

邮件发送前列出将披露的信息。邮件包括 Session 用户身份、NZ/明确时区的发送时间、三题、用户答案和权威答案，并声明由用户主动发送。日志不记录内容。

GoDaddy DNS、Resend API Key、Secret 和真实发送属于后续独立授权。

## 8. 安全、隐私和错误

quiz API 要求 Session；admin API 再查询 `users.role`。题型、数量、字符串长度和选择项均由服务端验证。HTML 邮件必须转义所有动态文本。

题库不足时阻止开始；Session 失效不提交或发送；题目失效提示重新开始；邮件未配置时禁用发送；Provider 失败保留结果并允许重试。任何失败均不得显示虚假成功。

## 9. TDD 与验收

每项行为先写失败测试、确认预期失败、写最小实现、确认通过，再提交。测试覆盖身份内容、OAuth 条件、迁移和 Schema、管理员权限、三类题型、随机组卷、答案不提前泄露、不持久化、真实新一轮、主动发送门槛、服务端权威数据、转义邮件、配置降级、正式版提示和现有回归。

最终运行聚焦测试、完整测试、Lint、类型检查、Build 和 `git diff --check`。没有真实 DNS/Secret/部署授权时，不声称真实邮件或远程环境已经验证。

## 10. 范围和授权

不修改 `main`、`legacy/cloudflare-ankit` 或任何远程 Worker/D1。保留 Cloudflare Email binding 和全部基础运维能力。未经独立明确授权，不执行部署、远程迁移、Secret、OAuth、DNS、邮件、付费资源或推送。
