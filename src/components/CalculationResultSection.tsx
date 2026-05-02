import { T } from '../styles/theme';
import { SectionTitle } from './SectionTitle';
import { fmtMoney, fmtPct } from '../lib/format';
import { t } from '../lib/i18n';
import type { Currency, Language } from '../types';

interface Props {
  language: Language;
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
  language,
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
      ? t(language, 'result.note.lt3')
      : coverageMonths < recommendedMonths
        ? t(language, 'result.note.ltRecommended', {
            coverage: coverageMonths.toFixed(1),
            recommended: recommendedMonths,
          })
        : coverageMonths > recommendedMonths * 1.5
          ? t(language, 'result.note.surplus')
          : t(language, 'result.note.met');

  return (
    <section style={{ marginBottom: 48 }}>
      <SectionTitle number="03" title={t(language, 'section.result')} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 1,
          background: T.border,
          border: `1px solid ${T.border}`,
        }}
      >
        <Metric
          label={t(language, 'result.monthlyEssential')}
          value={fmtMoney(monthlyEssential, currency)}
        />
        <Metric
          label={t(language, 'result.recommendedMonths')}
          value={`${recommendedMonths}`}
          unit={t(language, 'result.recommendedMonths.unit')}
        />
        <Metric
          label={t(language, 'result.targetReserve')}
          value={fmtMoney(targetAmount, currency)}
          color={T.accent}
        />
        <Metric
          label={t(language, 'result.fundRatio')}
          value={fundRatio.toFixed(1)}
          unit={t(language, 'result.fundRatio.unit')}
        />
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
              {t(language, 'result.currentSavings')}
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
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {t(language, 'result.progress')}
            </span>
            <span style={{ color: completionPct >= 1 ? T.ok : T.accent }}>
              {fmtPct(completionPct)} ·{' '}
              {t(language, 'result.coverage', { n: coverageMonths.toFixed(1) })}
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
            <span>{t(language, 'result.gap')}</span>
            <span style={{ color: gap > 0 ? T.warn : T.ok }}>
              {gap > 0 ? fmtMoney(gap, currency) : t(language, 'result.gap.met')}
            </span>
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 18,
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
