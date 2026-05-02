import { T } from '../styles/theme';

export function Footer() {
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
      <div>METHODOLOGY · 計算基於 CFPB 指引、BLS 失業統計、4% 安全提領法則 (Trinity Study)。</div>
      <div style={{ marginTop: 8 }}>
        SOURCES · St. Louis Fed · Britannica Money · Big ERN Safe Withdrawal Series
      </div>
      <div style={{ marginTop: 8, color: T.textFaint }}>
        ※ 本工具為個人理財決策輔助,不構成投資建議。
      </div>
    </div>
  );
}
