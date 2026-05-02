# Mobile Responsive Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add responsive layout for ≤640px viewports — fix 8 audited issues from the 375px mobile audit using a single `@media` breakpoint and shared `.efc-*` CSS classes.

**Architecture:** Add 7 utility classes to `src/styles/global.css` (no extra files, no CSS-in-JS, no Tailwind). Each class either holds the desktop+mobile properties entirely (`.efc-page`, `.efc-panel`, `.efc-tagline`, `.efc-metric-value`, `.efc-metric-grid`, `.efc-examples-grid`) or only adds a mobile override (`.efc-row` uses `!important` to beat inline `grid-template-columns`). Components keep colors/font-family/typography in inline style; only responsive properties move to classes.

**Tech Stack:** React 19 + Vite + TypeScript, plain CSS (no preprocessor).

**Spec:** [docs/superpowers/specs/2026-05-02-mobile-responsive-layout-design.md](../specs/2026-05-02-mobile-responsive-layout-design.md)

**Verification convention (used in every task):**
- Vite dev server is already running on `http://localhost:5173` via `mcp__Claude_Preview__preview_start name="vite-dev"`. Reuse the existing serverId from `preview_list`. HMR will pick up changes automatically.
- After each component edit, resize to 375×812 (`preview_resize preset: "mobile"`), scroll to the changed section via `preview_eval window.scrollTo(0, Y)`, screenshot, and confirm the audited issue is gone.
- After the final task, also verify at 768 (tablet) and 1280 (desktop) to catch regressions outside the breakpoint.

---

### Task 1: Add all responsive CSS classes to global.css

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Append the responsive classes and `@media` block to `global.css`**

Append the following to the end of `src/styles/global.css` (after the existing `input[type='number']` rule):

```css
/* ─────────────────────────────────────────────────────────────
   Responsive utility classes (.efc- prefix = emergency-fund-calc)
   See docs/superpowers/specs/2026-05-02-mobile-responsive-layout-design.md
   ───────────────────────────────────────────────────────────── */

.efc-page {
  padding: 40px 24px;
}

.efc-panel {
  padding: 28px;
}

.efc-tagline {
  font-size: 16px;
  line-height: 1.7;
}

.efc-metric-value {
  font-size: 32px;
}

.efc-metric-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.efc-examples-grid {
  grid-template-columns: 160px 1fr;
}

@media (max-width: 640px) {
  .efc-page {
    padding: 24px 16px;
  }
  .efc-panel {
    padding: 18px;
  }
  .efc-tagline {
    font-size: 14px;
    line-height: 1.6;
  }
  .efc-metric-value {
    font-size: 24px;
  }
  .efc-metric-grid {
    grid-template-columns: 1fr 1fr;
  }
  .efc-examples-grid {
    grid-template-columns: auto 1fr;
  }
  .efc-row {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
  }
}
```

- [ ] **Step 2: Verify CSS loads without parse errors**

Open the dev server URL (already running) and check `preview_logs serverId=<id> level=error`. Expected: no CSS parse errors. The page renders unchanged at desktop width because no class is applied to any element yet.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add .efc-* responsive utility classes for mobile breakpoint"
```

---

### Task 2: Apply `.efc-page` to App outer container

**Files:**
- Modify: `src/App.tsx:54-64`

- [ ] **Step 1: Replace inline `padding: '40px 24px'` with `className="efc-page"`**

In `src/App.tsx`, change the outer `<div>` (currently lines 55–64):

Before:
```tsx
<div
  style={{
    minHeight: '100vh',
    background: T.bg,
    color: T.text,
    fontFamily: "'Noto Serif TC', 'Fraunces', Georgia, serif",
    padding: '40px 24px',
    backgroundImage: `radial-gradient(circle at 20% 0%, rgba(212, 165, 116, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(122, 158, 126, 0.03) 0%, transparent 50%)`,
  }}
>
```

After:
```tsx
<div
  className="efc-page"
  style={{
    minHeight: '100vh',
    background: T.bg,
    color: T.text,
    fontFamily: "'Noto Serif TC', 'Fraunces', Georgia, serif",
    backgroundImage: `radial-gradient(circle at 20% 0%, rgba(212, 165, 116, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 100%, rgba(122, 158, 126, 0.03) 0%, transparent 50%)`,
  }}
>
```

- [ ] **Step 2: Verify at 375px viewport**

```
mcp__Claude_Preview__preview_resize serverId=<id> preset="mobile"
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 0)"
mcp__Claude_Preview__preview_screenshot
```

Expected: Outer horizontal padding tighter (16px instead of 24px). Header content shifts ~8px left.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "style(mobile): tighten page padding via .efc-page"
```

---

### Task 3: Apply `.efc-panel` and `.efc-row` to InputSourceSection

**Files:**
- Modify: `src/components/InputSourceSection.tsx`

- [ ] **Step 1: Add `.efc-panel` to panel container, remove inline `padding: 28`**

In `InputSourceSection.tsx` find the panel `<div>` (lines 66–73). Change:

Before:
```tsx
<div
  style={{
    background: T.bgPanel,
    border: `1px solid ${T.border}`,
    padding: 28,
    borderRadius: 2,
  }}
>
```

After:
```tsx
<div
  className="efc-panel"
  style={{
    background: T.bgPanel,
    border: `1px solid ${T.border}`,
    borderRadius: 2,
  }}
>
```

- [ ] **Step 2: Add `.efc-row` to expense input row**

The `inputRowStyle` constant (lines 26–33) is used inline at line 98. We need to add a className to that row. Change the JSX usage:

Before:
```tsx
{expenseItems.map((item) => (
  <div key={item.key} style={inputRowStyle}>
```

After:
```tsx
{expenseItems.map((item) => (
  <div key={item.key} className="efc-row" style={inputRowStyle}>
```

(The `inputRowStyle` constant itself stays unchanged — it still defines `gridTemplateColumns: '1fr 160px'` for desktop. The `.efc-row` `@media` rule overrides it on mobile via `!important`.)

- [ ] **Step 3: Verify at 375px viewport**

```
mcp__Claude_Preview__preview_resize serverId=<id> preset="mobile"
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 600)"
mcp__Claude_Preview__preview_screenshot
```

Expected:
- Panel padding visibly tighter (18px)
- Each expense row stacks: label on top, numeric input below it (full width)
- No more `1fr 160px` 2-column layout on mobile

- [ ] **Step 4: Commit**

```bash
git add src/components/InputSourceSection.tsx
git commit -m "style(mobile): stack expense rows and shrink panel padding"
```

---

### Task 4: Apply `.efc-panel`, `.efc-row`, and `.efc-examples-grid` to RiskProfileSection

**Files:**
- Modify: `src/components/RiskProfileSection.tsx`

- [ ] **Step 1: Add `.efc-panel` to risk panel and remove inline `padding: 28`**

Find the panel `<div>` (lines 133–140). Change:

Before:
```tsx
<div
  style={{
    background: T.bgPanel,
    border: `1px solid ${T.border}`,
    padding: 28,
    borderRadius: 2,
  }}
>
```

After:
```tsx
<div
  className="efc-panel"
  style={{
    background: T.bgPanel,
    border: `1px solid ${T.border}`,
    borderRadius: 2,
  }}
>
```

- [ ] **Step 2: Add `.efc-row` to risk field rows**

The `renderField` function (lines 85–127) renders each row with inline style. Add className to the outer `<div>`. Change line 86–98:

Before:
```tsx
<div
  key={field.key}
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 16,
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: `1px solid ${T.border}`,
    opacity: dimmed ? 0.4 : 1,
    transition: 'opacity 0.2s',
  }}
>
```

After:
```tsx
<div
  key={field.key}
  className="efc-row"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 16,
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: `1px solid ${T.border}`,
    opacity: dimmed ? 0.4 : 1,
    transition: 'opacity 0.2s',
  }}
>
```

- [ ] **Step 3: Add `.efc-examples-grid` to industry examples grid and remove inline `gridTemplateColumns`**

Find the examples grid (lines 204–212). Change:

Before:
```tsx
<div
  style={{
    display: 'grid',
    gridTemplateColumns: '160px 1fr',
    gap: '8px 20px',
    fontSize: 12,
    lineHeight: 1.6,
  }}
>
```

After:
```tsx
<div
  className="efc-examples-grid"
  style={{
    display: 'grid',
    gap: '8px 20px',
    fontSize: 12,
    lineHeight: 1.6,
  }}
>
```

- [ ] **Step 4: Verify at 375px viewport**

```
mcp__Claude_Preview__preview_resize serverId=<id> preset="mobile"
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 1700)"
mcp__Claude_Preview__preview_screenshot
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 2300)"
mcp__Claude_Preview__preview_screenshot
```

Expected:
- Risk field labels (生涯階段、收入穩定度、扶養人、健康風險, etc.) now display on a single horizontal line above the chips, instead of stacking as vertical single characters
- Chips wrap below the label row
- Industry examples table: level column auto-sizes (≈80px for "穩定產業／+0"), examples column gets the rest — content no longer wraps every 6 chars
- Panel padding tighter

- [ ] **Step 5: Commit**

```bash
git add src/components/RiskProfileSection.tsx
git commit -m "style(mobile): stack risk fields and resize examples grid"
```

---

### Task 5: Apply `.efc-panel`, `.efc-row`, `.efc-metric-grid`, `.efc-metric-value` to CalculationResultSection

**Files:**
- Modify: `src/components/CalculationResultSection.tsx`

- [ ] **Step 1: Add `.efc-metric-grid` to the metrics grid and remove inline `gridTemplateColumns`**

Find the metrics grid (lines 51–59). Change:

Before:
```tsx
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 1,
    background: T.border,
    border: `1px solid ${T.border}`,
  }}
>
```

After:
```tsx
<div
  className="efc-metric-grid"
  style={{
    display: 'grid',
    gap: 1,
    background: T.border,
    border: `1px solid ${T.border}`,
  }}
>
```

- [ ] **Step 2: Add `.efc-metric-value` to Metric value div and remove inline `fontSize: 32`**

Find the `Metric` helper component (lines 192–243). Change the value `<div>` (lines 217–225):

Before:
```tsx
<div
  style={{
    fontFamily: "'Fraunces', serif",
    fontSize: 32,
    fontWeight: 300,
    color: color ?? T.text,
    lineHeight: 1,
    letterSpacing: '-0.02em',
  }}
>
```

After:
```tsx
<div
  className="efc-metric-value"
  style={{
    fontFamily: "'Fraunces', serif",
    fontWeight: 300,
    color: color ?? T.text,
    lineHeight: 1,
    letterSpacing: '-0.02em',
  }}
>
```

- [ ] **Step 3: Add `.efc-panel` to the savings/progress panel and remove inline `padding: 28`**

Find the panel `<div>` (lines 81–89). Change:

Before:
```tsx
<div
  style={{
    background: T.bgPanel,
    border: `1px solid ${T.border}`,
    padding: 28,
    borderRadius: 2,
    marginTop: 24,
  }}
>
```

After:
```tsx
<div
  className="efc-panel"
  style={{
    background: T.bgPanel,
    border: `1px solid ${T.border}`,
    borderRadius: 2,
    marginTop: 24,
  }}
>
```

- [ ] **Step 4: Add `.efc-row` to the current savings input row**

Find the savings row (lines 90–99). Change:

Before:
```tsx
<div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 200px',
    gap: 16,
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: `1px solid ${T.border}`,
  }}
>
```

After:
```tsx
<div
  className="efc-row"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 200px',
    gap: 16,
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: `1px solid ${T.border}`,
  }}
>
```

- [ ] **Step 5: Verify at 375px viewport**

```
mcp__Claude_Preview__preview_resize serverId=<id> preset="mobile"
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 2200)"
mcp__Claude_Preview__preview_screenshot
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 2700)"
mcp__Claude_Preview__preview_screenshot
```

Expected:
- 4 metric cards now render in a 2×2 grid (not 4 stacked rows nor 4-up squashed)
- Metric values use 24px font instead of 32px
- "目前緊急預備金餘額" label now displays on full row above the input field (not squeezed into 3-char wraps)
- Panel padding tighter

- [ ] **Step 6: Commit**

```bash
git add src/components/CalculationResultSection.tsx
git commit -m "style(mobile): 2x2 metric grid, smaller money font, stack savings row"
```

---

### Task 6: Apply `.efc-tagline` to Header tagline and disclaimer

**Files:**
- Modify: `src/components/Header.tsx:65-91`

- [ ] **Step 1: Add `.efc-tagline` to tagline `<p>` and remove inline `fontSize: 16`**

Find the tagline paragraph (lines 65–79). Change:

Before:
```tsx
<p
  style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 16,
    color: T.textDim,
    maxWidth: 600,
    lineHeight: 1.7,
  }}
>
  {t(language, 'header.tagline.l1')}
  <br />
  {t(language, 'header.tagline.l2')}
  <br />
  {t(language, 'header.tagline.l3')}
</p>
```

After:
```tsx
<p
  className="efc-tagline"
  style={{
    fontFamily: "'JetBrains Mono', monospace",
    color: T.textDim,
    maxWidth: 600,
  }}
>
  {t(language, 'header.tagline.l1')}
  <br />
  {t(language, 'header.tagline.l2')}
  <br />
  {t(language, 'header.tagline.l3')}
</p>
```

- [ ] **Step 2: Add `.efc-tagline` to disclaimer `<p>` and remove inline `fontSize: 16`**

Find the disclaimer paragraph (lines 80–91). Change:

Before:
```tsx
<p
  style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 16,
    color: T.textFaint,
    maxWidth: 600,
    marginTop: 12,
    marginBottom: 0,
  }}
>
  {t(language, 'footer.disclaimer')}
</p>
```

After:
```tsx
<p
  className="efc-tagline"
  style={{
    fontFamily: "'JetBrains Mono', monospace",
    color: T.textFaint,
    maxWidth: 600,
    marginTop: 12,
    marginBottom: 0,
  }}
>
  {t(language, 'footer.disclaimer')}
</p>
```

- [ ] **Step 3: Verify at 375px viewport**

```
mcp__Claude_Preview__preview_resize serverId=<id> preset="mobile"
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 0)"
mcp__Claude_Preview__preview_screenshot
```

Expected:
- Tagline and disclaimer text shrinks from 16px → 14px on mobile
- Line spacing tightens slightly (1.7 → 1.6)
- Header overall takes less vertical space

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx
git commit -m "style(mobile): tighten header tagline/disclaimer typography"
```

---

### Task 7: Final regression verification at 4 widths

**Files:** None modified

- [ ] **Step 1: Verify mobile (375×812)**

```
mcp__Claude_Preview__preview_resize serverId=<id> preset="mobile"
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 0)"
mcp__Claude_Preview__preview_screenshot
```

Then scroll to y=900, 1700, 2300, 2700 and screenshot each.

Expected (compare against pre-fix screenshots in this session):
1. Risk labels horizontal, not vertical single chars ✓
2. Savings label horizontal, not 3-char wraps ✓
3. Examples table: examples column wider, no 6-char wraps ✓
4. Panel padding visibly tighter (18px) ✓
5. Tagline/disclaimer 14px ✓
6. Metric grid 2×2 ✓
7. Expense rows stacked ✓
8. Metric values 24px ✓

- [ ] **Step 2: Verify tablet (768×1024) — no mobile rules apply**

```
mcp__Claude_Preview__preview_resize serverId=<id> width=768 height=1024
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 0)"
mcp__Claude_Preview__preview_screenshot
```

Expected: Layout matches desktop (panel padding 28px, metric grid auto-fit, metric values 32px, rows in 2-column grid). Mobile rules MUST NOT trigger because 768 > 640.

- [ ] **Step 3: Verify desktop (1280×800) — full desktop**

```
mcp__Claude_Preview__preview_resize serverId=<id> preset="desktop"
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 0)"
mcp__Claude_Preview__preview_screenshot
```

Expected: Identical to layout before this PR. No regressions in metric grid (4-up auto-fit), panel padding, typography.

- [ ] **Step 4: Verify the 414×896 (iPhone Plus) edge case**

```
mcp__Claude_Preview__preview_resize serverId=<id> width=414 height=896
mcp__Claude_Preview__preview_eval expression="window.scrollTo(0, 0)"
mcp__Claude_Preview__preview_screenshot
```

Expected: Mobile rules still apply (414 ≤ 640). Same fixes as 375 but slightly more breathing room.

- [ ] **Step 5: Run typecheck and lint to catch any TS/lint regressions**

```bash
npm run -s build 2>&1 | tail -20
```

Expected: build completes without TypeScript errors. (No tests exist in this project — TS compile + visual verification is the verification.)

- [ ] **Step 6: No commit needed for verification-only task**

If all 4 widths look correct and the build passes, the PR is ready. If any issue is found, file it as a separate fix task and re-verify.

---

## Self-Review Checklist (already done by author)

- ✅ Spec coverage: all 8 audited issues mapped to a task (1→T4, 2→T5, 3→T4, 4→T3/T4/T5, 5→T6, 6→T5, 7→T3, 8→T5)
- ✅ No placeholders, no "TBD", no "similar to Task N"
- ✅ Type/property consistency: class names match the spec table verbatim (`.efc-page`, `.efc-panel`, `.efc-row`, `.efc-tagline`, `.efc-metric-value`, `.efc-metric-grid`, `.efc-examples-grid`)
- ✅ Each component task explicitly states what stays in inline style vs what moves to className
