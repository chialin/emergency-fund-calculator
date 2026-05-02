export type Currency = 'TWD' | 'USD';

export type Language = 'zh' | 'en';

export interface ManualExpenses {
  housing: number;
  utilities: number;
  groceries: number;
  insurance: number;
  transport: number;
  medical: number;
  other: number;
}

export type ManualExpenseKey = keyof ManualExpenses;

export interface RiskFactors {
  incomeStability: 'stable' | 'mixed' | 'unstable';
  dependents: 'none' | 'partner' | 'family';
  industry: 'tech' | 'volatile' | 'seasonal';
  relocation: 'yes' | 'no';
  healthRisk: 'low' | 'medium' | 'high';
}

export type RiskFactorKey = keyof RiskFactors;
