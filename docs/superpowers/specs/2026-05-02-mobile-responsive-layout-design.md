# Mobile Responsive Layout — Design

## Background

整個 app 目前完全沒有 responsive 處理。所有 inline style 都是寫死的桌面尺寸（panel padding 28px、grid `1fr 200px`、metric 字級 32px 等）。在 375px viewport 截圖實測後，確認以下問題：

| # | 嚴重度 | 問題 |
|---|------|------|
| 1 | 🔴 | 風險屬性 label 被 chips 擠成垂直單字（生/涯/階/段、健/康/運/動/傷/害/風/險） |
| 2 | 🔴 | 「目前緊急預備金餘額」label 被擠成 3 字一行 |
| 3 | 🟡 | 職業範例表右欄只剩 ~135px，內容每 6 字斷行 |
| 4 | 🟡 | Panel padding 28px 太厚，內容區只剩 ~263px |
| 5 | 🟢 | Header tagline / disclaimer 16px 行高 1.7 在窄屏偏鬆 |
| 6 | 🟢 | 結果區 4 個 metric 在窄屏堆成單欄全寬，視覺單調 |
| 7 | 🟢 | 支出輸入 `1fr 160px` 在窄屏偏緊 |
| 8 | 🟢 | 金額字級 32px 在大數字會溢出 |

（原 audit 第 5 點「section 圓點跑到容器外」實測對齊正確，剔除。）

## Approach

**單一斷點：** `@media (max-width: 640px)`

**樣式策略：** 把會被 mobile 覆蓋的屬性從 inline 移到 CSS class，避免 inline style（specificity = 1000）壓過 class（10）需要 `!important`。Class 名稱用 `.efc-` 前綴避免與第三方衝突。

**檔案變動：**
- `src/styles/global.css` — 新增 8 個 utility class 與對應 @media 規則
- 各 component — 把對應屬性從 inline 改為 className（保留顏色、font-family 等非 responsive 的 inline）

## Class Inventory

| Class | 套用處 | Desktop | Mobile (≤640px) | 解決 |
|---|---|---|---|---|
| `.efc-page` | `App.tsx` 外層 div | `padding: 40px 24px` | `padding: 24px 16px` | 整體呼吸 |
| `.efc-panel` | Input/Risk/Result 三個 panel 容器 | `padding: 28px` | `padding: 18px` | #4 |
| `.efc-row` | 所有 `1fr X` 兩欄列<br>（InputSourceSection 支出列、RiskProfileSection 風險列、CalculationResultSection 餘額列） | （無 desktop 規則；沿用 inline 的 `grid-template-columns`） | `grid-template-columns: 1fr !important`<br>`gap: 8px`<br>（單欄堆疊） | #1, #2, #7 |
| `.efc-examples-grid` | 職業範例表 | `grid-template-columns: 160px 1fr` | `grid-template-columns: auto 1fr`<br>（讓等級欄按內容自動寬度） | #3 |
| `.efc-metric-grid` | metric 卡片外層 | `grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))` | `grid-template-columns: 1fr 1fr` | #6 |
| `.efc-metric-value` | metric 數值 span | `font-size: 32px` | `font-size: 24px` | #8 |
| `.efc-tagline` | Header tagline / disclaimer 段落 | `font-size: 16px; line-height: 1.7` | `font-size: 14px; line-height: 1.6` | #5 |

備註：`.efc-row` 的 desktop 欄寬不同（160 / 200 / auto / `1fr auto`），需要分子類或保留該 column-template 在 inline，僅在 mobile 用 `.efc-row` 覆蓋為單欄。實作時採後者：inline 只寫 desktop 的 `grid-template-columns`，加上 `.efc-row` class；@media 規則用 `.efc-row { grid-template-columns: 1fr !important }` 覆蓋。**例外：因為 inline 仍會壓過 class，這條 mobile 規則需要 `!important`**。其他 class 的屬性（padding、font-size）會完全從 inline 移除改用 class，所以不需要 `!important`。

## Implementation Order

1. 在 `global.css` 新增所有 class 與 @media 規則
2. App.tsx 加 `.efc-page`，移除 inline padding
3. InputSourceSection 加 `.efc-panel` + `.efc-row`，移除 inline padding（grid-template-columns 保留 inline）
4. RiskProfileSection 加 `.efc-panel` + `.efc-row` + `.efc-examples-grid`
5. CalculationResultSection 加 `.efc-panel` + `.efc-row` + `.efc-metric-grid` + `.efc-metric-value`
6. Header 加 `.efc-tagline`，移除兩個段落 inline 的 font-size/line-height

## Verification

啟動 vite dev，preview 在 4 個寬度截圖：375 / 414 / 768 / 1280。
- 375 / 414：確認所有問題消失
- 768：確認 desktop layout 不受影響（>640 不套 mobile 規則）
- 1280：確認大螢幕無 regression

每個寬度截至少一張包含三個 section 的關鍵畫面。

## Out of Scope

- 不引入 CSS-in-JS、Tailwind、CSS module
- 不重寫成 CSS variables（`theme.ts` 維持 TS export）
- 不新增 dark/light mode、不調整配色
- 不處理 < 375px 的極窄屏（已超出常見手機視窗）
- 不調整 Footer（Footer 用 flex-wrap，已能適應窄屏）
