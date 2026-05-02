import { Fragment } from 'react';
import { T } from '../styles/theme';
import { Chip } from './Chip';
import { SectionTitle } from './SectionTitle';
import { t, type TranslationKey } from '../lib/i18n';
import type { Language, RiskFactorKey, RiskFactors } from '../types';

interface Props {
  language: Language;
  riskFactors: RiskFactors;
  setRiskFactors: (r: RiskFactors) => void;
}

interface RiskField {
  key: RiskFactorKey;
  labelKey: TranslationKey;
  options: { v: string; labelKey: TranslationKey }[];
}

const lifeStageField: RiskField = {
  key: 'lifeStage',
  labelKey: 'risk.lifeStage.label',
  options: [
    { v: 'working', labelKey: 'risk.lifeStage.working' },
    { v: 'retired', labelKey: 'risk.lifeStage.retired' },
  ],
};

const workingFields: RiskField[] = [
  {
    key: 'incomeStability',
    labelKey: 'risk.income.label',
    options: [
      { v: 'stable', labelKey: 'risk.income.stable' },
      { v: 'mixed', labelKey: 'risk.income.mixed' },
      { v: 'unstable', labelKey: 'risk.income.unstable' },
    ],
  },
  {
    key: 'dependents',
    labelKey: 'risk.dependents.label',
    options: [
      { v: 'none', labelKey: 'risk.dependents.none' },
      { v: 'partner', labelKey: 'risk.dependents.partner' },
      { v: 'family', labelKey: 'risk.dependents.family' },
    ],
  },
  {
    key: 'industry',
    labelKey: 'risk.industry.label',
    options: [
      { v: 'tech', labelKey: 'risk.industry.tech' },
      { v: 'volatile', labelKey: 'risk.industry.volatile' },
      { v: 'seasonal', labelKey: 'risk.industry.seasonal' },
    ],
  },
  {
    key: 'relocation',
    labelKey: 'risk.relocation.label',
    options: [
      { v: 'no', labelKey: 'risk.relocation.no' },
      { v: 'yes', labelKey: 'risk.relocation.yes' },
    ],
  },
  {
    key: 'healthRisk',
    labelKey: 'risk.health.label',
    options: [
      { v: 'low', labelKey: 'risk.health.low' },
      { v: 'medium', labelKey: 'risk.health.medium' },
      { v: 'high', labelKey: 'risk.health.high' },
    ],
  },
];

const exampleRows: { labelKey: TranslationKey; examplesKey: TranslationKey }[] = [
  { labelKey: 'risk.industry.tech', examplesKey: 'risk.industry.examples.tech' },
  { labelKey: 'risk.industry.volatile', examplesKey: 'risk.industry.examples.volatile' },
  { labelKey: 'risk.industry.seasonal', examplesKey: 'risk.industry.examples.seasonal' },
];

export function RiskProfileSection({ language, riskFactors, setRiskFactors }: Props) {
  const isRetired = riskFactors.lifeStage === 'retired';

  const renderField = (field: RiskField, dimmed: boolean) => (
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
      <div>
        <div
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 14,
            color: T.text,
          }}
        >
          {t(language, field.labelKey)}
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
            {t(language, opt.labelKey)}
          </Chip>
        ))}
      </div>
    </div>
  );

  return (
    <section style={{ marginBottom: 48 }}>
      <SectionTitle number="02" title={t(language, 'section.risk')} />

      <div
        style={{
          background: T.bgPanel,
          border: `1px solid ${T.border}`,
          padding: 28,
          borderRadius: 2,
        }}
      >
        {renderField(lifeStageField, false)}
        {workingFields.map((f) => renderField(f, isRetired))}

        {isRetired && (
          <div
            style={{
              marginTop: 20,
              background: T.bg,
              border: `1px solid ${T.borderLight}`,
              borderLeft: `3px solid ${T.accent}`,
              padding: 18,
              borderRadius: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.2em',
                color: T.accent,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {t(language, 'risk.lifeStage.note.title')}
            </div>
            <div
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 13,
                lineHeight: 1.7,
                color: T.textDim,
              }}
            >
              {t(language, 'risk.lifeStage.note.body')}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 16,
          background: T.bg,
          border: `1px solid ${T.border}`,
          padding: 20,
          borderRadius: 2,
          opacity: isRetired ? 0.4 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.2em',
            color: T.textDim,
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          {t(language, 'risk.industry.examples.title')}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr',
            gap: '8px 20px',
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.15em',
              color: T.textFaint,
              textTransform: 'uppercase',
            }}
          >
            {t(language, 'risk.industry.examples.col.level')}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.15em',
              color: T.textFaint,
              textTransform: 'uppercase',
            }}
          >
            {t(language, 'risk.industry.examples.col.examples')}
          </div>
          {exampleRows.map((row) => (
            <Fragment key={row.labelKey}>
              <div
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  color: T.text,
                  paddingTop: 4,
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                {t(language, row.labelKey)}
              </div>
              <div
                style={{
                  fontFamily: "'Noto Serif TC', serif",
                  color: T.textDim,
                  paddingTop: 4,
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                {t(language, row.examplesKey)}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
