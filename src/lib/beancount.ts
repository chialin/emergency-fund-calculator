import type { BeancountRow, ExpenseClassification } from '../types';

const ESSENTIAL_KEYWORDS = [
  'rent',
  'mortgage',
  'housing',
  'utilit',
  'electric',
  'gas',
  'water',
  'insurance',
  'health',
  'medical',
  'grocer',
  'food:grocer',
  'transport',
  'commut',
  'fuel',
  'phone',
  'internet',
  '房',
  '租',
  '電',
  '水',
  '瓦斯',
  '保險',
  '健保',
  '醫療',
  '日用',
  '通勤',
  '網路',
  '電信',
  '食材',
];

const DISCRETIONARY_KEYWORDS = [
  'dining',
  'restaurant',
  'entertain',
  'travel',
  'shopping',
  'subscript',
  'gift',
  'coffee',
  'hobby',
  'game',
  '外食',
  '娛樂',
  '旅遊',
  '購物',
  '訂閱',
  '禮物',
  '咖啡',
  '嗜好',
];

export const classifyExpense = (account: string): ExpenseClassification => {
  const lower = account.toLowerCase();
  for (const kw of ESSENTIAL_KEYWORDS) {
    if (lower.includes(kw)) return 'essential';
  }
  for (const kw of DISCRETIONARY_KEYWORDS) {
    if (lower.includes(kw)) return 'discretionary';
  }
  return 'unknown';
};

export const parseBeancountQuery = (text: string): BeancountRow[] => {
  const lines = text.trim().split('\n');
  const results: BeancountRow[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('---')) continue;
    if (trimmed.toLowerCase().startsWith('account')) continue;

    // CSV 格式
    if (trimmed.includes(',')) {
      const parts = trimmed.split(',').map((s) => s.trim());
      if (parts.length >= 2) {
        const amount = parseFloat(parts[1].replace(/[^\d.-]/g, ''));
        if (!isNaN(amount) && parts[0].toLowerCase().includes('expense')) {
          results.push({ account: parts[0], amount: Math.abs(amount) });
          continue;
        }
      }
    }

    // 空白分隔格式
    const match = trimmed.match(/^(\S+)\s+([-\d,.]+)\s*([A-Z]{3})?/);
    if (match) {
      const account = match[1];
      const amount = parseFloat(match[2].replace(/,/g, ''));
      if (!isNaN(amount) && account.toLowerCase().includes('expense')) {
        results.push({ account, amount: Math.abs(amount) });
      }
    }
  }
  return results;
};
