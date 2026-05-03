# Emergency Fund Reserve Calculator

[English](README.en.md) | **繁體中文**

![Emergency Fund Calculator preview](public/og-image.png)

🌐 **Live demo:** [emergency-fund.chialin.me](https://emergency-fund.chialin.me)

基於 CFPB 指引、BLS 失業統計與 4% 安全提領法則的個人化緊急預備金計算器。

## Features

- 手動填寫七大類必要支出
- 五維風險係數:收入穩定度、扶養人、產業特性、跨國/換工作期、健康風險
- 多幣別支援:TWD / USD
- 預設值對齊主計總處全台人均月消費（約 NT$23,500），北部單人 baseline 約 NT$26,700

## Default Expenses Reference

預設值以「北部單人都會、僅必要支出」為基準。資料來源:

- [行政院主計總處 · 家庭收支調查](https://www.stat.gov.tw/cl.aspx?n=2693) — 全台每人月消費平均約 NT$23,500
- [Yahoo News · 縣市人均月消費](https://tw.news.yahoo.com/%E5%A4%A9%E9%BE%8D%E5%9C%8B%E7%94%9F%E6%B4%BB%E8%B2%BB%E5%A5%BD%E8%B2%B4-%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BA%BA%E5%9D%87%E6%9C%88%E6%B6%88%E8%B2%BB3%E8%90%AC3730%E5%85%83%E5%B1%85%E5%86%A0-121724188.html) — 台北 NT$33,730 / 南投 NT$18,650
- [Money 錢雜誌](https://money.cmoney.tw/article/28218) — 類別細項拆解
- [數位時代 · 家庭結構分析 2014–2024](https://www.bnext.com.tw/article/84783/taiwan-household-consumption-structure-2014-2024-analysis) — 住宅/醫療/食品三大項佔比約 57%

兩人或家庭情境請依比例上調。

## Tech Stack

- Vite 5 + React 18 + TypeScript
- ESLint (flat config) + Prettier
- Cloudflare Pages 部署

## Local Development

```bash
npm install
npm run dev          # 開發模式 (http://localhost:5173)
npm run typecheck    # TypeScript 型別檢查
npm run lint         # ESLint 檢查
npm run lint:fix     # 自動修復可修復的問題
npm run format       # Prettier 格式化
npm run build        # 產出 dist/
npm run preview      # 預覽 build 結果
```

## Deployment to Cloudflare Pages

### 方式一:Cloudflare Dashboard (推薦初次設定)

1. 將此 repo 推送到 GitHub
2. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create → Pages → Connect to Git
3. 選擇 repo，設定:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: `20` (在 Environment variables 加入 `NODE_VERSION=20`)
4. Deploy

### 方式二:Wrangler CLI (本地直接 deploy)

```bash
npx wrangler login
npm run deploy
```

### 方式三:GitHub Actions (自動部署)

在 GitHub repo 設定 Secrets:

- `CLOUDFLARE_API_TOKEN` — 在 Cloudflare Dashboard → My Profile → API Tokens 建立，使用 "Edit Cloudflare Workers" 範本
- `CLOUDFLARE_ACCOUNT_ID` — 在 Workers & Pages 概覽頁右側可看到

push 到 `main` 分支即觸發 `.github/workflows/deploy.yml`。

## Project Structure

```
src/
├── App.tsx                          # 主應用，組合各區塊
├── main.tsx                         # React 入口
├── types.ts                         # 共用 TypeScript 型別
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SectionTitle.tsx
│   ├── Chip.tsx
│   ├── InputSourceSection.tsx       # 01 支出輸入
│   ├── RiskProfileSection.tsx       # 02 風險係數
│   └── CalculationResultSection.tsx # 03 計算結果
├── lib/
│   ├── format.ts                    # 金額/百分比格式化
│   ├── i18n.ts                      # 中英文翻譯字典
│   └── risk.ts                      # 風險係數加成計算
└── styles/
    ├── global.css
    └── theme.ts                     # 配色 token
```

## Methodology

- **3-6-9 法則**:基於美國 BLS 失業期統計 (中位 11.1 週)
- **必要支出 vs 可裁切支出**:依 CFPB 指引，僅計入失業期間無法削減的開支
- **風險係數加權**:從基底 3 個月開始，依個人情境累加，上限 18 個月

詳見 `Footer` 區塊的 SOURCES。

## License

Private. Personal finance tooling, not a substitute for professional advice.
