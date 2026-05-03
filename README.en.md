# Emergency Fund Reserve Calculator

**English** | [繁體中文](README.md)

![Emergency Fund Calculator preview](public/og-image.png)

🌐 **Live demo:** [emergency-fund.chialin.me](https://emergency-fund.chialin.me)

A personalized emergency fund calculator based on CFPB guidelines, BLS unemployment data, and the 4% safe withdrawal rule.

## Features

- Manual input across 7 essential expense categories
- 5-dimension risk coefficients: income stability, dependents, industry volatility, expat / job-change exposure, health risk
- Multi-currency support: TWD / USD
- Defaults aligned with Taiwan DGBAS national average per-capita monthly consumption (~NT$23,500); single-person northern Taiwan baseline ~NT$26,700

## Default Expenses Reference

Defaults are calibrated to "single-person northern Taiwan, essentials only". Sources:

- [Taiwan DGBAS · Family Income & Expenditure Survey](https://www.stat.gov.tw/cl.aspx?n=2693) — national per-capita monthly consumption ~NT$23,500
- [Yahoo News · City-level per-capita spending](https://tw.news.yahoo.com/%E5%A4%A9%E9%BE%8D%E5%9C%8B%E7%94%9F%E6%B4%BB%E8%B2%BB%E5%A5%BD%E8%B2%B4-%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BA%BA%E5%9D%87%E6%9C%88%E6%B6%88%E8%B2%BB3%E8%90%AC3730%E5%85%83%E5%B1%85%E5%86%A0-121724188.html) — Taipei NT$33,730 / Nantou NT$18,650
- [Money Magazine](https://money.cmoney.tw/article/28218) — category breakdown
- [Business Next · Household structure analysis 2014–2024](https://www.bnext.com.tw/article/84783/taiwan-household-consumption-structure-2014-2024-analysis) — housing / medical / food account for ~57%

Scale up proportionally for two-person or family scenarios.

## Tech Stack

- Vite 5 + React 18 + TypeScript
- ESLint (flat config) + Prettier
- Cloudflare Pages deployment

## Local Development

```bash
npm install
npm run dev          # Dev mode (http://localhost:5173)
npm run typecheck    # TypeScript type check
npm run lint         # ESLint
npm run lint:fix     # Auto-fix lint issues
npm run format       # Prettier format
npm run build        # Output to dist/
npm run preview      # Preview build output
```

## Deployment to Cloudflare Pages

### Option 1: Cloudflare Dashboard (recommended for first-time setup)

1. Push this repo to GitHub
2. Sign in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create → Pages → Connect to Git
3. Choose the repo and configure:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: `20` (add `NODE_VERSION=20` to Environment variables)
4. Deploy

### Option 2: Wrangler CLI (deploy from local)

```bash
npx wrangler login
npm run deploy
```

### Option 3: GitHub Actions (auto deploy)

Set the following Secrets in your GitHub repo:

- `CLOUDFLARE_API_TOKEN` — create from Cloudflare Dashboard → My Profile → API Tokens using the "Edit Cloudflare Workers" template
- `CLOUDFLARE_ACCOUNT_ID` — visible on the right side of the Workers & Pages overview page

Pushing to the `main` branch triggers `.github/workflows/deploy.yml`.

## Project Structure

```
src/
├── App.tsx                          # Main app composition
├── main.tsx                         # React entry
├── types.ts                         # Shared TypeScript types
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SectionTitle.tsx
│   ├── Chip.tsx
│   ├── InputSourceSection.tsx       # 01 Expense input
│   ├── RiskProfileSection.tsx       # 02 Risk coefficients
│   └── CalculationResultSection.tsx # 03 Calculation result
├── lib/
│   ├── format.ts                    # Money / percent formatting
│   ├── i18n.ts                      # ZH / EN translations
│   └── risk.ts                      # Risk coefficient compounding
└── styles/
    ├── global.css
    └── theme.ts                     # Color tokens
```

## Methodology

- **3-6-9 rule**: based on US BLS unemployment duration statistics (median 11.1 weeks)
- **Essential vs discretionary spending**: per CFPB guidelines — only includes expenses that can't be cut during unemployment
- **Risk coefficient weighting**: starts from a 3-month base, additively scales by individual factors, capped at 18 months

See the SOURCES section in the `Footer` for full citations.

## License

Private. Personal finance tooling, not a substitute for professional advice.
