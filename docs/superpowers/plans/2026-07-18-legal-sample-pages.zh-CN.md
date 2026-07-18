# 里程碑 4 法律样本页面实施计划

> **供代理执行：** 必须使用 `superpowers:executing-plans` 逐项实施；步骤使用复选框记录状态。

**目标：** 在不作正式法律承诺的前提下，为 Privacy 与 Terms 提供客户可审阅的英文网页样本。

**架构：** 将静态法律样本文案与 React 页面分离。纯 TypeScript 内容模块定义通知和分段，公开页面仅负责使用现有语义元素呈现它们；测试直接验证内容模块。

**技术栈：** React 19、TypeScript、React Router、Node `tsx --test`、ESLint、Vite。

## 全局约束

- 英文只在公开网页展示；中文规格和计划为审核依据。
- 两页必须显示 `Draft sample — requires owner and legal review before publication.`。
- `info@fitoa.net` 是展示占位地址，不配置邮件、DNS 或远程服务。
- 不增加 API、数据库、Cookie、分析服务或未验证法律声明。
- 保留 `/privacy` 与 `/terms` 路由及现有公开布局。

---

### 任务 1：建立可测试的法律样本文案

**文件：**

- 新建：`src/react-app/content/legal.ts`
- 新建：`tests/legal-content.test.ts`

**接口：**

- 产出：`draftLegalNotice: string`。
- 产出：`privacySections` 与 `termsSections`，每项具有 `title: string` 和 `body: string`。

- [ ] **步骤 1：编写失败测试**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { draftLegalNotice, privacySections, termsSections } from "../src/react-app/content/legal";

test("legal sample content states its draft status and data-request contact", () => {
  assert.equal(draftLegalNotice, "Draft sample — requires owner and legal review before publication.");
  assert.ok(privacySections.some(({ body }) => body.includes("info@fitoa.net")));
  assert.ok(privacySections.some(({ body }) => body.includes("authorized deletion")));
  assert.ok(termsSections.some(({ body }) => body.includes("provisional")));
});
```

- [ ] **步骤 2：运行测试并确认失败**

运行：`npx tsx --test tests/legal-content.test.ts`

预期：因模块 `src/react-app/content/legal` 尚不存在而失败。

- [ ] **步骤 3：实现最小文案模块**

```ts
export const draftLegalNotice = "Draft sample — requires owner and legal review before publication.";

export const privacySections = [
  { title: "Information we collect", body: "This sample describes account information such as your name, email address, optional profile image, and technical data needed for authentication and sessions." },
  { title: "How information is used", body: "Information is used for account operation, security, support, and necessary service communications." },
  { title: "Retention", body: "Account information is retained until authorized deletion, a valid privacy or legal request, or an approved policy change." },
  { title: "Your requests", body: "For access, correction, or deletion requests, contact info@fitoa.net." },
];

export const termsSections = [
  { title: "Provisional website", body: "This website and its service content are provisional samples pending client confirmation." },
  { title: "Account use", body: "Users should provide accurate information, protect their login credentials, and not misuse the service." },
  { title: "Before publication", body: "Service scope, fees, liability, and dispute terms require owner and legal review before publication." },
  { title: "Contact", body: "For general policy questions, contact info@fitoa.net." },
];
```

- [ ] **步骤 4：运行测试并确认通过**

运行：`npx tsx --test tests/legal-content.test.ts`

预期：一个通过的子测试。

### 任务 2：在公开页面展示样本

**文件：**

- 修改：`src/react-app/pages/public/Pages.tsx`

**接口：**

- 使用任务 1 的 `draftLegalNotice`、`privacySections` 和 `termsSections`。
- `Privacy` 和 `Terms` 继续是无参数 React 组件。

- [ ] **步骤 1：扩展页面导入**

```ts
import { draftLegalNotice, privacySections, termsSections } from "@/content/legal";
```

- [ ] **步骤 2：用以下模式替换 Privacy 和 Terms 内容**

```tsx
function LegalSample({ sections }: { sections: typeof privacySections }) {
  return <><p className="rounded-md border border-amber-400/50 bg-amber-50 px-4 py-3 text-sm text-foreground dark:bg-amber-950/30">{draftLegalNotice}</p>{sections.map(({ title, body }) => <section key={title}><h2 className="text-xl font-semibold text-foreground">{title}</h2><p>{body}</p></section>)}</>;
}

export function Privacy() { return <Page title="Privacy"><LegalSample sections={privacySections} /></Page>; }
export function Terms() { return <Page title="Terms"><LegalSample sections={termsSections} /></Page>; }
```

- [ ] **步骤 3：运行聚焦测试与 lint**

运行：`npx tsx --test tests/legal-content.test.ts`，然后 `npm run lint`。

预期：均成功；公开页面不引入直接数据库访问。

### 任务 3：更新任务状态并完成验证

**文件：**

- 修改：`TASKS.md`
- 修改：`TASKS.zh-CN.md`

- [ ] **步骤 1：勾选里程碑 4 的六项**

将 Privacy/Terms 样本、收集字段、保留、联系人、数据请求渠道和所有者批准标记改为 `[x]`；中英文语义保持一致。

- [ ] **步骤 2：运行完整本地验证**

运行：

```text
npx tsx --test tests/public-navigation.test.ts tests/legal-content.test.ts
npm run build
npm run check
```

预期：测试、构建和 `wrangler deploy --dry-run` 均通过；`--dry-run` 不部署。

- [ ] **步骤 3：启动本地服务器并检查路由**

运行开发服务器后请求 `http://localhost:5173/privacy` 和 `http://localhost:5173/terms`。

预期：两条路由均返回 HTTP 200；验证后停止服务器。

- [ ] **步骤 4：检查差异完整性**

运行：`git -c safe.directory=E:/Workspaces/Cloudflare-Ankit diff --check`。

预期：无空白或冲突标记错误。
