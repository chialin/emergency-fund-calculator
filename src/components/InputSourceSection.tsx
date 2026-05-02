import { T } from '../styles/theme';
import { Chip } from './Chip';
import { SectionTitle } from './SectionTitle';
import { t, type TranslationKey } from '../lib/i18n';
import { NumericInput } from './NumericInput';
import type { Currency, Language, ManualExpenseKey, ManualExpenses } from '../types';

interface Props {
  language: Language;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  manualExpenses: ManualExpenses;
  setManualExpenses: (e: ManualExpenses) => void;
}

const expenseItems: { key: ManualExpenseKey; labelKey: TranslationKey }[] = [
  { key: 'housing', labelKey: 'input.expense.housing' },
  { key: 'utilities', labelKey: 'input.expense.utilities' },
  { key: 'groceries', labelKey: 'input.expense.groceries' },
  { key: 'insurance', labelKey: 'input.expense.insurance' },
  { key: 'transport', labelKey: 'input.expense.transport' },
  { key: 'medical', labelKey: 'input.expense.medical' },
  { key: 'other', labelKey: 'input.expense.other' },
];

const inputRowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 160px',
  gap: 16,
  alignItems: 'center',
  padding: '14px 0',
  borderBottom: `1px solid ${T.border}`,
};

const labelStyle = {
  fontFamily: "'Noto Serif TC', serif",
  fontSize: 14,
  color: T.text,
};

const inputStyle = {
  background: T.bg,
  border: `1px solid ${T.borderLight}`,
  color: T.text,
  padding: '10px 14px',
  fontSize: 14,
  fontFamily: "'JetBrains Mono', monospace",
  textAlign: 'right' as const,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box' as const,
  transition: 'border-color 0.2s',
};

export function InputSourceSection({
  language,
  currency,
  setCurrency,
  manualExpenses,
  setManualExpenses,
}: Props) {
  return (
    <section style={{ marginBottom: 48 }}>
      <SectionTitle number="01" title={t(language, 'section.input')} />

      <div
        style={{
          background: T.bgPanel,
          border: `1px solid ${T.border}`,
          padding: 28,
          borderRadius: 2,
        }}
      >
        {/* Currency */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.2em',
              color: T.textDim,
              textTransform: 'uppercase',
            }}
          >
            {t(language, 'input.currency')}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['TWD', 'USD'] as Currency[]).map((c) => (
              <Chip key={c} active={currency === c} onClick={() => setCurrency(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          {expenseItems.map((item) => (
            <div key={item.key} style={inputRowStyle}>
              <div>
                <div style={labelStyle}>{t(language, item.labelKey)}</div>
              </div>
              <NumericInput
                style={inputStyle}
                ariaLabel={t(language, item.labelKey)}
                value={manualExpenses[item.key]}
                onChange={(n) =>
                  setManualExpenses({
                    ...manualExpenses,
                    [item.key]: n,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
