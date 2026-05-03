# OG Image & Social Card

## 目標

幫網站加上 Open Graph image 與 `summary_large_image` 規格的 Twitter card，
讓 Facebook、LINE、Twitter / X、Slack、Discord 等平台分享時能渲染品牌化大圖卡，而非僅文字。

## 範圍

- 新增 OG 圖檔（PNG）放在 `public/og-image.png`
- 保留 SVG 原檔在 `public/og-image.svg`，未來可由 Claude 修改後重新轉檔
- 修改 `index.html` 加入 `og:image` / `twitter:image` 等 meta 標籤
- 不修改任何元件、樣式、或業務邏輯

## OG Image 設計

**檔案規格**
- 1200 × 630 px（Facebook、LinkedIn、Twitter `summary_large_image` 標準）
- PNG，目標檔案大小 < 100 KB
- 純 SVG 元素繪製，僅依賴系統字體（PingFang TC、Songti TC、Georgia、Menlo）

**版面**

```
┌─────────────────────────────────────────────────────────────┐
│  細格紋背景（opacity 0.04）                                   │
│                                                             │
│  §  EMERGENCY FUND CALCULATOR        ┌──────────────────┐   │
│                                      │      扶養人        │   │
│                                      │  負債 ◇──◇ 收入   │   │  五維雷達
│  緊急預備金計算器                     │     ◇    ◇       │   │
│  試算你需要存幾個月生活費              │   產業    健康    │   │
│                                      │  ─────────────   │   │
│                                      │   建議備足月數     │   │
│                                      │     6 個月        │   │  大數字
│  ─                                   │   ▓▓ ▓▓ ░░       │   │  3-6-9 bar
│  emergency-fund.chialin.me           │    3   6   9     │   │
│                                      └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**色票**（沿用 `src/styles/theme.ts`）
- 背景 `#0F0E0C`、Panel `#1A1814`、Border `#2A2620`
- 主文字 `#F2EBDC`、次文字 `#8B8275`、淡文字 `#5A5347`
- Accent `#D4A574`（§ 符號、6 個月、雷達線、進度條已填段、URL）

**文案**
- Eyebrow：`§ EMERGENCY FUND CALCULATOR`
- 主標：`緊急預備金計算器`
- 副標：`試算你需要存幾個月生活費`
- 結果：`建議備足月數` / `6 個月`
- URL：`emergency-fund.chialin.me`

## index.html 變更

新增 / 修改的 meta tags：

```html
<!-- 新增 -->
<meta property="og:image" content="https://emergency-fund.chialin.me/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="緊急預備金計算器 - 試算你需要存幾個月生活費" />

<!-- 修改：summary → summary_large_image -->
<meta name="twitter:card" content="summary_large_image" />

<!-- 新增 -->
<meta name="twitter:image" content="https://emergency-fund.chialin.me/og-image.png" />
```

## 圖檔產生流程

未來如需修改 OG 圖（例如改數字、調文案、換配色）：

1. 編輯 `public/og-image.svg`
2. 執行轉檔指令（不需安裝額外套件，sharp 已在 node_modules）：

```bash
node -e "
import('sharp').then(({default: sharp}) => {
  const fs = require('fs');
  sharp(fs.readFileSync('public/og-image.svg'), { density: 192 })
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toBuffer()
    .then(buf => { fs.writeFileSync('public/og-image.png', buf); console.log('done', buf.length); });
});
"
```

不加 `package.json` 腳本，避免污染。重新生成 1-2 次後若覺得頻繁，再考慮加 `npm run og`。

## 驗證

- 啟動 dev server，瀏覽器訪問 `http://localhost:5173/og-image.png` 確認圖檔正確
- View Source 確認 `<head>` 中新 meta tag 存在
- 部署後（可後續）用 [opengraph.xyz](https://www.opengraph.xyz) 或 Facebook Sharing Debugger 驗證社群平台預覽

## 不做

- 不為每個內容頁產生獨立 OG 圖（網站只有單頁）
- 不加 build 階段自動轉檔（手動轉夠用，避免 CI/CD 複雜度）
- 不支援動態 OG（runtime 產生）
