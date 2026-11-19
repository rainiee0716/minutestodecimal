# 目录站提交状态（2026-11-02 第二轮代发后 · 最终版）

产品：Minutes to Decimal — https://www.minutestodecimal.org
邮箱：rainiee0716@gmail.com
配图：`assets/logo-1x1-256.png`（1:1 256px）、`assets/thumbnail-og.png`（1200×630 16:9）
FAQ 文案：`faq-copy.md`；通用文案：`directory-submission-copy.md`

> **2026-11-02 第二轮代发结果**：用「页面内文件注入」技术突破了图片上传限制，FastLaunch、
> 21st.tools、OpenHunts 三家的表单已 100% 填完（含图片、分类、Tech Stack、Platforms、Pricing）。
> 但三家在最后一步都亮出了同一个商业现实：**免费档排队 7 个月～15 个月，插队必须挂徽章或付费**。
> 按你定的规则（禁互惠、禁付费），三家全部停在不点最终提交按钮的状态。

---

## ✅ 完成（2 个）

| 站 | 状态 | 说明 |
|---|---|---|
| **Launching Next** | ✅ 已提交（9/12） | Permanent Dofollow (DA 51)，免费队列约 4 个月，预计 1 月前后上线。 |
| **GSC 催收录** | ✅ 8/8 全部完成（11-02） | 昨天失败的 `/600-seconds-to-minutes` 已补交成功。6 个 keeper 页 + 首页 + seconds converter 全部请求过编入索引。 |

## ⛔ 结案：表单已填满但停止提交（3 个，按你的规则）

三家都卡在同一堵墙：**免费档排满 + dofollow 与徽章/付费绑定**。

| 站 | 表单完成度 | 停止原因 | 如果你想破例 |
|---|---|---|---|
| **FastLaunch** | 100%（文字+Logo+产品图+分类 Finance&FinTech/Productivity/SaaS+Tech Stack React/Next.js/Tailwind+Platforms web+Pricing free） | 免费档已排到 **2027-06-05**（7 个月）；且 dofollow 附加条件是"当日 Top 3 或挂徽章" | Premium $9.9 跳过队列（当前规则禁付费）。标签页停在 Launch Date 步骤 |
| **21st.tools** | 100%（文字+缩略图+分类 Productivity+标签） | 最终按钮是 "Verify badge & submit"：**免费收录以首页挂 21st.tools 徽章为条件**，验证不过无法提交 | 在站点挂徽章（embed 代码在表单页，我 5 分钟能部署）→ 我再点提交。你已裁定不挂，故停止 |
| **OpenHunts** | 100%（文字+Logo+产品图+分类+Platforms web+Pricing free，预览卡完美） | 免费档排队 **~60 周**；Premium $9.9 保证 dofollow；Highlight $20 | 同上，选档后按钮变 "Pay and Submit"。标签页停在选择档位步骤 |

三个标签页都开在 ZCode 内置浏览器里，内容完整有效——**你若决定为任何一家破例（挂徽章或付费），告诉我，几分钟内完成提交**。

## 🟡 必须你自己来（1 个）

| 站 | 阻塞原因 | 做法 |
|---|---|---|
| **Indie Hackers** | 弹窗式 Google OAuth 被内嵌浏览器拦截（页面提示 "browser blocked the Google window"），这是自动化浏览器的能力边界 | 你自己的浏览器登录 → 提交，文案照 `directory-submission-copy.md` |

## ⛔ 跳过（结论不变）

Tech Base Directory（付费）/ WebCatalog（不适用）/ Uneed（付费）/ StartupBase（要挂 badge）/ Product Hunt（nofollow）

---

## 外链战役总账（截至 11-02）

- **实际拿到**：Launching Next 一条 DA51 dofollow（排队中）+ GSC 全部页面催收录完毕
- **被商业规则挡住**：FastLaunch / 21st.tools / OpenHunts 三家（免费档排队 7~15 个月，插队=徽章或付费）
- **结论**：目录站这条路的免费红利基本耗尽。下一步的外链杠杆回到 next-actions.md 第四节：
  Reddit/Quora 真实场景帖（文案就绪）+ 11 月中旬 GSC 复盘后决定是否扩 keepers

## 代发技术备忘（第二轮新增）

- **文件注入方案**：`atob → Uint8Array → File → DataTransfer → input.files + dispatch(input/change)`，
  在 FastLaunch、21st.tools、OpenHunts 全部成功（9 月记录的"React 重渲染清空文件"未复现——
  关键是**先填完所有文字字段、最后注图、立即点下一步**，不给重渲染留时间窗）
- 受控复选框/单选（React）：`.click()`/`check()` 都不改状态，必须用**真实鼠标坐标点击**（cua），
  且先 `scrollIntoView` 再取实时坐标（表单随内容增高，坐标会漂移）
- Google OAuth 同窗口跳转型登录（Launch Vault/FastLaunch/21st.tools/OpenHunts）均可自动化；
  弹窗型（Indie Hackers）不可
