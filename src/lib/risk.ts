import type { RiskFactors } from '../types';

export const calculateRecommendedMonths = (rf: RiskFactors): number => {
  let base = 3;
  if (rf.incomeStability === 'mixed') base += 1;
  if (rf.incomeStability === 'unstable') base += 3;
  if (rf.dependents === 'partner') base += 1;
  if (rf.dependents === 'family') base += 2;
  if (rf.industry === 'volatile') base += 1;
  if (rf.industry === 'seasonal') base += 2;
  if (rf.relocation === 'yes') base += 2;
  if (rf.healthRisk === 'medium') base += 1;
  if (rf.healthRisk === 'high') base += 2;
  return Math.min(base, 18);
};
