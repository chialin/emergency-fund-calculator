import { T } from '../styles/theme';

export function Header() {
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
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.3em',
          color: T.accent,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        § Personal Finance Tooling · v1.0
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
        Emergency Fund
        <br />
        <span style={{ fontWeight: 600, fontStyle: 'normal', color: T.accent }}>
          Reserve Calculator
        </span>
      </h1>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: T.textDim,
          maxWidth: 600,
          lineHeight: 1.7,
        }}
      >
        從 1737 年 Benjamin Franklin 的「省下一分錢勝過賺取兩分錢」,
        <br />
        到當代基於失業統計與順序風險的精算方法 ——
        <br />
        為你量身計算現金堡壘的尺寸。
      </p>
    </header>
  );
}
