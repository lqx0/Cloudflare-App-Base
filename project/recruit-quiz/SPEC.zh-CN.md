# aDaptQuiz 产品规格

状态：已确认需求草案。本文档只记录截至 2026-08-01 已经确认的产品需求；页面视觉细节、最终架构文档和实施计划仍需后续确认。

## 1. 产品目的

`aDaptQuiz` 是依据 aDapt Family Solutions Ltd 在 SJS 发布的 `Computer Tech (online forms)` 职位需求制作的英文界面 prototype。网站必须清楚说明其来源和 prototype 身份，不得暗示这是 aDapt Family Solutions Ltd 已正式发布或认可的产品。

来源：[SJS job listing](https://www.sjs.co.nz/job-details/2304/computer-tech-online-forms-3628)

职位背景：

- 公司：aDapt Family Solutions Ltd
- 职位：Computer Tech (online forms)
- 地点：Karioitahi, Auckland
- 薪资：$30/hour
- 类型：one-off
- 开始日期：28 Jul 2026
- 工时：18 hours/week
- 工作方式：work from home
- 后续：可能有后续工作，完成日期可讨论
- Reference：TECH001
- 分类：ICT
- 发布日期：28 Jul 2026
- 截止日期：27 Aug 2026

## 2. 产品与语言

- 产品名：`aDaptQuiz`。
- 所有用户界面只使用英文。
- 项目文档继续遵循仓库的中英文配套规则。
- 保持 Cloudflare App Base 的主要视觉设计、共享布局和 React/Vite + Hono Worker 架构。

## 3. 用户和认证

- 继续使用现有 Better Auth 账户模型、邮箱注册、邮箱登录、Session 和受保护路由。
- 不建立独立账户系统或 registrations 表。
- 保留 Google OAuth2 注册／登录能力；只有服务端确认 Google Client ID 和 Secret 均已配置时才显示并启用入口。
- 所有已登录用户都可以参加测试，包括管理员。
- 只有现有 `admin` 角色能够访问题库管理和管理员提示页面。

## 4. 当前版本核心功能

### 4.1 题库管理

- 管理员可以新增选择题、判断题和问答题。
- 管理员可以查看现有题目列表。
- 当前版本不提供编辑、删除或停用题目。
- 管理页面必须明确说明编辑、删除和停用将在正式版本实现。

题目验证：

- 所有题目去除首尾空白后不能为空。
- 选择题至少有两个互不重复的非空选项，正确答案必须属于选项。
- 判断题正确答案只能是 `true` 或 `false`。
- 问答题必须有非空 `Reference answer / Evaluation guidance`。
- 问答题不自动评分、不调用 AI，用户提交后自行对照参考答案或评价指导。
- 题目、选项和答案必须设置合理长度上限，防止异常请求和邮件过大。

### 4.2 开始测试

- 登录用户可以开始测试。
- 每轮必须随机抽取恰好三题：一道选择题、一道判断题和一道问答题。
- 三种题型中任一种没有题目时，禁止开始测试，并用英文列出缺少的题型。
- 不得使用占位题或自动生成题目。
- 不同轮次允许随机抽到以前出现过的题目。

### 4.3 作答和结果

- 三道题在同一测试流程中展示。
- 所有题目必须回答后才能提交。
- 提交前允许修改答案；提交后锁定本轮答案。
- 提交后立即显示每道题的用户答案和正确答案。
- 问答题显示管理员预先录入的参考答案或评价指导，不显示自动分数。
- 当前版本不提供总分、AI 评价、人工在线评分、倒计时、防切屏或防作弊功能。

### 4.4 完成后的操作

提交后只提供两个主要操作：

1. `Send a copy`：用户主动确认后，把本轮答题副本发送到管理员配置邮箱。
2. `Start a new quiz`：清除当前页面状态并立即请求新的随机测试；该功能必须真实可用。

发送成功后，本轮按钮改为不可再次点击的成功状态。发送失败时保留结果，允许重试或开始新一轮。

## 5. 答题数据和隐私

- D1 只持久化题库。
- 当前版本不建立 attempts、answers、history 或 email submissions 数据表。
- 答题进度和结果只保存在当前 React 页面内存。
- 刷新、关闭或离开页面会终止本轮并丢失进度和结果。
- 测试开始页必须用英文提示上述行为，并同时说明正式版本将保存测试记录和提供历史查询。
- 纯自测答案不发送、不持久化，管理员不可见。
- 只有用户主动点击并确认 `Send a copy` 时，才将答题内容交给邮件服务并发送给管理员。
- Worker 日志不得记录姓名、邮箱、题目或答案。

发送确认必须说明将披露：

- 用户姓名；
- 登录邮箱；
- 发送时间；
- 三道题目；
- 用户答案；
- 正确答案或参考答案；
- 内容将通过 Resend 传输并发送给管理员。

Privacy 页面必须同步说明这些边界。

## 6. 邮件发送

### 6.1 当前选择

- 采用仓库已经支持的 Resend Provider 作为最少工作的真实邮件方案。
- 建议使用专用发件子域名 `mail.fitoa.net`。
- 建议发件地址：`aDaptQuiz <quiz@mail.fitoa.net>`。
- 管理员收件地址通过服务端 `RECRUIT_QUIZ_RECIPIENT_EMAIL` 配置。
- 前端只能获知邮件功能是否可用，不得读取 API Key、发件地址或管理员邮箱地址。
- Cloudflare Email binding 能力继续保留，不删除，但不是本项目首选的真实发送路径。

### 6.2 可用条件

只有以下条件全部满足时才启用真实发送：

- `EMAIL_PROVIDER=resend`；
- 有效的 `EMAIL_API_KEY`；
- 非占位的项目发件地址；
- 已配置 `RECRUIT_QUIZ_RECIPIENT_EMAIL`；
- `mail.fitoa.net` 已通过 Resend 要求的 GoDaddy DNS 记录完成验证。

本地或目标环境配置不足时，发送按钮必须禁用，并显示 `Email delivery is not configured in this prototype.`，不得显示虚假成功状态。

### 6.3 邮件内容和错误处理

- 邮件同时提供 HTML 和纯文本内容。
- 主题包含 `aDaptQuiz`、用户姓名和发送时间。
- 正文包含用户身份、发送时间、三道题、用户答案、正确／参考答案，以及“用户主动发送”的声明。
- 服务端必须根据 Better Auth Session 获取用户身份，并根据题目 ID 从 D1 重新读取题目和答案；不得信任前端提交的身份或正确答案。
- Provider 错误对用户转换为通用提示，不得泄露 Secret 或内部响应。
- 发送失败时保留结果并允许重试。
- 当前版本不持久化邮件 submission ID，因此 UI 防止普通重复点击，但不承诺网络重试情况下的严格一次性发送。

### 6.4 远程配置边界

创建 Resend 账户或 API Key、修改 GoDaddy DNS、同步 Secret、部署 Worker 和真实发送测试均属于后续独立授权操作。当前任务未经明确批准不得执行这些操作。

## 7. 管理员答卷提示页

- `/admin/submissions` 是仅管理员可访问的英文提示页面。
- 当前版本不在后台保存或显示答卷列表。
- 页面说明当前版本只能前往配置的管理员邮箱查看用户主动发送的答卷。
- 页面说明正式版本将在后台查看这些主动提交的答卷。
- 页面必须说明纯自测结果不会向管理员显示。

## 8. 页面范围

- `/`：公开产品说明、prototype 身份、职位背景和 SJS 来源。
- `/login`、`/signup` 及现有认证页面：继续使用 Better Auth。
- `/quiz`：开始测试、作答、提交、查看结果、主动发送和开始新一轮。
- `/admin/questions`：管理员新增和查看题库。
- `/admin/submissions`：当前版本邮箱查看说明和正式版本提示。
- `/account`、`/profile`：保留现有账户能力。
- `/privacy`：说明不持久化、主动发送和 Resend 数据传输边界。

## 9. 服务端接口要求

- `GET /api/quiz/status`：登录后获取题库完整性和邮件可用状态，不返回管理员邮箱。
- `POST /api/quiz/round`：登录后随机返回三种题型各一题，不返回正确答案。
- `POST /api/quiz/submit`：登录后提交题目 ID 和用户答案，服务端重新读取 D1 并返回正确／参考答案，不持久化答题。
- `POST /api/quiz/send-copy`：登录后重新读取权威题目、答案和 Session 用户身份，再通过 Resend 发送，不持久化答题。
- `GET /api/admin/questions`：仅管理员查看题库。
- `POST /api/admin/questions`：仅管理员校验并新增题目。

管理员权限必须在 Worker 中根据现有用户 ID 和 `users.role` 强制执行。隐藏前端入口不能代替服务端授权；普通用户访问管理员 API 返回 `403`。

## 10. 需求矩阵

| 范围 | 当前版本实现 | 正式版本提示 | 明确不做 |
|---|---|---|---|
| 公开首页 | 英文产品、职位来源和 prototype 说明 | — | 不宣称正式产品 |
| 认证 | Better Auth 邮箱认证；凭据完整时显示 Google OAuth | — | 不建独立账户系统 |
| 测试 | 每轮三种题型各一题，立即显示答案 | — | 不做复杂考试或 AI 评分 |
| 题库 | 管理员新增和查看 | 编辑、删除和停用 | 当前版本不提供这些操作 |
| 历史 | 页面内存临时状态 | 保存记录和历史查询 | 当前版本不建历史表 |
| 邮件副本 | 用户主动确认后通过 Resend 发送 | 后台查看主动发送的答卷 | 不自动发送或公开纯自测 |
| 管理员答卷页 | 提示到管理员邮箱查看 | 后台答卷列表 | 当前版本不保存或展示列表 |
| 接收邮箱 | 服务端环境配置 | 管理员设置 UI | 当前版本不提供设置 UI |
| 邮件未配置 | 禁用并明确提示 | — | 不伪装发送成功 |
| RecruitQuiz 之外 | — | 仅显示已确认提示 | 不实现推测功能 |

## 11. 明确非目标

- 不处理 `legacy/cloudflare-ankit`。
- 不修改 `main`。
- 不实现历史记录、后台答卷列表、题目编辑／删除／停用或收件邮箱设置 UI。
- 不实现 e-commerce、payments、orders、inventory、multi-tenancy 或其他 RecruitQuiz 之外功能。
- 不删除现有部署、远程数据库、备份恢复、邮件或 CLI 能力。
- 未经独立明确授权，不部署 Cloudflare，不修改远程 Worker/D1/Secret/OAuth/DNS/email/付费资源，不推送远程。

## 12. 验收摘要

- 英文界面与中英文项目文档一致。
- 三种题型齐全时每轮恰好返回三题；缺少任一类型时不能开始。
- 提交后立即显示权威答案，但答题内容不写入 D1。
- 新一轮真实可用。
- 未主动发送时管理员和邮件 Provider 均不能获得答题内容。
- 只有邮件配置完整时才允许发送，并根据真实 Provider 结果显示成功或失败。
- 所有管理员接口都有服务端角色检查。
- 实施必须先写失败测试，再写最小实现，最终通过完整测试、Lint、类型检查和 Build。
- Preview 配置使用独立的 `adaptquiz-preview` Worker 与 D1；在真实 D1 UUID 和 workers.dev URL 替换仓库占位标记前，所有远程动作必须提前失败。

## 13. 已批准的英文页面文案

首页 prototype 声明：

> Prototype prepared in response to the aDapt Family Solutions Ltd SJS job listing.

测试说明：

> Each quiz contains one multiple-choice question, one true-or-false question, and one written-response question.

> Your answers are not saved in this prototype. Refreshing or leaving this page will end the current quiz.

> The production version will retain completed quizzes and provide access to your quiz history.

发送确认：

> This will send your name, account email, the three questions, your answers, and the correct or reference answers to the configured administrator through Resend. Nothing is sent unless you confirm.

管理员题库提示：

> Question editing, deletion, and availability controls will be implemented in the production version.

管理员答卷提示：

> Submitted copies are currently delivered to the configured administrator mailbox. Please check that mailbox to review copies actively sent by users.

> An in-app submissions view will be implemented in the production version. Self-test results that users do not send are never available to administrators.

邮件不可用：

> Email delivery is not configured in this prototype. You can still start a new quiz.
