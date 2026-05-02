import { useEffect, useMemo, useState } from 'react';
import { T } from './styles/theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputSourceSection } from './components/InputSourceSection';
import { RiskProfileSection } from './components/RiskProfileSection';
import { CalculationResultSection } from './components/CalculationResultSection';
import { calculateRecommendedMonths } from './lib/risk';
import { loadLanguage, saveLanguage } from './lib/i18n';
import type { Currency, Language, ManualExpenses, RiskFactors } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => loadLanguage());
  const [currency, setCurrency] = useState<Currency>('TWD');

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  const [manualExpenses, setManualExpenses] = useState<ManualExpenses>({
    housing: 13000,
    utilities: 2000,
    groceries: 6000,
    insurance: 2000,
    transport: 1200,
    medical: 1000,
    other: 1500,
  });

  const [riskFactors, setRiskFactors] = useState<RiskFactors>({
    lifeStage: 'working',
    incomeStability: 'stable',
    dependents: 'none',
    industry: 'tech',
    relocation: 'no',
    healthRisk: 'low',
  });

  const [currentSavings, setCurrentSavings] = useState(150000);

  const monthlyEssential = useMemo(
    () => Object.values(manualExpenses).reduce<number>((a, b) => a + (Number(b) || 0), 0),
    [manualExpenses],
  );

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
        <Header language={language} setLanguage={setLanguage} />

        <InputSourceSection
          language={language}
          currency={currency}
          setCurrency={setCurrency}
          manualExpenses={manualExpenses}
          setManualExpenses={setManualExpenses}
        />

        <RiskProfileSection
          language={language}
          riskFactors={riskFactors}
          setRiskFactors={setRiskFactors}
        />

        <CalculationResultSection
          language={language}
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

        <Footer language={language} />
      </div>
    </div>
  );
}
