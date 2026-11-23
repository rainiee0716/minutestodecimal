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
- 其余目录站（Product Hunt、AlternativeTo、SaaSHub、G2 等）见
  `external-channels/directory-submission-copy.md`，粘贴文案已备好

---

## Outreach 邮件模板库（按对方内容类型选，[SITE] 替换站点名）

> 总原则（哥飞式外联）：主题行不像推销；正文 ≤120 词；先给价值再提工具；
> 明说"不回复也没关系"降低对方压力。每站只发一次，7-10 天后跟一封。

### T1 · 清单文（"N 个免费工具"类文章）—— 第一梯队主力模板

> Subject: One more free tool for your [ARTICLE TITLE] list
>
> Hi [NAME / SITE] team,
>
> Your [ARTICLE NAME] list is a solid roundup — one small tool your readers
> end up needing every pay period, though: converting clock minutes to
> decimal hours (45 min = 0.75, not 0.45 — the most common timesheet
> mistake there is).
>
> I built a free converter at minutestodecimal.org — no signup, runs
> entirely in the browser. It also works as an embeddable widget if you
> ever want a live calculator inside a post (one-line iframe, no
> attribution required).
>
> Either way, thanks for the resource — no reply needed unless it's a fit.
>
> [YOUR NAME]

### T2 · 教程文（"how to calculate hours worked" 类）—— 给正文补一段工具引用

> Subject: A calculator for your [TOPIC] walkthrough
>
> Hi [NAME],
>
> Your guide on [TOPIC] is one of the clearer ones I've seen — the
> [SPECIFIC STEP/SECTION] part especially.
>
> One thing readers always stumble on right after that step: converting
> minutes to decimals for payroll. I made a free browser-based converter
> (minutestodecimal.org) that shows the math live — happy for you to embed
> it in the post as an interactive widget if you think it helps (one-line
> iframe, free, no signup on their side either).
>
> Either way, nice work on the guide.
>
> [YOUR NAME]

### T3 · 健身 / 训练 / 计时类博客 —— 推 seconds-to-minutes 转换器（当前主推页）

> Subject: A free seconds-to-minutes converter for your interval workouts
>
> Hi [NAME],
>
> Quick one — your post on [WORKOUT/INTERVAL TOPIC] quotes rest rounds in
> seconds ("8 × 90s"), while most training logs write minutes ("8 × 1:30").
>
> I run a free seconds-to-minutes converter at
> minutestodecimal.org/seconds-to-minutes-converter that answers the
> common ones on sight (90s = 1.5 min, 300s = 5 min) and converts any
> value instantly. Runs in the browser, nothing to sign up for. It's also
> embeddable if you ever want a live widget in a post.
>
> Keep up the good content.
>
> [YOUR NAME]

### T4 · 周工时表 / 薪资结算类站点 —— 推 weekly timesheet calculator + Excel 模板

> Subject: Free weekly timesheet calculator for [SITE] readers
>
> Hi [NAME / SITE] team,
>
> Your [TIMESHEET/PAYROLL PAGE] already helps people track hours — the
> next question every reader hits is "what do these hours mean on my
> paycheck?"
>
> I built a free weekly timesheet calculator at minutestodecimal.org:
> enter clock-in/clock-out times, it splits regular vs. overtime hours,
> deducts unpaid lunch, and shows decimal hours plus gross pay estimate.
> There's also a downloadable Excel template. No signup, everything runs
> in the browser.
>
> If it fits your resources section, feel free to link or embed it.
>
> [YOUR NAME]

### T5 · 跟进（首封 7-10 天后，只跟一次）

> Subject: Re: [ORIGINAL SUBJECT]
>
> Hi [NAME],
>
> Just floating this back up in case it got buried — the offer stands:
> free converter, embeddable in one line, nothing required from your
> readers. If now's not a good time, no worries at all.
>
> [YOUR NAME]

### T6 · 对方同意后的交付邮件（24 小时内回复，附现成代码）

> Subject: Re: [ORIGINAL SUBJECT]
>
> Great — here's the one-line embed, sized to fit a post column:
>
> [IFRAME CODE — 按对方页面选模式，见下]
>
> It's fully client-side (nothing is sent to a server), mobile-responsive,
> and free forever. If the default size doesn't fit your layout, tell me
> the width you need and I'll send a pre-sized version.
>
> Thanks for including it!
>
> [YOUR NAME]

**嵌入模式速查**（按对方内容选 mode）：
| 对方内容 | 用哪个 mode | 链接参数 |
|---|---|---|
| 薪资/工时表/记账 | `minutesToHours` | `/embed?mode=minutesToHours` |
| 健身/计时/视频剪辑 | `secondsToMinutes` | `/embed?mode=secondsToMinutes` |
| 反向换算（小数→时分） | `decimalToHours` | `/embed?mode=decimalToHours` |
| 周工时/加班/薪资估算 | 不用 embed，直接给页链 | `/weekly-timesheet-calculator` |

**规则**：每站只发一次；7-10 天后无回复可跟一次（T5）；被拒或无回应就换下一家，不缠。
发送记录填到下方执行记录表。

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
