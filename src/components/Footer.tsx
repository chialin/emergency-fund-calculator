import { T } from '../styles/theme';
import { t } from '../lib/i18n';
import type { Language } from '../types';

interface Props {
  language: Language;
}

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
      <div style={{ marginTop: 8, color: T.textFaint }}>{t(language, 'footer.disclaimer')}</div>
    </div>
  );
}
