# Emergency Fund Reserve Calculator

基於 CFPB 指引、BLS 失業統計與 4% 安全提領法則的個人化緊急預備金計算器。

## Features

- 雙模式輸入:手動填寫 vs Beancount query 解析
- 五維風險係數:收入穩定度、扶養人、產業特性、跨國/換工作期、健康風險
- 自動分類必要支出 vs 可裁切支出 (支援繁中關鍵字)
- 多幣別支援:TWD / USD

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
3. 選擇 repo,設定:
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

- `CLOUDFLARE_API_TOKEN` — 在 Cloudflare Dashboard → My Profile → API Tokens 建立,使用 "Edit Cloudflare Workers" 範本
- `CLOUDFLARE_ACCOUNT_ID` — 在 Workers & Pages 概覽頁右側可看到

push 到 `main` 分支即觸發 `.github/workflows/deploy.yml`。

## Project Structure

```
src/
├── App.tsx                          # 主應用,組合各區塊
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
│   ├── beancount.ts                 # beancount query 解析 + 必要支出分類
│   └── risk.ts                      # 風險係數加成計算
└── styles/
    ├── global.css
    └── theme.ts                     # 配色 token
```

## Methodology

- **3-6-9 法則**:基於美國 BLS 失業期統計 (中位 11.1 週)
- **必要支出 vs 可裁切支出**:依 CFPB 指引,僅計入失業期間無法削減的開支
- **風險係數加權**:從基底 3 個月開始,依個人情境累加,上限 18 個月

詳見 `Footer` 區塊的 SOURCES。

## License

Private. Personal finance tooling, not a substitute for professional advice.
