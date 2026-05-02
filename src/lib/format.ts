import type { Currency } from '../types';

export const fmtNumber = (n: number): string => {
  if (!isFinite(n)) return '';
  return Math.round(n).toLocaleString('en-US');
};

export const fmtMoney = (n: number, currency: Currency = 'TWD'): string => {
  if (!isFinite(n)) return '—';
  const symbol = currency === 'USD' ? '$' : 'NT$';
  return symbol + fmtNumber(n);
};

export const fmtPct = (n: number): string => `${(n * 100).toFixed(1)}%`;
