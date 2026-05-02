export type Currency = 'TWD' | 'JPY' | 'USD';

export type InputMode = 'manual' | 'beancount';

export type ExpenseClassification = 'essential' | 'discretionary' | 'unknown';

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

export interface BeancountRow {
  account: string;
  amount: number;
}

export interface RiskFactors {
  incomeStability: 'stable' | 'mixed' | 'unstable';
  dependents: 'none' | 'partner' | 'family';
  industry: 'tech' | 'volatile' | 'seasonal';
  relocation: 'yes' | 'no';
  healthRisk: 'low' | 'medium' | 'high';
}

export type RiskFactorKey = keyof RiskFactors;
