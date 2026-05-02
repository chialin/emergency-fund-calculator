import { T } from '../styles/theme';
import { SectionTitle } from './SectionTitle';
import { fmtMoney, fmtPct } from '../lib/format';
import type { Currency } from '../types';

interface Props {
  currency: Currency;
  monthlyEssential: number;
  recommendedMonths: number;
  targetAmount: number;
  fundRatio: number;
  coverageMonths: number;
  completionPct: number;
  gap: number;
  currentSavings: number;
  setCurrentSavings: (n: number) => void;
}

export function CalculationResultSection({
  currency,
  monthlyEssential,
  recommendedMonths,
  targetAmount,
  fundRatio,
  coverageMonths,
  completionPct,
  gap,
  currentSavings,
  setCurrentSavings,
}: Props) {
  const note =
    coverageMonths < 3
      ? '目前緩衝不足以撐過一般失業期。BLS 數據顯示美國失業中位期間約 11 週,建議優先把預備金堆到至少 3 個月支出的水位。'
      : coverageMonths < recommendedMonths
        ? `目前緩衝可撐 ${coverageMonths.toFixed(1)} 個月,接近基本水位但尚未涵蓋你的風險畫像所需的 ${recommendedMonths} 個月。`
        : coverageMonths > recommendedMonths * 1.5
          ? '緩衝相當充裕。可考慮將超額部位移至中短債或債券 ETF 以對抗通膨,讓現金部位的機會成本降低。'
          : '緩衝符合你的風險畫像,可以開始把每月儲蓄分配到投資部位累積長期資產。';

  return (
    <section style={{ marginBottom: 48 }}>
      <SectionTitle number="03" title="Calculation Result" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 1,
          background: T.border,
          border: `1px solid ${T.border}`,
        }}
      >
        <Metric label="Monthly Essential" value={fmtMoney(monthlyEssential, currency)} />
        <Metric label="Recommended Months" value={`${recommendedMonths}`} unit="months" />
        <Metric label="Target Reserve" value={fmtMoney(targetAmount, currency)} color={T.accent} />
        <Metric label="Fund Ratio" value={fundRatio.toFixed(1)} unit="×" />
      </div>

      <div
        style={{
          background: T.bgPanel,
          border: `1px solid ${T.border}`,
          padding: 28,
          borderRadius: 2,
          marginTop: 24,
        }}
      >
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
          <div>
            <div style={{ fontFamily: "'Noto Serif TC', serif", fontSize: 14, color: T.text }}>
              目前緊急預備金餘額
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: T.textFaint,
                marginTop: 2,
                letterSpacing: '0.05em',
              }}
            >
              Current Emergency Savings Balance
            </div>
          </div>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
            style={{
              background: T.bg,
              border: `1px solid ${T.borderLight}`,
              color: T.text,
              padding: '10px 14px',
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              textAlign: 'right',
              outline: 'none',
              width: '100%',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
        </div>

        <div style={{ marginTop: 24 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 10,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: T.textDim,
            }}
          >
            <span>PROGRESS</span>
            <span style={{ color: completionPct >= 1 ? T.ok : T.accent }}>
              {fmtPct(completionPct)} · 涵蓋 {coverageMonths.toFixed(1)} 個月
            </span>
          </div>
          <div
            style={{ height: 4, background: T.border, position: 'relative', overflow: 'hidden' }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(completionPct * 100, 100)}%`,
                background: completionPct >= 1 ? T.ok : T.accent,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: T.textDim,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>缺口 / Gap</span>
            <span style={{ color: gap > 0 ? T.warn : T.ok }}>
              {gap > 0 ? fmtMoney(gap, currency) : '✓ 已達標'}
            </span>
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 13,
            color: T.textDim,
            lineHeight: 1.7,
            fontStyle: 'italic',
            borderLeft: `2px solid ${T.accent}`,
            paddingLeft: 16,
            margin: '20px 0 0',
          }}
        >
          {note}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: string;
  unit?: string;
  color?: string;
}) {
  return (
    <div style={{ background: T.bgPanel, padding: '24px 20px' }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.2em',
          color: T.textDim,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        {label}
      </div>
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
        {value}
        {unit && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: T.textFaint,
              marginLeft: 6,
            }}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
