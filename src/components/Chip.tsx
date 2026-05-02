import { T } from '../styles/theme';
import type { CSSProperties, ReactNode } from 'react';

interface Props {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  variant?: 'default' | 'success' | 'danger';
  size?: 'sm' | 'md';
}

export function Chip({ active, onClick, children, variant = 'default', size = 'md' }: Props) {
  const activeBg = variant === 'success' ? T.ok : variant === 'danger' ? T.warn : T.accent;

  const styles: CSSProperties = {
    padding: size === 'sm' ? '3px 8px' : '7px 14px',
    fontSize: size === 'sm' ? 9 : 11,
    background: active ? activeBg : 'transparent',
    color: active ? T.bg : T.textDim,
    border: `1px solid ${active ? activeBg : T.border}`,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.05em',
    cursor: 'pointer',
    borderRadius: 1,
    transition: 'all 0.15s',
  };

  return (
    <button type="button" className="efc-chip" style={styles} onClick={onClick}>
      {children}
    </button>
  );
}
