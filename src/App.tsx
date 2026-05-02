import { useMemo, useState } from 'react';
import { T } from './styles/theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputSourceSection } from './components/InputSourceSection';
import { RiskProfileSection } from './components/RiskProfileSection';
import { CalculationResultSection } from './components/CalculationResultSection';
import { classifyExpense } from './lib/beancount';
import { calculateRecommendedMonths } from './lib/risk';
import type {
  BeancountRow,
  Currency,
  ExpenseClassification,
  InputMode,
  ManualExpenses,
  RiskFactors,
} from './types';

export default function App() {
  const [inputMode, setInputMode] = useState<InputMode>('manual');
  const [currency, setCurrency] = useState<Currency>('TWD');

  const [manualExpenses, setManualExpenses] = useState<ManualExpenses>({
    housing: 25000,
    utilities: 3500,
    groceries: 8000,
    insurance: 4500,
    transport: 3000,
    medical: 2000,
    other: 2500,
  });

  const [parsedRows, setParsedRows] = useState<BeancountRow[]>([]);
  const [classifications, setClassifications] = useState<Record<string, ExpenseClassification>>({});
  const [monthsAveraged, setMonthsAveraged] = useState(3);

  const [riskFactors, setRiskFactors] = useState<RiskFactors>({
    incomeStability: 'stable',
    dependents: 'none',
    industry: 'tech',
    relocation: 'yes',
    healthRisk: 'low',
  });

  const [currentSavings, setCurrentSavings] = useState(150000);

  const monthlyEssential = useMemo(() => {
    if (inputMode === 'manual') {
      return Object.values(manualExpenses).reduce<number>((a, b) => a + (Number(b) || 0), 0);
    }
    const total = parsedRows.reduce<number>((sum, row) => {
      const cls = classifications[row.account] || classifyExpense(row.account);
      if (cls === 'essential') return sum + row.amount;
      return sum;
    }, 0);
    return total / monthsAveraged;
  }, [inputMode, manualExpenses, parsedRows, classifications, monthsAveraged]);

  const recommendedMonths = useMemo(() => calculateRecommendedMonths(riskFactors), [riskFactors]);

  const targetAmount = monthlyEssential * recommendedMonths;
  const coverageMonths = monthlyEssential > 0 ? currentSavings / monthlyEssential : 0;
  const fundRatio = monthlyEssential > 0 ? currentSavings / monthlyEssential : 0;
  const completionPct = targetAmount > 0 ? Math.min(currentSavings / targetAmount, 1) : 0;
  const gap = Math.max(0, targetAmount - currentSavings);

  return (
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
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Header />

        <InputSourceSection
          inputMode={inputMode}
          setInputMode={setInputMode}
          currency={currency}
          setCurrency={setCurrency}
          manualExpenses={manualExpenses}
          setManualExpenses={setManualExpenses}
          parsedRows={parsedRows}
          setParsedRows={setParsedRows}
          classifications={classifications}
          setClassifications={setClassifications}
          monthsAveraged={monthsAveraged}
          setMonthsAveraged={setMonthsAveraged}
        />

        <RiskProfileSection riskFactors={riskFactors} setRiskFactors={setRiskFactors} />

        <CalculationResultSection
          currency={currency}
          monthlyEssential={monthlyEssential}
          recommendedMonths={recommendedMonths}
          targetAmount={targetAmount}
          fundRatio={fundRatio}
          coverageMonths={coverageMonths}
          completionPct={completionPct}
          gap={gap}
          currentSavings={currentSavings}
          setCurrentSavings={setCurrentSavings}
        />

        <Footer />
      </div>
    </div>
  );
}
