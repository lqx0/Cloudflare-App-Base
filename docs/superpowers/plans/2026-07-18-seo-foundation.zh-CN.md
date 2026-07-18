# SEO 基础实施计划

> **供代理执行：** 必须使用 `superpowers:executing-plans` 逐项实施；步骤使用复选框记录状态。

**目标：** 为当前 Cloudflare-Ankit SPA 添加路由独立 SEO 元数据和静态搜索入口。

**架构：** 纯 TypeScript 模块定义可脱离浏览器测试的路由元数据；小型 React effect 在路由变化时同步到 document。静态爬虫文件放在 `public/`，项目文档说明 SPA 限制。

**技术栈：** React 19、TypeScript、React Router、Vite、Node `tsx --test`、SVG/PNG 静态资源。

## 全局约束

- 规范根地址为 `https://fitoa.net`；不得配置 DNS、重定向、部署或远程服务。
- 公开元数据使用英文；中文文档为审核依据。
- 只索引 `/`、`/about`、`/services`、`/contact`、`/privacy` 和 `/terms`。
- Account、Profile、认证和 Not Found 路由必须使用 `noindex`。
- 不添加 Astro、SSR、分析服务、未确认业务声明或结构化数据。
- 每个任务完成后必须验证并独立本地提交，才能开始下一任务。

---

### 任务 1：定义并测试路由 SEO 元数据

**文件：**

- 新建：`src/react-app/lib/seo.ts`
- 新建：`tests/seo-metadata.test.ts`

**接口：**

- 产出 `getSeoMetadata(pathname: string): SeoMetadata`。
- `SeoMetadata` 包含 `title`、`description`、`canonicalPath` 和 `indexable`。

- [ ] **步骤 1：编写失败测试**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { getSeoMetadata } from "../src/react-app/lib/seo";

test("returns canonical metadata for the public home route", () => {
  const metadata = getSeoMetadata("/");
  assert.equal(metadata.canonicalPath, "/");
  assert.equal(metadata.indexable, true);
  assert.match(metadata.title, /Cloudflare-Ankit/);
});

test("marks account and unknown routes as noindex", () => {
  assert.equal(getSeoMetadata("/account").indexable, false);
  assert.equal(getSeoMetadata("/missing").indexable, false);
});
```

- [ ] **步骤 2：运行测试并确认失败**

运行：`npx tsx --test tests/seo-metadata.test.ts`

预期：因 `src/react-app/lib/seo` 不存在而失败。

- [ ] **步骤 3：实现最小元数据查找**

创建 `SeoMetadata`、六条路由元数据记录和 `getSeoMetadata`；函数应规范化尾部斜杠，并对未知路径返回不可索引的 Not Found 回退值。标题和描述只使用临时 Cloudflare-Ankit 已确认事实。

- [ ] **步骤 4：运行聚焦测试、lint 并提交**

运行：`npx tsx --test tests/seo-metadata.test.ts` 与 `npm run lint`。

提交：

```text
git add src/react-app/lib/seo.ts tests/seo-metadata.test.ts
git commit -m "feat: add route SEO metadata"
```

### 任务 2：添加静态爬虫资源和社交图片

**文件：**

- 新建：`public/robots.txt`
- 新建：`public/sitemap.xml`
- 新建：`public/cloudflare-ankit-social-card.png`

**接口：**

- `robots.txt` 引用 `https://fitoa.net/sitemap.xml`。
- `sitemap.xml` 恰好包含六个可索引规范 URL。
- 图片是供 Open Graph 使用的 1200×630 简洁 Cloudflare-Ankit 文字样本。

- [ ] **步骤 1：编写静态资源断言**

扩展 `tests/seo-metadata.test.ts`，读取两个文本文件并断言 sitemap 地址、六个 `<loc>` 条目和仅含 `https://fitoa.net` 规范 URL。

- [ ] **步骤 2：运行测试并确认失败**

运行：`npx tsx --test tests/seo-metadata.test.ts`

预期：因 `public/robots.txt` 不存在而失败。

- [ ] **步骤 3：添加爬虫文件和图片**

使用 `User-agent: *`、`Allow: /` 和 sitemap 声明。XML 中添加六条规范 URL。生成一张非摄影风格的 1200×630 图片，文字为 `Cloudflare-Ankit` 与 `Provisional project`，不得含业务承诺、客户、徽标或第三方标记。

- [ ] **步骤 4：运行聚焦测试并提交**

运行：`npx tsx --test tests/seo-metadata.test.ts`。

提交：

```text
git add public/robots.txt public/sitemap.xml public/cloudflare-ankit-social-card.png tests/seo-metadata.test.ts
git commit -m "feat: add SEO crawler resources"
```

### 任务 3：同步 document 元数据并记录 SPA 限制

**文件：**

- 新建：`src/react-app/components/SeoMetadata.tsx`
- 修改：`src/react-app/App.tsx`
- 修改：`README.md`
- 修改：`README.zh-CN.md`
- 修改：`ARCHITECTURE.md`
- 修改：`ARCHITECTURE.zh-CN.md`
- 修改：`TASKS.md`
- 修改：`TASKS.zh-CN.md`

**接口：**

- `SeoMetadata` 使用 `useLocation()` 与 `getSeoMetadata()`。
- 每次路由变化更新 title、description、canonical、`og:title`、`og:description`、`og:url`、`og:image` 和 robots meta 标签。

- [ ] **步骤 1：编写失败的组件源码测试**

向 `tests/seo-metadata.test.ts` 添加断言，在组件不存在时读取 `src/react-app/components/SeoMetadata.tsx` 并检查 `og:image`、`canonical` 和 `getSeoMetadata`。

- [ ] **步骤 2：运行测试并确认失败**

运行：`npx tsx --test tests/seo-metadata.test.ts`

预期：因 `SeoMetadata.tsx` 不存在而失败。

- [ ] **步骤 3：实现元数据同步并挂载**

创建可幂等创建或更新 name/property meta 标签和 canonical link 的辅助逻辑。图片 URL 使用 `https://fitoa.net/cloudflare-ankit-social-card.png`。在 `AppContent` 内挂载 `<SeoMetadata />`，使 React Router 位置变化触发更新。

- [ ] **步骤 4：记录限制、更新任务、验证并提交**

在 README 与架构中英文配对文档中添加简洁 SPA 爬虫限制。将两份任务清单中的里程碑 5 全部勾选。运行：

```text
npx tsx --test tests/public-navigation.test.ts tests/legal-content.test.ts tests/seo-metadata.test.ts
npm run lint
npm run build
npm run check
```

启动本地服务器并请求 `/`、`/privacy`、`/robots.txt` 和 `/sitemap.xml`，预期均为 HTTP 200。停止服务器后运行 `git diff --check`。

提交：

```text
git add src/react-app/components/SeoMetadata.tsx src/react-app/App.tsx README.md README.zh-CN.md ARCHITECTURE.md ARCHITECTURE.zh-CN.md TASKS.md TASKS.zh-CN.md tests/seo-metadata.test.ts
git commit -m "feat: apply public route SEO metadata"
```
