# FAQ 文案（用于目录站提交，如 Launch Vault 的 "+ Add FAQ"）

用途：目录站表单里常要求填 FAQ，提示是「at least 3 · shown on your page + powers FAQ rich results」。
下面这 6 条**已经真实存在于首页**（`app/page.tsx` 的 faq 数组，且已接入 FAQPage 结构化数据），
所以"展示在你页面上"是名副其实的，不是编造。

---

## 直接复制粘贴（Q / A 成对填）

**1. Is the minutes to decimal converter free?**
Yes. Every calculator on the site is free and there is no sign-up. Open the page and start converting — there is no account to create and no email address required.

**2. How do I convert 30 minutes to decimal?**
30 minutes equals 0.50 decimal hours, because 30 ÷ 60 = 0.50. Use the converter above: enter 0 hours and 30 minutes to see it instantly.

**3. What is 15 minutes in decimal?**
0.25. A quarter of an hour is 15 minutes, and a quarter as a decimal is 0.25. The four quarter-hour landmarks worth memorizing are 15 minutes = 0.25, 30 = 0.50, 45 = 0.75, and 60 = 1.00.

**4. Does 4.35 mean 4 hours 35 minutes?**
No. On a decimal timesheet, 4.35 means 4 hours and 0.35 of an hour, which is 21 minutes (0.35 × 60). If you worked 4 hours 35 minutes, the correct decimal entry is 4 + (35 ÷ 60) = 4.58.

**5. Why do payroll systems use decimal time?**
Payroll calculates wages per decimal hour. Converting 1h 30m to 1.5 makes it easy to multiply by an hourly rate, and it lets every entry in a pay period be added with plain addition. Most timesheets require decimal format for exactly this reason.

**6. Is my timesheet data uploaded anywhere?**
No. The calculators run entirely in your browser, so the times you enter stay on your device and nothing is sent to a server. There is no account, so there is also nothing to sign in to.

---

## 为什么选这 6 条

| 条目 | 作用 |
|---|---|
| 1 Is it free | 目录站访客最常问的第一问题，降低点击后的疑虑 |
| 2 / 3 具体数字 | 承接 GSC 里真实的答案型查询（30 min、15 min），也是搜索曝光主力 |
| 4 Does 4.35 mean... | **常见误区题**，辨识度高、容易被引用，也最容易拿精选摘要 |
| 5 Why payroll uses decimal | 解释产品存在理由，建立"专业、懂 payroll"的定位 |
| 6 data privacy | 隐私是本站的真实卖点（纯前端、不上服务器），竞品普遍没有 |

---

## 备注

- 最少填 3 条即可通过校验，建议**全填 6 条**——目录站会把 FAQ 渲染到你的产品页，内容越多越显得完整。
- 关于"powers FAQ rich results"：Google 自 2023 年起把 FAQ 富摘要**限制在权威政府/医疗站点**，
  普通站点大多不再展示富摘要。所以这个 schema 的收益主要在于帮助搜索引擎理解页面语义，
  对目录站自身页面渲染 FAQ 则是实打实有用。不必期待 Google 直接出富摘要。
- 若之后要在其他目录站复用，直接用这份即可，保持各站文案一致利于品牌识别。
