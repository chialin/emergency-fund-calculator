import { T } from '../styles/theme';
import { Chip } from './Chip';
import { t } from '../lib/i18n';
import type { Language } from '../types';

interface Props {
  language: Language;
  setLanguage: (l: Language) => void;
}

export function Header({ language, setLanguage }: Props) {
  return (
    <header
      style={{
        borderBottom: `1px solid ${T.border}`,
        paddingBottom: 32,
        marginBottom: 40,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 16,
            letterSpacing: '0.3em',
            color: T.accent,
            textTransform: 'uppercase',
          }}
        >
          {t(language, 'header.kicker')}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['zh', 'en'] as Language[]).map((l) => (
            <Chip key={l} active={language === l} onClick={() => setLanguage(l)}>
              {l === 'zh' ? '中' : 'EN'}
            </Chip>
          ))}
        </div>
      </div>
      <h1
        style={{
          fontFamily: "'Fraunces', 'Noto Serif TC', serif",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          margin: '0 0 16px',
          fontStyle: 'italic',
        }}
      >
        {t(language, 'header.title1')}
        <br />
        <span style={{ fontWeight: 600, fontStyle: 'normal', color: T.accent }}>
          {t(language, 'header.title2')}
        </span>
      </h1>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          color: T.textDim,
          maxWidth: 600,
          lineHeight: 1.7,
        }}
      >
        {t(language, 'header.tagline.l1')}
        <br />
        {t(language, 'header.tagline.l2')}
        <br />
        {t(language, 'header.tagline.l3')}
      </p>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          color: T.textFaint,
          maxWidth: 600,
          marginTop: 12,
          marginBottom: 0,
        }}
      >
        {t(language, 'footer.disclaimer')}
      </p>
    </header>
  );
}
