# Embed Widget 外联作战（2026-11-17 建）

> 目的：把 `/embed` 免费组件推给 payroll/bookkeeping 领域的内容站——每个被接受的嵌入
> = 一条自然外链 + 持续流量。策略是「给他们的读者送工具」而不是「求链接」。
> 组件入口：`https://www.minutestodecimal.org/embed?mode=minutesToHours`（iframe 代码在页面里可复制）

---

## 最好打的一个（今天就发）

**thomasjmcalister.com/blog/7-free-accounting-tools-for-small-businesses-save-money-now**
—— 这篇就是"7 个免费会计工具"清单文，我们的工具是完全对口的第 8 个。角度不是要链接，
而是补充他的清单：标题 "Found your list useful — one more free tool worth a look"，
正文 3 句：是什么、免费无注册、跑在浏览器里。附链接。

## 第一梯队：独立小站（最可能接受，各发一封）

| 站点 | 为什么对口 | 联系路径 |
|---|---|---|
| nimblereporting.com | 写过「Payroll Calculators as a Secret Tool」——读者正是需要的 | 博客页评论区/联系表单 |
| youraccounting.net | 有「Top Free Resources」清单文 | 联系表单 |
| cloudbooksapp.com | 初学者指南作者，工具推荐对口 | 博客联系页 |
| bookkeepingandaccountinginc.com | 写过「Free bookkeeping tools 2026」 | 联系表单 |
| simpleprofit.com | 会计资源站，受众是小微企业主 | 联系表单 |

## 第二梯队：高权威（走内容合作路线，接受率低但价值高）

| 站点 | 路线 |
|---|---|
| freshbooks.com/hub | 明确接受专家投稿（payments/accounting 主题）——投一篇「The 4.35 mistake: how decimal timesheets work」类实用稿，文内自然引用工具 |
| bench.co/blog | 先投「timesheet decimal mistakes that cost employees money」角度 |
| bookkeepers.com/resources | 先回答他们资源区的问题类型，再提工具 |

## 第三梯队：目录直投（一次动作）

- **no-code.tools/calculators** —— 专门的「可嵌入计算器」目录，直接提交 /embed
- alt 阵营：calculator-1.com/widgets 等同类目录只收自家，跳过

---

## Outreach 邮件文案（第一梯队通用，[SITE] 替换站点名）

> Subject: A free minutes-to-decimal calculator your readers might like
>
> Hi [NAME / SITE] team,
>
> I'll keep this short. Your [ARTICLE/PAGE NAME] covers [TOOL/RESOURCE] well, and
> there's one small tool your readers end up needing every pay period: converting
> clock minutes to decimal hours (45 min = 0.75, not 0.45 — it's the most common
> timesheet mistake there is).
>
> I built a free converter at minutestodecimal.org — no signup, runs entirely in
> the browser. It also works as an embeddable widget if you ever want a live
> calculator inside a post (iframe, one line, no attribution required).
>
> Either way, thanks for the resource — no reply needed unless it's a fit.
>
> [YOUR NAME]

**规则**：每站只发一次；7-10 天后无回复可跟一次；被拒或无回应就换下一家，不缠。

## 嵌入代码（发给对方时随邮件附上）

```html
<iframe src="https://www.minutestodecimal.org/embed?mode=minutesToHours"
        style="width:100%;max-width:480px;height:420px;border:0;border-radius:16px"
        title="Minutes to Decimal Calculator" loading="lazy"></iframe>
```
其他模式：`?mode=decimalToHours`（反向）、`secondsToMinutes`、`hoursToMinutes`。

---

## 执行记录

| 日期 | 站点 | 动作 | 结果 |
|---|---|---|---|
| （待填） | | | |
