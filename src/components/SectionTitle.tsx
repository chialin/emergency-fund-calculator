import { T } from '../styles/theme';

interface Props {
  number: string;
  title: string;
}

export function SectionTitle({ number, title }: Props) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 16,
        letterSpacing: '0.25em',
        color: T.textDim,
        textTransform: 'uppercase',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent }} />
      {number} / {title}
    </div>
  );
}
