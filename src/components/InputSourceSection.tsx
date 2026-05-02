import { useState } from 'react';
import { T } from '../styles/theme';
import { Chip } from './Chip';
import { SectionTitle } from './SectionTitle';
import { fmtMoney } from '../lib/format';
import { classifyExpense, parseBeancountQuery } from '../lib/beancount';
import { t, type TranslationKey } from '../lib/i18n';
import type {
  BeancountRow,
  Currency,
  ExpenseClassification,
  InputMode,
  Language,
  ManualExpenseKey,
  ManualExpenses,
} from '../types';

interface Props {
  language: Language;
  inputMode: InputMode;
  setInputMode: (m: InputMode) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  manualExpenses: ManualExpenses;
  setManualExpenses: (e: ManualExpenses) => void;
  parsedRows: BeancountRow[];
  setParsedRows: (r: BeancountRow[]) => void;
  classifications: Record<string, ExpenseClassification>;
  setClassifications: (c: Record<string, ExpenseClassification>) => void;
  monthsAveraged: number;
  setMonthsAveraged: (n: number) => void;
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
  inputMode,
  setInputMode,
  currency,
  setCurrency,
  manualExpenses,
  setManualExpenses,
  parsedRows,
  setParsedRows,
  classifications,
  setClassifications,
  monthsAveraged,
  setMonthsAveraged,
}: Props) {
  const [beancountText, setBeancountText] = useState('');

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
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
          {(['manual', 'beancount'] as InputMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              style={{
                flex: 1,
                padding: '14px 20px',
                background: 'transparent',
                border: 'none',
                borderBottom:
                  inputMode === mode ? `2px solid ${T.accent}` : '2px solid transparent',
                color: inputMode === mode ? T.text : T.textDim,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onClick={() => setInputMode(mode)}
            >
              {mode === 'manual'
                ? t(language, 'input.tab.manual')
                : t(language, 'input.tab.beancount')}
            </button>
          ))}
        </div>

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

        {/* Manual mode */}
        {inputMode === 'manual' && (
          <div>
            {expenseItems.map((item) => (
              <div key={item.key} style={inputRowStyle}>
                <div>
                  <div style={labelStyle}>{t(language, item.labelKey)}</div>
                </div>
                <input
                  type="number"
                  style={inputStyle}
                  value={manualExpenses[item.key]}
                  onChange={(e) =>
                    setManualExpenses({
                      ...manualExpenses,
                      [item.key]: Number(e.target.value) || 0,
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* Beancount mode */}
        {inputMode === 'beancount' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}>{t(language, 'input.beancount.prompt')}</div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: T.textFaint,
                  marginTop: 2,
                  letterSpacing: '0.05em',
                }}
              >
                bean-query yourbook.bean &quot;SELECT account, sum(position) FROM
                has_account(&apos;Expenses&apos;) GROUP BY account&quot;
              </div>
            </div>
            <textarea
              style={{
                background: T.bg,
                border: `1px solid ${T.borderLight}`,
                color: T.text,
                padding: 14,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                minHeight: 200,
                width: '100%',
                boxSizing: 'border-box',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.6,
              }}
              placeholder={`Expenses:Housing:Rent          75000.00 TWD
Expenses:Food:Groceries        24000.00 TWD
Expenses:Utilities:Electric     4500.00 TWD
Expenses:Insurance:Health      13500.00 TWD
Expenses:Transport:MRT          9000.00 TWD
Expenses:Food:Dining           18000.00 TWD
Expenses:Entertainment         12000.00 TWD`}
              value={beancountText}
              onChange={(e) => {
                setBeancountText(e.target.value);
                const parsed = parseBeancountQuery(e.target.value);
                setParsedRows(parsed);
                const cls: Record<string, ExpenseClassification> = {};
                parsed.forEach((r) => {
                  cls[r.account] = classifyExpense(r.account);
                });
                setClassifications(cls);
              }}
            />

            {parsedRows.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <div style={{ ...inputRowStyle, gridTemplateColumns: '1fr 120px' }}>
                  <div>
                    <div style={labelStyle}>{t(language, 'input.beancount.months')}</div>
                  </div>
                  <input
                    type="number"
                    style={inputStyle}
                    value={monthsAveraged}
                    min={1}
                    onChange={(e) => setMonthsAveraged(Math.max(1, Number(e.target.value) || 1))}
                  />
                </div>

                <div
                  style={{
                    marginTop: 16,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    color: T.textDim,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  {t(language, 'input.beancount.result')}
                </div>
                <div style={{ background: T.bg, border: `1px solid ${T.border}`, padding: 16 }}>
                  {parsedRows.map((row, i) => {
                    const cls = classifications[row.account] || 'unknown';
                    return (
                      <div
                        key={i}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr auto auto',
                          gap: 12,
                          padding: '6px 0',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          alignItems: 'center',
                          borderBottom:
                            i < parsedRows.length - 1 ? `1px solid ${T.border}` : 'none',
                        }}
                      >
                        <span
                          style={{
                            color: T.text,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {row.account}
                        </span>
                        <span style={{ color: T.textDim }}>{fmtMoney(row.amount, currency)}</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {(['essential', 'discretionary'] as const).map((c) => (
                            <Chip
                              key={c}
                              size="sm"
                              variant={c === 'essential' ? 'success' : 'danger'}
                              active={cls === c}
                              onClick={() =>
                                setClassifications({
                                  ...classifications,
                                  [row.account]: c,
                                })
                              }
                            >
                              {c === 'essential'
                                ? t(language, 'input.beancount.chip.essential')
                                : t(language, 'input.beancount.chip.discretionary')}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
