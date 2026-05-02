import type { Language } from '../types';

const dict = {
  zh: {
    'header.kicker': '§ 個人理財工具 · v1.0',
    'header.title1': '緊急預備金',
    'header.title2': '儲備計算器',
    'header.tagline.l1': '緊急預備金的存在，是為了在失業、突發醫療或家庭事件發生時，',
    'header.tagline.l2': '不必被迫變賣投資部位、舉高息債、或中斷長期理財計畫 ——',
    'header.tagline.l3': '依據月支出與風險屬性，計算所需的緊急預備金。',

    'footer.methodology':
      '方法 · 計算基於 CFPB 指引、BLS 失業統計、4% 安全提領法則 (Trinity Study)。',
    'footer.sources': '來源 · St. Louis Fed · Britannica Money · Big ERN Safe Withdrawal Series',
    'footer.defaultsSource': '預設支出參考 · 北部單人月支出基準對齊主計總處全台人均 23,500',
    'footer.disclaimer': '※ 本工具為個人理財決策輔助，不構成投資建議。',

    'section.input': '輸入來源',
    'section.risk': '風險屬性',
    'section.result': '計算結果',

    'input.currency': '幣別',

    'input.expense.housing': '房租 / 房貸',
    'input.expense.utilities': '水電瓦斯網路',
    'input.expense.groceries': '基本食材',
    'input.expense.insurance': '保險費',
    'input.expense.transport': '通勤交通',
    'input.expense.medical': '必要醫療',
    'input.expense.other': '其他必要',

    'risk.lifeStage.label': '生涯階段',
    'risk.lifeStage.working': '工作中 / 標準計算',
    'risk.lifeStage.retired': '已退休 / 18 個月',
    'risk.lifeStage.note.title': '退休模式說明',
    'risk.lifeStage.note.body':
      '退休後沒有失業概念，主要風險不是「重新就業期」而是 sequence-of-returns risk —— 在市場下跌時被迫變現資產，會永久損害投資組合的長期回報。退休模式直接覆寫其他風險屬性，固定 18 個月作為現金緩衝（學界與 FIRE 社群常見的 12–24 個月區間中位），用以橋接市場低谷，避免在熊市賣出股債部位。健康/扶養人等變數已內含於這個基準。',

    'risk.income.label': '收入穩定度',
    'risk.income.stable': '穩定 / +0',
    'risk.income.mixed': '混合 / +1',
    'risk.income.unstable': '不穩定 / +3',
    'risk.dependents.label': '扶養人',
    'risk.dependents.none': '無 / +0',
    'risk.dependents.partner': '伴侶 / +1',
    'risk.dependents.family': '家庭 / +2',
    'risk.industry.label': '重新就業難度',
    'risk.industry.tech': '穩定產業 / +0',
    'risk.industry.volatile': '景氣循環 / +1',
    'risk.industry.seasonal': '季節性產業 / +2',
    'risk.industry.examples.title': '職業範例參考',
    'risk.industry.examples.col.level': '等級',
    'risk.industry.examples.col.examples': '職業範例',
    'risk.industry.examples.tech': '軟體工程師、醫療人員、會計、公務員、教師、護理師',
    'risk.industry.examples.volatile': '製造業、零售、廣告、業務、行銷、金融服務',
    'risk.industry.examples.seasonal': '觀光、農業、建築、餐飲、體育、表演藝術',
    'risk.relocation.label': '是否處於職涯轉換期',
    'risk.relocation.no': '否 / +0',
    'risk.relocation.yes': '是 / +2',
    'risk.health.label': '健康 / 運動傷害風險',
    'risk.health.low': '低 / +0',
    'risk.health.medium': '中 / +1',
    'risk.health.high': '高 / +2',

    'result.monthlyEssential': '每月必要支出',
    'result.recommendedMonths': '建議月數',
    'result.recommendedMonths.unit': '個月',
    'result.targetReserve': '目標金額',
    'result.fundRatio': '預備金倍數',
    'result.fundRatio.unit': '倍',
    'result.currentSavings': '目前緊急預備金餘額',
    'result.progress': '進度',
    'result.coverage': '涵蓋 {n} 個月',
    'result.gap': '缺口',
    'result.gap.met': '✓ 已達標',
    'result.note.lt3':
      '目前緩衝不足以撐過一般失業期。BLS 數據顯示美國失業中位期間約 11 週，建議優先把預備金堆到至少 3 個月支出的水位。',
    'result.note.ltRecommended':
      '目前緩衝可撐 {coverage} 個月，接近基本水位但尚未涵蓋你的風險屬性所需的 {recommended} 個月。',
    'result.note.surplus':
      '緩衝相當充裕。可考慮將超額部位移至中短債或債券 ETF 以對抗通膨，讓現金部位的機會成本降低。',
    'result.note.met': '緩衝符合你的風險屬性，可以開始把每月儲蓄分配到投資部位累積長期資產。',
  },
  en: {
    'header.kicker': '§ Personal Finance Tooling · v1.0',
    'header.title1': 'Emergency Fund',
    'header.title2': 'Reserve Calculator',
    'header.tagline.l1':
      'An emergency fund exists so that during job loss, sudden medical events, or family emergencies,',
    'header.tagline.l2':
      'you never have to liquidate investments, take on high-interest debt, or derail long-term plans —',
    'header.tagline.l3':
      'this tool sizes the emergency fund based on your monthly expenses and risk profile.',

    'footer.methodology':
      'METHODOLOGY · Based on CFPB guidance, BLS unemployment data, and the 4% Safe Withdrawal Rule (Trinity Study).',
    'footer.sources': 'SOURCES · St. Louis Fed · Britannica Money · Big ERN Safe Withdrawal Series',
    'footer.defaultsSource':
      'DEFAULT EXPENSES · Single-person urban N. Taiwan baseline, aligned with DGBAS per-capita ~NT$23,500',
    'footer.disclaimer':
      '※ This tool aids personal finance decisions and does not constitute investment advice.',

    'section.input': 'Input Source',
    'section.risk': 'Risk Profile',
    'section.result': 'Calculation Result',

    'input.currency': 'Currency',

    'input.expense.housing': 'Housing & Rent',
    'input.expense.utilities': 'Utilities',
    'input.expense.groceries': 'Groceries',
    'input.expense.insurance': 'Insurance',
    'input.expense.transport': 'Transport',
    'input.expense.medical': 'Medical',
    'input.expense.other': 'Other essentials',

    'risk.lifeStage.label': 'Life Stage',
    'risk.lifeStage.working': 'Working / standard',
    'risk.lifeStage.retired': 'Retired / 18 months',
    'risk.lifeStage.note.title': 'Retirement Mode',
    'risk.lifeStage.note.body':
      "Retirees don't face unemployment risk; the dominant concern is sequence-of-returns risk — being forced to sell assets in a market downturn permanently damages long-term portfolio returns. Retirement mode overrides the other risk factors and fixes the buffer at 18 months (the midpoint of the 12–24 month range commonly cited in academic and FIRE literature) to bridge market troughs without liquidating equities or bonds in a bear market. Health and dependents considerations are already absorbed into this baseline.",

    'risk.income.label': 'Income Stability',
    'risk.income.stable': 'Stable / +0',
    'risk.income.mixed': 'Mixed / +1',
    'risk.income.unstable': 'Unstable / +3',
    'risk.dependents.label': 'Dependents',
    'risk.dependents.none': 'None / +0',
    'risk.dependents.partner': 'Partner / +1',
    'risk.dependents.family': 'Family / +2',
    'risk.industry.label': 'Re-employment Difficulty',
    'risk.industry.tech': 'Stable / +0',
    'risk.industry.volatile': 'Cyclical / +1',
    'risk.industry.seasonal': 'Seasonal / +2',
    'risk.industry.examples.title': 'Occupation Examples',
    'risk.industry.examples.col.level': 'Level',
    'risk.industry.examples.col.examples': 'Examples',
    'risk.industry.examples.tech':
      'Software engineer, healthcare worker, accountant, civil servant, teacher, nurse',
    'risk.industry.examples.volatile':
      'Manufacturing, retail, advertising, sales, marketing, financial services',
    'risk.industry.examples.seasonal':
      'Tourism, agriculture, construction, F&B, sports, performing arts',
    'risk.relocation.label': 'In Career Transition',
    'risk.relocation.no': 'No / +0',
    'risk.relocation.yes': 'Yes / +2',
    'risk.health.label': 'Health Risk',
    'risk.health.low': 'Low / +0',
    'risk.health.medium': 'Medium / +1',
    'risk.health.high': 'High / +2',

    'result.monthlyEssential': 'Monthly Essential',
    'result.recommendedMonths': 'Recommended Months',
    'result.recommendedMonths.unit': 'months',
    'result.targetReserve': 'Target Reserve',
    'result.fundRatio': 'Fund Ratio',
    'result.fundRatio.unit': '×',
    'result.currentSavings': 'Current Emergency Savings Balance',
    'result.progress': 'Progress',
    'result.coverage': 'covers {n} months',
    'result.gap': 'Gap',
    'result.gap.met': '✓ Met',
    'result.note.lt3':
      'Current buffer is insufficient for a typical unemployment period. BLS data shows the median US unemployment duration is around 11 weeks; prioritize building reserves to at least 3 months of expenses.',
    'result.note.ltRecommended':
      'Current buffer covers {coverage} months — close to baseline but not yet at the {recommended} months your risk profile requires.',
    'result.note.surplus':
      'The buffer is generous. Consider moving the excess to short-to-mid duration bonds or bond ETFs to hedge inflation and reduce the opportunity cost of holding cash.',
    'result.note.met':
      'The buffer matches your risk profile. You can start allocating monthly savings to investment positions to accumulate long-term assets.',
  },
} as const;

export type TranslationKey = keyof (typeof dict)['zh'];

export const t = (
  lang: Language,
  key: TranslationKey,
  vars?: Record<string, string | number>,
): string => {
  let s: string = dict[lang][key] ?? dict.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return s;
};

const STORAGE_KEY = 'efc.language';

export const loadLanguage = (): Language => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'zh' || raw === 'en') return raw;
  } catch {
    // ignore
  }
  return 'zh';
};

export const saveLanguage = (lang: Language): void => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
};
