import { T } from '../styles/theme';
import { t } from '../lib/i18n';
import type { Language } from '../types';

interface Props {
  language: Language;
}

const defaultsSourceLinks: { label: string; href: string }[] = [
  {
    label: '主計總處家庭收支調查',
    href: 'https://www.stat.gov.tw/cl.aspx?n=2693',
  },
  {
    label: 'Yahoo News · 縣市人均月消費',
    href: 'https://tw.news.yahoo.com/%E5%A4%A9%E9%BE%8D%E5%9C%8B%E7%94%9F%E6%B4%BB%E8%B2%BB%E5%A5%BD%E8%B2%B4-%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BA%BA%E5%9D%87%E6%9C%88%E6%B6%88%E8%B2%BB3%E8%90%AC3730%E5%85%83%E5%B1%85%E5%86%A0-121724188.html',
  },
  {
    label: 'Money 錢雜誌 · 類別細項',
    href: 'https://money.cmoney.tw/article/28218',
  },
  {
    label: '數位時代 · 家庭結構分析',
    href: 'https://www.bnext.com.tw/article/84783/taiwan-household-consumption-structure-2014-2024-analysis',
  },
];

export function Footer({ language }: Props) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: T.textFaint,
        letterSpacing: '0.05em',
        marginTop: 32,
        paddingTop: 24,
        borderTop: `1px solid ${T.border}`,
      }}
    >
      <div>{t(language, 'footer.methodology')}</div>
      <div style={{ marginTop: 8 }}>{t(language, 'footer.sources')}</div>
      <div style={{ marginTop: 8 }}>
        <span>{t(language, 'footer.defaultsSource')}</span>
        <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
          {defaultsSourceLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: T.textDim, textDecoration: 'underline' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 12, color: T.textFaint }}>{t(language, 'footer.disclaimer')}</div>
    </div>
  );
}
