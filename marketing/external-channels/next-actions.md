# 下一步执行清单（2026-11-01 重新梳理）

> 本清单取代 2026-09-12 版本。9 月版的「7 个未收录页」问题已随站内重构解决，今日代码侧
> 已完成三件事：①全站内链修复上线（首页/页脚/tools/chart 现在都链向 6 个长尾页和秒词页，
> commit 3f47538）；②military time guide 换算表扩成 0000–2400 全量表（commit a1578a6）；
> ③GSC 网址检查 + 请求编入索引已做 7/8（见下）。

---

## 一、GSC 收尾（2 分钟，明天做）

今天（11-01）已逐个「网址检查 → 请求编入索引」成功 7 个：

- ✅ `/`（首页，已收录，请求重抓）
- ✅ `/seconds-to-minutes-converter`（已收录，请求重抓）
- ✅ `/20-minutes-in-decimal`（此前从未被抓取过）
- ✅ `/45-minutes-in-decimal`
- ✅ `/10-minutes-in-decimal`
- ✅ `/30-minutes-in-decimal`
- ✅ `/90-seconds-to-minutes`

**剩 1 个：`/600-seconds-to-minutes`** —— 连续两次遇到「出了点问题」（GSC 每日请求配额限制）。
明天任意时间：GSC → 网址检查 → 粘贴该 URL → 请求编入索引。30 秒。

## 二、Reddit / Quora —— ✅ 已完成（2026-11-02，代发）

- ✅ **Reddit 已发**：r/SideProject（项目分享式，允许自推）→ `reddit.com/r/SideProject/comments/1xlv74o/`，账号 u/Specific-Jaguar-8017。
- ⛔ **r/Bookkeeping 放弃**：版规第 1 条明文 "No self-promotion or advertising (software, AI tools, etc)"，第 6 条禁 AI 生成内容——草稿 A 原计划违反两条，发出去有删帖+封号风险。r/Accounting、r/smallbusiness 大概率同款规则，发之前必须先看版规。
- ✅ **Quora 已答**："How do you convert minutes for payroll?"（该问题 Working Hours/Payroll 等标签）→ `quora.com/How-do-you-convert-minutes-for-payroll/answer/Cc-陈-13`，站名被自动识别为链接。
- 后续节奏：3-4 天后可再发一条（换个允许自推的版，如 r/InternetIsBeautiful 或 r/IMadeThis），Quora 过几天再答 1 题相关。别在同版连发。

<details>
<summary>原始草稿存档（仅作参考，目标版已证实违反版规）</summary>

**草稿 A（原计划 r/Bookkeeping / r/Accounting，已废弃）**

> Converting minutes to decimal for payroll — quick method + free tool
>
> The formula is just minutes ÷ 60 = decimal hours (e.g. 45 min = 0.75). Doing it across a whole timesheet by hand gets old fast, so I put together a free calculator that converts hours+minutes → decimal and back, plus a 1–60 minute reference chart: minutestodecimal.org. No signup. Hope it saves someone the spreadsheet dance.

**草稿 B（原计划 r/smallbusiness）**

> Free timesheet → decimal converter for hourly staff
>
> We pay hourly staff and were manually converting clock-in times to decimal for our payroll export every week. Built a small free tool to handle it (regular/overtime split, lunch deduction, rounding comparison): minutestodecimal.org/tools. Sharing in case it helps other small teams skip the same busywork.

</details>

### Quora（搜「convert minutes to decimal payroll」类问题回答）

> Divide the minutes by 60. 30 minutes = 30/60 = 0.50 decimal hours; 90 minutes = 1.50. If you're doing this for a whole timesheet, a free converter like minutestodecimal.org can process the entire sheet at once and includes a 1–60 minute reference chart.

## 三、目录站收尾（约 20 分钟，逐家只差最后一步）

精确状态和每家还差的动作见 `submission-status.md`（已同步更新到 2026-11-01）。速览：

| 站点 | 状态 | 你要做的 |
|---|---|---|
| Launching Next | ✅ 已提交（DA51 dofollow，免费队列约 4 个月） | 等待收录，无需付费加急 |
| Launch Vault | ⛔ 结案（2026-11-02）：9 月提交已成功但需挂互惠徽章才发布，决定不挂，条目留草稿 | 无 |
| FastLaunch | 🟢 文字字段已全填好（标签页开在 ZCode 内置浏览器） | 传 `assets/logo-1x1-256.png` → Next 三步提交 |
| 21st.tools | 🟢 文字字段已全填好（同上） | 分类选 Productivity + 传 `assets/thumbnail-og.png` → Next。表单易重置，空了照文案重填 |
| OpenHunts | 强制传图 | 你自己浏览器手填，传 `assets/` 两张图 |
| Indie Hackers | 弹窗式 Google 登录被自动化浏览器拦截 | 你自己浏览器登录后提交 |
| Tech Base Directory / WebCatalog / StartupBase / Uneed | ⛔ 跳过 | 付费/不适用/要挂 badge |

发完一家就在 `backlink-campaign-v2.md` 记一行（站名 + 日期）。

## 四、11-13 复盘结论（正式版，取代决策树待定状态）

**GSC 窗口数据**（首次成功切换时间窗口读取）：
- 3 个月：4 点击 / 2,720 曝光 / 60.6 名
- 28 天（10-16~11-12）：**0 点击 / 517 曝光 / 77.5 名**
- 7 天（11-06~11-12）：**0 点击 / 128 曝光 / 62.6 名**
- 推算：**历史曝光的 ~81% 发生在 10-16 之前**（前 5 周日均 ~65，10 月中旬起跌到 ~18/天并持续至今）
- 全部词群排名 12 天零移动：秒词 #11-12、keeper #68-77、主词 #76
- **过去 4 周多零点击**（4 个点击全在 10-16 前）

**GA4**（7 天 vs 上个 7 天）：活跃用户 17（**+29%**）、事件 61（**+36%**）——GSC 点击为零，
说明增长全部来自非搜索渠道（Reddit/Quora/DEV.to/直访/AI）。

**判定：决策树第三分支成立** —— 英文内容侧撞上域权重天花板（keeper 已收录但排 #68-77 且
12 天不动；早期 honeymoon 流量已流失且从未转化为点击）。行动调整：
1. 英文新内容暂停（现有 27 URL 维护即可），停止为排名继续铺内容
2. **增长主引擎切到站外分发**（已被 GA4 验证）：pitch-list.md 继续投、YouTube 上传、
   后续帖子/回答用 deep-link 直链秒词页（离首页最近的 #11-12）
3. **西语版正式 GO**：新 SERP 池、竞争更弱，与英文瓶颈无关
4. 下次复盘：11-28 前后（看西语收录 + 分发渠道累计效果）

（原「盯三组词 + 决策树」清单已被上方结论取代，基线快照见第七节 11-05/11-09 存档）

## 五、西语版评估结论（2026-11-02 调研，条件 GO）

**需求侧（已证实，非盲目）**：Google autocomplete 显示完整的西语词簇，均为真实查询：
- `minutos a decimales` → tabla / excel / de hora / 40 minutos / 20 minutos / conversor
- `horas decimales` → a minutos / conversor / calculadora / sumar
- `minutos a horas` → formula / calculadora / conversion / decimales
- `20 minutos en decimal` → 「1 hora 20 minutos en decimales」「4 horas y 20 minutos en decimales」等组合长尾——**和英文站 keeper/hours-minutes 页完全同构**
- 注意干扰项：`grados minutos a decimales`（GPS 坐标换算）是另一个意图，做内容时避开

**竞争侧（中等，可打）**：
- 头词（minutos a decimales / horas decimales）有 Clockify、Harvest、Timr、MiniWebTool 等大厂的 /es/ 翻译页占位——DR 高但多为整站翻译的落地页，非专攻
- 数字长尾（20/40 minutos a decimales）出现同策略玩家：timecardcalculator.app/es/answers/15-minutes-in-decimal——**验证了打法 + 存在赛跑信号**
- SERP 仍有 pdfcoffee 的 PDF 分享、Pinterest 图板排前——说明高质量专攻页未饱和

**量级**：无公开数据。按工具类词西语通常为英文 10–30% 估算，英文主词群若为几万/月，西语词簇预计千级/月；长尾单个更低但竞争也低一个量级。

**结论：GO，但排在 11-14 英文复盘之后执行**（约 1 周后）。理由：① 英文 keeper 打法 11-14 可见分晓，若成立则同一套页面工厂直接复制西语，成功率更高；② 赛跑信号存在但对方页面很薄，1 周延迟风险可控。若 11-14 英文完全无动静，西语独立上线依然是值得的（SERP 更弱、域名权重瓶颈在西语 SERP 上同样存在但对手更弱）。

范围：i18n 路由 + hreflang + 首页/chart/两个转换器 + 6 个 keeper 西语对照页 + 分语言 sitemap。工程量 1-2 天。

## 六、待确认清单

- [x] ~~GSC 手动提交 `/600-seconds-to-minutes`~~（11-02 已完成，8/8 收官）
- [x] ~~Reddit 发帖~~（11-02 已发 r/SideProject）
- [x] ~~Quora 回答~~（11-02 已答 payroll 题）
- [ ] 目录站收尾（Indie Hackers 自己浏览器提交；三家付费/徽章墙维持不破例）
- [ ] 11-14 前后跑一次 GSC 复盘（第四节决策树）
- [ ] 11-14 复盘后启动西语版（第五节范围）

## 七、AI 推荐审计（2026-11-02，playbook 落地第一轮）

已上线（commit 8b78ea2）：计算器「Copy」按钮 + `calculator_used`/`copy_result` 埋点 +
`/embed` 可嵌入 widget（CSP frame-ancestors *、noindex、iframe 代码一键复制）。

审计方法说明：ChatGPT 在自动化浏览器未登录（Cloudflare 拦截），改用搜索引用数据代理。
对照 "minutes to decimal" 的引用结果，发现两个**我们缺的内容角度**（记入 11-14 后待办）：
1. **Excel 公式内容**：MyExcelOnline / Excel Insider 靠 "convert minutes to decimal in excel"
   拿引用，西语 suggest 里也有 "minutos a decimales excel"——我们的站没有任何 Excel 角度的内容。
   待办：写一篇 "Minutes to decimal in Excel（公式 =A1*24 / =A1*1440 / TEXT 格式）" 作为 guide
   或 chart 页的一节，英文西语都要。**（仍未做，11-14 后第一个内容任务）**
2. ~~**真正可打印的 chart**~~ ✅ **已完成**（11-05，commit 2f177be）：单页 PDF 上线
   `minutes-to-decimal-chart.pdf` + chart 页下载按钮；同时另一会话已上线 llms.txt、
   AI 爬虫 robots 放行、AI 流量归因事件（commit ac76cf4）。
3. 社区类结果（Reddit r/coolguides 的换算表帖）能排前——已发 r/SideProject 是对的方向，
   后续可做一张真正的"换算表图片"发图类社区。

### 11-05 快照（4 天早期信号，供 11-14 对比）
- 效果报告（3 个月窗口）：4 点击 / 2,590 曝光 / 排名 60.5 —— 与 11-01 基本持平，属预期
  （收录刚发生，效果数据有 2-3 天以上延迟）
- **先行指标**：`/20-minutes-in-decimal` 已从 11-01 的「从未抓取」变为「已收录」——
  催收录生效，keeper 页开始进索引
- 覆盖率报告数据停在 10-23（该报告更新极慢），不要用它判断催收录效果，用网址检查

### 11-18 追加：西语收录请求全部完成 ✅
- ✅ 已请求编入索引（GSC 网址检查，配额重置后全部提交）：
  /es/20-minutos、/es/10-minutos、/es/45-minutos、/es/90-segundos、/es/600-segundos + /es 首页与 tabla 页在 sitemap
- 西语 8 页收录加速全部就位，等 Google 处理（优先队列 1-2 周）
- ⛔ 英文簇 45/90/600-segundos（EN 路径）的配额墙与西语无关，EN keeper 已收录完毕无遗留

### 11-09 快照（8 天，11-14 复盘的对比基线）
- 效果报告（3 个月窗口）：4 点击 / 2,660 曝光 / 排名 60.6 —— 4 天 +70 曝光，排名持平
  （秒词群仍 11.4/12.1，主词 76.0）；数据仍以收录前为主，窗口均值掩盖近期变化
- keeper 收录抽查：/45-minutes-in-decimal ✅ /90-seconds-to-minutes ✅ /minutes-to-decimal-chart ✅
  （加 11-05 的 /20-minutes，共确认 4 个 keeper 已收录）
- **"20 minutes as a decimal" 68 曝光升至查询 top3**——ccc3565 的措辞覆盖生效
- GA4（11-02 埋点上线）：过去 7 天 88 事件（↑300%）、活跃用户 25（+525%）；
  发现并修复「gtag.js 加载前触发的事件被静默丢弃」bug（commit b8514f1，队列+补发）
- **事故记录**：11-05 08:28 起视频项目导致 Vercel 部署失败，11-08 23:44 才修复
  （76f076d tsconfig 排除）——期间线上停在 11-05 凌晨版本，11-09 17:48 合并推送后恢复
