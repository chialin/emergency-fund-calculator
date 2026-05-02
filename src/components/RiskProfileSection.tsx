import { T } from '../styles/theme';
import { Chip } from './Chip';
import { SectionTitle } from './SectionTitle';
import type { RiskFactorKey, RiskFactors } from '../types';

interface Props {
  riskFactors: RiskFactors;
  setRiskFactors: (r: RiskFactors) => void;
}

interface RiskField {
  key: RiskFactorKey;
  label: string;
  sub: string;
  options: { v: string; l: string }[];
}

const fields: RiskField[] = [
  {
    key: 'incomeStability',
    label: '收入穩定度',
    sub: 'Income Stability',
    options: [
      { v: 'stable', l: '穩定 / +0' },
      { v: 'mixed', l: '混合 / +1' },
      { v: 'unstable', l: '不穩定 / +3' },
    ],
  },
  {
    key: 'dependents',
    label: '扶養人',
    sub: 'Dependents',
    options: [
      { v: 'none', l: '無 / +0' },
      { v: 'partner', l: '伴侶 / +1' },
      { v: 'family', l: '家庭 / +2' },
    ],
  },
  {
    key: 'industry',
    label: '產業特性',
    sub: 'Industry Volatility',
    options: [
      { v: 'tech', l: '科技 / +0' },
      { v: 'volatile', l: '波動 / +1' },
      { v: 'seasonal', l: '季節 / +2' },
    ],
  },
  {
    key: 'relocation',
    label: '是否在跨國/換工作期',
    sub: 'Major Transition',
    options: [
      { v: 'no', l: '否 / +0' },
      { v: 'yes', l: '是 / +2' },
    ],
  },
  {
    key: 'healthRisk',
    label: '健康/運動傷害風險',
    sub: 'Health Risk',
    options: [
      { v: 'low', l: '低 / +0' },
      { v: 'medium', l: '中 / +1' },
      { v: 'high', l: '高 / +2' },
    ],
  },
];

export function RiskProfileSection({ riskFactors, setRiskFactors }: Props) {
  return (
    <section style={{ marginBottom: 48 }}>
      <SectionTitle number="02" title="Risk Profile" />

      <div
        style={{
          background: T.bgPanel,
          border: `1px solid ${T.border}`,
          padding: 28,
          borderRadius: 2,
        }}
      >
        {fields.map((field) => (
          <div
            key={field.key}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 16,
              alignItems: 'center',
              padding: '14px 0',
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontSize: 14,
                  color: T.text,
                }}
              >
                {field.label}
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
                {field.sub}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {field.options.map((opt) => (
                <Chip
                  key={opt.v}
                  active={riskFactors[field.key] === opt.v}
                  onClick={() =>
                    setRiskFactors({
                      ...riskFactors,
                      [field.key]: opt.v,
                    } as RiskFactors)
                  }
                >
                  {opt.l}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
