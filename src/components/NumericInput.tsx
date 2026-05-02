import { useEffect, useState, type CSSProperties } from 'react';
import { fmtNumber } from '../lib/format';

interface Props {
  value: number;
  onChange: (n: number) => void;
  style?: CSSProperties;
  ariaLabel?: string;
}

export function NumericInput({ value, onChange, style, ariaLabel }: Props) {
  const [text, setText] = useState(() => fmtNumber(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setText(fmtNumber(value));
  }, [value, focused]);

  return (
    <input
      type="text"
      inputMode="numeric"
      aria-label={ariaLabel}
      style={style}
      value={text}
      onFocus={() => {
        setFocused(true);
        setText(value === 0 ? '' : String(value));
      }}
      onChange={(e) => {
        const cleaned = e.target.value.replace(/[^\d]/g, '');
        setText(cleaned);
        const n = cleaned === '' ? 0 : parseInt(cleaned, 10);
        onChange(isNaN(n) ? 0 : n);
      }}
      onBlur={() => {
        setFocused(false);
        setText(fmtNumber(value));
      }}
    />
  );
}
