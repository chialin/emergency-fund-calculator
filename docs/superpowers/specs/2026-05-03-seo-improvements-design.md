# SEO Improvements — Design

**Date:** 2026-05-03
**Status:** Draft, awaiting user review
**Scope:** Static-only metadata + structured data improvements for emergency-fund.chialin.me

---

## Goals

1. **Search ranking** — rank for Chinese keywords on Google: 緊急預備金計算 / 緊急預備金 / 緊急備用金 / 緊急預備金要存多少 / 失業準備金 / 4% 法則 / 3-6-9 法則.
2. **Basic SEO hygiene** — proper meta tags, canonical URL, structured data, robots, sitemap.

**Out of scope:**
- Custom Open Graph image design (deferred — was option B in brainstorming).
- SSR / prerendering (deferred — was option B in approach question; current bet: Google CSR rendering is sufficient for a single-page calculator).
- English keyword optimization (Chinese-first per user direction).
- Component / CSS / build-pipeline changes.

---

## Approach

Pure static-file changes. No React, build, or routing modifications. All SEO assets live in `index.html` (meta tags + inline JSON-LD) and `public/` (robots.txt, sitemap.xml).

Trade-off accepted: CSR SPAs serve an empty `<div id="root"></div>` to crawlers on first byte. Google generally renders JS in a second pass; for a single-page low-content calculator the metadata + JSON-LD layer is the main signal anyway. If Search Console shows ranking issues after ~3 months, revisit prerendering.

---

## Files Changed

### `index.html` — replace `<head>` content

**Title:**
```
緊急預備金計算器｜試算你需要存幾個月生活費 - Emergency Fund Calculator
```

**Meta tags (in order):**
- `description` (Chinese-first, 152 chars or less)
- `keywords` (full keyword list)
- `robots` = `index, follow`
- `author` = `chialin.me`
- `canonical` link → `https://emergency-fund.chialin.me/`
- Open Graph: `og:title`, `og:description`, `og:type=website`, `og:url`, `og:locale=zh_TW`, `og:site_name`
- Twitter Card: `twitter:card=summary`, `twitter:title`, `twitter:description`
- (Existing: viewport, charset, favicon, font preconnect — kept as-is)

**Description copy:**
> 線上免費緊急預備金試算工具。依 CFPB 指引、BLS 失業統計與 4% 安全提領法則，根據你的必要支出與五維風險係數，計算緊急備用金要存幾個月生活費（3-6-9 法則）。涵蓋失業準備金、扶養人風險、產業特性等情境。

**Keywords:**
> 緊急預備金, 緊急預備金計算, 緊急預備金計算器, 緊急備用金, 緊急預備金要存多少, 緊急預備金 幾個月, 失業準備金, 4% 法則, 3-6-9 法則, emergency fund calculator

**OG / Twitter description (shortened):**
> 依 CFPB 指引與 BLS 失業統計，計算個人化緊急預備金

### `index.html` — add JSON-LD scripts

Two `<script type="application/ld+json">` blocks before `</head>`:

**Block 1 — `WebApplication`:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "緊急預備金計算器",
  "description": "依 CFPB 指引與 BLS 失業統計計算個人化緊急預備金的線上工具",
  "url": "https://emergency-fund.chialin.me/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "inLanguage": ["zh-Hant", "en"],
  "isAccessibleForFree": true,
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "TWD" }
}
```

**Block 2 — `FAQPage`** (5 Q&As):

1. **緊急預備金是什麼？**
   失業、生病、意外時不需動用投資、不影響生活的現金緩衝。

2. **緊急預備金要存多少？**
   通用公式 3-6-9 個月必要支出，依個人風險上修。本計算器會依五維風險係數算出個人化月數。

3. **為什麼是 3-6-9 法則？**
   基於美國 BLS 失業期統計，中位失業期約 11 週（≈3 個月），加上扶養人、產業景氣等風險逐級加碼到 6、9 個月。

4. **哪些支出要算進緊急預備金？**
   依 CFPB 指引，只計入失業期間「無法削減」的必要支出：房租/房貸、水電、伙食、保險、交通、醫療、扶養。可裁切的娛樂、訂閱、儲蓄不算。

5. **存到緊急預備金後該放哪？**
   高流動性帳戶（活存、貨幣型基金、短期定存），不要投股票。可參考 4% 安全提領法則作為長期投資的提領上限參考。

### `public/robots.txt` (new)

```
User-agent: *
Allow: /
Sitemap: https://emergency-fund.chialin.me/sitemap.xml
```

### `public/sitemap.xml` (new)

Single `<url>` entry pointing to `https://emergency-fund.chialin.me/`. `lastmod` set to deployment date (manual update on significant content changes — no auto-generation needed for one-page site).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://emergency-fund.chialin.me/</loc>
    <lastmod>2026-05-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## Verification

After deploy:
1. **View source** on https://emergency-fund.chialin.me/ — confirm new title, description, OG tags, JSON-LD blocks present.
2. **Google Rich Results Test** (https://search.google.com/test/rich-results) — paste URL, confirm `WebApplication` and `FAQPage` both detected with no errors.
3. **Lighthouse SEO audit** in Chrome DevTools — expect score ≥ 95.
4. **robots.txt** & **sitemap.xml** reachable directly: `/robots.txt`, `/sitemap.xml`.
5. **Search Console** — submit sitemap manually, monitor index status over the next 2–4 weeks.

---

## Future follow-ups (not this spec)

- Bespoke OG image (1200×630 PNG) once social sharing matters.
- Prerendering (vite-plugin-prerender) if Search Console shows poor indexing after ~3 months.
- English-language landing variant if international traffic appears.
- Add `BreadcrumbList` and / or `HowTo` schemas if site grows beyond one page.
